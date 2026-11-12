import { useState } from 'react';
import { ArrowRight, Check, Gauge, Target, Waypoints } from 'lucide-react';
import { Button, Eyebrow, Section, asset, cn } from './ui';
import { Reveal } from './motion';
import { NetworkBackdrop } from './Flow';

type Driver = { name: string; w: number; conf: number; dir: 'helps' | 'against' };
type Outcome = { id: string; label: string; blurb: string; drivers: Driver[] };

// Demo values from the Manufacturing demonstration. Strength is the influence of each factor on the outcome, 0 to 1.
const outcomes: Outcome[] = [
  {
    id: 'otd', label: 'On-time delivery', blurb: 'Share of customer orders shipped on or before the committed date.',
    drivers: [
      { name: 'Order fulfillment risk', w: 0.94, conf: 96, dir: 'against' },
      { name: 'Production schedule sequencing', w: 0.89, conf: 93, dir: 'helps' },
      { name: 'Production line utilisation', w: 0.88, conf: 92, dir: 'helps' },
      { name: 'Customer order demand', w: 0.85, conf: 91, dir: 'helps' },
      { name: 'Component availability', w: 0.82, conf: 89, dir: 'helps' },
      { name: 'Incoming quality rate', w: 0.72, conf: 86, dir: 'helps' },
    ],
  },
  {
    id: 'fpy', label: 'First pass yield', blurb: 'Share of units passing every quality check without rework.',
    drivers: [
      { name: 'Incoming quality rate', w: 0.93, conf: 95, dir: 'helps' },
      { name: 'ISO 9001 certification', w: 0.86, conf: 91, dir: 'helps' },
      { name: 'Production line utilisation', w: 0.68, conf: 82, dir: 'against' },
    ],
  },
];

/** Interactive view of what drives an outcome and how strongly. Values are demonstration data. */
export function ImpactExplorer() {
  const [id, setId] = useState('otd');
  const o = outcomes.find((x) => x.id === id)!;
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)] sm:p-7">
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Outcome">
        <span className="mr-1 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">What moves</span>
        {outcomes.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={x.id === id}
            onClick={() => setId(x.id)}
            className={cn('rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors', x.id === id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-ring')}
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{o.blurb}</p>

      <ul key={o.id} className="fade-in m-0 mt-5 grid min-h-[372px] list-none content-start gap-3.5 p-0">
        {o.drivers.map((d) => (
          <li key={d.name} className="grid items-center gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto]">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-tight text-primary">{d.name}</p>
              <p className={cn('text-xs font-semibold', d.dir === 'helps' ? 'text-active' : 'text-destructive')}>{d.dir === 'helps' ? 'Helps the outcome' : 'Works against it'}</p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
              <div className={cn('h-full rounded-full transition-[width] duration-700 ease-out', d.dir === 'helps' ? 'bg-active' : 'bg-destructive')} style={{ width: `${d.w * 100}%` }} />
            </div>
            <p className="text-right text-sm font-bold tabular-nums text-primary">
              {d.w.toFixed(2)} <span className="text-xs font-medium text-muted-foreground">· {d.conf}% sure</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-5 text-xs leading-relaxed text-muted-foreground">Strength of influence, from 0 to 1, and how sure the estimate is. Demonstration values on synthetic data.</p>
    </div>
  );
}

const uses = [
  { icon: Target, t: 'Focus on what matters', b: 'See which few factors move the result most, so effort goes where it pays.' },
  { icon: Waypoints, t: 'Test a change first', b: 'Compare what happens if you change a lever, before you commit to it.' },
  { icon: Gauge, t: 'Know how sure it is', b: 'Each influence carries a confidence level, so you can see where the map is strong and where it needs data.' },
];

export function ImpactMap() {
  return (
    <Section id="map" tone="alt">
      <div className="mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow>Our core offer · the Kimaru platform</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] text-primary">Know exactly what moves the outcome, and by how much.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Kimaru maps the levers you control, the outside factors and the results that matter, then puts a value on how strongly each one influences the outcome. Decisions stop being a debate and start from evidence.
          </p>
        </Reveal>
      </div>
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <ImpactExplorer />
        </Reveal>
        <Reveal delay={120} className="h-full min-w-0">
          <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]">
            <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="ml-2 font-semibold text-foreground">The same map inside Kimaru</span>
              <span className="ml-auto hidden text-[11px] sm:inline">Synthetic demo data</span>
            </div>
            <div className="relative min-h-[300px] flex-1">
              <img src={asset('screens/uc-cdd-weights.png')} alt="The Kimaru decision map with a node selected, showing the strength of influence on each outcome it affects" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[100%_0]" />
            </div>
            <p className="border-t border-border px-5 py-3 text-sm text-muted-foreground">Pick a factor and see which outcomes it moves, and how strongly.</p>
          </div>
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
