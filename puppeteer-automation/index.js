'use strict';

require('dotenv').config();

const { program } = require('commander');
const { v4: uuidv4 } = require('uuid');
const PQueue = require('p-queue').default;
const fs = require('fs').promises;
const path = require('path');

const BrowserEngine = require('./core/browser');
const HumanBehavior = require('./core/behavior');
const SessionManager = require('./core/session');
const ProxyManager = require('./core/proxy');
const CaptchaHandler = require('./core/captcha');
const EngagementSimulator = require('./core/engagement');
const { handleCookieConsent } = require('./core/consent');
const { getTrafficContext } = require('./core/traffic-patterns');
const { generateNewGA4Identity, triggerFirstVisitEvent, verifyNewUserTracking } = require('./core/ga4');
const MetricsCollector = require('./utils/metrics');
const logger = require('./utils/logger');

// ─── CLI Configuration ────────────────────────────────────────────────────────

program
  .name('puppeteer-automation')
  .description('Production-ready Puppeteer browser automation framework')
  .version('1.0.0')
  .option('-c, --config <path>', 'Path to config JSON file', './config.json')
  .option('--concurrency <n>', 'Number of concurrent browsers', parseInt)
  .option('--headless', 'Run in headless mode')
  .option('--test', 'Run in test mode (visits httpbin.org)')
  .option('--fingerprint-test', 'Test fingerprint randomization')
  .parse(process.argv);

const cliOptions = program.opts();

// ─── Config Loading ───────────────────────────────────────────────────────────

/**
 * Load and merge configuration from file and environment variables.
 * @returns {Promise<object>}
 */
async function loadConfig() {
  let fileConfig = {};

  try {
    const configPath = path.resolve(cliOptions.config || './config.json');
    const raw = await fs.readFile(configPath, 'utf8');
    fileConfig = JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      logger.warn(`[Config] Failed to parse config file: ${err.message}`);
    }
    logger.info('[Config] Using default configuration');
  }

  const config = {
    concurrency: cliOptions.concurrency || fileConfig.concurrency || 3,
    headless: cliOptions.headless !== undefined ? cliOptions.headless : (fileConfig.headless ?? true),
    stealth: fileConfig.stealth ?? true,
    sessionPersistence: fileConfig.sessionPersistence ?? true,
    sessionsDir: fileConfig.sessionsDir || './sessions',
    userDataDir: fileConfig.userDataDir || './user_data',
    proxyRotation: fileConfig.proxyRotation || 'per_session',
    proxies: fileConfig.proxies || [],
    captchaService: fileConfig.captchaService || null,
    captchaApiKey: fileConfig.captchaApiKey || process.env.CAPTCHA_API_KEY || null,
    defaultTimeout: fileConfig.defaultTimeout || 30000,
    maxRetries: fileConfig.maxRetries || 3,
    retryDelay: fileConfig.retryDelay || 2000,
    targets: fileConfig.targets || [],
    screenshotsDir: fileConfig.screenshotsDir || './screenshots',
    metricsDir: fileConfig.metricsDir || './metrics',
    staggeredStart: fileConfig.staggeredStart ?? true,
    staggerDelayMs: fileConfig.staggerDelayMs || 1500,
  };

  logger.info('[Config] Configuration loaded', {
    concurrency: config.concurrency,
    targets: config.targets.length,
    proxies: config.proxies.length,
    sessionPersistence: config.sessionPersistence,
  });

  return config;
}

// ─── Screenshot Helper ────────────────────────────────────────────────────────

/**
 * Capture a screenshot and save it to disk.
 * @param {import('puppeteer').Page} page
 * @param {string} screenshotsDir
 * @param {string} label
 * @returns {Promise<string>}
 */
async function captureScreenshot(page, screenshotsDir, label = 'screenshot') {
  await fs.mkdir(screenshotsDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${label}_${timestamp}.png`;
  const screenshotPath = path.join(screenshotsDir, filename);

  try {
    await page.screenshot({ path: screenshotPath, fullPage: false });
    logger.debug(`[Screenshot] Saved: ${screenshotPath}`);
    return screenshotPath;
  } catch (err) {
    logger.warn(`[Screenshot] Failed to capture: ${err.message}`);
    return null;
  }
}

/**
 * Remove a session's isolated Chrome profile directory from disk.
 * Without this, every session leaves a permanent userDataDir folder behind.
 * @param {BrowserEngine} engine
 */
async function cleanupUserDataDir(engine) {
  if (!engine?.sessionUserDataDir) return;
  try {
    await fs.rm(engine.sessionUserDataDir, { recursive: true, force: true });
  } catch (_) {
    // Best-effort — Windows may still hold a handle briefly after browser.close()
  }
}

// ─── Task Processor ───────────────────────────────────────────────────────────

/**
 * Process a single URL task with retry logic, human behavior, and error handling.
 * @param {string} url - Target URL
 * @param {object} config - Application configuration
 * @param {object} services - Shared service instances
 * @returns {Promise<object>} Task result
 */
async function processTask(url, config, services) {
  const { sessionManager, proxyManager, captchaHandler, metrics } = services;
  const sessionId = `session_${uuidv4().slice(0, 8)}`;
  const sessionLogger = logger.createSessionLogger(sessionId);

  let browser = null;
  let browserId = null;
  let engine = null;
  let attempt = 0;

  const startTime = Date.now();

  while (attempt <= config.maxRetries) {
    attempt++;
    const attemptStart = Date.now();

    try {
      // ── Get proxy ──────────────────────────────────────────────────────────
      let proxyUrl = null;
      if (proxyManager && config.proxies.length > 0) {
        proxyUrl = await proxyManager.getNextProxy();
        if (!proxyUrl) {
          sessionLogger.warn(`[Task] No healthy proxy available for ${url}`);
        }
      }

      // ── Launch browser ─────────────────────────────────────────────────────
      // Use a fresh per-attempt sessionId for the browser profile dir: if attempt 1
      // fails mid-launch, retrying with the same userDataDir can hit a stale lock
      // file and fail identically forever. The logical sessionId (for logging /
      // session persistence) stays the same across attempts.
      const attemptSessionId = attempt === 1 ? sessionId : `${sessionId}_r${attempt}`;
      engine = new BrowserEngine({ ...config, sessionId: attemptSessionId });
      const result = await engine.launch({ headless: config.headless }, proxyUrl);
      browser = result.browser;
      browserId = result.browserId;
      const page = result.page;
      const fingerprint = result.fingerprint;

      sessionLogger.info(`[Task] Attempt ${attempt}/${config.maxRetries + 1} → ${url}`);

      // ── Get traffic context (referrer, session duration, bounce decision) ───
      const ga4Config = config.ga4Evasion || {};
      const trafficCtx = getTrafficContext();

      // ── Complete Session Isolation ──────────────────────────────────────────
      if (config.isolateSessions) {
        // Clear cookies & cache via CDP
        try {
          const client = await page.target().createCDPSession();
          await client.send('Network.clearBrowserCookies').catch(() => {});
          await client.send('Network.clearBrowserCache').catch(() => {});
        } catch (e) {
          sessionLogger.warn(`[Task] CDP cache clear failed (ignoring): ${e.message}`);
        }

        // Clear local/session storage via evaluation
        if (config.clearStorageBetweenSessions) {
          await page.evaluateOnNewDocument(() => {
            const emptyStorage = {
              length: 0,
              key: () => null,
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
              clear: () => {}
            };
            Object.defineProperty(window, 'localStorage', { get: () => emptyStorage, configurable: true });
            Object.defineProperty(window, 'sessionStorage', { get: () => emptyStorage, configurable: true });
          });
        }
      }

      // ── Generate GA4 Identity ──────────────────────────────────────────────
      if (config.generateNewIdentityPerSession) {
        const clientId = await generateNewGA4Identity(page);
        sessionLogger.info(`[Task] Generated isolated GA4 Client ID: ${clientId}`);
      }

      // ── Restore session if persistence enabled ─────────────────────────────
      if (config.sessionPersistence && sessionManager) {
        const restored = await sessionManager.restore(sessionId, page);
        if (restored) {
          sessionLogger.debug('[Task] Session state restored');
        }
      }

      // ── Navigate to URL with realistic referrer ────────────────────────────
      const navStart = Date.now();
      await page.goto(url, {
        waitUntil: 'domcontentloaded', // Wait for dom instead of strict networkidle
        timeout: config.defaultTimeout,
        ...(trafficCtx.referrer && { referer: trafficCtx.referrer }),
      });
      // Give page time to load scripts since we aren't using networkidle2
      await new Promise(r => setTimeout(r, 4000));
      const loadTimeMs = Date.now() - navStart;

      sessionLogger.info(`[Task] Page loaded in ${loadTimeMs}ms | src: ${trafficCtx.source} | bounce: ${trafficCtx.isBounce}`);

      // ── Trigger First Visit Event ──────────────────────────────────────────
      if (config.generateNewIdentityPerSession) {
        await triggerFirstVisitEvent(page);
      }

      // ── Cookie consent handling ────────────────────────────────────────────
      if (ga4Config.handleCookieConsent !== false) {
        await handleCookieConsent(page);
      }

      // ── CAPTCHA check ──────────────────────────────────────────────────────
      let captchaEncountered = false;
      let captchaSolved = false;

      if (captchaHandler) {
        const captchaResult = await captchaHandler.detect(page);
        if (captchaResult.detected) {
          captchaEncountered = true;
          sessionLogger.warn(`[Task] CAPTCHA detected: ${captchaResult.type}`);

          try {
            captchaSolved = await captchaHandler.solve(page);
            if (captchaSolved) {
              sessionLogger.info('[Task] CAPTCHA solved — continuing');
              await new Promise((r) => setTimeout(r, 2000));
            }
          } catch (captchaErr) {
            sessionLogger.error(`[Task] CAPTCHA solve failed: ${captchaErr.message}`);
          }
        }
      }

      // ── Engagement simulation (GA4-aware) ─────────────────────────────────
      const interactionStart = Date.now();

      if (ga4Config.enabled !== false) {
        // Use GA4-aware EngagementSimulator
        const engager = new EngagementSimulator(page, {
          ...ga4Config,
          bounceRate: ga4Config.bounceRate ?? trafficCtx.isBounce ? 1 : 0,
          minSessionDuration: ga4Config.minSessionDuration ?? 5000,
          maxSessionDuration: ga4Config.maxSessionDuration ?? 60000,
        });

        const engResult = await engager.runSession(trafficCtx.isBounce);
        const ga4 = await engager.verifyGA4Collection();

        sessionLogger.info(`[Task] Engagement done — bounced: ${engResult.bounced}, GA4 events: ${ga4.ga4Events}`);
      } else {
        // Legacy human behavior fallback
        const behavior = new HumanBehavior(page);
        await behavior.simulatePageVisit();
      }

      const interactionTimeMs = Date.now() - interactionStart;

      // ── Save session state ─────────────────────────────────────────────────
      if (config.sessionPersistence && sessionManager) {
        await sessionManager.save(sessionId, page, { url, fingerprint: fingerprint.viewport });
      }

      // ── Verify New User Tracking ───────────────────────────────────────────
      if (config.generateNewIdentityPerSession) {
        await verifyNewUserTracking(page);
      }

      // ── Record success metrics ─────────────────────────────────────────────
      const totalTimeMs = Date.now() - startTime;
      metrics.record({
        sessionId,
        url,
        status: 'success',
        loadTimeMs,
        interactionTimeMs,
        totalTimeMs,
        retryCount: attempt - 1,
        captchaEncountered,
        captchaSolved,
        proxyUsed: proxyUrl ? '[proxy]' : null,
      });

      sessionLogger.info(`[Task] ✓ Completed ${url} in ${totalTimeMs}ms`);

      // Navigate away to trigger 'visibilitychange' and 'unload' analytics beacons
      await page.goto('about:blank').catch(() => {});
      await new Promise(r => setTimeout(r, 1500));

      // ── Cleanup ────────────────────────────────────────────────────────────
      await engine.closeBrowser(browserId);
      await cleanupUserDataDir(engine);

      return { status: 'success', url, sessionId, totalTimeMs };

    } catch (err) {
      const errorTimeMs = Date.now() - attemptStart;
      sessionLogger.error(`[Task] Attempt ${attempt} failed for ${url}: ${err.message}`);

      // Capture failure screenshot
      try {
        if (browser) {
          const pages = await browser.pages();
          if (pages.length > 0) {
            await captureScreenshot(pages[0], config.screenshotsDir, `failure_${sessionId}`);
          }
        }
      } catch (_) {}

      // Close browser on error
      if (browser) {
        try {
          await browser.close();
        } catch (_) {}
        browser = null;
      }
      await cleanupUserDataDir(engine);

      if (attempt > config.maxRetries) {
        const totalTimeMs = Date.now() - startTime;
        metrics.record({
          sessionId,
          url,
          status: 'failure',
          totalTimeMs,
          retryCount: attempt - 1,
          errorMessage: err.message,
        });

        sessionLogger.error(`[Task] ✗ All ${config.maxRetries + 1} attempts failed for ${url}`);
        return { status: 'failure', url, sessionId, error: err.message };
      }

      // Exponential backoff before retry
      const backoff = config.retryDelay * Math.pow(2, attempt - 1);
      sessionLogger.info(`[Task] Retrying in ${backoff}ms...`);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
}

// ─── Test Modes ───────────────────────────────────────────────────────────────

/**
 * Run a basic smoke test against httpbin.org to verify framework functionality.
 * @param {object} config
 */
async function runTestMode(config) {
  logger.info('[Test] Running smoke test against httpbin.org');

  const testConfig = {
    ...config,
    targets: [
      'https://httpbin.org/headers',
      'https://httpbin.org/user-agent',
      'https://httpbin.org/ip',
    ],
    concurrency: 1,
    maxRetries: 1,
  };

  await runAutomation(testConfig);
}

/**
 * Test fingerprint randomization by visiting fingerprint check sites.
 * @param {object} config
 */
async function runFingerprintTest(config) {
  logger.info('[FingerprintTest] Testing fingerprint randomization...');

  const { getRandomFingerprint } = require('./utils/fingerprint');

  // Show 3 different generated fingerprints
  for (let i = 0; i < 3; i++) {
    const fp = getRandomFingerprint();
    logger.info(`[FingerprintTest] Sample ${i + 1}`, {
      viewport: `${fp.viewport.width}x${fp.viewport.height}`,
      timezone: fp.timezone,
      platform: fp.platform,
      hardwareConcurrency: fp.hardwareConcurrency,
      userAgent: fp.userAgent.substring(0, 80) + '...',
    });
  }

  // Visit browserleaks.com to visually verify
  const testConfig = {
    ...config,
    targets: ['https://browserleaks.com/javascript'],
    concurrency: 1,
    headless: false, // Open for visual verification
    maxRetries: 0,
  };

  logger.info('[FingerprintTest] Opening browser for visual verification at browserleaks.com...');
  await runAutomation(testConfig);
}

// ─── Main Automation Runner ───────────────────────────────────────────────────

/**
 * Main automation orchestrator — manages task queue, concurrency, and cleanup.
 * @param {object} config
 */
async function runAutomation(config) {
  // ── Initialize services ────────────────────────────────────────────────────
  const metrics = new MetricsCollector(config.metricsDir);
  await metrics.initialize();

  const sessionManager = config.sessionPersistence ? new SessionManager(config.sessionsDir) : null;
  if (sessionManager) await sessionManager.initialize();

  const proxyManager = config.proxies.length > 0
    ? new ProxyManager({ proxies: config.proxies, rotation: config.proxyRotation })
    : null;

  const captchaHandler = config.captchaService && config.captchaApiKey
    ? new CaptchaHandler({ service: config.captchaService, apiKey: config.captchaApiKey })
    : null;

  if (!captchaHandler && config.captchaService) {
    logger.warn('[Main] CAPTCHA service configured but no API key found');
  }

  const services = { sessionManager, proxyManager, captchaHandler, metrics };

  // ── Build task queue ───────────────────────────────────────────────────────
  const queue = new PQueue({ concurrency: config.concurrency });
  const results = [];

  logger.info(`[Main] Starting automation`, {
    targets: config.targets.length,
    concurrency: config.concurrency,
    proxies: config.proxies.length,
    captcha: !!captchaHandler,
  });

  // ── Enqueue tasks with optional staggered start ────────────────────────────
  for (let i = 0; i < config.targets.length; i++) {
    const url = config.targets[i];

    if (config.staggeredStart && i > 0) {
      await new Promise((r) => setTimeout(r, config.staggerDelayMs));
    }

    queue.add(async () => {
      const result = await processTask(url, config, services);
      results.push(result);
    });
  }

  // ── Wait for all tasks to complete ─────────────────────────────────────────
  await queue.onIdle();

  // ── Final reporting ────────────────────────────────────────────────────────
  metrics.logSummary();

  const summary = metrics.getSummary();
  logger.info('[Main] Automation complete', summary);

  // Export metrics
  if (results.length > 0) {
    await metrics.exportCsv().catch((err) =>
      logger.warn(`[Main] CSV export failed: ${err.message}`)
    );
    await metrics.exportJson().catch((err) =>
      logger.warn(`[Main] JSON export failed: ${err.message}`)
    );
  }

  // Clean old sessions
  if (sessionManager) {
    await sessionManager.cleanOld();
  }

  return { results, summary };
}

// ─── Graceful Shutdown ────────────────────────────────────────────────────────

process.on('SIGINT', async () => {
  logger.info('[Main] Received SIGINT — shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('[Main] Received SIGTERM — shutting down gracefully...');
  process.exit(0);
});

process.on('unhandledRejection', (reason) => {
  logger.error('[Main] Unhandled Promise Rejection', { reason: String(reason) });
});

// ─── Entry Point ──────────────────────────────────────────────────────────────

(async () => {
  try {
    const config = await loadConfig();

    if (cliOptions.test) {
      await runTestMode(config);
    } else if (cliOptions.fingerprintTest) {
      await runFingerprintTest(config);
    } else {
      if (config.targets.length === 0) {
        logger.warn('[Main] No targets configured. Add URLs to config.json targets array.');
        logger.info('[Main] Run with --test flag to run smoke tests against httpbin.org');
        logger.info('[Main] Run with --fingerprint-test to verify fingerprint randomization');
        process.exit(0);
      }

      await runAutomation(config);
    }

    process.exit(0);
  } catch (err) {
    logger.error('[Main] Fatal error', { error: err.message, stack: err.stack });
    process.exit(1);
  }
})();
