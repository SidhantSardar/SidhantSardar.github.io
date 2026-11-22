import type { ImageMetadata } from 'astro';

// On-page images go through astro:assets (resized, WebP/AVIF, width + height set).
// Files in src/assets/ are looked up by their public-style path, e.g. '/sites/aligne.jpg'.
// The copies in public/ stay only for share previews (og:image needs a stable URL).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,jpeg,png,webp}', { eager: true });

export function asset(publicPath: string): ImageMetadata {
  const hit = files[`../assets${publicPath}`];
  if (!hit) throw new Error(`No optimised copy of ${publicPath} in src/assets/`);
  return hit.default;
}
