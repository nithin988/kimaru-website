import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { BrowserFrame, Section, SectionHead, cn, useInView } from './ui';

type Slide = {
  step: string;
  gps: string;
  headline: string;
  body: string;
  screen: string;
  title: string;
  crop?: string; // tailwind classes for object position and zoom
};

const slides: Slide[] = [
  { step: 'Know', gps: 'Where you are', headline: 'Every open decision, in one place.', body: 'Live from your systems. Each task is one recurring decision with an owner and the facts behind it.', screen: 'screens/work-hub.png', title: 'Work Hub' },
  { step: 'Model', gps: 'The map', headline: 'See what drives the outcome.', body: 'Levers, outside factors and outcomes are mapped, so options can be tested before you commit.', screen: 'screens/causal-diagram.png', title: 'Causal AI Modeler' },
  { step: 'Compare', gps: 'The routes', headline: 'Every recommendation says what happens.', body: 'Each one shows its predicted outcome, so people choose with the consequence in view.', screen: 'screens/recommendation-detail.png', title: 'Decide on recommendations' },
  { step: 'Choose', gps: 'You pick the route', headline: 'The right person decides.', body: 'Accept, adjust or defer. The choice is recorded with the reason and who made it.', screen: 'screens/review-step.png', title: 'Review recommendations', crop: 'object-top' },
  { step: 'Act', gps: 'Go', headline: 'Send it where work happens.', body: 'Push approved actions to your ERP, download for Excel, send to HubSpot workflows or create a report.', screen: 'screens/review-step.png', title: 'Choose how to process', crop: 'object-bottom scale-[1.5] origin-bottom' },
  { step: 'Learn', gps: 'It reroutes next time', headline: 'See whether it worked.', body: 'Expected versus actual by outcome, so the next decision starts smarter than the last.', screen: 'screens/decision-tracker.png', title: 'Decision Tracker' },
];

export function LoopSlides() {
  const [i, setI] = useState(0);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);
  const s = slides[i];
  const DUR = 6500;
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [wrapRef, seen] = useInView<HTMLDivElement>(0.3);
  const run = playing && seen && !hover && !(typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Advances by itself while visible. Hover, a manual pick or the pause button stops it.
  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => go(i + 1), DUR);
    return () => clearTimeout(t);
  }, [run, i, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ['INPUT', 'TEXTAREA'].includes(t.tagName)) return;
      if (!document.getElementById('how')?.matches(':hover')) return;
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go]);

  return (
    <Section id="how">
      <SectionHead
        eyebrow="How it works"
        title="Know, model, compare, choose, act, learn."
        body="One loop for every recurring decision, shown on the real Kimaru screens your team would use."
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
        <div>
          <ol className="m-0 grid list-none gap-2 p-0" role="tablist" aria-label="Decision loop steps">
            {slides.map((sl, n) => (
              <li key={sl.step}>
                <button
                  role="tab"
                  aria-selected={n === i}
                  onClick={() => { setPlaying(false); setI(n); }}
                  className={cn(
                    'grid w-full grid-cols-[34px_minmax(0,1fr)] items-center gap-x-3.5 rounded-xl border bg-card px-4 py-3 text-left transition-shadow',
                    n === i ? 'border-active shadow-[0_0_0_1px_var(--kimaru-active)]' : 'border-border hover:border-ring',
                  )}
                >
                  <span className={cn('row-span-2 grid size-[34px] place-items-center rounded-full border text-sm font-bold', n === i ? 'border-active bg-active text-white' : 'border-border text-muted-foreground')}>{n + 1}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-active">{sl.gps}</span>
                  <span className="text-[17px] font-bold leading-tight text-primary">{sl.step}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div ref={wrapRef} className="min-w-0" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div key={i} className="fade-in">
            <BrowserFrame src={s.screen} alt={`${s.title} screen in Kimaru`} title={s.title} aspect="2000 / 1150" imgClassName={s.crop?.includes('scale') ? s.crop : cn('ken', s.crop)} />
            <div className="mt-5 flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Step {i + 1} of {slides.length} · {s.step}
                </p>
                <h3 className="mt-1.5 text-2xl font-bold leading-tight text-primary">{s.headline}</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => go(i - 1)} aria-label="Previous step" className="grid size-10 place-items-center rounded-lg border border-border bg-card hover:border-ring">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => go(i + 1)} aria-label="Next step" className="grid size-10 place-items-center rounded-lg border border-primary bg-primary text-primary-foreground">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex flex-1 gap-1.5" aria-hidden="true">
              {slides.map((_, n) => (
                <button key={n} tabIndex={-1} onClick={() => { setPlaying(false); setI(n); }} className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
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
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause slides' : 'Play slides'} className="grid size-8 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:border-ring">
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
