# CSS & JS Animations Library

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