'use strict';

/**
 * flood.js — Run multiple automation cycles against your own site
 * to generate a visible traffic spike in your analytics dashboard.
 *
 * ⚠️  Only use this on your OWN site. Never on others.
 *
 * Usage:
 *   node flood.js                     # 5 cycles, 5 concurrent, your config.json URLs
 *   node flood.js --cycles 20         # 20 cycles
 *   node flood.js --concurrency 8     # 8 parallel browsers
 *   node flood.js --url https://amankumarr.in --cycles 10
 *   node flood.js --cycles 10 --delay 3000   # 3s gap between cycles
 *
 * What counts as a "visit" in analytics:
 *   - Each browser = 1 unique session (different fingerprint)
 *   - sessionPersistence: false = fresh cookies each time = new user
 *   - Stealth mode = looks like real Chrome browser
 *   - Human scroll simulation = realistic engagement
 */

require('dotenv').config();
const { program } = require('commander');
const { execSync } = require('child_process');
process.setMaxListeners(0);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Reuse the existing framework modules
const BrowserEngine = require('./core/browser');
const HumanBehavior = require('./core/behavior');
const EngagementSimulator = require('./core/engagement');
const { handleCookieConsent } = require('./core/consent');
const { getTrafficContext } = require('./core/traffic-patterns');
const { generateNewGA4Identity, triggerFirstVisitEvent, verifyNewUserTracking } = require('./core/ga4');
const PQueue = require('p-queue').default;
const logger = require('./utils/logger');

program
  .name('flood')
  .description('Run repeated visits to your own site for traffic testing')
  .option('--url <url>', 'Target URL (overrides config.json)')
  .option('--cycles <n>', 'Number of visit cycles to run', '5')
  .option('--concurrency <n>', 'Parallel browsers per cycle', '5')
  .option('--delay <ms>', 'Delay between cycles in ms', '2000')
  .option('--config <path>', 'Config file path', './config.json')
  .parse(process.argv);

const opts = program.opts();

// ─── Terminal Colors ──────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', cyan: '\x1b[36m', white: '\x1b[37m',
  bgGreen: '\x1b[42m', bgBlue: '\x1b[44m',
};
const c = (s, ...codes) => codes.join('') + String(s) + C.reset;
const W = Math.min(process.stdout.columns || 100, 110);
const hr = (ch = '─') => C.dim + ch.repeat(W) + C.reset;

// ─── Load Config ──────────────────────────────────────────────────────────────
function loadConfig() {
  let cfg = {
    concurrency: parseInt(opts.concurrency),
    defaultTimeout: 30000,
    headless: true,
    userDataDir: './user_data',
    targets: [],
  };

  try {
    const fileCfg = JSON.parse(fs.readFileSync(path.resolve(opts.config), 'utf8'));
    cfg = { ...cfg, ...fileCfg };
  } catch (_) { }

  // CLI overrides
  cfg.concurrency = parseInt(opts.concurrency) || cfg.concurrency || 5;
  if (opts.url) cfg.targets = [opts.url];

  return cfg;
}

// ─── Single Visit ─────────────────────────────────────────────────────────────

// Load puppeteer directly for the minimal, diagnose-style visitor approach
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// User-agent pool — rotated per session for fingerprint diversity
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.2; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
];

const VIEWPORTS = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1280, height: 720 },
  { width: 1600, height: 900 },
];

const REFERRERS = [
  'https://www.google.com/',
  'https://www.google.co.in/',
  'https://www.bing.com/',
  'https://duckduckgo.com/',
  '',  // direct traffic
];

/**
 * One unique visit = one new user in GA4.
 *
 * Uses the exact same minimal Puppeteer setup as diagnose_ga4.js (which works).
 * NO BrowserEngine, NO request interception — these were silently preventing
 * gtag/GA4 scripts from loading, causing 0 active users.
 *
 * Uniqueness per visit:
 *  - Fresh, isolated Chrome profile (userDataDir) per session
 *  - Unique _ga cookie planted before navigation → new Client ID → new user
 *  - Rotated User-Agent + viewport per session
 */
async function singleVisit(url, config, visitNum, cycleNum, proxyUrl) {
  const sessionId = `flood_${uuidv4().slice(0, 8)}`;
  const startMs = Date.now();

  // Pick random fingerprint for this session
  const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  const vp = VIEWPORTS[Math.floor(Math.random() * VIEWPORTS.length)];
  const referrer = REFERRERS[Math.floor(Math.random() * REFERRERS.length)];

  // Each session gets its own isolated Chrome profile directory
  const sessionDir = path.join(path.resolve(config.userDataDir || './user_data'), sessionId);
  try { fs.mkdirSync(sessionDir, { recursive: true }); } catch (_) { }

  let browser;
  try {
    // ── Launch browser (same minimal args as working diagnose_ga4.js) ────────
    const browserArgs = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-blink-features=AutomationControlled',
      `--window-size=${vp.width},${vp.height}`,
    ];
    if (proxyUrl) {
      browserArgs.push(`--proxy-server=${proxyUrl}`);
    }

    browser = await puppeteer.launch({
      headless: config.headless === false ? false : 'new',
      userDataDir: sessionDir,
      args: browserArgs,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.setUserAgent(ua);

    // ── Track GA4 hits so we can report them ──────────────────────────────
    let ga4Hits = 0;
    page.on('request', req => {
      if (req.url().includes('/g/collect') || req.url().includes('google-analytics.com/collect')) {
        ga4Hits++;
      }
    });

    // ── DO NOT set _ga cookie manually ───────────────────────────────────
    // Each session has a fresh isolated userDataDir with ZERO cookies.
    // When GA4 loads and finds no _ga cookie, it:
    //   1. Creates a brand-new client ID
    //   2. Automatically fires the `first_visit` event
    //   3. Counts this session as a NEW USER in analytics
    //
    // If we pre-set the _ga cookie, GA4 sees an "existing" user → returning user, NOT new.
    // The isolated userDataDir is all we need for a guaranteed new user identity.

    // ── Navigate — domcontentloaded ensures basic page load, avoiding proxy timeouts ────────
    // With a fresh profile (no _ga cookie), GA4 automatically fires:
    //   first_visit + session_start + page_view
    // We don't need to fire anything manually — GA4 handles it natively.
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: config.defaultTimeout || 35000,
      ...(referrer && { referer: referrer }),
    });

    const loadMs = Date.now() - startMs;

    // Brief pause after load (real users don't scroll instantly)
    await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));

    // ── Human engagement simulation ───────────────────────────────────────
    // GA4 "engaged session" requires: duration > 10s OR 2+ pageviews.
    // We satisfy both: real 30s+ dwell per page + multiple page navigations.
    // No fake gtag() calls — real time spent = real engagement signals.
    async function humanScroll(pg, durationMs) {
      const end = Date.now() + durationMs;

      while (Date.now() < end) {
        const curY = await pg.evaluate(() => window.scrollY).catch(() => 0);
        const docH = await pg.evaluate(() => document.body.scrollHeight).catch(() => 9999);
        const viewH = await pg.evaluate(() => window.innerHeight).catch(() => 800);

        // Scroll down slowly — small amounts like reading
        const scrollAmt = 60 + Math.random() * 150;
        await pg.evaluate(y => window.scrollBy({ top: y, behavior: 'smooth' }), scrollAmt).catch(() => { });

        // Move mouse (triggers mousemove events GA4 listens to for engagement)
        await pg.mouse.move(
          300 + Math.random() * 700,
          200 + Math.random() * 400,
          { steps: 8 }
        ).catch(() => { });

        // Pause like a human reading that section (1.5 - 4 seconds)
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 2500));

        // At page bottom → scroll back to 40% mark and continue reading
        if (curY + viewH >= docH - 80) {
          await pg.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.35, behavior: 'smooth' })).catch(() => { });
          await new Promise(r => setTimeout(r, 3000 + Math.random() * 2000));
        }
      }
    }

    const ga4Config = config.ga4Evasion || {};
    const bounceRate = ga4Config.bounceRate !== undefined ? ga4Config.bounceRate : 0.3;
    const perPageMs = ga4Config.stayTimePerPageMs || 40000;

    // ── Page 1: Read landing page ─────────────────────────────────────────
    await humanScroll(page, perPageMs);

    // ── Bounce Rate Logic ─────────────────────────────────────────────────
    if (Math.random() < bounceRate) {
      await page.evaluate(() => {
        try {
          Object.defineProperty(document, 'visibilityState', { get: () => 'hidden', configurable: true });
          Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
          document.dispatchEvent(new Event('visibilitychange'));
          window.dispatchEvent(new Event('pagehide'));
        } catch (_) {}
      }).catch(() => {});
      
      await new Promise(r => setTimeout(r, 1000));
      await browser.close();
      try { fs.rmSync(sessionDir, { recursive: true, force: true }); } catch (_) {}
      
      return { status: 'success', url, loadMs, totalMs: Date.now() - startMs, sessionId, ga4Hits, attempt: 1, proxyUrl, bounced: true };
    }

    // ── Page 2: Navigate to an internal page ─────────────────────────────
    // GA4 counts this as a second page_view → definitely an engaged session
    const links1 = await page.$$eval('a', els =>
      [...new Set(
        els.filter(a => a.href && a.href.startsWith(window.location.origin) && !a.href.includes('#') && a.href !== window.location.href)
          .map(a => a.href)
      )]
    ).catch(() => []);

    if (links1.length > 0) {
      const page2url = links1[Math.floor(Math.random() * links1.length)];
      await page.goto(page2url, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => { });
      // GA4 auto-fires page_view for the new URL
      await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));
      await humanScroll(page, perPageMs);

      // ── Page 3: 60% chance — one more page ───────────────────────────
      if (Math.random() < 0.6) {
        const links2 = await page.$$eval('a', els =>
          [...new Set(
            els.filter(a => a.href && a.href.startsWith(window.location.origin) && !a.href.includes('#') && a.href !== window.location.href)
              .map(a => a.href)
          )]
        ).catch(() => []);

        if (links2.length > 0) {
          const page3url = links2[Math.floor(Math.random() * links2.length)];
          await page.goto(page3url, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => { });
          await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
          await humanScroll(page, Math.round(perPageMs * 0.5));
        }
      }
    }

    // ── Flush final GA4 hit by simulating tab close ───────────────────────
    // This causes GA4 to send its final user_engagement beacon with the REAL
    // elapsed time, which is what counts in the "engaged session" calculation.
    await page.evaluate(() => {
      try {
        Object.defineProperty(document, 'visibilityState', { get: () => 'hidden', configurable: true });
        Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event('pagehide'));
      } catch (_) { }
    }).catch(() => { });

    await new Promise(r => setTimeout(r, 2500));

    await browser.close();
    try { fs.rmSync(sessionDir, { recursive: true, force: true }); } catch (_) { }

    const totalMs = Date.now() - startMs;
    return { status: 'success', url, loadMs, totalMs, sessionId, ga4Hits, attempt: 1, proxyUrl };

  } catch (err) {
    if (browser) { try { await browser.close(); } catch (_) { } }
    try { fs.rmSync(sessionDir, { recursive: true, force: true }); } catch (_) { }
    return { status: 'failure', url, error: err.message.slice(0, 100), sessionId, attempt: 1, proxyUrl };
  }
}

// ─── Progress Display ─────────────────────────────────────────────────────────

function progressBar(done, total, width = 30) {
  const pct = total > 0 ? done / total : 0;
  const filled = Math.round(pct * width);
  return C.green + '█'.repeat(filled) + C.dim + '░'.repeat(width - filled) + C.reset +
    ' ' + c(`${done}/${total}`, C.bold) + c(` (${(pct * 100).toFixed(0)}%)`, C.dim);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const config = loadConfig();
  const cycles = parseInt(opts.cycles);
  const delayMs = parseInt(opts.delay);
  const concurrency = config.concurrency;

  const targets = config.targets.length > 0 ? config.targets : ['https://amankumarr.in'];
  const totalVisitsPerCycle = targets.length;
  const totalVisits = cycles * totalVisitsPerCycle;

  // ── Header ────────────────────────────────────────────────────────────────
  console.clear();
  console.log(c('╔' + '═'.repeat(W - 2) + '╗', C.blue));
  console.log(c('║  🚀  TRAFFIC FLOOD — YOUR SITE ONLY                                           ║', C.blue, C.bold));
  console.log(c('╚' + '═'.repeat(W - 2) + '╝', C.blue));
  console.log('');
  console.log(c(`  Target URLs : `, C.dim) + targets.slice(0, 3).join(', ') + (targets.length > 3 ? ` +${targets.length - 3} more` : ''));
  console.log(c(`  Cycles      : `, C.dim) + c(cycles, C.bold, C.cyan));
  console.log(c(`  Concurrency : `, C.dim) + c(concurrency, C.bold, C.cyan) + c(' parallel browsers', C.dim));
  console.log(c(`  Total visits: `, C.dim) + c(totalVisits, C.bold, C.yellow));
  console.log(c(`  Cycle delay : `, C.dim) + c(`${delayMs}ms`, C.dim));
  console.log('');
  console.log(c('  ⚠️  Only run this on your own site!', C.yellow));
  console.log(c('  ℹ️  Each browser visit = 1 unique session in analytics', C.dim));
  console.log(hr());

  // ── Fetch Free Proxies ────────────────────────────────────────────────────
  let freeProxies = [];
  try {
    process.stdout.write(c('\n  Fetching free proxies for IP rotation... ', C.dim));
    const axios = require('axios');
    const targetCountry = config.targetCountry || 'all';
    // Fetch from multiple popular free proxy lists for better odds
    const [res1, res2] = await Promise.all([
      axios.get(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=${targetCountry}&ssl=all&anonymity=all`).catch(() => ({ data: '' })),
      axios.get('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt').catch(() => ({ data: '' }))
    ]);
    const rawList = res1.data + '\n' + res2.data;
    freeProxies = [...new Set(rawList.split('\n').map(p => p.trim()).filter(p => p.length > 0).map(p => `http://${p}`))];
    console.log(c(`✅ Fetched ${freeProxies.length} Proxies`, C.green));
  } catch (e) {
    console.log(c(`⚠️ Failed to fetch free proxies. Proceeding with local IP.`, C.yellow));
  }

  // ── Analytics tip ─────────────────────────────────────────────────────────
  console.log(c('\n  📊 WHERE TO SEE THE SPIKE:', C.bold, C.yellow));
  console.log(c('     Vercel:          vercel.com/dashboard → your project → Analytics tab', C.white));
  console.log(c('     Google Analytics: analytics.google.com → Reports → Realtime', C.white));
  console.log(c('     Cloudflare:       dash.cloudflare.com → Analytics & Logs', C.white));
  console.log('');

  // ── Run cycles ────────────────────────────────────────────────────────────
  let totalSuccess = 0;
  let totalFailed = 0;
  const allResults = [];
  const runStart = Date.now();

  for (let cycle = 1; cycle <= cycles; cycle++) {
    const cycleStart = Date.now();
    console.log(hr('─'));
    console.log(c(`  Cycle ${cycle}/${cycles} — launching ${totalVisitsPerCycle} browsers...`, C.bold, C.cyan));

    const queue = new PQueue({ concurrency });
    const cycleResults = [];

    for (let i = 0; i < targets.length; i++) {
      const url = targets[i];
      const visitNum = i + 1;

      queue.add(async () => {
        let result;
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
          attempts++;
          // Try with a random proxy for the first few attempts.
          // If all fail, the final attempt runs without a proxy to guarantee the visit.
          const useProxy = attempts < maxAttempts && freeProxies.length > 0;
          const proxyUrl = useProxy ? freeProxies[Math.floor(Math.random() * freeProxies.length)] : null;

          result = await singleVisit(url, config, visitNum, cycle, proxyUrl);

          if (result.status === 'success') {
            break;
          }
        }

        cycleResults.push(result);

        if (result.status === 'success') {
          const hits = result.ga4Hits > 0 ? c(` GA4:${result.ga4Hits}✓`, C.cyan) : c(` GA4:?`, C.yellow);
          const px = result.proxyUrl ? c(` [proxy]`, C.dim) : '';
          const retryStr = attempts > 1 ? c(` (try ${attempts})`, C.dim) : '';
          process.stdout.write(c(`    [${visitNum}] ${url.replace(/^https?:\/\//, '').slice(0, 40)}... ✓`, C.green) + hits + px + retryStr + '\n');
        } else {
          process.stdout.write(c(`    [${visitNum}] ${url.replace(/^https?:\/\//, '').slice(0, 40)}... ✗ ${result.error}\n`, C.red));
        }
      });
    }

    await queue.onIdle();

    const cycleSuccess = cycleResults.filter((r) => r.status === 'success').length;
    const cycleFailed = cycleResults.filter((r) => r.status === 'failure').length;
    totalSuccess += cycleSuccess;
    totalFailed += cycleFailed;
    allResults.push(...cycleResults);

    const cycleMs = Date.now() - cycleStart;
    console.log(
      c(`\n  Cycle ${cycle} done:`, C.bold) +
      c(` ${cycleSuccess} ✓`, C.green) +
      c(` ${cycleFailed} ✗`, cycleFailed > 0 ? C.red : C.dim) +
      c(` in ${(cycleMs / 1000).toFixed(1)}s`, C.dim)
    );
    console.log('  Total so far: ' + progressBar(totalSuccess, totalVisits));

    if (cycle < cycles) {
      process.stdout.write(c(`\n  Waiting ${delayMs}ms before next cycle...`, C.dim));
      await new Promise((r) => setTimeout(r, delayMs));
      process.stdout.write('\n');
    }
  }

  // ── Final Summary ─────────────────────────────────────────────────────────
  const totalMs = Date.now() - runStart;
  const avgLoadMs = allResults
    .filter((r) => r.loadMs)
    .reduce((sum, r, _, arr) => sum + r.loadMs / arr.length, 0);

  console.log('\n' + hr('═'));
  console.log(c('  ✅ FLOOD COMPLETE', C.bold, C.green));
  console.log(hr('═'));
  console.log(c(`  Total visits sent  : `, C.dim) + c(totalVisits, C.bold, C.white));
  console.log(c(`  Successful         : `, C.dim) + c(totalSuccess, C.bold, C.green));
  console.log(c(`  Failed             : `, C.dim) + c(totalFailed, C.bold, totalFailed > 0 ? C.red : C.dim));
  console.log(c(`  Avg page load      : `, C.dim) + c(`${Math.round(avgLoadMs)}ms`, C.cyan));
  console.log(c(`  Total time         : `, C.dim) + c(`${(totalMs / 1000).toFixed(1)}s`, C.cyan));
  console.log(c(`  Success rate       : `, C.dim) + c(`${((totalSuccess / totalVisits) * 100).toFixed(1)}%`, C.bold, C.green));
  console.log('');
  console.log(c('  📊 Check your analytics now — you should see a spike!', C.yellow, C.bold));
  console.log(c('     Vercel:  vercel.com → your project → Analytics', C.dim));
  console.log(c('     GA:      analytics.google.com → Realtime', C.dim));
  console.log(hr('═') + '\n');

  // Save results
  const outPath = path.join('./metrics', `flood_${Date.now()}.json`);
  fs.mkdirSync('./metrics', { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ summary: { totalVisits, totalSuccess, totalFailed, avgLoadMs, totalMs }, results: allResults }, null, 2));
  console.log(c(`  Results saved to: ${outPath}`, C.dim) + '\n');
}

main().catch((err) => {
  console.error('\x1b[31m✗ Fatal:\x1b[0m', err.message);
  process.exit(1);
});
