import { ArrowRight, ArrowUpRight, Boxes, Check, ClipboardCheck, Clock, Factory, Gauge, Handshake, Layers3, LineChart, MessageSquarePlus, PackageSearch, PiggyBank, Scale, ShieldCheck, Target, Truck, UserCheck, Users, Wallet, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, Section, SectionHead } from './ui';
import { Reveal } from './motion';

/* ---------- Hero picture: one decision, end to end, any industry (drawn in code, illustrative) ---------- */

const industries = ['Commitment', 'Scheduling', 'Materials', 'Capacity', 'Lot sizing', 'Expedite'];

const lift = (t: number) => t * t * (3 - 2 * t);
const KX = Array.from({ length: 21 }, (_, i) => 190 + i * 15.5);
const kimaru = KX.map((x, i) => [x, 124 - 96 * lift((x - 190) / 310) + Math.sin(i * 1.7) * 2.2] as const);
const baseline = Array.from({ length: 27 }, (_, i) => [20 + i * 18.5, 126 + Math.sin(i * 1.3) * 2.6] as const);
const pts = (a: ReadonlyArray<readonly [number, number]>) => a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function GrowthChart() {
  const pre = baseline.filter(([x]) => x <= 190);
  const post = baseline.filter(([x]) => x >= 190);
  const kPath = [...pre, ...kimaru];
  const area = `${pts(kimaru)} ${pts([...post].reverse())}`;
  const end = kimaru[kimaru.length - 1];
  return (
    <svg viewBox="0 0 520 170" className="mt-3 w-full" role="presentation">
      <style>{`.rb-line{stroke-dasharray:1;stroke-dashoffset:1;animation:rbdraw 2.2s .5s ease-out forwards}.rb-area{opacity:0;animation:rbfade 1s 1.8s ease-out forwards}.rb-dot{opacity:0;animation:rbfade .4s 2.5s forwards}@keyframes rbdraw{to{stroke-dashoffset:0}}@keyframes rbfade{to{opacity:1}}@media (prefers-reduced-motion:reduce){.rb-line{animation:none;stroke-dashoffset:0}.rb-area,.rb-dot{animation:none;opacity:1}}`}</style>
      {[40, 80, 120].map((y) => (
        <line key={y} x1="20" x2="500" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 5" />
      ))}
      <line x1="190" x2="190" y1="14" y2="150" stroke="#253B7F" strokeOpacity=".35" strokeDasharray="4 4" />
      <text x="196" y="24" fontSize="10" fontWeight="600" fill="#253B7F">Kimaru goes live</text>
      <polygon className="rb-area" points={area} fill="#008080" fillOpacity=".13" />
      <polyline points={pts(baseline)} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
      <polyline className="rb-line" pathLength={1} points={pts(kPath)} fill="none" stroke="#008080" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <g className="rb-dot">
        <circle cx={end[0]} cy={end[1]} r="9" fill="#008080" fillOpacity=".18" />
        <circle cx={end[0]} cy={end[1]} r="4.5" fill="#008080" />
      </g>
      <text x="20" y="164" fontSize="10" fill="#64748b">Before</text>
      <text x="500" y="164" fontSize="10" fill="#64748b" textAnchor="end">After</text>
    </svg>
  );
}

function HeroArt() {
  const opts = [
    { n: 'Option A', w: 46, rec: false },
    { n: 'Option B', w: 84, rec: true },
    { n: 'Option C', w: 58, rec: false },
  ];
  return (
    <div className="relative mx-auto grid w-full max-w-[580px] gap-4" aria-hidden="true">
      <div className="lift rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <span className="grid size-7 place-items-center rounded-lg bg-teal-50 text-active">
              <LineChart size={15} />
            </span>
            Performance against your baseline
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-active">
            <ArrowUpRight size={13} /> Ahead of baseline
          </span>
        </div>
        <GrowthChart />
        <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-5 rounded bg-active" /> With Kimaru</span>
          <span className="flex items-center gap-1.5"><span className="h-0 w-5 border-t-2 border-dashed border-slate-400" /> Your baseline</span>
          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide">Illustrative</span>
        </div>
      </div>
      <div className="grid grid-cols-[1.35fr_1fr] gap-4">
        <div className="lift rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <Scale size={15} className="text-brand" /> Options, with predicted outcomes
          </p>
          <div className="mt-3 grid gap-2">
            {opts.map((o) => (
              <div key={o.n} className="flex items-center gap-2.5">
                <span className="w-14 shrink-0 text-[11px] font-semibold text-muted-foreground">{o.n}</span>
                <div className="h-4 flex-1 overflow-hidden rounded bg-slate-100">
                  <span className={'block h-full rounded ' + (o.rec ? 'bg-active' : 'bg-slate-300')} style={{ width: `${o.w}%` }} />
                </div>
                <span className="grid size-4 shrink-0 place-items-center">{o.rec && <Check size={13} className="text-active" />}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {industries.slice(0, 4).map((x) => (
              <span key={x} className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand">{x}</span>
            ))}
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand">+ more</span>
          </div>
        </div>
        <div className="lift rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <ClipboardCheck size={15} className="text-brand" /> Decision record
          </p>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0">
            {['Owner approved', 'Reason on record', 'Result tracked', 'Learning kept'].map((t) => (
              <li key={t} className="flex items-center gap-2 text-xs text-foreground">
                <span className="grid size-4 place-items-center rounded-full bg-teal-50 text-active">
                  <Check size={11} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function BenefitsHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pb-20 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Results</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            Better decisions. <span className="grad-text">Results you can see.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[32em] text-lg leading-relaxed text-muted-foreground">
            Kimaru helps manufacturing teams make their production-planning calls with material, capacity and due dates in view, then tracks the result against your own baseline.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
            <Button href="#outcomes" variant="outline" size="lg">
              See what you get
            </Button>
          </div>
          <ul className="rise rise-5 m-0 mt-7 grid list-none gap-2.5 p-0 text-[15px] text-foreground">
            {['Start with one decision, not a big rollout', 'Works with the systems and data you already have', 'Your team stays the owner of every call'].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-50 text-active">
                  <Check size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rise rise-5">
          <HeroArt />
        </div>
      </Container>
    </div>
  );
}

/* ---------- What you get ---------- */

function Spark({ v, down }: { v: number[]; down?: boolean }) {
  const w = 132, h = 44;
  const max = Math.max(...v), min = Math.min(...v);
  const xy = v.map((n, i) => [4 + (i * (w - 8)) / (v.length - 1), 4 + (h - 8) * (1 - (n - min) / (max - min))] as const);
  const line = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-11 w-[132px]" role="presentation">
      <polygon points={`${line} ${last[0]},${h} 4,${h}`} fill="#008080" fillOpacity=".1" />
      <polyline points={line} fill="none" stroke="#008080" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="3.6" fill="#008080" />
      <title>{down ? 'Trending down' : 'Trending up'}</title>
    </svg>
  );
}

const outcomes: Array<{ icon: LucideIcon; t: string; b: string; see: string[]; spark: number[]; down?: boolean; trend: string }> = [
  {
    icon: Handshake,
    t: 'Dates you can promise and keep',
    b: 'Decisions are made with material, capacity and demand in view, so commitments hold. Customers see dependable delivery, and dependable delivery wins repeat orders.',
    see: ['On-time and in-full rate', 'Late orders', 'Repeat orders and renewals'],
    spark: [30, 33, 32, 41, 50, 58, 69, 78],
    trend: 'On-time delivery',
  },
  {
    icon: PiggyBank,
    t: 'Less waste and avoidable cost',
    b: 'Each option shows its cost beside its outcome. You pay for an expedite, a buffer or overtime only where it earns its keep, and stop paying where it does not.',
    see: ['Expedite and overtime spend', 'Excess stock and stockouts', 'Scrap and rework'],
    spark: [82, 78, 72, 64, 52, 44, 36, 30],
    down: true,
    trend: 'Avoidable cost',
  },
  {
    icon: Clock,
    t: 'Faster, clearer decisions',
    b: 'Facts, options and the approver sit in one place. Planners spend their time deciding instead of chasing data, and urgent calls no longer wait for the next meeting.',
    see: ['Hours per decision', 'Time from alert to action'],
    spark: [80, 72, 62, 54, 42, 34, 26, 20],
    down: true,
    trend: 'Time to decide',
  },
  {
    icon: ShieldCheck,
    t: 'Decisions on record, learning each time',
    b: 'Every decision keeps its reasoning, owner and expected result. When the actual result arrives, the next comparable call starts from what the team learned.',
    see: ['Expected against actual', 'Decisions reviewed and reused'],
    spark: [20, 28, 38, 48, 60, 70, 82, 90],
    trend: 'Team learning',
  },
];

export function Outcomes() {
  return (
    <Section id="outcomes">
      <SectionHead eyebrow="What you get" title="Results you can see in your own numbers." body="Kimaru does not add another dashboard. It improves the recurring decisions behind your delivery, cost and cash, and measures the change against your own baseline." />
      <div className="grid gap-5 md:grid-cols-2">
        {outcomes.map((o, n) => (
          <Reveal key={o.t} delay={(n % 2) * 90} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                  <o.icon size={22} />
                </span>
                <div className="text-right">
                  <Spark v={o.spark} down={o.down} />
                  <p className="-mt-0.5 flex items-center justify-end gap-1 text-[11px] font-semibold text-active">
                    <ArrowUpRight size={12} className={o.down ? 'rotate-90' : ''} /> {o.trend}
                  </p>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-extrabold leading-tight text-primary">{o.t}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{o.b}</p>
              <div className="mt-auto pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">You will see it in</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {o.see.map((x) => (
                    <span key={x} className="rounded-full bg-teal-50 px-3 py-1 text-[13px] font-semibold text-active">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Trend lines are illustrative of the direction teams track, not customer data.</p>
    </Section>
  );
}

/* ---------- Decisions we solve: the problems most industrial teams share ---------- */

const cases: Array<{ icon: LucideIcon; t: string; pain: string; help: string }> = [
  { icon: Handshake, t: 'Order commitment', pain: 'Orders are promised before material, capacity and due dates are checked together.', help: 'Commit to dates you can keep, with the trade-offs shown.' },
  { icon: Layers3, t: 'Scheduling and sequencing', pain: 'The schedule breaks when priorities change mid-week.', help: 'Resequence builds fast, with the effect on every order in view.' },
  { icon: PackageSearch, t: 'Material readiness and shortages', pain: 'A late or short material stops a build at the last minute.', help: 'Spot shortages early and choose the best response.' },
  { icon: Gauge, t: 'Capacity and machine allocation', pain: 'Some machines sit idle while others are overloaded.', help: 'Load work onto the machines that can run it.' },
  { icon: Scale, t: 'Lot sizing and changeovers', pain: 'Too many small lots and changeovers waste time and material.', help: 'Group work within your lot-mixing and compatibility rules.' },
  { icon: Clock, t: 'Expedite and overtime', pain: 'Rush work and overtime are approved without knowing what they buy.', help: 'Expedite only where it pays back.' },
  { icon: Boxes, t: 'Work-in-progress and buffers', pain: 'Stock builds up in one place while other orders wait.', help: 'Set build and buffer levels that match real demand.' },
  { icon: Wrench, t: 'Maintenance windows', pain: 'Planned maintenance collides with urgent orders.', help: 'Fit maintenance around the orders that cannot slip.' },
];

export function UseCases() {
  return (
    <Section id="usecases" tone="alt">
      <SectionHead eyebrow="Decisions we solve" title="The production-planning decisions that cost you most." body="These are the calls planners make every week. Each one is a recurring decision Kimaru can take on." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, n) => (
          <Reveal key={c.t} delay={(n % 3) * 70} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <c.icon size={18} />
                </span>
                <h3 className="text-lg font-bold leading-snug text-primary">{c.t}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-snug text-muted-foreground">{c.pain}</p>
              <p className="mt-auto flex items-start gap-2 pt-3 text-[15px] font-semibold leading-snug text-active">
                <Check size={17} className="mt-0.5 shrink-0" />
                {c.help}
              </p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={140} className="h-full">
          <a href={BOOK_URL} className="lift group flex h-full flex-col rounded-2xl border border-dashed border-ring bg-brand-soft/60 p-5 no-underline">
            <span className="grid size-10 place-items-center rounded-xl bg-active text-white">
              <MessageSquarePlus size={18} />
            </span>
            <h3 className="mt-3 text-lg font-bold leading-snug text-primary">Another planning decision in mind?</h3>
            <p className="mt-2 text-[15px] leading-snug text-muted-foreground">If a production-planning call repeats and a wrong answer is costly, we can likely take it on. Tell us what you want to solve.</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] font-semibold text-active">
              Tell us your use case <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- Who benefits ---------- */

const roles: Array<{ icon: LucideIcon; who: string; line: string; b: string[] }> = [
  { icon: Users, who: 'Planners', line: 'Decide, instead of chasing data.', b: ['Evidence from your systems and spreadsheets in one view', 'Options with their predicted outcome, ready to compare'] },
  { icon: UserCheck, who: 'Approvers', line: 'One clear call to make.', b: ['A recommendation to approve, adjust or defer', 'Their judgment stays on record'] },
  { icon: Wallet, who: 'Finance', line: 'See what each decision was worth.', b: ['The cost of each option beside its outcome', 'A tracker of expected against actual'] },
  { icon: Gauge, who: 'Leadership', line: 'Steadier delivery, fewer fire drills.', b: ['Fewer surprises reaching customers', "Results measured against the team's own baseline"] },
];

export function Roles() {
  return (
    <Section id="roles">
      <SectionHead eyebrow="Who benefits" title="Useful from the planner to the boardroom." body="Each role gets what it needs, and everyone works from the same facts." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r, n) => (
          <Reveal key={r.who} delay={n * 80} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
                <r.icon size={18} />
              </span>
              <h3 className="mt-3 text-lg font-bold text-primary">{r.who}</h3>
              <p className="mt-1 text-[15px] font-semibold leading-snug text-active">{r.line}</p>
              <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
                {r.b.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-[14px] leading-snug text-muted-foreground">
                    <Check size={15} className="mt-0.5 shrink-0 text-active" />
                    {x}
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

/* ---------- How you get there ---------- */

const steps: Array<{ icon: LucideIcon; t: string; you: string; us: string }> = [
  { icon: Target, t: 'Choose a decision', you: 'Pick one recurring call that costs you when it goes wrong.', us: "We frame the decision, its owner and today's baseline with you." },
  { icon: Layers3, t: 'Bring the evidence together', you: 'Share access to your systems, data and rules.', us: 'We connect them and show every fact with its source.' },
  { icon: Scale, t: 'Decide with options', you: 'The owner approves, adjusts or defers.', us: 'We show each option with its cost and predicted outcome.' },
  { icon: LineChart, t: 'Measure the change', you: 'Review results against your baseline.', us: 'We track expected against actual and feed the learning back.' },
];

export function Journey() {
  return (
    <Section id="journey" tone="alt">
      <SectionHead eyebrow="How you get there" title="From one decision to a measured result." body="Start with the decision that matters most. The pilot is built around it, with your team in the lead." />
      <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, n) => (
          <Reveal key={s.t} delay={n * 80} className="h-full">
            <li className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <s.icon size={18} />
                </span>
                <span className="text-sm font-bold text-muted-foreground">0{n + 1}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-primary">{s.t}</h3>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">Your team</p>
              <p className="mt-1 text-[15px] leading-snug text-foreground">{s.you}</p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-active">Kimaru</p>
              <p className="mt-1 text-[15px] leading-snug text-muted-foreground">{s.us}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ---------- Pilot stories: the one place customers appear ---------- */

const stories: Array<{ icon: LucideIcon; who: string; t: string; b: string; pts: string[] }> = [
  {
    icon: Truck,
    who: 'Sports electronics manufacturer',
    t: 'Fewer, fuller truck plans, with stock always in range.',
    b: 'Kimaru built a Decision Model that optimizes the number of truck plans. Loads are combined so each truck carries more and goes out less often, and stock stays between shortage and surplus.',
    pts: ['An optimized number of truck plans, with fewer repeat trips', 'One load shared with a warehouse on the route, using the full truck volume', 'No overstock and no stockout'],
  },
  {
    icon: Factory,
    who: 'Aircraft fabrics manufacturer',
    t: 'Production planning across material, machine and lot rules.',
    b: 'Kimaru built a Decision Model for a production-planning decision with many rules to respect, so the plan works on the shop floor and not only on paper.',
    pts: ['Material readiness and capacity in one view', 'Machine compatibility and lot-mixing rules built in', 'Planner judgment kept on record'],
  },
];

export function Stories() {
  return (
    <Section id="stories">
      <SectionHead eyebrow="Pilot stories" title="Built with manufacturers, for real decisions." body="Each pilot was built around the customer's own decision, rules and data. We describe customers by industry, not by name." />
      <div className="grid gap-5 md:grid-cols-2">
        {stories.map((s, n) => (
          <Reveal key={s.who} delay={n * 110} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                  <s.icon size={20} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{s.who}</span>
              </div>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-primary">{s.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.b}</p>
              <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
                {s.pts.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-[15px] text-foreground">
                    <Check size={18} className="mt-0.5 shrink-0 text-active" />
                    {x}
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

/* ---------- Close ---------- */

export function BenefitsClose() {
  return (
    <Section id="next" tone="alt">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>Next step</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Start with the decision that costs you most.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Bring one recurring decision. We will outline a pilot with the decision, the baseline, the owner and a timeline, and your team stays in the lead.</p>
          <div className="mt-6">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {[
              { icon: PiggyBank, t: 'Less waste and avoidable cost' },
              { icon: Handshake, t: 'Dates you can promise and keep' },
              { icon: ShieldCheck, t: 'Decisions your team can stand behind' },
              { icon: LineChart, t: 'A result measured against your baseline' },
            ].map((x) => (
              <li key={x.t} className="lift flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-active">
                  <x.icon size={18} />
                </span>
                <span className="text-[15px] font-semibold leading-snug text-primary">{x.t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
