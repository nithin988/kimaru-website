import { ArrowRight, BadgeCheck, Gauge, Layers3, Scale, Target, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, Section, SectionHead, cn, useInView } from './ui';
import { CountUp, Reveal } from './motion';

function Metric({ from, to, label, sub }: { from: number; to: number; label: string; sub: string }) {
  return (
    <div className="lift rounded-2xl border border-border bg-card p-6">
      <p className="whitespace-nowrap text-[clamp(30px,3.4vw,44px)] font-extrabold leading-none tracking-tight text-primary tabular-nums">
        <span className="text-slate-400"><CountUp to={from} suffix="%" /></span> <span className="text-active">→</span> <CountUp to={to} suffix="%" />
      </p>
      <p className="mt-3 text-base font-semibold text-primary">{label}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{sub}</p>
    </div>
  );
}

export function ResultsHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:pb-20 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Results</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            Live decisions. <span className="grad-text">Measured outcomes.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[31em] text-lg leading-relaxed text-muted-foreground">
            A live production-planning Decision Model at an aircraft-carpet manufacturer, measured against operating performance and ERP validation.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
            <Button href="#case" variant="outline" size="lg">
              Read the case
            </Button>
          </div>
        </div>
        <div className="rise rise-5 grid gap-4 sm:grid-cols-2">
          <Metric from={43} to={75} label="New-order on-time production" sub="Measured new-order on-time planning improvement" />
          <Metric from={96} to={100} label="ERP-versus-plan pass rate" sub="Measured pilot checks, WK24 to WK26" />
        </div>
      </Container>
    </div>
  );
}

export function Case() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  return (
    <Section id="case" tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal>
          <Eyebrow>Measured customer proof</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">One production-planning decision created measurable value.</h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-active">Aircraft Carpet Manufacturer</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A carpet weaving manufacturer producing high-quality, heavyweight carpets used Kimaru for aircraft-carpet production planning, where ERP data had to be reconciled with material readiness, loom compatibility, lot-mixing rules, capacity and planner judgment.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground">Kimaru did not replace the manufacturer's ERP or planners. It made one difficult recurring decision visible, reviewable, measurable and reusable.</p>
          <p className="mt-5 rounded-lg bg-amber-100 px-4 py-2.5 text-[13px]">The 96% to 100% figure is a validation check against the ERP, not an on-time delivery rate. Results are from one pilot and are not universal.</p>
        </Reveal>
        <div ref={ref} className="rounded-2xl border border-border bg-card p-6">
          <Eyebrow>New orders produced on time</Eyebrow>
          <div className="mt-4 grid h-64 grid-cols-2 items-end gap-5 px-2">
            {[
              { v: 43, label: 'Before', cls: 'bg-slate-300 text-primary' },
              { v: 75, label: 'After Kimaru', cls: 'bg-active text-white' },
            ].map((b, n) => (
              <div key={b.label} className="flex h-full min-w-0 flex-col justify-end gap-2">
                <div
                  className={cn('flex items-start justify-center overflow-hidden rounded-t-lg pt-2.5 text-3xl font-extrabold tabular-nums transition-[height] duration-[1400ms] ease-out', b.cls)}
                  style={{ height: seen ? `${b.v}%` : '8%', transitionDelay: `${n * 250}ms` }}
                >
                  <CountUp to={b.v} suffix="%" duration={1400} />
                </div>
                <span className="text-center text-[13px] text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Anonymized manufacturer. Measured pilot.</p>
        </div>
      </div>
    </Section>
  );
}

const labels: Array<{ icon: LucideIcon; k: string; tone: string; what: string; here: string }> = [
  { icon: BadgeCheck, k: 'Measured', tone: 'bg-teal-50 text-active', what: 'Observed in live use against a baseline.', here: 'The 43% to 75% pilot result.' },
  { icon: Layers3, k: 'Demonstrated', tone: 'bg-brand-soft text-brand', what: 'Shown working on synthetic data.', here: 'The industry demos on this site.' },
  { icon: UserCheck, k: 'Customer-validated', tone: 'bg-violet-50 text-[#6a0dad]', what: 'Accepted by the customer, including Finance.', here: 'Not claimed yet.' },
  { icon: Scale, k: 'Modeled', tone: 'bg-amber-50 text-amber-700', what: 'A projection from a model.', here: 'Not shown on this site.' },
];

export function Labels() {
  return (
    <Section id="labels">
      <SectionHead eyebrow="How we label evidence" title="A demonstration is never presented as a result." body="Every number on this site carries one of four labels, so you can see how much weight it can bear." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {labels.map((l, n) => (
          <Reveal key={l.k} delay={n * 90} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className={cn('grid size-11 place-items-center rounded-xl', l.tone)}>
                <l.icon size={20} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-primary">{l.k}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-muted-foreground">{l.what}</p>
              <p className="mt-auto pt-4 text-[13px] font-semibold text-foreground">{l.here}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const fit: Array<{ icon: LucideIcon; t: string }> = [
  { icon: Gauge, t: 'Delay or error has a measurable consequence' },
  { icon: Layers3, t: 'The evidence is split across tools or people' },
  { icon: Scale, t: 'Human judgment changes the right answer' },
  { icon: UserCheck, t: 'A named person owns the commitment' },
  { icon: Target, t: 'The outcome can be observed in a useful time window' },
];

export function Fit() {
  return (
    <Section id="fit" tone="alt">
      <SectionHead eyebrow="Where it works best" title="Choose a decision that can be proven." body="Start small enough to prove it. These five signs mark a decision worth starting with." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {fit.map(({ icon: I, t }, n) => (
          <Reveal key={t} delay={n * 80} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
                <I size={18} />
              </span>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-primary">{t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function NextResult() {
  return (
    <Section id="next">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>The next result</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Your decision could be the next one measured.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Bring one recurring decision. We will outline a pilot with the decision, the baseline, the owner and a timeline.</p>
          <div className="mt-6">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-2xl border border-dashed border-ring bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">Your result</p>
            <div className="mt-4 grid gap-3">
              <div className="skel h-12 w-2/3 rounded-lg" />
              <div className="skel h-3 w-full rounded-full" />
              <div className="skel h-3 w-4/5 rounded-full" />
            </div>
            <p className="mt-5 text-sm font-semibold text-muted-foreground">Measured against your own baseline</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
