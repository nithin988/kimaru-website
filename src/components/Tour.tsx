import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, Section, SectionHead, cn } from './ui';
import { Reveal } from './motion';
import { ScaledArt, WhatIfArt } from './ProductArt';

/* A guided tour of one decision. The screens are real pages of the master demo (synthetic data),
   with sensitive details shown as loading bars. The scenario test is drawn in code and shows results only. */

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

function MapFrame({ pins }: { pins: Pin[] }) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 whitespace-nowrap font-semibold text-foreground">Scenario test</span>
        <span className="ml-auto hidden text-[11px] sm:inline">Illustrative</span>
      </div>
      <div className="relative">
        <ScaledArt w={1000} h={558}><WhatIfArt /></ScaledArt>
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
    k: 'Compare', t: 'Two good options for one component, side by side.', line: 'When the data supports more than one sensible move, Kimaru shows both with their predicted outcome and confidence, and the owner chooses.',
    screen: { src: 'screens/uc-options.png', w: 1440, h: 1014, title: 'Recommendations', alt: 'Kimaru recommendations page with two options for one component' },
    pins: [{ x: 33, y: 40, t: 'Each option, in plain terms' }, { x: 61, y: 40, t: 'Predicted outcome and confidence for each' }, { x: 80, y: 40, t: 'Accept, ask the agent or defer, per option' }],
  },
  {
    k: 'Test', t: 'Test each option against what could go wrong.', line: 'Run the options through scenarios such as a longer delay or a demand spike, and see which one holds up.',
    pins: [{ x: 73.5, y: 14, t: 'The same decision, three scenarios' }, { x: 1.5, y: 31, t: 'Each option, with its outcome and confidence' }, { x: 1.5, y: 69, t: 'What it means for the call' }],
  },
  {
    k: 'Decide', t: 'The owner commits, with a record.', line: 'Each recommendation weighs stock, supply, capacity and margin together, and states the result it should deliver.',
    screen: { src: 'screens/uc-choose.png', w: 1440, h: 946, title: 'Recommendation', alt: 'Kimaru recommendation for one item with its predicted outcome and decision buttons' },
    pins: [{ x: 33, y: 40.5, t: 'A recommendation built from every factor, not a single rule' }, { x: 61, y: 40.5, t: 'The result it is expected to deliver' }, { x: 80.5, y: 40.5, t: 'Accept, ask the agent or defer' }],
  },
  {
    k: 'Ask why', t: 'Ask Kimaru why, in plain language.', line: 'The reasoning is laid out factor by factor, with the options that were compared and the result each would give.',
    screen: { src: 'screens/uc-agent.png', w: 1440, h: 900, title: 'Agent drawer', alt: 'Kimaru agent drawer explaining why a plan was recommended, with the options compared' },
    pins: [{ x: 62, y: 13, t: 'The recommendation under review' }, { x: 62, y: 29, t: 'Ask in plain language' }, { x: 62, y: 62, t: 'Every factor weighed, and the options compared' }],
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
          Follow a single production decision through Kimaru in seven screens. The demo uses synthetic data, and sensitive details are shown as loading bars.
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
