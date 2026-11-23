import { ArrowRight, BadgeCheck, Check, Factory, Truck, Gauge, Layers3, Scale, Target, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, Section, SectionHead, cn } from './ui';
import { Reveal } from './motion';

function BuiltFor({ label, sub, Icon }: { label: string; sub: string; Icon: LucideIcon }) {
  return (
    <div className="lift flex flex-col rounded-2xl border border-border bg-card p-6">
      <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon size={20} />
      </span>
      <p className="mt-5 text-base font-semibold text-primary">{label}</p>
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
            Where Kimaru has been used, and what it changed. Customers are described by industry, and every number shows how it was established.
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
          <BuiltFor Icon={Truck} label="Sports electronics manufacturer" sub="A Decision Model for truck planning: fewer repeat trips, fuller loads and no overstock or stockout." />
          <BuiltFor Icon={Factory} label="Aircraft fabrics manufacturer" sub="A Decision Model built for their production-planning use case." />
        </div>
      </Container>
    </div>
  );
}

export function Pilots() {
  return (
    <Section id="case" tone="alt">
      <SectionHead eyebrow="Where it has been used" title="Built for real manufacturing decisions." body="We describe each customer by industry, not by name. Each one was built around the customer's own decision, rules and data." />
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                <Truck size={13} /> Use case built
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Sports electronics manufacturer</span>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight text-primary">Truck planning without overstock or stockout.</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">Kimaru built a Decision Model for planning truck movements. Each load goes out when it is needed, stock is neither short nor piled up, and trucks are not sent again and again.</p>
            <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
              {['No overstock and no stockout', 'Fewer repeat truck trips than before', 'One load shared with a warehouse on the route, using the full truck volume'].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[15px] text-foreground">
                  <Check size={18} className="mt-0.5 shrink-0 text-active" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-5 text-sm leading-relaxed text-muted-foreground">Built around the customer's own decision, rules and data.</p>
          </div>
        </Reveal>
        <Reveal delay={110} className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                <Factory size={13} /> Use case built
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Aircraft fabrics manufacturer</span>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight text-primary">Production planning across material, machine and lot rules.</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">Kimaru built a Decision Model for a production-planning decision where ERP data has to be reconciled with material readiness, machine compatibility, lot-mixing rules and capacity.</p>
            <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
              {['The facts: ERP data and material readiness', 'The rules: machine compatibility and lot-mixing', 'The limits: capacity, with planner judgment on record'].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[15px] text-foreground">
                  <Check size={18} className="mt-0.5 shrink-0 text-active" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-5 text-sm leading-relaxed text-muted-foreground">Built around the customer's own decision, rules and data.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const gives: Array<{ icon: LucideIcon; t: string; b: string }> = [
  { icon: Layers3, t: 'The facts in one place', b: 'Evidence from the ERP, planning tools and spreadsheets, with its source.' },
  { icon: Scale, t: 'Options with their outcome', b: 'Each practical option shown beside its predicted effect, before anyone commits.' },
  { icon: UserCheck, t: 'An owner who approves', b: 'The right person commits within their limits, and the reasoning stays on record.' },
  { icon: Gauge, t: 'A result you can measure', b: 'Expected against actual, so the next comparable decision starts from what was learned.' },
];

export function Gives() {
  return (
    <Section id="gives">
      <SectionHead eyebrow="What Kimaru gives a team" title="The same four things, whatever the industry." body="Every deployment follows the same loop. This is what a team gets from it." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {gives.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 90} className="h-full">
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

const labels: Array<{ icon: LucideIcon; k: string; tone: string; what: string; here: string }> = [
  { icon: BadgeCheck, k: 'Measured', tone: 'bg-teal-50 text-active', what: 'Observed in live use, against your own baseline.', here: 'Real results from your real operation.' },
  { icon: Layers3, k: 'Demonstrated', tone: 'bg-brand-soft text-brand', what: 'Shown working end to end on realistic data.', here: 'See it in the industry demos.' },
  { icon: UserCheck, k: 'Customer-validated', tone: 'bg-violet-50 text-[#6a0dad]', what: 'Reviewed and accepted by your team, including Finance.', here: 'Agreed before it is relied on.' },
  { icon: Scale, k: 'Modeled', tone: 'bg-amber-50 text-amber-700', what: 'Projected from your own data before you commit.', here: 'Plan with confidence, then measure.' },
];

export function Labels() {
  return (
    <Section id="labels">
      <SectionHead eyebrow="How we show evidence" title="Every number shows where it comes from." body="Each figure is marked as measured, demonstrated, customer-validated or modeled, so your team can see what it rests on and decide with confidence." />
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
