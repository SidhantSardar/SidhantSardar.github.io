// One source for the resume: the web page (src/pages/resume.astro), the PDF and the Word file
// (scripts/resume-files.mjs) all read from here. Edit text here, then run `npm run resume:files`.

export const tagline = 'UI/UX Designer · Webflow Developer · Claude Code · GA4';
export const headline = ['Product and web designer', 'who builds and measures.'];
export const profile = 'UI/UX designer with 3.5+ years of remote experience designing clean, user-friendly digital products. I own the full workflow (user flows, wireframes, prototypes and high-fidelity Figma UI), ship it myself through Webflow and Claude Code, and connect it to Google Analytics so every page is measured on conversions, not looks. Currently designing the product UI and web experience for an enterprise SaaS platform serving Tier-1 banks.';
export const education = { title: 'Graduation', org: 'Nagpur University', year: '2015' };

export const skills = [
  { k: 'UX', v: ['Human-centred design', 'User flows', 'Page structure', 'Wireframing', 'Prototyping', 'Usability testing', 'Accessibility'] },
  { k: 'UI & visual', v: ['Visual hierarchy', 'Typography', 'Colour', 'Layout grids', 'Responsive & mobile-first', 'Conversion-focused layouts'] },
  { k: 'Design systems', v: ['Component libraries', 'Design tokens', 'Type & colour scales', '8pt spacing', 'Atomic design', 'Documentation'] },
  { k: 'Analytics & conversion', v: ['Google Analytics 4', 'Key events & conversion tracking', 'Search Console', 'Funnel analysis', 'Power BI', 'SQL'] },
  { k: 'Tools & build', v: ['Figma (expert)', 'FigJam', 'Figma Make', 'Webflow (CMS, interactions)', 'Claude Code', 'HTML / CSS', 'Notion'] },
];

// Experience, newest first. Duration is worked out at build time, so it stays current.
export const jobs = [
  {
    role: 'UI/UX Designer & Webflow Developer',
    org: 'Aligne AI (Aligne Technologies Ltd)',
    note: 'Responsible AI governance for 50+ enterprises, including HSBC, MUFG, Vodafone, BP, Moody’s and Infosys',
    start: '2023-05',
    end: null,
    where: 'Remote',
    groups: [
      { k: 'Web app', points: [
        'Designed the Altrum AI web application end to end in Figma: dashboards, policy management, audit logs and incident detection.',
        'Own the full process: user flows, page structure, wireframes, prototypes and final UI.',
        'Test the web app end to end: explore every flow, note issues and observations, and turn them into product improvements.',
      ] },
      { k: 'Websites', points: [
        'Designed and built two full CMS websites in Webflow: first altrum.ai, then aligne.ai.',
        'When Altrum became part of Aligne, merged both into one site and rebuilt aligne.ai in code with Claude Code.',
        'Built a shared Figma component library (80+ components) used across both brands.',
      ] },
      { k: 'Analytics', points: [
        'Set up Google Analytics on both websites: tracking visitors and key events to see which pages bring enquiries.',
        'Used that data to improve pages for conversion with executive buyers.',
      ] },
    ],
  },
  {
    role: 'Power BI Developer',
    org: 'Nimbja Security Solutions',
    note: 'Full-time',
    start: '2019-11',
    end: '2023-01',
    where: 'Pune',
    groups: [
      { k: '', points: [
        'Built Power BI dashboards from multiple data sources.',
        'Data modelling and SQL: tabular models, relationships, query tuning.',
        'Turned business needs into technical specs and clear visuals.',
      ] },
    ],
  },
];

export const fmt = (ym) => new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
export const span = (start, end) => {
  const [sy, sm] = start.split('-').map(Number);
  const e = end ? end.split('-').map(Number) : [new Date().getUTCFullYear(), new Date().getUTCMonth() + 1];
  const months = (e[0] - sy) * 12 + (e[1] - sm) + 1;
  const y = Math.floor(months / 12), m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
};

export const projects = [
  { name: 'sidhantsardar.com', type: 'Portfolio, designed, built and measured', role: 'Figma · Claude Code + Astro · GA4', body: 'Designed in Figma, built in code with Claude Code. GA4 tracks every enquiry click as a key event, linked to Search Console to see which searches bring visitors.', url: 'https://www.sidhantsardar.com' },
  { name: 'Prabuddha Pathak', type: 'Digital archive of Dr. B. R. Ambedkar’s works', role: 'Designer & developer · custom code', body: 'A free, searchable library of Dr. B. R. Ambedkar’s writings and speeches: 17 volumes, speeches, videos, the Constitution, 141 people profiles and an “Ask the archive” search.', url: 'https://prabuddhapathak.com' },
  { name: 'Altrum AI web app', type: 'Enterprise AI governance platform', role: 'Product designer · Figma', body: 'End-to-end UI for policy enforcement, audit logging, no-code governance and incident detection.' },
  { name: 'Aligne AI', type: 'Responsible AI consulting & platform', role: 'Webflow CMS → rebuilt in code', body: 'Designed and built as a full Webflow CMS site, with altrum.ai alongside it. Now one site, rebuilt in code with Claude Code, with GA4 tracking.', url: 'https://aligne.ai' },
  { name: 'World of Gears', type: 'Sustainability consultancy', role: 'Web designer', body: 'A clean, editorial website for a supply-chain consultancy, with CMS structures for case studies and insights.' },
];

export const brings = [
  'Human-centred problem solver: designs from real use cases outward, with care for every state and interaction.',
  'Strong visual foundation: typography, colour, grids and hierarchy.',
  'Systems mindset: reusable components and guidelines, not one-off screens.',
  'Conversion focus: design, build and measure in one loop, using GA4 data to decide what to improve.',
  'Reliable remote partner: 3.5+ years managing multiple projects with clear written communication, using modern Figma and AI-assisted tooling.',
];
