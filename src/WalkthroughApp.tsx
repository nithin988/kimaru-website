import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { BookHero, Flow, Bring } from './components/Book';
import { Faq, Footer } from './components/FaqFooter';

export default function WalkthroughApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <BookHero />
        <Flow />
        <Bring />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
