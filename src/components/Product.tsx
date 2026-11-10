import { ArrowRight, Brain, Cable, FileSpreadsheet, ListChecks, MessageSquareText, ScrollText, ShieldCheck, Table2, TrendingUp, Users, Database, History, GitBranch, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, Section, SectionHead, cn } from './ui';
import { Reveal } from './motion';

export function ProductHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-[1360px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Product</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            One place to run a <span className="grad-text">recurring decision.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[30em] text-lg leading-relaxed text-muted-foreground">
            Kimaru brings the facts, options, approval and result of a decision together, on top of the systems you already use.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
            <Button href="#modules" variant="outline" size="lg">
              See the six views
            </Button>
          </div>
        </div>
        <div className="rise rise-5 mt-2 min-w-0">
          <BrowserFrame src="screens/uc-compare.png" alt="Kimaru recommendations page listing each component at risk with stock, backlog, risk and confidence" title="Recommendations" aspect="1440 / 745" />
        </div>
      </div>
    </div>
  );
}

type Mod = {
  n: string;
  title: string;
  head: string;
  body: string;
  chips: string[];
  src: string;
  w: number;
  h: number;
  icon: LucideIcon;
};

const mods: Mod[] = [
  {
    n: 'Work Hub', title: 'Work Hub', head: 'See every open decision.',
    body: 'Alerts arrive with their source and confidence, the items they affect and an owner, so nothing waits to be noticed.',
    chips: ['Source and confidence', 'Items affected', 'Owner'], src: 'screens/uc-hub.png', w: 1440, h: 651, icon: Table2,
  },
  {
    n: 'Causal AI Modeler', title: 'Causal AI Modeler', head: 'Map what drives the outcome.',
    body: 'Levers, outside factors and outcomes are connected, so you can see what a change moves before you make it.',
    chips: ['Levers', 'Outside factors', 'Outcomes'], src: 'screens/uc-cdd-select.png', w: 1440, h: 900, icon: Brain,
  },
  {
    n: 'Recommendations', title: 'Recommendations', head: 'Compare options with their predicted outcome.',
    body: 'Each recommendation shows what it will do. Expand a row to see the action, then accept it, ask the agent, or defer.',
    chips: ['Predicted outcome', 'Risk and confidence', 'Accept or defer'], src: 'screens/uc-choose.png', w: 1440, h: 872, icon: ListChecks,
  },
  {
    n: 'Agent Interaction', title: 'Agent Interaction', head: 'Ask why, and what else.',
    body: 'Question any recommendation in plain language. Kimaru explains the chain of cause and effect behind it.',
    chips: ['Why this option', 'Alternatives', 'Override with a reason'], src: 'screens/uc-agent.png', w: 1440, h: 900, icon: MessageSquareText,
  },
  {
    n: 'Governed approval', title: 'Governed approval', head: 'Approve, then send it where work happens.',
    body: 'Accepted, adjusted and deferred choices are reviewed in one place, then sent to your ERP, Excel, HubSpot or a report.',
    chips: ['Authority limits', 'Decision Receipt', 'ERP', 'Excel'], src: 'screens/uc-act.png', w: 1440, h: 775, icon: ShieldCheck,
  },
  {
    n: 'Decision Tracker', title: 'Decision Tracker', head: 'Measure what actually happened.',
    body: 'Expected against actual by outcome and product line, so you see which decisions paid off and keep the lesson.',
    chips: ['Expected vs actual', 'By outcome', 'Decision Memory'], src: 'screens/uc-learn.png', w: 1440, h: 662, icon: TrendingUp,
  },
];

export function Modules() {
  return (
    <Section id="modules" tone="alt">
      <SectionHead eyebrow="Six views" title="Everything the decision needs, one screen each." body="Each view is a real Kimaru page. Together they take a decision from alert to a measured result." />
      <div className="grid gap-16 lg:gap-24">
        {mods.map((m, n) => (
          <div key={m.n} className={cn('grid items-center gap-8 lg:gap-12', n % 2 === 1 ? 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]' : 'lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]')}>
            <Reveal className={cn('min-w-0', n % 2 === 1 && 'lg:order-2')}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
                  <m.icon size={18} />
                </span>
                {m.title}
              </div>
              <h3 className="mt-4 text-[clamp(26px,3vw,34px)] font-extrabold leading-[1.1] text-primary">{m.head}</h3>
              <p className="mt-3 max-w-[30em] text-base leading-relaxed text-muted-foreground">{m.body}</p>
              <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                {m.chips.map((c) => (
                  <li key={c} className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className={cn('min-w-0', n % 2 === 1 && 'lg:order-1')}>
              <BrowserFrame src={m.src} alt={`${m.title} page in Kimaru`} title={m.title} aspect={`${m.w} / ${m.h}`} />
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}

const held: Array<{ icon: LucideIcon; t: string; b: string }> = [
  { icon: Database, t: 'Evidence', b: 'The facts from your systems and files.' },
  { icon: ScrollText, t: 'Rules', b: 'Constraints and policies, written once.' },
  { icon: GitBranch, t: 'Options', b: 'Feasible choices with their trade-offs.' },
  { icon: Users, t: 'Owner and authority', b: 'Who can approve, and up to what limit.' },
  { icon: ListChecks, t: 'Outcome', b: 'What you expected, and what happened.' },
  { icon: History, t: 'Memory', b: 'What worked, kept for the next decision.' },
];

export function DecisionModel() {
  return (
    <Section id="model">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <Eyebrow>The building block</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] text-primary">A decision model for each recurring call.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Start with one. Each model keeps six things together, so the next person starts where the last one finished.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {held.map(({ icon: I, t, b }, n) => (
            <Reveal key={t} delay={n * 70} className="h-full">
              <div className="lift h-full rounded-2xl border border-border bg-card p-4">
                <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
                  <I size={18} />
                </span>
                <p className="mt-3 text-[15px] font-bold text-primary">{t}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const starts = [
  { icon: FileSpreadsheet, t: 'Files', b: 'Controlled uploads of the data your team already uses. The fastest way to a first result.' },
  { icon: Layers, t: 'Read-only database views', b: 'A view in your warehouse or ERP database. Nothing is written back.' },
  { icon: Cable, t: 'Scheduled API pulls', b: 'Regular pulls from your systems of record. Write-back follows the integration you agree.' },
];

export function Connect() {
  return (
    <Section id="start">
      <SectionHead eyebrow="Connects to your stack" title="Three ways to start. No rip-and-replace." body="Kimaru sits next to your ERP, supply chain tools, spreadsheets and data platforms. Begin read-only and add connections as the first decision proves itself." />
      <div className="grid gap-4 md:grid-cols-3">
        {starts.map(({ icon: I, t, b }, n) => (
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
