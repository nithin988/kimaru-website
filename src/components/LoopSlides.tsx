import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { BrowserFrame, Section, SectionHead, cn, useInView } from './ui';

type Hot = { x: number; y: number; w: number; h: number; label: string; side?: 'below' | 'above' | 'inside' | 'right' | 'br' };
type Slide = {
  step: string;
  gps: string;
  headline: string;
  body: string;
  screen: string;
  w: number; // exact pixel size of the clipped screenshot, so nothing is cropped
  h: number;
  title: string;
  page: string; // which Kimaru page it is
  hot: Hot[]; // highlight boxes, in percent of the screenshot
};

// Every screenshot is a clean capture of one real page in the Manufacturing demo (typhoon alert, component shortages).
const slides: Slide[] = [
  {
    step: 'Know', gps: 'Where you are', headline: 'Every alert, with the components it hits.',
    body: 'A weather or supply alert lands in the Work Hub with its source, confidence, the components affected and the delay for each.',
    screen: 'screens/uc-hub.png', w: 1440, h: 651, title: 'Work Hub', page: 'Work Hub',
    hot: [
      { x: 54.5, y: 31, w: 21.5, h: 31, label: 'Components hit by the delay', side: 'above' },
      { x: 76.5, y: 31, w: 20.5, h: 26, label: 'Risk the review removes', side: 'below' },
    ],
  },
  {
    step: 'Model', gps: 'The map', headline: 'See what drives the outcome.',
    body: 'Select a node to see the factors that connect to it and the outcomes it moves.',
    screen: 'screens/uc-cdd-select.png', w: 1440, h: 900, title: 'Causal AI Modeler', page: 'Causal AI Modeler',
    hot: [
      { x: 28, y: 13, w: 20.5, h: 8, label: 'Pick any node', side: 'above' },
      { x: 50.5, y: 12.5, w: 20, h: 15, label: 'See what it moves', side: 'above' },
    ],
  },
  {
    step: 'Compare', gps: 'The routes', headline: 'Compare every component at risk.',
    body: 'Each component shows stock, backlog, order fulfillment risk and confidence, so the team sees where to act first.',
    screen: 'screens/uc-compare.png', w: 1440, h: 745, title: 'Container recommendations', page: 'Recommendations',
    hot: [
      { x: 40, y: 36, w: 17.5, h: 55, label: 'Stock against backlog', side: 'above' },
      { x: 61.5, y: 36, w: 11, h: 55, label: 'Risk per component', side: 'above' },
    ],
  },
  {
    step: 'Choose', gps: 'You pick the route', headline: 'Open a component to see its recommendation.',
    body: 'Expand a row for the recommended action and its predicted outcome, then accept it, ask the agent, or defer.',
    screen: 'screens/uc-choose.png', w: 1440, h: 872, title: 'Recommendation for one component', page: 'Recommendations, expanded',
    hot: [{ x: 5.5, y: 44.5, w: 91, h: 11.5, label: 'Recommendation, predicted outcome, decision', side: 'below' }],
  },
  {
    step: 'Act', gps: 'Go', headline: 'Send what you accepted where work happens.',
    body: 'Review accepted, adjusted and deferred choices, then push to your ERP, download for Excel, send to HubSpot workflows or create a report.',
    screen: 'screens/uc-act.png', w: 1440, h: 775, title: 'Review recommendations', page: 'Review',
    hot: [
      { x: 31, y: 18, w: 64, h: 10, label: 'What you accepted' },
      { x: 4.5, y: 70, w: 91, h: 28, label: 'Where it goes next', side: 'br' },
    ],
  },
  {
    step: 'Learn', gps: 'It reroutes next time', headline: 'See whether it worked.',
    body: 'On-time delivery by product line over time, against the baseline, so you can see which decisions paid off and which missed.',
    screen: 'screens/uc-learn.png', w: 1440, h: 662, title: 'Decision Tracker', page: 'Decision Tracker',
    hot: [
      { x: 4.5, y: 10, w: 18, h: 17, label: 'Outcome against baseline', side: 'right' },
      { x: 4.5, y: 33, w: 91.5, h: 62, label: 'By product line, month by month', side: 'inside' },
    ],
  },
];

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const isWide = () => typeof matchMedia !== 'undefined' && matchMedia('(min-width: 1024px)').matches;
const VH_PER_STEP = 70; // scroll distance per step in pinned mode
const DUR = 6500;

function Highlights({ hot }: { hot: Hot[] }) {
  return (
    <>
      {hot.map((h, n) => (
        <motion.div
          key={h.label}
          className="pointer-events-none absolute rounded-lg border-2 border-active bg-active/[0.06]"
          style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.35 + n * 0.18 }}
        >
          <span
            className={cn(
              'absolute left-1 whitespace-nowrap rounded-full bg-active px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg',
              h.side === 'above' && '-top-3 -translate-y-full',
              h.side === 'inside' && 'top-2 left-2',
              h.side === 'right' && 'left-full top-1 ml-2',
              h.side === 'br' && 'bottom-2 right-2 left-auto',
              (!h.side || h.side === 'below') && 'top-full mt-1.5',
            )}
          >
            {h.label}
          </span>
        </motion.div>
      ))}
    </>
  );
}

export function LoopSlides() {
  const [i, setI] = useState(0);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);
  const s = slides[i];
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [wrapRef, seen] = useInView<HTMLDivElement>(0.3);

  // On wide screens the story is pinned: the screen stays put while scrolling moves through the steps.
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const update = () => setPinned(isWide() && !reduced());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(0.999, Math.max(0, -r.top / total)) : 0;
      setI(Math.floor(p * slides.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned]);
  const jump = (n: number) => {
    if (pinned && track.current) {
      const r = track.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      window.scrollTo({ top: window.scrollY + r.top + ((n + 0.5) / slides.length) * total, behavior: 'smooth' });
    } else {
      setPlaying(false);
      setI(n);
    }
  };

  const run = !pinned && playing && seen && !hover && !reduced();
  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => go(i + 1), DUR);
    return () => clearTimeout(t);
  }, [run, i, go]);

  useEffect(() => {
    if (pinned) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ['INPUT', 'TEXTAREA'].includes(t.tagName)) return;
      if (!document.getElementById('how')?.matches(':hover')) return;
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go, pinned]);

  const body = (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
      <div className="min-w-0">
        <ol className="m-0 -mx-1 flex list-none gap-2 overflow-x-auto p-1 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:p-0" role="tablist" aria-label="Decision loop steps">
          {slides.map((sl, n) => (
            <li key={sl.step} className="shrink-0 max-lg:min-w-[150px]">
              <button
                role="tab"
                aria-selected={n === i}
                onClick={() => jump(n)}
                className="relative grid w-full grid-cols-[34px_minmax(0,1fr)] items-center gap-x-3.5 rounded-2xl border border-border bg-card px-4 py-3 text-left"
              >
                {n === i && (
                  <motion.span
                    layoutId="loop-ring"
                    className="absolute inset-0 rounded-2xl border border-active shadow-[0_10px_30px_-12px_rgb(0_128_128/0.5),0_0_0_1px_var(--kimaru-active)]"
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  />
                )}
                <span className={cn('relative row-span-2 grid size-[34px] place-items-center rounded-full border text-sm font-bold transition-colors duration-500', n === i ? 'border-active bg-active text-white' : 'border-border text-muted-foreground')}>{n + 1}</span>
                <span className="relative text-[11px] font-semibold uppercase tracking-[0.06em] text-active">{sl.gps}</span>
                <span className={cn('relative text-[17px] font-bold leading-tight transition-colors duration-500', n === i ? 'text-primary' : 'text-slate-500')}>{sl.step}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div ref={wrapRef} className="min-w-0" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* Stage keeps a fixed height so the caption does not jump between screenshots of different heights */}
        <div className="relative [aspect-ratio:1440/980] max-lg:aspect-auto max-lg:min-h-[260px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              className="absolute inset-x-0 top-0 max-lg:static"
              initial={{ opacity: 0, y: 22, scale: 0.985, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            >
              <BrowserFrame src={s.screen} alt={`${s.page} screen in Kimaru, ${s.headline}`} title={s.title} aspect={`${s.w} / ${s.h}`}>
                <Highlights hot={s.hot} />
              </BrowserFrame>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-start gap-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              className="min-w-0 flex-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 170, damping: 22 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Step {i + 1} of {slides.length} · {s.step} · {s.page}
              </p>
              <h3 className="mt-1.5 text-2xl font-bold leading-tight text-primary">{s.headline}</h3>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          </AnimatePresence>
          {!pinned && (
            <div className="flex shrink-0 gap-2">
              <button onClick={() => go(i - 1)} aria-label="Previous step" className="grid size-10 place-items-center rounded-lg border border-border bg-card hover:border-ring">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => go(i + 1)} aria-label="Next step" className="grid size-10 place-items-center rounded-lg border border-primary bg-primary text-primary-foreground">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {slides.map((_, n) => (
              <button key={n} tabIndex={-1} onClick={() => jump(n)} className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                {n < i && <span className="block h-full w-full bg-active" />}
                {n === i && (
                  <span
                    key={`${i}-${run}`}
                    className={cn('block h-full w-full bg-active', run && 'slide-fill')}
                    style={{ ['--dur' as string]: `${DUR}ms`, transform: run ? undefined : 'scaleX(1)', transformOrigin: 'left' }}
                  />
                )}
              </button>
            ))}
          </div>
          {!pinned && (
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause slides' : 'Play slides'} className="grid size-8 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:border-ring">
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          )}
        </div>
        {pinned && <p className="mt-3 text-xs text-muted-foreground">Keep scrolling to move through the steps.</p>}
      </div>
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <Section id="how">
        <SectionHead
          eyebrow="How it works"
          title="Know, model, compare, choose, act, learn."
          body="One loop for every recurring decision. Each step below is a real Kimaru page, shown with a typhoon alert that threatens component supply."
        />
        {pinned ? (
          <div ref={track} style={{ height: `${slides.length * VH_PER_STEP + 100}vh` }}>
            <div className="sticky top-[88px] pt-2">{body}</div>
          </div>
        ) : (
          body
        )}
      </Section>
    </MotionConfig>
  );
}
