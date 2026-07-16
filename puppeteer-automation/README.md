# 🤖 Puppeteer Automation Framework

A production-ready, modular Puppeteer browser automation framework for **web testing**, **data collection**, and **application monitoring**. Built with anti-detection measures, human behavior simulation, session persistence, proxy rotation, and CAPTCHA solving support.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🕵️ **Stealth Mode** | `puppeteer-extra-plugin-stealth` with WebDriver/Canvas/WebGL overrides |
| 🖱️ **Human Behavior** | Bézier curve mouse paths, realistic typing, natural scrolling |
| 🔄 **Session Persistence** | Cookies, localStorage, sessionStorage saved across restarts |
| 🌐 **Proxy Rotation** | HTTP/HTTPS/SOCKS5 with health checking and auto-fallback |
| 🧩 **CAPTCHA Solving** | 2Captcha & Anti-Captcha integration with auto token injection |
| 📊 **Metrics & Logging** | Structured JSON logs, per-session tracking, CSV/JSON export |
| ⚡ **Concurrency** | Configurable parallel browser instances (1–20) with task queue |
| 🐳 **Docker Ready** | Multi-instance orchestration with `docker-compose up --scale bot=5` |
| 🔁 **Retry Logic** | Exponential backoff with configurable retry attempts |
| 📸 **Failure Capture** | Automatic screenshots on errors |

---

## 📁 Project Structure

```
puppeteer-automation/
├── core/
│   ├── browser.js       # Browser engine with stealth + fingerprint injection
│   ├── behavior.js      # Human mouse/keyboard/scroll simulation
│   ├── session.js       # Cookie & storage persistence
│   ├── proxy.js         # Proxy rotation, health checking, anonymization
│   └── captcha.js       # CAPTCHA detection & solving (2Captcha / Anti-Captcha)
├── utils/
│   ├── logger.js        # Winston structured logging with credential masking
│   ├── fingerprint.js   # Browser fingerprint randomization
│   └── metrics.js       # Performance metrics & CSV/JSON export
├── sessions/            # Auto-created: persisted session files
│   └── session_001/
│       ├── cookies.json
│       ├── localStorage.json
│       └── metadata.json
├── screenshots/         # Auto-created: failure screenshots
├── metrics/             # Auto-created: exported metrics files
├── logs/                # Auto-created: rotating log files
├── index.js             # Main controller & task orchestrator
├── config.example.json  # Configuration template
├── .env.example         # Environment variables template
├── Dockerfile           # Container setup
├── docker-compose.yml   # Multi-instance orchestration
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd puppeteer-automation
npm install
```

### 2. Configure

```bash
# Copy and edit config
cp config.example.json config.json

# Copy and set environment variables
cp .env.example .env
```

Edit `config.json`:
```json
{
  "concurrency": 3,
  "headless": true,
  "targets": [
    "https://example.com/page1",
    "https://example.com/page2"
  ]
}
```

### 3. Run

```bash
# Default run (uses config.json)
npm start

# With custom config and concurrency
node index.js --config ./my-config.json --concurrency 10

# Smoke test against httpbin.org
npm test

# Verify fingerprint randomization (opens browser visually)
npm run fingerprint-test
```

---

## ⚙️ Configuration Reference

```json
{
  "concurrency": 5,
  "headless": true,
  "stealth": true,
  "sessionPersistence": true,
  "sessionsDir": "./sessions",
  "userDataDir": "./user_data",

  "proxies": [
    { "host": "proxy.example.com", "port": 8080, "user": "u", "pass": "p", "protocol": "http" },
    { "host": "socks.example.com", "port": 1080, "protocol": "socks5" }
  ],
  "proxyRotation": "per_session",

  "captchaService": "2captcha",
  "captchaApiKey": "YOUR_KEY",

  "defaultTimeout": 30000,
  "maxRetries": 3,
  "retryDelay": 2000,

  "staggeredStart": true,
  "staggerDelayMs": 1500,

  "screenshotsDir": "./screenshots",
  "metricsDir": "./metrics",

  "targets": [
    "https://example.com/page1"
  ]
}
```

| Option | Default | Description |
|---|---|---|
| `concurrency` | `3` | Parallel browser instances |
| `headless` | `true` | `true` = headless, `false` = visible |
| `stealth` | `true` | Enable stealth evasion plugin |
| `sessionPersistence` | `true` | Save/restore cookies & storage |
| `proxyRotation` | `"per_session"` | `per_session`, `per_request`, `on_failure` |
| `captchaService` | `null` | `"2captcha"` or `"anticaptcha"` |
| `maxRetries` | `3` | Retry attempts per URL |
| `retryDelay` | `2000` | Base delay for exponential backoff (ms) |
| `staggeredStart` | `true` | Stagger browser starts to avoid detection |

---

## 🐳 Docker Deployment

### Build & Run Single Instance

```bash
docker-compose up
```

### Scale to Multiple Instances

```bash
docker-compose up --scale bot=5
```

### Build Image Manually

```bash
docker build -t puppeteer-automation .
docker run --rm -v $(pwd)/config.json:/app/config.json puppeteer-automation
```

---

## 🧩 CAPTCHA Configuration

The framework integrates with third-party solving services:

### 2Captcha

```json
{
  "captchaService": "2captcha",
  "captchaApiKey": "your_api_key"
}
```

Or via environment variable:
```bash
CAPTCHA_API_KEY=your_api_key
```

### Anti-Captcha

```json
{
  "captchaService": "anticaptcha",
  "captchaApiKey": "your_api_key"
}
```

**Supported CAPTCHA types:**
- reCAPTCHA v2 (standard & invisible)
- hCaptcha
- "I'm not a robot" checkbox detection
- Cloudflare challenge detection (flagged, not solved automatically)

---

## 🌐 Proxy Configuration

```json
{
  "proxies": [
    { "host": "proxy.example.com", "port": 8080, "user": "u", "pass": "p" },
    { "host": "socks.example.com", "port": 1080, "protocol": "socks5" }
  ],
  "proxyRotation": "per_session"
}
```

**Rotation strategies:**
- `"per_session"` — New proxy for each browser session
- `"per_request"` — New proxy for every URL request  
- `"on_failure"` — Rotate only when current proxy fails

Proxies are health-checked via `httpbin.org/ip` before use, with automatic fallback to the next healthy proxy.

---

## 📊 Metrics & Logs

Logs are written to `./logs/` with daily rotation:

```
logs/
├── automation-2024-01-15.log   # JSON structured daily log
├── automation-2024-01-14.log
└── error.log                   # Error-only log
```

Metrics are exported after each run:

```
metrics/
├── metrics_2024-01-15T10-00-00.csv
└── metrics_2024-01-15T10-00-00.json
```

**Tracked metrics per task:**
- Load time (ms)
- Interaction time (ms)
- Total time (ms)
- Retry count
- CAPTCHA encountered/solved
- Proxy used
- Success/failure status

---

## 🛡️ Anti-Detection Measures

The framework implements multiple evasion layers:

1. **navigator.webdriver** → set to `undefined`
2. **navigator.plugins** → populated with realistic plugin entries
3. **navigator.languages** → randomized locale-matched strings
4. **WebGL vendor/renderer** → rotated across real GPU profiles
5. **Canvas fingerprint** → subtle noise injection
6. **Screen dimensions** → matched to viewport fingerprint
7. **Timezone** → aligned with proxy location
8. **chrome runtime** → spoofed object present
9. **--disable-blink-features=AutomationControlled** → removes automation flag
10. **Bézier mouse paths** → non-linear cursor movement
11. **Variable typing delays** → 50–150ms with occasional typos

---

## 🔒 Security Best Practices

- API keys and proxy credentials are **never logged** (auto-masked)
- Sensitive config loaded from `.env` environment variables
- Docker container runs as **non-root user**
- Proxy URLs are validated before use
- Sessions stored locally — never transmitted

---

## 📋 CLI Reference

```bash
node index.js [options]

Options:
  -c, --config <path>       Config file path (default: ./config.json)
  --concurrency <n>         Override concurrency from config
  --headless                Force headless mode
  --test                    Smoke test against httpbin.org
  --fingerprint-test        Show fingerprint samples + open browserleaks.com
  -V, --version             Show version
  -h, --help                Show help
```

---

## 🧪 Testing

```bash
# Basic smoke test — verifies framework runs end-to-end
npm test

# Fingerprint verification — inspect randomization in browser
npm run fingerprint-test
```

The test mode visits:
- `https://httpbin.org/headers` — Verify request headers
- `https://httpbin.org/user-agent` — Verify user agent rotation
- `https://httpbin.org/ip` — Verify proxy usage

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `puppeteer` | Core browser automation |
| `puppeteer-extra` | Plugin middleware for Puppeteer |
| `puppeteer-extra-plugin-stealth` | Bot detection evasion |
| `user-agents` | Realistic user agent strings |
| `proxy-chain` | Proxy URL anonymization |
| `winston` | Structured logging |
| `winston-daily-rotate-file` | Log file rotation |
| `p-queue` | Concurrency-limited task queue |
| `axios` | HTTP client for CAPTCHA API calls |
| `dotenv` | Environment variable loading |
| `commander` | CLI argument parsing |
| `uuid` | Unique session ID generation |
| `fast-csv` | CSV export |

---

## ⚠️ Legal & Ethical Usage

This framework is designed for:
- ✅ QA and automated browser testing
- ✅ Monitoring your own web applications
- ✅ Collecting publicly available data with rate limiting
- ✅ Performance benchmarking
- ✅ Accessibility testing

Always respect:
- Website `robots.txt` directives
- Terms of service of target websites
- Rate limits and server load
- Applicable laws in your jurisdiction

---

## 📄 License

MIT — see LICENSE file for details.
