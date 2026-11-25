// One source for the resume: the web page (src/pages/resume.astro), the PDF and the Word file
// (scripts/resume-files.mjs) all read from here. Edit text here, then run `npm run resume:files`.

export const tagline = 'Product Designer (UI/UX) · Webflow Developer · Claude Code · GA4';
export const headline = ['Product designer', 'who also builds and measures the website.'];
export const profile = 'Product designer (UI/UX) with 3.5+ years of remote experience designing an AI-powered B2B SaaS platform end to end for enterprises and Tier-1 banks, making complex workflows simple and intuitive. I own the full process (user flows, wireframes, prototypes, dashboards and high-fidelity Figma UI on a shared design system) and work closely with product and development teams. I also design and build the marketing websites in Webflow and Claude Code, measured with Google Analytics.';
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
    role: 'Product Designer (UI/UX) & Webflow Developer',
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
  { featured: 'Featured · Product design', name: 'Altrum AI web app', type: 'AI-powered B2B SaaS product', role: 'Product designer · Figma', body: 'Designed the full product end to end: every screen for policy enforcement, audit logging, no-code governance, incident detection and dashboards, on one design system, then tested it end to end to find and fix issues.' },
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
