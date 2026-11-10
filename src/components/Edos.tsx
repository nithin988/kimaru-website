import { useEffect, useState } from 'react';
import { Brain, Cable, Database, History, LayoutDashboard, LayoutGrid, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BrowserFrame, Section, SectionHead, asset, cn, useInView } from './ui';
import { Reveal } from './motion';
import { SharedConfigured } from './Architecture';

type Layer = {
  id: string;
  tier: 'Decision Models' | 'Kimaru core' | 'Your systems and data';
  icon: LucideIcon;
  title: string;
  short: string;
  body: string;
  replaces: string;
  img?: { src: string; title: string; aspect: string };
  chips?: string[];
};

const layers: Layer[] = [
  {
    id: 'apps', tier: 'Decision Models', icon: LayoutGrid, title: 'Decision models', short: 'One application per recurring decision',
    body: 'Each recurring call becomes a Decision Model with its own rules, constraints, options, workflow and outcome measures. Start with one. Add the next when the first proves itself.',
    replaces: 'A fresh spreadsheet and meeting every time',
    chips: ['Production commitment', 'Material readiness', 'Inventory and allocation', 'Supplier, BOM and cost', 'Order prioritization', 'Invoice exceptions'],
  },
  {
    id: 'reality', tier: 'Kimaru core', icon: Database, title: 'Reality', short: 'What is true right now',
    body: 'Connects your systems and data, and brings the facts for a decision together with their source and confidence.',
    replaces: 'Gathering facts by hand from several systems',
    img: { src: 'screens/uc-hub.png', title: 'Work Hub', aspect: '1440 / 651' },
  },
  {
    id: 'decisions', tier: 'Kimaru core', icon: Brain, title: 'Decisions', short: 'Compare feasible options',
    body: 'Causal models and simulation test what each option would do, so you compare likely consequences before anyone commits.',
    replaces: 'Gut feel about what will happen',
    img: { src: 'screens/uc-cdd-select.png', title: 'Causal AI Modeler: select a node to see its connections', aspect: '1440 / 900' },
  },
  {
    id: 'cockpit', tier: 'Kimaru core', icon: LayoutDashboard, title: 'Cockpit', short: 'Where people work',
    body: 'The screens where planners compare options and decide. Ask the agent why a recommendation was made, or what else you could do.',
    replaces: 'Answers locked in one expert’s head',
    img: { src: 'screens/uc-agent.png', title: 'Agent Interaction drawer', aspect: '1440 / 900' },
  },
  {
    id: 'gov', tier: 'Kimaru core', icon: ShieldCheck, title: 'Governance', short: 'Authority, approval and audit',
    body: 'Approval rules decide who can commit. Each decision keeps a Decision Receipt of what was known, who approved it and why. AI tools act only on what was approved.',
    replaces: 'Approvals buried in email',
    img: { src: 'screens/uc-act.png', title: 'Review recommendations', aspect: '1440 / 775' },
  },
  {
    id: 'memory', tier: 'Kimaru core', icon: History, title: 'Decision Memory', short: 'What worked, kept',
    body: 'Expected against actual for every decision, so the next comparable decision starts with what the company already learned.',
    replaces: 'Knowledge that walks out with one expert',
    img: { src: 'screens/uc-learn.png', title: 'Decision Tracker', aspect: '1440 / 662' },
  },
  {
    id: 'connect', tier: 'Your systems and data', icon: Cable, title: 'Connectors', short: 'Whatever you already run',
    body: 'Start from controlled files, read-only database views or scheduled API pulls. No write-back is needed to begin. Write-back follows the integration you agree.',
    replaces: 'Rip-and-replace projects',
    chips: ['ERP', 'SCM, WMS, TMS', 'Spreadsheets and files', 'Databases and APIs', 'Planner know-how', 'AI assistants'],
  },
];

function Stack() {
  const [active, setActive] = useState('apps');
  const [auto, setAuto] = useState(true);
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  const cur = layers.find((l) => l.id === active)!;

  // Walks through the layers once the section is in view, until the visitor picks one.
  useEffect(() => {
    if (!auto || !seen || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    const t = setInterval(() => {
      setActive((a) => layers[(layers.findIndex((l) => l.id === a) + 1) % layers.length].id);
    }, 5200);
    return () => clearInterval(t);
  }, [auto, seen]);
  const pick = (id: string) => {
    setAuto(false);
    setActive(id);
  };
  const tiers: Layer['tier'][] = ['Decision Models', 'Kimaru core', 'Your systems and data'];

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
      <div className="rounded-xl border border-brand bg-brand p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/75">Kimaru Enterprise Decision Operating System</p>
        <div className="grid gap-3">
          {tiers.map((t) => (
            <div key={t} className="rounded-[10px] bg-white/10 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">{t}</p>
              <div className="grid gap-2">
                {layers
                  .filter((l) => l.tier === t)
                  .map((l) => (
                    <button
                      key={l.id}
                      onClick={() => pick(l.id)}
                      aria-pressed={active === l.id}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300',
                        active === l.id ? 'ping-soft translate-x-1 bg-white text-primary shadow-md' : 'bg-white/10 text-white hover:bg-white/20',
                      )}
                    >
                      <l.icon size={18} className="shrink-0" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-tight">{l.title}</span>
                        <span className={cn('block text-xs', active === l.id ? 'text-muted-foreground' : 'text-white/75')}>{l.short}</span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div key={cur.id} className="fade-in min-w-0 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[10px] bg-brand-soft text-brand">
            <cur.icon size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{cur.tier}</p>
            <h3 className="text-xl font-bold text-primary">{cur.title}</h3>
          </div>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{cur.body}</p>
        <p className="mt-3 inline-flex rounded-md bg-secondary px-3 py-1.5 text-[13px] text-muted-foreground">
          Replaces: <b className="ml-1 font-semibold text-foreground">{cur.replaces}</b>
        </p>
        {cur.img && <BrowserFrame className="mt-5" src={cur.img.src} alt={`${cur.img.title} screen in Kimaru`} title={cur.img.title} aspect={cur.img.aspect} />}
        {cur.chips && (
          <div className="mt-5 flex flex-wrap gap-2">
            {cur.chips.map((c) => (
              <span key={c} className="rounded-full border border-border bg-panel px-3 py-1.5 text-[13px] font-medium">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Edos() {
  return (
    <Section id="edos" tone="alt">
      <div className="mb-12 grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <SectionHead
          className="!mb-0"
          eyebrow="Enterprise Decision Operating System"
          title="One engine. A Decision Model for every recurring call."
          body="A phone has one operating system and many apps. Kimaru has one reusable engine and a Decision Model for each decision, built on top of the systems you already run."
        />
        <Reveal delay={120} className="mx-auto w-full max-w-[380px]">
          <div className="floaty relative aspect-square overflow-hidden rounded-3xl">
            <img src={asset('photos/layers.webp')} alt="Three layers: decision apps on top, rules and connections in the middle, your data underneath" loading="lazy" className="absolute inset-0 h-full w-full origin-top-left scale-[1.1] object-cover" />
          </div>
        </Reveal>
      </div>
      <Stack />
      <div className="mt-12">
        <SharedConfigured />
      </div>
    </Section>
  );
}
