import { useEffect } from 'react';
import { Nav, Hero } from './components/NavHero';
import { Glance, WhyNow, Team } from './components/Facts';
import { Problem } from './components/Problem';
import { Edos } from './components/Edos';
import { LoopSlides } from './components/LoopSlides';
import { Connect } from './components/Connect';
import { Solutions, Results, Pilot, Trust } from './components/Sections';
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
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Glance />
        <Problem />
        <Edos />
        <LoopSlides />
        <Connect />
        <Solutions />
        <Results />
        <WhyNow />
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
