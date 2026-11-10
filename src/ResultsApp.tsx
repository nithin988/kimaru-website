import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ResultsHero, Case, Labels, Fit, NextResult } from './components/ResultsPage';
import { Faq, Footer } from './components/FaqFooter';

export default function ResultsApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <ResultsHero />
        <Case />
        <Labels />
        <Fit />
        <NextResult />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
