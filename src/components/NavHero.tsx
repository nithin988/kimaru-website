import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, LayoutDashboard, Menu, MessageSquareText, PackageOpen, Scale, TrendingUp, Unlock, X } from 'lucide-react';
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

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

type Layer = { k: string; icon: LucideIcon; cap: string; src: string; W: number; H: number; x: number; y: number; w: number };
// Each layer shows a zoomed region of a real Kimaru screen, so the text stays readable. x, y and w are percentages of the screenshot.
const LAYERS: Layer[] = [
  { k: 'Understand', icon: LayoutDashboard, cap: 'Every alert, with what it hits.', src: 'screens/uc-hub.png', W: 1440, H: 651, x: 30, y: 22, w: 47 },
  { k: 'Compare', icon: Scale, cap: 'Two good options, side by side.', src: 'screens/uc-options.png', W: 1440, H: 1014, x: 12, y: 36, w: 62 },
  { k: 'Ask why', icon: MessageSquareText, cap: 'The reasoning, factor by factor.', src: 'screens/uc-agent.png', W: 1440, H: 900, x: 61, y: 58, w: 38 },
  { k: 'Measure', icon: TrendingUp, cap: 'Expected against actual, kept.', src: 'screens/uc-learn.png', W: 1440, H: 662, x: 4.5, y: 5, w: 55 },
];
const RATIO = 1.6;
const STEP = { x: 34, y: -30 };

function Crop({ l }: { l: Layer }) {
  const h = (l.w * l.W) / (RATIO * l.H);
  return (
    <div
      role="img"
      aria-label={`${l.k}: ${l.cap}`}
      className="aspect-[16/10] w-full bg-white"
      style={{ backgroundImage: `url(${asset(l.src)})`, backgroundRepeat: 'no-repeat', backgroundSize: `${10000 / l.w}% auto`, backgroundPosition: `${(l.x / (100 - l.w)) * 100}% ${(l.y / (100 - h)) * 100}%` }}
    />
  );
}

/**
 * Right side of the hero: Kimaru screens layered like open apps, with a Decision Model package on top.
 * Real screens, zoomed so the text reads. The package is the product: one recurring decision, unlocked.
 */
function HeroPackage() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!seen || paused || reduced()) return;
    const t = setInterval(() => setActive((a) => (a + 1) % LAYERS.length), 3400);
    return () => clearInterval(t);
  }, [seen, paused]);
  const n = LAYERS.length;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[660px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <img src={asset('photos/route.webp')} alt="" aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] object-cover opacity-80 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_72%)]" />
      <div className="relative pr-[102px] pt-[90px] max-sm:pr-[54px] max-sm:pt-[48px]">
        <div className="relative">
          {/* spacer that gives the stack its height */}
          <div className="invisible" aria-hidden="true">
            <div className="h-9" />
            <div className="aspect-[16/10]" />
          </div>
          {LAYERS.map((l, i) => {
            const pos = (i - active + n) % n;
            return (
              <motion.div
                key={l.k}
                className="absolute inset-0 origin-top-left overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.45)]"
                style={{ zIndex: 40 - pos * 10 }}
                animate={{ x: pos * STEP.x, y: pos * STEP.y, scale: 1 - pos * 0.035, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 150, damping: 22 }}
              >
                <button type="button" onClick={() => setActive(i)} aria-label={`Show ${l.k}`} aria-pressed={pos === 0} className="flex h-9 w-full cursor-pointer items-center gap-2 border-0 border-b border-border bg-panel px-3 text-left text-xs">
                  <span className="grid size-5 place-items-center rounded-md bg-brand text-white"><l.icon size={12} /></span>
                  <span className="font-semibold text-foreground">{l.k}</span>
                  <span className="ml-auto hidden text-[11px] text-muted-foreground sm:inline">Synthetic demo data</span>
                </button>
                <Crop l={l} />
              </motion.div>
            );
          })}

          {/* The package: one recurring decision, unlocked */}
          <div className="absolute -bottom-9 -right-24 z-50 w-[250px] rounded-2xl border border-border bg-white p-3.5 shadow-[0_24px_50px_-18px_rgb(37_59_127/0.55)] max-sm:-right-12 max-sm:w-[210px]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#253B7F,#6A0DAD)] text-white shadow-md"><PackageOpen size={22} /></span>
              <div className="min-w-0">
                <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">Decision Model</p>
                <p className="m-0 text-[15px] font-bold leading-tight text-primary">Production commitment</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {LAYERS.map((l, i) => (
                <button key={l.k} type="button" onClick={() => setActive(i)} className={cn('flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1.5 text-left text-[11px] font-semibold transition-colors', i === active ? 'border-active bg-teal-50 text-active' : 'border-border bg-card text-muted-foreground hover:border-ring')}>
                  <Unlock size={12} className="shrink-0" /> {l.k}
                </button>
              ))}
            </div>
            <p className="m-0 mt-2.5 text-[11px] leading-snug text-muted-foreground">One recurring decision, unlocked: {LAYERS[active].cap.toLowerCase()}</p>
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
