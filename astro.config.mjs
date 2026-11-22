import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Placeholder guard: after every build, warn loudly if a published page still shows "{{TODO".
const todoGuard = {
  name: 'todo-guard',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const files = (await readdir(root, { recursive: true })).filter((f) => f.endsWith('.html'));
      const hits = [];
      for (const f of files) {
        const html = await readFile(path.join(root, f), 'utf8');
        if (html.includes('{{TODO') && !html.includes('<meta name="robots" content="noindex">')) hits.push(f);
      }
      if (hits.length) logger.warn(`{{TODO}} placeholder on ${hits.length} published page(s):\n  ` + hits.join('\n  '));
      else logger.info('No {{TODO}} placeholders on published pages.');
    },
  },
};

// Writing posts that are still drafts. Keep them out of the sitemap until they're published;
// when you publish one, remove its slug from this list.
const DRAFT_POSTS = ['handoff-files', 'plan-cms-collections', 'webflow-designer-week-one-claude-code'];

export default defineConfig({
  site: 'https://www.sidhantsardar.com',
  integrations: [
    mdx(),
    todoGuard,
    sitemap({
      filter: (page) => !DRAFT_POSTS.some((slug) => page.includes(`/writing/${slug}/`)),
    }),
  ],
});
