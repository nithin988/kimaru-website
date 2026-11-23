import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ResultsHero, Pilots, Gives, Labels, Fit, NextResult } from './components/ResultsPage';
import { Faq, Footer } from './components/FaqFooter';

export default function ResultsApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <ResultsHero />
        <Pilots />
        <Gives />
        <Labels />
        <Fit />
        <NextResult />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
