import type { ReactNode } from 'react';
import { ArrowRight, BookCheck, Check, FileCheck2, Lock, UserCheck } from 'lucide-react';
import { BOOK_URL, Button, Eyebrow, Section, cn } from './ui';
import { Reveal } from './motion';

/** Soft decision-map pattern for section backgrounds. Decorative, no data. */
export function NetworkBackdrop({ className }: { className?: string }) {
  const nodes: Array<[number, number]> = [[60, 80], [200, 40], [200, 150], [350, 90], [350, 190], [500, 60], [500, 140], [650, 100]];
  const links: Array<[number, number]> = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 6], [5, 7], [6, 7]];
  return (
    <svg className={cn('pointer-events-none absolute', className)} viewBox="0 0 700 230" fill="none" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" className="text-brand/25" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="fill-card stroke-brand/30" strokeWidth="1.2" />
          <circle cx={x} cy={y} r="3.5" className={i % 3 === 0 ? 'fill-active' : 'fill-brand/50'} />
        </g>
      ))}
    </svg>
  );
}

/* Illustrative artifacts, drawn in code so they stay sharp. They show the kind of output, not real data. */
function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid h-[168px] place-items-center overflow-hidden rounded-xl border border-border bg-[linear-gradient(135deg,var(--color-panel),#eef2ff_60%,#ecfeff)] p-3">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative w-full">{children}</div>
    </div>
  );
}

function DataArt() {
  const src = ['ERP', 'Planning', 'Spreadsheets'];
  return (
    <div className="flex items-center gap-2">
      <div className="grid w-[86px] shrink-0 gap-1.5">
        {src.map((x) => (
          <span key={x} className="rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] font-semibold text-primary shadow-sm">{x}</span>
        ))}
      </div>
      <svg viewBox="0 0 50 70" className="h-14 w-7 shrink-0 text-brand/50" fill="none" aria-hidden="true">
        <path d="M2 10 C25 10 25 35 48 35 M2 35 L48 35 M2 60 C25 60 25 35 48 35" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 4" />
      </svg>
      <div className="min-w-0 flex-1 rounded-lg border border-active/40 bg-card p-2.5 shadow-sm">
        <p className="flex items-center gap-1 text-[11px] font-bold text-active"><Check size={13} className="shrink-0" /> Clean data</p>
        <div className="mt-1.5 grid gap-1">
          {[78, 64, 70].map((w, i) => <span key={i} className="block h-1.5 rounded-full bg-brand/20" style={{ width: `${w}%` }} />)}
        </div>
      </div>
    </div>
  );
}

function MapArt() {
  const left: Array<[number, number]> = [[26, 30], [26, 84], [26, 138]];
  return (
    <svg viewBox="0 0 260 168" className="mx-auto h-[148px] w-full" aria-hidden="true">
      {left.map(([x, y], i) => (
        <path key={i} d={`M${x + 10} ${y} C100 ${y} 100 84 128 84`} fill="none" strokeWidth={i === 1 ? 3 : 1.6} className="stroke-brand/40" />
      ))}
      <path d="M138 84 L228 84" strokeWidth="3.4" className="stroke-active" />
      {left.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" strokeWidth="1.6" className="fill-card stroke-brand/55" />
      ))}
      <circle cx="132" cy="84" r="11" strokeWidth="1.8" className="fill-card stroke-brand/60" />
      <circle cx="236" cy="84" r="13" className="fill-active" />
      <rect x="160" y="58" width="42" height="18" rx="9" className="fill-card stroke-active" strokeWidth="1.2" />
      <text x="181" y="70.5" textAnchor="middle" className="fill-primary text-[11px] font-bold">0.94</text>
      <text x="26" y="12" textAnchor="middle" className="fill-muted-foreground text-[9px] font-semibold">Levers</text>
      <text x="236" y="112" textAnchor="middle" className="fill-muted-foreground text-[9px] font-semibold">Outcome</text>
    </svg>
  );
}

function ForecastArt() {
  return (
    <svg viewBox="0 0 260 168" className="mx-auto h-[148px] w-full" aria-hidden="true">
      <defs>
        <linearGradient id="fa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#008080" stopOpacity=".28" />
          <stop offset="1" stopColor="#008080" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120].map((y) => <line key={y} x1="14" y1={y} x2="250" y2={y} className="stroke-border" strokeWidth="1" />)}
      <path d="M14 128 C50 118 80 104 120 92 L120 140 L14 140 Z" fill="url(#fa)" />
      <path d="M14 128 C50 118 80 104 120 92" fill="none" strokeWidth="3" className="stroke-brand" />
      <path d="M120 92 C160 76 200 50 250 34" fill="none" strokeWidth="3" className="stroke-active" />
      <path d="M120 92 C160 100 200 114 250 124" fill="none" strokeWidth="2.4" strokeDasharray="5 5" className="stroke-brand/50" />
      <line x1="120" y1="20" x2="120" y2="146" strokeWidth="1" strokeDasharray="2 3" className="stroke-brand/50" />
      <circle cx="120" cy="92" r="4.5" className="fill-card stroke-brand" strokeWidth="2" />
      <text x="244" y="28" textAnchor="end" className="fill-active text-[10px] font-bold">Option A</text>
      <text x="244" y="142" textAnchor="end" className="fill-muted-foreground text-[10px] font-bold">Option B</text>
      <text x="114" y="158" textAnchor="end" className="fill-muted-foreground text-[9px] font-semibold">Today</text>
    </svg>
  );
}

function DecisionArt() {
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Recommendation</p>
        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-active">94% sure</span>
      </div>
      <p className="mt-1.5 text-[13px] font-bold leading-snug text-primary">Expedite the at-risk order</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-md bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">Approve</span>
        <span className="rounded-md border border-border px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">Adjust</span>
      </div>
    </div>
  );
}

const steps: Array<{ t: string; b: string; out: string; art: ReactNode }> = [
  { t: 'Get the data ready', b: 'We find where the facts live across ERP, planning tools and spreadsheets, then clean and connect them.', out: 'Trusted data', art: <DataArt /> },
  { t: 'Map the decision', b: 'We map the levers, outside factors and results, and put a value on how strongly each one moves the outcome.', out: 'A decision map', art: <MapArt /> },
  { t: 'Forecast the options', b: 'We forecast demand, supply or cost and compare what happens under each option.', out: 'What-if comparisons', art: <ForecastArt /> },
  { t: 'Run the decision', b: 'Kimaru brings the options, your owner approves, and we track the result against a baseline.', out: 'A tracked decision', art: <DecisionArt /> },
];

/** Decisions as a Service as one connected flow. */
export function DaasFlow() {
  return (
    <Section id="services">
      <div className="mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow>Decisions as a Service</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] text-primary">Not ready for a platform? Start with the groundwork.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Four steps, used on their own or in order. We agree the scope and the owner for each decision, and you can move onto the platform whenever you are ready.</p>
        </Reveal>
      </div>
      <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s, n) => (
          <Reveal as="li" key={s.t} delay={n * 100} className="h-full min-w-0">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-brand text-[15px] font-bold text-white">{n + 1}</span>
                <h3 className="text-lg font-extrabold leading-tight text-primary">{s.t}</h3>
              </div>
              <div className="mt-4"><Stage>{s.art}</Stage></div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{s.b}</p>
              <p className="mt-auto pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">You get </span>
                <span className="ml-1 inline-flex rounded-full border border-active/40 bg-teal-50 px-3 py-1 text-[13px] font-semibold text-active">{s.out}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-active bg-teal-50 px-6 py-5">
          <b className="text-base text-primary">Not sure which step fits?</b>
          <span className="text-[15px] text-muted-foreground">Describe the decision and we will suggest where to start.</span>
          <Button href={BOOK_URL} className="ml-auto">
            Book a walkthrough <ArrowRight />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

const trust = [
  { icon: FileCheck2, t: 'A record of every decision', b: 'The options, the reasoning, who approved it and what happened.' },
  { icon: UserCheck, t: 'People stay in charge', b: 'Kimaru recommends. The owner approves, adjusts or escalates.' },
  { icon: BookCheck, t: 'Learns from results', b: 'Outcomes are measured against a baseline and feed the next decision.' },
  { icon: Lock, t: 'Works beside your systems', b: 'No rip and replace. A first pilot can run from files.' },
];

export function GovernStrip() {
  return (
    <Section id="govern" tone="alt">
      <div className="mb-8 max-w-3xl">
        <Reveal>
          <Eyebrow>Built for accountable decisions</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1.1] text-primary">Whichever way you start, every decision is explained and on record.</h2>
        </Reveal>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 80} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                <I size={19} />
              </span>
              <h3 className="mt-3 text-base font-bold text-primary">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
