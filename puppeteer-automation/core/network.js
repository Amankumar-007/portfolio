'use strict';

/**
 * core/network.js — Network Condition Simulation
 *
 * Injects realistic navigator.connection properties and optional
 * per-request latency to simulate real-world network conditions.
 * Works alongside the existing request interception in browser.js.
 */

const logger = require('../utils/logger');

// Connection profiles matching real device distribution
const CONNECTION_PROFILES = [
  // 4G mobile (most common)
  { effectiveType: '4g', downlink: 10, rtt: 50, saveData: false, weight: 0.45 },
  // Fast WiFi
  { effectiveType: '4g', downlink: 25, rtt: 20, saveData: false, weight: 0.30 },
  // 3G mobile
  { effectiveType: '3g', downlink: 1.5, rtt: 300, saveData: false, weight: 0.15 },
  // Slow WiFi / 2G
  { effectiveType: '2g', downlink: 0.5, rtt: 800, saveData: false, weight: 0.07 },
  // Data saver mode
  { effectiveType: '4g', downlink: 5, rtt: 80, saveData: true, weight: 0.03 },
];

/**
 * Pick a weighted random connection profile.
 * @returns {object}
 */
function pickConnectionProfile() {
  const rand = Math.random();
  let cumulative = 0;
  for (const profile of CONNECTION_PROFILES) {
    cumulative += profile.weight;
    if (rand < cumulative) return profile;
  }
  return CONNECTION_PROFILES[0];
}

/**
 * Inject navigator.connection properties via evaluateOnNewDocument.
 * Must be called BEFORE page.goto().
 * @param {import('puppeteer').Page} page
 * @param {object} [forcedProfile] - Override the randomly selected profile
 */
async function simulateNetworkConditions(page, forcedProfile = null) {
  const profile = forcedProfile || pickConnectionProfile();

  await page.evaluateOnNewDocument((conn) => {
    // Override navigator.connection (Network Information API)
    Object.defineProperty(navigator, 'connection', {
      get: () => ({
        effectiveType: conn.effectiveType,
        downlink: conn.downlink + (Math.random() * 2 - 1),  // ±1 Mbps variance
        downlinkMax: conn.downlink * 1.5,
        rtt: Math.round(conn.rtt + Math.random() * 30),      // ±30ms variance
        saveData: conn.saveData,
        type: conn.effectiveType === '4g' ? 'wifi' : 'cellular',
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
      configurable: true,
    });

    // Also override navigator.onLine to always true
    Object.defineProperty(navigator, 'onLine', {
      get: () => true,
      configurable: true,
    });
  }, profile);

  logger.debug(`[Network] Simulating ${profile.effectiveType} connection (${profile.downlink}Mbps, RTT: ${profile.rtt}ms)`);
  return profile;
}

/**
 * Add variable request latency to simulate network delays.
 * IMPORTANT: Only call this if the page does NOT already have request interception enabled.
 * If browser.js is managing interception, use injectLatencyIntoExistingHandler() instead.
 *
 * @param {import('puppeteer').Page} page
 * @param {number} [baseDelayMs=0] - Base delay added to all requests
 * @param {number} [jitterMs=100] - Random jitter range
 */
async function addRequestLatency(page, baseDelayMs = 0, jitterMs = 100) {
  if (baseDelayMs === 0 && jitterMs === 0) return;

  // Check if interception is already enabled before enabling it
  try {
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const delay = baseDelayMs + Math.random() * jitterMs;
      setTimeout(() => {
        request.continue().catch(() => {});
      }, delay);
    });
    logger.debug(`[Network] Request latency: base=${baseDelayMs}ms jitter=0–${jitterMs}ms`);
  } catch (err) {
    // Request interception already enabled — latency will be handled by browser.js handler
    logger.debug('[Network] Request interception already active — skipping latency injection');
  }
}

/**
 * Simulate realistic performance.timing values by overriding them before navigation.
 * GA4 checks performance.timing to detect instant/unrealistic page loads.
 * @param {import('puppeteer').Page} page
 */
async function simulatePerformanceTiming(page) {
  await page.evaluateOnNewDocument(() => {
    const now = Date.now();
    const navStart = now - Math.floor(Math.random() * 800 + 200); // 200–1000ms ago
    const domContentLoaded = navStart + Math.floor(Math.random() * 600 + 200);
    const loadEvent = domContentLoaded + Math.floor(Math.random() * 400 + 100);

    const timingData = {
      navigationStart: navStart,
      unloadEventStart: 0,
      unloadEventEnd: 0,
      redirectStart: 0,
      redirectEnd: 0,
      fetchStart: navStart + Math.floor(Math.random() * 10),
      domainLookupStart: navStart + Math.floor(Math.random() * 30),
      domainLookupEnd: navStart + Math.floor(Math.random() * 60 + 30),
      connectStart: navStart + Math.floor(Math.random() * 80 + 60),
      connectEnd: navStart + Math.floor(Math.random() * 120 + 80),
      secureConnectionStart: navStart + Math.floor(Math.random() * 100 + 70),
      requestStart: navStart + Math.floor(Math.random() * 150 + 100),
      responseStart: navStart + Math.floor(Math.random() * 400 + 150),
      responseEnd: navStart + Math.floor(Math.random() * 500 + 400),
      domLoading: navStart + Math.floor(Math.random() * 600 + 450),
      domInteractive: domContentLoaded - 50,
      domContentLoadedEventStart: domContentLoaded,
      domContentLoadedEventEnd: domContentLoaded + Math.floor(Math.random() * 50 + 10),
      domComplete: loadEvent - 50,
      loadEventStart: loadEvent,
      loadEventEnd: loadEvent + Math.floor(Math.random() * 100 + 20),
    };

    try {
      Object.defineProperty(window.performance, 'timing', {
        get: () => timingData,
        configurable: true,
      });
    } catch (_) {
      // Some browsers don't allow overriding this — safe to ignore
    }
  });
}

module.exports = {
  simulateNetworkConditions,
  simulatePerformanceTiming,
  addRequestLatency,
  pickConnectionProfile,
};
