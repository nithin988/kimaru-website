import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { CompanyHero, Why, Beliefs, Cofounders, Facts } from './components/Company';
import { Trust } from './components/Sections';
import { Closing, Footer } from './components/FaqFooter';

export default function CompanyApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <CompanyHero />
        <Why />
        <Beliefs />
        <Cofounders />
        <Facts />
        <Trust />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
