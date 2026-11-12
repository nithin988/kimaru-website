import { ArrowRight, Eye, Users, MapPin, Phone, Scale, ShieldCheck, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CONTACT_URL, Button, Container, Eyebrow, Section, SectionHead, asset } from './ui';
import { Reveal } from './motion';
import { CompanyMap } from './CompanyMap';

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
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-2 lg:pb-20 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Company</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4vw,50px)] font-extrabold leading-[1.05] text-primary">
            Better recurring decisions for <span className="grad-text">industrial companies.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[34em] text-lg leading-relaxed text-muted-foreground">
            Kimaru brings together what your software shows, what your people know and what AI recommends, so the company can choose, get the right approval, see what happened and remember what worked.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={CONTACT_URL} size="lg">
              Talk to the founders <ArrowRight />
            </Button>
            <Button href="#team" variant="outline" size="lg">
              Meet the team
            </Button>
          </div>
        </div>
        <div className="rise rise-5 min-w-0">
          <CompanyMap />
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
      <div className="grid gap-6 md:grid-cols-2">
        {people.map((p, n) => (
          <Reveal key={p.name} delay={n * 110} className="h-full">
            <figure className="lift m-0 flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-28px_rgb(37_59_127/0.4)]">
              <div className="relative">
                <img src={asset(p.photo)} alt={`${p.name}, Kimaru ${p.role.toLowerCase()}`} loading="lazy" className="aspect-[4/4.2] w-full object-cover object-top" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-2xl font-extrabold text-white">{p.name}</p>
                  <p className="text-sm font-semibold text-teal-200">{p.role}</p>
                </figcaption>
              </div>
              <p className="p-6 text-[16px] leading-relaxed text-muted-foreground">{p.bio}</p>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">Together they share responsibility for Kimaru's direction, customer value and long-term company.</p>
    </Section>
  );
}

const reach = [
  { icon: MapPin, k: 'Office', v: '1606 Headway Cir STE 9718', v2: 'Austin, TX 78754', href: 'https://www.google.com/maps/search/?api=1&query=1606+Headway+Cir+STE+9718+Austin+TX+78754' },
  { icon: Phone, k: 'Phone', v: '+1 737 377 1477', v2: 'Austin, Texas', href: 'tel:+17373771477' },
  { icon: Users, k: 'LinkedIn', v: 'Kimaru AI', v2: 'Company updates', href: 'https://www.linkedin.com/company/kimaru-ai/' },
];

export function Facts() {
  return (
    <Section id="contact">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <Eyebrow>Find us</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Talk to the founders.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Bring a decision your team keeps making the hard way. Investors and partners are welcome too.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={CONTACT_URL} size="lg">
              Get in touch <ArrowRight />
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {reach.map(({ icon: I, k, v, v2, href }, n) => (
            <Reveal key={k} delay={n * 90} className="h-full">
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="lift block h-full rounded-2xl border border-border bg-card p-5 no-underline">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <I size={18} />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{k}</p>
                <p className="mt-1 text-base font-bold leading-snug text-primary">{v}</p>
                <p className="text-sm text-muted-foreground">{v2}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
