import { ArrowRight, CalendarClock, Check, FileCheck2, MessageSquareText, Presentation, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BOOK_URL, CONTACT_URL, Button, Container, Eyebrow, Section, SectionHead } from './ui';
import { Reveal } from './motion';

const quick: Array<{ icon: LucideIcon; t: string }> = [
  { icon: CalendarClock, t: '20 to 30 minutes' },
  { icon: Video, t: 'Video call' },
  { icon: MessageSquareText, t: 'One recurring decision' },
  { icon: FileCheck2, t: 'No data needed for the first call' },
];

export function BookHero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pb-20 lg:pt-20">
        <div>
          <Eyebrow className="rise rise-1">Book a walkthrough</Eyebrow>
          <h1 className="rise rise-2 mt-4 text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.05] text-primary">
            See one decision run, <span className="grad-text">start to finish.</span>
          </h1>
          <p className="rise rise-3 mt-5 max-w-[32em] text-lg leading-relaxed text-muted-foreground">
            A short walkthrough of the full Kimaru loop on a recurring decision like yours, with a founder. You leave knowing how the decision would run and whether a pilot makes sense.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL} size="lg">
              Pick a time <ArrowRight />
            </Button>
            <Button href={CONTACT_URL} variant="outline" size="lg">
              Prefer to write first?
            </Button>
          </div>
        </div>
        <Reveal className="min-w-0">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_-28px_rgb(37_59_127/0.4)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">The walkthrough</p>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {quick.map(({ icon: I, t }) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-border bg-panel px-4 py-3 text-[15px] font-semibold text-primary">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
                    <I size={18} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

const flow = [
  { t: 'You describe the decision', b: 'The recurring call your team keeps making the hard way, who owns it, and what happens when it goes wrong.' },
  { t: 'We show the full loop', b: 'On the real Kimaru screens, from the alert to the options, the approval and the measured result.' },
  { t: 'We agree on a next step', b: 'If it fits, we outline a pilot on one decision. If it does not, you still leave with a clearer view of the decision.' },
];

export function Flow() {
  return (
    <Section id="flow" tone="alt">
      <SectionHead eyebrow="What happens" title="Three parts, no preparation required." />
      <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
        {flow.map((f, n) => (
          <Reveal as="li" key={f.t} delay={n * 110} className="min-w-0">
            <div className="lift h-full rounded-2xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-[15px] font-bold text-primary-foreground">{n + 1}</span>
              <h3 className="mt-4 text-xl font-bold text-primary">{f.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.b}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

const bring = [
  'What the company has to choose',
  'Where the evidence lives today',
  'Which people add the missing context',
  'Who owns the commitment',
  'How you would know the result improved',
];

const leave = [
  'A clear view of how that decision would run in Kimaru',
  'An outline of a pilot: the decision, the baseline, the owner and a timeline',
  'No obligation',
];

export function Bring() {
  return (
    <Section id="bring">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
            <Presentation size={26} className="text-brand" />
            <h2 className="mt-4 text-2xl font-extrabold text-primary">What to bring</h2>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {bring.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-snug text-foreground">
                  <Check size={18} className="mt-0.5 shrink-0 text-active" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <div className="h-full rounded-2xl border border-active bg-teal-50 p-6 sm:p-8">
            <FileCheck2 size={26} className="text-active" />
            <h2 className="mt-4 text-2xl font-extrabold text-primary">What you leave with</h2>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {leave.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-snug text-foreground">
                  <Check size={18} className="mt-0.5 shrink-0 text-active" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={BOOK_URL}>
                Pick a time <ArrowRight />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">Investors and partners are welcome to book the same call. Use the contact form and we will cover the product, the pilot results and the roadmap.</p>
    </Section>
  );
}
