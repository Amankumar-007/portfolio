'use strict';

/**
 * proxy.js — Fetch and display all available free proxies
 *
 * Usage:
 *   node proxy.js           # fetch and list all proxies
 *   node proxy.js --test    # fetch, test each one, show which are alive
 *   node proxy.js --count   # just show the count
 */

const axios = require('axios');

// ─── Terminal Colors ──────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', cyan: '\x1b[36m', white: '\x1b[37m',
};
const c = (s, ...codes) => codes.join('') + String(s) + C.reset;
const W = Math.min(process.stdout.columns || 100, 110);
const hr = (ch = '─') => C.dim + ch.repeat(W) + C.reset;

const args = process.argv.slice(2);
const TEST_MODE = args.includes('--test');
const COUNT_ONLY = args.includes('--count');
const TEST_URL = 'https://www.google.com';
const TEST_TIMEOUT = 6000; // 6 seconds

// ─── Proxy Sources ────────────────────────────────────────────────────────────
const SOURCES = [
  {
    name: 'ProxyScrape (HTTP)',
    url: 'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
  },
  {
    name: 'TheSpeedX GitHub List',
    url: 'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
  },
  {
    name: 'ProxyScrape (SOCKS4)',
    url: 'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=all',
  },
];

// ─── Fetch proxies from all sources ──────────────────────────────────────────
async function fetchProxies() {
  const results = await Promise.all(
    SOURCES.map(async (source) => {
      try {
        const res = await axios.get(source.url, { timeout: 10000 });
        const proxies = res.data
          .split('\n')
          .map(p => p.trim())
          .filter(p => p.length > 4 && p.includes(':'));
        return { name: source.name, proxies, error: null };
      } catch (e) {
        return { name: source.name, proxies: [], error: e.message };
      }
    })
  );
  return results;
}

// ─── Test a single proxy ──────────────────────────────────────────────────────
async function testProxy(proxy) {
  const proxyUrl = proxy.startsWith('http') ? proxy : `http://${proxy}`;
  try {
    const { HttpsProxyAgent } = require('https-proxy-agent');
    const agent = new HttpsProxyAgent(proxyUrl);
    const start = Date.now();
    await axios.get(TEST_URL, {
      httpsAgent: agent,
      httpAgent: agent,
      timeout: TEST_TIMEOUT,
      validateStatus: () => true,
    });
    return { alive: true, latency: Date.now() - start };
  } catch {
    return { alive: false, latency: null };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n' + hr('═'));
  console.log(c('  🌐  PROXY LIST VIEWER', C.bold, C.cyan));
  console.log(hr('═'));

  process.stdout.write(c('\n  Fetching proxies from all sources...', C.dim));
  const sourceResults = await fetchProxies();
  console.log(c(' Done!\n', C.green));

  // Collect all proxies, deduplicate
  let allProxies = [];
  for (const { name, proxies, error } of sourceResults) {
    if (error) {
      console.log(c(`  ✗ ${name}: ${error}`, C.red));
    } else {
      console.log(c(`  ✔ ${name}`, C.green) + c(` → ${proxies.length} proxies`, C.dim));
      allProxies.push(...proxies);
    }
  }

  // Deduplicate
  allProxies = [...new Set(allProxies)];

  console.log('');
  console.log(hr());
  console.log(c(`  Total unique proxies: `, C.dim) + c(allProxies.length, C.bold, C.white));
  console.log(hr());

  if (COUNT_ONLY) {
    console.log('');
    return;
  }

  if (TEST_MODE) {
    // Test each proxy concurrently (batches of 20)
    console.log(c(`\n  Testing each proxy against ${TEST_URL} (timeout ${TEST_TIMEOUT}ms)...`, C.yellow));
    console.log(c('  This may take a while for large lists.\n', C.dim));

    const BATCH = 20;
    let alive = 0;
    let dead = 0;

    for (let i = 0; i < allProxies.length; i += BATCH) {
      const batch = allProxies.slice(i, i + BATCH);
      const results = await Promise.all(batch.map(p => testProxy(p)));

      results.forEach((r, idx) => {
        const proxy = batch[idx];
        if (r.alive) {
          alive++;
          console.log(c(`  ✅ ${proxy.padEnd(25)}`, C.green) + c(` ${r.latency}ms`, C.cyan));
        } else {
          dead++;
          process.stdout.write(c('.', C.dim));
        }
      });

      // Progress
      process.stdout.write(`\r  Tested ${i + batch.length}/${allProxies.length} — ${c(alive + ' alive', C.green)} / ${c(dead + ' dead', C.red)}  `);
    }

    console.log('\n');
    console.log(hr());
    console.log(c('  TEST RESULTS:', C.bold));
    console.log(c('  Alive proxies : ', C.dim) + c(alive, C.bold, C.green));
    console.log(c('  Dead proxies  : ', C.dim) + c(dead, C.bold, C.red));
    console.log(hr());

  } else {
    // Just list all proxies in a clean table
    console.log('');
    console.log(c('  #'.padEnd(6) + 'PROXY'.padEnd(25) + 'PORT'.padEnd(8) + 'PROTOCOL', C.bold, C.white));
    console.log(hr('─'));

    allProxies.forEach((proxy, i) => {
      const [host, port] = proxy.split(':');
      const num = String(i + 1).padEnd(6);
      const hostStr = (host || proxy).padEnd(25);
      const portStr = (port || '?').padEnd(8);
      const proto = 'HTTP';

      // Alternate row colors for readability
      if (i % 2 === 0) {
        console.log(c(num, C.dim) + c(hostStr, C.cyan) + c(portStr, C.yellow) + c(proto, C.dim));
      } else {
        console.log(c(num, C.dim) + c(hostStr, C.white) + c(portStr, C.yellow) + c(proto, C.dim));
      }
    });

    console.log(hr('─'));
    console.log(c(`\n  Total: ${allProxies.length} proxies listed above.`, C.bold, C.white));
    console.log(c('  Tip: Run with --test flag to check which ones are alive:', C.dim));
    console.log(c('       node proxy.js --test\n', C.cyan));
  }
}

main().catch(err => {
  console.error(c('\n✗ Error: ' + err.message, C.red));
  process.exit(1);
});
