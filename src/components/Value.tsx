import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Clock, Handshake, PiggyBank, Radar, Scale, Sparkles, TrendingUp, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BrowserFrame, Eyebrow, Section, SectionHead, cn } from './ui';
import { CountUp, Reveal } from './motion';

/* ---------- Cost of delay: published survey figures, each with its source ---------- */

type Stat = {
  theme: string;
  icon: LucideIcon;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  what: string;
  extra?: string;
  source: string;
  href: string;
  caveat: string;
  helps: string;
};

const stats: Stat[] = [
  {
    theme: 'Late and slow decisions', icon: Clock, to: 61, suffix: '%',
    what: 'of executives say most of the time spent on decisions in their company is used ineffectively.',
    source: 'McKinsey executive survey, 2019', href: 'https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/decision-making-in-the-age-of-urgency',
    caveat: '57% among C-level respondents.',
    helps: 'One governed loop replaces the thread, spreadsheet and meeting cycle.',
  },
  {
    theme: 'Delays after a disruption', icon: Zap, to: 2.4, decimals: 1, suffix: '%',
    what: 'of annual revenue is lost to supply chain disruption, on average. Teams take about 8.7 hours to detect one and nearly two days to understand its impact.',
    source: 'Sphera supply chain survey, 2026', href: 'https://sphera.com/resources/report/too-late-to-act-how-supply-chain-risk-becomes-revenue-loss/',
    caveat: 'Vendor-run survey. Up to 4% for some companies.',
    helps: 'Alerts arrive with the options already compared, so the gap between signal and action shrinks.',
  },
  {
    theme: 'Unpredicted outside factors', icon: Radar, to: 45, prefix: '~', suffix: '%',
    what: "of one year's profit (EBITDA) is wiped out by supply chain shocks, on average, over a decade.",
    source: 'McKinsey Global Institute, 2020', href: 'https://www.mckinsey.com/capabilities/operations/our-insights/risk-resilience-and-rebalancing-in-global-value-chains',
    caveat: 'A later MGI edition gives 42%. Varies by industry.',
    helps: 'Causal models and simulation test what a shock does before it lands.',
  },
  {
    theme: 'Not seeing better options', icon: Scale, to: 95, suffix: '%',
    what: 'correlation between companies that decide and execute well and companies with top-tier financial results.',
    source: 'Bain decision effectiveness survey', href: 'https://www.bain.com/insights/score-your-organization-to-improve-decision-effectiveness-forbes/',
    caveat: 'Self-reported survey. Shows association, not cause.',
    helps: 'Feasible options sit side by side with their cost and outcome before anyone commits.',
  },
];

export function CostOfDelay() {
  return (
    <Section id="cost" tone="alt">
      <SectionHead
        eyebrow="The cost of deciding late"
        title="Slow, late and blind decisions are expensive."
        body="Published surveys keep finding the same thing: companies lose profit when decisions are slow, when disruptions arrive unseen, and when better options never reach the table."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, n) => (
          <Reveal key={s.theme} delay={n * 110} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <span className="grid size-8 place-items-center rounded-lg bg-red-50 text-destructive">
                  <s.icon size={17} />
                </span>
                {s.theme}
              </div>
              <p className="mt-5 text-[56px] font-extrabold leading-none tracking-tight text-primary tabular-nums">
                {s.prefix}
                <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} duration={1500} />
              </p>
              <p className="mt-3 text-[15px] leading-snug text-foreground">{s.what}</p>
              <p className="mt-3 text-xs leading-snug text-muted-foreground">
                <a href={s.href} className="font-semibold text-foreground underline decoration-border underline-offset-2 hover:decoration-foreground">
                  {s.source}
                </a>
                . {s.caveat}
              </p>
              <div className="mt-auto pt-5">
                <div className="rounded-xl border border-active/40 bg-teal-50 px-3.5 py-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-active">
                    <Sparkles size={12} /> How Kimaru helps
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-foreground">{s.helps}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        These are third-party survey results, not Kimaru results. Methods, years and respondents differ, so the figures are not additive. Follow each link for the full study.
      </p>
    </Section>
  );
}

/* ---------- What the client gets in the end ---------- */

const gains = [
  {
    icon: Zap, t: 'Faster, steadier operations', b: 'Facts, options and the approver sit in one place, so planners decide instead of chasing data, and decisions stop waiting on meetings.',
    watch: ['Hours per decision', 'Time from alert to action'],
  },
  {
    icon: PiggyBank, t: 'Less waste and avoidable cost', b: 'Every option shows its cost next to its outcome, so you pay for an expedite or a buffer only where it earns its keep.',
    watch: ['Premium freight and expedite spend', 'Stockouts and excess stock'],
  },
  {
    icon: TrendingUp, t: 'Protected profit and margin', b: 'Fewer fire drills and missed dates mean fewer penalties and rushed buys. The tracker shows what each decision was worth.',
    watch: ['Margin per order', 'Penalties and write-offs'],
  },
  {
    icon: Handshake, t: 'More bookings and renewals', b: 'When you can promise a date and keep it, customers rebook and new ones sign. This follows from dependable delivery, so it takes longer to show.',
    watch: ['On-time and in-full rate', 'Repeat orders and renewals'],
  },
];

export function Benefits() {
  return (
    <Section id="benefits">
      <SectionHead
        eyebrow="What you get"
        title="Better decisions, in the numbers you already track."
        body="Kimaru does not add another dashboard. It improves the recurring calls behind your cost, service and revenue, and measures the change."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {gains.map((g, n) => (
          <Reveal key={g.t} delay={n * 110} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-10px_rgb(37_59_127/0.7)]">
                <g.icon size={22} />
              </span>
              <h3 className="mt-5 text-xl font-bold leading-tight text-primary">{g.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{g.b}</p>
              <div className="mt-auto pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What you would watch</p>
                <ul className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0">
                  {g.watch.map((w) => (
                    <li key={w} className="rounded-full border border-border bg-panel px-2.5 py-1 text-xs font-medium text-foreground">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-active bg-teal-50 px-6 py-5">
          <p className="text-3xl font-extrabold tracking-tight text-primary tabular-nums">
            <CountUp to={43} suffix="%" /> <span className="text-active">→</span> <CountUp to={75} suffix="%" />
          </p>
          <p className="max-w-2xl text-[15px] leading-snug text-foreground">
            <b>Measured so far:</b> new orders produced on time in one pilot with an industrial manufacturer. Results depend on the decision and the company, and the other outcomes above are what we measure against in each pilot.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Same engine, different industries ---------- */

type Ind = { id: string; label: string; screen: string; w: number; h: number; title: string; headline: string; body: string; verbs: string[] };
const inds: Ind[] = [
  {
    id: 'mfg', label: 'Manufacturing', screen: 'screens/uc-hub.png', w: 1440, h: 651, title: 'Work Hub: material shortage',
    headline: 'A typhoon threatens component supply.',
    body: 'Kimaru lists each component hit by the delay, the risk to orders, and the actions that remove it.',
    verbs: ['Expedite', 'Resequence', 'Substitute', 'Defer'],
  },
  {
    id: 'dist', label: 'Distribution and logistics', screen: 'screens/uc-fitness.png', w: 1440, h: 391, title: 'Work Hub: truck plans',
    headline: 'Stock is running low and trucks are limited.',
    body: 'Truck plans show days of cover, the products to load and the recommendation to restore coverage.',
    verbs: ['Load', 'Hold', 'Transfer', 'Rebalance'],
  },
  {
    id: 'kit', label: 'Kitting and assembly', screen: 'screens/uc-kitting.png', w: 1440, h: 615, title: 'Work Hub: kit shortages',
    headline: 'A kit cannot ship until its components arrive.',
    body: 'Each kit shows its due date, risk level and short components, with recommendations to source them in time.',
    verbs: ['Source', 'Wait', 'Substitute', 'Reprice'],
  },
];

export function Industries() {
  const [i, setI] = useState(0);
  const s = inds[i];
  return (
    <Section id="industries" tone="alt">
      <SectionHead
        eyebrow="One engine, many operations"
        title="The same loop fits different kinds of operations."
        body="These are three real Kimaru demos built for different industries. The alerts and decisions change. The way people decide does not."
      />
      <div role="tablist" aria-label="Industry demos" className="mb-6 flex flex-wrap gap-2">
        {inds.map((d, n) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={cn('relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors', n === i ? 'border-primary text-white' : 'border-border bg-card text-foreground hover:border-ring')}
          >
            {n === i && <motion.span layoutId="ind-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
            <span className="relative">{d.label}</span>
          </button>
        ))}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ type: 'spring', stiffness: 170, damping: 24 }}>
            <Eyebrow>{s.label}</Eyebrow>
            <h3 className="mt-2 text-2xl font-bold leading-tight text-primary">{s.headline}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.verbs.map((v) => (
                <span key={v} className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium">
                  {v}
                </span>
              ))}
            </div>
            <a href="#how" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-active no-underline hover:underline">
              See how a decision runs <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={s.id + 'img'} className="min-w-0" initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ type: 'spring', stiffness: 150, damping: 22 }}>
            <BrowserFrame src={s.screen} alt={`${s.title} in Kimaru`} title={s.title} aspect={`${s.w} / ${s.h}`} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
