import { ChevronRight, History, Radar, Repeat, Scale, Send, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section, SectionHead } from './ui';
import { Reveal } from './motion';

/* How a decision moves, as a connected chain. The screens for each step are in the section above. */

type Step = { icon: LucideIcon; k: string; gps: string; b: string; ex: string };
const steps: Step[] = [
  { icon: Radar, k: 'Understand', gps: 'Where you are', b: 'An alert lands with its source and confidence, and the items it affects.', ex: 'A typhoon threatens component supply. Each affected component is listed with its delay.' },
  { icon: Scale, k: 'Compare', gps: 'The routes', b: 'The practical options appear side by side, each with its predicted outcome.', ex: 'Air-freight now, or split air and sea. Each shows its risk, cost and confidence.' },
  { icon: ShieldCheck, k: 'Govern', gps: 'You pick the route', b: 'The right person accepts, adjusts or defers, and the reasoning is kept.', ex: 'The plant manager approves one plan. A Decision Receipt records why.' },
  { icon: Send, k: 'Act', gps: 'Go', b: 'What was approved goes where work happens.', ex: 'The plan is sent to the ERP or exported as a file, within the owner’s limits.' },
  { icon: History, k: 'Learn', gps: 'It reroutes next time', b: 'The result is tracked against what was expected and kept.', ex: 'Expected against actual is stored, so the next shortage starts from what was learned.' },
];

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHead eyebrow="How it works" title="Understand, compare, govern, act, learn." body="One loop for every recurring decision. Shown here with a typhoon alert that threatens component supply." />
      <ol className="relative m-0 ml-[22px] grid list-none gap-0 p-0 lg:ml-0 lg:grid-cols-5 lg:gap-5">
        {/* connecting line, desktop */}
        <span className="pointer-events-none absolute left-[10%] right-[10%] top-[22px] hidden h-0.5 bg-[linear-gradient(90deg,#008080,#253B7F)] opacity-40 lg:block" aria-hidden="true" />
        {steps.map((s, n) => (
          <Reveal key={s.k} delay={n * 90} className="h-full">
            <li className="relative flex gap-4 pb-8 last:pb-0 max-lg:border-l-2 max-lg:border-dashed max-lg:border-ring/60 max-lg:pl-8 lg:h-full lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
              <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 border-brand bg-white text-brand shadow-sm max-lg:absolute max-lg:-left-[23px] max-lg:top-0">
                <s.icon size={20} />
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">{n + 1}</span>
              </span>
              {n < steps.length - 1 && (
                <ChevronRight size={14} className="absolute right-[-17px] top-[15px] z-10 hidden rounded-full bg-white text-muted-foreground lg:block" aria-hidden="true" />
              )}
              <div className="min-w-0 lg:mt-5 lg:flex lg:w-full lg:flex-1 lg:flex-col">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.09em] text-active">{s.gps}</p>
                <h3 className="m-0 mt-1 text-xl font-bold text-primary">{s.k}</h3>
                <p className="m-0 mt-2 text-[15px] leading-snug text-muted-foreground lg:min-h-[69px]">{s.b}</p>
                <p className="m-0 mt-5 rounded-lg border border-border bg-panel px-3 py-2.5 text-left text-[13px] leading-snug text-foreground lg:mt-auto lg:h-[120px]">
                  <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">In this example</span>
                  {s.ex}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={200}>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-ring bg-card px-5 py-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Repeat size={18} /></span>
          <p className="m-0 min-w-0 flex-1 text-[15px] leading-snug text-muted-foreground">
            <b className="font-semibold text-primary">The loop closes.</b> Every result is kept as Decision Memory, so the next comparable decision starts from what the company already knows.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
