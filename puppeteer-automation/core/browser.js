'use strict';

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const UserPreferencesPlugin = require('puppeteer-extra-plugin-user-preferences');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const os = require('os');
const logger = require('../utils/logger');
const { getRandomFingerprint, applyGA4Evasion } = require('../utils/fingerprint');
const { simulateNetworkConditions, simulatePerformanceTiming } = require('./network');

// Apply stealth plugin with all evasion techniques
puppeteer.use(StealthPlugin());

// Apply user preferences to appear more human
puppeteer.use(
  UserPreferencesPlugin({
    userPrefs: {
      webkit: {
        webprefs: {
          default_font_size: 16,
        },
      },
    },
  })
);

/**
 * Core Browser Engine — manages Puppeteer instances with stealth configuration,
 * fingerprint randomization, and anti-detection measures.
 */
class BrowserEngine {
  constructor(config = {}) {
    this.config = config;
    this.browsers = new Map();
    this.sessionId = config.sessionId || uuidv4();
  }

  /**
   * Build Puppeteer launch args with anti-detection flags.
   * @param {object} fingerprint - Randomized browser fingerprint
   * @returns {string[]} Launch arguments array
   */
  _buildLaunchArgs(fingerprint) {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--disable-blink-features=AutomationControlled',
      // NOTE: --disable-web-security REMOVED — it breaks GA4's cross-origin beacon
      // requests (CORS) to google-analytics.com, causing 0 active users in analytics.
      // NOTE: --disable-features=IsolateOrigins REMOVED — not needed, can break networking.
      '--disable-notifications',
      '--disable-popup-blocking',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-infobars',
      '--window-size=1920,1080',
      `--lang=${fingerprint.language}`,
      `--timezone=${fingerprint.timezone}`,
    ];

    // Remove --enable-automation if it's in the default list
    return args.filter((arg) => arg !== '--enable-automation');
  }

  /**
   * Inject fingerprint overrides into a page before any navigation.
   * @param {import('puppeteer').Page} page
   * @param {object} fingerprint
   */
  async _injectFingerprintOverrides(page, fingerprint) {
    await page.evaluateOnNewDocument((fp) => {
      // Override navigator.webdriver
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
        configurable: true,
      });

      // Override navigator.languages
      Object.defineProperty(navigator, 'languages', {
        get: () => fp.languages,
        configurable: true,
      });

      // Override navigator.language
      Object.defineProperty(navigator, 'language', {
        get: () => fp.languages[0],
        configurable: true,
      });

      // Override navigator.platform
      Object.defineProperty(navigator, 'platform', {
        get: () => fp.platform,
        configurable: true,
      });

      // Override navigator.hardwareConcurrency
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => fp.hardwareConcurrency,
        configurable: true,
      });

      // Override navigator.deviceMemory
      Object.defineProperty(navigator, 'deviceMemory', {
        get: () => fp.deviceMemory,
        configurable: true,
      });

      // Override navigator.plugins to appear as real browser
      const fakePlugins = [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
        { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' },
      ];
      Object.defineProperty(navigator, 'plugins', {
        get: () => {
          const pluginArray = Object.create(PluginArray.prototype);
          fakePlugins.forEach((p, i) => {
            const plugin = Object.create(Plugin.prototype);
            Object.defineProperty(plugin, 'name', { get: () => p.name });
            Object.defineProperty(plugin, 'filename', { get: () => p.filename });
            Object.defineProperty(plugin, 'description', { get: () => p.description });
            pluginArray[i] = plugin;
          });
          Object.defineProperty(pluginArray, 'length', { get: () => fakePlugins.length });
          return pluginArray;
        },
        configurable: true,
      });

      // Override screen dimensions
      Object.defineProperty(screen, 'width', { get: () => fp.viewport.width, configurable: true });
      Object.defineProperty(screen, 'height', { get: () => fp.viewport.height, configurable: true });
      Object.defineProperty(screen, 'colorDepth', { get: () => fp.colorDepth, configurable: true });
      Object.defineProperty(screen, 'pixelDepth', { get: () => fp.colorDepth, configurable: true });

      // Override window dimensions
      Object.defineProperty(window, 'outerWidth', { get: () => fp.viewport.width, configurable: true });
      Object.defineProperty(window, 'outerHeight', { get: () => fp.viewport.height, configurable: true });
      Object.defineProperty(window, 'innerWidth', { get: () => fp.viewport.width, configurable: true });
      Object.defineProperty(window, 'innerHeight', { get: () => fp.viewport.height - 80, configurable: true });

      // Override WebGL renderer to prevent canvas fingerprinting
      const getParameter = WebGLRenderingContext.prototype.getParameter;
      WebGLRenderingContext.prototype.getParameter = function (parameter) {
        if (parameter === 37445) return fp.webglVendor;
        if (parameter === 37446) return fp.webglRenderer;
        return getParameter.call(this, parameter);
      };

      // Prevent canvas fingerprinting
      const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
      CanvasRenderingContext2D.prototype.getImageData = function (x, y, w, h) {
        const imageData = originalGetImageData.call(this, x, y, w, h);
        // Add slight noise to canvas data
        for (let i = 0; i < imageData.data.length; i += 100) {
          imageData.data[i] = imageData.data[i] ^ (Math.random() * 2) | 0;
        }
        return imageData;
      };

      // Override timezone
      const DateTimeFormat = Intl.DateTimeFormat;
      Intl.DateTimeFormat = function (locale, options = {}) {
        if (!options.timeZone) options.timeZone = fp.timezone;
        return new DateTimeFormat(locale, options);
      };
      Object.setPrototypeOf(Intl.DateTimeFormat, DateTimeFormat);

      // Force page visibility for GA4 Real-time active user tracking
      Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
      Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
      window.addEventListener('blur', (e) => e.stopImmediatePropagation(), true);

      // Spoof chrome runtime object
      window.chrome = {
        runtime: {
          id: undefined,
          connect: () => {},
          sendMessage: () => {},
        },
        loadTimes: () => ({}),
        csi: () => ({}),
        app: {},
      };

      // Spoof notification permission
      const originalQuery = window.navigator.permissions?.query;
      if (originalQuery) {
        window.navigator.permissions.query = (parameters) =>
          parameters.name === 'notifications'
            ? Promise.resolve({ state: Notification.permission })
            : originalQuery(parameters);
      }
    }, fingerprint);
  }

  /**
   * Launch a new browser instance.
   * @param {object} [options={}] - Override options
   * @param {string} [proxyUrl] - Optional proxy URL string
   * @returns {Promise<{browser: Browser, page: Page, fingerprint: object}>}
   */
  async launch(options = {}, proxyUrl = null) {
    const fingerprint = getRandomFingerprint();
    const launchArgs = this._buildLaunchArgs(fingerprint);

    if (proxyUrl) {
      launchArgs.push(`--proxy-server=${proxyUrl}`);
      // CRITICAL: Bypass the proxy for Google Analytics/Tag Manager domains.
      // Free proxies block HTTPS tunneling to analytics servers, causing GA4
      // beacons to fail silently and never reach Google. Bypassing lets
      // analytics hits go direct while the page request uses the proxy IP.
      launchArgs.push('--proxy-bypass-list=*.google-analytics.com,*.googletagmanager.com,analytics.google.com,www.google-analytics.com,region1.google-analytics.com');
    }

    // Normalize boolean headless → Puppeteer's new string API (suppresses deprecation warning)
    const rawHeadless = options.headless ?? this.config.headless ?? 'new';
    const headlessValue = rawHeadless === true ? 'new' : rawHeadless === false ? false : rawHeadless;

    // ── Per-session userDataDir ────────────────────────────────────────────
    // Chrome LOCKS its userDataDir. If multiple browsers share the same folder,
    // every instance after the first crashes with "Failed to launch the browser process".
    // Fix: give each session its own unique subfolder.
    let sessionUserDataDir = null;
    if (this.config.userDataDir) {
      sessionUserDataDir = path.join(
        path.resolve(this.config.userDataDir),
        this.sessionId || uuidv4()
      );
      try {
        fs.mkdirSync(sessionUserDataDir, { recursive: true });
      } catch (mkErr) {
        // Fall back to OS temp dir if we can't write to configured path
        sessionUserDataDir = path.join(os.tmpdir(), 'pptr-' + (this.sessionId || uuidv4()));
        fs.mkdirSync(sessionUserDataDir, { recursive: true });
        logger.warn(`[BrowserEngine] Could not create userDataDir, using temp: ${sessionUserDataDir}`);
      }
      this.sessionUserDataDir = sessionUserDataDir;
    }

    const launchOptions = {
      headless: headlessValue,
      args: launchArgs,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      ...(sessionUserDataDir && { userDataDir: sessionUserDataDir }),
      // Spread options last but remove headless/userDataDir to prevent overwriting
      ...Object.fromEntries(
        Object.entries(options).filter(([k]) => !['headless', 'userDataDir'].includes(k))
      ),
    };

    logger.info(`[BrowserEngine] Launching browser`, {
      sessionId: this.sessionId,
      fingerprint: {
        ua: fingerprint.userAgent.substring(0, 60) + '...',
        viewport: fingerprint.viewport,
        timezone: fingerprint.timezone,
      },
    });

    let browser;
    try {
      browser = await puppeteer.launch(launchOptions);
    } catch (launchErr) {
      // A failed launch can leave a stale SingletonLock in the profile dir.
      // If we retry with the same sessionId (same userDataDir), every
      // subsequent attempt fails identically unless we clear it out first.
      if (sessionUserDataDir) {
        try {
          fs.rmSync(sessionUserDataDir, { recursive: true, force: true });
        } catch (_) {}
      }
      throw launchErr;
    }

    const browserId = uuidv4();
    this.browsers.set(browserId, browser);

    // Setup graceful cleanup
    browser.on('disconnected', () => {
      this.browsers.delete(browserId);
      logger.debug(`[BrowserEngine] Browser ${browserId} disconnected`);
    });

    const page = await this._setupPage(browser, fingerprint);

    return { browser, page, fingerprint, browserId };
  }

  /**
   * Configure a new page with proper headers, viewport, and fingerprint injections.
   * @param {import('puppeteer').Browser} browser
   * @param {object} fingerprint
   * @returns {Promise<import('puppeteer').Page>}
   */
  async _setupPage(browser, fingerprint) {
    const [page] = await browser.pages();

    // Set viewport
    await page.setViewport({
      width: fingerprint.viewport.width,
      height: fingerprint.viewport.height,
      deviceScaleFactor: 1,
      hasTouch: false,
      isLandscape: false,
      isMobile: false,
    });

    // Set user agent
    await page.setUserAgent(fingerprint.userAgent);

    // Set extra HTTP headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': fingerprint.acceptLanguage,
      'Accept-Encoding': 'gzip, deflate, br',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Cache-Control': 'max-age=0',
      'Upgrade-Insecure-Requests': '1',
    });

    // Inject core fingerprint overrides
    await this._injectFingerprintOverrides(page, fingerprint);

    // Inject GA4-specific evasion overrides (battery, canvas, permissions, orientation)
    if (this.config.stealth !== false) {
      await applyGA4Evasion(page);
    }

    // Inject network condition simulation (navigator.connection)
    await simulateNetworkConditions(page);
    // await simulatePerformanceTiming(page); // Disabled: GA4 detects this spoofing as a bot

    // Request interception — block unnecessary resources, add optional latency
    const networkDelayMs = this.config.networkDelayMs || 0;
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      const blockList = ['media', 'font'];

      if (blockList.includes(resourceType)) {
        request.abort();
      } else if (networkDelayMs > 0) {
        // Add configurable network latency jitter
        setTimeout(() => request.continue().catch(() => {}), networkDelayMs + Math.random() * 50);
      } else {
        request.continue();
      }
    });

    // Log console errors from the page
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        logger.debug(`[Page Console Error] ${msg.text()}`);
      }
    });

    // Log page errors
    page.on('pageerror', (err) => {
      logger.debug(`[Page Error] ${err.message}`);
    });

    return page;
  }

  /**
   * Open a new tab in an existing browser.
   * @param {import('puppeteer').Browser} browser
   * @param {object} fingerprint - The fingerprint used for this session
   * @returns {Promise<import('puppeteer').Page>}
   */
  async newPage(browser, fingerprint) {
    const page = await browser.newPage();
    await this._setupPage(browser, fingerprint);
    return page;
  }

  /**
   * Close a specific browser by ID.
   * @param {string} browserId
   */
  async closeBrowser(browserId) {
    const browser = this.browsers.get(browserId);
    if (browser) {
      try {
        await browser.close();
      } catch (err) {
        logger.warn(`[BrowserEngine] Failed to close browser ${browserId}: ${err.message}`);
      }
      this.browsers.delete(browserId);
    }
  }

  /**
   * Close all open browser instances gracefully.
   */
  async closeAll() {
    const closePromises = Array.from(this.browsers.entries()).map(async ([id, browser]) => {
      try {
        await browser.close();
        logger.debug(`[BrowserEngine] Closed browser ${id}`);
      } catch (err) {
        logger.warn(`[BrowserEngine] Error closing browser ${id}: ${err.message}`);
      }
    });
    await Promise.allSettled(closePromises);
    this.browsers.clear();
  }
}

module.exports = BrowserEngine;
