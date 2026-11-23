# Lighthouse baseline — November 2026

**Measured:** 22 Nov 2026 · Lighthouse 12.8.2 · mobile form factor (default throttling) · headless Chrome on a Mac
**What was measured:** the production build (`npm run build` → `astro preview`) served from `localhost:4330`, on branch `practice/p0-site-fixes`.
Live-site scores are in the next section.

## Live site (www.sidhantsardar.com)

**Measured:** 23 Nov 2026 · Lighthouse 12.8.2 · mobile · headless Chrome on a Mac, over a home connection · commit `b01ce88` on GitHub Pages.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home `/` | 96 | 100 | 100 | 100 | 1.9 s | 0 | 50 ms |
| Work index `/work/` | 93 | 100 | 100 | 100 | 3.1 s | 0 | 40 ms |
| Portfolio `/portfolio/` | 100 | 100 | 100 | 100 | 1.5 s | 0 | 30 ms |
| Case study `/work/aligne-ai/` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms |

`/work/`: the largest element was the first card image, which was lazy-loaded (60% of LCP was its download).
The first card now loads eagerly with `fetchpriority="high"`. Re-measure after that change is deployed.

## Structured data check

**Checked:** 22 Nov 2026 on the live home page.
- Google Rich Results Test: crawled successfully, "No items detected". Expected: `Person`, `WebSite` and `CreativeWork` are not Google rich-result types.
- Schema.org validator: `WebSite` with nested `Person` (publisher), **0 errors, 0 warnings**.

## Local build scores (after the P0 fixes)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| Home `/` | 99 | 100 | 100 | 100 | 2.1 s | 0 | 60 ms | 1.4 s |
| Work index `/work/` | 98 | 100 | 100 | 100 | 2.2 s | 0 | 80 ms | 1.4 s |
| Portfolio `/portfolio/` | 100 | 100 | 100 | 100 | 1.7 s | 0 | 40 ms | 1.4 s |
| Case study `/work/aligne-ai/` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 80 ms | 1.4 s |

## What changed the home page score

First run on the same day, before self-hosting fonts:

| Page | Performance | LCP | FCP |
|---|---|---|---|
| Home `/` | 84 | 3.8 s | 2.6 s |

Lighthouse flagged the Google Fonts stylesheet as render-blocking (est. 1.3 s). Geist and Geist Mono are now
self-hosted through `@fontsource-variable`, and the Latin Geist file is preloaded. Home went from 84 → 99.

## Accessibility check (axe-core 4.10.2)

16 pages × 2 themes (light, dark), rules: WCAG 2.0/2.1/2.2 A + AA and best practice.
Result after fixes: **0 violations.**

Fixed along the way:

| Issue | Before | After |
|---|---|---|
| `--dim` text, light theme | #7A7A7A on #FFF = 4.29:1 | #6B6B6B = 5.33:1 |
| `--dim` text, dark theme | #6B6B6B on #000 = 3.94:1 | #8A8A8A = 6.08:1 |
| Mock-up grey text | #6B7280 on #F5F6F8 = 4.47:1 | #636A77 = 5.03:1 |
| "Low" chip text | #15803D on #E5F6EC = 4.47:1 | #166534 = 6.36:1 |
| Mock-up sidebars read as page landmarks | `<aside>` | `<div>` |
| Writing list headings skipped a level | h1 → h3 | h1 → h2 |

## Keyboard check

- Tab from the top of the page: first stop is **Skip to content**, visible on focus; Enter moves focus to `<main>`.
- Theme switch toggles with Space and updates `aria-pressed`.
- Grid toggle toggles with Enter and updates `aria-pressed`.
- Copy email button is reachable and works with Enter.
