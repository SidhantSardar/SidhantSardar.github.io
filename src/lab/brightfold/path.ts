// The guided path: idea → product → website → first client, step by step.
// Each step links to a Brightfold chapter and has a video slot. When an episode is on YouTube,
// paste its video ID into `video.youtubeId` and it appears on the page.

export interface Video {
  ep: string;
  title: string;
  /** Planned length. Every episode is at least 5 minutes: a full walkthrough, not a teaser. */
  minutes: number;
  /** The 11-character ID from the YouTube URL. Empty = "coming soon". */
  youtubeId?: string;
}

export interface Step {
  n: string;
  stage: 'Idea' | 'Product' | 'Website' | 'Growth' | 'Client';
  title: string;
  why: string;
  do: string[];
  deliverable: string;
  /** Brightfold chapter that puts this step into practice. */
  chapter?: string;
  /** Often skipped. Shown with a marker so it stands out. */
  gap?: boolean;
  video: Video;
}

export const intro: Video = { ep: '00', title: "A website isn't for looking finished. It's for converting.", minutes: 8 };

export const eras = [
  { years: '1991–1999', name: 'Hand-coded pages', idea: 'A website is a document online.', how: 'HTML by hand, then Dreamweaver and FrontPage.' },
  { years: '2000–2009', name: 'Flash and templates', idea: 'A website is a digital brochure that has to look impressive.', how: 'Flash intros, table layouts, early WordPress.' },
  { years: '2010–2016', name: 'Mobile and responsive', idea: 'A website has to work on a phone and be found on Google.', how: 'Responsive CSS, Bootstrap, WordPress themes, SEO.' },
  { years: '2017–2022', name: 'No-code and growth', idea: 'A website is a sales tool you can measure and change weekly.', how: 'Webflow, Framer, CMS, analytics, A/B tests, CRM forms.' },
  { years: '2023–now', name: 'AI-assisted', idea: 'A website is a system: built faster, measured always, and able to talk back.', how: 'AI for research, copy and code (Claude Code), AI features on the site.' },
];

export const steps: Step[] = [
  { n: '01', stage: 'Idea', title: 'Pick the customer and the promise', why: "If the page talks to everyone, it convinces no one. Conversion starts with one customer and one problem.", do: ['Write who it is for in one sentence', 'List their top 3 problems in their words', 'Scan 3 competitors: their promise, price, proof', 'Write one promise and three supporting points'], deliverable: 'One-page brief and message map', chapter: '01', gap: true, video: { ep: '01', title: 'Strategy before screens', minutes: 6 } },
  { n: '02', stage: 'Idea', title: 'Talk to five people', why: 'Five short interviews show the words customers use. Those words become your headlines.', do: ['Write 8 open questions', 'Run 5 calls of 20 minutes', 'Pull out jobs, pains and exact quotes', 'Map the journey from problem to purchase'], deliverable: 'Personas, jobs to be done and a journey map', chapter: '02', gap: true, video: { ep: '02', title: 'Research that writes your copy', minutes: 6 } },
  { n: '03', stage: 'Product', title: 'Set up the design system', why: 'Tokens keep the product and the website consistent, so the brand feels trustworthy everywhere.', do: ['Define colour, type, spacing and radius tokens', 'Add light and dark themes', 'Sync Figma ↔ code with Tokens Studio', 'Check colour contrast'], deliverable: 'tokens.json, Figma variables and CSS variables', chapter: '03', video: { ep: '03', title: 'One source for every colour', minutes: 7 } },
  { n: '04', stage: 'Product', title: 'Design the product experience', why: 'The website sells what the product shows. Clear screens make the demo, the screenshots and the sale easier.', do: ['Map the main flow: create → send → track → sign', 'Wireframe, then design key screens', 'Design empty, loading, error and first-time states', 'Prototype it in Figma'], deliverable: 'App screens and a clickable prototype', chapter: '04', video: { ep: '04', title: 'Designing a B2B product', minutes: 8 } },
  { n: '05', stage: 'Product', title: 'Design the AI feature', why: "People only use AI they trust. The design has to show what the AI did and let people correct it.", do: ['Map the agent flow: input → draft → review → approve', 'Design how the AI explains itself', 'Plan what happens when it is wrong'], deliverable: 'Agent flow map and review screens', chapter: '05', video: { ep: '05', title: 'UX for AI agents', minutes: 6 } },
  { n: '06', stage: 'Website', title: 'Plan a website that converts', why: 'Every page has one job and one main button. Structure and copy matter more than visuals.', do: ['Sitemap: Home, Product, Pricing, Book a demo', 'Write the copy first: headline, proof, objections, CTA', 'Place proof near every button: logos, numbers, quotes', 'Build pages from components and a CMS'], deliverable: 'Sitemap, copy deck and the built site', chapter: '06', video: { ep: '06', title: 'Anatomy of a page that converts', minutes: 8 } },
  { n: '07', stage: 'Website', title: 'Add motion with a purpose', why: 'Motion should explain the product or guide the eye, not slow people down.', do: ['Scroll stories with GSAP', 'Small icons with Lottie', 'One 3D moment with Spline', 'Respect "reduce motion" settings'], deliverable: 'Motion spec and the animated pages', chapter: '07', video: { ep: '07', title: 'Motion that sells, not shows off', minutes: 7 } },
  { n: '08', stage: 'Growth', title: 'Measure every step', why: "If you can't see where people drop off, you can't fix it. Analytics turns opinions into decisions.", do: ['GA4 through Tag Manager', 'Cookie consent before tracking (UK/EU)', 'Key events: demo click, form sent, pricing view', 'UTM links on every campaign'], deliverable: 'Tracking plan and a working funnel report', chapter: '08', gap: true, video: { ep: '08', title: 'GA4 for designers', minutes: 8 } },
  { n: '09', stage: 'Growth', title: 'Capture and follow up leads', why: 'A lead that sits in an inbox goes cold within a day. Speed of follow-up wins deals.', do: ['Demo form → HubSpot (free CRM)', 'Instant confirmation email', 'Notify sales the same minute', 'A 3-email follow-up for people who did not book'], deliverable: 'Form → CRM → email flow', chapter: '08', gap: true, video: { ep: '09', title: 'From form to sales call', minutes: 6 } },
  { n: '10', stage: 'Growth', title: 'Test and improve', why: 'Small tested changes beat redesigns. One headline test can lift sign-ups more than new visuals.', do: ['Pick one page and one goal', 'Write two headlines', 'Split traffic and wait for enough visits', 'Keep the winner, write down what you learned'], deliverable: 'A/B test log', chapter: '09', video: { ep: '10', title: 'Your first A/B test', minutes: 6 } },
  { n: '11', stage: 'Growth', title: 'Add AI to the website', why: 'A live demo ("draft my proposal") lets visitors try the product before they talk to sales.', do: ['Small server (Cloudflare Worker) holds the API key', 'Claude API drafts the result', 'Rate limits and clear limits on what it does'], deliverable: 'Live AI demo on the site', chapter: '10', video: { ep: '11', title: 'Putting Claude on a website', minutes: 7 } },
  { n: '12', stage: 'Growth', title: 'Make it work for everyone', why: 'Slow, hard-to-use pages lose visitors and Google ranking. Accessibility is part of conversion.', do: ['WCAG 2.2 AA check with axe', 'Lighthouse: speed and Core Web Vitals', 'SEO: titles, schema, sitemap'], deliverable: 'Audit and fix list', chapter: '11', video: { ep: '12', title: 'Accessible, fast, findable', minutes: 6 } },
  { n: '13', stage: 'Growth', title: 'Test with real people', why: 'Watching five people use the site shows problems you will never see yourself.', do: ['Write 4 tasks', 'Run 5 sessions', 'Fix the top 3 problems', 'Report before and after'], deliverable: 'Usability report', chapter: '12', video: { ep: '13', title: 'Five people, three fixes', minutes: 6 } },
  { n: '14', stage: 'Client', title: 'Win and keep the client', why: 'Clients buy outcomes, not pages. Show them the path from idea to booked calls, then report on it every month.', do: ['Discovery call: goal, audience, numbers', 'Proposal with scope, timeline and price', 'Case study from this project as proof', 'Monthly report and a retainer to keep improving'], deliverable: 'Proposal template, case study and monthly report', chapter: '13', gap: true, video: { ep: '14', title: 'How to win the client', minutes: 8 } },
];

/** What each role can honestly say after finishing the path. */
export const outcomes = [
  { role: 'UX designer', gets: ['Research that shapes decisions', 'Product flows and every screen state', 'AI features people trust', 'Usability testing with real people'] },
  { role: 'Web designer', gets: ['Sites structured and written to convert', 'A design system shared with the product', 'Motion with a purpose', 'Accessible, fast, findable pages'] },
  { role: 'AI-fluent designer', gets: ['Using AI for research, copy and code', 'Building real sites with Claude Code', 'Putting AI features on a live site safely', 'Knowing where AI needs a human check'] },
  { role: 'Growth partner', gets: ['Tracking that shows what brings clients', 'A/B tests and honest reporting', 'Leads flowing into a CRM', 'Selling outcomes, not pages'] },
];
