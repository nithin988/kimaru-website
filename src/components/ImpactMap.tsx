import { ArrowRight, Check, Gauge, Target, Waypoints } from 'lucide-react';
import { BrowserFrame, Button, Eyebrow, Section, cn } from './ui';
import { Reveal } from './motion';
import { NetworkBackdrop } from './Flow';

const uses = [
  { icon: Target, t: 'Focus on what matters', b: 'See which few factors move the result most, so effort goes where it pays.' },
  { icon: Waypoints, t: 'Test a change first', b: 'Compare what happens if you change a lever, before you commit to it.' },
  { icon: Gauge, t: 'Know how sure it is', b: 'Each influence carries a confidence level, so you can see where the evidence is strong and where it needs more data.' },
];

export function ImpactMap() {
  return (
    <Section id="map" tone="alt">
      <div className="mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow>Our core offer · the Kimaru platform</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] text-primary">See why an order is at risk, and what each option changes.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Kimaru brings the facts behind one decision together, tests each practical option against them, and shows the predicted result before anyone commits. Decisions stop being a debate and start from evidence.
          </p>
        </Reveal>
      </div>
      <Reveal>
        <BrowserFrame src="art:brief" alt="A decision brief: what puts one order at risk, and what each option changes" title="Decision brief" aspect="1000 / 630" />
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {uses.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 100} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                <I size={20} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-primary">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const paths = [
  {
    k: 'The platform', who: 'For teams that make the same costly decision again and again', t: 'Run decisions in Kimaru', b: 'Your team works in one place every day: the decision map, the options, the approval and the tracked result.',
    pts: ['Decision map with influence values', 'Options compared before you commit', 'Approval, record and tracking'], cta: 'Book a walkthrough', primary: true,
  },
  {
    k: 'Decisions as a Service', who: 'For teams that want results before committing to a platform', t: 'Start with a service', b: 'Not ready for a platform? We do the groundwork with you: data, the decision map, forecasts, even running the decision.',
    pts: ['No platform commitment', 'Useful with any AI you choose later', 'Grow into the platform when ready'], cta: 'Tell us what you need', primary: false,
  },
];

export function TwoWays({ bookUrl, contactUrl }: { bookUrl: string; contactUrl: string }) {
  return (
    <Section id="ways" className="relative overflow-hidden">
      <NetworkBackdrop className="-right-16 top-6 hidden w-[620px] opacity-60 lg:block" />
      <div className="mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow>Two ways to start</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] text-primary">Run it yourself, or let us start the work.</h2>
        </Reveal>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {paths.map((p, n) => (
          <Reveal key={p.k} delay={n * 110} className="h-full">
            <div className={cn('lift flex h-full flex-col rounded-3xl border p-7 sm:p-8', p.primary ? 'border-brand bg-brand text-white' : 'border-border bg-card')}>
              <p className={cn('text-xs font-semibold uppercase tracking-[0.09em]', p.primary ? 'text-white/75' : 'text-muted-foreground')}>{p.k}</p>
              <p className={cn('mt-2 text-sm font-semibold', p.primary ? 'text-teal-200' : 'text-active')}>{p.who}</p>
              <h3 className={cn('mt-1 text-3xl font-extrabold leading-tight', p.primary ? 'text-white' : 'text-primary')}>{p.t}</h3>
              <p className={cn('mt-3 text-base leading-relaxed', p.primary ? 'text-white/85' : 'text-muted-foreground')}>{p.b}</p>
              <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
                {p.pts.map((x) => (
                  <li key={x} className={cn('flex items-start gap-2.5 text-[15px]', p.primary ? 'text-white' : 'text-foreground')}>
                    <Check size={18} className={cn('mt-0.5 shrink-0', p.primary ? 'text-teal-300' : 'text-active')} />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Button href={p.primary ? bookUrl : contactUrl} variant={p.primary ? 'light' : 'brand'}>
                  {p.cta} <ArrowRight />
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
