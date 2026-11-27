import { usePageEffects } from './hooks';
import { Nav, Hero } from './components/NavHero';
import { Team } from './components/Facts';
import { CostOfDelay, Benefits, Industries } from './components/Value';
import { Edos } from './components/Edos';
import { HowItWorks } from './components/HowItWorks';
import { Pilot, Trust } from './components/Sections';
import { ServicesTeaser } from './components/Services';
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
        <HowItWorks />
        <Benefits />
        <Industries />
        <ServicesTeaser />
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
