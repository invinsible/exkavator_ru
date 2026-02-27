# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Экскаватор.ру — equipment rental/trading marketplace. Static multi-page site built with vanilla JavaScript, SCSS, and Gulp. Content and comments are in Russian.

## Commands

- `npm run dev` — clean build + BrowserSync dev server on port 3000 with file watching
- `npm run build` — clean production build to `dist/`

No test or lint tooling is configured.

## Architecture

**Source** lives in `src/`, **built output** in `dist/`. Gulp handles the pipeline:
- SCSS → autoprefixed, minified CSS (`dist/css/main.css`)
- JS files concatenated and minified via Terser (`dist/js/main.min.js`)
- Images optimized with imagemin, fonts and vendors copied as-is

**Pages**: `src/html/` contains static HTML pages (`index.html`, `trade.html`, `trade-result.html`, `rent.html`). No client-side routing.

**JavaScript**: Vanilla JS in `src/js/`. Key files:
- `main.js` — dropdown handlers, Swiper slider init
- `mobile-menu.js` — burger menu toggle

## SCSS Structure

Entry point: `src/scss/main.scss`. Components organized under `src/scss/components/`:
- `global/` — reusable components (buttons, fields, dropdowns, chips)
- `header/` — header and navigation
- `sections/` — page-specific sections

### Design Tokens

CSS custom properties defined in `_variables.scss`: colors (neutral, primary, yellow, red, green palettes), spacing scale (`--spacing-2` through `--spacing-32`), typography, and semantic aliases (`--text-base`, `--field-disabled-bg`, etc.).

### Breakpoints (SCSS variables, not CSS custom properties)

```scss
$breakpoint-xxs: 340px;
$breakpoint-xs: 480px;
$breakpoint-sm: 768px;
$breakpoint-md: 1024px;
$breakpoint-lg: 1280px;
```

### Mixins (`_mixins.scss`)

- `@include text-size('base')` — applies font-size + line-height from the `$font-sizes` map
- `@include text-weight('bold')` — applies font-weight from the `$font-weights` map
- `@include mask-icon($icon)` — applies a base64 SVG as a CSS mask

Utility classes (`.text-sm`, `.fw-bold`, etc.) are auto-generated from these maps.

## Conventions

- **BEM-like naming**: `.component__element--modifier` (e.g., `.button--primary-alt`, `.field-dropdown__selected`)
- **State classes**: `.is-open`, `.is-active`, `.selected` toggled via JS
- **Font**: Montserrat (WOFF2), loaded from `src/fonts/`
- **Icons**: SVG sprites in `src/img/sprites/`, referenced via `<use>`. Base64 SVGs used in CSS via `mask-icon` mixin
