import { ArrowRight, BadgeCheck, Eye, Users, MapPin, Phone, Scale, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CONTACT_URL, Button, Container, Eyebrow, Section, SectionHead, asset } from './ui';
import { Reveal } from './motion';
import { CompanyMap } from './CompanyMap';
import { BOOK_URL } from './ui';

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

function HeroVisual() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl border border-border shadow-[0_30px_70px_-30px_rgb(37_59_127/0.55)]">
        <img src={asset('photos/factory.webp')} alt="A modern production hall with assembly lines" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#253B80]/35 via-transparent to-transparent" aria-hidden="true" />
      </div>
      <div className="floaty absolute -left-3 bottom-8 w-[250px] rounded-2xl border border-border bg-card/95 p-4 shadow-[0_20px_50px_-20px_rgb(37_59_127/0.55)] backdrop-blur max-sm:left-3 max-sm:w-[215px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">Decision on record</p>
        <ul className="m-0 mt-2.5 grid list-none gap-2 p-0 text-[13px] font-semibold text-primary">
          {['Options compared', 'Approved by the owner', 'Result tracked'].map((x) => (
            <li key={x} className="flex items-center gap-2"><BadgeCheck size={16} className="shrink-0 text-active" /> {x}</li>
          ))}
        </ul>
      </div>
      <div className="floaty-b absolute -right-3 top-8 flex max-sm:hidden items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-[0_20px_50px_-20px_rgb(37_59_127/0.55)] backdrop-blur max-sm:right-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand text-white"><TrendingUp size={18} /></span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">Built for</p>
          <p className="text-[14px] font-bold text-primary">Manufacturing and supply chains</p>
        </div>
      </div>
    </div>
  );
}

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
          <HeroVisual />
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
            <div className="lift flex h-full items-center gap-6 rounded-3xl border border-border bg-card p-5 max-sm:flex-col max-sm:items-start sm:p-6">
              <img src={asset(p.photo)} alt={`${p.name}, Kimaru ${p.role.toLowerCase()}`} loading="lazy" className="aspect-[4/5] w-40 shrink-0 rounded-2xl border border-border object-cover object-top max-sm:w-36" />
              <div className="min-w-0">
                <h3 className="text-2xl font-extrabold leading-tight text-primary">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold text-active">{p.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.bio}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">Together they share responsibility for Kimaru's direction, customer value and long-term company.</p>
    </Section>
  );
}

const reach = [
  { icon: MapPin, v: '1606 Headway Cir STE 9718, Austin, TX 78754', href: 'https://www.google.com/maps/search/?api=1&query=1606+Headway+Cir+STE+9718+Austin+TX+78754' },
  { icon: Phone, v: '+1 737 377 1477', href: 'tel:+17373771477' },
  { icon: Users, v: 'Kimaru AI on LinkedIn', href: 'https://www.linkedin.com/company/kimaru-ai/' },
];

export function Facts() {
  return (
    <Section id="contact">
      <Reveal>
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_70px_-34px_rgb(37_59_127/0.45)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col bg-brand p-8 text-white sm:p-10">
            <Eyebrow className="!text-white/70">Find us</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] text-white">Talk to the founders.</h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">Bring a decision your team keeps making the hard way. Investors and partners are welcome too.</p>
            <ul className="m-0 mt-6 grid list-none gap-3 p-0">
              {reach.map(({ icon: I, v, href }) => (
                <li key={v}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-start gap-3 text-[15px] font-semibold text-white no-underline hover:text-teal-200">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/12"><I size={17} /></span>
                    <span className="pt-1.5">{v}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button href={BOOK_URL} variant="light" size="lg">
                Book a walkthrough
              </Button>
              <Button href={CONTACT_URL} size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                Send a message
              </Button>
            </div>
          </div>
          <CompanyMap bare />
        </div>
      </Reveal>
    </Section>
  );
}
