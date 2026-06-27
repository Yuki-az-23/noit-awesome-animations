# CSS & JS Animations Library

![Made By](https://img.shields.io/badge/Made%20By-YUKI--AZ--23-111111?style=for-the-badge)
![HTML CSS JS](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript-0ea5e9?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-16a34a?style=for-the-badge)
![Animations](https://img.shields.io/badge/Animations-70%2B-f97316?style=for-the-badge)

An awesome collection of modern animation experiments built with pure HTML, CSS, and JavaScript.

Created by **YUKI-AZ-23**.

Inspired by the visual craft seen on Awwwards and made for fast remixing, learning, and AI-assisted prototyping.

## Why This Project

- 70+ ready-to-run animation demos
- No framework lock-in
- No build setup required
- Clean category-based structure
- Great for UI inspiration and rapid AI code generation

## Quick Start

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Browse categories and launch any demo.
4. Copy the animation you like and adapt it.

## Preview Gallery

Add your demo GIFs to an `assets/previews/` folder, then place them here.

```html
<p align="center">
	<img src="assets/previews/scroll-reveal.gif" width="30%" alt="Scroll reveal preview" />
	<img src="assets/previews/card-hover-3d.gif" width="30%" alt="3D card hover preview" />
	<img src="assets/previews/hero-cinematic.gif" width="30%" alt="Hero cinematic preview" />
</p>

<p align="center">
	<img src="assets/previews/morphing-mask-slider.gif" width="30%" alt="Morphing slider preview" />
	<img src="assets/previews/cursor-trail.gif" width="30%" alt="Cursor trail preview" />
	<img src="assets/previews/bouncing-line-animation.gif" width="30%" alt="SVG line preview" />
</p>
```

Tip: keep each GIF under 4 MB for fast loading on GitHub.

## Top 10 Animations To Start With

1. `01-scroll-animations/scroll-reveal.html`
2. `01-scroll-animations/scroll-parallax.html`
3. `02-hover-animations/card-hover-3d.html`
4. `03-text-animations/text-morphing.html`
5. `04-transitions-page/welcome-transition.html`
6. `06-gradient-background/3d-gradient-background.html`
7. `08-hero-animations/hero-cinematic.html`
8. `10-slider-gallery/3d-carousel.html`
9. `11-cursor-interactions/cursor-trail.html`
10. `14-svg-animations/animated-shape-transition.html`

## Project Structure

```text
css-js-animations-library/
├── index.html
├── 01-scroll-animations/
├── 02-hover-animations/
├── 03-text-animations/
├── 04-transitions-page/
├── 05-morphing-shape/
├── 06-gradient-background/
├── 07-menu-navigation/
├── 08-hero-animations/
├── 09-loader-preloader/
├── 10-slider-gallery/
├── 11-cursor-interactions/
├── 12-3d-effects/
├── 13-micro-interactions/
├── 14-svg-animations/
└── assets/
```

## Categories

- Scroll animations
- Hover interactions
- Text motion and typography
- Page and shape transitions
- Morphing and masking
- Gradient and atmospheric backgrounds
- Menu/navigation effects
- Hero section animations
- Loaders and preloaders
- Sliders and galleries
- Cursor interactions
- 3D interface effects
- Micro-interactions
- SVG animation systems

## AI-Friendly Usage

This library is designed to work great with AI coding tools.

Use cases:
- Generate variations of an existing animation
- Merge two effects into one component
- Convert a demo into React/Vue/Svelte
- Add accessibility and reduced-motion fallbacks
- Optimize performance for mobile

Example prompt for AI:

```text
Take 02-hover-animations/card-hover-3d.html and convert it into a reusable React component.
Keep the same visual style, add props for intensity and speed, and support prefers-reduced-motion.
```

Another prompt:

```text
Create a new hero animation by combining the reveal style from 08-hero-animations/hero-reveal-split.html
with the cursor response from 11-cursor-interactions/hero-font-cursor.html.
Output a single standalone HTML file with comments.
```

## Agent-Ready Endpoints

This project now includes an AI/agent discovery baseline:

- `robots.txt` with explicit crawler policy and `Content-Signal`
- `/.well-known/api-catalog` (RFC 9727 style linkset)
- `/.well-known/openid-configuration`
- `/.well-known/oauth-authorization-server`
- `/.well-known/oauth-protected-resource`
- `/.well-known/mcp/server-card.json`
- `/.well-known/agent-skills/index.json`
- `/.well-known/acp.json`
- `/openapi.json` with `x-payment-info` examples for MPP-style discovery
- `/auth.md` (Markdown auth guidance)
- `/index.md` (Markdown homepage for agent readers)
- `/_headers` with Link response headers for discovery relations

Deployment note:
- DNS-AID must be configured at your DNS provider. See `DNS-AID-RECORDS.md`.
- Optional Cloudflare Worker implementation for Accept-based markdown negotiation and Link headers is included at `workers/agent-ready-worker.js`.

Primary site:
- https://noit2.com/

## Customization Tips

- Use CSS variables for colors and motion timing.
- Keep animation durations between `250ms` and `1200ms` for UI comfort.
- Prefer `transform` and `opacity` for smooth GPU-accelerated performance.
- Add `will-change` only where necessary.
- Include `@media (prefers-reduced-motion: reduce)` in production UIs.

## Suggested Workflow

1. Pick a demo folder.
2. Duplicate one HTML file.
3. Rename it to your variant.
4. Tune easing, speed, and layering.
5. Reuse shared utilities from `assets/` when needed.

## Credits

- Creator: **YUKI-AZ-23**
- Visual inspiration: [Awwwards CSS & JS Animations Collection](https://www.awwwards.com/awwwards/collections/css-js-animations/)

## License

MIT License. Free for personal and commercial projects.