// Makes the downloadable resume files from src/data/resume.mjs:
//   public/sidhant-sardar-resume.pdf   (designed A4 layout, printed by headless Chrome)
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
import { skills, jobs, projects, brings, fmt, tagline, headline, profile, education } from '../src/data/resume.mjs';
import { EMAIL, PHONE, LINKEDIN, YOUTUBE } from '../src/data/profile.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = (f) => path.join(root, 'public', f);
const NAME = 'Sidhant Sardar';
const SITE = 'https://www.sidhantsardar.com';
const clean = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const dates = (j) => `${fmt(j.start)} – ${j.end ? fmt(j.end) : 'Present'}`;
const contacts = [
  { text: EMAIL, href: `mailto:${EMAIL}` },
  PHONE && { text: PHONE, href: `tel:${PHONE.replace(/[^+\d]/g, '')}` },
  { text: clean(SITE), href: SITE },
  LINKEDIN && { text: clean(LINKEDIN), href: LINKEDIN },
  YOUTUBE && { text: clean(YOUTUBE), href: YOUTUBE },
].filter(Boolean);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------------- PDF ---------------- */
async function pdf() {
  const font = (await readFile(path.join(root, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'))).toString('base64');
  const photo = (await readFile(pub('sidhant.jpg'))).toString('base64');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${NAME} · Resume</title><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
@page{size:A4;margin:11mm 0 10mm}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;background:#fff;color:#111;font-family:Geist,system-ui,sans-serif;font-size:10.2px;line-height:1.42}
.page{width:210mm;padding:2mm 13mm 0;display:grid;gap:5mm;align-content:start}
.mono{font-family:ui-monospace,Menlo,monospace;letter-spacing:.02em}
.eyebrow{font-family:ui-monospace,Menlo,monospace;font-size:7.6px;letter-spacing:.12em;text-transform:uppercase;color:#555;font-weight:600;margin:0 0 2.2mm}
header{display:grid;grid-template-columns:auto 1fr;gap:2mm 5mm;align-items:center;padding-bottom:4mm;border-bottom:1px solid #e3e3e3}
.ph{width:21mm;height:24.5mm;border-radius:2.5mm;object-fit:cover;object-position:50% 20%;grid-row:span 3}
h1{margin:0;font-size:22px;letter-spacing:-.03em;line-height:1}
.tag{color:#525252;font-size:10.5px}
.head{font-size:15px;font-weight:700;letter-spacing:-.02em;line-height:1.15}.head span{color:#8a8a8a}
.contact{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:1mm 5mm;font-size:9.6px;margin-top:1mm}
.contact a{color:#111;text-decoration:none}
.cols{display:grid;grid-template-columns:1fr 57mm;gap:6mm;align-items:start}
.main{display:grid;gap:4.5mm}
.lead{margin:0;color:#3a3a3a;font-size:10.2px}
.panel{border-radius:2.5mm;padding:4mm 4.5mm;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.exp{background:#F6F6F3}.proj{background:#F2F5F8}.side{background:#F7F5F1;padding:4.5mm;border-radius:2.5mm;display:grid;gap:4mm}
.tl{list-style:none;margin:0;padding:0;display:grid;gap:3.5mm;position:relative}
.tl::before{content:"";position:absolute;left:24.4mm;top:1.5mm;bottom:1.5mm;width:1px;background:#d0d0d0}
.tl>li{display:grid;grid-template-columns:21mm 7mm 1fr}
.when b{display:block;font-size:11.5px;letter-spacing:-.02em}
.when span{display:block;font-family:ui-monospace,Menlo,monospace;font-size:7.6px;color:#666;margin-top:.6mm}
.pill{display:inline-block!important;margin-top:1.4mm!important;background:#111;color:#fff!important;border-radius:9px;padding:.4mm 2mm}
.dot{justify-self:center;margin-top:1mm;width:2.4mm;height:2.4mm;border-radius:50%;border:1.6px solid #111;background:#fff;position:relative;z-index:1}
.now .dot{background:#111}
h3{margin:0;font-size:11.5px;letter-spacing:-.015em}
.org{margin:.6mm 0 0;color:#525252}.org b{color:#111}
.k{font-family:ui-monospace,Menlo,monospace;font-size:7.2px;letter-spacing:.1em;text-transform:uppercase;color:#777;margin:1.8mm 0 .4mm}
ul{margin:.4mm 0 0;padding-left:3.6mm;display:grid;gap:.5mm;color:#333}
.pj{display:grid;gap:.5mm;align-content:start;padding-top:2mm;border-top:1px solid #dfe4ea;break-inside:avoid}
.pj h3 span{display:block;font-weight:400;color:#555;font-size:9.4px;margin-top:.3mm}
.pj p{font-size:9.6px}
.pj .r{font-family:ui-monospace,Menlo,monospace;font-size:7.8px;color:#666}
.pj p{margin:0;color:#333}
.pj a{font-family:ui-monospace,Menlo,monospace;font-size:7.8px;color:#111;text-decoration:none}
.projs{display:grid;grid-template-columns:1fr 1fr;gap:3mm 5mm}
.sk{display:grid;gap:.4mm;padding-top:1.6mm;border-top:1px solid #e6e1d8}
.sk:first-of-type{border-top:0;padding-top:0}
.sk b{font-size:10.2px}.sk p{margin:0;color:#444;font-size:9.4px}
.side ul{font-size:9.4px}
.side p{margin:0}
.lnk a{display:block;color:#111;text-decoration:none;font-size:9.6px}
</style></head><body><div class="page">
<header>
  <img class="ph" src="data:image/jpeg;base64,${photo}" alt="">
  <h1>${NAME}</h1>
  <div class="tag">${esc(tagline)}</div>
  <div class="head">${esc(headline[0])} <span>${esc(headline[1])}</span></div>
  <div class="contact">${contacts.map((c) => `<a href="${c.href}">${esc(c.text)}</a>`).join('')}</div>
</header>
<div class="cols">
  <div class="main">
    <section><h2 class="eyebrow">Profile</h2><p class="lead">${esc(profile)}</p></section>
    <section class="panel exp"><h2 class="eyebrow">Experience</h2><ol class="tl">
      ${jobs.map((j) => `<li class="${j.end ? '' : 'now'}">
        <div class="when"><b>${j.start.slice(0, 4)} – ${j.end ? j.end.slice(0, 4) : 'Now'}</b><span>${dates(j)}</span><span>${esc(j.where)}</span>${j.end ? '' : '<span class="pill">Current</span>'}</div>
        <span class="dot"></span>
        <div><h3>${esc(j.role)}</h3><p class="org"><b>${esc(j.org)}</b> · ${esc(j.note)}</p>
          ${j.groups.map((g) => `${g.k ? `<div class="k">${esc(g.k)}</div>` : ''}<ul>${g.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`).join('')}
        </div></li>`).join('')}
    </ol></section>
    <section class="panel proj"><h2 class="eyebrow">Featured projects</h2><div class="projs">
      ${projects.map((p) => `<div class="pj"><h3>${esc(p.name)} <span>${esc(p.type)}</span></h3><span class="r">${esc(p.role)}</span><p>${esc(p.body)}</p>${p.url ? `<a href="${p.url}">${esc(clean(p.url))} ↗</a>` : ''}</div>`).join('')}
    </div></section>
  </div>
  <aside class="side">
    <section><h2 class="eyebrow">Core skills</h2>${skills.map((s) => `<div class="sk"><b>${esc(s.k)}</b><p>${s.v.map(esc).join(' · ')}</p></div>`).join('')}</section>
    <section><h2 class="eyebrow">What I bring</h2><ul>${brings.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></section>
    <section><h2 class="eyebrow">Education</h2><p><b>${esc(education.title)}</b><br>${esc(education.org)} · ${esc(education.year)}</p></section>
    <section class="lnk"><h2 class="eyebrow">Links</h2><a href="${SITE}">Portfolio · ${clean(SITE)}</a>${projects.filter((p) => p.url && !p.url.includes('sidhantsardar')).map((p) => `<a href="${p.url}">${clean(p.url)} ↗</a>`).join('')}</section>
  </aside>
</div></div></body></html>`;

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
  const bullet = (text) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [run(text)] });
  const link = (text, href) => new ExternalHyperlink({ link: href, children: [run(text, { color: '111111', underline: {} })] });

  const children = [
    new Paragraph({ children: [run(NAME, { bold: true, size: 44 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [run(tagline, { color: '525252', size: 22 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [run(`${headline[0]} ${headline[1]}`, { bold: true, size: 24 })] }),
    new Paragraph({ children: contacts.flatMap((c, i) => [...(i ? [run('   ·   ', { color: '999999' })] : []), link(c.text, c.href)]) }),

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
      ...j.groups.flatMap((g) => [
        ...(g.k ? [new Paragraph({ spacing: { before: 80, after: 20 }, children: [run(g.k.toUpperCase(), { size: 16, color: '777777', bold: true, characterSpacing: 30 })] })] : []),
        ...g.points.map(bullet),
      ]),
    ]),

    heading('Featured projects'),
    ...projects.flatMap((p) => [
      new Paragraph({ spacing: { before: 120 }, children: [run(p.name, { bold: true, size: 22 }), run(` · ${p.type}`, { color: '525252' })] }),
      new Paragraph({ children: [run(p.role, { italics: true, color: '666666', size: 18 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [run(p.body)] }),
      ...(p.url ? [new Paragraph({ children: [link(clean(p.url), p.url)] })] : []),
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
