// Tool names and the logo each one gets (a key of data/icons.ts).
// components/ToolText.astro uses this to put a logo in front of a tool's name wherever a short label
// mentions it: tags, card labels, "built with" lines. Longer names come first, so "Figma Make" is
// found before "Figma".
export const toolLogo: [name: string, icon: string][] = [
  ['Figma Make', 'make'],
  ['FigJam', 'figjam'],
  ['Figma', 'figma'],
  ['Webflow', 'webflow'],
  ['Claude Code', 'claude'],
  ['Claude', 'claude'],
  ['GSAP', 'gsap'],
  ['Spline', 'spline'],
  ['Zapier', 'zapier'],
  ['Notion', 'notion'],
  ['Google Analytics 4', 'ga4'],
  ['Google Analytics', 'ga4'],
  ['GA4', 'ga4'],
  ['Search Console', 'gsc'],
  ['Power BI', 'powerbi'],
  ['Astro', 'astro'],
  ['Cloudflare', 'cloudflare'],
  ['GTM', 'gtm'],
  ['HTML', 'html5'],
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = new RegExp(`(?<![A-Za-z0-9])(${toolLogo.map(([n]) => escape(n)).join('|')})(?![A-Za-z0-9])`, 'g');
const byName = new Map(toolLogo);

/** "Website · Webflow → Claude Code" → [{ text: 'Website · ' }, { text: 'Webflow', icon: 'webflow' }, …] */
export function splitTools(text: string): { text: string; icon?: string }[] {
  const out: { text: string; icon?: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ text: text.slice(last, at) });
    out.push({ text: m[0], icon: byName.get(m[0]) });
    last = at + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}
