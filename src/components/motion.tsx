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
      ? { opacity: 0, transform: `translateY(${y}px) scale(.985)`, filter: 'blur(6px)' }
      : {
          opacity: 1,
          transform: 'none',
          filter: 'none',
          transition: `opacity .9s ease ${delay}ms, transform 1s cubic-bezier(.22,1,.36,1) ${delay}ms, filter .9s ease ${delay}ms`,
        };
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Counts up to a number once it is in view. Shows the final value when motion is reduced. */
export function CountUp({ to, suffix = '', decimals = 0, duration = 1200, className }: { to: number; suffix?: string; decimals?: number; duration?: number; className?: string }) {
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
          setVal(to * (1 - Math.pow(1 - p, 3)));
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
      {val.toFixed(decimals)}
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

/**
 * Depth for a hero screen: it eases down in scale as you scroll past and tilts toward the pointer,
 * the way product pages on Apple devices behave. Both effects are off when motion is reduced.
 */
export function Depth({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    let rx = 0;
    let ry = 0;
    const apply = () => {
      raf = 0;
      const p = Math.min(1, window.scrollY / 700);
      el.style.transform = `perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${1 - 0.06 * p})`;
      el.style.borderRadius = `${12 + 14 * p}px`;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ry = x * 5;
      rx = -y * 4;
      queue();
    };
    const leave = () => {
      rx = 0;
      ry = 0;
      queue();
    };
    window.addEventListener('scroll', queue, { passive: true });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    apply();
    return () => {
      window.removeEventListener('scroll', queue);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={className} style={{ transition: 'transform .35s cubic-bezier(.22,1,.36,1)', transformOrigin: '50% 30%', willChange: 'transform' }}>
      {children}
    </div>
  );
}
