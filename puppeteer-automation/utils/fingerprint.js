'use strict';

const { UserAgent } = require('user-agents');

/**
 * Fingerprint utilities — generate randomized but consistent browser
 * fingerprints that appear as realistic desktop browser sessions.
 */

const VIEWPORTS = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1280, height: 720 },
  { width: 1600, height: 900 },
];

const TIMEZONES = [
  'Asia/Kolkata', // Force Indian traffic per user request
];

const PLATFORMS = ['Win32', 'MacIntel', 'Linux x86_64'];

const WEBGL_RENDERERS = [
  { vendor: 'Google Inc. (NVIDIA)', renderer: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)' },
  { vendor: 'Google Inc. (Intel)', renderer: 'ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)' },
  { vendor: 'Google Inc. (AMD)', renderer: 'ANGLE (AMD, Radeon RX 580 Series Direct3D11 vs_5_0 ps_5_0, D3D11)' },
  { vendor: 'Apple Inc.', renderer: 'Apple M1' },
  { vendor: 'Google Inc. (NVIDIA)', renderer: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0, D3D11)' },
];

const HARDWARE_CONCURRENCIES = [4, 6, 8, 12, 16];

/**
 * Pick a random element from an array.
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a complete randomized browser fingerprint.
 * All values are internally consistent (viewport matches screen, etc.)
 * @returns {object} Fingerprint configuration
 */
function getRandomFingerprint() {
  const viewport = randomPick(VIEWPORTS);
  const timezone = randomPick(TIMEZONES);
  const platform = randomPick(PLATFORMS);
  const webgl = randomPick(WEBGL_RENDERERS);
  const hardwareConcurrency = randomPick(HARDWARE_CONCURRENCIES);

  // Generate a realistic user agent for desktop Chrome/Firefox/Safari
  let userAgent;
  try {
    const ua = new UserAgent({ deviceCategory: 'desktop' });
    userAgent = ua.toString();
  } catch {
    // Fallback user agents if user-agents package fails
    const fallbackUAs = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    ];
    userAgent = randomPick(fallbackUAs);
  }

  return {
    userAgent: userAgent,
    viewport: viewport,
    timezone: timezone,
    language: 'en-US',
    acceptLanguage: 'en-US,en;q=0.9',
    platform: platform,
    webglVendor: webgl.vendor,
    webglRenderer: webgl.renderer,
    hardwareConcurrency: hardwareConcurrency,
    deviceMemory: [4, 8, 16][Math.floor(Math.random() * 3)],
    colorDepth: 24,
    pixelRatio: [1, 1.25, 1.5, 2][Math.floor(Math.random() * 4)],
    doNotTrack: null,
    cookieEnabled: true,
    javaEnabled: false,
    pdfViewerEnabled: true,
  };
}

/**
 * Generate a fingerprint matched to a specific locale/timezone for proxy pairing.
 * @param {string} timezone - Timezone string (e.g., 'America/New_York')
 * @returns {object}
 */
function getFingerprintForTimezone(timezone) {
  const fp = getRandomFingerprint();
  fp.timezone = timezone;

  // Match language to timezone
  const timezoneLanguageMap = {
    'America/New_York': 'en-US',
    'America/Chicago': 'en-US',
    'America/Los_Angeles': 'en-US',
    'Europe/London': 'en-GB',
    'Europe/Paris': 'fr-FR',
    'Europe/Berlin': 'de-DE',
    'Asia/Tokyo': 'ja-JP',
    'Asia/Singapore': 'en-SG',
    'Australia/Sydney': 'en-AU',
  };

  const lang = timezoneLanguageMap[timezone] || 'en-US';
  fp.language = lang;
  fp.acceptLanguage = `${lang},en;q=0.9`;

  return fp;
}

/**
 * Apply GA4-specific evasion overrides to a page via evaluateOnNewDocument.
 * Must be called BEFORE page.goto() to take effect on the first load.
 *
 * Overrides:
 *  - navigator.permissions.query (notifications → 'default', not 'denied')
 *  - navigator.getBattery (random battery state)
 *  - navigator.deviceMemory (random realistic value)
 *  - HTMLCanvasElement.getContext (subtle noise on 2d context)
 *  - window.screen.orientation (realistic values)
 *
 * @param {import('puppeteer').Page} page
 */
async function applyGA4Evasion(page) {
  await page.evaluateOnNewDocument(() => {
    // ── Notification permission (GA4 checks this) ────────────────────────────
    const originalQuery = window.navigator.permissions?.query?.bind(navigator.permissions);
    if (originalQuery) {
      window.navigator.permissions.query = (parameters) => {
        if (parameters.name === 'notifications') {
          return Promise.resolve({ state: 'default', onchange: null });
        }
        return originalQuery(parameters);
      };
    }

    // ── Battery API (some fingerprinters check charging state) ───────────────
    if ('getBattery' in navigator) {
      navigator.getBattery = () =>
        Promise.resolve({
          charging: Math.random() > 0.5,
          chargingTime: Math.random() > 0.5 ? Infinity : Math.floor(Math.random() * 7200),
          dischargingTime: Math.floor(Math.random() * 14400 + 3600),
          level: parseFloat((0.4 + Math.random() * 0.6).toFixed(2)),
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        });
    }

    // ── Device memory (randomize per session) ─────────────────────────────────
    const memOptions = [2, 4, 8, 16];
    const deviceMem = memOptions[Math.floor(Math.random() * memOptions.length)];
    try {
      Object.defineProperty(navigator, 'deviceMemory', {
        get: () => deviceMem,
        configurable: true,
      });
    } catch (_) {}

    // ── Canvas 2D noise (prevent canvas fingerprinting) ───────────────────────
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      const ctx = originalGetContext.call(this, type, ...args);
      if (type === '2d' && ctx) {
        const originalFillText = ctx.fillText.bind(ctx);
        ctx.fillText = function (...fArgs) {
          // Save and restore to not affect rendering, just add micro-noise
          ctx.save();
          ctx.translate(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25);
          originalFillText(...fArgs);
          ctx.restore();
        };
      }
      return ctx;
    };

    // ── screen.orientation (GA4 cross-checks this) ────────────────────────────
    try {
      Object.defineProperty(screen, 'orientation', {
        get: () => ({ angle: 0, type: 'landscape-primary', onchange: null }),
        configurable: true,
      });
    } catch (_) {}

    // ── Touch events: desktop users have no touch ─────────────────────────────
    Object.defineProperty(navigator, 'maxTouchPoints', {
      get: () => 0,
      configurable: true,
    });
  });
}

module.exports = { getRandomFingerprint, getFingerprintForTimezone, randomPick, applyGA4Evasion };
