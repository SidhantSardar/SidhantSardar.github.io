// The designed A4 sheet of the resume, as HTML and CSS text. Two things use it, so they always match:
//   scripts/resume-files.mjs        prints it to public/sidhant-sardar-resume.pdf
//   components/ResumeSheet.astro    shows it when someone prints the resume page (Cmd or Ctrl + P)
// The text itself comes from ./resume.mjs.
import { skills, jobs, projects, brings, fmt, tagline, headline, profile, education, icons, contactList, kwHtml } from './resume.mjs';

export const NAME = 'Sidhant Sardar';
export const SITE = 'https://www.sidhantsardar.com';
const clean = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const dates = (j) => `${fmt(j.start)} – ${j.end ? fmt(j.end) : 'Present'}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The sheet's styles. Sizes are in mm and small px because the sheet is an A4 page. */
export const sheetCss = `*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;background:#fff;color:#111;font-family:Geist,system-ui,sans-serif;font-size:10.2px;line-height:1.42}
.page{width:210mm;padding:2mm 13mm 0;display:grid;gap:5mm;align-content:start}
.mono{font-family:ui-monospace,Menlo,monospace;letter-spacing:.02em}
.eyebrow{font-family:ui-monospace,Menlo,monospace;font-size:7.6px;letter-spacing:.12em;text-transform:uppercase;color:#555;font-weight:600;margin:0 0 2.2mm}
header{display:grid;grid-template-columns:auto 1fr;gap:2mm 5mm;align-items:center;padding-bottom:4mm;border-bottom:1px solid #e3e3e3}
.ph{width:21mm;height:24.5mm;border-radius:2.5mm;object-fit:cover;object-position:50% 20%;grid-row:span 3}
h1{margin:0;font-size:22px;letter-spacing:-.03em;line-height:1}
.tag{color:#525252;font-size:10.5px}
.head{font-size:15px;font-weight:700;letter-spacing:-.02em;line-height:1.15}.head span{color:#0000FF}
.contact{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:1.3mm;margin-top:1.5mm}
.contact a{display:inline-flex;align-items:center;gap:1.1mm;padding:1mm 2.2mm 1mm 1.8mm;border:1px solid #d6d6d6;border-radius:9mm;color:#111;text-decoration:none;font-size:8.6px;line-height:1.2}
.contact svg{width:2.9mm;height:2.9mm;fill:none;stroke:#111;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.cols{display:grid;grid-template-columns:1fr 57mm;gap:6mm;align-items:start}
.main{display:grid;gap:4.5mm}
.lead{margin:0;color:#3a3a3a;font-size:10.2px}
.panel{border-radius:2.5mm;padding:4mm 4.5mm;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.exp{background:#F5F5F5}.proj{background:#F0F1FF}.side{background:#F8F8F8;padding:4.5mm;border-radius:2.5mm;display:grid;gap:4mm}
.tl{list-style:none;margin:0;padding:0;display:grid;gap:3.5mm;position:relative}
.tl::before{content:"";position:absolute;left:24.4mm;top:1.5mm;bottom:1.5mm;width:1px;background:#d0d0d0}
.tl>li{display:grid;grid-template-columns:21mm 7mm 1fr}
.when b{display:block;font-size:11.5px;letter-spacing:-.02em}
.when span{display:block;font-family:ui-monospace,Menlo,monospace;font-size:7.6px;color:#666;margin-top:.6mm}
.pill{display:inline-block!important;margin-top:1.4mm!important;background:#0000FF;color:#fff!important;border-radius:9px;padding:.4mm 2mm}
.dot{justify-self:center;margin-top:1mm;width:2.4mm;height:2.4mm;border-radius:50%;border:1.6px solid #111;background:#fff;position:relative;z-index:1}
.now .dot{background:#0000FF;border-color:#0000FF}
h3{margin:0;font-size:11.5px;letter-spacing:-.015em}
.org{margin:.6mm 0 0;color:#525252}.org b{color:#111}
.k{font-family:ui-monospace,Menlo,monospace;font-size:7.2px;letter-spacing:.1em;text-transform:uppercase;color:#777;margin:1.8mm 0 .4mm}
ul{margin:.4mm 0 0;padding-left:3.6mm;display:grid;gap:.5mm;color:#333}
.pj{display:grid;gap:.5mm;align-content:start;padding-top:2mm;border-top:1px solid #D9DCF5;break-inside:avoid}
.pj h3 span{display:block;font-weight:400;color:#555;font-size:9.4px;margin-top:.3mm}
.pj p{font-size:9.6px}
.pj .r{font-family:ui-monospace,Menlo,monospace;font-size:7.8px;color:#666}
.pj p{margin:0;color:#333}
.pj a{font-family:ui-monospace,Menlo,monospace;font-size:7.8px;color:#0000FF;text-decoration:none}
.tools{display:flex;flex-wrap:wrap;gap:1mm;margin:1.2mm 0 .4mm}
.tools span{font-family:ui-monospace,Menlo,monospace;font-size:7.2px;padding:.3mm 1.8mm;border:1px solid #D4D4D4;border-radius:9mm;background:#fff}
/* keep each group's label with its bullets */
.g{break-inside:avoid}
mark.kw{background:linear-gradient(transparent 52%,rgba(0,0,255,.14) 52%);color:#111;font-weight:600;padding:0 .2mm}
.pj.feat{grid-column:1/-1;border:1.4px solid #0000FF;border-radius:2.5mm;padding:3mm 3.5mm;background:#fff}
.pj.feat h3{font-size:13px}
.ft{justify-self:start;font-family:ui-monospace,Menlo,monospace;font-size:7px;letter-spacing:.08em;text-transform:uppercase;background:#0000FF;color:#fff;border-radius:9mm;padding:.5mm 2mm;margin-bottom:.5mm}
.projs{display:grid;grid-template-columns:1fr 1fr;gap:3mm 5mm}
.sk{display:grid;gap:.4mm;padding-top:1.6mm;border-top:1px solid #E4E4E4}
.sk:first-of-type{border-top:0;padding-top:0}
.sk b{font-size:10.2px}.sk p{margin:0;color:#444;font-size:9.4px}
.side ul{font-size:9.4px}
.side p{margin:0}
.lnk a{display:block;color:#0000FF;text-decoration:none;font-size:9.6px}`;

/** The sheet itself. `photo` is the image address (a file path or a data: address). */
export function sheetBody({ photo, EMAIL, PHONE, LINKEDIN, YOUTUBE }) {
  const contacts = contactList({ EMAIL, PHONE, LINKEDIN, YOUTUBE }).map((c) => ({ ...c, text: c.label }));
  return `<div class="page">
<header>
  <img class="ph" src="${photo}" alt="">
  <h1>${NAME}</h1>
  <div class="tag">${esc(tagline)}</div>
  <div class="head">${esc(headline[0])} <span>${esc(headline[1])}</span></div>
  <div class="contact">${contacts.map((c) => `<a href="${c.href}"><svg viewBox="0 0 24 24">${icons[c.key]}</svg>${esc(c.text)}</a>`).join('')}</div>
</header>
<div class="cols">
  <div class="main">
    <section><h2 class="eyebrow">Profile</h2><p class="lead">${esc(profile)}</p></section>
    <section class="panel exp"><h2 class="eyebrow">Experience</h2><ol class="tl">
      ${jobs.map((j) => `<li class="${j.end ? '' : 'now'}">
        <div class="when"><b>${j.start.slice(0, 4)} – ${j.end ? j.end.slice(0, 4) : 'Now'}</b><span>${dates(j)}</span><span>${esc(j.where)}</span>${j.end ? '' : '<span class="pill">Current</span>'}</div>
        <span class="dot"></span>
        <div><h3>${esc(j.role)}</h3><p class="org"><b>${esc(j.org)}</b> · ${esc(j.note)}</p>${j.tools?.length ? `<div class="tools">${j.tools.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
          ${j.groups.map((g) => `<div class="g">${g.k ? `<div class="k">${esc(g.k)}</div>` : ''}<ul>${g.points.map((p) => `<li>${kwHtml(p)}</li>`).join('')}</ul></div>`).join('')}
        </div></li>`).join('')}
    </ol></section>
    <section class="panel proj"><h2 class="eyebrow">Featured projects</h2><div class="projs">
      ${projects.map((p) => `<div class="pj${p.featured ? ' feat' : ''}">${p.featured ? `<span class="ft">${esc(p.featured)}</span>` : ''}<h3>${esc(p.name)} <span>${esc(p.type)}</span></h3><span class="r">${esc(p.role)}</span><p>${esc(p.body)}</p>${p.url ? `<a href="${p.url}">${esc(clean(p.url))} ↗</a>` : ''}${p.caseStudy ? `<a href="${SITE}${p.caseStudy}">See the full product design process ↗</a>` : ''}</div>`).join('')}
    </div></section>
  </div>
  <aside class="side">
    <section><h2 class="eyebrow">Core skills</h2>${skills.map((s) => `<div class="sk"><b>${esc(s.k)}</b><p>${s.v.map(esc).join(' · ')}</p></div>`).join('')}</section>
    <section><h2 class="eyebrow">What I bring</h2><ul>${brings.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></section>
    <section><h2 class="eyebrow">Education</h2><p><b>${esc(education.title)}</b><br>${esc(education.org)} · ${esc(education.year)}</p></section>
    <section class="lnk"><h2 class="eyebrow">Links</h2><a href="${SITE}">${clean(SITE)}</a>${projects.filter((p) => p.url && !p.url.includes('sidhantsardar')).map((p) => `<a href="${p.url}">${clean(p.url)} ↗</a>`).join('')}</section>
  </aside>
</div></div>`;
}
