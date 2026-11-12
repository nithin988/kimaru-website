import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ServicesHero, GrowPath, Areas } from './components/Services';
import { DaasFlow, GovernStrip } from './components/Flow';
import { ImpactMap, TwoWays } from './components/ImpactMap';
import { BOOK_URL, CONTACT_URL } from './components/ui';
import { Faq, Closing, Footer } from './components/FaqFooter';

export default function ServicesApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <TwoWays bookUrl={BOOK_URL} contactUrl={CONTACT_URL} />
        <ImpactMap />
        <DaasFlow />
        <GovernStrip />
        <GrowPath />
        <Areas />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
