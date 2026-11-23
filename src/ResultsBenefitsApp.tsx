import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { BenefitsHero, Outcomes, Roles, Journey, Stories, BenefitsClose } from './components/ResultsBenefits';
import { Faq, Footer } from './components/FaqFooter';

export default function ResultsBenefitsApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <BenefitsHero />
        <Outcomes />
        <Roles />
        <Journey />
        <Stories />
        <BenefitsClose />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
