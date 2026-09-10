/**
 * redbird — Custom cursor effects
 *
 * Usage:
 *   import { customCursor } from 'redbird';
 *   const cursor = customCursor({ ringSelector: '#cursorRing', dotSelector: '#cursorDot' });
 *   cursor.destroy(); // cleanup
 */

/**
 * Smooth dual-layer custom cursor with hover and click states.
 *
 * @param {object} [options]
 * @param {string} [options.ringSelector='#cursorRing']
 * @param {string} [options.dotSelector='#cursorDot']
 * @param {string} [options.interactiveSelector='a, button, [data-cursor-hover]']
 * @param {number} [options.ringLerp=0.12]   easing factor for the ring
 * @param {number} [options.dotLerp=0.5]     easing factor for the dot
 * @returns {{ destroy: Function }}
 */
export function customCursor(options = {}) {
  const {
    ringSelector = '#cursorRing',
    dotSelector = '#cursorDot',
    interactiveSelector = 'a, button, [data-cursor-hover]',
    ringLerp = 0.12,
    dotLerp = 0.5
  } = options;

  const ring = document.querySelector(ringSelector);
  const dot = document.querySelector(dotSelector);
  if (!ring && !dot) return { destroy: () => {} };

  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let dotX = -200, dotY = -200;
  let raf;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onMouseDown() {
    ring && ring.classList.add('clicking');
  }

  function onMouseUp() {
    ring && ring.classList.remove('clicking');
  }

  const interactives = document.querySelectorAll(interactiveSelector);
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring && ring.classList.add('hovering');
      dot && dot.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      ring && ring.classList.remove('hovering');
      dot && dot.classList.remove('hovering');
    });
  });

  function loop() {
    ringX += (mouseX - ringX) * ringLerp;
    ringY += (mouseY - ringY) * ringLerp;
    dotX += (mouseX - dotX) * dotLerp;
    dotY += (mouseY - dotY) * dotLerp;

    if (ring) {
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
    }
    if (dot) {
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';
    }
    raf = requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  raf = requestAnimationFrame(loop);

  return {
    destroy() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
    }
  };
}
