/**
 * redbird — Hover / tilt animations
 *
 * Usage:
 *   import { tilt, magneticHover } from 'redbird';
 *   tilt('[data-tilt]');
 */

const DEFAULTS_TILT = {
  maxTilt: 15,
  perspective: 1000,
  glare: true,
  scale: 1.04,
  easeOut: 'cubic-bezier(.03,.98,.52,.99)',
  resetDuration: 500
};

/**
 * Attach a 3-D tilt effect to matching elements.
 *
 * @param {string|Element|NodeList} target  selector, Element, or NodeList
 * @param {object} [options]
 * @returns {{ destroy: Function }}
 */
export function tilt(target = '[data-tilt]', options = {}) {
  const opts = { ...DEFAULTS_TILT, ...options };
  const elements = resolve(target);
  const listeners = [];

  elements.forEach((card) => {
    const glareEl = card.querySelector('.glare');

    function onMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x - rect.width / 2) / (rect.width / 2);
      const normY = (y - rect.height / 2) / (rect.height / 2);
      const tiltX = -normY * opts.maxTilt;
      const tiltY = normX * opts.maxTilt;
      card.style.transform = `perspective(${opts.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${opts.scale},${opts.scale},${opts.scale})`;
      if (opts.glare && glareEl) {
        glareEl.style.setProperty('--glare-x', ((x / rect.width) * 100).toFixed(1) + '%');
        glareEl.style.setProperty('--glare-y', ((y / rect.height) * 100).toFixed(1) + '%');
      }
    }

    function onEnter() {
      card.style.transition = 'transform 0.08s ease-out';
      if (opts.glare && glareEl) glareEl.style.transition = 'opacity 0.25s ease';
    }

    function onLeave() {
      card.style.transition = `transform ${opts.resetDuration}ms ${opts.easeOut}, box-shadow ${opts.resetDuration}ms ease`;
      card.style.transform = `perspective(${opts.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
      if (opts.glare && glareEl) {
        glareEl.style.transition = 'opacity 0.4s ease';
        glareEl.style.opacity = '0';
      }
    }

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    listeners.push({ card, onMove, onEnter, onLeave });
  });

  return {
    destroy() {
      listeners.forEach(({ card, onMove, onEnter, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
    }
  };
}

/**
 * Magnetic hover — elements subtly translate toward the cursor.
 *
 * @param {string|Element|NodeList} target
 * @param {object} [options]
 * @param {number} [options.strength=0.3]
 * @param {number} [options.radius=150]  activation radius in px
 * @returns {{ destroy: Function }}
 */
export function magneticHover(target = '[data-magnetic]', options = {}) {
  const { strength = 0.3, radius = 150 } = options;
  const elements = resolve(target);
  const listeners = [];

  elements.forEach((el) => {
    let raf;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = dist < radius ? (1 - dist / radius) * strength : 0;
      tx = dx * pull;
      ty = dy * pull;
    }

    function onLeave() {
      tx = 0;
      ty = 0;
    }

    function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    }

    function onEnter() {
      cancelAnimationFrame(raf);
      loop();
    }

    function onLeaveStop() {
      onLeave();
      // let the loop settle to zero then stop
      setTimeout(() => cancelAnimationFrame(raf), 600);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeaveStop);
    listeners.push({ el, onMove, onEnter, onLeaveStop, getRAF: () => raf });
  });

  return {
    destroy() {
      listeners.forEach(({ el, onMove, onEnter, onLeaveStop, getRAF }) => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeaveStop);
        cancelAnimationFrame(getRAF());
      });
    }
  };
}

// ── internal ─────────────────────────────────────────────────────────────────

function resolve(target) {
  if (typeof target === 'string') return Array.from(document.querySelectorAll(target));
  if (target instanceof Element) return [target];
  if (target instanceof NodeList || Array.isArray(target)) return Array.from(target);
  return [];
}
