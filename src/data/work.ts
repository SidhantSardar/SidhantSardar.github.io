// "Work" = what I built: the product first, then the websites.
// Case studies (the detailed design decisions) live separately, on /portfolio/ and inside each project.
// The home page and /work/ both read this list, so they always match.

export interface WorkLink { text: string; href: string; external?: boolean }
export interface WorkItem {
  /** Main page for the card: the whole card opens it. */
  href: string;
  kind: 'Product design' | 'Website';
  label: string;
  title: string;
  line: string;
  tags: string[];
  cover?: string;
  /** Show the 8-step process strip instead of a screenshot. */
  process?: boolean;
  links: WorkLink[];
}

export const work: WorkItem[] = [
  {
    href: '/work/altrum-product-design/',
    kind: 'Product design',
    label: 'Product design · Client project',
    title: 'Altrum AI web app',
    line: 'Designing an AI governance product, end to end: domain, colours, layouts, user flows, every screen, Figma Make prototypes, build follow-up and testing.',
    tags: ['Product design', 'Figma', 'Figma Make', 'UX'],
    process: true,
    links: [
      { text: 'See the process', href: '/work/altrum-product-design/' },
      { text: 'UX case studies', href: '/portfolio/' },
    ],
  },
  {
    href: '/work/aligne-ai/',
    kind: 'Website',
    label: 'Website · Webflow → Claude Code',
    title: 'Aligne AI',
    line: 'Altrum AI and Aligne AI began as two separate websites I designed and built in Webflow. When Altrum became part of Aligne, I merged them into one site, built completely in code with Claude Code.',
    tags: ['Webflow', 'Claude Code', 'Astro', 'CMS'],
    cover: '/sites/aligne.jpg',
    links: [
      { text: 'How I built it', href: '/work/aligne-ai/' },
      { text: 'Visit site', href: 'https://www.aligne.ai/', external: true },
    ],
  },
  {
    href: '/work/world-of-gears/',
    kind: 'Website',
    label: 'Website · Webflow',
    title: 'World of Gears',
    line: 'A complete Webflow website I designed and built for a sustainability consultancy in 17 countries: service pages, a Sustainability Toolbox and CMS collections.',
    tags: ['Webflow', 'CMS', 'Figma'],
    cover: '/sites/wog.jpg',
    links: [
      { text: 'How I built it', href: '/work/world-of-gears/' },
      { text: 'Visit site', href: 'https://www.worldofgears.com/', external: true },
    ],
  },
];

/** Smaller builds, listed on /work/ without a case study. */
export const alsoBuilt = [
  { name: 'sidhantsardar.com', type: 'This portfolio', role: 'Designed in Figma, built with Claude Code and Astro, measured with GA4', url: 'https://www.sidhantsardar.com/' },
  { name: 'Prabuddha Pathak', type: 'Digital archive of Dr. B. R. Ambedkar’s works', role: 'Designed and developed in custom code', url: 'https://prabuddhapathak.com/' },
];
