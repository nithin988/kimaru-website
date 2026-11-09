import { Boxes, Cloud, FileCheck2, Factory, Lock, PackageSearch, ShieldCheck, UserCheck } from 'lucide-react';
import { Section, SectionHead, cn, useInView, Eyebrow } from './ui';

const decisions = [
  {
    icon: Factory,
    title: 'Production and material readiness',
    q: 'Which plan do we authorize when material, labor and due dates do not line up?',
    who: 'Plant managers, production planners, operations VPs',
    verbs: ['Resequence', 'Split', 'Expedite', 'Defer'],
  },
  {
    icon: PackageSearch,
    title: 'Supplier, BOM and cost',
    q: 'Do we buy now, wait, substitute or renegotiate when a price or lead time moves?',
    who: 'Procurement, sourcing and finance leaders',
    verbs: ['Buy', 'Wait', 'Substitute', 'Renegotiate'],
  },
  {
    icon: Boxes,
    title: 'Inventory and allocation',
    q: 'Who gets the stock we have when demand is higher than supply?',
    who: 'Supply chain, logistics and customer commitments teams',
    verbs: ['Allocate', 'Hold', 'Transfer', 'Rebalance'],
  },
];

export function Solutions() {
  return (
    <Section id="start" tone="alt">
      <SectionHead eyebrow="Where teams start" title="Start with one decision someone already owns." body="Pick the call your team keeps making the hard way. Add more decisions once the first one pays off." />
      <div className="grid gap-4 md:grid-cols-3">
        {decisions.map(({ icon: I, title, q, who, verbs }) => (
          <article key={title} className="flex min-w-0 flex-col gap-3.5 rounded-xl border border-border bg-card p-6">
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
        <div>
          <Eyebrow>Results</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] text-primary">One pilot, measured.</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            A heavyweight carpet manufacturer used Kimaru to improve production planning. New orders produced on time rose from 43% to 75%, and the plan matched what the ERP could execute 100% of the time, up from 96%.
          </p>
          <p className="mt-4 rounded-lg bg-amber-100 px-4 py-2.5 text-[13px]">
            The 96% to 100% figure is a validation check against the ERP, not an on-time delivery rate. Results are from one pilot and are not universal.
          </p>
        </div>
        <div ref={ref} className="rounded-xl border border-border bg-card p-6">
          <Eyebrow>New orders produced on time</Eyebrow>
          <div className="mt-4 grid h-64 grid-cols-2 items-end gap-5 px-2">
            {[
              { v: 43, label: 'Before', cls: 'bg-slate-300 text-primary' },
              { v: 75, label: 'After Kimaru', cls: 'bg-active text-white' },
            ].map((b) => (
              <div key={b.label} className="flex h-full min-w-0 flex-col justify-end gap-2">
                <div
                  className={cn('flex items-start justify-center rounded-t-lg pt-2.5 text-3xl font-extrabold tabular-nums transition-[height] duration-1000 ease-out', b.cls)}
                  style={{ height: seen ? `${b.v}%` : `${b.v}%`, transform: seen ? 'none' : 'none' }}
                >
                  {b.v}%
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
    </Section>
  );
}

const pilot = [
  { t: 'Define', b: 'Pick one recurring decision. We map who decides, what data they use and how it is made today.' },
  { t: 'Shadow mode', b: 'Kimaru recommends alongside your team and changes nothing in your systems. Your people still decide.' },
  { t: 'Measure', b: 'Compare each recommendation with what happened. Expand only if the numbers justify it.' },
];

export function Pilot() {
  return (
    <Section tone="alt" id="pilot">
      <SectionHead eyebrow="Start small" title="Prove it on one decision before you commit to anything." />
      <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
        {pilot.map((p, n) => (
          <li key={p.t} className="min-w-0">
            <div className="mb-3.5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-[15px] font-bold text-white">{n + 1}</span>
              {n < pilot.length - 1 && <span className="hidden flex-1 border-t-2 border-dashed border-slate-300 md:block" />}
            </div>
            <h3 className="mb-2 text-xl font-bold text-primary">{p.t}</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{p.b}</p>
          </li>
        ))}
      </ol>
      <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-active bg-teal-50 px-6 py-5">
        <b className="text-base text-primary">No write-back and no rip-and-replace.</b>
        <span className="text-[15px] text-muted-foreground">Begin with files or read-only access. Add connections once the first decision has proven itself.</span>
      </div>
    </Section>
  );
}

const trust = [
  { icon: Cloud, t: 'Run it where you choose', b: 'Your AWS account, a private Kimaru-managed tenant, or on-premises.' },
  { icon: Lock, t: 'Read-only to start', b: 'Files, read-only database views or scheduled API pulls. No write-back required.' },
  { icon: ShieldCheck, t: 'Humans keep authority', b: 'Every action follows your approval rules. Nothing runs without the right owner.' },
  { icon: FileCheck2, t: 'A record of every decision', b: 'What was known, what was chosen, who approved it and what happened.' },
];

export function Trust() {
  return (
    <Section id="trust">
      <SectionHead eyebrow="Trust and security" title="Your data stays yours." body="Enterprise teams ask about data first. These are the answers." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(({ icon: I, t, b }) => (
          <div key={t} className="rounded-xl border border-border bg-card p-5">
            <I size={26} className="mb-3 text-active" />
            <h3 className="mb-1.5 text-base font-bold text-primary">{t}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{b}</p>
          </div>
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
