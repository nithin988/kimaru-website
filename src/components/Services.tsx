import { ArrowRight, Boxes, ClipboardCheck, Database, Factory, Handshake, KeyRound, PackageSearch, Route, ShieldCheck, TrendingUp, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, CONTACT_URL, Container, Eyebrow, SOLUTION_URL, SOLUTIONS_URL, Section, SectionHead } from './ui';
import { Reveal } from './motion';

export function ServicesHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1360px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Solutions · Decisions as a Service</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            Start with a service. <span className="grad-text">Grow into the platform.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[31em] text-lg leading-relaxed text-muted-foreground">
            Every AI project needs clean data and a clear decision. Kimaru does that work with you first, then helps you run the decision day to day.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={CONTACT_URL} size="lg">
              Tell us what you need <ArrowRight />
            </Button>
            <Button href="#services" variant="outline" size="lg">
              See the services
            </Button>
          </div>
        </div>
        <div className="rise rise-5 min-w-0">
          <BrowserFrame src="screens/uc-cdd-select.png" alt="A decision map showing the levers, outside factors and outcomes that drive one decision" title="A decision map" aspect="1440 / 900" />
        </div>
      </div>
    </div>
  );
}

const why: Array<{ icon: LucideIcon; t: string; b: string }> = [
  { icon: KeyRound, t: 'No platform commitment', b: 'Begin with one service on one decision. Decide on the platform later, once you have seen the result.' },
  { icon: ShieldCheck, t: 'Useful with any AI', b: 'Clean data and a clear map of the decision help whichever AI or tools you choose later.' },
  { icon: Route, t: 'One decision at a time', b: 'Start with a recurring decision your team already owns, so the work stays focused.' },
  { icon: ClipboardCheck, t: 'Something you can use', b: 'Each service ends with an output your team can use: clean data, a decision map, a forecast or a recommended decision.' },
];

export function WhyStart() {
  return (
    <Section id="why" tone="alt">
      <SectionHead eyebrow="Why start with a service" title="The fastest way to make a decision better is to get it ready first." body="Most teams want better decisions from AI. The first step is usually simpler: know where the facts live, and how the decision is made." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {why.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 90} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                <I size={20} />
              </span>
              <h3 className="mt-4 text-xl font-bold leading-tight text-primary">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const services: Array<{ icon: LucideIcon; t: string; b: string; out: string }> = [
  { icon: Database, t: 'Data readiness', b: 'We find where the facts for your decision live across ERP, planning tools and spreadsheets, and clean them so they can be trusted.', out: 'Mapped and cleaned data' },
  { icon: Workflow, t: 'Decision mapping', b: 'We map what drives the outcome: the levers you control, the outside factors, and the results that matter.', out: 'A decision map' },
  { icon: TrendingUp, t: 'Forecasting', b: 'We forecast demand, supply or cost, and compare what happens under different options.', out: 'Forecasts and what-if comparisons' },
  { icon: Handshake, t: 'Decisions as a Service', b: 'Kimaru runs the decision loop for one recurring decision. We bring the options, your owner approves, and we track the result.', out: 'Recommendations and a tracked result' },
];

export function ServiceCards() {
  return (
    <Section id="services">
      <SectionHead eyebrow="The services" title="Pick the one that fits where you are." body="Use one on its own or in order. The scope is agreed for each decision." />
      <div className="grid gap-5 md:grid-cols-2">
        {services.map(({ icon: I, t, b, out }, n) => (
          <Reveal key={t} delay={(n % 2) * 100} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <I size={22} />
                </span>
                <h3 className="text-2xl font-extrabold leading-tight text-primary">{t}</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{b}</p>
              <p className="mt-auto pt-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">You get </span>
                <span className="ml-1 inline-flex rounded-full border border-active/40 bg-teal-50 px-3 py-1 text-[13px] font-semibold text-active">{out}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const path = [
  { t: 'Start with a service', b: 'Choose one service on one decision. We agree the scope and the owner.' },
  { t: 'See it work', b: 'Watch the full loop on your decision and measure it against a baseline.' },
  { t: 'Move to the platform', b: 'When the decision proves itself, your team runs it in Kimaru, and you add decisions one at a time.' },
];

export function GrowPath() {
  return (
    <Section id="path" tone="alt">
      <SectionHead eyebrow="How it grows" title="A path, not a leap." />
      <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
        {path.map((p, n) => (
          <Reveal as="li" key={p.t} delay={n * 120} className="min-w-0">
            <div className="mb-3.5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-[15px] font-bold text-white">{n + 1}</span>
              {n < path.length - 1 && <span className="hidden flex-1 border-t-2 border-dashed border-slate-300 md:block" />}
            </div>
            <div className="lift h-full rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-bold text-primary">{p.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.b}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

const areas: Array<{ icon: LucideIcon; t: string; q: string; href?: string }> = [
  { icon: Factory, t: 'Production commitment', q: 'Which builds run next when material, capacity and due dates conflict?', href: SOLUTION_URL },
  { icon: Boxes, t: 'Inventory and allocation', q: 'Where should scarce stock go?' },
  { icon: PackageSearch, t: 'Supplier, BOM and cost', q: 'Which exception needs action now?' },
];

export function Areas() {
  return (
    <Section id="areas">
      <SectionHead eyebrow="Decision areas" title="Where teams start." body="Each service applies to a recurring decision. These are the ones we work on most." />
      <div className="grid gap-4 md:grid-cols-3">
        {areas.map(({ icon: I, t, q, href }, n) => (
          <Reveal key={t} delay={n * 100} className="h-full">
            <div className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <I size={20} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-primary">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{q}</p>
              <div className="mt-auto pt-5">
                {href ? (
                  <a href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-active no-underline hover:underline">
                    See this decision <ArrowRight size={15} />
                  </a>
                ) : (
                  <a href={CONTACT_URL} className="inline-flex items-center gap-1.5 text-sm font-semibold text-active no-underline hover:underline">
                    Ask us about it <ArrowRight size={15} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Container className="mt-10 !p-0">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-active bg-teal-50 px-6 py-5">
          <b className="text-base text-primary">Not sure which service fits?</b>
          <span className="text-[15px] text-muted-foreground">Describe the decision and we will suggest where to start.</span>
          <Button href={BOOK_URL} className="ml-auto">
            Book a walkthrough <ArrowRight />
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/** Short teaser for the home page. Links to the Solutions page. */
export function ServicesTeaser() {
  return (
    <Section id="services-teaser" tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <Eyebrow>Decisions as a Service</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] font-extrabold leading-[1.1] text-primary">Not ready for a platform? Start with a service.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Get your data ready, map the decision, forecast the options, or have Kimaru run one decision with you. Move to the platform when it has proven itself.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={SOLUTIONS_URL} size="lg">
              See the services <ArrowRight />
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map(({ icon: I, t, out }, n) => (
            <Reveal key={t} delay={n * 90} className="h-full">
              <div className="lift h-full rounded-2xl border border-border bg-card p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <I size={18} />
                </span>
                <p className="mt-3 text-lg font-bold text-primary">{t}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{out}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
