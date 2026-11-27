import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, BarChart3, Bell, Check, ChevronRight, Clock, Home, Lock, Network, Scale, TrendingUp } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, Section, SectionHead, cn } from './ui';
import { Reveal } from './motion';
import { ScaledArt } from './ProductArt';

/* A guided tour of one decision. The screens are drawn in code from generic, synthetic data,
   so they stay sharp, read in the same order, and show the idea without the mechanics. */

const W = 860;
const H = 520;

function Pin({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn('absolute z-10 grid size-7 place-items-center rounded-full bg-active text-[13px] font-bold text-white shadow-[0_0_0_4px_rgba(0,128,128,0.18)]', className ?? '-left-3 -top-3')}>
      {n}
    </span>
  );
}

function Shell({ title, children, steps }: { title: string; children: ReactNode; steps?: boolean }) {
  return (
    <div className="relative flex bg-white text-primary" style={{ width: W, height: H, fontFamily: 'Inter, sans-serif' }}>
      <div className="flex w-14 shrink-0 flex-col items-center gap-5 border-r border-border bg-white pt-5 text-muted-foreground">
        <span className="size-4 rotate-45 rounded-[3px] bg-logo-teal" />
        <Home size={18} />
        <BarChart3 size={18} />
        <Network size={18} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col bg-panel">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-6">
          <p className="m-0 text-[20px] font-bold">{title}</p>
          {steps ? (
            <div className="flex items-center gap-3 text-[13px] font-semibold">
              <span className="flex items-center gap-1.5"><span className="grid size-6 place-items-center rounded-full border-2 border-primary text-[12px]">1</span> Decide</span>
              <span className="h-px w-8 bg-border" />
              <span className="flex items-center gap-1.5 text-muted-foreground"><span className="grid size-6 place-items-center rounded-full border-2 border-border text-[12px]">2</span> Review</span>
            </div>
          ) : (
            <Bell size={18} className="text-muted-foreground" />
          )}
        </div>
        <div className="relative min-h-0 flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

const orders = [
  { id: 'Order 1042', p: 'Control unit', due: 'Dec 12', risk: 72, conf: 94, act: 'Hold until supply returns' },
  { id: 'Order 1057', p: 'Housing kit', due: 'Dec 15', risk: 66, conf: 90, act: 'Commit at the later date' },
  { id: 'Order 1063', p: 'Cable set', due: 'Dec 18', risk: 41, conf: 88, act: 'Use alternate component' },
  { id: 'Order 1071', p: 'Sensor pack', due: 'Dec 20', risk: 24, conf: 92, act: 'Keep as scheduled' },
  { id: 'Order 1080', p: 'Power module', due: 'Dec 22', risk: 18, conf: 91, act: 'Keep as scheduled' },
];

function HubScreen() {
  return (
    <Shell title="Good morning">
      <div className="grid h-full grid-cols-[190px_1fr] gap-5">
        <div className="relative rounded-xl border border-border bg-white p-4">
          <Pin n={1} />
          <p className="m-0 text-[16px] font-bold">My tasks</p>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-panel px-3 py-3 text-[14px] font-semibold">
            Production alerts
            <span className="grid size-6 place-items-center rounded-full bg-primary text-[12px] text-white">3</span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-3 text-[14px] text-muted-foreground">Supplier issues <span>2</span></div>
          <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-3 text-[14px] text-muted-foreground">Quality holds <span>1</span></div>
        </div>
        <div className="rounded-xl border border-border bg-white">
          <div className="border-b border-border bg-panel px-5 py-3.5 text-[17px] font-bold">Material shortage → Plant A</div>
          <div className="grid gap-5 p-5">
            <div className="flex flex-wrap gap-x-8 gap-y-1 text-[14px]">
              {[['Source', 'Supplier signal'], ['Impact', 'Delivery delay'], ['Duration', 'Next 5 days'], ['Confidence', '92%']].map(([k, v]) => (
                <p key={k} className="m-0 text-muted-foreground">{k}: <span className="font-semibold text-primary">{v}</span></p>
              ))}
            </div>
            <div className="grid grid-cols-[1.35fr_1fr] gap-6">
              <div className="relative">
                <Pin n={2} className="-left-2 -top-5" />
                <p className="m-0 mt-2 text-[16px] font-bold">Orders affected</p>
                <div className="mt-3 grid gap-2.5 text-[14px]">
                  {orders.slice(0, 4).map((o, i) => (
                    <div key={o.id} className="flex items-center justify-between rounded-lg bg-panel px-3.5 py-2.5">
                      <span className="font-semibold">{o.id} · {o.p}</span>
                      <span className="text-muted-foreground">{[5, 10, 15, 20][i]} days</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Pin n={3} className="-left-2 -top-5" />
                <p className="m-0 mt-2 text-[16px] font-bold leading-snug">Review 6 recommendations to cut late-order risk</p>
                <div className="mt-4 flex gap-2.5">
                  <span className="rounded-lg bg-primary px-5 py-2.5 text-[14px] font-semibold text-white">Review</span>
                  <span className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground"><Clock size={16} /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function RecsScreen() {
  const cols = 'grid-cols-[1.15fr_1fr_0.7fr_1.2fr_0.8fr_1.7fr]';
  return (
    <Shell title="Material shortage → Plant A" steps>
      <div className="rounded-xl border border-border bg-white">
        <div className={cn('grid gap-3 border-b border-border px-5 py-3.5 text-[12px] font-bold uppercase tracking-wide text-muted-foreground', cols)}>
          <span className="relative">Order<Pin n={1} className="-left-3 -top-6" /></span>
          <span>Product</span>
          <span>Due</span>
          <span className="relative">Late-order risk<Pin n={2} className="-left-3 -top-6" /></span>
          <span>Confidence</span>
          <span className="relative">Recommended action<Pin n={3} className="-left-3 -top-6" /></span>
        </div>
        {orders.map((o) => (
          <div key={o.id} className={cn('grid items-center gap-3 border-b border-border px-5 py-4 text-[14px] last:border-0', cols)}>
            <span className="font-semibold">{o.id}</span>
            <span className="text-muted-foreground">{o.p}</span>
            <span>{o.due}</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-14 overflow-hidden rounded-full bg-slate-100"><span className={cn('block h-full rounded-full', o.risk > 60 ? 'bg-amber-500' : o.risk > 35 ? 'bg-amber-300' : 'bg-active')} style={{ width: `${o.risk}%` }} /></span>
              <span className="font-semibold">{o.risk}%</span>
            </span>
            <span>{o.conf}%</span>
            <span className="flex items-center justify-between font-semibold text-active">{o.act}<ChevronRight size={15} className="text-muted-foreground" /></span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function CddScreen() {
  const colW = 148;
  const col = (title: string, items: string[], x: number) => (
    <div key={title} className="absolute top-0" style={{ left: x, width: colW }}>
      <p className="m-0 text-[15px] font-bold">{title}</p>
      <div className="mt-3 grid gap-2.5">{items.map((t) => <div key={t} className="rounded-lg border border-border bg-white px-3 py-3 text-[13px] font-semibold leading-snug">{t}</div>)}</div>
    </div>
  );
  return (
    <Shell title="Decision map">
      <div className="relative h-full">
        {col('Actions', ['Supplier choice', 'Safety stock', 'Production sequence', 'Overtime'], 0)}
        {col('Intermediates', ['Component availability', 'Line utilisation', 'Order risk'], 176)}
        <div className="absolute top-0" style={{ left: 352, width: colW }}>
          <p className="m-0 text-[15px] font-bold">Outcomes</p>
          <div className="mt-3 grid gap-2.5">
            <div className="relative rounded-lg border-2 border-brand bg-brand-soft px-3 py-3 text-[13px] font-semibold"><Pin n={1} className="-right-3 -top-3" />On-time delivery</div>
            <div className="rounded-lg border border-border bg-white px-3 py-3 text-[13px] font-semibold">Cost of delay</div>
          </div>
        </div>
        <svg className="pointer-events-none absolute left-0 top-0" width="500" height="320" fill="none" aria-hidden="true">
          {[[148, 62, 176, 62], [148, 120, 176, 62], [148, 178, 176, 120], [148, 236, 176, 178], [324, 62, 352, 62], [324, 120, 352, 62], [324, 178, 352, 62]].map(([a, b, c, d], i) => (
            <path key={i} d={`M${a} ${b} C ${a + 14} ${b}, ${c - 14} ${d}, ${c} ${d}`} stroke="#253B7F" strokeOpacity=".45" strokeWidth="1.6" strokeDasharray="4 4" />
          ))}
        </svg>
        <div className="absolute right-0 top-0 w-[250px] rounded-xl border border-border bg-white p-4">
          <p className="m-0 text-[16px] font-bold">On-time delivery</p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">Share of orders shipped by the promised date.</p>
          <p className="relative mt-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">What moves it<Pin n={2} className="right-0 -top-1" /></p>
          {[['Supplier choice', 'High'], ['Production sequence', 'High'], ['Safety stock', 'Medium'], ['Overtime', 'Low']].map(([k, v]) => (
            <div key={k} className="mt-2 flex items-center justify-between text-[13px]"><span>{k}</span><span className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-bold', v === 'High' ? 'bg-teal-50 text-active' : v === 'Medium' ? 'bg-brand-soft text-brand' : 'bg-slate-100 text-muted-foreground')}>{v}</span></div>
          ))}
          <div className="relative mt-3 grid gap-2 border-t border-border pt-3">
            <Pin n={3} className="-left-3 -top-3" />
            {['Data sources', 'Strength detail', 'Rules'].map((t) => (
              <div key={t} className="flex items-center justify-between rounded-lg bg-panel px-3 py-2 text-[12px] text-muted-foreground"><span className="font-semibold text-primary">{t}</span><span className="flex items-center gap-1"><Lock size={12} /> In a walkthrough</span></div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function ReviewScreen() {
  const rows = [['Order 1042', 'Hold until supply returns', 0], ['Order 1057', 'Commit at the later date', 1], ['Order 1063', 'Use alternate component', 0]] as const;
  return (
    <Shell title="Review recommendations" steps>
      <div className="grid h-full grid-cols-[1.45fr_1fr] gap-5">
        <div className="relative rounded-xl border border-border bg-white p-5">
          <Pin n={1} />
          <p className="m-0 text-[16px] font-bold">Your decisions</p>
          <div className="mt-3 grid gap-3">
            {rows.map(([o, a, sel]) => (
              <div key={o} className="rounded-lg bg-panel px-4 py-3.5 text-[14px]">
                <p className="m-0 font-semibold">{o}</p>
                <p className="m-0 text-muted-foreground">{a}</p>
                <div className="relative mt-2.5 flex w-fit overflow-hidden rounded-lg border border-border bg-white text-[12px] font-semibold">
                  {['Accepted', 'Adjusted', 'Deferred'].map((t, i) => <span key={t} className={cn('px-3 py-1.5', i === sel ? 'bg-active text-white' : 'text-muted-foreground')}>{t}</span>)}
                  {o === 'Order 1042' && <Pin n={2} className="-right-8 -top-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-4">
          <div className="relative rounded-xl border border-border bg-white p-5">
            <Pin n={3} />
            <p className="m-0 text-[16px] font-bold">Reason on record</p>
            <div className="mt-3 rounded-lg bg-panel p-3 text-[13px] leading-snug text-muted-foreground">Customer agreed to the later date. Alternate component is already qualified.</div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Decision owner</p>
            <p className="m-0 mt-1 text-[14px] font-semibold">Plant manager</p>
          </div>
          <span className="rounded-lg bg-primary px-5 py-3 text-center text-[14px] font-semibold text-white">Approve and record</span>
        </div>
      </div>
    </Shell>
  );
}

function TrackerScreen() {
  const log: Array<[string, string, string, string, string, boolean]> = [
    ['Dec 02', 'Order 1042 held', 'Plant manager', 'Late risk down', 'Down', true],
    ['Dec 03', 'Order 1057 moved', 'Plant manager', 'Date held', 'Held', true],
    ['Dec 05', 'Order 1063 re-sourced', 'Buyer', 'Cost flat', 'Slightly up', false],
  ];
  const g = 'grid-cols-[0.6fr_1.4fr_1fr_1fr_0.9fr_0.9fr]';
  return (
    <Shell title="Decision tracker">
      <div className="grid grid-cols-2 gap-4">
        {[['On-time delivery', 'M4 70 L60 62 L110 54 L160 40 L216 26', 'M4 72 L60 60 L110 50 L160 36 L216 18'], ['Cost of delay', 'M4 26 L60 34 L110 44 L160 52 L216 62', 'M4 24 L60 36 L110 48 L160 58 L216 70']].map(([t, a, b], n) => (
          <div key={t} className="relative rounded-xl border border-border bg-white p-4">
            {n === 0 && <Pin n={1} />}
            <p className="m-0 flex items-center gap-2 text-[15px] font-bold"><TrendingUp size={15} className="text-active" />{t}</p>
            <svg viewBox="0 0 220 90" className="mt-1 h-[84px] w-full" aria-hidden="true">
              <path d={a} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5" fill="none" strokeLinecap="round" />
              <path d={b} stroke="#008080" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
            <p className="relative m-0 flex gap-4 text-[12px] font-semibold text-muted-foreground"><span className="text-active">Actual</span><span>Expected</span>{n === 1 && <Pin n={2} className="-right-1 -top-1" />}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-4 rounded-xl border border-border bg-white">
        <Pin n={3} />
        <div className={cn('grid gap-3 border-b border-border px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground', g)}><span>Date</span><span>Decision</span><span>Owner</span><span>Expected</span><span>Actual</span><span>Result</span></div>
        {log.map(([d, a, o, e, ac, ok]) => (
          <div key={a} className={cn('grid items-center gap-3 border-b border-border px-5 py-3.5 text-[13px] last:border-0', g)}>
            <span className="text-muted-foreground">{d}</span><span className="font-semibold">{a}</span><span>{o}</span><span>{e}</span><span>{ac}</span>
            <span className={cn('w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold', ok ? 'bg-teal-50 text-active' : 'bg-amber-50 text-amber-700')}>{ok ? 'As expected' : 'Near'}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

const steps: Array<{ k: string; t: string; line: string; what: string[]; Screen: () => ReactNode }> = [
  { k: 'Understand', t: 'Every alert, with the orders it hits.', line: 'An alert lands in your work hub with its source, confidence and the orders affected.', what: ['Your queue of decisions', 'The alert and its confidence', 'The call to review'], Screen: HubScreen },
  { k: 'Compare', t: 'Every order, with its risk and a recommended action.', line: 'See each order side by side so the team knows where to act first.', what: ['Order, product and due date', 'Late-order risk and confidence', 'The recommended action'], Screen: RecsScreen },
  { k: 'See why', t: 'See what moves the outcome.', line: 'A simple map from your actions to your outcomes. Pick an outcome to see what moves it.', what: ['Outcome you care about', 'Actions and what sits between', 'How strongly each one moves it'], Screen: CddScreen },
  { k: 'Decide', t: 'The owner approves, adjusts or defers.', line: 'Each call is made by the right person, with the reason kept on record.', what: ['Each recommendation', 'Accept, adjust or defer', 'Reason and owner on record'], Screen: ReviewScreen },
  { k: 'Measure', t: 'Expected against actual, kept for next time.', line: 'Results are tracked against what was expected, so the next call starts smarter.', what: ['Outcome trends', 'Expected against actual', 'Every decision, with its result'], Screen: TrackerScreen },
];

export function TourHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative pb-10 pt-12 lg:pt-20">
        <Eyebrow className="rise rise-1">Product tour</Eyebrow>
        <h1 className="rise rise-2 mt-4 max-w-[16em] text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
          One decision, <span className="grad-text">from alert to result.</span>
        </h1>
        <p className="rise rise-3 mt-5 max-w-[36em] text-lg leading-relaxed text-muted-foreground">
          Follow a single production decision through Kimaru in five screens. Every screen uses synthetic data, so you can see how it works without any customer information.
        </p>
        <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
          <Button href="#tour" size="lg">Start the tour <ArrowRight /></Button>
          <Button href={BOOK_URL} variant="outline" size="lg">Book a Decision Walkthrough</Button>
        </div>
      </Container>
    </div>
  );
}

export function TourStage() {
  const [i, setI] = useState(0);
  const s = steps[i];
  const S = s.Screen;
  return (
    <Section id="tour">
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-panel px-5 py-3.5 text-[15px]">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Scenario</span>
        <span className="text-foreground">A key component is delayed. Which orders can we still promise, and what do we do about the rest?</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <ol className="m-0 flex list-none gap-2 overflow-x-auto p-0 lg:grid lg:content-start lg:gap-2 lg:overflow-visible">
          {steps.map((x, n) => (
            <li key={x.k} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => setI(n)}
                aria-current={n === i ? 'step' : undefined}
                className={cn('flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors', n === i ? 'border-brand bg-brand-soft' : 'border-border bg-card hover:bg-panel')}
              >
                <span className={cn('grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-bold', n === i ? 'bg-brand text-white' : 'bg-slate-100 text-muted-foreground')}>{n + 1}</span>
                <span className="text-[15px] font-bold text-primary">{x.k}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="min-w-0">
          <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold leading-tight text-primary">{s.t}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.line}</p>
          <Reveal key={s.k}>
            <div className="mt-5 overflow-hidden rounded-xl border border-border shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]">
              <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
                <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
                <span className="ml-2 font-semibold text-foreground">{s.k}</span>
                <span className="ml-auto hidden sm:inline">Synthetic demo data</span>
              </div>
              <ScaledArt w={W} h={H}><S /></ScaledArt>
            </div>
          </Reveal>
          <ul className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-3">
            {s.what.map((t, n) => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-[14px] leading-snug text-foreground">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-active text-[12px] font-bold text-white">{n + 1}</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between">
            <Button href="#tour" variant="outline" className={i === 0 ? 'pointer-events-none opacity-40' : ''} onClick={(e) => { e.preventDefault(); setI(Math.max(0, i - 1)); }}>Back</Button>
            {i < steps.length - 1 ? <Button href="#tour" onClick={(e) => { e.preventDefault(); setI(i + 1); }}>Next: {steps[i + 1].k} <ArrowRight /></Button> : <Button href={BOOK_URL}>Book a Decision Walkthrough <ArrowRight /></Button>}
          </div>
        </div>
      </div>
    </Section>
  );
}

const locked = ['Data connections', 'Model logic and weights', 'Rules and thresholds', 'Agent behaviour'];

export function Behind() {
  return (
    <Section id="behind" tone="alt">
      <SectionHead eyebrow="Behind the screens" title="The detail is shown in a walkthrough." body="This tour shows what your team sees and does. How the decision is modeled for your operation is covered live, with your own data and rules." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {locked.map((t, n) => (
          <Reveal key={t} delay={n * 70} className="h-full">
            <div className="lift flex h-full items-center gap-3 rounded-2xl border border-dashed border-ring bg-card p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Lock size={18} /></span>
              <span className="text-[15px] font-semibold leading-snug text-primary">{t}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button href={BOOK_URL} size="lg">Book a Decision Walkthrough <ArrowRight /></Button>
        <span className="flex items-center gap-2 text-sm text-muted-foreground"><Check size={16} className="text-active" /> Bring one decision. We outline the pilot with you.</span>
      </div>
    </Section>
  );
}

export function WhyThis() {
  const pts = [
    { icon: Scale, t: 'The same order on every screen', b: 'Each screen answers one question, with the same layout, so you always know where to look.' },
    { icon: Network, t: 'Outcomes first', b: 'You see what you want to change, and how strongly each action moves it.' },
    { icon: Check, t: 'People stay in charge', b: 'Every call is approved by its owner, with the reason on record.' },
  ];
  return (
    <Section id="why">
      <div className="grid gap-4 sm:grid-cols-3">
        {pts.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 80} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-brand text-white"><I size={18} /></span>
              <h3 className="mt-3 text-lg font-bold text-primary">{t}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-muted-foreground">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
