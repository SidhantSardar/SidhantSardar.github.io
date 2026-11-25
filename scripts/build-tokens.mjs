// Tokens Studio JSON → CSS variables. Runs before every dev/build (see package.json).
import { readFile, writeFile } from 'node:fs/promises';
import { toCss, setsOf } from '../src/lab/brightfold/tokens.mjs';

const dir = new URL('../src/lab/brightfold/', import.meta.url);
const tokens = JSON.parse(await readFile(new URL('tokens.json', dir), 'utf8'));
await writeFile(new URL('tokens.css', dir), toCss(tokens));
const s = setsOf(tokens);
console.log(`brightfold tokens: ${s.global.length} global, ${s.light.length} semantic → tokens.css`);
