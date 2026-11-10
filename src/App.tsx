import { usePageEffects } from './hooks';
import { Nav, Hero } from './components/NavHero';
import { Team } from './components/Facts';
import { CostOfDelay, Benefits, Industries } from './components/Value';
import { Edos } from './components/Edos';
import { LoopSlides } from './components/LoopSlides';
import { Pilot, Trust } from './components/Sections';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function App() {
  usePageEffects();
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
