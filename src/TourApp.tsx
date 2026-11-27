import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { TourHero, TourStage, Behind } from './components/Tour';
import { Footer } from './components/FaqFooter';

export default function TourApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <TourHero />
        <TourStage />
        <Behind />
      </main>
      <Footer />
    </>
  );
}
