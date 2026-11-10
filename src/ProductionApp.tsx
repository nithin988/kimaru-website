import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { SolutionHero, TheCall, Consequence, Walkthrough, Roles } from './components/Solution';
import { Pilot } from './components/Sections';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function ProductionApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <SolutionHero />
        <TheCall />
        <Consequence />
        <Walkthrough />
        <Roles />
        <Pilot />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
