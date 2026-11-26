// A counter shared by every component while the site is built, for ids that must not repeat on a page.
let n = 0;
export const nextId = () => (n += 1);
