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

let targetCountry = 'all';
try {
  const cfg = require('./config.json');
  if (cfg.targetCountry) targetCountry = cfg.targetCountry;
} catch (e) {}

// Helper to normalize countries input to an array of uppercase country codes
function getCountryCodes(input) {
  if (Array.isArray(input)) {
    return input.map(c => String(c).trim().toUpperCase()).filter(Boolean);
  }
  if (typeof input === 'string') {
    return input.split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
  }
  return ['ALL'];
}

// ─── Proxy Sources ────────────────────────────────────────────────────────────
async function fetchProxies() {
  const axios = require('axios');
  const countries = getCountryCodes(targetCountry);
  const isAll = countries.includes('ALL') || countries.includes('*');
  const countrySet = new Set(countries);

  const promises = [];

  if (isAll) {
    promises.push(
      axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all', { timeout: 12000 }).catch(() => ({ data: '' })),
      axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=all', { timeout: 12000 }).catch(() => ({ data: '' })),
      axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=all', { timeout: 12000 }).catch(() => ({ data: '' })),
      axios.get('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt', { timeout: 15000 }).catch(() => ({ data: '' })),
      axios.get('https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt', { timeout: 15000 }).catch(() => ({ data: '' })),
      axios.get('https://proxylist.geonode.com/api/proxy-list?limit=500&page=1&sort_by=lastChecked&sort_type=desc', { timeout: 15000 })
        .then(r => ({ data: (r.data?.data || []).map(p => `${p.ip}:${p.port}`).join('\n') })).catch(() => ({ data: '' })),
    );
  } else {
    // For each specific target country in array/list
    for (const cc of countrySet) {
      const lower = cc.toLowerCase();
      promises.push(
        // ProxyScrape HTTP, SOCKS4, SOCKS5
        axios.get(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=${lower}&ssl=all&anonymity=all`, { timeout: 12000 }).catch(() => ({ data: '' })),
        axios.get(`https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=http&country=${cc}&timeout=10000`, { timeout: 12000 }).catch(() => ({ data: '' })),
        axios.get(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=${lower}`, { timeout: 12000 }).catch(() => ({ data: '' })),
        axios.get(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=${lower}`, { timeout: 12000 }).catch(() => ({ data: '' })),

        // Geonode Pages 1 through 5
        axios.get(`https://proxylist.geonode.com/api/proxy-list?limit=500&page=1&sort_by=lastChecked&sort_type=desc&country=${cc}`, { timeout: 15000 }).then(r => ({ data: (r.data?.data || []).map(p => `${p.ip}:${p.port}`).join('\n') })).catch(() => ({ data: '' })),
        axios.get(`https://proxylist.geonode.com/api/proxy-list?limit=500&page=2&sort_by=lastChecked&sort_type=desc&country=${cc}`, { timeout: 15000 }).then(r => ({ data: (r.data?.data || []).map(p => `${p.ip}:${p.port}`).join('\n') })).catch(() => ({ data: '' })),
        axios.get(`https://proxylist.geonode.com/api/proxy-list?limit=500&page=3&sort_by=lastChecked&sort_type=desc&country=${cc}`, { timeout: 15000 }).then(r => ({ data: (r.data?.data || []).map(p => `${p.ip}:${p.port}`).join('\n') })).catch(() => ({ data: '' })),
        axios.get(`https://proxylist.geonode.com/api/proxy-list?limit=500&page=4&sort_by=lastChecked&sort_type=desc&country=${cc}`, { timeout: 15000 }).then(r => ({ data: (r.data?.data || []).map(p => `${p.ip}:${p.port}`).join('\n') })).catch(() => ({ data: '' })),
        axios.get(`https://proxylist.geonode.com/api/proxy-list?limit=500&page=5&sort_by=lastChecked&sort_type=desc&country=${cc}`, { timeout: 15000 }).then(r => ({ data: (r.data?.data || []).map(p => `${p.ip}:${p.port}`).join('\n') })).catch(() => ({ data: '' })),

        // FreeProxy.World Scraper
        axios.get(`https://www.freeproxy.world/?country=${cc}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 15000 })
          .then(r => {
            if (typeof r.data !== 'string') return { data: '' };
            const matches = [];
            const regex = /<td class="left">([0-9\.]+)<\/td>[\s\S]*?<a href="\/port\/([0-9]+)"/gi;
            let m;
            while ((m = regex.exec(r.data)) !== null) {
              matches.push(`${m[1]}:${m[2]}`);
            }
            return { data: matches.join('\n') };
          }).catch(() => ({ data: '' })),

        // Proxy-List.download
        axios.get(`https://www.proxy-list.download/api/v1/get?type=http&country=${cc}`, { timeout: 12000 }).catch(() => ({ data: '' })),
        axios.get(`https://www.proxy-list.download/api/v1/get?type=https&country=${cc}`, { timeout: 12000 }).catch(() => ({ data: '' })),
        axios.get(`https://www.proxy-list.download/api/v1/get?type=socks4&country=${cc}`, { timeout: 12000 }).catch(() => ({ data: '' })),
        axios.get(`https://www.proxy-list.download/api/v1/get?type=socks5&country=${cc}`, { timeout: 12000 }).catch(() => ({ data: '' })),
      );
    }
  }

  // ── Global Multi-Country Dataset Parsing (Proxifly + Fate0) ────────────────────
  promises.push(
    axios.get('https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.json', { timeout: 15000 })
      .then(r => {
        if (!Array.isArray(r.data)) return { data: '' };
        const filtered = isAll ? r.data : r.data.filter(p => {
          const code = (p.geolocation?.country?.code || p.countryCode || '').toUpperCase();
          return countrySet.has(code);
        });
        return { data: filtered.map(p => `${p.ip}:${p.port}`).join('\n') };
      }).catch(() => ({ data: '' })),

    axios.get('https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list', { timeout: 15000 })
      .then(r => {
        if (typeof r.data !== 'string') return { data: '' };
        const lines = r.data.split('\n');
        const list = [];
        for (const line of lines) {
          try {
            const obj = JSON.parse(line);
            if (isAll || (obj.country && countrySet.has(obj.country.toUpperCase()))) {
              list.push(`${obj.host}:${obj.port}`);
            }
          } catch (_) {}
        }
        return { data: list.join('\n') };
      }).catch(() => ({ data: '' })),
  );

  const results = await Promise.all(promises);
  const rawList = results.map(r => (typeof r.data === 'string' ? r.data : '')).join('\n');
  const allProxies = [...new Set(rawList.split('\n').map(p => p.trim()).filter(p => /^\d+\.\d+\.\d+\.\d+:\d+$/.test(p)))];

  const label = isAll ? 'ALL' : countries.join(', ');
  return [{ name: `Aggregated Sources (${label})`, proxies: allProxies, error: null }];
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
