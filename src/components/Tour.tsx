import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, Section, SectionHead, cn } from './ui';
import { Reveal } from './motion';
import { ScaledArt } from './ProductArt';

/* A guided tour of one decision. The screens are real pages of the master demo (synthetic data),
   with sensitive details shown as loading bars. The decision map is redrawn as a generic mind map. */

type Pin = { x: number; y: number; t: string };

function Pins({ pins }: { pins: Pin[] }) {
  return (
    <>
      {pins.map((p, n) => (
        <span
          key={p.t}
          className="pointer-events-none absolute z-10 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-active text-[13px] font-bold text-white shadow-[0_0_0_4px_rgba(0,128,128,0.2)]"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {n + 1}
        </span>
      ))}
    </>
  );
}

/* ---------- Generic decision map, drawn as a mind map ---------- */

const MW = 860;
const MH = 480;

type Leaf = { t: string; x: number; y: number; w: 'strong' | 'medium' | 'light' };
const actions: Leaf[] = [
  { t: 'Supplier choice', x: 24, y: 80, w: 'strong' },
  { t: 'Production sequence', x: 24, y: 192, w: 'strong' },
  { t: 'Safety stock', x: 24, y: 304, w: 'medium' },
];
const outside: Leaf[] = [
  { t: 'Customer demand', x: 646, y: 80, w: 'strong' },
  { t: 'Supplier lead times', x: 646, y: 192, w: 'medium' },
  { t: 'Disruptions', x: 646, y: 304, w: 'light' },
];
const between: Leaf[] = [
  { t: 'Component availability', x: 250, y: 398, w: 'strong' },
  { t: 'Line utilisation', x: 450, y: 398, w: 'medium' },
];
const LW = 190;
const LH = 52;
const sw = { strong: 4.5, medium: 2.8, light: 1.6 };
const C = { x: 430, y: 220 };

function MindMap() {
  const link = (from: [number, number], to: [number, number], w: Leaf['w'], color: string, dash?: boolean) => {
    const mx = (from[0] + to[0]) / 2;
    return <path key={`${from}-${to}`} d={`M${from[0]} ${from[1]} C ${mx} ${from[1]}, ${mx} ${to[1]}, ${to[0]} ${to[1]}`} stroke={color} strokeWidth={sw[w]} strokeLinecap="round" strokeDasharray={dash ? '2 7' : undefined} fill="none" opacity=".85" />;
  };
  const node = (l: Leaf, tone: string) => (
    <div key={l.t} className={cn('absolute flex items-center rounded-xl border bg-white px-4 text-[14px] font-semibold text-primary shadow-sm', tone)} style={{ left: l.x, top: l.y, width: LW, height: LH }}>
      {l.t}
    </div>
  );
  return (
    <div className="relative bg-[linear-gradient(160deg,#f5f7ff,#eef6ff_55%,#ecfeff)] text-primary" style={{ width: MW, height: MH, fontFamily: 'Inter, sans-serif' }}>
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <svg className="absolute inset-0" width={MW} height={MH} aria-hidden="true">
        {actions.map((l) => link([l.x + LW, l.y + LH / 2], [C.x - 100, C.y], l.w, '#008080'))}
        {outside.map((l) => link([l.x, l.y + LH / 2], [C.x + 100, C.y], l.w, '#253B7F'))}
        {between.map((l) => link([l.x + LW / 2, l.y], [C.x + (l.x < 400 ? -30 : 30), C.y + 36], l.w, '#64748b', true))}
      </svg>
      <p className="absolute m-0 text-[12px] font-bold uppercase tracking-[0.08em] text-active" style={{ left: 24, top: 46 }}>Actions you control</p>
      <p className="absolute m-0 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-brand" style={{ left: 646, top: 46, width: LW }}>Outside factors</p>
      <p className="absolute m-0 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-muted-foreground" style={{ left: 250, top: 372, width: 390 }}>What sits in between</p>
      {actions.map((l) => node(l, 'border-active/50'))}
      {outside.map((l) => node(l, 'border-brand/40'))}
      {between.map((l) => node(l, 'border-border'))}
      <div className="absolute grid place-items-center rounded-full bg-brand text-center text-white shadow-[0_18px_40px_-14px_rgba(37,59,127,0.6)]" style={{ left: C.x - 100, top: C.y - 44, width: 200, height: 88 }}>
        <div>
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">Outcome</p>
          <p className="m-0 text-[18px] font-extrabold leading-tight">On-time delivery</p>
        </div>
      </div>
      <div className="absolute flex items-center gap-2 rounded-xl border border-dashed border-ring bg-white/80 px-3 text-[12px] font-semibold text-muted-foreground" style={{ left: 646, top: 398, width: LW, height: LH + 8 }}>
        <Lock size={14} className="shrink-0" /> Rules, strengths and data sources: in a walkthrough
      </div>
      <div className="absolute flex items-center gap-4 text-[12px] font-semibold text-muted-foreground" style={{ left: 24, top: 446 }}>
        <span className="flex items-center gap-1.5"><span className="h-[4px] w-8 rounded bg-slate-500" /> Stronger influence</span>
        <span className="flex items-center gap-1.5"><span className="h-[2px] w-8 rounded bg-slate-500" /> Lighter influence</span>
      </div>
    </div>
  );
}

function MapFrame({ pins }: { pins: Pin[] }) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 whitespace-nowrap font-semibold text-foreground">Decision map</span>
        <span className="ml-auto hidden text-[11px] sm:inline">Illustrative</span>
      </div>
      <div className="relative">
        <ScaledArt w={MW} h={MH}><MindMap /></ScaledArt>
        <Pins pins={pins} />
      </div>
    </div>
  );
}

/* ---------- The tour ---------- */

type Step = { k: string; t: string; line: string; pins: Pin[]; screen?: { src: string; w: number; h: number; title: string; alt: string } };

const steps: Step[] = [
  {
    k: 'Understand', t: 'Every alert, with what it hits.', line: 'An alert lands in your work hub with its source, confidence and the items affected.',
    screen: { src: 'screens/uc-hub.png', w: 1440, h: 651, title: 'Work Hub', alt: 'Kimaru work hub listing alerts with the components they affect' },
    pins: [{ x: 5, y: 22, t: 'Your queue of alerts' }, { x: 53.4, y: 32, t: 'Items hit, with the delay' }, { x: 76.2, y: 32, t: 'The call to review' }],
  },
  {
    k: 'Compare', t: 'Everything at risk, side by side.', line: 'Stock, backlog, risk and confidence in one table, so the team sees where to act first.',
    screen: { src: 'screens/uc-compare.png', w: 1440, h: 745, title: 'Recommendations', alt: 'Kimaru recommendations table with stock, backlog, risk and confidence' },
    pins: [{ x: 40, y: 32, t: 'Stock against backlog' }, { x: 61, y: 32, t: 'Risk per item' }, { x: 83, y: 32, t: 'Accept or defer' }],
  },
  {
    k: 'See why', t: 'See what moves the outcome.', line: 'A simple map from your actions and outside factors to the outcome you care about.',
    pins: [{ x: 50, y: 46, t: 'The outcome you want to change' }, { x: 27, y: 38, t: 'Thicker lines move it more' }, { x: 81, y: 88, t: 'The modeling detail stays in the walkthrough' }],
  },
  {
    k: 'Decide', t: 'The owner commits, with a record.', line: 'Each recommendation weighs stock, supply, capacity and margin together, and states the result it should deliver.',
    screen: { src: 'screens/uc-choose.png', w: 1440, h: 946, title: 'Recommendation', alt: 'Kimaru recommendation for one item with its predicted outcome and decision buttons' },
    pins: [{ x: 33, y: 40.5, t: 'A recommendation built from every factor, not a single rule' }, { x: 61, y: 40.5, t: 'The result it is expected to deliver' }, { x: 80.5, y: 40.5, t: 'Accept, ask the agent or defer' }],
  },
  {
    k: 'Act', t: 'Send what you accepted where work happens.', line: 'Review accepted, adjusted and deferred choices, then push them to your systems.',
    screen: { src: 'screens/uc-act.png', w: 1440, h: 775, title: 'Review', alt: 'Kimaru review step listing accepted choices and where they go next' },
    pins: [{ x: 30.2, y: 20, t: 'What you accepted' }, { x: 5, y: 67, t: 'Where it goes next' }],
  },
  {
    k: 'Measure', t: 'Expected against actual, kept for next time.', line: 'Results are tracked against what was expected, so the next similar call starts smarter.',
    screen: { src: 'screens/uc-learn.png', w: 1440, h: 662, title: 'Decision Tracker', alt: 'Kimaru decision tracker showing expected against actual outcomes' },
    pins: [{ x: 6, y: 12, t: 'Outcome against baseline' }, { x: 6, y: 35, t: 'By product line, month by month' }],
  },
];

export function TourHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative pb-10 pt-12 lg:pt-20">
        <Eyebrow className="rise rise-1">Product tour</Eyebrow>
        <h1 className="rise rise-2 mt-4 max-w-[16em] text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
          One decision, <span className="grad-text">from alert to result.</span>
        </h1>
        <p className="rise rise-3 mt-5 max-w-[36em] text-lg leading-relaxed text-muted-foreground">
          Follow a single production decision through Kimaru in six screens. The demo uses synthetic data, and sensitive details are shown as loading bars.
        </p>
        <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
          <Button href="#tour" size="lg">Start the tour <ArrowRight /></Button>
          <Button href={BOOK_URL} variant="outline" size="lg">Book a Decision Walkthrough</Button>
        </div>
      </Container>
    </div>
  );
}

export function TourStage() {
  const [i, setI] = useState(0);
  const s = steps[i];
  let shot: ReactNode;
  if (s.screen) {
    const sc = s.screen;
    shot = (
      <BrowserFrame src={sc.src} alt={sc.alt} title={sc.title} aspect={`${sc.w} / ${sc.h}`}>
        <Pins pins={s.pins} />
      </BrowserFrame>
    );
  } else {
    shot = <MapFrame pins={s.pins} />;
  }
  return (
    <Section id="tour">
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-panel px-5 py-3.5 text-[15px]">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Scenario</span>
        <span className="text-foreground">A typhoon threatens component supply. Which orders can we still promise, and what do we do about the rest?</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ol className="m-0 flex list-none gap-2 overflow-x-auto p-0 lg:grid lg:content-start lg:gap-2 lg:overflow-visible">
          {steps.map((x, n) => (
            <li key={x.k} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => setI(n)}
                aria-current={n === i ? 'step' : undefined}
                className={cn('flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors', n === i ? 'border-brand bg-brand-soft' : 'border-border bg-card hover:bg-panel')}
              >
                <span className={cn('grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-bold', n === i ? 'bg-brand text-white' : 'bg-slate-100 text-muted-foreground')}>{n + 1}</span>
                <span className="text-[15px] font-bold text-primary">{x.k}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="min-w-0">
          <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold leading-tight text-primary">{s.t}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.line}</p>
          <Reveal key={s.k}>
            <div className="mt-5">{shot}</div>
          </Reveal>
          <ul className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-3">
            {s.pins.map((p, n) => (
              <li key={p.t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-[14px] leading-snug text-foreground">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-active text-[12px] font-bold text-white">{n + 1}</span>
                {p.t}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between">
            <Button href="#tour" variant="outline" className={i === 0 ? 'pointer-events-none opacity-40' : ''} onClick={(e) => { e.preventDefault(); setI(Math.max(0, i - 1)); }}>Back</Button>
            {i < steps.length - 1 ? (
              <Button href="#tour" onClick={(e) => { e.preventDefault(); setI(i + 1); }}>Next: {steps[i + 1].k} <ArrowRight /></Button>
            ) : (
              <Button href={BOOK_URL}>Book a Decision Walkthrough <ArrowRight /></Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

const locked = ['Data connections', 'Model logic and strengths', 'Rules and thresholds', 'Agent behaviour'];

export function Behind() {
  return (
    <Section id="behind" tone="alt">
      <SectionHead eyebrow="Behind the screens" title="The detail is shown in a walkthrough." body="This tour shows what your team sees and does. How the decision is modeled for your operation is covered live, with your own data and rules." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {locked.map((t, n) => (
          <Reveal key={t} delay={n * 70} className="h-full">
            <div className="lift flex h-full items-center gap-3 rounded-2xl border border-dashed border-ring bg-card p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Lock size={18} /></span>
              <span className="text-[15px] font-semibold leading-snug text-primary">{t}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button href={BOOK_URL} size="lg">Book a Decision Walkthrough <ArrowRight /></Button>
        <span className="flex items-center gap-2 text-sm text-muted-foreground"><Check size={16} className="text-active" /> Bring one decision. We outline the pilot with you.</span>
      </div>
    </Section>
  );
}
