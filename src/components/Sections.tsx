import { Boxes, Cloud, FileCheck2, Factory, Lock, PackageSearch, ShieldCheck, UserCheck } from 'lucide-react';
import { BrowserFrame, Section, SectionHead, cn, Eyebrow, useInView, Thumb } from './ui';
import { CountUp, Reveal } from './motion';
import { brandLogos } from '../data/brandLogos';

const decisions = [
  {
    icon: Factory,
    title: 'Production and material readiness',
    q: 'Which plan do we authorize when material, labor and due dates do not line up?',
    who: 'Plant managers, production planners, operations VPs',
    verbs: ['Resequence', 'Split', 'Expedite', 'Defer'],
    shot: 'screens/production-recs.png',
    f: [0.45, 0.56, 1.7] as const,
    cap: 'Component risk by order',
  },
  {
    icon: PackageSearch,
    title: 'Supplier, BOM and cost',
    q: 'Do we buy now, wait, substitute or renegotiate when a price or lead time moves?',
    who: 'Procurement, sourcing and finance leaders',
    verbs: ['Buy', 'Wait', 'Substitute', 'Renegotiate'],
    shot: 'screens/supplier-hub.png',
    f: [0.4, 0.28, 1.7] as const,
    cap: 'Tariff and BOM exposure',
  },
  {
    icon: Boxes,
    title: 'Inventory and allocation',
    q: 'Who gets the stock we have when demand is higher than supply?',
    who: 'Supply chain, logistics and customer commitments teams',
    verbs: ['Allocate', 'Hold', 'Transfer', 'Rebalance'],
    shot: 'screens/work-hub.png',
    f: [0.36, 0.3, 1.8] as const,
    cap: 'Stock and truck loading',
  },
];

export function Solutions() {
  return (
    <Section id="start" tone="alt">
      <SectionHead eyebrow="Where teams start" title="Start with one decision someone already owns." body="Pick the call your team keeps making the hard way. Add more decisions once the first one pays off." />
      <div className="grid gap-4 md:grid-cols-3">
        {decisions.map(({ icon: I, title, q, who, verbs, shot, f, cap }, n) => (
          <Reveal key={title} delay={n * 120} className="h-full">
          <article className="group lift flex h-full min-w-0 flex-col gap-3.5 rounded-xl border border-border bg-card p-5">
            <Thumb src={shot} cx={f[0]} cy={f[1]} zoom={f[2]} cap={cap} className="overflow-hidden rounded-lg border" />
            <span className="grid size-10 place-items-center rounded-[10px] bg-brand-soft text-brand">
              <I size={20} />
            </span>
            <h3 className="text-xl font-bold leading-tight text-primary">{title}</h3>
            <p className="text-sm font-semibold leading-snug">{q}</p>
            <p className="text-[13px] text-muted-foreground">For {who.toLowerCase()}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {verbs.map((v) => (
                <span key={v} className="rounded-full border border-border bg-panel px-2.5 py-1 text-xs text-muted-foreground">
                  {v}
                </span>
              ))}
            </div>
          </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-active bg-teal-50 px-5 py-4 text-[15px]">
        <UserCheck size={18} className="text-active" />
        <b className="text-primary">Does Kimaru replace human judgment?</b>
        <span className="text-muted-foreground">No. Kimaru recommends. The person with the authority decides, and the reasoning stays on record.</span>
      </div>
    </Section>
  );
}

export function Results() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  return (
    <Section id="results">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>Results</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] text-primary">One pilot, measured.</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            A heavyweight carpet manufacturer used Kimaru to improve production planning. New orders produced on time rose from 43% to 75%, and the plan matched what the ERP could execute 100% of the time, up from 96%.
          </p>
          <p className="mt-4 rounded-lg bg-amber-100 px-4 py-2.5 text-[13px]">
            The 96% to 100% figure is a validation check against the ERP, not an on-time delivery rate. Results are from one pilot and are not universal.
          </p>
        </Reveal>
        <div ref={ref} className="rounded-xl border border-border bg-card p-6">
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
          <p className="mt-3 text-xs text-muted-foreground">Anonymized aircraft carpet manufacturer. Measured pilot.</p>
          <div className="mt-4 flex justify-between gap-3 border-t border-border pt-3.5 text-[13px] text-muted-foreground">
            <span>Plan matched ERP-executable schedule</span>
            <span className="tabular-nums">
              <b className="text-foreground">96%</b> to <b className="text-foreground">100%</b>
            </span>
          </div>
        </div>
      </div>

      <Reveal className="mt-14">
        <div className="mb-5 max-w-2xl">
          <h3 className="text-2xl font-bold text-primary">Every decision is tracked against what was expected.</h3>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">The Decision Tracker shows each outcome over time, so you can see which decisions paid off and which missed.</p>
        </div>
        <BrowserFrame src="screens/production-tracker.png" alt="Kimaru Decision Tracker showing on-time delivery rate by product line over six months" title="Decision Tracker" aspect="2000 / 860" imgClassName="object-bottom" />
      </Reveal>
    </Section>
  );
}

const pilot = [
  { t: 'Define', b: 'Pick one recurring decision. We map who decides, what data they use and how it is made today.', shot: 'screens/production-causal.png', f: [0.45, 0.3, 1.7] as const, cap: 'The decision, mapped' },
  { t: 'Shadow mode', b: 'Kimaru recommends alongside your team and changes nothing in your systems. Your people still decide.', shot: 'screens/production-review.png', f: [0.35, 0.3, 1.8] as const, cap: 'Your people still decide' },
  { t: 'Measure', b: 'Compare each recommendation with what happened. Expand only if the numbers justify it.', shot: 'screens/production-tracker.png', f: [0.5, 0.55, 1.5] as const, cap: 'Expected vs actual' },
];

export function Pilot() {
  return (
    <Section tone="alt" id="pilot">
      <SectionHead eyebrow="Start small" title="Prove it on one decision before you commit to anything." />
      <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
        {pilot.map((p, n) => (
          <Reveal as="li" key={p.t} delay={n * 140} className="min-w-0">
            <div className="mb-3.5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-[15px] font-bold text-white">{n + 1}</span>
              {n < pilot.length - 1 && <span className="hidden flex-1 border-t-2 border-dashed border-slate-300 md:block" />}
            </div>
            <div className="group lift overflow-hidden rounded-xl border border-border bg-card">
              <Thumb src={p.shot} cx={p.f[0]} cy={p.f[1]} zoom={p.f[2]} cap={p.cap} />
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-primary">{p.t}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{p.b}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-active bg-teal-50 px-6 py-5">
        <b className="text-base text-primary">No write-back and no rip-and-replace.</b>
        <span className="text-[15px] text-muted-foreground">Begin with files or read-only access. Add connections once the first decision has proven itself.</span>
      </Reveal>
    </Section>
  );
}

const trust = [
  { icon: Cloud, t: 'Run it where you choose', b: 'Your AWS account, a private Kimaru-managed tenant, or on-premises.', logo: 'aws' as const },
  { icon: Lock, t: 'Read-only to start', b: 'Files, read-only database views or scheduled API pulls. No write-back required.' },
  { icon: ShieldCheck, t: 'Humans keep authority', b: 'Every action follows your approval rules. Nothing runs without the right owner.' },
  { icon: FileCheck2, t: 'A record of every decision', b: 'What was known, what was chosen, who approved it and what happened.' },
];

export function Trust() {
  return (
    <Section id="trust">
      <SectionHead eyebrow="Trust and security" title="Your data stays yours." body="Enterprise teams ask about data first. These are the answers." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(({ icon: I, t, b, logo }, n) => (
          <Reveal key={t} delay={n * 90} className="lift flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <I size={26} className="text-active" />
              {logo && (
                <svg role="img" aria-label="AWS" viewBox={`0 0 ${brandLogos[logo].w} ${brandLogos[logo].h}`} className="h-6 w-auto opacity-80" dangerouslySetInnerHTML={{ __html: brandLogos[logo].body }} />
              )}
            </div>
            <h3 className="mb-1.5 text-base font-bold text-primary">{t}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{b}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-active">
        <a href="https://kimaru.ai/product/" className="no-underline hover:underline">Trust and security overview</a>
        <a href="https://kimaru.ai/data-processing-agreement/" className="no-underline hover:underline">Data processing agreement</a>
        <a href="https://kimaru.ai/license-terms/" className="no-underline hover:underline">License terms</a>
      </div>
    </Section>
  );
}
