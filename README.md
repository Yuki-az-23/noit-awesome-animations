# redbird — CSS & JS Animations Library

Lightweight, zero-dependency animation utilities **and** a collection of 70+ HTML/CSS/JS demos.

- 70+ demos across 14 categories
- Published as the **`redbird`** npm package
- Full tree-shaking support (ESM + CJS + UMD)
- No external dependencies

Created by YUKI-AZ-23.

## Install

```bash
npm install redbird
```

## Usage

### ES Modules (tree-shakeable)

```js
import { ScrollAnimator, tilt, typewriter, customCursor, MathUtils } from 'redbird';

// Scroll-triggered reveal
ScrollAnimator.init('[data-scroll]');

// 3-D tilt cards
const cleanup = tilt('[data-tilt]', { maxTilt: 12 });
// cleanup.destroy() to remove listeners

// Typewriter text
typewriter('#hero-title', 'Hello, World!', { speed: 50 });

// Custom cursor
const cursor = customCursor({ ringSelector: '#ring', dotSelector: '#dot' });
```

### Sub-path imports (import only what you need)

```js
import { ScrollAnimator, scrollParallaxVar } from 'redbird/scroll';
import { tilt, magneticHover }               from 'redbird/hover';
import { customCursor }                      from 'redbird/cursor';
import { typewriter, splitText, countUp }    from 'redbird/text';
import { MathUtils, debounce, rafThrottle }  from 'redbird/utils';
```

### CDN / `<script>` tag (UMD)

```html
<script src="https://unpkg.com/redbird/dist/redbird.umd.min.js"></script>
<script>
  Redbird.ScrollAnimator.init('[data-scroll]');
</script>
```

## API Reference

| Export | Module | Description |
|---|---|---|
| `ScrollAnimator` | `redbird/scroll` | IntersectionObserver-based scroll reveal |
| `scrollParallaxVar` | `redbird/scroll` | Drive a CSS custom property from scroll progress |
| `tilt` | `redbird/hover` | 3-D tilt effect on mouse-move |
| `magneticHover` | `redbird/hover` | Elements translate toward the cursor |
| `customCursor` | `redbird/cursor` | Smooth dual-layer custom cursor |
| `typewriter` | `redbird/text` | Type text one character at a time |
| `splitText` | `redbird/text` | Wrap each character in a `<span>` for per-letter animation |
| `countUp` | `redbird/text` | Animate a number from A to B |
| `MathUtils` | `redbird/utils` | `lerp`, `clamp`, `map`, `scrollProgress` |
| `smoothScrollTo` | `redbird/utils` | Smooth-scroll to element or Y position |
| `rafThrottle` | `redbird/utils` | Wrap a function in `requestAnimationFrame` |
| `debounce` | `redbird/utils` | Standard debounce helper |
| `setCSSVar` | `redbird/utils` | `el.style.setProperty` shorthand |
| `ready` | `redbird/utils` | Run callback when DOM is ready |

## Build from Source

```bash
npm install
npm run build      # outputs to dist/
npm run build:watch
```

## Quick Start

1. Clone this repository.
2. Open index.html in your browser.
3. Pick a demo and copy what you need.

## Use With AI Agents

This repo supports direct agent usage.

Option:

```text
mode: code-reference
```

In this mode, the agent should treat this repository as a reusable library and implementation reference.
It should adapt the closest existing demo instead of generating from zero.

Reference file:

- .well-known/agent-skills/code-reference-mode.md

Example prompt:

```text
Use this repository in code-reference mode.
Take 02-hover-animations/card-hover-3d.html and implement a reusable React component.
Keep the visual style and add prefers-reduced-motion support.
```

## Project Layout

- index.html
- 01-scroll-animations/
- 02-hover-animations/
- 03-text-animations/
- 04-transitions-page/
- 05-morphing-shape/
- 06-gradient-background/
- 07-menu-navigation/
- 08-hero-animations/
- 09-loader-preloader/
- 10-slider-gallery/
- 11-cursor-interactions/
- 12-3d-effects/
- 13-micro-interactions/
- 14-svg-animations/
- assets/

## Agent Discovery Endpoints

- /.well-known/agent-skills/index.json
- /.well-known/mcp/server-card.json
- /.well-known/api-catalog
- /.well-known/openid-configuration
- /.well-known/oauth-authorization-server
- /.well-known/oauth-protected-resource
- /.well-known/acp.json
- /openapi.json
- /auth.md
- /index.md
- /robots.txt
- /_headers

## Validate Agent Setup

```bash
bash scripts/validate-agent-ready.sh https://noit2.com
```

## License

MIT