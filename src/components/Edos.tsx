import { useEffect, useState } from 'react';
import { Bot, Brain, Cable, Database, GitBranch, History, LayoutGrid, MonitorSmartphone, ShieldCheck, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BrowserFrame, Section, SectionHead, cn, useInView } from './ui';
import { Reveal } from './motion';

const jobs = [
  { who: 'Systems of record', title: 'Record what happened', body: 'Orders, inventory, shipments and costs, stored accurately.', eg: 'ERP, WMS, TMS, spreadsheets', icon: Database },
  { who: 'AI assistants', title: 'Answer and assist', body: 'Answer a question, summarize a thread or complete a task on request.', eg: 'Copilot, Claude, chatbots', icon: Sparkles },
  { who: 'Kimaru', title: 'Runs the decision', body: 'Keeps the options, rules, approval and result together, so the company makes the call and learns from it.', eg: 'The decision layer for your stack', icon: GitBranch, us: true },
];

type Layer = {
  id: string;
  tier: 'Decision apps' | 'Core services' | 'Connectors';
  icon: LucideIcon;
  title: string;
  short: string;
  body: string;
  replaces: string;
  img?: { src: string; title: string; pos?: string };
  chips?: string[];
};

const layers: Layer[] = [
  {
    id: 'apps', tier: 'Decision apps', icon: LayoutGrid, title: 'Decision models', short: 'One model per recurring decision',
    body: 'Each recurring call becomes a reusable decision model with its own options, rules, owner and outcomes. Start with one. Add the next when the first proves itself.',
    replaces: 'A fresh spreadsheet and meeting every time',
    chips: ['Production and material readiness', 'Supplier, BOM and cost', 'Inventory and allocation', 'Logistics and delivery', 'Customer commitments', 'Cross-functional exceptions'],
  },
  {
    id: 'causal', tier: 'Core services', icon: Brain, title: 'Causal models and simulation', short: 'What drives the outcome',
    body: 'Levers, outside factors and outcomes are mapped, so each option can be tested before anyone commits to it.',
    replaces: 'Gut feel about what will happen',
    img: { src: 'screens/causal-diagram.png', title: 'Causal AI Modeler', pos: 'object-top' },
  },
  {
    id: 'gov', tier: 'Core services', icon: ShieldCheck, title: 'Governance', short: 'Who has the authority',
    body: 'Accept, adjust or defer each recommendation. Approval rules decide who can commit, and every choice is recorded with its reason.',
    replaces: 'Approvals buried in email',
    img: { src: 'screens/review-step.png', title: 'Review recommendations', pos: 'object-top' },
  },
  {
    id: 'agents', tier: 'Core services', icon: Bot, title: 'Agent orchestration', short: 'AI tools act within limits',
    body: 'Copilot, Claude and other agents carry out approved choices inside the limits you set. They help with the work. They do not own the decision.',
    replaces: 'AI that acts on ambiguous instructions',
    chips: ['Microsoft Copilot', 'Claude', 'Codex', 'SAP Joule', 'Your own agents'],
  },
  {
    id: 'memory', tier: 'Core services', icon: History, title: 'Decision memory', short: 'Results and lessons kept',
    body: 'Expected versus actual, per decision and per outcome. The next person starts with what the company already learned.',
    replaces: 'Knowledge that walks out with one expert',
    img: { src: 'screens/decision-tracker.png', title: 'Decision Tracker', pos: 'object-top' },
  },
  {
    id: 'connect', tier: 'Connectors', icon: Cable, title: 'Connectors', short: 'Whatever you already run',
    body: 'Start from controlled files, read-only database views or scheduled API pulls. No write-back is needed to begin. Write-back follows the integration you agree.',
    replaces: 'Rip-and-replace projects',
    chips: ['ERP', 'SCM, WMS, TMS', 'Spreadsheets and files', 'Databases and APIs', 'Planner know-how', 'AI assistants'],
  },
];

function Jobs() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {jobs.map(({ who, title, body, eg, icon: I, us }, n) => (
        <Reveal key={who} delay={n * 120} className={cn('lift flex min-w-0 flex-col gap-3 rounded-xl border p-6', us ? 'border-brand bg-brand text-white' : 'border-border bg-card')}>
          <div className="flex items-center gap-2.5">
            <span className={cn('grid size-9 place-items-center rounded-lg', us ? 'bg-white/15' : 'bg-secondary text-muted-foreground')}>
              <I size={18} />
            </span>
            <span className={cn('text-xs font-semibold uppercase tracking-[0.08em]', us ? 'text-white/80' : 'text-muted-foreground')}>{who}</span>
          </div>
          <h3 className={cn('text-[22px] font-bold leading-tight', us ? 'text-white' : 'text-primary')}>{title}</h3>
          <p className={cn('text-[15px] leading-relaxed', us ? 'text-white/85' : 'text-muted-foreground')}>{body}</p>
          <span className={cn('mt-auto text-[13px]', us ? 'text-white/80' : 'text-muted-foreground')}>{eg}</span>
        </Reveal>
      ))}
    </div>
  );
}

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
  const tiers: Layer['tier'][] = ['Decision apps', 'Core services', 'Connectors'];
  return (
    <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
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
                        l.id === 'agents' && active !== l.id && 'bg-agent hover:bg-agent/90',
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
        {cur.img && (
          <BrowserFrame className="mt-5" src={cur.img.src} alt={`${cur.img.title} screen in Kimaru`} title={cur.img.title} aspect="2000 / 1050" imgClassName={cur.img.pos} />
        )}
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
      <SectionHead
        eyebrow="What an Enterprise Decision Operating System does"
        title="Your systems record. Your AI answers. Kimaru runs the decision."
        body="You already have tools for the first two. Nothing in your stack owns the decision itself."
      />
      <Jobs />
      <div className="mt-8 flex max-w-3xl items-start gap-4 rounded-xl border border-dashed border-border bg-card px-5 py-4">
        <MonitorSmartphone size={22} className="mt-0.5 shrink-0 text-brand" />
        <p className="text-base leading-relaxed">
          <b className="text-primary">Why "operating system"?</b> An operating system lets many apps share the same resources safely. Kimaru does that for decisions: production, supplier and inventory decisions share your data, your rules, your approvals and one memory of what worked.
        </p>
      </div>
      <Stack />
    </Section>
  );
}
