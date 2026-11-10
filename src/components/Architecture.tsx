import { ArrowDown, Lock, Settings2, Layers } from 'lucide-react';
import { Section, SectionHead, cn } from './ui';
import { Reveal } from './motion';

/** Three layers from the EDOS strategy: reusable core, decision application layer, the applications themselves. */
export function ThreeLayerDiagram() {
  const core = ['Reality', 'Decisions', 'Cockpit', 'Governance'];
  const apps = ['Production commitment', 'Order prioritization', 'Invoice exceptions'];
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Reveal>
        <div className="rounded-2xl bg-brand p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-lg font-bold">1. Kimaru core</p>
            <p className="text-[13px] text-white/75">One reusable software foundation</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {core.map((c) => (
              <span key={c} className="rounded-lg bg-white px-3 py-2.5 text-center text-sm font-bold text-brand">
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      <Arrow />
      <Reveal delay={120}>
        <div className="rounded-2xl bg-active p-5 text-white sm:p-6">
          <p className="text-lg font-bold">2. Decision application layer</p>
          <p className="mt-1.5 text-[15px] text-white/90">Business rules · Constraints · Data mapping · Decision workflows · Outcome measures</p>
        </div>
      </Reveal>
      <Arrow />
      <Reveal delay={240}>
        <div className="grid gap-2.5 sm:grid-cols-4">
          {apps.map((a) => (
            <div key={a} className="rounded-xl border border-[#6a0dad] bg-card px-3 py-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6a0dad]">Decision Model</p>
              <p className="mt-1 text-sm font-bold leading-tight text-primary">{a}</p>
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-ring bg-panel px-3 py-3 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Next</p>
            <p className="mt-1 text-sm font-bold leading-tight text-muted-foreground">Your decision</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center py-2 text-[#6a0dad]" aria-hidden="true">
      <ArrowDown size={22} />
    </div>
  );
}

const cols = [
  {
    icon: Layers, tone: 'bg-brand text-white', t: 'Same for every customer',
    items: ['The decision engine', 'Approval and tracking', 'Governance and audit', 'The cockpit screens'],
  },
  {
    icon: Settings2, tone: 'bg-active text-white', t: 'Set up for each decision',
    items: ['Rules and constraints', 'Decision options', 'Data mapping', 'Outcome measures'],
  },
  {
    icon: Lock, tone: 'bg-[#6a0dad] text-white', t: 'Kept apart per customer',
    items: ['Your data', 'Your policies', 'Your configuration', 'Your access controls'],
    note: 'A separate deployment or a securely isolated tenant, depending on your security needs.',
  },
];

/** What is reused, what is configured, what stays separate. Plain-language version of the EDOS reuse model. */
export function SharedConfigured({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {cols.map((c, n) => (
        <Reveal key={c.t} delay={n * 110} className="h-full">
          <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
            <span className={cn('grid size-11 place-items-center rounded-xl', c.tone)}>
              <c.icon size={20} />
            </span>
            <h3 className="mt-4 text-xl font-bold text-primary">{c.t}</h3>
            <ul className="m-0 mt-3 grid list-none gap-2 p-0">
              {c.items.map((i) => (
                <li key={i} className="flex items-center gap-2.5 text-[15px] text-foreground">
                  <span className="size-1.5 shrink-0 rotate-45 rounded-[2px] bg-logo-teal" />
                  {i}
                </li>
              ))}
            </ul>
            {c.note && <p className="mt-auto pt-4 text-[13px] leading-snug text-muted-foreground">{c.note}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Product page section: the three layers plus the shared / configured / separate split. */
export function Architecture() {
  return (
    <Section id="engine" tone="alt">
      <SectionHead
        eyebrow="One engine, many decisions"
        title="Build once. Configure for each decision."
        body="Kimaru is not rebuilt for every customer. Like a phone with one operating system and many apps, one reusable engine runs a Decision Model for each recurring call."
      />
      <ThreeLayerDiagram />
      <div className="mt-12">
        <SharedConfigured />
      </div>
    </Section>
  );
}
