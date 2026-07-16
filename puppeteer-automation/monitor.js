'use strict';

/**
 * monitor.js — Real-Site Traffic Monitor
 *
 * Continuously visits your target URLs on a schedule, measures response times,
 * detects downtime, checks for content changes, and prints a live traffic dashboard.
 *
 * This answers: "how much traffic is hitting a site and is it healthy?"
 *
 * Usage:
 *   node monitor.js                          # uses targets from config.json
 *   node monitor.js --url https://mysite.com # monitor one URL
 *   node monitor.js --interval 30            # check every 30 seconds
 *   node monitor.js --count 10               # run 10 check cycles then exit
 *   node monitor.js --url https://mysite.com --interval 60 --count 100
 *
 * What it collects per visit:
 *   - HTTP status code
 *   - Page load time (Time To First Byte)
 *   - Full DOM-ready time
 *   - Page title
 *   - Number of network requests made by the page
 *   - Total bytes transferred
 *   - JavaScript errors on the page
 *   - Whether the page content changed since last visit (content hash)
 *   - Response headers (server type, cache headers, CDN hints)
 */

require('dotenv').config();

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BrowserEngine = require('./core/browser');
const logger = require('./utils/logger');

// ─── CLI ───────────────────────────────────────────────────────────────────────

program
  .name('monitor')
  .description('Real-site traffic monitor using Puppeteer')
  .option('--url <url>', 'URL to monitor (overrides config.json targets)')
  .option('--interval <seconds>', 'Check interval in seconds', '60')
  .option('--count <n>', 'Number of check cycles (0 = run forever)', '0')
  .option('--config <path>', 'Config file', './config.json')
  .option('--no-headless', 'Show browser window')
  .option('--output <path>', 'Save results to JSON file', './monitor-results.json')
  .parse(process.argv);

const opts = program.opts();

// ─── Terminal Colors ───────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', magenta: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m',
};
const W = Math.min(process.stdout.columns || 100, 120);

const c = (s, ...codes) => codes.join('') + String(s) + C.reset;
const hr = (ch = '─') => C.dim + ch.repeat(W) + C.reset;
const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

// ─── State ─────────────────────────────────────────────────────────────────────

const state = {
  cycle: 0,
  checks: [],         // all check results
  urlStats: {},       // per-url aggregate stats
  contentHashes: {},  // url -> last content hash (change detection)
  startTime: Date.now(),
};

// ─── Load Config ───────────────────────────────────────────────────────────────

function loadTargets() {
  let targets = [];

  if (opts.url) {
    targets = [opts.url];
  } else {
    try {
      const cfg = JSON.parse(fs.readFileSync(path.resolve(opts.config), 'utf8'));
      targets = cfg.targets || [];
    } catch {
      console.error(c('✗ No --url provided and config.json not found or has no targets.', C.red));
      console.log(c('  Usage: node monitor.js --url https://yoursite.com', C.dim));
      process.exit(1);
    }
  }

  if (targets.length === 0) {
    console.error(c('✗ No target URLs configured.', C.red));
    process.exit(1);
  }

  return targets;
}

// ─── Single Page Check ────────────────────────────────────────────────────────

/**
 * Visit a URL and collect detailed performance and content metrics.
 * @param {string} url
 * @param {object} config
 * @returns {Promise<object>} Check result
 */
async function checkPage(url, config = {}) {
  const engine = new BrowserEngine({ headless: opts.headless !== false, ...config });
  let browser, browserId;

  const result = {
    url,
    timestamp: new Date().toISOString(),
    status: 'unknown',
    httpStatus: null,
    loadTimeMs: null,
    domReadyMs: null,
    ttfbMs: null,
    totalRequests: 0,
    totalBytes: 0,
    jsErrors: [],
    pageTitle: null,
    contentHash: null,
    contentChanged: false,
    serverHeader: null,
    cacheHeader: null,
    cdnHint: null,
    error: null,
  };

  try {
    const launched = await engine.launch({ headless: opts.headless !== false });
    browser = launched.browser;
    browserId = launched.browserId;
    const page = launched.page;

    // Collect network metrics
    const requests = [];
    page.on('request', (req) => requests.push({ url: req.url(), type: req.resourceType() }));
    page.on('response', async (res) => {
      const len = parseInt(res.headers()['content-length'] || '0', 10);
      result.totalBytes += len;

      // Capture headers from the main document response
      if (res.url() === url || res.url().replace(/\/$/, '') === url.replace(/\/$/, '')) {
        result.httpStatus = res.status();
        const headers = res.headers();
        result.serverHeader = headers['server'] || headers['x-powered-by'] || null;
        result.cacheHeader = headers['cache-control'] || headers['x-cache'] || null;

        // CDN detection from headers
        if (headers['cf-ray']) result.cdnHint = 'Cloudflare';
        else if (headers['x-amz-cf-id']) result.cdnHint = 'CloudFront';
        else if (headers['x-served-by']) result.cdnHint = 'Fastly';
        else if (headers['x-azure-ref']) result.cdnHint = 'Azure CDN';
        else if (headers['x-cache'] && headers['x-cache'].includes('HIT')) result.cdnHint = 'CDN (cache HIT)';

        // Time to first byte
        try {
          const timing = await res.timing();
          if (timing) result.ttfbMs = Math.round(timing.receiveHeadersEnd - timing.sendEnd);
        } catch (_) {}
      }
    });

    // Collect JS errors
    page.on('pageerror', (err) => {
      result.jsErrors.push(err.message.slice(0, 120));
    });

    // Navigate and time it
    const navStart = Date.now();
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: config.defaultTimeout || 30000,
    });
    result.domReadyMs = Date.now() - navStart;

    // Wait for network idle to capture full load
    await page.waitForNetworkIdle({ timeout: 10000, idleTime: 1000 }).catch(() => {});
    result.loadTimeMs = Date.now() - navStart;

    // Collect page metrics
    const metrics = await page.metrics();
    result.totalRequests = requests.length;

    // Get page title
    result.pageTitle = await page.title().catch(() => null);

    // Content hash for change detection
    const bodyText = await page.evaluate(() => document.body?.innerText?.trim() || '').catch(() => '');
    result.contentHash = crypto.createHash('md5').update(bodyText.slice(0, 5000)).digest('hex').slice(0, 12);

    // Check if content changed since last visit
    const prevHash = state.contentHashes[url];
    if (prevHash && prevHash !== result.contentHash) {
      result.contentChanged = true;
    }
    state.contentHashes[url] = result.contentHash;

    result.status = result.httpStatus >= 200 && result.httpStatus < 400 ? 'up' : 'degraded';

  } catch (err) {
    result.status = 'down';
    result.error = err.message.slice(0, 200);
  } finally {
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
  }

  return result;
}

// ─── Aggregate Stats Updater ──────────────────────────────────────────────────

function updateStats(result) {
  const url = result.url;
  if (!state.urlStats[url]) {
    state.urlStats[url] = {
      url,
      checks: 0, up: 0, down: 0, degraded: 0,
      totalLoadMs: 0, minLoadMs: Infinity, maxLoadMs: 0,
      totalTtfbMs: 0, minTtfbMs: Infinity, maxTtfbMs: 0,
      totalRequests: 0, totalBytes: 0,
      jsErrorCount: 0, contentChanges: 0,
      lastStatus: null, lastCheck: null,
      uptime: '100%',
    };
  }

  const s = state.urlStats[url];
  s.checks++;
  s.lastStatus = result.status;
  s.lastCheck = result.timestamp;

  if (result.status === 'up') s.up++;
  else if (result.status === 'down') s.down++;
  else s.degraded++;

  if (result.loadTimeMs) {
    s.totalLoadMs += result.loadTimeMs;
    s.minLoadMs = Math.min(s.minLoadMs, result.loadTimeMs);
    s.maxLoadMs = Math.max(s.maxLoadMs, result.loadTimeMs);
  }

  if (result.ttfbMs) {
    s.totalTtfbMs += result.ttfbMs;
    s.minTtfbMs = Math.min(s.minTtfbMs, result.ttfbMs);
    s.maxTtfbMs = Math.max(s.maxTtfbMs, result.ttfbMs);
  }

  s.totalRequests += result.totalRequests;
  s.totalBytes += result.totalBytes;
  s.jsErrorCount += result.jsErrors.length;
  if (result.contentChanged) s.contentChanges++;
  s.uptime = s.checks > 0 ? `${((s.up / s.checks) * 100).toFixed(1)}%` : '100%';
}

// ─── Live Dashboard Renderer ──────────────────────────────────────────────────

function statusIcon(status) {
  if (status === 'up') return c('● UP     ', C.green, C.bold);
  if (status === 'down') return c('● DOWN   ', C.red, C.bold);
  if (status === 'degraded') return c('● DEGRADED', C.yellow, C.bold);
  return c('  unknown', C.dim);
}

function loadBar(ms, maxMs = 10000) {
  const w = 15;
  const filled = Math.min(Math.round((ms / maxMs) * w), w);
  const color = ms < 2000 ? C.green : ms < 5000 ? C.yellow : C.red;
  return color + '█'.repeat(filled) + C.dim + '░'.repeat(w - filled) + C.reset;
}

function fmtBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

function fmtMs(ms) {
  if (!ms || ms === Infinity) return c('N/A', C.dim);
  if (ms < 1000) return c(`${ms}ms`, ms < 2000 ? C.green : ms < 5000 ? C.yellow : C.red);
  return c(`${(ms / 1000).toFixed(2)}s`, ms < 3000 ? C.yellow : C.red);
}

function renderDashboard(targets) {
  // Clear screen
  process.stdout.write('\x1Bc');

  const elapsed = Math.round((Date.now() - state.startTime) / 1000);
  const m = Math.floor(elapsed / 60), s = elapsed % 60;

  console.log(c('╔' + '═'.repeat(W - 2) + '╗', C.blue));
  const titleInner = `  🤖  PUPPETEER SITE MONITOR  `;
  const titlePad = Math.floor((W - 2 - titleInner.length) / 2);
  console.log(c('║', C.blue) + ' '.repeat(titlePad) + c(titleInner, C.bold, C.cyan) + ' '.repeat(Math.max(0, W - 2 - titlePad - titleInner.length)) + c('║', C.blue));
  console.log(c('╚' + '═'.repeat(W - 2) + '╝', C.blue));

  console.log(
    c(`  Cycle: #${state.cycle}`, C.bold) +
    c(`   |   Uptime: ${m}m ${s}s`, C.dim) +
    c(`   |   Targets: ${targets.length}`, C.dim) +
    c(`   |   Total checks: ${state.checks.length}`, C.dim) +
    `   ${new Date().toLocaleTimeString()}`
  );
  console.log(hr());

  // Per-URL table
  console.log(
    c(pad('  STATUS', 12), C.bold) +
    c(pad('URL', 38), C.bold) +
    c(lpad('LOAD', 9), C.bold) +
    c(lpad('TTFB', 8), C.bold) +
    c(lpad('REQS', 6), C.bold) +
    c(lpad('SIZE', 8), C.bold) +
    c(lpad('UPTIME', 8), C.bold) +
    c(lpad('HTTP', 6), C.bold) +
    c(lpad('JS ERR', 8), C.bold)
  );
  console.log(hr());

  for (const url of targets) {
    const s = state.urlStats[url];
    if (!s) {
      console.log(`  ${c('pending...', C.dim)}  ${url}`);
      continue;
    }

    const avgLoad = s.checks > 0 ? Math.round(s.totalLoadMs / s.up || 0) : 0;
    const avgTtfb = s.checks > 0 && s.up > 0 ? Math.round(s.totalTtfbMs / s.up) : 0;
    const displayUrl = url.replace(/^https?:\/\//, '').slice(0, 36);
    const uptimePct = parseFloat(s.uptime);
    const uptimeColor = uptimePct >= 99 ? C.green : uptimePct >= 95 ? C.yellow : C.red;

    console.log(
      `  ${statusIcon(s.lastStatus)}` +
      c(pad(displayUrl, 38), C.white) +
      lpad(fmtMs(avgLoad), 9) +
      lpad(fmtMs(avgTtfb), 8) +
      c(lpad(s.totalRequests, 6), C.cyan) +
      c(lpad(fmtBytes(s.totalBytes), 8), C.magenta) +
      c(lpad(s.uptime, 8), uptimeColor, C.bold) +
      c(lpad(s.lastHttpStatus || '—', 6), C.dim) +
      c(lpad(s.jsErrorCount > 0 ? `⚠ ${s.jsErrorCount}` : '0', 8), s.jsErrorCount > 0 ? C.red : C.dim)
    );

    // Load time bar
    console.log(
      `     Load: ${loadBar(avgLoad)} ${fmtMs(avgLoad)} avg  ` +
      c(`min: ${fmtMs(s.minLoadMs)}  max: ${fmtMs(s.maxLoadMs)}`, C.dim)
    );

    if (s.contentChanges > 0) {
      console.log(c(`     ⚡ Content changed ${s.contentChanges} time(s) since monitoring started`, C.yellow));
    }
    console.log(hr('·'));
  }

  // Recent checks log (last 8)
  const recent = state.checks.slice(-8).reverse();
  if (recent.length > 0) {
    console.log('\n' + c('  RECENT CHECKS', C.bold, C.yellow));
    console.log(hr());
    for (const r of recent) {
      const ts = new Date(r.timestamp).toLocaleTimeString();
      const u = r.url.replace(/^https?:\/\//, '').slice(0, 40);
      const load = r.loadTimeMs ? fmtMs(r.loadTimeMs) : c('failed', C.red);
      const statusStr = r.status === 'up' ? c('✓', C.green) : r.status === 'down' ? c('✗', C.red) : c('~', C.yellow);
      const changed = r.contentChanged ? c(' ⚡ changed', C.yellow) : '';
      const err = r.error ? c(`  ✗ ${r.error.slice(0, 60)}`, C.red) : '';
      console.log(`  ${c(ts, C.dim)}  ${statusStr}  ${c(pad(u, 42), C.white)}  ${load}${changed}${err}`);
    }
  }

  // Server/CDN info
  const infos = Object.values(state.urlStats).filter((s) => s.cdnHint || s.serverHeader);
  if (infos.length > 0) {
    console.log('\n' + c('  INFRASTRUCTURE DETECTED', C.bold, C.yellow));
    console.log(hr());
    for (const s of infos) {
      const u = s.url.replace(/^https?:\/\//, '').slice(0, 40);
      if (s.cdnHint) console.log(`  ${c(pad(u, 42), C.dim)}  CDN: ${c(s.cdnHint, C.cyan, C.bold)}`);
      if (s.serverHeader) console.log(`  ${c(pad(u, 42), C.dim)}  Server: ${c(s.serverHeader, C.magenta)}`);
    }
  }

  console.log('\n' + c(`  Next check in ${opts.interval}s  |  Press Ctrl+C to stop and save results`, C.dim));
}

// ─── Save Results ─────────────────────────────────────────────────────────────

function saveResults() {
  const output = {
    monitoredAt: new Date().toISOString(),
    durationMs: Date.now() - state.startTime,
    cycles: state.cycle,
    totalChecks: state.checks.length,
    urlSummary: Object.values(state.urlStats),
    recentChecks: state.checks.slice(-50),
  };

  fs.writeFileSync(opts.output, JSON.stringify(output, null, 2), 'utf8');
  console.log(c(`\n  ✅ Results saved to: ${path.resolve(opts.output)}`, C.green));
}

// ─── Main Loop ────────────────────────────────────────────────────────────────

async function main() {
  const targets = loadTargets();
  const intervalMs = parseInt(opts.interval) * 1000;
  const maxCycles = parseInt(opts.count);

  // Load existing config for browser settings
  let config = { defaultTimeout: 30000, headless: true };
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(path.resolve(opts.config), 'utf8')) };
  } catch (_) {}

  console.log(c('\n🤖 Puppeteer Site Monitor starting...', C.cyan, C.bold));
  console.log(c(`  Targets: ${targets.join(', ')}`, C.dim));
  console.log(c(`  Interval: ${opts.interval}s  |  Max cycles: ${maxCycles || '∞'}`, C.dim));
  console.log(c('  Press Ctrl+C to stop\n', C.dim));

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log(c('\n\nStopping monitor...', C.yellow));
    renderDashboard(targets);
    saveResults();
    process.exit(0);
  });

  // Main monitoring loop
  while (true) {
    state.cycle++;

    // Run all target checks concurrently within a cycle
    const checkPromises = targets.map(async (url) => {
      const result = await checkPage(url, config);

      // Also track last http status in urlStats
      if (result.httpStatus) {
        if (state.urlStats[url]) state.urlStats[url].lastHttpStatus = result.httpStatus;
      }

      updateStats(result);
      state.checks.push(result);

      if (result.status === 'down') {
        logger.error(`[Monitor] 🚨 ${url} is DOWN — ${result.error}`);
      } else if (result.contentChanged) {
        logger.warn(`[Monitor] ⚡ Content changed on ${url}`);
      }

      return result;
    });

    await Promise.allSettled(checkPromises);

    // Re-render dashboard after each cycle
    renderDashboard(targets);

    // Exit if we've hit the max cycle count
    if (maxCycles > 0 && state.cycle >= maxCycles) {
      console.log(c(`\n  Reached ${maxCycles} cycles — stopping.`, C.yellow));
      saveResults();
      break;
    }

    // Wait for next interval
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

main().catch((err) => {
  console.error(c(`\n✗ Fatal error: ${err.message}`, C.red));
  process.exit(1);
});
