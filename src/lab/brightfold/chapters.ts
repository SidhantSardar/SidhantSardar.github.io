// The Brightfold concept project, chapter by chapter. Update `status` as each one ships.
export type Status = 'built' | 'next' | 'planned';

export interface Chapter {
  n: string;
  lane: 'Strategy' | 'Product' | 'Website' | 'Growth' | 'Quality';
  title: string;
  proves: string;
  tools: string[];
  /** What the same job is called in Webflow, so clients who use Webflow see the match. */
  webflow?: string;
  status: Status;
}

export const chapters: Chapter[] = [
  { n: '01', lane: 'Strategy', title: 'Positioning and messaging', proves: 'I can turn a business into one clear promise before drawing anything.', tools: ['Customer profile', 'Competitor scan', 'Message map'], status: 'next' },
  { n: '02', lane: 'Strategy', title: 'Research and personas', proves: 'Design decisions come from people, not taste.', tools: ['5 interviews', 'Jobs to be done', 'Journey map'], status: 'planned' },
  { n: '03', lane: 'Product', title: 'Design system', proves: 'One set of tokens drives Figma, the product and the website.', tools: ['Tokens Studio', 'Figma variables', 'CSS variables'], webflow: 'Webflow variables', status: 'built' },
  { n: '04', lane: 'Product', title: 'Product UX and UI', proves: 'I can design a working B2B app: flows, screens and every state.', tools: ['Figma', 'User flows', 'Empty / loading / error states'], status: 'planned' },
  { n: '05', lane: 'Product', title: 'AI agent flow', proves: 'I can design AI features people trust: draft, review, approve.', tools: ['Agent flow map', 'Human review step', 'Prototype'], status: 'planned' },
  { n: '06', lane: 'Website', title: 'Marketing website', proves: 'Page structure and copy built to turn visitors into demo calls.', tools: ['Sitemap', 'Copy', 'Astro CMS'], webflow: 'Webflow CMS', status: 'planned' },
  { n: '07', lane: 'Website', title: 'Motion', proves: 'Motion that explains the product, and stays off for people who turn it off.', tools: ['GSAP ScrollTrigger', 'Lottie', 'Spline 3D'], webflow: 'Webflow Interactions', status: 'planned' },
  { n: '08', lane: 'Growth', title: 'Lead capture and analytics', proves: 'Every demo request is tracked from first visit to form sent.', tools: ['GA4', 'Tag Manager', 'Cookie consent', 'Key events', 'HubSpot form'], status: 'planned' },
  { n: '09', lane: 'Growth', title: 'A/B test', proves: 'I test a headline instead of guessing, and read the result honestly.', tools: ['Split test in code', 'GA4 comparison', 'Sample size'], status: 'planned' },
  { n: '10', lane: 'Growth', title: 'AI feature on the site', proves: 'A live "draft my proposal" demo that runs Claude safely behind a server.', tools: ['Cloudflare Worker', 'Claude API', 'Rate limits'], webflow: 'Webflow + Worker', status: 'planned' },
  { n: '11', lane: 'Quality', title: 'Accessibility, speed and SEO', proves: 'It works for everyone, loads fast and can be found on Google.', tools: ['WCAG 2.2 AA', 'axe', 'Lighthouse', 'Schema'], status: 'planned' },
  { n: '13', lane: 'Growth', title: 'Winning the client', proves: 'I can sell the work: discovery call, proposal, price and a monthly report.', tools: ['Discovery call', 'Proposal', 'Pricing', 'Retainer'], status: 'planned' },
  { n: '12', lane: 'Quality', title: 'Usability test and report', proves: '5 people try it, I fix what broke, and report what changed.', tools: ['5-person test', 'Findings', 'Looker Studio report'], status: 'planned' },
];

/** Things most designer portfolios skip, which this project covers on purpose. */
export const gaps = [
  { title: 'Strategy before screens', body: 'Who it is for, what it promises, and why it beats a spreadsheet. Without this the design has nothing to aim at.' },
  { title: 'Copywriting', body: 'Clients buy words first. Headlines and buttons are written and tested, not filled with lorem ipsum.' },
  { title: 'Every product state', body: 'Empty, loading, error and first-time screens. Real apps spend most of their time in these.' },
  { title: 'Cookie consent', body: 'GA4 in the UK and EU needs consent first. Analytics without it is a legal risk for the client.' },
  { title: 'CRM hand-off', body: 'A form is only useful if the lead lands somewhere a salesperson sees it: HubSpot, with a follow-up email.' },
  { title: 'Reporting', body: 'A one-page monthly report the client can read without logging in to Analytics.' },
  { title: 'Hand-off docs', body: 'How to edit, add a page and change a colour, so the client is not stuck without me.' },
];
