/**
 * redbird — Utility helpers
 */

export const MathUtils = {
  lerp: (start, end, factor) => start + (end - start) * factor,
  clamp: (val, min, max) => Math.min(Math.max(val, min), max),
  map: (value, inMin, inMax, outMin, outMax) =>
    outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin),
  scrollProgress: () =>
    window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
};

export function setCSSVar(el, prop, value) {
  el.style.setProperty(prop, value);
}

export function rafThrottle(fn) {
  let ticking = false;
  return function (...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

export function debounce(fn, ms = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

export function smoothScrollTo(target, duration = 1000) {
  const start = window.scrollY;
  const end =
    typeof target === 'string'
      ? document.querySelector(target)?.offsetTop || 0
      : target;
  const distance = end - start;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
