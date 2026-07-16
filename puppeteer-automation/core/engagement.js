'use strict';

const logger = require('../utils/logger');

/**
 * GA4-aware Engagement Simulator — drives realistic on-page behavior
 * (scrolling, hovering, dwell time) and verifies GA4 actually received
 * hits, so recorded traffic matches what a real visitor would generate.
 */
class EngagementSimulator {
  /**
   * @param {import('puppeteer').Page} page
   * @param {object} [options={}]
   */
  constructor(page, options = {}) {
    this.page = page;
    this.options = {
      simulateEngagement: options.simulateEngagement ?? true,
      simulateScrolling: options.simulateScrolling ?? true,
      simulateClicks: options.simulateClicks ?? true,
      bounceRate: options.bounceRate ?? 0.4,
      minSessionDuration: options.minSessionDuration ?? 5000,
      maxSessionDuration: options.maxSessionDuration ?? 60000,
      ...options,
    };

    this.ga4Hits = [];
    this._trackGA4Requests();
  }

  /**
   * Listen for outgoing GA4 Measurement Protocol requests so we can verify
   * real hits are being sent, not just dataLayer pushes.
   */
  _trackGA4Requests() {
    this.page.on('request', (request) => {
      const url = request.url();
      if (url.includes('/g/collect') || url.includes('google-analytics.com/collect')) {
        this.ga4Hits.push({ url, timestamp: Date.now() });
      }
    });
  }

  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Scroll through the page in natural, variable increments for a duration.
   * @param {number} durationMs
   */
  async _simulateScrolling(durationMs) {
    const start = Date.now();

    while (Date.now() - start < durationMs) {
      const amount = this._randomInt(150, 600) * (Math.random() < 0.15 ? -1 : 1);

      await this.page
        .evaluate((y) => window.scrollBy({ top: y, behavior: 'smooth' }), amount)
        .catch(() => {});

      await this._sleep(this._randomInt(400, 1600));

      const atBottom = await this.page
        .evaluate(() => window.scrollY + window.innerHeight >= document.body.scrollHeight - 50)
        .catch(() => false);

      if (atBottom) break;
    }
  }

  /**
   * Hover over a handful of interactive elements to simulate engagement
   * without risking mid-session navigation from an actual click.
   */
  async _simulateClicks() {
    const clickable = await this.page.$$('a, button').catch(() => []);
    if (!clickable.length) return;

    const attempts = Math.min(this._randomInt(1, 2), clickable.length);

    for (let i = 0; i < attempts; i++) {
      const el = clickable[this._randomInt(0, clickable.length - 1)];
      try {
        const box = await el.boundingBox();
        if (!box) continue;
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
        await this._sleep(this._randomInt(200, 600));
      } catch (_) {
        // Element may have detached — skip it
      }
    }
  }

  /**
   * Find an internal link, click it, and simulate reading that new page.
   */
  async _clickInternalLinkAndBrowse(durationMs) {
    const start = Date.now();
    try {
      // Find all internal links
      const links = await this.page.$$eval('a', (anchors) => {
        return anchors
          .filter(a => a.href && a.href.startsWith(window.location.origin) && !a.href.includes('#') && a.href !== window.location.href)
          .map(a => a.href);
      }).catch(() => []);

      if (links.length > 0) {
        // Pick a random link
        const targetUrl = links[this._randomInt(0, links.length - 1)];
        logger.debug(`[Engagement] Navigating to internal link: ${targetUrl}`);
        
        await Promise.all([
          this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {}),
          this.page.goto(targetUrl).catch(() => {})
        ]);

        const remainingTime = durationMs - (Date.now() - start);
        if (remainingTime > 0) {
          await this._simulateScrolling(remainingTime);
        }
      } else {
        await this._simulateScrolling(durationMs);
      }
    } catch (e) {
      const remainingTime = durationMs - (Date.now() - start);
      if (remainingTime > 0) {
        await this._simulateScrolling(remainingTime);
      }
    }
  }

  /**
   * Run a full engagement session: either a quick bounce or a longer
   * scroll/hover session, matching real visitor distribution.
   * @param {boolean} [forceBounce] - Override the configured bounce rate
   * @returns {Promise<{bounced: boolean, durationMs: number}>}
   */
  async runSession(forceBounce) {
    const bounced = forceBounce ?? Math.random() < this.options.bounceRate;
    const start = Date.now();
    const targetDuration = this._randomInt(this.options.minSessionDuration, this.options.maxSessionDuration);

    if (bounced) {
      // Still respects the configured minimum dwell time — just mostly idle
      // with a light scroll instead of full active engagement.
      if (this.options.simulateScrolling) {
        await this._simulateScrolling(Math.round(targetDuration * 0.2));
      }
      const bounceElapsed = Date.now() - start;
      if (bounceElapsed < targetDuration) {
        await this._sleep(targetDuration - bounceElapsed);
      }
      logger.debug(`[Engagement] Session bounced (dwelled ${Date.now() - start}ms)`);
      return { bounced: true, durationMs: Date.now() - start };
    }

    if (this.options.simulateScrolling) {
      await this._simulateScrolling(Math.round(targetDuration * 0.4));
    }
    if (this.options.simulateClicks) {
      await this._simulateClicks();
    }
    
    // Browse to another internal page to simulate deep engagement
    await this._clickInternalLinkAndBrowse(Math.round(targetDuration * 0.4));

    // Fire a manual engagement signal so GA4 doesn't classify this as a bounce
    await this.page
      .evaluate(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'user_engagement', engagement_time_msec: 20000 });
        if (typeof gtag === 'function') {
          gtag('event', 'user_engagement', { engagement_time_msec: 20000 });
        }
      })
      .catch(() => {});

    const elapsed = Date.now() - start;
    if (elapsed < targetDuration) {
      await this._sleep(targetDuration - elapsed);
    }

    logger.debug(`[Engagement] Session completed in ${Date.now() - start}ms`);
    return { bounced: false, durationMs: Date.now() - start };
  }

  /**
   * Verify that real GA4 network hits (and dataLayer events) were observed.
   * @returns {Promise<{ga4Events: number, dataLayerEvents: number}>}
   */
  async verifyGA4Collection() {
    const dataLayerEvents = await this.page
      .evaluate(() => (window.dataLayer || []).filter((e) => e && e.event).length)
      .catch(() => 0);

    const result = { ga4Events: this.ga4Hits.length, dataLayerEvents };
    logger.debug('[Engagement] GA4 collection check', result);
    return result;
  }
}

module.exports = EngagementSimulator;
