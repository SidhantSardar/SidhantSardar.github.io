// Facts about Sidhant used across the site. Leave a value empty until it's real:
// empty values are simply not shown (and not put into structured data).

// LinkedIn profile (from the Oct 2026 resume).
export const LINKEDIN = 'https://www.linkedin.com/in/sidhant-sardar/';

// The resume page. Shared as a link instead of a PDF ("Save as PDF" on the page prints one).
export const CV = '/resume/';

export const EMAIL = 'sidhantsardar93@gmail.com';

// Contact number in international format (clients are abroad, so keep the +91). Shown as a tap-to-call link.
export const PHONE = '+91 97648 43137';
/** PHONE without spaces or dashes, for tel: links and structured data. */
export const PHONE_TEL = PHONE.replace(/[^+\d]/g, '');

export const AVAILABILITY = 'Available for freelance website projects, remote.';
