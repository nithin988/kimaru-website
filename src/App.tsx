import { useEffect } from 'react';
import Lenis from 'lenis';
import { Nav, Hero } from './components/NavHero';
import { Team } from './components/Facts';
import { CostOfDelay, Benefits, Industries } from './components/Value';
import { Edos } from './components/Edos';
import { LoopSlides } from './components/LoopSlides';
import { Pilot, Trust } from './components/Sections';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function App() {
  // Feeds the pointer position to cards so their spotlight glow can follow it.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('.lift') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
  // Smooth, inertial scrolling (Lenis, MIT). Skipped when the visitor prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.05, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = (ev: MouseEvent) => {
      const link = (ev.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (target) {
        ev.preventDefault();
        lenis.scrollTo(target, { offset: -72 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CostOfDelay />
        <Edos />
        <LoopSlides />
        <Benefits />
        <Industries />
        <Pilot />
        <Trust />
        <Team />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
