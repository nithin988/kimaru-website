import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, TrendingUp } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, PRODUCT_URL, SOLUTION_URL, COMPANY_URL, HOME_URL, onSubpage, RESULTS_URL, RESOURCES_URL, asset, cn, homeHref, useInView } from './ui';
import { Marquee } from './Marquee';
import { ScrollProgress } from './motion';

const links = [
  ['Product', 'product'],
  ['Solutions', 'solution'],
  ['Results', 'results'],
  ['Resources', 'resources'],
  ['Company', 'company'],
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-[68px] items-center gap-6">
        <a href={onSubpage ? HOME_URL : '#top'} aria-label="kimaru.ai home" className="flex shrink-0 items-center">
          <img src={asset('logo.svg')} alt="kimaru.ai" className="h-7 w-auto sm:h-8" />
        </a>
        <nav className="ml-4 hidden gap-6 text-sm font-medium text-muted-foreground lg:flex" aria-label="Main">
          {links.map(([l, h]) => (
            <a key={h} href={h === 'product' ? PRODUCT_URL : h === 'solution' ? SOLUTION_URL : h === 'company' ? COMPANY_URL : h === 'results' ? RESULTS_URL : h === 'resources' ? RESOURCES_URL : homeHref(h)} className="no-underline transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Button href={BOOK_URL} className="ml-auto">
          <span className="sm:hidden">Book a walkthrough</span>
          <span className="hidden sm:inline">Book a Decision Walkthrough</span>
        </Button>
      </Container>
      <ScrollProgress />
    </header>
  );
}

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const STEPS = ['Alert', 'Compare', 'Approve', 'Result'] as const;

/**
 * Right side of the hero: the real Work Hub screen with a short loop laid on top.
 * Alert lands, options are compared, an owner approves, the result is tracked.
 */
function HeroStage() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const [step, setStep] = useState(reduced() ? 3 : 0);
  useEffect(() => {
    if (!seen || reduced()) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2600);
    return () => clearInterval(t);
  }, [seen]);

  return (
    <div ref={ref} className="relative">
      {/* Decision route artwork behind the frame */}
      <img src={asset('photos/route.webp')} alt="" aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] object-cover [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_75%)]" />

      <BrowserFrame src="screens/uc-hub.png" alt="Kimaru Work Hub showing a typhoon alert and the components it affects" title="Work Hub" aspect="1440 / 651">
        {/* Step 1: the alert */}
        <motion.div
          className="pointer-events-none absolute rounded-lg border-2 border-active bg-active/[0.07]"
          style={{ left: '54.5%', top: '31%', width: '21.5%', height: '31%' }}
          animate={{ opacity: step >= 0 ? 1 : 0, scale: step === 0 ? [1, 1.03, 1] : 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="absolute -top-3 left-1 -translate-y-full whitespace-nowrap rounded-full bg-active px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">3 components at risk</span>
        </motion.div>

        {/* Step 2: options compared */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="opts"
              className="absolute right-[3%] top-[44%] w-[44%] rounded-xl border border-border bg-white p-2.5 shadow-2xl sm:p-3"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: 'spring', stiffness: 170, damping: 20 }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:text-[10px]">Options compared</p>
              {[
                { n: 'Expedite by air', v: 78, best: true },
                { n: 'Resequence line', v: 71 },
                { n: 'Wait for supplier', v: 52 },
              ].map((o, k) => (
                <div key={o.n} className="mt-1.5 flex items-center gap-2 text-[9px] sm:text-[11px]">
                  <span className={cn('w-[34%] truncate font-medium', o.best ? 'text-primary' : 'text-muted-foreground')}>{o.n}</span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-secondary sm:h-2">
                    <motion.span
                      className={cn('absolute inset-y-0 left-0 rounded-full', o.best ? 'bg-active' : 'bg-slate-300')}
                      initial={{ width: 0 }}
                      animate={{ width: `${o.v}%` }}
                      transition={{ duration: 0.9, delay: 0.15 + k * 0.12, ease: 'easeOut' }}
                    />
                  </span>
                  <span className="w-7 text-right font-bold tabular-nums text-primary">{o.v}%</span>
                </div>
              ))}
              <p className="mt-1.5 text-[8px] text-muted-foreground sm:text-[9px]">Predicted on-time orders. Illustrative.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: approved */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.span
              key="ok"
              className="absolute right-[7%] top-[3%] flex items-center gap-1.5 rounded-md bg-active px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-lg sm:text-xs"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            >
              <Check size={13} /> Approved by plant planning. Decision Receipt saved
            </motion.span>
          )}
        </AnimatePresence>
      </BrowserFrame>

      {/* Step 4: tracked result, floating below the frame */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            key="res"
            className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <span className="grid size-9 place-items-center rounded-lg bg-teal-50 text-active">
              <TrendingUp size={18} />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Result tracked. Decision Memory updated</p>
              <p className="text-sm font-bold text-primary">
                On-time orders <span className="text-muted-foreground">43%</span> → <span className="text-active">75%</span> <span className="text-[10px] font-medium text-muted-foreground">in one pilot</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots for the loop */}
      <div className="absolute -top-8 right-0 hidden items-center gap-2 text-[11px] font-semibold text-muted-foreground sm:flex" aria-hidden="true">
        {STEPS.map((s, n) => (
          <span key={s} className={cn('flex items-center gap-1.5 transition-colors', n === step ? 'text-active' : '')}>
            <span className={cn('size-1.5 rounded-full', n <= step ? 'bg-active' : 'bg-border')} />
            {s}
          </span>
        ))}
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
              In one pilot, on-time production went from <b className="text-foreground">43% to 75%</b>. Measured, not universal.
            </span>
          </p>
        </div>
        <div className="rise rise-6 px-1 pb-8 pt-10">
          <HeroStage />
        </div>
      </div>
      <Marquee />
    </div>
  );
}
