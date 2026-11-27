import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Check, Gauge, Target, Waypoints } from 'lucide-react';
import { Button, Eyebrow, Section, cn } from './ui';
import { Reveal } from './motion';
import { NetworkBackdrop } from './Flow';

type Driver = { name: string; kind: 'Action' | 'Outside factor'; share: number };
type Outcome = { id: string; label: string; blurb: string; evidence: string; drivers: Driver[] };

// Illustrative values on synthetic data. Share is each factor's part of the influence on the outcome, summing to 100%.
const outcomes: Outcome[] = [
  {
    id: 'otd', label: 'On-time delivery', blurb: 'Share of customer orders shipped on or before the committed date.', evidence: 'Evidence: strong',
    drivers: [
      { name: 'Supplier choice', kind: 'Action', share: 31 },
      { name: 'Production sequence', kind: 'Action', share: 24 },
      { name: 'Customer demand', kind: 'Outside factor', share: 18 },
      { name: 'Supplier lead times', kind: 'Outside factor', share: 15 },
      { name: 'Safety stock', kind: 'Action', share: 12 },
    ],
  },
  {
    id: 'cod', label: 'Cost of delay', blurb: 'Penalties, expedites and lost margin when an order ships late.', evidence: 'Evidence: good',
    drivers: [
      { name: 'Supplier lead times', kind: 'Outside factor', share: 34 },
      { name: 'Expedite choice', kind: 'Action', share: 22 },
      { name: 'Production sequence', kind: 'Action', share: 20 },
      { name: 'Customer demand', kind: 'Outside factor', share: 14 },
      { name: 'Safety stock', kind: 'Action', share: 10 },
    ],
  },
];

function PanelFrame({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-semibold text-foreground">{title}</span>
        <span className="ml-auto hidden text-[11px] sm:inline">{note}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-7">{children}</div>
    </div>
  );
}

function Segmented({ items, value, onChange, label }: { items: Array<{ id: string; t: string }>; value: string; onChange: (id: string) => void; label: string }) {
  return (
    <div className="inline-flex w-fit flex-wrap gap-1 rounded-lg bg-secondary p-1" role="tablist" aria-label={label}>
      {items.map((x) => (
        <button key={x.id} role="tab" aria-selected={x.id === value} onClick={() => onChange(x.id)} className={cn('rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors', x.id === value ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-primary')}>
          {x.t}
        </button>
      ))}
    </div>
  );
}

/** What moves an outcome, as a ranked share of influence. Values are illustrative. */
export function ImpactExplorer() {
  const [id, setId] = useState('otd');
  const o = outcomes.find((x) => x.id === id)!;
  const top = Math.max(...o.drivers.map((d) => d.share));
  return (
    <PanelFrame title="What moves the outcome" note="Synthetic demo data">
      <Segmented label="Outcome" value={id} onChange={setId} items={outcomes.map((x) => ({ id: x.id, t: x.label }))} />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 max-w-[26em] text-sm leading-snug text-muted-foreground">{o.blurb}</p>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-active">{o.evidence}</span>
      </div>
      <p className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">Share of influence</p>
      <ul key={o.id} className="fade-in m-0 grid list-none gap-5 p-0">
        {o.drivers.map((d, n) => (
          <li key={d.name} className="grid items-center gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1.3fr)_44px]">
            <div className="min-w-0">
              <p className="m-0 text-[15px] font-semibold leading-tight text-primary">{d.name}</p>
              <p className="m-0 mt-0.5 text-xs text-muted-foreground">{d.kind}</p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
              <div className={cn('h-full rounded-full', n === 0 ? 'bg-active' : n < 3 ? 'bg-teal-600/80' : 'bg-teal-600/55')} style={{ width: `${(d.share / top) * 100}%` }} />
            </div>
            <p className="m-0 text-right text-[17px] font-bold tabular-nums text-primary">{d.share}%</p>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 text-xs leading-relaxed text-muted-foreground">Ranked by share of influence on the outcome. Illustrative values on synthetic data.</p>
    </PanelFrame>
  );
}

const scenarios = [
  { id: 'base', t: 'Base case', d: 'Delay as forecast' },
  { id: 'long', t: 'Longer delay', d: 'Port closed 9 days' },
  { id: 'spike', t: 'Demand spike', d: 'Orders up 15%' },
];
const options = [
  { k: 'A', t: 'Air-freight plan', d: 'Hold dates, build on Line 2', rec: true, risk: [36, 41, 45], net: ['+$52K', '+$44K', '+$39K'], conf: [94, 91, 90] },
  { k: 'B', t: 'Split air and sea', d: 'Lower cost, higher risk', rec: false, risk: [48, 62, 54], net: ['+$21K', '+$6K', '+$14K'], conf: [88, 79, 83] },
];
const readouts = [
  'Option A cuts the risk furthest and costs more up front.',
  'Option B climbs to 62% if the closure runs 9 days. Choose B only if the sea leg is confirmed.',
  'Both hold below 55%, and A keeps the larger margin.',
];
const riskTone = (v: number) => (v <= 45 ? 'text-active' : v <= 55 ? 'text-amber-600' : 'text-destructive');
const riskBar = (v: number) => (v <= 45 ? 'bg-active' : v <= 55 ? 'bg-amber-500' : 'bg-destructive');

/** Two options run through three scenarios. Shows results only. Values are illustrative. */
function ScenarioTest() {
  const [id, setId] = useState('base');
  const i = scenarios.findIndex((x) => x.id === id);
  return (
    <PanelFrame title="Test an option before you commit" note="Synthetic demo data">
      <Segmented label="Scenario" value={id} onChange={setId} items={scenarios.map((x) => ({ id: x.id, t: x.t }))} />
      <p className="mt-3 text-sm text-muted-foreground">{scenarios[i].d}. Order fulfillment risk after each option, from 70% today.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {options.map((o) => (
          <div key={o.k} className={cn('flex flex-col rounded-xl border p-4', o.rec ? 'border-teal-300 bg-teal-50/50' : 'border-border bg-card')}>
            <div className="flex items-center gap-3">
              <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg text-[15px] font-bold', o.rec ? 'bg-active text-white' : 'bg-secondary text-primary')}>{o.k}</span>
              <div className="min-w-0">
                <p className="m-0 text-[15px] font-semibold leading-tight text-primary">{o.t}</p>
                <p className="m-0 mt-0.5 text-xs text-muted-foreground">{o.d}</p>
              </div>
            </div>
            <span className={cn('mt-3 w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold', o.rec ? 'bg-active text-white' : 'invisible')}>Recommended</span>
            <p className={cn('m-0 mt-3 text-[34px] font-extrabold leading-none tabular-nums', riskTone(o.risk[i]))}>{o.risk[i]}%</p>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-secondary"><div className={cn('h-full rounded-full transition-[width] duration-500', riskBar(o.risk[i]))} style={{ width: `${o.risk[i]}%` }} /></div>
            <dl className="m-0 mt-4 grid grid-cols-2 gap-2 text-sm">
              <div><dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Net effect</dt><dd className="m-0 mt-0.5 text-[17px] font-bold text-primary">{o.net[i]}</dd></div>
              <div><dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Confidence</dt><dd className="m-0 mt-0.5 text-[17px] font-bold text-primary">{o.conf[i]}%</dd></div>
            </dl>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3.5">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-active text-white"><Check size={14} /></span>
        <p className="m-0 text-sm leading-snug text-teal-900"><b>What it means for the call. </b>{readouts[i]}</p>
      </div>
      <p className="mt-auto pt-5 text-xs leading-relaxed text-muted-foreground">Illustrative values on synthetic data. Lower risk is better.</p>
    </PanelFrame>
  );
}

const uses = [
  { icon: Target, t: 'Focus on what matters', b: 'See which few factors move the result most, so effort goes where it pays.' },
  { icon: Waypoints, t: 'Test a change first', b: 'Compare what happens if you change a lever, before you commit to it.' },
  { icon: Gauge, t: 'Know how sure it is', b: 'Each influence carries a confidence level, so you can see where the evidence is strong and where it needs more data.' },
];

export function ImpactMap() {
  return (
    <Section id="map" tone="alt">
      <div className="mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow>Our core offer · the Kimaru platform</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] text-primary">Know exactly what moves the outcome, and by how much.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Kimaru connects the actions you control, the outside factors and the results that matter, then shows how much each one influences the outcome. Decisions stop being a debate and start from evidence.
          </p>
        </Reveal>
      </div>
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal className="h-full">
          <ImpactExplorer />
        </Reveal>
        <Reveal delay={120} className="h-full min-w-0">
          <ScenarioTest />
        </Reveal>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {uses.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 100} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                <I size={20} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-primary">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const paths = [
  {
    k: 'The platform', who: 'For teams that make the same costly decision again and again', t: 'Run decisions in Kimaru', b: 'Your team works in one place every day: the decision map, the options, the approval and the tracked result.',
    pts: ['Decision map with influence values', 'Options compared before you commit', 'Approval, record and tracking'], cta: 'Book a walkthrough', primary: true,
  },
  {
    k: 'Decisions as a Service', who: 'For teams that want results before committing to a platform', t: 'Start with a service', b: 'Not ready for a platform? We do the groundwork with you: data, the decision map, forecasts, even running the decision.',
    pts: ['No platform commitment', 'Useful with any AI you choose later', 'Grow into the platform when ready'], cta: 'Tell us what you need', primary: false,
  },
];

export function TwoWays({ bookUrl, contactUrl }: { bookUrl: string; contactUrl: string }) {
  return (
    <Section id="ways" className="relative overflow-hidden">
      <NetworkBackdrop className="-right-16 top-6 hidden w-[620px] opacity-60 lg:block" />
      <div className="mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow>Two ways to start</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] text-primary">Run it yourself, or let us start the work.</h2>
        </Reveal>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {paths.map((p, n) => (
          <Reveal key={p.k} delay={n * 110} className="h-full">
            <div className={cn('lift flex h-full flex-col rounded-3xl border p-7 sm:p-8', p.primary ? 'border-brand bg-brand text-white' : 'border-border bg-card')}>
              <p className={cn('text-xs font-semibold uppercase tracking-[0.09em]', p.primary ? 'text-white/75' : 'text-muted-foreground')}>{p.k}</p>
              <p className={cn('mt-2 text-sm font-semibold', p.primary ? 'text-teal-200' : 'text-active')}>{p.who}</p>
              <h3 className={cn('mt-1 text-3xl font-extrabold leading-tight', p.primary ? 'text-white' : 'text-primary')}>{p.t}</h3>
              <p className={cn('mt-3 text-base leading-relaxed', p.primary ? 'text-white/85' : 'text-muted-foreground')}>{p.b}</p>
              <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
                {p.pts.map((x) => (
                  <li key={x} className={cn('flex items-start gap-2.5 text-[15px]', p.primary ? 'text-white' : 'text-foreground')}>
                    <Check size={18} className={cn('mt-0.5 shrink-0', p.primary ? 'text-teal-300' : 'text-active')} />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Button href={p.primary ? bookUrl : contactUrl} variant={p.primary ? 'light' : 'brand'}>
                  {p.cta} <ArrowRight />
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
