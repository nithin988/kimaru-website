import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ProductHero, Modules, DecisionModel, Connect } from './components/Product';
import { Pilot, Trust } from './components/Sections';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function ProductApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <ProductHero />
        <Modules />
        <DecisionModel />
        <Connect />
        <Pilot />
        <Trust />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
