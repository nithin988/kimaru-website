import { usePageEffects } from './hooks';
import { Nav } from './components/NavHero';
import { ResourcesHero, Featured, Articles, TalksNews } from './components/ResourcesPage';
import { Closing, Footer } from './components/FaqFooter';

export default function ResourcesApp() {
  usePageEffects();
  return (
    <>
      <Nav />
      <main>
        <ResourcesHero />
        <Featured />
        <Articles />
        <TalksNews />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
