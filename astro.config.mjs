import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Writing posts that are still drafts. Keep them out of the sitemap until they're published;
// when you publish one, remove its slug from this list.
const DRAFT_POSTS = ['handoff-files', 'plan-cms-collections', 'webflow-designer-week-one-claude-code'];

export default defineConfig({
  site: 'https://www.sidhantsardar.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !DRAFT_POSTS.some((slug) => page.includes(`/writing/${slug}/`)),
    }),
  ],
});
