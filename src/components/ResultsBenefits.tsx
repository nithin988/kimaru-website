import { ArrowRight, Boxes, Check, ClipboardCheck, Clock, Factory, Gauge, Handshake, Layers3, LineChart, PiggyBank, Scale, ShieldCheck, Target, Truck, UserCheck, Users, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, Section, SectionHead } from './ui';
import { Reveal } from './motion';

/* ---------- Hero picture: what a team sees after Kimaru, drawn in code (illustrative) ---------- */

function TruckBar({ parts, label }: { parts: Array<{ w: number; cls: string }>; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Truck size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
      <div className="flex h-5 flex-1 overflow-hidden rounded-md bg-slate-100">
        {parts.map((p, i) => (
          <span key={i} className={p.cls} style={{ width: `${p.w}%` }} />
        ))}
      </div>
      {label && <span className="w-9 shrink-0 text-right text-[11px] font-semibold text-muted-foreground">{label}</span>}
    </div>
  );
}

function HeroArt() {
  return (
    <div className="relative mx-auto grid w-full max-w-[560px] gap-4" aria-hidden="true">
      <div className="lift rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-soft text-brand">
              <Truck size={15} />
            </span>
            Truck plan
          </p>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Illustrative</span>
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Before: trucks sent again and again</p>
        <div className="mt-2 grid gap-1.5">
          <TruckBar parts={[{ w: 38, cls: 'bg-slate-300' }]} />
          <TruckBar parts={[{ w: 31, cls: 'bg-slate-300' }]} />
          <TruckBar parts={[{ w: 44, cls: 'bg-slate-300' }]} />
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-active">With Kimaru: one full truck, two warehouses</p>
        <div className="mt-2">
          <TruckBar parts={[{ w: 52, cls: 'bg-active' }, { w: 44, cls: 'bg-brand' }]} />
          <div className="mt-1.5 flex justify-between pl-6 text-[11px] text-muted-foreground">
            <span>Warehouse A</span>
            <span>Warehouse B, on the route</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1.15fr_1fr] gap-4">
        <div className="lift rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <Boxes size={15} className="text-brand" /> Stock vs need
          </p>
          <svg viewBox="0 0 220 96" className="mt-2 w-full" role="presentation">
            <rect x="0" y="26" width="220" height="42" rx="6" fill="#e6f4f4" />
            <line x1="0" y1="26" x2="220" y2="26" stroke="#008080" strokeOpacity=".35" strokeDasharray="4 4" />
            <line x1="0" y1="68" x2="220" y2="68" stroke="#008080" strokeOpacity=".35" strokeDasharray="4 4" />
            <polyline fill="none" stroke="#253B7F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="4,60 30,52 56,58 82,40 108,48 134,34 160,44 186,38 214,46" />
            <circle cx="214" cy="46" r="4" fill="#008080" />
          </svg>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-active">
            <Check size={13} /> No stockout, no overstock
          </p>
        </div>
        <div className="lift rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <ClipboardCheck size={15} className="text-brand" /> Decision record
          </p>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0">
            {['Owner approved', 'Reason on record', 'Expected vs actual'].map((t) => (
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
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:pb-20 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Results</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            What your team gets <span className="grad-text">with Kimaru.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[31em] text-lg leading-relaxed text-muted-foreground">
            Fuller trucks, steadier stock and decisions your team can stand behind. See how each recurring decision gets better, and how you will know.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
            <Button href="#outcomes" variant="outline" size="lg">
              See what you get
            </Button>
          </div>
        </div>
        <div className="rise rise-5">
          <HeroArt />
        </div>
      </Container>
    </div>
  );
}

/* ---------- What you get ---------- */

const outcomes: Array<{ icon: LucideIcon; t: string; b: string; see: string[] }> = [
  {
    icon: Truck,
    t: 'Fuller trucks, fewer repeat trips',
    b: 'Loads are planned together, including a warehouse on the same route, so each truck carries what it can and goes out once.',
    see: ['Truck trips per week', 'Load fill rate', 'Freight cost per unit'],
  },
  {
    icon: Boxes,
    t: 'Stock where it is needed',
    b: 'Plans keep stock between short and surplus, so you avoid both a stockout and money tied up in overstock.',
    see: ['Stockouts', 'Excess stock', 'Working capital in inventory'],
  },
  {
    icon: Clock,
    t: 'Faster, clearer decisions',
    b: 'Facts, options and the approver sit in one place. Planners decide instead of chasing data, and the decision no longer waits for a meeting.',
    see: ['Hours per decision', 'Time from alert to action'],
  },
  {
    icon: ShieldCheck,
    t: 'Decisions on record, learning each time',
    b: 'Every decision keeps its reasoning, owner and expected result. The next comparable call starts from what was learned.',
    see: ['Expected against actual', 'Decisions reviewed and reused'],
  },
];

export function Outcomes() {
  return (
    <Section id="outcomes">
      <SectionHead eyebrow="What you get" title="Better calls, in the numbers you already track." body="Kimaru does not add another dashboard. It improves the recurring decisions behind your cost, service and cash, and shows the change." />
      <div className="grid gap-5 md:grid-cols-2">
        {outcomes.map((o, n) => (
          <Reveal key={o.t} delay={(n % 2) * 90} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                <o.icon size={22} />
              </span>
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
    </Section>
  );
}

/* ---------- Who benefits ---------- */

const roles: Array<{ icon: LucideIcon; who: string; b: string[] }> = [
  { icon: Users, who: 'Planners', b: ['Evidence from the ERP, planning tools and spreadsheets in one view', 'Options with their predicted outcome, ready to compare'] },
  { icon: UserCheck, who: 'Approvers', b: ['One clear recommendation to approve, adjust or defer', 'Their judgment stays on record'] },
  { icon: Wallet, who: 'Finance', b: ['The cost of each option beside its outcome', 'A tracker of what each decision was worth'] },
  { icon: Gauge, who: 'Leadership', b: ['Steadier delivery and fewer fire drills', 'Results measured against the team\'s own baseline'] },
];

export function Roles() {
  return (
    <Section id="roles" tone="alt">
      <SectionHead eyebrow="Who benefits" title="Useful from the planner to the boardroom." body="Each role sees what it needs, and everyone works from the same facts." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r, n) => (
          <Reveal key={r.who} delay={n * 80} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
                <r.icon size={18} />
              </span>
              <h3 className="mt-3 text-lg font-bold text-primary">{r.who}</h3>
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

const steps: Array<{ icon: LucideIcon; t: string; b: string }> = [
  { icon: Target, t: 'Choose a decision', b: 'One recurring call with a clear cost when it goes wrong.' },
  { icon: Layers3, t: 'Bring the evidence together', b: 'Your ERP, planning tools and rules, each with its source.' },
  { icon: Scale, t: 'Decide with options', b: 'The owner approves within their limits, with the reasoning on record.' },
  { icon: LineChart, t: 'Measure the change', b: 'Expected against actual, against your own baseline.' },
];

export function Journey() {
  return (
    <Section id="journey">
      <SectionHead eyebrow="How you get there" title="From one decision to a measured result." body="Start with the decision that matters most. The pilot is built around it." />
      <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, n) => (
          <Reveal key={s.t} delay={n * 80} className="h-full">
            <li className="lift h-full rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <s.icon size={18} />
                </span>
                <span className="text-sm font-bold text-muted-foreground">0{n + 1}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-primary">{s.t}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-muted-foreground">{s.b}</p>
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
    t: 'Truck planning without overstock or stockout.',
    b: 'Kimaru built a Decision Model for planning truck movements, so trucks are not sent again and again.',
    pts: ['Fewer repeat truck trips', 'One load shared with a warehouse on the route, using the full truck volume', 'No overstock and no stockout'],
  },
  {
    icon: Factory,
    who: 'Aircraft fabrics manufacturer',
    t: 'Production planning across material, machine and lot rules.',
    b: 'Kimaru built a Decision Model for a production-planning decision with many rules to respect.',
    pts: ['Material readiness and capacity in one view', 'Machine compatibility and lot-mixing rules built in', 'Planner judgment kept on record'],
  },
];

export function Stories() {
  return (
    <Section id="stories" tone="alt">
      <SectionHead eyebrow="Pilot stories" title="Built for real manufacturing decisions." body="Each pilot was built around the customer's own decision, rules and data. We describe customers by industry, not by name." />
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
    <Section id="next">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>Next step</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Start with the decision that costs you most.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Bring one recurring decision. We will outline a pilot with the decision, the baseline, the owner and a timeline.</p>
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
