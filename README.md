# CSS and JS Animations Library

Collection of HTML, CSS, and JavaScript animation demos.

- 70+ demos
- 14 categories
- No build setup
- Easy to copy and adapt

Created by YUKI-AZ-23.

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