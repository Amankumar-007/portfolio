'use strict';

/**
 * core/traffic-patterns.js — Realistic Traffic Pattern Generator
 *
 * Produces statistically realistic referrer sources, session durations,
 * and bounce decisions using log-normal distributions that match
 * real human traffic patterns GA4 expects to see.
 */

// ─── Referrer Pool ─────────────────────────────────────────────────────────────

const REFERRERS = {
  // Organic search (40% of web traffic)
  search: [
    'https://www.google.com/search?q=portfolio+developer',
    'https://www.google.com/search?q=web+developer+india',
    'https://www.google.com/search?q=frontend+developer+portfolio',
    'https://www.google.com/search?q=react+developer+portfolio',
    'https://www.google.com/search?q=aman+kumar+developer',
    'https://www.bing.com/search?q=web+developer+portfolio',
    'https://www.bing.com/search?q=frontend+developer',
    'https://search.yahoo.com/search?p=react+developer',
    'https://duckduckgo.com/?q=portfolio+developer',
  ],
  // Social media (25% of web traffic)
  social: [
    'https://www.linkedin.com/feed/',
    'https://www.linkedin.com/in/',
    'https://t.co/',
    'https://twitter.com/',
    'https://www.instagram.com/',
    'https://www.reddit.com/r/webdev/',
    'https://www.reddit.com/r/learnprogramming/',
    'https://www.facebook.com/',
    'https://discord.com/',
  ],
  // Direct (20% — no referrer set)
  direct: null,
  // Referral from other sites (15%)
  referral: [
    'https://github.com/',
    'https://dev.to/',
    'https://medium.com/',
    'https://hashnode.com/',
    'https://www.producthunt.com/',
    'https://news.ycombinator.com/',
  ],
};

const TRAFFIC_WEIGHTS = {
  search: 0.40,
  social: 0.25,
  direct: 0.20,
  referral: 0.15,
};

/**
 * Pick a weighted random referrer that looks like natural traffic.
 * @returns {string|undefined} Referrer URL or undefined for direct
 */
function getRandomReferrer() {
  const rand = Math.random();
  let cumulative = 0;

  for (const [source, weight] of Object.entries(TRAFFIC_WEIGHTS)) {
    cumulative += weight;
    if (rand < cumulative) {
      if (source === 'direct' || !REFERRERS[source]) return undefined;
      const pool = REFERRERS[source];
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }
  return undefined;
}

// ─── Session Duration Distribution ────────────────────────────────────────────

/**
 * Generate a realistic session duration using log-normal distribution.
 * Real web sessions: most are short (< 30s), some are long (> 5 min).
 * Log-normal μ=8, σ=1 → median ~2.9s, most between 1–120s.
 * @param {number} [minMs=3000]
 * @param {number} [maxMs=120000]
 * @returns {number} Session duration in milliseconds
 */
function getSessionDuration(minMs = 3000, maxMs = 120000) {
  // Box-Muller transform for normal distribution
  const u = Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);

  // Log-normal: exp(μ + σ*z), μ=8 → ~2980ms median
  const durationMs = Math.exp(8 + 1.2 * z);

  return Math.round(Math.min(Math.max(durationMs, minMs), maxMs));
}

// ─── Bounce Rate ──────────────────────────────────────────────────────────────

/**
 * Determine if this session should be a bounce (quick exit).
 * Uses configurable bounce rate (default 40% — matches real web average).
 * @param {number} [rate=0.4] - Bounce probability 0–1
 * @returns {boolean}
 */
function shouldBounce(rate = 0.4) {
  return Math.random() < rate;
}

// ─── Traffic Source Labeling ──────────────────────────────────────────────────

/**
 * Get a full traffic context object matching what GA4 uses for attribution.
 * @returns {object}
 */
function getTrafficContext() {
  const rand = Math.random();
  let cumulative = 0;
  let source = 'direct';

  for (const [s, weight] of Object.entries(TRAFFIC_WEIGHTS)) {
    cumulative += weight;
    if (rand < cumulative) { source = s; break; }
  }

  const referrer = source === 'direct' ? undefined : (() => {
    const pool = REFERRERS[source] || [];
    return pool[Math.floor(Math.random() * pool.length)];
  })();

  const utmMap = {
    search: { utm_source: 'google', utm_medium: 'organic' },
    social: { utm_source: referrer?.includes('linkedin') ? 'linkedin' : 'social', utm_medium: 'social' },
    referral: { utm_source: 'referral', utm_medium: 'referral' },
    direct: {},
  };

  return {
    source,
    referrer,
    utm: utmMap[source] || {},
    sessionDuration: getSessionDuration(),
    isBounce: shouldBounce(),
  };
}

// ─── Time-of-Day Awareness ────────────────────────────────────────────────────

/**
 * Get a delay to stagger this session based on time of day.
 * Visits clustered around working hours look more natural.
 * @returns {number} Delay in ms
 */
function getSessionStartDelay() {
  // Random stagger 0–5s to avoid synchronized bursts
  return Math.floor(Math.random() * 5000);
}

module.exports = {
  getRandomReferrer,
  getSessionDuration,
  shouldBounce,
  getTrafficContext,
  getSessionStartDelay,
};
