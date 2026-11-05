# sidhantsardar.com

Portfolio of Sidhant Sardar — websites designed in Figma and built in Webflow or code.

Designed in Figma, built with Claude Code and [Astro](https://astro.build).

## Run locally

```bash
npm install
npm run dev
```

## Content

- `src/content/portfolio/` — UX case studies (MDX)
- `src/content/work/` — website case studies (`stack` sets the label, default Webflow)
- `src/content/writing/` — blog posts

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages at
[www.sidhantsardar.com](https://www.sidhantsardar.com) (see `.github/workflows/deploy.yml`).
The previous Webflow export is kept on the `webflow-site-backup` branch.
