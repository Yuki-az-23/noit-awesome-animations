/**
 * redbird — Scroll animations
 *
 * Usage:
 *   import { ScrollAnimator } from 'redbird';
 *   ScrollAnimator.init('[data-scroll]');
 */

export const ScrollAnimator = {
  _observer: null,

  /**
   * @param {string} selector   CSS selector for elements to observe
   * @param {object} [options]
   * @param {number} [options.threshold=0.15]
   * @param {string} [options.rootMargin='0px 0px -50px 0px']
   * @param {boolean} [options.once=true]   remove observer after first intersection
   * @param {string} [options.visibleClass='is-visible']
   */
  init(selector = '[data-scroll]', options = {}) {
    const {
      threshold = 0.15,
      rootMargin = '0px 0px -50px 0px',
      once = true,
      visibleClass = 'is-visible'
    } = options;

    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.scrollDelay || 0;
            setTimeout(() => el.classList.add(visibleClass), Number(delay));
            if (once) this._observer.unobserve(el);
          } else if (!once) {
            entry.target.classList.remove(visibleClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    document.querySelectorAll(selector).forEach((el) => this._observer.observe(el));
    return this;
  },

  destroy() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
};

/**
 * Animate a numeric CSS custom property relative to scroll position.
 *
 * @param {string} propName  e.g. '--parallax-y'
 * @param {number} start     value at top of page
 * @param {number} end       value at bottom of page
 * @param {string} [unit='px']
 */
export function scrollParallaxVar(propName, start, end, unit = 'px') {
  const update = () => {
    const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const value = start + (end - start) * Math.min(Math.max(progress, 0), 1);
    document.documentElement.style.setProperty(propName, value + unit);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
  return { destroy: () => window.removeEventListener('scroll', update) };
}
