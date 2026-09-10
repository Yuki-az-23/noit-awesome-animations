/**
 * redbird — Text animations
 *
 * Usage:
 *   import { typewriter, splitText } from 'redbird';
 */

/**
 * Typewriter effect — types text one character at a time.
 *
 * @param {Element|string} target  element or CSS selector
 * @param {string} text            the string to type
 * @param {object} [options]
 * @param {number} [options.speed=60]    ms per character
 * @param {number} [options.delay=0]     ms before starting
 * @param {boolean} [options.cursor=true] show blinking cursor
 * @returns {{ destroy: Function }}
 */
export function typewriter(target, text, options = {}) {
  const { speed = 60, delay = 0, cursor = true } = options;
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return { destroy: () => {} };

  let index = 0;
  let timer;

  if (cursor) el.classList.add('rb-typewriter-cursor');

  const start = setTimeout(() => {
    timer = setInterval(() => {
      el.textContent = text.slice(0, ++index);
      if (index >= text.length) {
        clearInterval(timer);
        if (cursor) el.classList.remove('rb-typewriter-cursor');
      }
    }, speed);
  }, delay);

  return {
    destroy() {
      clearTimeout(start);
      clearInterval(timer);
    }
  };
}

/**
 * Split element text into individual `<span>` characters for per-letter animations.
 *
 * @param {Element|string} target
 * @param {object} [options]
 * @param {string} [options.spanClass='rb-char']
 * @param {number} [options.staggerDelay=30]  ms between each character's animation-delay
 * @returns {{ chars: Element[], destroy: Function }}
 */
export function splitText(target, options = {}) {
  const { spanClass = 'rb-char', staggerDelay = 30 } = options;
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return { chars: [], destroy: () => {} };

  const original = el.innerHTML;
  const text = el.textContent;
  el.innerHTML = '';

  const chars = Array.from(text).map((char, i) => {
    const span = document.createElement('span');
    span.className = spanClass;
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * staggerDelay}ms`;
    el.appendChild(span);
    return span;
  });

  return {
    chars,
    destroy() {
      el.innerHTML = original;
    }
  };
}

/**
 * Animate a number from `from` to `to` inside an element.
 *
 * @param {Element|string} target
 * @param {number} from
 * @param {number} to
 * @param {object} [options]
 * @param {number} [options.duration=1500]  ms
 * @param {number} [options.decimals=0]
 * @param {Function} [options.easing]
 * @returns {{ destroy: Function }}
 */
export function countUp(target, from, to, options = {}) {
  const { duration = 1500, decimals = 0, easing = (t) => 1 - Math.pow(1 - t, 3) } = options;
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return { destroy: () => {} };

  let raf;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = (from + (to - from) * easing(progress)).toFixed(decimals);
    if (progress < 1) raf = requestAnimationFrame(step);
  }

  raf = requestAnimationFrame(step);
  return { destroy: () => cancelAnimationFrame(raf) };
}
