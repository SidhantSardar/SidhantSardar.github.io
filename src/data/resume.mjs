// One source for the resume: the web page (src/pages/resume.astro), the PDF and the Word file
// (scripts/resume-files.mjs) all read from here. Edit text here, then run `npm run resume:files`.

export const tagline = 'UI/UX Designer · Webflow Developer · Claude Code · GA4';
// The headline: what I am, then what I also build. The web pages show the last part one word at a time
// (components/RoleTitle.astro); the PDF and Word files print the whole sentence.
export const builds = { lead: 'who also builds', words: ['websites', 'web applications', 'design systems'] };
export const headline = ['UX designer', `${builds.lead} ${builds.words.slice(0, -1).join(', ')} and ${builds.words.at(-1)}.`];
export const profile = 'User experience (UI/UX) designer with 3.5+ years of remote experience designing an AI-powered B2B SaaS platform end to end for enterprises and Tier-1 banks, making complex workflows simple and intuitive. I own the full process (user flows, wireframes, prototypes, dashboards and high-fidelity Figma UI on a shared design system) and work closely with product and development teams. I also design and build the marketing websites in Webflow and Claude Code, measured with Google Analytics.';
export const education = { title: 'Graduation', org: 'Nagpur University', year: '2015' };

export const skills = [
  { k: 'Product & UX', v: ['End-to-end product design', 'Human-centred design (HCD)', 'User flows', 'Wireframing', 'Prototyping', 'Dashboard design', 'Interaction logic', 'Complex workflows', 'Usability testing', 'Accessibility'] },
  { k: 'UI & visual', v: ['Visual direction', 'Colour palettes', 'Visual hierarchy', 'Typography', 'Layout grids', 'Responsive & mobile-first', 'Conversion-focused layouts'] },
  { k: 'Design systems', v: ['Component libraries', 'Design tokens', 'Type & colour scales', '8pt spacing', 'Atomic design', 'Documentation'] },
  { k: 'Analytics & conversion', v: ['Google Analytics 4', 'Key events & conversion tracking', 'Search Console', 'Funnel analysis', 'Power BI', 'SQL'] },
  { k: 'Tools & build', v: ['Figma (expert)', 'FigJam', 'Figma Make', 'Webflow (CMS, Interactions)', 'GSAP', 'Spline', 'Zapier automations', 'Claude Code', 'HTML / CSS', 'Notion'] },
  { k: 'Domain', v: ['AI governance', 'Enterprise B2B SaaS', 'Policies, risk, audits & incidents'] },
];

// Experience, newest first. **word** marks a skill: highlighted on the page and in the PDF, bold in Word.
export const jobs = [
  {
    role: 'UI/UX Designer & Webflow Developer',
    org: 'Aligne AI (Aligne Technologies Ltd)',
    note: 'Responsible AI governance for 50+ enterprises, including HSBC, MUFG, Vodafone, BP, Moody’s and Infosys',
    start: '2023-05',
    end: null,
    where: 'Remote',
    tools: ['Product design', 'Human-centred design', 'Figma', 'Design systems', 'Figma tokens', 'Prototyping', 'Dashboards', 'Webflow', 'CMS', 'Webflow Interactions', 'GSAP', 'Spline', 'Zapier', 'Claude Code', 'Google Analytics (GA4)', 'AI governance'],
    groups: [
      { k: 'Product design · Altrum AI web app', points: [
        'Designed the **Altrum AI product end to end**: every screen and frame of the full web application in **Figma**, from first concept to the shipped app.',
        'Altrum AI is an **AI-powered B2B SaaS** platform used by enterprises and **Tier-1 banks** to govern their AI, so the product had to be clear, secure and trustworthy.',
        'Made complex AI governance workflows **simple, intuitive and easy to follow** for compliance, risk and technical users.',
        'Designed **data-rich dashboards** for policy enforcement, risk monitoring, audit logs and incident detection.',
        'Created **user flows**, **wireframes**, **prototypes** and **high-fidelity UI** for multi-step workflows, with **human-centred design** and care for every state.',
        'Defined how the product works: the **interaction logic** of every screen (what each button does and where it leads), and **validated user flows** with the team before build.',
        'Set the product’s **visual direction**: chose the **colour palette** and **accent colour**, **typography**, **layout** and **UI components**.',
        'Built and maintained a consistent **design system** in Figma: **80+ UI components** and **Figma tokens**, shared by the product and both websites.',
        'Worked with **product managers and developers** to turn requirements into designs and support developer handoff.',
        '**Tested the web app end to end**: explored every flow, noted usability issues and observations, and turned them into product improvements.',
      ] },
      { k: 'Websites', points: [
        'Designed and built two full **CMS websites** in **Webflow**: first altrum.ai, then aligne.ai.',
        'Added motion with **Webflow Interactions** and **GSAP**, and integrated 3D and animation from tools like **Spline**.',
        'Built **Zapier** workflows and automations that connect the websites with other tools.',
        'When Altrum became part of Aligne, merged both into one site and rebuilt aligne.ai **in code with Claude Code**.',
      ] },
      { k: 'Domain', points: [
        'Deep **AI governance** knowledge from designing the platform end to end: how policies, risk, audits and incident detection work together for enterprise teams.',
      ] },
      { k: 'Analytics', points: [
        'Set up **Google Analytics (GA4)** on both websites: tracking visitors and **key events** to see which pages bring enquiries.',
        'Used that data to improve pages for **conversion** with executive buyers.',
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
    tools: ['Power BI', 'SQL', 'Data modelling'],
    groups: [
      { k: '', points: [
        'Built **Power BI dashboards** from multiple data sources.',
        '**Data modelling** and **SQL**: tabular models, relationships, query tuning.',
        'Turned business needs into technical specs and clear visuals.',
      ] },
    ],
  },
];

/** "**word**" → [{ t: 'word', k: true }, …] so each output (web, PDF, Word) can style skills its own way. */
export const parts = (s) => s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((x) => (x.startsWith('**') ? { t: x.slice(2, -2), k: true } : { t: x, k: false }));
const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** HTML with skills wrapped in <mark class="kw">. */
export const kwHtml = (s) => parts(s).map((p) => (p.k ? `<mark class="kw">${escHtml(p.t)}</mark>` : escHtml(p.t))).join('');

export const fmt = (ym) => new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
export const span = (start, end) => {
  const [sy, sm] = start.split('-').map(Number);
  const e = end ? end.split('-').map(Number) : [new Date().getUTCFullYear(), new Date().getUTCMonth() + 1];
  const months = (e[0] - sy) * 12 + (e[1] - sm) + 1;
  const y = Math.floor(months / 12), m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
};

// Featured projects, in this order.
export const projects = [
  { featured: 'Featured · Product design', caseStudy: '/work/altrum-product-design/', name: 'Altrum AI web app', type: 'AI-powered B2B SaaS product', role: 'UX designer · Figma', body: 'Designed the full product end to end: every screen for policy enforcement, audit logging, no-code governance, incident detection and dashboards, on one design system, then tested it end to end to find and fix issues.' },
  { name: 'Altrum AI website', type: 'AI governance product site', role: 'UI/UX designer · Webflow developer', body: 'Designed and built the full Webflow CMS website for Altrum AI. When Altrum became part of Aligne, the site was merged into aligne.ai.' },
  { name: 'Aligne AI', type: 'Responsible AI consulting & platform', role: 'UI/UX designer · Webflow developer → code', body: 'Designed and built as a full Webflow CMS site, then rebuilt in code with Claude Code as one site for Aligne and Altrum, with GA4 tracking.', url: 'https://aligne.ai' },
  { name: 'World of Gears', type: 'Sustainability consultancy', role: 'UI/UX designer · Webflow developer', body: 'A clean, editorial website for a supply-chain consultancy, with CMS structures for case studies and insights.' },
  { name: 'sidhantsardar.com', type: 'Portfolio, designed, built and measured', role: 'Figma · Claude Code + Astro · GA4', body: 'Designed in Figma, built in code with Claude Code. GA4 tracks every enquiry click as a key event, linked to Search Console to see which searches bring visitors.', url: 'https://www.sidhantsardar.com' },
  { name: 'Prabuddha Pathak', type: 'Digital archive of Dr. B. R. Ambedkar’s works', role: 'Designer & developer · custom code', body: 'A free, searchable library of Dr. B. R. Ambedkar’s writings and speeches: 17 volumes, speeches, videos, the Constitution, 141 people profiles and an “Ask the archive” search.', url: 'https://prabuddhapathak.com' },
];

export const brings = [
  'Human-centred problem solver: designs from real use cases outward, with care for every state and interaction.',
  'Strong visual foundation: typography, colour, grids and hierarchy.',
  'Systems mindset: reusable components and guidelines, not one-off screens.',
  'Conversion focus: design, build and measure in one loop, using GA4 data to decide what to improve.',
  'Reliable remote partner: 3.5+ years managing multiple projects with clear written communication, using modern Figma and AI-assisted tooling.',
];

// Contact icons (24×24, stroke = currentColor), shared by the web page and the PDF.
export const icons = {
  email: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5.5 3.5h3.2l1.8 4.4-2.3 1.4a11 11 0 0 0 6.5 6.5l1.4-2.3 4.4 1.8v3.2a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z"/>',
  site: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19"/>',
  linkedin: '<rect x="2.5" y="2.5" width="19" height="19" rx="4"/><path d="M7.5 10.5v6M7.5 7.3v.2M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9.2 4.8 2.8-4.8 2.8z" fill="currentColor"/>',
};

/** Contact links in display order. Labels are shown as-is; `key` picks the icon. */
export function contactList({ EMAIL, PHONE, LINKEDIN, YOUTUBE }) {
  const clean = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  return [
    { key: 'email', label: EMAIL, href: `mailto:${EMAIL}` },
    PHONE && { key: 'phone', label: PHONE, href: `tel:${PHONE.replace(/[^+\d]/g, '')}` },
    { key: 'site', label: 'sidhantsardar.com', href: 'https://www.sidhantsardar.com' },
    LINKEDIN && { key: 'linkedin', label: `LinkedIn · ${clean(LINKEDIN).split('/').pop()}`, href: LINKEDIN },
    YOUTUBE && { key: 'youtube', label: clean(YOUTUBE).replace(/^youtube\.com\//, 'YouTube · '), href: YOUTUBE },
  ].filter(Boolean);
}

// ---------- The web page only (src/pages/resume.astro) ----------
// On screen the resume is shown as pictures: short lines, icons and tool logos. Every short line below
// is taken from the full text above, and the page still shows that full text under "Details".
// The PDF and Word files do not read anything below this line.

/** One sentence under the page title (from the profile above). */
export const lead = '3.5+ years remote. I design an AI-powered B2B SaaS platform end to end for enterprises and Tier-1 banks, and build and measure its marketing websites.';

/** Tools and the icon each one gets: its official logo from data/icons.ts (SQL and custom code have none, so a plain icon). */
export const toolset = {
  figma: { name: 'Figma', icon: 'figma', note: 'Expert' },
  figjam: { name: 'FigJam', icon: 'figjam' },
  make: { name: 'Figma Make', icon: 'make' },
  webflow: { name: 'Webflow', icon: 'webflow', note: 'CMS · Interactions' },
  gsap: { name: 'GSAP', icon: 'gsap' },
  spline: { name: 'Spline', icon: 'spline' },
  zapier: { name: 'Zapier', icon: 'zapier', note: 'Automations' },
  claude: { name: 'Claude Code', icon: 'claude' },
  html: { name: 'HTML / CSS', icon: 'html5' },
  notion: { name: 'Notion', icon: 'notion' },
  ga4: { name: 'Google Analytics 4', short: 'GA4', icon: 'ga4' },
  gsc: { name: 'Search Console', icon: 'gsc' },
  powerbi: { name: 'Power BI', icon: 'powerbi' },
  sql: { name: 'SQL', icon: 'database' },
  astro: { name: 'Astro', icon: 'astro' },
  code: { name: 'Custom code', icon: 'code-xml' },
};
/** The "Toolkit" grid, in this order: the tools from "Tools & build" and "Analytics & conversion" above. */
export const toolkit = ['figma', 'figjam', 'make', 'webflow', 'gsap', 'spline', 'zapier', 'claude', 'html', 'notion', 'ga4', 'gsc', 'powerbi', 'sql'];

/** "How I work": the three steps of the headline (designs, builds, measures) and the tools for each. */
export const loop = [
  { k: 'Design', icon: 'pen-tool', line: 'User flows, wireframes, prototypes and UI', tools: ['figma', 'figjam', 'make'] },
  { k: 'Build', icon: 'code-xml', line: 'CMS websites, motion and code', tools: ['webflow', 'gsap', 'spline', 'zapier', 'claude'] },
  { k: 'Measure', icon: 'chart-line', line: 'Visitors, key events and conversion', tools: ['ga4', 'gsc'] },
];
export const loopBack = 'GA4 data decides what to improve next';

/** Four numbers, each one stated in the text above (the websites: Altrum AI, Aligne AI, World of Gears). */
export const glance = [
  { n: '3.5+', unit: 'yrs', label: 'Remote product and web design', icon: 'calendar-days' },
  { n: '80+', label: 'UI components in one design system', icon: 'component' },
  { n: '50+', label: 'Enterprises served by Aligne AI', icon: 'building-2' },
  { n: '3', label: 'Client websites, in Webflow and code', icon: 'globe' },
];

/** The picture version of each job, in the same order as `jobs`, with one area per group of that job. */
export const jobCards = [
  {
    mark: 'A',
    areas: [
      { icon: 'app-window', wide: true, sub: 'AI-powered B2B SaaS for enterprises and Tier-1 banks', tools: ['figma'], items: [
        ['figma', 'Every screen, end to end in Figma'],
        ['workflow', 'User flows, wireframes and prototypes'],
        ['layout-dashboard', 'Data-rich dashboards'],
        ['mouse-pointer-click', 'Interaction logic for every screen'],
        ['palette', 'Colour palette, typography and layout'],
        ['component', 'Design system: 80+ components'],
        ['users-round', 'Handoff with PMs and developers'],
        ['search-check', 'Tested end to end'],
      ] },
      { icon: 'panels-top-left', tools: ['webflow', 'gsap', 'spline', 'zapier', 'claude'], items: [
        ['webflow', 'Two CMS websites in Webflow'],
        ['gsap', 'Motion: Webflow Interactions and GSAP'],
        ['spline', '3D and animation from Spline'],
        ['zapier', 'Zapier automations'],
        ['claude', 'aligne.ai rebuilt with Claude Code'],
      ] },
      { icon: 'shield-check', sub: 'AI governance, learned by designing the platform', grid: [
        ['file-check-2', 'Policies'], ['triangle-alert', 'Risk'], ['list-checks', 'Audits'], ['siren', 'Incident detection'],
      ] },
      { icon: 'chart-line', tools: ['ga4'], items: [
        ['ga4', 'GA4 set up on both websites'],
        ['mouse-pointer-click', 'Visitors and key events tracked'],
        ['trending-up', 'Pages improved for conversion'],
      ] },
    ],
  },
  {
    mark: 'N',
    areas: [
      { icon: 'chart-column', title: 'Dashboards and data', tools: ['powerbi', 'sql'], items: [
        ['powerbi', 'Power BI dashboards from many data sources'],
        ['database', 'Data modelling and SQL'],
        ['file-text', 'Business needs turned into specs and visuals'],
      ] },
    ],
  },
];

/** Icon and tools for each featured project, by name. `chips` replace the long sentence on the page;
    `page` is the project's own page on this site. */
export const projectArt = {
  'Altrum AI web app': { icon: 'app-window', tools: ['figma'], chips: ['Policy enforcement', 'Audit logging', 'No-code governance', 'Incident detection', 'Dashboards'] },
  'Altrum AI website': { icon: 'globe', tools: ['webflow'], page: '/work/altrum-website/' },
  'Aligne AI': { icon: 'git-merge', tools: ['webflow', 'claude', 'ga4'], page: '/work/aligne-ai/' },
  'World of Gears': { icon: 'cog', tools: ['webflow'], page: '/work/world-of-gears/' },
  'sidhantsardar.com': { icon: 'user-round', tools: ['figma', 'claude', 'astro', 'ga4'] },
  'Prabuddha Pathak': { icon: 'library', tools: ['code'] },
};

/** Icon for each group of core skills, by name. "Tools & build" is shown as the Toolkit instead. */
export const skillIcons = { 'Product & UX': 'square-mouse-pointer', 'UI & visual': 'palette', 'Design systems': 'component', 'Analytics & conversion': 'chart-line', 'Tools & build': 'wrench', Domain: 'shield-check' };

/** "What I bring", short: same five points as `brings`, in the same order. */
export const bringsShort = [
  { icon: 'heart-handshake', k: 'Human-centred', line: 'Designs from real use cases, with care for every state.' },
  { icon: 'eye', k: 'Visual foundation', line: 'Typography, colour, grids and hierarchy.' },
  { icon: 'blocks', k: 'Systems mindset', line: 'Reusable components, not one-off screens.' },
  { icon: 'target', k: 'Conversion focus', line: 'Design, build and measure in one loop.' },
  { icon: 'message-square-text', k: 'Reliable remote partner', line: '3.5+ years of clear written communication.' },
];
