import { ArrowRight, Building2, CalendarDays, Eye, MapPin, Scale, ShieldCheck, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, Button, Container, Eyebrow, Section, SectionHead, asset } from './ui';
import { Reveal } from './motion';

const people = [
  {
    name: 'Evan Burkosky', role: 'Cofounder and CEO', photo: 'team/evan.png',
    bio: 'Works with customers, partners and the market to find recurring decisions where clearer choices and measurable outcomes can create business value.',
  },
  {
    name: 'Dr. Hareesh Nambiar', role: 'Cofounder and CTO', photo: 'team/hareesh.png',
    bio: "Leads the platform and contributes to Kimaru's patent work on Decision Intelligence.",
  },
];

export function CompanyHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-20 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Company</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            Better recurring decisions for <span className="grad-text">industrial companies.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[34em] text-lg leading-relaxed text-muted-foreground">
            Kimaru brings together what your software shows, what your people know and what AI recommends, so the company can choose, get the right approval, see what happened and remember what worked.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Talk to the founders <ArrowRight />
            </Button>
            <Button href="#team" variant="outline" size="lg">
              Meet the team
            </Button>
          </div>
        </div>
        <div className="rise rise-5 grid grid-cols-2 gap-4">
          {people.map((p) => (
            <figure key={p.name} className="m-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-28px_rgb(37_59_127/0.4)]">
              <img src={asset(p.photo)} alt={`${p.name}, Kimaru ${p.role.toLowerCase()}`} className="aspect-[4/5] w-full object-cover object-top" />
              <figcaption className="p-4">
                <p className="text-base font-bold text-primary">{p.name}</p>
                <p className="text-sm font-semibold text-active">{p.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function Why() {
  return (
    <Section id="why" tone="alt">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal>
          <Eyebrow>Why Kimaru exists</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Better AI does not automatically create better company decisions.</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Companies already have ERP, planning tools, spreadsheets, dashboards and experienced people. They are also gaining copilots and agents that can search, write, recommend and act.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Those tools are useful. But an important business decision is bigger than a task.</p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-primary">Kimaru keeps that whole decision together.</p>
        </Reveal>
      </div>
    </Section>
  );
}

const beliefs: Array<{ icon: LucideIcon; t: string }> = [
  { icon: Eye, t: 'AI should help people make better decisions, not hide the reason behind them.' },
  { icon: ShieldCheck, t: 'The right decision owner stays in control of consequential action.' },
  { icon: Scale, t: 'A recommendation is not enough. The company must compare the prediction with the actual result.' },
  { icon: Target, t: 'The company should keep the knowledge that makes its decisions better.' },
];

export function Beliefs() {
  return (
    <Section id="believe">
      <SectionHead eyebrow="What we believe" title="Four things we hold to." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {beliefs.map(({ icon: I, t }, n) => (
          <Reveal key={t} delay={n * 90} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                <I size={20} />
              </span>
              <p className="mt-4 text-[17px] font-semibold leading-snug text-primary">{t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Cofounders() {
  return (
    <Section id="team" tone="alt">
      <SectionHead
        eyebrow="Our cofounders"
        title="Two cofounders, one shared problem."
        body="Evan Burkosky and Hareesh Nambiar first worked together in Japan. As Canadian and Indian founders with global operating experience, they saw the same problem from different angles: companies had more data and software, but important operating decisions still depended on knowledge that was hard to see, govern, measure and reuse."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {people.map((p, n) => (
          <Reveal key={p.name} delay={n * 110} className="h-full">
            <div className="lift flex h-full gap-5 rounded-2xl border border-border bg-card p-6 max-sm:flex-col">
              <img src={asset(p.photo)} alt={`${p.name}, Kimaru ${p.role.toLowerCase()}`} loading="lazy" className="size-28 shrink-0 rounded-2xl border border-border object-cover object-top" />
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-primary">{p.name}</h3>
                <p className="text-sm font-semibold text-active">{p.role}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.bio}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">Together they share responsibility for Kimaru's direction, customer value and long-term company.</p>
    </Section>
  );
}

const facts = [
  { icon: Building2, k: 'Company', v: 'Kimaru AI, Inc.' },
  { icon: CalendarDays, k: 'Founded', v: '2024' },
  { icon: MapPin, k: 'Office', v: 'Austin, Texas' },
];

export function Facts() {
  return (
    <Section id="facts">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>At a glance</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Backed by Alchemist Accelerator.</h2>
          <img src={asset('alchemist.webp')} alt="Alchemist Accelerator" className="mt-5 h-9 w-auto" />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {facts.map(({ icon: I, k, v }, n) => (
            <Reveal key={k} delay={n * 90} className="h-full">
              <div className="lift h-full rounded-2xl border border-border bg-card p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <I size={18} />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{k}</p>
                <p className="mt-1 text-lg font-bold text-primary">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
