// Makes the downloadable resume files from src/data/resume.mjs:
//   public/sidhant-sardar-resume.pdf   (designed A4 layout from src/data/resume-sheet.mjs, printed by headless Chrome)
//   public/sidhant-sardar-resume.docx  (simple one-column Word file, easy to edit and ATS-friendly)
// Run after editing the resume text:  npm run resume:files   (needs Google Chrome on this Mac)
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, BorderStyle, TabStopType,
} from 'docx';
import { skills, jobs, projects, brings, fmt, tagline, headline, profile, education, contactList, parts } from '../src/data/resume.mjs';
import { sheetCss, sheetBody } from '../src/data/resume-sheet.mjs';
import { EMAIL, PHONE, LINKEDIN, YOUTUBE } from '../src/data/profile.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = (f) => path.join(root, 'public', f);
const NAME = 'Sidhant Sardar';
const SITE = 'https://www.sidhantsardar.com';
const clean = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const dates = (j) => `${fmt(j.start)} – ${j.end ? fmt(j.end) : 'Present'}`;
const contacts = contactList({ EMAIL, PHONE, LINKEDIN, YOUTUBE }).map((c) => ({ ...c, text: c.label }));

/* ---------------- PDF ---------------- */
async function pdf() {
  const font = (await readFile(path.join(root, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'))).toString('base64');
  const photo = (await readFile(pub('sidhant.jpg'))).toString('base64');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${NAME} · Resume</title><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
@page{size:A4;margin:11mm 0 10mm}
${sheetCss}
</style></head><body>${sheetBody({ photo: `data:image/jpeg;base64,${photo}`, EMAIL, PHONE, LINKEDIN, YOUTUBE })}</body></html>`;

  const dir = await mkdtemp(path.join(tmpdir(), 'resume-'));
  try {
    const file = path.join(dir, 'resume.html');
    await writeFile(file, html);
    const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--user-data-dir=${path.join(dir, 'profile')}`, `--print-to-pdf=${pub('sidhant-sardar-resume.pdf')}`, `file://${file}`], { stdio: 'ignore' });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
  console.log('resume: public/sidhant-sardar-resume.pdf');
}

/* ---------------- Word (.docx) ---------------- */
async function word() {
  const F = 'Calibri';
  const run = (text, o = {}) => new TextRun({ text, font: F, size: 20, ...o });
  const heading = (text) => new Paragraph({
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D4D4D4', space: 4 } },
    children: [run(text.toUpperCase(), { bold: true, size: 18, color: '444444', characterSpacing: 40 })],
  });
  const bullet = (text) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: parts(text).map((p) => run(p.t, p.k ? { bold: true } : {})) });
  const link = (text, href) => new ExternalHyperlink({ link: href, children: [run(text, { color: '0000FF', underline: {} })] });

  const children = [
    new Paragraph({ children: [run(NAME, { bold: true, size: 44 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [run(tagline, { color: '525252', size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [run(`${headline[0]} ${headline[1]}`, { bold: true, size: 24 })] }),
    new Paragraph({ children: contacts.flatMap((c, i) => [...(i ? [run('   |   ', { color: 'BBBBBB' })] : []), link(c.text, c.href)]) }),

    heading('Profile'),
    new Paragraph({ children: [run(profile)] }),

    heading('Experience'),
    ...jobs.flatMap((j) => [
      new Paragraph({
        spacing: { before: 160 },
        tabStops: [{ type: TabStopType.RIGHT, position: 9600 }],
        children: [run(j.role, { bold: true, size: 23 }), run(`\t${dates(j)} · ${j.where}`, { color: '525252', size: 19 })],
      }),
      new Paragraph({ spacing: { after: 60 }, children: [run(j.org, { bold: true }), run(` · ${j.note}`, { color: '525252' })] }),
      ...(j.tools?.length ? [new Paragraph({ spacing: { after: 60 }, children: [run('Skills: ', { bold: true, size: 19 }), run(j.tools.join(' · '), { size: 19, color: '333333' })] })] : []),
      ...j.groups.flatMap((g) => [
        ...(g.k ? [new Paragraph({ spacing: { before: 80, after: 20 }, children: [run(g.k.toUpperCase(), { size: 16, color: '777777', bold: true, characterSpacing: 30 })] })] : []),
        ...g.points.map(bullet),
      ]),
    ]),

    heading('Featured projects'),
    ...projects.flatMap((p) => [
      ...(p.featured ? [new Paragraph({ spacing: { before: 120 }, children: [run(p.featured.toUpperCase(), { bold: true, size: 16, color: 'FFFFFF', shading: { fill: '0000FF' }, characterSpacing: 30 })] })] : []),
      new Paragraph({ spacing: { before: 120 }, children: [run(p.name, { bold: true, size: 22 }), run(` · ${p.type}`, { color: '525252' })] }),
      new Paragraph({ children: [run(p.role, { italics: true, color: '666666', size: 18 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [run(p.body)] }),
      ...(p.url ? [new Paragraph({ children: [link(clean(p.url), p.url)] })] : []),
      ...(p.caseStudy ? [new Paragraph({ children: [link('See the full product design process', SITE + p.caseStudy)] })] : []),
    ]),

    heading('Core skills'),
    ...skills.map((s) => new Paragraph({ spacing: { after: 60 }, children: [run(`${s.k}: `, { bold: true }), run(s.v.join(' · '))] })),

    heading('What I bring'),
    ...brings.map(bullet),

    heading('Education'),
    new Paragraph({ children: [run(education.title, { bold: true }), run(` · ${education.org} · ${education.year}`)] }),
  ];

  const doc = new Document({
    creator: NAME, title: `${NAME} · Resume`,
    styles: { default: { document: { run: { font: F, size: 20 } } } },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }],
  });
  await writeFile(pub('sidhant-sardar-resume.docx'), await Packer.toBuffer(doc));
  console.log('resume: public/sidhant-sardar-resume.docx');
}

await pdf();
await word();
