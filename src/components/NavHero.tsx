import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Database, LayoutDashboard, LineChart, ListChecks, Menu, MessageSquareText, PackageOpen, Scale, ShieldCheck, TrendingUp, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, PRODUCT_URL, SOLUTIONS_URL, COMPANY_URL, HOME_URL, onSubpage, RESULTS_URL, RESOURCES_URL, asset, cn, useInView } from './ui';
import { Marquee } from './Marquee';
import { ScrollProgress } from './motion';

const links = [
  ['Product', PRODUCT_URL],
  ['Solutions', SOLUTIONS_URL],
  ['Results', RESULTS_URL],
  ['Resources', RESOURCES_URL],
  ['Company', COMPANY_URL],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const here = typeof location !== 'undefined' ? location.pathname : '';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    // Close if the viewport grows past the mobile breakpoint.
    const mq = matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const isCurrent = (h: string) => here.endsWith(h.replace(import.meta.env.BASE_URL, '/'));

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/70 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-[68px] items-center gap-3 sm:gap-6">
        <a href={onSubpage ? HOME_URL : '#top'} aria-label="kimaru.ai home" className="flex shrink-0 items-center">
          <img src={asset('logo.svg')} alt="kimaru.ai" className="h-7 w-auto sm:h-8" />
        </a>
        <nav className="ml-4 hidden gap-6 text-sm font-medium text-muted-foreground lg:flex" aria-label="Main">
          {links.map(([l, h]) => (
            <a key={h} href={h} aria-current={isCurrent(h) ? 'page' : undefined} className="no-underline transition-colors hover:text-foreground aria-[current=page]:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden min-[400px]:block">
          <Button href={BOOK_URL} className="whitespace-nowrap">
            <span className="sm:hidden">Book a walkthrough</span>
            <span className="hidden sm:inline">Book a Decision Walkthrough</span>
          </Button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="ml-auto grid size-11 shrink-0 place-items-center rounded-md text-primary hover:bg-secondary min-[400px]:ml-0 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
      <ScrollProgress />
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full h-[calc(100dvh-68px)] overflow-y-auto border-t border-border bg-white lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <Container className="flex flex-col py-4">
              {links.map(([l, h]) => (
                <a
                  key={h}
                  href={h}
                  aria-current={isCurrent(h) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-border text-lg font-semibold text-primary no-underline aria-[current=page]:text-active"
                >
                  {l}
                </a>
              ))}
              <Button href={BOOK_URL} size="lg" className="mt-6 h-12 w-full" onClick={() => setOpen(false)}>
                Book a Decision Walkthrough <ArrowRight />
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

type Usecase = { id: string; label: string; q: string; evidence: string; options: string; owner: string };
const USECASES: Usecase[] = [
  { id: 'prod', label: 'Production commitment', q: 'Which orders can we still promise, and what do we do about the rest?', evidence: 'Orders, material and capacity', options: 'Hold, split or expedite', owner: 'Plant manager' },
  { id: 'inv', label: 'Inventory allocation', q: 'Where should scarce stock go this week?', evidence: 'Stock, demand and lead times', options: 'Allocate, transfer or hold', owner: 'Supply planner' },
  { id: 'truck', label: 'Truck planning', q: 'Which loads move together, and when?', evidence: 'Orders, lanes and truck volume', options: 'Combine, delay or split', owner: 'Logistics lead' },
  { id: 'supp', label: 'Supplier exceptions', q: 'Which supplier problem needs action today?', evidence: 'Suppliers, BOM and cost', options: 'Switch, expedite or wait', owner: 'Procurement lead' },
];

// The other Kimaru screens, shown by name only. Their detail is covered in a walkthrough.
const SCREENS: Array<{ k: string; icon: LucideIcon }> = [
  { k: 'Work Hub', icon: LayoutDashboard },
  { k: 'Recommendations', icon: ListChecks },
  { k: 'Agent', icon: MessageSquareText },
  { k: 'Decision Tracker', icon: TrendingUp },
];
const STEP = { x: 30, y: -26 };

/**
 * Right side of the hero: Kimaru's screens as stacked tabs, shown by name only, with one explanatory
 * screen on top. It shows what Kimaru does for a decision and invites the visitor to try their own.
 */
function HeroPackage() {
  const [id, setId] = useState('prod');
  const u = USECASES.find((x) => x.id === id)!;
  const flow = [
    { icon: Database, t: 'Evidence', d: u.evidence },
    { icon: Scale, t: 'Options', d: u.options },
    { icon: ShieldCheck, t: 'Approval', d: u.owner },
    { icon: LineChart, t: 'Result', d: 'Expected vs actual, kept' },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <img src={asset('photos/route.webp')} alt="" aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] object-cover opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_72%)]" />
      <div className="relative pr-[120px] pt-[104px] max-sm:pr-[48px] max-sm:pt-[60px]">
        <div className="relative">
          {SCREENS.map((s, i) => {
            const pos = i + 1; // Work Hub sits right behind the Decision Model, Decision Tracker is furthest back
            return (
              <div key={s.k} className="absolute inset-0 origin-top-left" style={{ zIndex: 30 - pos, transform: `translate(${pos * STEP.x}px, ${pos * STEP.y}px) scale(${1 - pos * 0.03})` }}>
                <div className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_18px_40px_-22px_rgb(37_59_127/0.4)] transition-transform duration-200 ease-out hover:-translate-y-2">
                  <div className="flex h-9 items-center gap-2 border-b border-border bg-panel px-3 text-xs">
                    <span className="grid size-5 place-items-center rounded-md bg-brand-soft text-brand"><s.icon size={12} /></span>
                    <span className="font-semibold text-foreground">{s.k}</span>
                    <span className="ml-auto text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">Shown in a walkthrough</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* The explanatory screen */}
          <div className="relative z-40 overflow-hidden rounded-xl border border-border bg-card shadow-[0_28px_70px_-26px_rgb(37_59_127/0.55)]">
            <div className="h-1 bg-[linear-gradient(90deg,#0284c7_0%,#5eead4_24%,#6d28d9_62%,#4f46e5_100%)]" />
            <div className="flex h-10 items-center gap-2.5 border-b border-border bg-panel px-4 text-xs">
              <span className="grid size-6 place-items-center rounded-md bg-brand text-white"><PackageOpen size={13} /></span>
              <span className="text-[13px] font-semibold text-foreground">Decision Model</span>
              <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Illustrative</span>
            </div>
            <div className="p-5 sm:p-6">
              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Recurring decision</p>
              <div className="mt-2.5 inline-flex flex-wrap gap-1 rounded-lg bg-secondary p-1" role="tablist" aria-label="Decision">
                {USECASES.map((x) => (
                  <button key={x.id} role="tab" aria-selected={x.id === id} onClick={() => setId(x.id)} className={cn('cursor-pointer rounded-md border-0 px-3 py-1.5 text-xs font-semibold transition-colors', x.id === id ? 'bg-card text-primary shadow-sm' : 'bg-transparent text-muted-foreground hover:text-primary')}>
                    {x.label}
                  </button>
                ))}
              </div>
              <p key={u.id} className="fade-in m-0 mt-5 border-l-[3px] border-active pl-3.5 text-[19px] font-bold leading-snug text-primary">{u.q}</p>
              <ol key={u.id + 'f'} className="fade-in m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-4">
                {flow.map((f, n) => (
                  <li key={f.t} className="relative rounded-lg border border-border bg-white p-3">
                    <div className="flex items-center justify-between">
                      <span className="grid size-7 place-items-center rounded-md bg-brand-soft text-brand"><f.icon size={14} /></span>
                      <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">0{n + 1}</span>
                    </div>
                    <p className="m-0 mt-2.5 text-[13px] font-bold text-primary">{f.t}</p>
                    <p className="m-0 mt-0.5 text-[12px] leading-snug text-muted-foreground">{f.d}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-4">
                <p className="m-0 max-w-[25em] text-[13px] leading-snug text-muted-foreground"><b className="font-semibold text-primary">Start with one decision.</b> It runs from your files, and your team stays the owner of every call.</p>
                <Button href={BOOK_URL}>Try it on your decision <ArrowRight /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-10 size-[620px] rounded-full bg-[radial-gradient(circle,rgb(81_141_224/.16),transparent_65%)]" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1360px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Enterprise Decision Operating System</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(36px,4.2vw,56px)] font-extrabold leading-[1.05] text-primary">
            The operating system for your <span className="grad-text">hardest decisions.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[31em] text-lg leading-relaxed text-muted-foreground">
            When operating choices span ERP data, spreadsheets, expert judgment and several teams, a Kimaru Decision Model compares the practical options, makes approval explicit, supports the action and measures the result.{' '}
            <b className="font-semibold text-foreground">Think GPS for business decisions.</b>
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Book a Decision Walkthrough <ArrowRight />
            </Button>
            <Button href="#how" variant="outline" size="lg">
              See how it works
            </Button>
          </div>
          <p className="rise rise-5 mt-6 flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="size-2.5 shrink-0 rotate-45 rounded-[3px] bg-logo-teal" />
            <span>
              Used in pilots with a sports electronics and an aircraft fabrics manufacturer, each built around their own decision.
            </span>
          </p>
        </div>
        <div className="rise rise-6 px-1 pb-8 pt-10">
          <HeroPackage />
        </div>
      </div>
      <Marquee />
    </div>
  );
}
