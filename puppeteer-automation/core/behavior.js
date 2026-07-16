'use strict';

const logger = require('../utils/logger');

/**
 * Human Behavior Module — simulates realistic mouse movement, keyboard input,
 * scrolling, and timing patterns to avoid bot detection.
 */
class HumanBehavior {
  constructor(page, options = {}) {
    this.page = page;
    this.options = {
      typingDelayMin: options.typingDelayMin ?? 50,
      typingDelayMax: options.typingDelayMax ?? 150,
      actionDelayMin: options.actionDelayMin ?? 500,
      actionDelayMax: options.actionDelayMax ?? 3000,
      scrollAmountMin: options.scrollAmountMin ?? 100,
      scrollAmountMax: options.scrollAmountMax ?? 500,
      mouseSteps: options.mouseSteps ?? 10,
      ...options,
    };
  }

  // ─── Utilities ────────────────────────────────────────────────────────────

  /**
   * Sleep for a random duration between min and max milliseconds.
   * @param {number} min
   * @param {number} max
   */
  async randomSleep(min, max) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await this._sleep(delay);
    return delay;
  }

  /**
   * Promise-based sleep.
   * @param {number} ms
   */
  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generate a random float between min and max.
   * @param {number} min
   * @param {number} max
   */
  _randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generate points along a cubic Bézier curve for smooth mouse paths.
   * @param {number} x1 - Start X
   * @param {number} y1 - Start Y
   * @param {number} x2 - End X
   * @param {number} y2 - End Y
   * @param {number} steps - Number of intermediate points
   * @returns {{x: number, y: number}[]}
   */
  _bezierCurve(x1, y1, x2, y2, steps = 10) {
    // Two random control points for natural S-curve or arc movement
    const cx1 = x1 + (x2 - x1) * this._randomFloat(0.2, 0.4) + this._randomFloat(-50, 50);
    const cy1 = y1 + (y2 - y1) * this._randomFloat(0.1, 0.3) + this._randomFloat(-80, 80);
    const cx2 = x1 + (x2 - x1) * this._randomFloat(0.6, 0.8) + this._randomFloat(-50, 50);
    const cy2 = y1 + (y2 - y1) * this._randomFloat(0.7, 0.9) + this._randomFloat(-80, 80);

    const points = [];
    for (let t = 0; t <= 1; t += 1 / steps) {
      const u = 1 - t;
      const x =
        u * u * u * x1 + 3 * u * u * t * cx1 + 3 * u * t * t * cx2 + t * t * t * x2;
      const y =
        u * u * u * y1 + 3 * u * u * t * cy1 + 3 * u * t * t * cy2 + t * t * t * y2;
      points.push({ x: Math.round(x), y: Math.round(y) });
    }
    return points;
  }

  // ─── Mouse Movement ───────────────────────────────────────────────────────

  /**
   * Move mouse from current position to target using a realistic Bézier path.
   * @param {number} targetX - Target X coordinate
   * @param {number} targetY - Target Y coordinate
   * @param {object} [options={}]
   */
  async moveMouse(targetX, targetY, options = {}) {
    const mouse = this.page.mouse;
    const steps = options.steps ?? Math.floor(this._randomFloat(8, 20));

    // Get current mouse position via page evaluation
    const currentPos = await this.page.evaluate(() => ({
      x: window._mouseX || Math.floor(Math.random() * 800) + 100,
      y: window._mouseY || Math.floor(Math.random() * 600) + 100,
    }));

    const path = this._bezierCurve(currentPos.x, currentPos.y, targetX, targetY, steps);

    // Variable speed — faster at start and end, slower in middle (natural feel)
    for (let i = 0; i < path.length; i++) {
      const point = path[i];
      const progress = i / path.length;
      // Easing: slow start, fast middle, slow end
      const speedFactor = Math.sin(progress * Math.PI);
      const delay = Math.max(5, Math.floor(this._randomFloat(10, 30) * (1 - speedFactor * 0.7)));

      await mouse.move(point.x, point.y);
      await this._sleep(delay);
    }

    // Overshoot and correct for more natural feel
    if (Math.random() < 0.3) {
      const overshootX = targetX + this._randomFloat(-8, 8);
      const overshootY = targetY + this._randomFloat(-8, 8);
      await mouse.move(overshootX, overshootY);
      await this._sleep(Math.floor(this._randomFloat(50, 120)));
      await mouse.move(targetX, targetY);
      await this._sleep(Math.floor(this._randomFloat(20, 60)));
    }

    // Track mouse position in page context
    await this.page.evaluate((x, y) => {
      window._mouseX = x;
      window._mouseY = y;
    }, targetX, targetY);
  }

  /**
   * Click an element with human-like mouse movement, hover pause, and click.
   * @param {string} selector - CSS selector
   * @param {object} [options={}]
   */
  async click(selector, options = {}) {
    const element = await this.page.waitForSelector(selector, {
      visible: true,
      timeout: options.timeout ?? 15000,
    });

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const box = await element.boundingBox();
    if (!box) {
      throw new Error(`Cannot get bounding box for: ${selector}`);
    }

    // Click somewhere inside the element, slightly off-center for realism
    const targetX = box.x + box.width * this._randomFloat(0.3, 0.7);
    const targetY = box.y + box.height * this._randomFloat(0.3, 0.7);

    await this.moveMouse(Math.round(targetX), Math.round(targetY));

    // Brief hover pause before clicking
    await this._sleep(Math.floor(this._randomFloat(80, 250)));

    await this.page.mouse.click(Math.round(targetX), Math.round(targetY), {
      button: 'left',
      clickCount: 1,
      delay: Math.floor(this._randomFloat(30, 90)),
    });

    logger.debug(`[HumanBehavior] Clicked ${selector}`);
  }

  /**
   * Move mouse to a random position on the page (simulate idle movement).
   */
  async randomMouseMovement() {
    const viewport = this.page.viewport();
    if (!viewport) return;

    const x = Math.floor(this._randomFloat(100, viewport.width - 100));
    const y = Math.floor(this._randomFloat(100, viewport.height - 100));
    await this.moveMouse(x, y);
  }

  // ─── Keyboard Input ───────────────────────────────────────────────────────

  /**
   * Type text into an element with realistic delays, occasional typos, and pauses.
   * @param {string} selector - CSS selector
   * @param {string} text - Text to type
   * @param {object} [options={}]
   */
  async type(selector, text, options = {}) {
    await this.click(selector, options);
    await this._sleep(Math.floor(this._randomFloat(200, 500)));

    // Clear existing content
    await this.page.keyboard.down('Control');
    await this.page.keyboard.press('a');
    await this.page.keyboard.up('Control');
    await this._sleep(100);

    const typoRate = options.typoRate ?? 0.03; // 3% chance of typo per keystroke

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // Simulate occasional typo
      if (Math.random() < typoRate) {
        const typoChar = String.fromCharCode(char.charCodeAt(0) + (Math.random() < 0.5 ? 1 : -1));
        await this.page.keyboard.type(typoChar, {
          delay: this._randomFloat(this.options.typingDelayMin, this.options.typingDelayMax),
        });
        await this._sleep(Math.floor(this._randomFloat(100, 300)));
        await this.page.keyboard.press('Backspace');
        await this._sleep(Math.floor(this._randomFloat(50, 150)));
      }

      await this.page.keyboard.type(char, {
        delay: this._randomFloat(this.options.typingDelayMin, this.options.typingDelayMax),
      });

      // Occasional mid-typing pause (thinking moment)
      if (Math.random() < 0.05) {
        await this._sleep(Math.floor(this._randomFloat(200, 600)));
      }
    }

    logger.debug(`[HumanBehavior] Typed ${text.length} characters into ${selector}`);
  }

  // ─── Scrolling ────────────────────────────────────────────────────────────

  /**
   * Perform a human-like smooth scroll.
   * @param {number} amount - Pixel amount to scroll (positive = down, negative = up)
   */
  async scroll(amount) {
    await this.page.evaluate(async (scrollAmount) => {
      return new Promise((resolve) => {
        let totalScrolled = 0;
        const direction = scrollAmount > 0 ? 1 : -1;
        const absAmount = Math.abs(scrollAmount);
        const step = Math.max(10, Math.floor(absAmount / 20));

        const doScroll = () => {
          const remaining = absAmount - totalScrolled;
          if (remaining <= 0) {
            resolve();
            return;
          }
          const scrollStep = Math.min(step + Math.floor(Math.random() * 10 - 5), remaining);
          window.scrollBy({ top: direction * scrollStep, behavior: 'smooth' });
          totalScrolled += scrollStep;
          setTimeout(doScroll, 30 + Math.random() * 20);
        };
        doScroll();
      });
    }, amount);

    await this._sleep(Math.floor(this._randomFloat(100, 300)));
  }

  /**
   * Simulate natural page reading scroll pattern.
   * Scrolls down with variable amounts and occasional upward scrolls.
   * @param {object} [options={}]
   */
  async naturalScroll(options = {}) {
    const totalDuration = options.duration ?? Math.floor(this._randomFloat(3000, 10000));
    const startTime = Date.now();

    while (Date.now() - startTime < totalDuration) {
      const scrollAmount = Math.floor(
        this._randomFloat(this.options.scrollAmountMin, this.options.scrollAmountMax)
      );

      // 20% chance to scroll up slightly (reading behavior)
      const direction = Math.random() < 0.2 ? -1 : 1;
      await this.scroll(direction * scrollAmount);

      // Check if we've reached the bottom
      const atBottom = await this.page.evaluate(() => {
        return window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
      });

      if (atBottom && direction === 1) {
        logger.debug('[HumanBehavior] Reached page bottom');
        break;
      }

      await this.randomSleep(this.options.actionDelayMin, this.options.actionDelayMax);

      // Move mouse occasionally while reading
      if (Math.random() < 0.3) {
        await this.randomMouseMovement();
      }
    }
  }

  /**
   * Scroll to a specific element.
   * @param {string} selector
   */
  async scrollToElement(selector) {
    await this.page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, selector);
    await this._sleep(Math.floor(this._randomFloat(500, 1200)));
  }

  // ─── Page Interaction Patterns ────────────────────────────────────────────

  /**
   * Simulate a human visiting a page: mouse movement, scroll, read time.
   * @param {object} [options={}]
   */
  async simulatePageVisit(options = {}) {
    const visitDuration = options.duration ?? Math.floor(this._randomFloat(3000, 15000));

    logger.debug(`[HumanBehavior] Simulating page visit for ~${visitDuration}ms`);

    // Initial pause (page load reaction time)
    await this._sleep(Math.floor(this._randomFloat(800, 2000)));

    // Random initial mouse movement
    await this.randomMouseMovement();
    await this._sleep(Math.floor(this._randomFloat(500, 1500)));

    // Scroll through the page naturally
    await this.naturalScroll({ duration: visitDuration });

    // End with random mouse movement
    await this.randomMouseMovement();
  }

  /**
   * Wait a random delay between actions.
   */
  async betweenActions() {
    return this.randomSleep(this.options.actionDelayMin, this.options.actionDelayMax);
  }

  /**
   * Hover over an element without clicking.
   * @param {string} selector
   */
  async hover(selector) {
    const element = await this.page.$(selector);
    if (!element) return;

    const box = await element.boundingBox();
    if (!box) return;

    const x = Math.round(box.x + box.width * this._randomFloat(0.3, 0.7));
    const y = Math.round(box.y + box.height * this._randomFloat(0.3, 0.7));

    await this.moveMouse(x, y);
    await this._sleep(Math.floor(this._randomFloat(300, 800)));
  }
}

module.exports = HumanBehavior;
