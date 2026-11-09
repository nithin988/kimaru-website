import { Nav, Hero } from './components/NavHero';
import { Problem } from './components/Problem';
import { Edos } from './components/Edos';
import { LoopSlides } from './components/LoopSlides';
import { Solutions, Results, Pilot, Trust } from './components/Sections';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Edos />
        <LoopSlides />
        <Solutions />
        <Results />
        <Pilot />
        <Trust />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
