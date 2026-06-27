/**
 * CSS & JS Animations Library - Shared Utilities
 * No dependencies. Pure JS.
 */

// ─── Intersection Observer for scroll-triggered animations ───
const ScrollAnimator = {
  observer: null,
  
  init(selector = '[data-scroll]', options = {}) {
    const {
      threshold = 0.15,
      rootMargin = '0px 0px -50px 0px',
      once = true
    } = options;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.scrollDelay || 0;
          setTimeout(() => el.classList.add('is-visible'), delay);
          if (once) this.observer.unobserve(el);
        } else if (!once) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold, rootMargin });

    document.querySelectorAll(selector).forEach(el => this.observer.observe(el));
    return this;
  },

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
};

// ─── Lerp & clamp helpers ───
const MathUtils = {
  lerp: (start, end, factor) => start + (end - start) * factor,
  clamp: (val, min, max) => Math.min(Math.max(val, min), max),
  map: (value, inMin, inMax, outMin, outMax) =>
    outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin),
  // Normalize scroll 0-1
  scrollProgress: () => window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
};

// ─── Smooth scroll ───
function smoothScrollTo(target, duration = 1000) {
  const start = window.scrollY;
  const end = typeof target === 'string' 
    ? document.querySelector(target)?.offsetTop || 0 
    : target;
  const distance = end - start;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── CSS Custom Property setter (for animated properties) ───
function setCSSVar(el, prop, value) {
  el.style.setProperty(prop, value);
}

// ─── RAF throttle ───
function rafThrottle(fn) {
  let ticking = false;
  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// ─── Debounce ───
function debounce(fn, ms = 100) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ─── Init on DOM ready ───
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}