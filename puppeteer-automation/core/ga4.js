'use strict';

/**
 * core/ga4.js — Google Analytics 4 Identity & Event Management
 *
 * Strategy:
 * 1. Use page.setCookie() to plant a unique _ga cookie BEFORE navigation.
 *    GA4 reads this cookie and uses it as the Client ID — making each visit
 *    appear as a completely fresh new user with a new identity.
 * 2. After the page loads and gtag initialises, fire page_view + session_start
 *    + first_visit events through the real gtag() function.
 *
 * NOTE: The browser must also have --proxy-bypass-list set for analytics domains
 * (done in browser.js) so that beacon requests reach Google even when a proxy is used.
 */

const logger = require('../utils/logger');

/**
 * Generate a valid GA4 Client ID string.
 * Format mirrors what the real GA4 tag generates: <randomInt>.<unixTimestamp>
 * @returns {string}
 */
function buildClientId() {
  const randomId = Math.floor(Math.random() * 2147483647);
  const timestamp = Math.floor(Date.now() / 1000);
  return `${randomId}.${timestamp}`;
}

async function generateNewGA4Identity(page, targetUrl) {
  // We do NOT inject the _ga cookie manually anymore.
  // Setting the cookie beforehand tricks GA4 into thinking it's an existing (returning) user,
  // which prevents "New User" metrics from registering correctly.
  // The browser profile is already isolated and cookie-free, so GA4 will naturally generate
  // its own new client ID and properly register a 'first_visit'.
  
  const clientId = buildClientId();
  logger.debug(`[GA4] Skipping manual _ga cookie injection to allow natural first_visit event`);
  return `GA1.1.${clientId}`;
}

/**
 * Wait for gtag to fully initialise then fire page_view, session_start,
 * and first_visit events. These are what GA4 counts as "Active Users" and
 * "New Users" in its Realtime and standard reports.
 *
 * @param {import('puppeteer').Page} page
 */
async function triggerFirstVisitEvent(page) {
  await page.evaluate(() => {
    return new Promise((resolve) => {
      function fireEvents() {
        window.dataLayer = window.dataLayer || [];

        // These dataLayer pushes work for GTM-based setups
        window.dataLayer.push({ event: 'page_view', page_location: window.location.href, page_title: document.title });
        window.dataLayer.push({ event: 'session_start' });
        window.dataLayer.push({ event: 'first_visit' });
        window.dataLayer.push({ event: 'user_engagement', engagement_time_msec: 100 });

        // Fire via the real gtag() function if available — this is what actually
        // sends the network hit to google-analytics.com/g/collect
        if (typeof gtag === 'function') {
          gtag('event', 'page_view', { page_location: window.location.href, page_title: document.title });
          gtag('event', 'session_start');
          gtag('event', 'first_visit');
          gtag('event', 'user_engagement', { engagement_time_msec: 100 });
        }
        resolve();
      }

      if (typeof gtag === 'function') {
        fireEvents();
      } else {
        // Poll until gtag is available (up to 8 seconds)
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (typeof gtag === 'function' || attempts > 80) {
            clearInterval(interval);
            fireEvents();
          }
        }, 100);
      }
    });
  }).catch(() => {});

  logger.debug('[GA4] Fired page_view + session_start + first_visit via gtag()');
}

/**
 * Verify that GA4 tracking fired correctly.
 * @param {import('puppeteer').Page} page
 * @returns {Promise<object>}
 */
async function verifyNewUserTracking(page) {
  const data = await page.evaluate(() => {
    const ga4Cookie = document.cookie.match(/_ga=([^;]+)/);
    const dataLayer = window.dataLayer || [];
    return {
      clientId: ga4Cookie ? ga4Cookie[1] : null,
      gtagAvailable: typeof gtag === 'function',
      firstVisitEvents: dataLayer.filter(e => e && e.event === 'first_visit').length,
      sessionStartEvents: dataLayer.filter(e => e && e.event === 'session_start').length,
      pageViews: dataLayer.filter(e => e && e.event === 'page_view').length,
    };
  }).catch(() => ({}));

  if (!data.gtagAvailable) {
    logger.warn('[GA4] ⚠️ gtag() not found on page — GA4 tag may not be installed!');
  }
  if (!data.clientId) {
    logger.warn('[GA4] ⚠️ _ga cookie not found — identity injection may have failed!');
  }

  logger.debug('[GA4] Verification', data);
  return data;
}

module.exports = {
  generateNewGA4Identity,
  triggerFirstVisitEvent,
  verifyNewUserTracking,
};
