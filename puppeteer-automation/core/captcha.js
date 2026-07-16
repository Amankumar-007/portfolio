'use strict';

const axios = require('axios');
const logger = require('../utils/logger');

/**
 * CAPTCHA Handler — detects CAPTCHA challenges on pages, integrates with
 * third-party solving services (2Captcha, Anti-Captcha), and auto-injects
 * solutions into forms.
 */
class CaptchaHandler {
  /**
   * @param {object} config - CAPTCHA service configuration
   * @param {string} config.service - '2captcha'|'anticaptcha'
   * @param {string} config.apiKey - API key for the CAPTCHA service
   * @param {number} [config.pollIntervalMs=3000] - Polling interval in ms
   * @param {number} [config.maxPollAttempts=40] - Maximum polling attempts
   */
  constructor(config = {}) {
    this.service = config.service || '2captcha';
    this.apiKey = config.apiKey || process.env.CAPTCHA_API_KEY;
    this.pollIntervalMs = config.pollIntervalMs || 3000;
    this.maxPollAttempts = config.maxPollAttempts || 40;

    if (!this.apiKey) {
      logger.warn('[CaptchaHandler] No API key provided. CAPTCHA solving will fail.');
    }
  }

  // ─── Detection ─────────────────────────────────────────────────────────────

  /**
   * Check if the current page has an active CAPTCHA challenge.
   * @param {import('puppeteer').Page} page
   * @returns {Promise<{detected: boolean, type: string|null, siteKey: string|null}>}
   */
  async detect(page) {
    const result = await page.evaluate(() => {
      // Check for reCAPTCHA v2 / invisible
      const recaptchaEl = document.querySelector('.g-recaptcha, [data-sitekey]');
      if (recaptchaEl) {
        const siteKey = recaptchaEl.getAttribute('data-sitekey') || null;
        return { detected: true, type: 'recaptcha_v2', siteKey };
      }

      // Check for reCAPTCHA iframe
      const recaptchaIframe = document.querySelector('iframe[src*="recaptcha"]');
      if (recaptchaIframe) {
        const src = recaptchaIframe.src;
        const match = src.match(/[?&]k=([^&]+)/);
        const siteKey = match ? match[1] : null;
        return { detected: true, type: 'recaptcha_v2', siteKey };
      }

      // Check for hCaptcha
      const hcaptchaEl = document.querySelector('.h-captcha, [data-hcaptcha-sitekey]');
      if (hcaptchaEl) {
        const siteKey =
          hcaptchaEl.getAttribute('data-sitekey') ||
          hcaptchaEl.getAttribute('data-hcaptcha-sitekey') ||
          null;
        return { detected: true, type: 'hcaptcha', siteKey };
      }

      // Check for hCaptcha iframe
      const hcaptchaIframe = document.querySelector('iframe[src*="hcaptcha"]');
      if (hcaptchaIframe) {
        const match = hcaptchaIframe.src.match(/sitekey=([^&]+)/);
        return { detected: true, type: 'hcaptcha', siteKey: match ? match[1] : null };
      }

      // Check for "I'm not a robot" checkbox
      const robotCheckbox = document.querySelector(
        '[type="checkbox"][name*="robot"], [aria-label*="not a robot"], [aria-label*="human"]'
      );
      if (robotCheckbox) {
        return { detected: true, type: 'checkbox', siteKey: null };
      }

      // Check for Cloudflare challenge
      const cfChallenge = document.querySelector('#cf-challenge-running, .cf-browser-verification');
      if (cfChallenge) {
        return { detected: true, type: 'cloudflare', siteKey: null };
      }

      return { detected: false, type: null, siteKey: null };
    });

    if (result.detected) {
      logger.info(`[CaptchaHandler] Detected CAPTCHA type: ${result.type}`);
    }

    return result;
  }

  /**
   * Monitor the page for CAPTCHA challenges at regular intervals.
   * @param {import('puppeteer').Page} page
   * @param {number} [intervalMs=2000]
   * @returns {Function} Stop function to clear the monitor
   */
  startMonitoring(page, intervalMs = 2000) {
    const interval = setInterval(async () => {
      try {
        const { detected, type } = await this.detect(page);
        if (detected) {
          logger.warn(`[CaptchaHandler] CAPTCHA detected during monitoring: ${type}`);
          clearInterval(interval);
        }
      } catch (_) {}
    }, intervalMs);

    return () => clearInterval(interval);
  }

  // ─── 2Captcha Integration ──────────────────────────────────────────────────

  /**
   * Submit a reCAPTCHA task to 2Captcha.
   * @param {string} siteKey - reCAPTCHA site key
   * @param {string} pageUrl - URL where CAPTCHA appears
   * @returns {Promise<string>} Task ID
   */
  async _2captchaSubmit(siteKey, pageUrl, type = 'recaptcha_v2') {
    const params = {
      key: this.apiKey,
      method: type === 'hcaptcha' ? 'hcaptcha' : 'userrecaptcha',
      googlekey: siteKey,
      sitekey: siteKey,
      pageurl: pageUrl,
      json: 1,
    };

    const response = await axios.post('https://2captcha.com/in.php', null, { params });

    if (response.data.status !== 1) {
      throw new Error(`2Captcha submit failed: ${response.data.request}`);
    }

    logger.debug(`[CaptchaHandler] 2Captcha task ID: ${response.data.request}`);
    return response.data.request;
  }

  /**
   * Poll 2Captcha for a solution.
   * @param {string} taskId
   * @returns {Promise<string>} CAPTCHA solution token
   */
  async _2captchaPoll(taskId) {
    for (let i = 0; i < this.maxPollAttempts; i++) {
      await new Promise((r) => setTimeout(r, this.pollIntervalMs));

      const response = await axios.get('https://2captcha.com/res.php', {
        params: { key: this.apiKey, action: 'get', id: taskId, json: 1 },
      });

      if (response.data.status === 1) {
        logger.info('[CaptchaHandler] 2Captcha solution received');
        return response.data.request;
      }

      if (response.data.request !== 'CAPCHA_NOT_READY') {
        throw new Error(`2Captcha error: ${response.data.request}`);
      }

      logger.debug(`[CaptchaHandler] Waiting for 2Captcha solution... (attempt ${i + 1})`);
    }

    throw new Error('[CaptchaHandler] 2Captcha solution timeout');
  }

  // ─── Anti-Captcha Integration ──────────────────────────────────────────────

  /**
   * Submit a task to Anti-Captcha service.
   * @param {string} siteKey
   * @param {string} pageUrl
   * @param {string} type - 'recaptcha_v2'|'hcaptcha'
   * @returns {Promise<number>} Task ID
   */
  async _anticaptchaSubmit(siteKey, pageUrl, type = 'recaptcha_v2') {
    const taskType = type === 'hcaptcha' ? 'HCaptchaTaskProxyless' : 'NoCaptchaTaskProxyless';

    const response = await axios.post('https://api.anti-captcha.com/createTask', {
      clientKey: this.apiKey,
      task: {
        type: taskType,
        websiteURL: pageUrl,
        websiteKey: siteKey,
      },
    });

    if (response.data.errorId !== 0) {
      throw new Error(`Anti-Captcha submit failed: ${response.data.errorDescription}`);
    }

    logger.debug(`[CaptchaHandler] Anti-Captcha task ID: ${response.data.taskId}`);
    return response.data.taskId;
  }

  /**
   * Poll Anti-Captcha for a solution.
   * @param {number} taskId
   * @returns {Promise<string>} CAPTCHA solution token
   */
  async _anticaptchaPoll(taskId) {
    for (let i = 0; i < this.maxPollAttempts; i++) {
      await new Promise((r) => setTimeout(r, this.pollIntervalMs));

      const response = await axios.post('https://api.anti-captcha.com/getTaskResult', {
        clientKey: this.apiKey,
        taskId,
      });

      if (response.data.errorId !== 0) {
        throw new Error(`Anti-Captcha error: ${response.data.errorDescription}`);
      }

      if (response.data.status === 'ready') {
        logger.info('[CaptchaHandler] Anti-Captcha solution received');
        return response.data.solution.gRecaptchaResponse;
      }

      logger.debug(`[CaptchaHandler] Waiting for Anti-Captcha solution... (attempt ${i + 1})`);
    }

    throw new Error('[CaptchaHandler] Anti-Captcha solution timeout');
  }

  // ─── Solution Injection ────────────────────────────────────────────────────

  /**
   * Inject a CAPTCHA token into the page's hidden response field and trigger callbacks.
   * @param {import('puppeteer').Page} page
   * @param {string} token - Solution token
   */
  async injectSolution(page, token) {
    await page.evaluate((token) => {
      // Inject into reCAPTCHA response field
      const responseField = document.querySelector('[name="g-recaptcha-response"]');
      if (responseField) {
        responseField.value = token;
        responseField.innerHTML = token;
      }

      // Inject into hCaptcha response field
      const hcaptchaField = document.querySelector('[name="h-captcha-response"]');
      if (hcaptchaField) {
        hcaptchaField.value = token;
        hcaptchaField.innerHTML = token;
      }

      // Trigger reCAPTCHA callback if available
      if (typeof window.___grecaptcha_cfg !== 'undefined') {
        const clients = window.___grecaptcha_cfg.clients;
        if (clients) {
          Object.values(clients).forEach((client) => {
            const callbackKey = Object.keys(client).find((k) => client[k]?.callback);
            if (callbackKey) {
              try {
                client[callbackKey].callback(token);
              } catch (_) {}
            }
          });
        }
      }

      // Trigger hCaptcha callback
      if (typeof window.hcaptcha !== 'undefined') {
        try {
          const mockEvent = new Event('submit');
          document.forms[0]?.dispatchEvent(mockEvent);
        } catch (_) {}
      }
    }, token);

    logger.info('[CaptchaHandler] CAPTCHA solution injected');
  }

  // ─── Main Solve Flow ───────────────────────────────────────────────────────

  /**
   * Detect and automatically solve a CAPTCHA on the given page.
   * @param {import('puppeteer').Page} page
   * @returns {Promise<boolean>} True if solved, false if no CAPTCHA found
   */
  async solve(page) {
    if (!this.apiKey) {
      throw new Error('[CaptchaHandler] Cannot solve CAPTCHA: no API key configured');
    }

    const { detected, type, siteKey } = await this.detect(page);

    if (!detected) {
      return false;
    }

    if (type === 'cloudflare') {
      logger.warn('[CaptchaHandler] Cloudflare challenge detected — manual intervention may be required');
      return false;
    }

    if (!siteKey && type !== 'checkbox') {
      logger.warn(`[CaptchaHandler] Cannot solve ${type}: no site key found`);
      return false;
    }

    const pageUrl = page.url();
    logger.info(`[CaptchaHandler] Solving ${type} CAPTCHA on ${pageUrl}`);

    let token;

    if (this.service === '2captcha') {
      const taskId = await this._2captchaSubmit(siteKey, pageUrl, type);
      token = await this._2captchaPoll(taskId);
    } else if (this.service === 'anticaptcha') {
      const taskId = await this._anticaptchaSubmit(siteKey, pageUrl, type);
      token = await this._anticaptchaPoll(taskId);
    } else {
      throw new Error(`Unknown CAPTCHA service: ${this.service}`);
    }

    await this.injectSolution(page, token);
    return true;
  }
}

module.exports = CaptchaHandler;
