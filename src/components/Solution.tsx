import { ArrowRight, BarChart3, ClipboardList, Landmark, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, Section, SectionHead } from './ui';
import { CountUp, Reveal } from './motion';
import { stats } from './Value';

export function SolutionHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1360px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Solutions · Production commitment</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            Release the right builds, <span className="grad-text">in the right order.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[31em] text-lg leading-relaxed text-muted-foreground">
            When material, capacity, quality gates and due dates conflict, Kimaru compares the practical options, gets the right person to approve one, and measures what happened.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
            <Button href="#walkthrough" variant="outline" size="lg">
              See one decision
            </Button>
          </div>
          <p className="rise rise-5 mt-6 flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="size-2.5 shrink-0 rotate-45 rounded-[3px] bg-logo-teal" />
            <span>
              In one pilot, on-time production went from <b className="text-foreground">43% to 75%</b>. Measured, not universal.
            </span>
          </p>
        </div>
        <div className="rise rise-5 mt-2 min-w-0">
          <BrowserFrame src="screens/uc-compare.png" alt="Kimaru recommendations page listing each component at risk with stock, backlog, risk and confidence" title="Components at risk, by order" aspect="1440 / 745" />
        </div>
      </div>
    </div>
  );
}

const today = ['Your ERP', 'Planning tools', 'Spreadsheets', 'Meetings', "One planner's experience"];

export function TheCall() {
  return (
    <Section id="call" tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Reveal>
          <Eyebrow>The call</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">The decision your planners make every week.</h2>
          <blockquote className="mt-6 rounded-2xl border border-border bg-card p-6 text-xl font-semibold leading-snug text-primary shadow-sm sm:text-2xl">
            Which orders, builds or work packages should be released and sequenced next?
            <footer className="mt-3 text-base font-normal leading-relaxed text-muted-foreground">
              When material readiness, constrained resources, quality gates, due dates and planner judgment all pull in different directions.
            </footer>
          </blockquote>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">Today it is pieced together from</p>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
            {today.map((t) => (
              <li key={t} className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">Kimaru brings those pieces into one view, so the call is made once, by the right owner, with the reasoning on record.</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function Consequence() {
  return (
    <Section id="cost">
      <SectionHead eyebrow="What it costs" title="When the call is slow or wrong, it shows up in delivery and cost." body="Published surveys on slow decisions and supply disruption. They describe the problem in general, not Kimaru results." />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.slice(0, 3).map((s, n) => (
          <Reveal key={s.theme} delay={n * 100} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{s.theme}</p>
              <p className="mt-4 text-[52px] font-extrabold leading-none tracking-tight text-primary tabular-nums">
                {s.prefix}
                <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} duration={1400} />
              </p>
              <p className="mt-3 text-[15px] leading-snug text-foreground">{s.what}</p>
              <p className="mt-auto pt-4 text-xs leading-snug text-muted-foreground">
                <a href={s.href} className="font-semibold text-foreground underline decoration-border underline-offset-2 hover:decoration-foreground">
                  {s.source}
                </a>
                . {s.caveat}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const steps = [
  { n: '1', t: 'The alert lands', b: 'A typhoon threatens component supply. Each affected component and its delay is listed, with an owner.', src: 'screens/uc-hub.png', w: 1440, h: 651, title: 'Work Hub' },
  { n: '2', t: 'Every component, with its risk', b: 'Stock, backlog, order fulfillment risk and confidence side by side, so the team sees where to act first.', src: 'screens/uc-compare.png', w: 1440, h: 745, title: 'Recommendations' },
  { n: '3', t: 'The owner commits', b: 'Open a row for the recommended action and its predicted outcome, then accept it, ask the agent or defer.', src: 'screens/uc-choose.png', w: 1440, h: 872, title: 'Recommendation for one component' },
  { n: '4', t: 'The result is measured', b: 'On-time delivery against the baseline, by product line, kept for the next comparable decision.', src: 'screens/uc-learn.png', w: 1440, h: 662, title: 'Decision Tracker' },
];

export function Walkthrough() {
  return (
    <Section id="walkthrough" tone="alt">
      <SectionHead eyebrow="One decision" title="From alert to measured result." body="The same decision, on the real Kimaru screens. Demo data is synthetic." />
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {steps.map((s, n) => (
          <Reveal key={s.n} delay={(n % 2) * 100} className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{s.n}</span>
              <h3 className="text-xl font-bold text-primary">{s.t}</h3>
            </div>
            <p className="mt-2 max-w-[34em] text-[15px] leading-relaxed text-muted-foreground">{s.b}</p>
            <BrowserFrame className="mt-4" src={s.src} alt={`${s.title} screen in Kimaru`} title={s.title} aspect={`${s.w} / ${s.h}`} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const roles: Array<{ icon: LucideIcon; who: string; head: string; body: string; watch: string[] }> = [
  {
    icon: BarChart3, who: 'Operations leaders', head: 'Delivery, throughput and expedite cost.',
    body: 'See which commitments are at risk and what each option costs before you approve.',
    watch: ['On-time delivery', 'Expedite spend'],
  },
  {
    icon: ClipboardList, who: 'Planners and operators', head: 'Your process, made explainable.',
    body: 'Start from the spreadsheet and judgment you already use. Every recommendation says why, and your overrides are recorded.',
    watch: ['Overrides and reasons'],
  },
  {
    icon: Landmark, who: 'Finance', head: 'A baseline and a predicted-versus-actual record.',
    body: 'Compare the expected result with what happened, kept separate from any modeled value.',
    watch: ['Baseline', 'Predicted vs actual'],
  },
];

export function Roles() {
  return (
    <Section id="roles">
      <SectionHead eyebrow="Who gets what" title="One decision, three people who care about it." />
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((r, n) => (
          <Reveal key={r.who} delay={n * 100} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <r.icon size={20} />
              </span>
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <Users size={13} /> {r.who}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-tight text-primary">{r.head}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{r.body}</p>
              <ul className="m-0 mt-auto flex list-none flex-wrap gap-1.5 p-0 pt-5">
                {r.watch.map((w) => (
                  <li key={w} className="rounded-full border border-border bg-panel px-2.5 py-1 text-xs font-medium">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
