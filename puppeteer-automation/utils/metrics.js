'use strict';

const fs = require('fs').promises;
const path = require('path');
const { createObjectCsvWriter } = require('fast-csv');
const logger = require('./logger');

/**
 * Metrics Collector — tracks per-session performance, success/failure rates,
 * timing data, and exports results to CSV.
 */
class MetricsCollector {
  constructor(outputDir = './metrics') {
    this.outputDir = path.resolve(outputDir);
    this.records = [];
    this.sessionMetrics = new Map();
  }

  async initialize() {
    await fs.mkdir(this.outputDir, { recursive: true });
  }

  /**
   * Record a task execution result.
   * @param {object} data
   */
  record(data) {
    const record = {
      timestamp: new Date().toISOString(),
      sessionId: data.sessionId || 'unknown',
      url: data.url || '',
      status: data.status || 'unknown', // 'success'|'failure'|'retry'
      statusCode: data.statusCode || null,
      loadTimeMs: data.loadTimeMs || 0,
      interactionTimeMs: data.interactionTimeMs || 0,
      totalTimeMs: data.totalTimeMs || 0,
      retryCount: data.retryCount || 0,
      errorMessage: data.errorMessage || null,
      captchaEncountered: data.captchaEncountered || false,
      captchaSolved: data.captchaSolved || false,
      proxyUsed: data.proxyUsed || null,
      ...data.extra,
    };

    this.records.push(record);

    // Update per-session aggregate
    const sessionId = record.sessionId;
    if (!this.sessionMetrics.has(sessionId)) {
      this.sessionMetrics.set(sessionId, { success: 0, failure: 0, totalMs: 0, count: 0 });
    }
    const sm = this.sessionMetrics.get(sessionId);
    sm.count++;
    sm.totalMs += record.totalTimeMs;
    if (record.status === 'success') sm.success++;
    else sm.failure++;
  }

  /**
   * Get aggregate summary statistics.
   * @returns {object}
   */
  getSummary() {
    const total = this.records.length;
    const successful = this.records.filter((r) => r.status === 'success').length;
    const failed = this.records.filter((r) => r.status === 'failure').length;
    const avgLoadTime =
      total > 0
        ? Math.round(this.records.reduce((sum, r) => sum + r.loadTimeMs, 0) / total)
        : 0;
    const avgTotalTime =
      total > 0
        ? Math.round(this.records.reduce((sum, r) => sum + r.totalTimeMs, 0) / total)
        : 0;

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? `${((successful / total) * 100).toFixed(1)}%` : '0%',
      avgLoadTimeMs: avgLoadTime,
      avgTotalTimeMs: avgTotalTime,
      captchaEncountered: this.records.filter((r) => r.captchaEncountered).length,
      captchaSolved: this.records.filter((r) => r.captchaSolved).length,
    };
  }

  /**
   * Log the current summary to the logger.
   */
  logSummary() {
    const summary = this.getSummary();
    logger.info('[Metrics] Session Summary', summary);
  }

  /**
   * Export all records to a CSV file.
   * @returns {Promise<string>} Path to the exported CSV file
   */
  async exportCsv() {
    if (this.records.length === 0) {
      logger.warn('[Metrics] No records to export');
      return null;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const csvPath = path.join(this.outputDir, `metrics_${timestamp}.csv`);

    return new Promise((resolve, reject) => {
      const ws = require('fs').createWriteStream(csvPath);
      const csv = require('fast-csv');

      csv
        .write(this.records, { headers: true })
        .pipe(ws)
        .on('finish', () => {
          logger.info(`[Metrics] Exported ${this.records.length} records to ${csvPath}`);
          resolve(csvPath);
        })
        .on('error', reject);
    });
  }

  /**
   * Export all records to a JSON file.
   * @returns {Promise<string>} Path to the exported JSON file
   */
  async exportJson() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonPath = path.join(this.outputDir, `metrics_${timestamp}.json`);

    await fs.writeFile(
      jsonPath,
      JSON.stringify({ summary: this.getSummary(), records: this.records }, null, 2),
      'utf8'
    );

    logger.info(`[Metrics] Exported JSON to ${jsonPath}`);
    return jsonPath;
  }
}

module.exports = MetricsCollector;
