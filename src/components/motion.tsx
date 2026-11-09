import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades and lifts content in when it scrolls into view.
 * Anything already on screen at load is shown immediately, so the first view is always complete.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 || typeof IntersectionObserver === 'undefined' || reduced()) {
      setState('shown');
      return;
    }
    setState('hidden');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (state !== 'shown') return;
    const t = setTimeout(() => setDone(true), delay + 900);
    return () => clearTimeout(t);
  }, [state, delay]);
  // Once the entrance has played, drop the inline styles so hover and other effects on the element work.
  const style: CSSProperties | undefined = done
    ? undefined
    : state === 'hidden'
      ? { opacity: 0, transform: `translateY(${y}px)` }
      : { opacity: 1, transform: 'none', transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms` };
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Counts up to a number once it is in view. Shows the final value when motion is reduced. */
export function CountUp({ to, suffix = '', duration = 1200, className }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || reduced()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setVal(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/** Moves an element a little as the page scrolls. Factor is pixels per 100px scrolled. */
export function Parallax({ children, factor = 8, className }: { children: ReactNode; factor?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 900);
      el.style.transform = `translate3d(0, ${(-y * factor) / 100}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor]);
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

/** Thin gradient bar under the nav that fills as you scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left" style={{ background: 'var(--kimaru-agent-gradient)', transform: 'scaleX(0)' }} />;
}
