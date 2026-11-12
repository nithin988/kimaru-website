import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ServicesHero, WhyStart, ServiceCards, GrowPath, Areas } from './components/Services';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function ServicesApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <WhyStart />
        <ServiceCards />
        <GrowPath />
        <Areas />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
