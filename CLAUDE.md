# PolicyCover Website — Claude Context

## Project Overview

PolicyCover is a professional insurance services website for an Canadian insurance brokerage. It is a **zero-dependency static site** built with vanilla HTML5, CSS3, and JavaScript (ES6+), deployed on **Cloudflare Pages**.

## Core Files

| File | Purpose |
|------|---------|
| `index.html` | Main single-page site (~112 KB) — all sections live here |
| `styles.css` | All styling (~55 KB) — CSS variables, layout, responsive breakpoints |
| `script.js` | All interactivity (~34 KB) — form handling, animations, validation |
| `privacy-policy.html` | Standalone privacy policy page |
| `terms-of-service.html` | Standalone terms of service page |
| `setup-sheet-headers.gs` | Google Apps Script for Google Sheets form integration |
| `_headers` | Cloudflare Pages cache/security headers |
| `_redirects` | Cloudflare Pages redirect rules |
| `favicon.svg` | Brand favicon |

## Architecture

- **No build system** — edit files directly, no compilation step
- **No npm packages** — zero runtime dependencies
- **Dev server**: `npm run dev` (runs `python3 -m http.server 8000`) → http://localhost:8000
- **Deployed to**: Cloudflare Pages (auto-deploys from GitHub `main` branch)
- **Assets**: `assets/images/products/` and `assets/images/partners/`

## Sections in index.html

1. Hero — CTA buttons
2. About Us — mission, values
3. Services — 6 insurance product cards (Auto, Home, Life, Business, Travel, Health & Dental)
4. Why Choose Us — differentiators
5. Testimonials — client reviews
6. Contact — form with validation + business info
7. Footer — links

## Design System (CSS Variables in styles.css)

```css
--primary-color: #00D4AA;     /* Teal — main brand colour */
--primary-dark: #00B890;      /* Hover states */
--primary-light: #E6F9F5;     /* Light background tint */
--secondary-color: #1F2937;   /* Dark navy */
--text-dark: #1F2937;
--text-light: #6B7280;
```

Font: **Inter** (Google Fonts)

## Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px–1023px
- Mobile: < 768px

## Form Handling

The contact/quote form in `script.js` posts to a **webhook endpoint** (integrated as of commit `7a50323`). The Google Apps Script (`setup-sheet-headers.gs`) manages Google Sheets headers for form data logging.

## Important Conventions

- All styling uses the CSS variables above — do not hardcode brand colours
- JavaScript is plain ES6+ — no TypeScript, no bundler, no transpilation
- Images are SVG inline or in `assets/images/` — keep assets lightweight
- Cloudflare Pages-specific config lives in `_headers` and `_redirects` at root
- The site is Australian-market insurance — use AU English (e.g. "colour", "analyse") for any copy changes

## What NOT to do

- Do not introduce npm packages, build tools, or frameworks unless explicitly asked
- Do not add a backend — this is intentionally a static site
- Do not change the CSS variable names without updating all usages
