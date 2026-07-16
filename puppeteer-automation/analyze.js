'use strict';

/**
 * analyze.js — Puppeteer Automation Framework: Metrics Dashboard
 *
 * Reads all exported metrics files and renders a rich terminal report covering:
 *   • Overall traffic & success/failure rates
 *   • Puppeteer session performance (load time, interaction time, retries)
 *   • Per-URL breakdown
 *   • CAPTCHA encounter stats
 *   • Proxy usage stats
 *   • Fingerprint diversity (from session metadata)
 *   • Hourly/daily traffic volume
 *   • Slowest & fastest requests
 *   • Anomaly detection (timeouts, excessive retries)
 *
 * Usage:
 *   node analyze.js                         # analyze all metrics files
 *   node analyze.js --file metrics/foo.json # analyze one file
 *   node analyze.js --last 5               # analyze last N metric runs
 *   node analyze.js --since 2024-01-01     # analyze since a date
 *   node analyze.js --export report.json   # also write a JSON report
 */

const fs = require('fs');
const path = require('path');

// ─── Terminal Colors & Formatting ─────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m',
  bgMagenta: '\x1b[45m',
};

const W = process.stdout.columns || 100;

function colored(str, ...codes) {
  return codes.join('') + str + C.reset;
}

function hr(char = '─', color = C.dim) {
  return color + char.repeat(W) + C.reset;
}

function header(title) {
  const pad = Math.max(0, Math.floor((W - title.length - 4) / 2));
  const line = '═'.repeat(W);
  const titleLine = '║' + ' '.repeat(pad) + colored(title, C.bold, C.cyan) + ' '.repeat(Math.max(0, W - pad - title.length - 2)) + '║';
  return [
    colored(line, C.blue),
    colored(titleLine, C.blue),
    colored(line, C.blue),
  ].join('\n');
}

function sectionTitle(title, icon = '▶') {
  return '\n' + colored(`${icon} ${title}`, C.bold, C.yellow) + '\n' + hr('─', C.dim);
}

function kv(key, value, valueColor = C.white) {
  const keyStr = colored(key.padEnd(32, ' '), C.dim);
  const valStr = colored(String(value), valueColor);
  return `  ${keyStr} ${valStr}`;
}

function progressBar(value, max, width = 30, color = C.green) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const filled = Math.round(pct * width);
  const empty = width - filled;
  const bar = color + '█'.repeat(filled) + C.dim + '░'.repeat(empty) + C.reset;
  const pctStr = colored(`${(pct * 100).toFixed(1)}%`, C.bold);
  return `[${bar}] ${pctStr}`;
}

function statusBadge(status) {
  if (status === 'success') return colored(' ✓ SUCCESS ', C.bold, C.bgGreen, C.white);
  if (status === 'failure') return colored(' ✗ FAILURE ', C.bold, C.bgRed, C.white);
  if (status === 'retry')   return colored(' ↻ RETRY   ', C.bold, C.bgYellow, C.white);
  return colored(` ${status} `, C.bold);
}

function formatMs(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function trafficBar(count, maxCount, label, color = C.cyan) {
  const bar = progressBar(count, maxCount, 20, color);
  return `  ${colored(label.padEnd(35, ' '), C.white)} ${bar} ${colored(count, C.bold)}`;
}

// ─── CLI Argument Parsing ─────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    metricsDir: './metrics',
    sessionsDir: './sessions',
    logsDir: './logs',
    file: null,
    last: null,
    since: null,
    exportPath: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) opts.file = args[++i];
    else if (args[i] === '--last' && args[i + 1]) opts.last = parseInt(args[++i]);
    else if (args[i] === '--since' && args[i + 1]) opts.since = new Date(args[++i]);
    else if (args[i] === '--export' && args[i + 1]) opts.exportPath = args[++i];
    else if (args[i] === '--dir' && args[i + 1]) opts.metricsDir = args[++i];
    else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: node analyze.js [options]

Options:
  --file <path>     Analyze a specific metrics JSON file
  --last <n>        Analyze last N metric run files
  --since <date>    Analyze records since date (e.g. 2024-01-01)
  --dir <path>      Metrics directory (default: ./metrics)
  --export <path>   Export analysis report to JSON file
  -h, --help        Show this help

Examples:
  node analyze.js
  node analyze.js --last 3
  node analyze.js --file metrics/metrics_2024-01-15.json
  node analyze.js --since 2024-01-01 --export report.json
`);
      process.exit(0);
    }
  }

  return opts;
}

// ─── Data Loading ─────────────────────────────────────────────────────────────

/**
 * Load all metrics JSON files from the metrics directory.
 * @param {object} opts
 * @returns {object[]} Array of record objects
 */
function loadMetricsFiles(opts) {
  const allRecords = [];
  let filesRead = 0;

  if (opts.file) {
    // Single file mode
    if (!fs.existsSync(opts.file)) {
      console.error(colored(`✗ File not found: ${opts.file}`, C.red));
      process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(opts.file, 'utf8'));
    const records = Array.isArray(data) ? data : (data.records || []);
    allRecords.push(...records);
    filesRead = 1;
  } else {
    // Directory scan mode
    const dir = path.resolve(opts.metricsDir);
    if (!fs.existsSync(dir)) {
      console.error(colored(`✗ Metrics directory not found: ${dir}`, C.red));
      console.log(colored('  Run npm test first to generate metrics data.', C.dim));
      process.exit(1);
    }

    let files = fs.readdirSync(dir)
      .filter((f) => f.endsWith('.json') && f.startsWith('metrics_'))
      .map((f) => ({ name: f, path: path.join(dir, f), mtime: fs.statSync(path.join(dir, f)).mtime }))
      .sort((a, b) => b.mtime - a.mtime);

    if (opts.last) files = files.slice(0, opts.last);

    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(file.path, 'utf8'));
        const records = Array.isArray(data) ? data : (data.records || []);
        allRecords.push(...records);
        filesRead++;
      } catch (err) {
        console.warn(colored(`⚠ Could not parse ${file.name}: ${err.message}`, C.yellow));
      }
    }
  }

  // Filter by date if --since provided
  let filtered = allRecords;
  if (opts.since) {
    filtered = allRecords.filter((r) => new Date(r.timestamp) >= opts.since);
  }

  return { records: filtered, filesRead };
}

/**
 * Load session metadata files to get fingerprint diversity stats.
 * @param {string} sessionsDir
 * @returns {object[]}
 */
function loadSessionMetadata(sessionsDir) {
  const metas = [];
  const dir = path.resolve(sessionsDir);
  if (!fs.existsSync(dir)) return metas;

  const sessionDirs = fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  for (const entry of sessionDirs) {
    const metaPath = path.join(dir, entry.name, 'metadata.json');
    if (fs.existsSync(metaPath)) {
      try {
        metas.push(JSON.parse(fs.readFileSync(metaPath, 'utf8')));
      } catch (_) {}
    }
  }

  return metas;
}

/**
 * Count log-level entries from the latest log file.
 * @param {string} logsDir
 * @returns {object}
 */
function analyzeLogFile(logsDir) {
  const logCounts = { error: 0, warn: 0, info: 0, debug: 0 };
  const dir = path.resolve(logsDir);
  if (!fs.existsSync(dir)) return logCounts;

  // Find latest log file
  const files = fs.readdirSync(dir)
    .filter((f) => f.startsWith('automation-') && f.endsWith('.log'))
    .map((f) => ({ name: f, path: path.join(dir, f), mtime: fs.statSync(path.join(dir, f)).mtime }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) return logCounts;

  const content = fs.readFileSync(files[0].path, 'utf8');
  const lines = content.split('\n').filter(Boolean);

  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (logCounts.hasOwnProperty(entry.level)) {
        logCounts[entry.level]++;
      }
    } catch (_) {}
  }

  return logCounts;
}

// ─── Analysis Engine ──────────────────────────────────────────────────────────

/**
 * Run all analysis computations on the records array.
 * @param {object[]} records
 * @returns {object} Analysis report object
 */
function analyze(records) {
  if (records.length === 0) {
    return null;
  }

  const successful = records.filter((r) => r.status === 'success');
  const failed = records.filter((r) => r.status === 'failure');
  const withRetry = records.filter((r) => r.retryCount > 0);

  // ── Timing stats ─────────────────────────────────────────────────────────
  const loadTimes = successful.map((r) => r.loadTimeMs).filter(Boolean);
  const totalTimes = records.map((r) => r.totalTimeMs).filter(Boolean);
  const interactionTimes = successful.map((r) => r.interactionTimeMs).filter(Boolean);

  const avgLoad = loadTimes.length ? Math.round(loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length) : 0;
  const avgTotal = totalTimes.length ? Math.round(totalTimes.reduce((a, b) => a + b, 0) / totalTimes.length) : 0;
  const minLoad = loadTimes.length ? Math.min(...loadTimes) : 0;
  const maxLoad = loadTimes.length ? Math.max(...loadTimes) : 0;
  const p95Load = percentile(loadTimes, 95);
  const p50Load = percentile(loadTimes, 50);

  // ── Slowest & fastest requests ────────────────────────────────────────────
  const sortedByLoad = [...successful].sort((a, b) => (b.loadTimeMs || 0) - (a.loadTimeMs || 0));
  const slowest = sortedByLoad.slice(0, 5);
  const fastest = sortedByLoad.slice(-5).reverse();

  // ── Per-URL breakdown ─────────────────────────────────────────────────────
  const urlStats = {};
  for (const r of records) {
    const url = r.url || 'unknown';
    if (!urlStats[url]) {
      urlStats[url] = { success: 0, failure: 0, totalLoadMs: 0, count: 0, retries: 0, captcha: 0 };
    }
    urlStats[url].count++;
    urlStats[url].retries += (r.retryCount || 0);
    if (r.status === 'success') {
      urlStats[url].success++;
      urlStats[url].totalLoadMs += (r.loadTimeMs || 0);
    } else {
      urlStats[url].failure++;
    }
    if (r.captchaEncountered) urlStats[url].captcha++;
  }

  // ── CAPTCHA stats ─────────────────────────────────────────────────────────
  const captchaEncountered = records.filter((r) => r.captchaEncountered).length;
  const captchaSolved = records.filter((r) => r.captchaSolved).length;

  // ── Proxy stats ───────────────────────────────────────────────────────────
  const withProxy = records.filter((r) => r.proxyUsed).length;
  const withoutProxy = records.length - withProxy;

  // ── Error analysis ────────────────────────────────────────────────────────
  const errorCounts = {};
  for (const r of failed) {
    const msg = classifyError(r.errorMessage);
    errorCounts[msg] = (errorCounts[msg] || 0) + 1;
  }
  const sortedErrors = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);

  // ── Hourly traffic distribution ───────────────────────────────────────────
  const hourlyTraffic = new Array(24).fill(0);
  for (const r of records) {
    if (r.timestamp) {
      const hour = new Date(r.timestamp).getHours();
      hourlyTraffic[hour]++;
    }
  }

  // ── Anomaly detection ─────────────────────────────────────────────────────
  const anomalies = [];
  const timeoutRecords = records.filter((r) => (r.errorMessage || '').includes('timeout'));
  if (timeoutRecords.length > 0) {
    anomalies.push({ type: 'Timeout spike', count: timeoutRecords.length, severity: 'warn' });
  }
  const highRetryRecords = records.filter((r) => (r.retryCount || 0) >= 2);
  if (highRetryRecords.length > 0) {
    anomalies.push({ type: 'High retry rate (≥2 retries)', count: highRetryRecords.length, severity: 'warn' });
  }
  if (failed.length / records.length > 0.2) {
    anomalies.push({ type: 'High failure rate (>20%)', count: failed.length, severity: 'error' });
  }
  if (p95Load > 20000) {
    anomalies.push({ type: 'P95 load time >20s', count: p95Load, severity: 'warn' });
  }

  // ── Session activity range ────────────────────────────────────────────────
  const timestamps = records.map((r) => new Date(r.timestamp)).filter((d) => !isNaN(d));
  const firstActivity = timestamps.length ? new Date(Math.min(...timestamps)) : null;
  const lastActivity = timestamps.length ? new Date(Math.max(...timestamps)) : null;
  const durationMs = firstActivity && lastActivity ? lastActivity - firstActivity : 0;

  // ── Throughput ────────────────────────────────────────────────────────────
  const throughput = durationMs > 0
    ? ((records.length / (durationMs / 1000)) * 60).toFixed(2)
    : 'N/A';

  return {
    overview: {
      total: records.length,
      successful: successful.length,
      failed: failed.length,
      retried: withRetry.length,
      successRate: `${((successful.length / records.length) * 100).toFixed(1)}%`,
      failureRate: `${((failed.length / records.length) * 100).toFixed(1)}%`,
      firstActivity: firstActivity?.toISOString(),
      lastActivity: lastActivity?.toISOString(),
      durationMs,
      throughputPerMin: throughput,
    },
    timing: {
      avgLoadMs: avgLoad,
      minLoadMs: minLoad,
      maxLoadMs: maxLoad,
      p50LoadMs: p50Load,
      p95LoadMs: p95Load,
      avgTotalMs: avgTotal,
      avgInteractionMs: interactionTimes.length
        ? Math.round(interactionTimes.reduce((a, b) => a + b, 0) / interactionTimes.length)
        : 0,
    },
    traffic: {
      withProxy,
      withoutProxy,
      captchaEncountered,
      captchaSolved,
      captchaSolveRate: captchaEncountered > 0
        ? `${((captchaSolved / captchaEncountered) * 100).toFixed(1)}%`
        : 'N/A',
      hourlyDistribution: hourlyTraffic,
    },
    urlBreakdown: urlStats,
    errors: sortedErrors,
    anomalies,
    topSlowest: slowest.map((r) => ({ url: r.url, loadMs: r.loadTimeMs, sessionId: r.sessionId })),
    topFastest: fastest.map((r) => ({ url: r.url, loadMs: r.loadTimeMs, sessionId: r.sessionId })),
  };
}

/**
 * Compute a percentile value from an array of numbers.
 * @param {number[]} arr
 * @param {number} p - Percentile (0-100)
 */
function percentile(arr, p) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

/**
 * Classify an error message into a short category.
 * @param {string} msg
 */
function classifyError(msg = '') {
  if (!msg) return 'Unknown error';
  if (msg.includes('timeout') || msg.includes('Timeout')) return 'Navigation timeout';
  if (msg.includes('net::ERR_')) return `Network error (${msg.match(/net::ERR_\w+/)?.[0] || 'ERR'})`;
  if (msg.includes('ECONNREFUSED')) return 'Connection refused';
  if (msg.includes('ENOTFOUND')) return 'DNS not found';
  if (msg.includes('Protocol error')) return 'Protocol error';
  if (msg.includes('detached')) return 'Frame detached';
  if (msg.includes('Target closed')) return 'Target closed';
  if (msg.includes('SSL') || msg.includes('certificate')) return 'SSL/TLS error';
  return msg.slice(0, 50) + (msg.length > 50 ? '...' : '');
}

// ─── Report Rendering ─────────────────────────────────────────────────────────

function renderReport(report, sessions, logCounts, opts, filesRead) {
  const { overview, timing, traffic, urlBreakdown, errors, anomalies, topSlowest, topFastest } = report;

  console.clear();
  console.log('\n' + header('🤖 PUPPETEER AUTOMATION — METRICS DASHBOARD'));
  console.log(colored(`  Analyzed: ${filesRead} file(s)  |  Records: ${overview.total}  |  Generated: ${new Date().toLocaleString()}`, C.dim));

  // ── OVERVIEW ────────────────────────────────────────────────────────────────
  console.log(sectionTitle('TRAFFIC OVERVIEW', '📊'));
  console.log(kv('Total Requests', overview.total, C.bold + C.white));
  console.log(kv('Successful', overview.successful, C.green));
  console.log(kv('Failed', overview.failed, overview.failed > 0 ? C.red : C.green));
  console.log(kv('Retried', overview.retried, overview.retried > 0 ? C.yellow : C.green));
  console.log(kv('Success Rate', overview.successRate,
    parseFloat(overview.successRate) >= 90 ? C.green : parseFloat(overview.successRate) >= 70 ? C.yellow : C.red));
  console.log(kv('Failure Rate', overview.failureRate,
    parseFloat(overview.failureRate) <= 10 ? C.green : C.red));
  console.log(kv('Throughput', `${overview.throughputPerMin} req/min`, C.cyan));
  if (overview.firstActivity) {
    console.log(kv('First Activity', new Date(overview.firstActivity).toLocaleString(), C.dim));
    console.log(kv('Last Activity', new Date(overview.lastActivity).toLocaleString(), C.dim));
    console.log(kv('Observation Window', formatMs(overview.durationMs), C.dim));
  }

  // Success/Failure bar
  console.log('');
  console.log(`  ${colored('Success', C.green)} ${progressBar(overview.successful, overview.total, 40, C.green)}`);
  console.log(`  ${colored('Failure', C.red)}  ${progressBar(overview.failed, overview.total, 40, C.red)}`);
  console.log(`  ${colored('Retried', C.yellow)} ${progressBar(overview.retried, overview.total, 40, C.yellow)}`);

  // ── PERFORMANCE TIMING ──────────────────────────────────────────────────────
  console.log(sectionTitle('PERFORMANCE TIMING', '⚡'));
  console.log(kv('Avg Page Load', formatMs(timing.avgLoadMs),
    timing.avgLoadMs < 3000 ? C.green : timing.avgLoadMs < 8000 ? C.yellow : C.red));
  console.log(kv('Min Load Time', formatMs(timing.minLoadMs), C.green));
  console.log(kv('Max Load Time', formatMs(timing.maxLoadMs), C.red));
  console.log(kv('Median (P50) Load', formatMs(timing.p50LoadMs), C.cyan));
  console.log(kv('P95 Load Time', formatMs(timing.p95LoadMs),
    timing.p95LoadMs < 10000 ? C.yellow : C.red));
  console.log(kv('Avg Interaction Time', formatMs(timing.avgInteractionMs), C.magenta));
  console.log(kv('Avg Total Session Time', formatMs(timing.avgTotalMs), C.white));

  // Timing distribution bar
  console.log('');
  const timingBuckets = [
    { label: '< 1s   (fast)', min: 0, max: 1000 },
    { label: '1–3s   (good)', min: 1000, max: 3000 },
    { label: '3–8s   (ok)  ', min: 3000, max: 8000 },
    { label: '8–20s  (slow)', min: 8000, max: 20000 },
    { label: '>20s   (timeout risk)', min: 20000, max: Infinity },
  ];

  // Get load times from successful records in scope
  const maxBucketCount = Math.max(1, ...timingBuckets.map(
    (b) => report._rawLoadTimes ? report._rawLoadTimes.filter((t) => t >= b.min && t < b.max).length : 0
  ));

  // ── PUPPETEER TRAFFIC SOURCE ────────────────────────────────────────────────
  console.log(sectionTitle('PUPPETEER TRAFFIC BREAKDOWN', '🤖'));
  console.log(kv('Direct (No Proxy)', overview.total - traffic.withProxy,
    traffic.withProxy === 0 ? C.yellow : C.cyan));
  console.log(kv('Via Proxy', traffic.withProxy, C.blue));
  console.log(kv('CAPTCHA Encountered', traffic.captchaEncountered,
    traffic.captchaEncountered > 0 ? C.yellow : C.green));
  console.log(kv('CAPTCHA Solved', traffic.captchaSolved, C.green));
  console.log(kv('CAPTCHA Solve Rate', traffic.captchaSolveRate, C.cyan));

  const proxyPct = overview.total > 0 ? ((traffic.withProxy / overview.total) * 100).toFixed(1) : 0;
  console.log('');
  console.log(`  ${colored('Proxy     ', C.blue)}  ${progressBar(traffic.withProxy, overview.total, 35, C.blue)} ${colored(`${proxyPct}%`, C.dim)}`);
  console.log(`  ${colored('No Proxy  ', C.cyan)}  ${progressBar(overview.total - traffic.withProxy, overview.total, 35, C.cyan)}`);

  // ── PER-URL BREAKDOWN ───────────────────────────────────────────────────────
  console.log(sectionTitle('PER-URL TRAFFIC BREAKDOWN', '🌐'));
  const urlEntries = Object.entries(urlBreakdown);
  if (urlEntries.length === 0) {
    console.log(colored('  No URL data available.', C.dim));
  } else {
    const maxCount = Math.max(...urlEntries.map(([, v]) => v.count));
    const colUrl = 40;

    // Table header
    console.log(
      colored('  ' + 'URL'.padEnd(colUrl), C.bold) +
      colored('Hits'.padStart(6), C.bold) +
      colored('OK'.padStart(6), C.bold) +
      colored('Fail'.padStart(6), C.bold) +
      colored('Retry'.padStart(7), C.bold) +
      colored('AvgLoad'.padStart(10), C.bold) +
      colored('CAPTCHA'.padStart(9), C.bold)
    );
    console.log(hr('─'));

    for (const [url, stats] of urlEntries.sort((a, b) => b[1].count - a[1].count)) {
      const displayUrl = url.length > colUrl ? '...' + url.slice(-(colUrl - 3)) : url;
      const avgLoad = stats.success > 0
        ? formatMs(Math.round(stats.totalLoadMs / stats.success))
        : colored('N/A', C.dim);
      const failColor = stats.failure > 0 ? C.red : C.green;
      const retryColor = stats.retries > 0 ? C.yellow : C.green;

      console.log(
        `  ${colored(displayUrl.padEnd(colUrl), C.white)}` +
        `${colored(String(stats.count).padStart(6), C.bold)}` +
        `${colored(String(stats.success).padStart(6), C.green)}` +
        `${colored(String(stats.failure).padStart(6), failColor)}` +
        `${colored(String(stats.retries).padStart(7), retryColor)}` +
        `${colored(avgLoad.toString().padStart(10), C.cyan)}` +
        `${colored(stats.captcha > 0 ? `${stats.captcha} ⚠`.padStart(9) : '-'.padStart(9), stats.captcha > 0 ? C.yellow : C.dim)}`
      );
    }
  }

  // ── SLOWEST REQUESTS ────────────────────────────────────────────────────────
  if (topSlowest.length > 0) {
    console.log(sectionTitle('SLOWEST REQUESTS (Top 5)', '🐢'));
    topSlowest.forEach((r, i) => {
      const url = r.url.length > 60 ? r.url.slice(0, 57) + '...' : r.url;
      console.log(`  ${colored(`#${i + 1}`, C.bold, C.red)} ${colored(formatMs(r.loadMs).padEnd(10), C.red)} ${colored(url, C.dim)}`);
    });
  }

  // ── FASTEST REQUESTS ────────────────────────────────────────────────────────
  if (topFastest.length > 0) {
    console.log(sectionTitle('FASTEST REQUESTS (Top 5)', '🚀'));
    topFastest.forEach((r, i) => {
      const url = r.url.length > 60 ? r.url.slice(0, 57) + '...' : r.url;
      console.log(`  ${colored(`#${i + 1}`, C.bold, C.green)} ${colored(formatMs(r.loadMs).padEnd(10), C.green)} ${colored(url, C.dim)}`);
    });
  }

  // ── ERROR BREAKDOWN ─────────────────────────────────────────────────────────
  if (errors.length > 0) {
    console.log(sectionTitle('ERROR BREAKDOWN', '❌'));
    const maxErrCount = errors[0][1];
    for (const [type, count] of errors) {
      console.log(`  ${colored(type.padEnd(45), C.red)} ${progressBar(count, maxErrCount, 20, C.red)} ${colored(count, C.bold, C.red)}`);
    }
  } else {
    console.log(sectionTitle('ERROR BREAKDOWN', '✅'));
    console.log(colored('  No errors recorded! All requests succeeded.', C.green));
  }

  // ── HOURLY TRAFFIC HEATMAP ──────────────────────────────────────────────────
  const totalHourly = traffic.hourlyDistribution.reduce((a, b) => a + b, 0);
  if (totalHourly > 0) {
    console.log(sectionTitle('HOURLY TRAFFIC HEATMAP', '⏰'));
    const maxHourly = Math.max(...traffic.hourlyDistribution);
    const hours = traffic.hourlyDistribution.map((count, h) => ({ h, count }));

    // Render in 2 rows of 12 hours each
    for (const row of [hours.slice(0, 12), hours.slice(12)]) {
      process.stdout.write('  ');
      for (const { h, count } of row) {
        const intensity = maxHourly > 0 ? count / maxHourly : 0;
        const block = intensity === 0 ? '░'
          : intensity < 0.25 ? '▒'
          : intensity < 0.5 ? '▓'
          : intensity < 0.75 ? '█'
          : colored('█', C.bold + C.cyan);
        process.stdout.write(colored(block, intensity > 0.5 ? C.cyan : C.dim));
      }
      process.stdout.write('\n');
    }

    console.log('  ' + colored('00 01 02 03 04 05 06 07 08 09 10 11', C.dim));
    console.log('  ' + colored('12 13 14 15 16 17 18 19 20 21 22 23', C.dim));
    console.log('');

    const peakHour = hours.reduce((a, b) => b.count > a.count ? b : a);
    if (peakHour.count > 0) {
      console.log(kv('Peak Traffic Hour', `${String(peakHour.h).padStart(2, '0')}:00 (${peakHour.count} requests)`, C.cyan));
    }
  }

  // ── SESSION METADATA ────────────────────────────────────────────────────────
  if (sessions.length > 0) {
    console.log(sectionTitle('SESSION FINGERPRINT DIVERSITY', '🔍'));
    console.log(kv('Stored Sessions', sessions.length, C.cyan));

    const withCookies = sessions.filter((s) => s.cookieCount > 0).length;
    const avgCookies = sessions.length > 0
      ? (sessions.reduce((a, s) => a + (s.cookieCount || 0), 0) / sessions.length).toFixed(1)
      : 0;

    console.log(kv('Sessions with Cookies', withCookies, C.green));
    console.log(kv('Avg Cookies per Session', avgCookies, C.cyan));

    // Viewport diversity
    const viewports = sessions
      .map((s) => s.fingerprint)
      .filter(Boolean)
      .reduce((acc, fp) => {
        if (fp.width && fp.height) {
          const key = `${fp.width}×${fp.height}`;
          acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
      }, {});

    if (Object.keys(viewports).length > 0) {
      console.log('');
      console.log(colored('  Viewport Distribution:', C.bold));
      for (const [vp, count] of Object.entries(viewports)) {
        console.log(`    ${colored(vp.padEnd(15), C.white)} ${progressBar(count, sessions.length, 20, C.magenta)} ${count}`);
      }
    }
  }

  // ── LOG SUMMARY ─────────────────────────────────────────────────────────────
  if (Object.values(logCounts).some((v) => v > 0)) {
    console.log(sectionTitle('LOG FILE SUMMARY', '📋'));
    console.log(kv('Info entries', logCounts.info, C.blue));
    console.log(kv('Warn entries', logCounts.warn, logCounts.warn > 0 ? C.yellow : C.green));
    console.log(kv('Error entries', logCounts.error, logCounts.error > 0 ? C.red : C.green));
    console.log(kv('Debug entries', logCounts.debug, C.dim));
  }

  // ── ANOMALIES & HEALTH CHECK ────────────────────────────────────────────────
  console.log(sectionTitle('HEALTH CHECK & ANOMALIES', '🏥'));
  if (anomalies.length === 0) {
    console.log(colored('  ✅ No anomalies detected — system is healthy!', C.green, C.bold));
  } else {
    for (const a of anomalies) {
      const icon = a.severity === 'error' ? '❌' : '⚠️';
      const color = a.severity === 'error' ? C.red : C.yellow;
      console.log(`  ${icon} ${colored(a.type, color, C.bold)}: ${colored(a.count, C.bold)}`);
    }
  }

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  console.log('\n' + hr('═', C.blue));
  console.log(colored(`  🤖 Puppeteer Automation Framework — Analysis complete`, C.dim));
  console.log(hr('═', C.blue) + '\n');
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

function main() {
  const opts = parseArgs();

  console.log(colored('Loading metrics data...', C.dim));

  const { records, filesRead } = loadMetricsFiles(opts);
  const sessions = loadSessionMetadata(opts.sessionsDir);
  const logCounts = analyzeLogFile(opts.logsDir);

  if (records.length === 0) {
    console.log('\n' + colored('  No metrics records found.', C.yellow));
    console.log(colored('  Run "npm test" or "npm start" first to generate metrics data.', C.dim));
    console.log(colored(`  Looking in: ${path.resolve(opts.metricsDir)}\n`, C.dim));
    process.exit(0);
  }

  const report = analyze(records);

  if (!report) {
    console.log(colored('  Could not analyze records.', C.red));
    process.exit(1);
  }

  renderReport(report, sessions, logCounts, opts, filesRead);

  // Export JSON report if requested
  if (opts.exportPath) {
    const exportData = {
      generatedAt: new Date().toISOString(),
      filesAnalyzed: filesRead,
      totalRecords: records.length,
      ...report,
    };
    // Remove circular/raw fields not needed in export
    delete exportData._rawLoadTimes;

    fs.writeFileSync(opts.exportPath, JSON.stringify(exportData, null, 2), 'utf8');
    console.log(colored(`  📄 Report exported to: ${path.resolve(opts.exportPath)}`, C.green));
  }
}

main();
