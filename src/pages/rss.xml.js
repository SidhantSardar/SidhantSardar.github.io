import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Published writing only. Drafts join the feed when their `draft: true` is removed.
export async function GET(context) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Sidhant Sardar · Writing',
    description: 'Notes on Figma, Webflow and learning to code as a designer.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/writing/${p.id}/`,
    })),
    customData: '<language>en</language>',
  });
}
