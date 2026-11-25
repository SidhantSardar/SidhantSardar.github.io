// Brightfold tokens: reads the Tokens Studio file (same JSON Figma syncs to) and turns it into
// CSS custom properties. A tiny stand-in for Style Dictionary, so the pipeline stays readable.

const isToken = (n) => n && typeof n === 'object' && 'value' in n;
const varName = (path) => `--bf-${path.join('-')}`;

/** Flatten one token set into [{ path, value, type, description }]. */
export function flatten(set, path = []) {
  return Object.entries(set).flatMap(([k, v]) =>
    isToken(v) ? [{ path: [...path, k], ...v }] : typeof v === 'object' ? flatten(v, [...path, k]) : [],
  );
}

// "{color.orange.500}" → "var(--bf-color-orange-500)"
const ref = (value) => String(value).replace(/\{([^}]+)\}/g, (_, p) => `var(${varName(p.split('.'))})`);

/** Resolve a reference to its final raw value (for previews and contrast checks). */
export function resolve(tokens, value) {
  const g = flatten(tokens.global);
  return String(value).replace(/\{([^}]+)\}/g, (_, p) => g.find((t) => t.path.join('.') === p)?.value ?? p);
}

export const setsOf = (tokens) => ({
  global: flatten(tokens.global),
  light: flatten(tokens.light),
  dark: flatten(tokens.dark),
});

export function toCss(tokens) {
  const sets = setsOf(tokens);
  const decl = (list) => list.map((t) => `  ${varName(t.path)}: ${ref(t.value)};`).join('\n');
  return `/* Generated from src/lab/brightfold/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */
.bf {
${decl(sets.global)}
${decl(sets.light)}
}
:root[data-theme="dark"] .bf, .bf[data-bf-theme="dark"] {
${decl(sets.dark)}
}
`;
}
