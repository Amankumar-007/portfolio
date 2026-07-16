'use strict';

const axios = require('axios');
const proxyChain = require('proxy-chain');
const logger = require('../utils/logger');

/**
 * Proxy Management — handles proxy rotation, health checking, authentication,
 * and automatic fallback for HTTP/HTTPS/SOCKS5 proxies.
 */
class ProxyManager {
  /**
   * @param {object} config - Proxy configuration
   * @param {Array} config.proxies - List of proxy configurations
   * @param {string} config.rotation - 'per_request'|'per_session'|'on_failure'
   */
  constructor(config = {}) {
    this.proxies = config.proxies || [];
    this.rotation = config.rotation || 'per_session';
    this.currentIndex = 0;
    this.failedProxies = new Set();
    this.healthCache = new Map(); // proxyUrl -> { healthy, lastChecked }
    this.healthCheckTimeout = config.healthCheckTimeout || 8000;
    this.healthCacheTtl = config.healthCacheTtl || 5 * 60 * 1000; // 5 minutes

    logger.info(`[ProxyManager] Initialized with ${this.proxies.length} proxies, rotation: ${this.rotation}`);
  }

  /**
   * Build a proxy URL string from a proxy configuration object.
   * @param {object} proxy
   * @returns {string}
   */
  _buildProxyUrl(proxy) {
    const { host, port, user, pass, protocol = 'http' } = proxy;
    if (user && pass) {
      return `${protocol}://${user}:${pass}@${host}:${port}`;
    }
    return `${protocol}://${host}:${port}`;
  }

  /**
   * Validate the format of a proxy URL.
   * @param {string} proxyUrl
   * @returns {boolean}
   */
  _validateProxyUrl(proxyUrl) {
    try {
      const url = new URL(proxyUrl);
      return ['http:', 'https:', 'socks5:'].includes(url.protocol);
    } catch {
      return false;
    }
  }

  /**
   * Check if a proxy is healthy by making a test request.
   * @param {string} proxyUrl
   * @returns {Promise<boolean>}
   */
  async checkHealth(proxyUrl) {
    const cached = this.healthCache.get(proxyUrl);
    if (cached && Date.now() - cached.lastChecked < this.healthCacheTtl) {
      return cached.healthy;
    }

    try {
      const agent = await this._getProxyAgent(proxyUrl);

      // If we couldn't build an agent, we can't verify the proxy — mark it unhealthy
      // to prevent Puppeteer from receiving a broken proxy URL.
      if (agent === null) {
        this.healthCache.set(proxyUrl, { healthy: false, lastChecked: Date.now() });
        logger.warn(`[ProxyManager] Skipping proxy (no agent library): ${this._maskProxy(proxyUrl)}`);
        return false;
      }

      const response = await axios.get('https://httpbin.org/ip', {
        proxy: false,       // disable axios's own proxy handling
        httpsAgent: agent,
        httpAgent: agent,
        timeout: this.healthCheckTimeout,
        validateStatus: (status) => status === 200,
      });

      const healthy = !!response.data?.origin;
      this.healthCache.set(proxyUrl, { healthy, lastChecked: Date.now(), ip: response.data?.origin });

      if (healthy) {
        logger.debug(`[ProxyManager] Proxy healthy: ${this._maskProxy(proxyUrl)} → IP: ${response.data.origin}`);
      }
      return healthy;
    } catch (err) {
      this.healthCache.set(proxyUrl, { healthy: false, lastChecked: Date.now() });
      logger.warn(`[ProxyManager] Proxy health check failed: ${this._maskProxy(proxyUrl)} — ${err.message}`);
      return false;
    }
  }

  /**
   * Create an HTTP/SOCKS agent for the given proxy URL.
   * Returns null if the required package is not installed.
   * @param {string} proxyUrl
   * @returns {Promise<object|null>}
   */
  async _getProxyAgent(proxyUrl) {
    const url = new URL(proxyUrl);

    if (url.protocol === 'socks5:') {
      try {
        const { SocksProxyAgent } = require('socks-proxy-agent');
        return new SocksProxyAgent(proxyUrl);
      } catch {
        logger.warn('[ProxyManager] socks-proxy-agent not installed — cannot verify SOCKS5 proxy');
        return null; // signal: skip this proxy
      }
    }

    // HTTP / HTTPS proxy
    try {
      const { HttpsProxyAgent } = require('https-proxy-agent');
      return new HttpsProxyAgent(proxyUrl);
    } catch {
      // https-proxy-agent not installed — use Node's built-in tunnel as minimal fallback
      try {
        const tunnel = require('tunnel');
        const parsed = new URL(proxyUrl);
        const agent = tunnel.httpsOverHttp({
          proxy: { host: parsed.hostname, port: Number(parsed.port) || 8080 },
        });
        return agent;
      } catch {
        logger.warn('[ProxyManager] No proxy agent library available (install https-proxy-agent). Marking proxy as unhealthy.');
        return null; // signal: skip this proxy
      }
    }
  }

  /**
   * Mask proxy credentials in a URL for safe logging.
   * @param {string} proxyUrl
   * @returns {string}
   */
  _maskProxy(proxyUrl) {
    try {
      const url = new URL(proxyUrl);
      if (url.username) {
        url.username = '***';
        url.password = '***';
      }
      return url.toString();
    } catch {
      return '[invalid proxy]';
    }
  }

  /**
   * Get the next proxy in rotation, skipping failed ones.
   * @returns {Promise<string|null>} Anonymized proxy URL compatible with Puppeteer
   */
  async getNextProxy() {
    if (this.proxies.length === 0) return null;

    const maxAttempts = this.proxies.length;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const proxy = this.proxies[this.currentIndex % this.proxies.length];
      this.currentIndex = (this.currentIndex + 1) % this.proxies.length;

      const proxyUrl = this._buildProxyUrl(proxy);

      if (!this._validateProxyUrl(proxyUrl)) {
        logger.warn(`[ProxyManager] Invalid proxy URL: ${this._maskProxy(proxyUrl)}`);
        attempts++;
        continue;
      }

      if (this.failedProxies.has(proxyUrl)) {
        attempts++;
        continue;
      }

      const healthy = await this.checkHealth(proxyUrl);
      if (!healthy) {
        this.failedProxies.add(proxyUrl);
        attempts++;
        continue;
      }

      // Anonymize proxy URL through proxy-chain for credential security
      try {
        const anonymizedUrl = await proxyChain.anonymizeProxy(proxyUrl);
        logger.debug(`[ProxyManager] Using proxy: ${this._maskProxy(proxyUrl)}`);
        return anonymizedUrl;
      } catch (err) {
        logger.warn(`[ProxyManager] Failed to anonymize proxy: ${err.message}`);
        return proxyUrl;
      }
    }

    logger.error('[ProxyManager] All proxies are unavailable');
    return null;
  }

  /**
   * Mark a proxy as failed (for on_failure rotation).
   * @param {string} proxyUrl
   */
  markFailed(proxyUrl) {
    this.failedProxies.add(proxyUrl);
    this.healthCache.set(proxyUrl, { healthy: false, lastChecked: Date.now() });
    logger.warn(`[ProxyManager] Marked proxy as failed: ${this._maskProxy(proxyUrl)}`);
  }

  /**
   * Reset failed proxy list and health cache for retry cycles.
   */
  resetFailed() {
    const count = this.failedProxies.size;
    this.failedProxies.clear();
    this.healthCache.clear();
    logger.info(`[ProxyManager] Reset ${count} failed proxies`);
  }

  /**
   * Get a summary of proxy health status.
   * @returns {object}
   */
  getStatus() {
    return {
      total: this.proxies.length,
      failed: this.failedProxies.size,
      healthy: this.proxies.length - this.failedProxies.size,
      rotation: this.rotation,
    };
  }

  /**
   * Close all anonymized proxy server instances.
   */
  async closeAll() {
    try {
      await proxyChain.closeAnonymizedProxy();
    } catch (_) {}
  }
}

module.exports = ProxyManager;
