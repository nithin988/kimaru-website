import { ArrowRight, Check, Layers3, LineChart, Scale, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button, Eyebrow, Section, cn } from './ui';
import { Reveal } from './motion';
import { NetworkBackdrop } from './Flow';

const parts: Array<{ icon: LucideIcon; t: string; b: string }> = [
  { icon: Layers3, t: 'The facts in one place', b: 'Evidence from your systems and files, each with its source and confidence.' },
  { icon: Scale, t: 'Options with predicted outcomes', b: 'Each practical option shown beside its likely result, before anyone commits.' },
  { icon: ShieldCheck, t: 'The right person decides', b: 'Approve, adjust or defer within their limits, with the reasoning kept on record.' },
  { icon: LineChart, t: 'Results measured and kept', b: 'Expected against actual, so the next similar call starts from what was learned.' },
];

function DecisionExample() {
  const opts = [
    { k: 'A', t: 'Air-freight plan', risk: 36, rec: true },
    { k: 'B', t: 'Split air and sea', risk: 48, rec: false },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-semibold text-foreground">Decision Model: Production commitment</span>
        <span className="ml-auto hidden text-[11px] sm:inline">Synthetic demo data</span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">One recurring decision</p>
        <p className="m-0 mt-1.5 text-[19px] font-bold leading-snug text-primary">Which orders can we still promise after the port closure?</p>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-primary-foreground">
          <span className="text-[13px] font-semibold">Order fulfillment risk today</span>
          <span className="text-2xl font-extrabold tabular-nums">70%</span>
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {opts.map((o) => (
            <div key={o.k} className={cn('rounded-lg border p-3.5', o.rec ? 'border-teal-300 bg-teal-50/50' : 'border-border bg-card')}>
              <div className="flex items-center gap-2">
                <span className={cn('grid size-6 place-items-center rounded-md text-xs font-bold', o.rec ? 'bg-active text-white' : 'bg-secondary text-primary')}>{o.k}</span>
                <span className="text-[13px] font-semibold text-primary">{o.t}</span>
              </div>
              <p className={cn('m-0 mt-2.5 text-3xl font-extrabold leading-none tabular-nums', o.rec ? 'text-active' : 'text-amber-600')}>{o.risk}%</p>
              <p className={cn('m-0 mt-1 text-xs', o.rec ? 'font-semibold text-active' : 'text-muted-foreground')}>{o.rec ? 'Recommended' : 'Lower cost, higher risk'}</p>
            </div>
          ))}
        </div>
        <p className="m-0 mt-4 flex items-center gap-2 border-t border-border pt-3 text-[13px] text-muted-foreground">
          <Check size={15} className="shrink-0 text-active" /> Plant manager approves. The reason is kept and the result is tracked.
        </p>
      </div>
    </div>
  );
}

export function ImpactMap() {
  return (
    <Section id="map" tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <Reveal>
            <Eyebrow>Our core offer · the Kimaru platform</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">One platform for every recurring decision.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Each recurring call becomes a Decision Model that keeps the facts, the options, the approval and the result together. Start with one, and add the next when the first proves itself.</p>
          </Reveal>
          <ul className="m-0 mt-7 grid list-none gap-4 p-0">
            {parts.map(({ icon: I, t, b }, n) => (
              <Reveal key={t} delay={n * 80}>
                <li className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white"><I size={18} /></span>
                  <div>
                    <h3 className="m-0 text-base font-bold text-primary">{t}</h3>
                    <p className="m-0 mt-0.5 text-[15px] leading-snug text-muted-foreground">{b}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={120} className="min-w-0">
          <DecisionExample />
        </Reveal>
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
