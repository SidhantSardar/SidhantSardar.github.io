// All motion for the site: the design-to-code hero and the micro-interactions.
// Everything is visible without JS; animations only start once this runs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));

/* ---------- hero: hover pulls the layers apart ---------- */
function hero() {
  const stage = $('#stage');
  const stack = $('#stack');
  if (!stage || !stack) return;
  const layers = $$('.layer', stack);

  // Cards are held like a hand of playing cards: they pivot from a point below the hand
  // and fan out on hover, so each card's corner label (01–04) stays readable.
  const small = matchMedia('(max-width: 900px)').matches;
  const pos = (i: number, isOpen: boolean) => {
    const k = i - 1.5;
    return isOpen
      ? { rotation: k * (small ? 9 : 11), x: k * (small ? 24 : 40), y: Math.abs(k) * (small ? 6 : 10) }
      : { rotation: k * 2.5, x: k * 3, y: 0 };
  };
  gsap.set(layers, { transformOrigin: '50% 150%' });
  layers.forEach((l, i) => gsap.set(l, { ...pos(i, false), zIndex: i }));
  if (reduce) return;

  let open = false;
  let current = -1;

  // The hovered card lifts up in place. It keeps its place in the hand (no jump to the front);
  // the cards beside it make room, and the ones lying over it turn see-through.
  const focus = (n: number) => {
    if (n === current) return;
    current = n;
    const lift = small ? 26 : 40;
    const room = small ? 40 : 84;
    layers.forEach((l, i) => {
      l.classList.toggle('focus', i === n);
      const p = pos(i, open);
      const side = n < 0 ? 0 : Math.sign(i - n);
      gsap.to(l, {
        rotation: p.rotation + side * 3,
        x: p.x + (side > 0 ? room : side < 0 ? -room * 0.6 : 0),
        y: p.y - (i === n ? lift : 0),
        scale: i === n ? 1.03 : 1,
        opacity: n >= 0 && i > n ? 0.38 : 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  };

  // Little moments inside each layer as it separates.
  const playContents = () => {
    gsap.fromTo($$('.cols i', layers[0]), { scaleY: 0.2 }, { scaleY: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', overwrite: true });
    gsap.fromTo($$('.w, .dim', layers[1]), { scale: 0.85, autoAlpha: 0, transformOrigin: 'top left' }, { scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out', overwrite: true });
    gsap.fromTo($$('.u', layers[2]), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05, delay: 0.1, ease: 'power2.out', overwrite: true });
    gsap.fromTo($$('.cl', layers[3]), { x: -10, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.35, stagger: 0.06, delay: 0.15, ease: 'power2.out', overwrite: true });
  };

  const setOpen = (v: boolean) => {
    if (open === v) return;
    open = v;
    current = -1;
    layers.forEach((l, i) => {
      l.classList.remove('focus');
      gsap.to(l, { ...pos(i, v), scale: 1, opacity: 1, duration: 0.8, ease: v ? 'back.out(1.4)' : 'power3.inOut', delay: v ? i * 0.05 : (3 - i) * 0.03, overwrite: 'auto' });
    });
    stage.classList.toggle('is-open', v);
    if (v) {
      idle.pause();
      gsap.to(layers, { yPercent: 0, duration: 0.3, overwrite: false });
      playContents();
    } else {
      gsap.delayedCall(1.4, () => { if (!open) idle.restart(); });
    }
  };

  // Intro: the cards are dealt in one by one.
  gsap.from(layers, { y: 160, x: -60, rotation: -20, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 });

  // Idle hint: while the hand is closed, each card pops up a little in turn and settles back.
  // It animates yPercent, so it never fights the y used by the fan and the hover lift.
  const idle = gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 2.2 });
  layers.forEach((l, i) => {
    idle.to(l, { yPercent: -4.5, duration: 0.55, ease: 'sine.out' }, i * 0.22)
      .to(l, { yPercent: 0, duration: 0.8, ease: 'sine.inOut' }, i * 0.22 + 0.55);
  });

  stage.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') setOpen(true); });
  stage.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') setOpen(false); });
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); }
    if (open && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); focus(Math.max(0, Math.min(3, current + (e.key === 'ArrowRight' ? 1 : -1)))); }
  });

  // Which card is under the pointer is decided by fixed zones across the hand, not by the
  // card's own (moving) outline, so sliding from card to card never flickers.
  const zoneAt = (clientX: number) => {
    const r = stack.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const zone = r.width * 0.42;
    return Math.max(0, Math.min(3, Math.round((clientX - cx) / zone + 1.5)));
  };
  stage.addEventListener('pointermove', (e) => { if (open && e.pointerType === 'mouse') focus(zoneAt(e.clientX)); });
  stage.addEventListener('click', (e) => {
    if (!open) { setOpen(true); if (!finePointer) setTimeout(() => focus(zoneAt(e.clientX)), 350); return; }
    if (!finePointer) focus(zoneAt(e.clientX));
  });

  // Pointer tilt on top of the open/close motion.
  if (finePointer) {
    const rx = gsap.quickTo(stack, 'rotationX', { duration: 0.7, ease: 'power3' });
    const ry = gsap.quickTo(stack, 'rotationY', { duration: 0.7, ease: 'power3' });
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    stage.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }
}

/* ---------- text: headings rise in word by word ---------- */
function splitWords(el: Element) {
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      (node.textContent || '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(document.createTextNode(part)); return; }
        const outer = document.createElement('span');
        outer.className = 'split-w';
        const inner = document.createElement('span');
        inner.textContent = part;
        outer.append(inner);
        frag.append(outer);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      splitWords(node as Element);
    }
  });
}

function headings() {
  $$('[data-split]').forEach((el) => {
    splitWords(el);
    gsap.from($$('.split-w > span', el), {
      yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/* ---------- generic reveals ---------- */
function reveals() {
  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  $$('[data-stagger]').forEach((el) => {
    gsap.from(Array.from(el.children), { autoAlpha: 0, y: 16, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  $$('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.2, ease: 'power2.out', onUpdate: () => (el.textContent = String(Math.round(o.v))), scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  // Spec labels "type" in.
  $$('.spec').forEach((el) => {
    gsap.from(el, { clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'steps(24)', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}

/* ---------- measurements draw themselves ---------- */
function measurements() {
  $$('.gap').forEach((el) => {
    const label = $('span', el)!;
    const to = Number(label.textContent);
    const o = { v: 0 };
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
      .fromTo(el, { '--draw': 0 }, { '--draw': 1, duration: 0.8, ease: 'power2.out' })
      .to(o, { v: to, duration: 0.8, ease: 'power2.out', onUpdate: () => (label.textContent = String(Math.round(o.v))) }, 0);
  });
  $$('.measure-x').forEach((el) => {
    gsap.from(el, { scaleX: 0, duration: 0.9, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  $$('[data-portrait]').forEach((el) => {
    gsap.from($('img', el), { clipPath: 'inset(100% 0 0 0)', scale: 1.08, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
  });
}

/* ---------- websites: browser frames build in, tilt on hover ---------- */
function websites() {
  $$('.browser').forEach((b) => {
    gsap.from($$('.shot', b), { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: b, start: 'top 80%', once: true } });
  });
  if (!finePointer) return;
  $$('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 1200 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

/* ---------- web app pipeline: data flows Register → Monitor ---------- */
function pipeline() {
  const p = $('#pipeline');
  if (!p) return;
  const pipes = $$('.pipe', p);
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, paused: true });
  pipes.forEach((pipe, i) => {
    tl.call(() => pipes.forEach((x, j) => x.classList.toggle('on', j === i)));
    const dot = $('.flowdot', pipe);
    if (dot && i < pipes.length - 1) {
      const w = pipe.getBoundingClientRect().width - 56;
      tl.fromTo(dot, { x: 0, opacity: 1 }, { x: Math.max(0, w), opacity: 1, duration: 0.9, ease: 'power1.inOut' })
        .set(dot, { opacity: 0 });
    } else {
      tl.to({}, { duration: 0.9 });
    }
  });
  ScrollTrigger.create({ trigger: p, start: 'top 85%', end: 'bottom top', onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });
}

/* ---------- diagrams on portfolio pages ---------- */
function diagrams() {
  $$('[data-releases]').forEach((el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    tl.fromTo($('.progress', el), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' })
      .from($$('.rel', el), { autoAlpha: 0, y: 10, stagger: 0.18, duration: 0.5 }, 0.1);
  });
  $$('.flow').forEach((el) => {
    gsap.from(Array.from(el.children), { autoAlpha: 0, x: -14, stagger: 0.09, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  $$('.fig .mock, .fig .wire, .case-grid .case').forEach((el) => {
    const parts = $$('.m-card, .m-tile, .m-tr, .m-bub, .m-chips, .m-field, .m-acc, .m-banner, .m-steps, .m-btn, .m-bars i, .ann, .box, .ln', el);
    gsap.from(parts, { autoAlpha: 0, y: 6, stagger: 0.025, duration: 0.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  $$('.callouts > div').forEach((el, i) => {
    gsap.from(el, { autoAlpha: 0, y: 14, duration: 0.6, delay: (i % 3) * 0.08, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}


/* ---------- Figma prototype wires: hotspot → next frame ---------- */
function protoWires() {
  const NS = 'http://www.w3.org/2000/svg';
  $$('[data-proto]').forEach((proto) => {
    const svg = $<SVGSVGElement>('.proto-wires', proto)!;
    const frames = $$('.pframe', proto);
    const condIdx = proto.dataset.conditional === '' ? -1 : Number(proto.dataset.conditional);
    const logic = proto.closest('.proto-logic')?.querySelector<HTMLElement>('.logic') ?? null;
    let drawn = false;
    let pulses: gsap.core.Tween[] = [];

    // The conditional panel is a popover: it appears only while the ⑂ node is hovered,
    // or stays open after a click, just like Figma's interaction details.
    let hideTimer = 0;
    let pinned = false;
    let currentNode: HTMLButtonElement | null = null;
    if (logic) {
      logic.classList.add('pop');
      logic.setAttribute('role', 'dialog');
      logic.setAttribute('aria-label', 'Conditional logic');
      proto.append(logic);
      logic.addEventListener('pointerenter', () => clearTimeout(hideTimer));
      logic.addEventListener('pointerleave', () => { if (!pinned) hideSoon(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(true); });
      document.addEventListener('click', (e) => { if (pinned && !logic.contains(e.target as Node) && e.target !== currentNode && !currentNode?.contains(e.target as Node)) hide(true); });
    }
    const show = () => { clearTimeout(hideTimer); logic?.classList.add('show'); currentNode?.setAttribute('aria-expanded', 'true'); };
    const hide = (force = false) => { if (pinned && !force) return; pinned = false; logic?.classList.remove('show'); currentNode?.setAttribute('aria-expanded', 'false'); };
    const hideSoon = () => { clearTimeout(hideTimer); hideTimer = window.setTimeout(() => hide(), 220); };
    const attachLogic = (node: HTMLButtonElement, mid: DOMPoint, width: number) => {
      currentNode = node;
      const w = Math.min(400, width);
      const left = Math.max(0, Math.min(width - w, mid.x - 44));
      logic!.style.width = w + 'px';
      logic!.style.left = left + 'px';
      logic!.style.top = mid.y + 28 + 'px';
      logic!.style.setProperty('--arrow-x', mid.x - left - 7 + 'px');
      if (logic!.classList.contains('show')) node.setAttribute('aria-expanded', 'true');
      node.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(); });
      node.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !pinned) hideSoon(); });
      node.addEventListener('click', (e) => { e.stopPropagation(); if (pinned) { hide(true); } else { pinned = true; show(); } });
    };

    const draw = () => {
      pulses.forEach((p) => p.kill());
      pulses = [];
      svg.innerHTML = '';
      $$('.cond-node', proto).forEach((n) => n.remove());
      const box = proto.getBoundingClientRect();
      svg.setAttribute('width', String(box.width));
      svg.setAttribute('height', String(box.height));
      const wires: { path: SVGPathElement; head: SVGPathElement; dot: SVGCircleElement; to: HTMLElement }[] = [];

      frames.forEach((f, i) => {
        const hs = $('.hotspot', f);
        const next = frames[i + 1];
        if (!hs || !next) return;
        // Pin the hotspot to the real element it stands for (e.g. the Continue button).
        const body = $('.pframe-body', f)!.getBoundingClientRect();
        const target = f.dataset.hot ? $(f.dataset.hot, f) : null;
        if (target) {
          const r = target.getBoundingClientRect();
          hs.style.left = r.left - body.left + r.width * 0.5 + 'px';
          hs.style.top = r.top - body.top + r.height * 0.5 + 'px';
          target.classList.add('is-hot');
        }
        const h = hs.getBoundingClientRect();
        const t = $('.pframe-body', next)!.getBoundingClientRect();
        const a = { x: h.left - box.left, y: h.top - box.top };
        const across = t.left - box.left > a.x + 10;
        let d: string, head: string;
        if (across) {
          const e = { x: t.left - box.left - 2, y: t.top - box.top + t.height * 0.42 };
          const dx = Math.max(40, (e.x - a.x) * 0.5);
          d = `M${a.x},${a.y} C${a.x + dx},${a.y} ${e.x - 8 - dx},${e.y} ${e.x - 8},${e.y}`;
          head = `M${e.x},${e.y} L${e.x - 9},${e.y - 5.5} L${e.x - 9},${e.y + 5.5}Z`;
        } else {
          const e = { x: t.left - box.left + t.width * 0.5, y: t.top - box.top - 2 };
          const dy = Math.max(40, (e.y - a.y) * 0.5);
          d = `M${a.x},${a.y} C${a.x},${a.y + dy} ${e.x},${e.y - 8 - dy} ${e.x},${e.y - 8}`;
          head = `M${e.x},${e.y} L${e.x - 5.5},${e.y - 9} L${e.x + 5.5},${e.y - 9}Z`;
        }
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', 'wire');
        const hd = document.createElementNS(NS, 'path');
        hd.setAttribute('d', head);
        hd.setAttribute('class', 'head');
        const dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('r', '4');
        dot.setAttribute('class', 'pulse');
        dot.style.opacity = '0';
        svg.append(path, hd, dot);
        wires.push({ path, head: hd, dot, to: next });

        if (i === condIdx) {
          const mid = path.getPointAtLength(path.getTotalLength() / 2);
          const node = document.createElement('button');
          node.className = 'cond-node';
          node.type = 'button';
          node.setAttribute('aria-label', 'Show the conditional logic on this link');
          node.setAttribute('aria-expanded', 'false');
          node.style.left = mid.x + 'px';
          node.style.top = mid.y + 'px';
          node.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 12h7M10 12l8-6M10 12l8 6"/></svg>';
          proto.append(node);
          if (logic) attachLogic(node, mid, box.width);
        }
      });
      return wires;
    };

    const runPulses = (wires: ReturnType<typeof draw>) => {
      if (reduce) return;
      wires.forEach((w, i) => {
        const len = w.path.getTotalLength();
        const o = { p: 0 };
        pulses.push(gsap.to(o, {
          p: 1, duration: 1.6, ease: 'power1.inOut', repeat: -1, repeatDelay: 1.2 + wires.length * 0.4, delay: i * 0.9,
          onStart: () => { w.dot.style.opacity = '1'; },
          onUpdate: () => {
            const pt = w.path.getPointAtLength(o.p * len);
            w.dot.setAttribute('cx', String(pt.x));
            w.dot.setAttribute('cy', String(pt.y));
            w.dot.style.opacity = o.p > 0.94 ? String((1 - o.p) / 0.06) : '1';
          },
          onRepeat: () => { w.to.classList.add('target'); setTimeout(() => w.to.classList.remove('target'), 700); },
        }));
      });
    };

    const reveal = () => {
      const wires = draw();
      proto.classList.add('in-view');
      if (reduce) return;
      wires.forEach((w, i) => {
        const len = w.path.getTotalLength();
        gsap.fromTo(w.path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', delay: 0.3 + i * 0.35 });
        gsap.fromTo(w.head, { opacity: 0 }, { opacity: 1, duration: 0.2, delay: 1.2 + i * 0.35 });
      });
      gsap.from($$('.cond-node', proto), { scale: 0, duration: 0.5, ease: 'back.out(2)', delay: 1.2 });
      gsap.delayedCall(1.6, () => runPulses(wires));
      drawn = true;
    };

    ScrollTrigger.create({ trigger: proto, start: 'top 75%', once: true, onEnter: reveal });
    new ResizeObserver(() => { if (drawn) runPulses(draw()); }).observe(proto);
  });
}

/* ---------- small things ---------- */
function magnetic() {
  if (!finePointer) return;
  $$('.magnetic').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

function cursor() {
  if (!finePointer) return;
  const c = document.createElement('div');
  c.className = 'cursor';
  c.setAttribute('aria-hidden', 'true');
  c.innerHTML = '<span></span>';
  document.body.append(c);
  const label = c.firstElementChild as HTMLElement;
  const x = gsap.quickTo(c, 'x', { duration: 0.25, ease: 'power3' });
  const y = gsap.quickTo(c, 'y', { duration: 0.25, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    document.body.classList.add('has-cursor');
    x(e.clientX); y(e.clientY);
    label.textContent = `x ${Math.round(e.clientX)} · y ${Math.round(e.clientY + scrollY)}`;
  });
  document.addEventListener('pointerleave', () => document.body.classList.remove('has-cursor'));
}

function nav() {
  const n = $('nav');
  if (!n) return;
  let last = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    n.classList.toggle('away', y > last && y > 200);
    last = y;
  }, { passive: true });
}

hero();
if (!reduce) {
  headings();
  reveals();
  measurements();
  websites();
  pipeline();
  diagrams();
  magnetic();
  cursor();
  nav();
}
protoWires(); // wires draw for everyone; only the motion respects reduced-motion
addEventListener('load', () => ScrollTrigger.refresh());
