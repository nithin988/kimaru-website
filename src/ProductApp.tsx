import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ProductHero, Modules, DecisionModel, Connect } from './components/Product';
import { Architecture } from './components/Architecture';
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
        <Architecture />
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
