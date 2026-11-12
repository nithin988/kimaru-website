import type { ReactNode } from 'react';
import { ArrowRight, BookCheck, FileCheck2, Lock, UserCheck } from 'lucide-react';
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

/* Small illustrative artifacts, drawn in code. They show the kind of output, not real data. */
function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map((x, i) => (
        <span key={x} className="inline-flex items-center gap-1.5">
          <span className="rounded-md border border-border bg-card px-2 py-1 text-[11px] font-semibold text-primary">{x}</span>
          {i < items.length - 1 && <ArrowRight size={12} className="text-muted-foreground" />}
        </span>
      ))}
    </div>
  );
}

function MiniMap() {
  return (
    <svg viewBox="0 0 220 90" className="w-full" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" className="text-brand/40">
        <path d="M30 20 L100 45 M30 70 L100 45 M100 45 L190 45" />
      </g>
      {[[30, 20], [30, 70], [100, 45], [190, 45]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" className={i === 3 ? 'fill-active' : 'fill-card stroke-brand/50'} strokeWidth="1.5" />
      ))}
      <text x="145" y="38" textAnchor="middle" className="fill-primary text-[10px] font-bold">0.94</text>
    </svg>
  );
}

function MiniForecast() {
  return (
    <svg viewBox="0 0 220 90" className="w-full" aria-hidden="true">
      <path d="M8 70 C50 62 80 50 110 46 C140 42 170 30 212 18" fill="none" strokeWidth="2.4" className="stroke-active" />
      <path d="M110 46 C140 50 170 56 212 62" fill="none" strokeWidth="2" strokeDasharray="4 4" className="stroke-brand/55" />
      <line x1="110" y1="10" x2="110" y2="82" strokeWidth="1" className="stroke-border" />
      <text x="116" y="14" className="fill-muted-foreground text-[9px] font-semibold">Option A</text>
      <text x="116" y="80" className="fill-muted-foreground text-[9px] font-semibold">Option B</text>
    </svg>
  );
}

function MiniDecision() {
  return (
    <div className="rounded-lg border border-border bg-card p-2.5">
      <p className="text-[11px] font-semibold text-primary">Recommended: expedite the at-risk order</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">Approve</span>
        <span className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">Adjust</span>
        <span className="ml-auto text-[10px] font-semibold text-active">On record</span>
      </div>
    </div>
  );
}

const steps: Array<{ t: string; b: string; out: string; art: ReactNode }> = [
  { t: 'Get the data ready', b: 'We find where the facts live across ERP, planning tools and spreadsheets, then clean and connect them.', out: 'Trusted data', art: <Chips items={['ERP', 'Planning', 'Sheets', 'Clean']} /> },
  { t: 'Map the decision', b: 'We map the levers, outside factors and results, and put a value on how strongly each one moves the outcome.', out: 'A decision map', art: <MiniMap /> },
  { t: 'Forecast the options', b: 'We forecast demand, supply or cost and compare what happens under each option.', out: 'What-if comparisons', art: <MiniForecast /> },
  { t: 'Run the decision', b: 'Kimaru brings the options, your owner approves, and we track the result against a baseline.', out: 'A tracked decision', art: <MiniDecision /> },
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
              <div className="mt-4 grid min-h-[104px] place-items-center rounded-xl border border-border bg-panel p-3">{s.art}</div>
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
