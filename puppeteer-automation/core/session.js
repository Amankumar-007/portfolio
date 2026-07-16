'use strict';

const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

/**
 * Session Management — persists browser cookies, localStorage, sessionStorage,
 * and metadata across restarts to maintain logged-in states.
 */
class SessionManager {
  /**
   * @param {string} [sessionsDir='./sessions'] - Root directory for session storage
   */
  constructor(sessionsDir = './sessions') {
    this.sessionsDir = path.resolve(sessionsDir);
  }

  /**
   * Ensure the sessions root directory exists.
   */
  async initialize() {
    await fs.mkdir(this.sessionsDir, { recursive: true });
    logger.debug(`[SessionManager] Sessions directory: ${this.sessionsDir}`);
  }

  /**
   * Get the path to a specific session directory.
   * @param {string} sessionId
   * @returns {string}
   */
  _sessionPath(sessionId) {
    return path.join(this.sessionsDir, sessionId);
  }

  /**
   * Save the current browser session state to disk.
   * @param {string} sessionId
   * @param {import('puppeteer').Page} page
   * @param {object} [meta={}] - Additional metadata to store
   */
  async save(sessionId, page, meta = {}) {
    const sessionDir = this._sessionPath(sessionId);
    await fs.mkdir(sessionDir, { recursive: true });

    // Save cookies
    const cookies = await page.cookies();
    await fs.writeFile(
      path.join(sessionDir, 'cookies.json'),
      JSON.stringify(cookies, null, 2),
      'utf8'
    );

    // Save localStorage and sessionStorage
    const storageData = await page.evaluate(() => {
      const local = {};
      const session = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        local[key] = localStorage.getItem(key);
      }

      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        session[key] = sessionStorage.getItem(key);
      }

      return { localStorage: local, sessionStorage: session };
    });

    await fs.writeFile(
      path.join(sessionDir, 'localStorage.json'),
      JSON.stringify(storageData.localStorage, null, 2),
      'utf8'
    );

    await fs.writeFile(
      path.join(sessionDir, 'sessionStorage.json'),
      JSON.stringify(storageData.sessionStorage, null, 2),
      'utf8'
    );

    // Save metadata
    const metadata = {
      sessionId,
      savedAt: new Date().toISOString(),
      url: page.url(),
      cookieCount: cookies.length,
      ...meta,
    };

    await fs.writeFile(
      path.join(sessionDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2),
      'utf8'
    );

    logger.info(`[SessionManager] Saved session ${sessionId} (${cookies.length} cookies)`);
    return metadata;
  }

  /**
   * Restore a previously saved session into the current page.
   * @param {string} sessionId
   * @param {import('puppeteer').Page} page
   * @returns {Promise<boolean>} True if session was restored, false if not found
   */
  async restore(sessionId, page) {
    const sessionDir = this._sessionPath(sessionId);

    const cookiesPath = path.join(sessionDir, 'cookies.json');
    const localStoragePath = path.join(sessionDir, 'localStorage.json');

    // Check if session exists
    try {
      await fs.access(cookiesPath);
    } catch {
      logger.debug(`[SessionManager] No saved session found for ${sessionId}`);
      return false;
    }

    // Restore cookies
    const cookiesRaw = await fs.readFile(cookiesPath, 'utf8');
    const cookies = JSON.parse(cookiesRaw);

    if (cookies.length > 0) {
      await page.setCookie(...cookies);
    }

    // Restore localStorage (requires navigating to domain first)
    try {
      const localStorageRaw = await fs.readFile(localStoragePath, 'utf8');
      const localStorageData = JSON.parse(localStorageRaw);

      if (Object.keys(localStorageData).length > 0) {
        await page.evaluate((data) => {
          for (const [key, value] of Object.entries(data)) {
            try {
              localStorage.setItem(key, value);
            } catch (_) {}
          }
        }, localStorageData);
      }
    } catch {
      logger.debug(`[SessionManager] No localStorage data for session ${sessionId}`);
    }

    logger.info(`[SessionManager] Restored session ${sessionId} (${cookies.length} cookies)`);
    return true;
  }

  /**
   * Delete a session from disk.
   * @param {string} sessionId
   */
  async delete(sessionId) {
    const sessionDir = this._sessionPath(sessionId);
    await fs.rm(sessionDir, { recursive: true, force: true });
    logger.info(`[SessionManager] Deleted session ${sessionId}`);
  }

  /**
   * List all stored sessions with their metadata.
   * @returns {Promise<object[]>}
   */
  async list() {
    try {
      const entries = await fs.readdir(this.sessionsDir, { withFileTypes: true });
      const sessions = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const metaPath = path.join(this.sessionsDir, entry.name, 'metadata.json');
        try {
          const raw = await fs.readFile(metaPath, 'utf8');
          sessions.push(JSON.parse(raw));
        } catch {
          sessions.push({ sessionId: entry.name, savedAt: null });
        }
      }

      return sessions;
    } catch {
      return [];
    }
  }

  /**
   * Check if a session exists on disk.
   * @param {string} sessionId
   * @returns {Promise<boolean>}
   */
  async exists(sessionId) {
    const cookiesPath = path.join(this._sessionPath(sessionId), 'cookies.json');
    try {
      await fs.access(cookiesPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Read saved metadata for a session without restoring it.
   * @param {string} sessionId
   * @returns {Promise<object|null>}
   */
  async getMetadata(sessionId) {
    const metaPath = path.join(this._sessionPath(sessionId), 'metadata.json');
    try {
      const raw = await fs.readFile(metaPath, 'utf8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Clean sessions older than a given age.
   * @param {number} maxAgeMs - Maximum age in milliseconds
   */
  async cleanOld(maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
    const sessions = await this.list();
    const now = Date.now();
    let cleaned = 0;

    for (const session of sessions) {
      if (session.savedAt) {
        const age = now - new Date(session.savedAt).getTime();
        if (age > maxAgeMs) {
          await this.delete(session.sessionId);
          cleaned++;
        }
      }
    }

    if (cleaned > 0) {
      logger.info(`[SessionManager] Cleaned ${cleaned} old sessions`);
    }

    return cleaned;
  }
}

module.exports = SessionManager;
