// Every skill links to the page that proves it. No proof yet → status 'in-progress'
// (shown muted, no link). Change a skill to 'shown' only when its proof page is live.

export type SkillGroup = 'Design' | 'Webflow' | 'Code' | 'Systems' | 'Growth';
export interface Skill {
  id: string;
  label: string;
  group: SkillGroup;
  proof: { title: string; href: string }[];
  status: 'shown' | 'in-progress';
}

export const GROUPS: SkillGroup[] = ['Design', 'Webflow', 'Code', 'Systems', 'Growth'];

export const skills: Skill[] = [
  // Design
  { id: 'figma', label: 'Figma UI + UX', group: 'Design', status: 'shown', proof: [{ title: '6 UX case studies', href: '/portfolio/' }] },
  { id: 'prototyping', label: 'Prototyping', group: 'Design', status: 'shown', proof: [{ title: 'Chat assessment flow', href: '/portfolio/02-chat-assessment/' }] },
  { id: 'ux-flows', label: 'Onboarding + flows', group: 'Design', status: 'shown', proof: [{ title: 'Onboarding case study', href: '/portfolio/01-onboarding/' }] },
  { id: 'research', label: 'Usability testing', group: 'Design', status: 'in-progress', proof: [] },

  // Webflow
  { id: 'webflow-cms', label: 'CMS architecture', group: 'Webflow', status: 'shown', proof: [{ title: 'World of Gears CMS', href: '/work/world-of-gears/#key-decisions' }] },
  { id: 'webflow-build', label: 'Webflow builds', group: 'Webflow', status: 'shown', proof: [{ title: 'AltrumAI version 1', href: '/work/altrum-website/#version-1-webflow' }] },
  { id: 'interactions', label: 'Interactions', group: 'Webflow', status: 'in-progress', proof: [] },
  { id: 'client-first', label: 'Client-First', group: 'Webflow', status: 'in-progress', proof: [] },
  { id: 'integrations', label: 'Forms + integrations', group: 'Webflow', status: 'in-progress', proof: [] },

  // Code
  { id: 'astro', label: 'Astro', group: 'Code', status: 'shown', proof: [{ title: 'Aligne AI rebuild', href: '/work/aligne-ai/#process' }] },
  { id: 'migration', label: 'Webflow → code migration', group: 'Code', status: 'shown', proof: [{ title: 'AltrumAI version 2', href: '/work/altrum-website/#version-2-code' }] },
  { id: 'git-cms', label: 'Git-based CMS', group: 'Code', status: 'shown', proof: [{ title: 'Aligne AI decisions', href: '/work/aligne-ai/#key-decisions' }] },
  { id: 'javascript', label: 'JavaScript', group: 'Code', status: 'in-progress', proof: [] },

  // Systems
  { id: 'design-system', label: 'Design systems', group: 'Systems', status: 'shown', proof: [{ title: 'Design system case study', href: '/portfolio/06-design-system/' }] },
  { id: 'variables', label: 'Variables + Light/Dark', group: 'Systems', status: 'shown', proof: [{ title: 'Design system case study', href: '/portfolio/06-design-system/' }] },
  { id: 'handoff', label: 'Handoff + documentation', group: 'Systems', status: 'shown', proof: [{ title: 'Design system case study', href: '/portfolio/06-design-system/' }] },
  { id: 'tokens', label: 'Tokens Studio', group: 'Systems', status: 'in-progress', proof: [] },

  // Growth
  { id: 'seo', label: 'Technical SEO', group: 'Growth', status: 'in-progress', proof: [] },
  { id: 'performance', label: 'Performance', group: 'Growth', status: 'in-progress', proof: [] },
  { id: 'accessibility', label: 'Accessibility', group: 'Growth', status: 'in-progress', proof: [] },
  { id: 'analytics', label: 'GA4 + GTM', group: 'Growth', status: 'in-progress', proof: [] },
];
