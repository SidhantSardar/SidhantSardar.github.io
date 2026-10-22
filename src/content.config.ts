import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Website case studies (Webflow)
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    order: z.number(),
    url: z.string().url().optional(),
    snapshot: z.array(z.object({ label: z.string(), value: z.string() })),
    structure: z.array(z.object({ name: z.string(), detail: z.string() })).optional(),
    structureTitle: z.string().optional(),
    structureNote: z.string().optional(),
  }).passthrough(),
});

// UX macro case studies from the web app (Figma)
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    problem: z.string(),
    solution: z.string(),
    order: z.number(),
    mini: z.enum([
      'onboarding', 'registry', 'chat', 'summary', 'detail', 'review',
      'config-guided', 'config-independent', 'dashboard', 'home-before', 'home-after', 'system', 'form',
    ]),
    snapshot: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: z.enum(['Figma', 'Webflow', 'Code']),
    date: z.coerce.date(),
    minutes: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, portfolio, writing };
