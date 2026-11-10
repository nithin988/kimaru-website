import { ArrowRight, ArrowUpRight, Mic, Newspaper } from 'lucide-react';
import { Button, Container, Eyebrow, Section, SectionHead, asset } from './ui';
import { Reveal } from './motion';

const BLOG = 'https://kimaru.ai/blog/';

type Post = { title: string; date: string; by?: string; img: string; alt: string; href: string; blurb: string };

const featured: Post = {
  title: 'What if You Could Save and Repeat Your Best Decisions',
  date: 'Sep 18, 2026',
  img: 'blog/decision.png',
  alt: 'Editorial illustration of a planner comparing production options',
  href: 'https://kimaru.ai/how-much-is-a-better-decision-worth/',
  blurb: 'Think of a recent complex decision you had to make. What if the next person could start from what you already learned? A plain-language start to decision models.',
};

const posts: Post[] = [
  {
    title: 'The Manufacturing Decisions That Will Outlast the US-Canada Trade Dispute', date: 'Oct 2, 2026', by: 'Evan Burkosky', img: 'blog/trade.jpeg',
    alt: 'Industrial cutting heads working on a steel plate', href: 'https://kimaru.ai/manufacturing-decisions-us-canada-trade-dispute/',
    blurb: 'A Canadian CEO of a US company on the recurring decisions tariffs and trade disputes leave behind.',
  },
  {
    title: 'More Intelligence is the Wrong Goal', date: 'Sep 10, 2026', by: 'Evan Burkosky', img: 'blog/intel.png',
    alt: 'Blue and purple tracks converge at a switch onto a teal route', href: 'https://kimaru.ai/more-intelligence-is-the-wrong-goal/',
    blurb: 'Intelligence alone will not make your organization better. Decisions are what change outcomes.',
  },
  {
    title: 'Intelligence Is Becoming a Commodity. Decisions Are Not.', date: 'Jul 23, 2026', img: 'blog/commodity.png',
    alt: 'A production planner and an operations colleague compare options', href: 'https://kimaru.ai/intelligence-is-becoming-a-commodity-decisions-are-not/',
    blurb: 'Models are getting cheaper and more capable. Every supply chain still needs a governed way to turn intelligence and judgment into a decision.',
  },
  {
    title: 'Decision Models Are the Missing Layer in Agentic Work', date: 'Jun 17, 2026', img: 'blog/models.png',
    alt: 'Illustration for decision models in agentic work', href: 'https://kimaru.ai/decision-models-are-the-missing-layer-in-agentic-work/',
    blurb: 'To move from generated intelligence to dependable enterprise decisions, organizations need more than agents.',
  },
  {
    title: 'Organizational Singularity: Human Orchestration for Industrial Resilience', date: 'May 31, 2026', by: 'Evan Burkosky', img: 'blog/resilience.png',
    alt: 'Illustration for industrial resilience', href: 'https://kimaru.ai/organizational-singularity-industrial-resilience/',
    blurb: 'What a conversation on fast-moving AI means for the people who run industrial operations.',
  },
];

const talks: Array<{ t: string; href: string }> = [
  { t: 'Decision Intelligence Explained by a Serial Entrepreneur Solving Big Problems', href: 'https://kimaru.ai/decision-intelligence-explained-by-a-serial-entrepreneur-solving-big-problems-evan-burkosky/' },
  { t: 'Decision Intelligence, AI’s Next Phase: Interview with Build+', href: 'https://kimaru.ai/decision-intelligence-ais-next-phase-everything-you-need-to-know-interview-with-build/' },
  { t: 'Human-in-the-Loop AI: A New Era for Retail and Logistics (Takeoff Tokyo)', href: 'https://kimaru.ai/human-in-the-loop-ai-a-new-era-for-retail-and-logistics-takeoff-tokyo-evan-burkosky-kimaru-ai/' },
  { t: 'IT Business Today: Interview with Evan Burkosky', href: 'https://kimaru.ai/it-business-today-interview-with-evan-burkosky-ceo-and-co-founder-kimaru-ai/' },
];

const news: Array<{ t: string; href: string; d: string }> = [
  { t: 'Kimaru AI graduates from Alchemist Class 40', href: 'https://kimaru.ai/kimaru-ai-graduates-from-alchemist-class-40/', d: 'Oct 6, 2025' },
  { t: 'Kimaru AI graduates from the INTLOOP Ventures Accelerator with the Excellence Award', href: 'https://kimaru.ai/kimaru-graduates-from-the-intloop-ventures-accelerator-with-the-excellence-award/', d: 'Oct 3, 2025' },
];

export function ResourcesHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative pb-12 pt-12 lg:pb-16 lg:pt-20">
        <Eyebrow className="rise rise-1">Resources</Eyebrow>
        <h1 className="rise rise-2 mt-4 max-w-[16em] text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
          Ideas on making <span className="grad-text">better recurring decisions.</span>
        </h1>
        <p className="rise rise-3 mt-5 max-w-[36em] text-lg leading-relaxed text-muted-foreground">Articles, interviews and news from the Kimaru team on decisions, industrial resilience and what AI changes for operations.</p>
        <div className="rise rise-4 mt-7">
          <Button href={BLOG} variant="outline" size="lg">
            All articles on kimaru.ai <ArrowUpRight />
          </Button>
        </div>
      </Container>
    </div>
  );
}

export function Featured() {
  return (
    <Section id="featured" tone="alt" className="!py-14 lg:!py-16">
      <Reveal>
        <a href={featured.href} className="group grid overflow-hidden rounded-3xl border border-border bg-card no-underline shadow-[0_24px_60px_-28px_rgb(37_59_127/0.35)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="relative aspect-[16/9] overflow-hidden bg-panel lg:aspect-auto lg:min-h-[320px]">
            <img src={asset(featured.img)} alt={featured.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-active">Start here · {featured.date}</p>
            <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.1] text-primary">{featured.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{featured.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-active">
              Read the article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </Reveal>
    </Section>
  );
}

export function Articles() {
  return (
    <Section id="articles">
      <SectionHead eyebrow="Articles" title="Recent writing." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {posts.map((p, n) => (
          <Reveal key={p.title} delay={(n % 3) * 90} className={n < 3 ? "h-full lg:col-span-2" : "h-full lg:col-span-3"}>
            <a href={p.href} className="lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card no-underline">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-panel">
                <img src={asset(p.img)} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {p.date}
                  {p.by ? ` · ${p.by}` : ''}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-primary">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-active">
                  Read <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function LinkList({ items, icon: I, title }: { items: Array<{ t: string; href: string; d?: string }>; icon: typeof Mic; title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
          <I size={18} />
        </span>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
      </div>
      <ul className="m-0 mt-4 grid list-none gap-1 p-0">
        {items.map((i) => (
          <li key={i.t}>
            <a href={i.href} className="group flex items-start justify-between gap-3 rounded-lg px-2 py-2.5 text-[15px] font-medium leading-snug text-foreground no-underline transition-colors hover:bg-panel">
              <span>
                {i.t}
                {i.d && <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{i.d}</span>}
              </span>
              <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover:text-active" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TalksNews() {
  return (
    <Section id="talks" tone="alt">
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <LinkList items={talks} icon={Mic} title="Interviews and talks" />
        </Reveal>
        <Reveal delay={110}>
          <LinkList items={news} icon={Newspaper} title="Company news" />
        </Reveal>
      </div>
    </Section>
  );
}
