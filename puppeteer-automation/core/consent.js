'use strict';

/**
 * core/consent.js — Cookie & GDPR Consent Handler
 *
 * Automatically detects and interacts with cookie consent banners
 * before GA4 tracking begins. GA4 requires consent to be granted
 * before it fires full measurement events in consent mode v2.
 *
 * Simulates human behavior: reads the banner for a moment,
 * then clicks Accept with a natural delay.
 */

const logger = require('../utils/logger');

// Ordered list of consent button selectors (most common first)
const ACCEPT_SELECTORS = [
  // ID-based
  '#accept-cookies',
  '#cookie-accept',
  '#acceptBtn',
  '#cookieAccept',
  '#consent-accept',
  '#onetrust-accept-btn-handler',
  '#CybotCookiebotDialogBodyButtonAccept',

  // Class-based
  '.cc-accept',
  '.cc-allow',
  '.cc-btn.cc-allow',
  '.cookie-accept',
  '.cookie-banner__accept',
  '.cookie-consent__accept',
  '.js-accept-cookies',
  '.gdpr-accept',

  // Attribute-based (wildcard patterns)
  '[id*="accept"][id*="cookie" i]',
  '[class*="accept"][class*="cookie" i]',
  '[class*="cookie"][class*="accept" i]',
  '[class*="consent"][class*="accept" i]',
  '[data-action="accept-cookies"]',
  '[data-cookie-consent="accept"]',

  // Text-based buttons (common labels)
  'button[aria-label*="Accept" i]',
  'button[aria-label*="Agree" i]',
  'button[aria-label*="Allow" i]',
  'a[aria-label*="Accept" i]',
];

// Selectors to dismiss modals / overlays before interacting
const DISMISS_SELECTORS = [
  '.cookie-modal .close',
  '[aria-label="Close"]',
  '.modal__close',
];

/**
 * Handle cookie consent banners on the current page.
 * @param {import('puppeteer').Page} page
 * @param {object} [options]
 * @param {number} [options.maxWaitMs=3000] - How long to wait for banner to appear
 * @returns {Promise<boolean>} true if a consent button was clicked
 */
async function handleCookieConsent(page, options = {}) {
  const maxWaitMs = options.maxWaitMs ?? 3000;
  const startMs = Date.now();

  // Wait briefly for consent banners to render (they often appear after JS load)
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

  // Try each selector
  for (const selector of ACCEPT_SELECTORS) {
    if (Date.now() - startMs > maxWaitMs) break;

    try {
      const button = await page.$(selector);
      if (!button) continue;

      const box = await button.boundingBox();
      if (!box || box.width === 0) continue;

      // Human-like pause: reads the banner first
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 1500));

      // Scroll banner into view
      await button.scrollIntoViewIfNeeded().catch(() => {});
      await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));

      // Hover then click
      await button.hover().catch(() => {});
      await new Promise((r) => setTimeout(r, 150 + Math.random() * 250));
      await button.click();

      // Wait for banner to dismiss
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));

      // Push consent event to dataLayer (GA4 Consent Mode v2)
      await page.evaluate(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'cookie_consent_update',
          analytics_storage: 'granted',
          ad_storage: 'denied',
          functionality_storage: 'granted',
        });

        // Also call gtag consent update if available
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            functionality_storage: 'granted',
          });
        }
      });

      logger.debug(`[Consent] Accepted cookie consent via: ${selector}`);
      return true;
    } catch {
      // Selector didn't work, try next
    }
  }

  logger.debug('[Consent] No cookie consent banner found (or already accepted)');
  return false;
}

/**
 * Check if the page has a cookie consent banner visible.
 * @param {import('puppeteer').Page} page
 * @returns {Promise<boolean>}
 */
async function hasCookieBanner(page) {
  return page.evaluate(() => {
    const keywords = ['cookie', 'consent', 'gdpr', 'privacy'];
    const elements = document.querySelectorAll(
      '[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="gdpr" i]'
    );
    for (const el of elements) {
      const style = window.getComputedStyle(el);
      if (style.display !== 'none' && style.visibility !== 'hidden' && el.offsetHeight > 0) {
        return true;
      }
    }
    return false;
  }).catch(() => false);
}

module.exports = { handleCookieConsent, hasCookieBanner };
