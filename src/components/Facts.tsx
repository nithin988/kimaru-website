import { ArrowUpRight, Bot, Building2, Compass, Factory, Gauge, Layers, MapPin, Shuffle, TrendingUp } from 'lucide-react';
import { BOOK_URL, Button, Eyebrow, Section, SectionHead, asset } from './ui';
import { CountUp, Reveal } from './motion';

export function Glance() {
  const cells = [
    { icon: Compass, k: 'What it is', v: 'Enterprise Decision Operating System', s: 'Decision intelligence for manufacturing and supply chains' },
    { icon: Factory, k: 'Who it is for', v: 'Industrial companies', s: 'Manufacturers and supply chain operators with recurring, costly decisions' },
    { icon: TrendingUp, k: 'Proof so far', v: null, s: 'On-time production in one measured pilot, up from 43%' },
    { icon: Building2, k: 'Company', v: 'Founded 2024, Austin TX', s: 'Backed by Alchemist Accelerator' },
  ];
  return (
    <section aria-label="Kimaru at a glance" className="border-b border-border bg-white py-10">
      <div className="mx-auto grid w-full max-w-[1200px] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {cells.map(({ icon: I, k, v, s }, n) => (
          <Reveal key={k} delay={n * 90}>
            <div className="lift h-full rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <I size={15} className="text-brand" /> {k}
              </div>
              <p className="mt-3 text-[22px] font-extrabold leading-tight tracking-tight text-primary">
                {v ?? (
                  <>
                    <CountUp to={75} suffix="%" />
                  </>
                )}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground">{s}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function WhyNow() {
  const cards = [
    { icon: Layers, t: 'Answers got cheap. Decisions did not.', b: 'Models and assistants can analyze almost anything on demand. The company still has to choose, commit and learn from the result.' },
    { icon: Shuffle, t: 'Supply chains do not hold still.', b: 'Tariffs, port delays and labor swings keep reopening the same hard calls, and spreadsheets and meetings cannot keep up.' },
    { icon: Bot, t: 'Agents need an authority layer.', b: 'As AI agents start to act, companies need clear rules on who approves what, and a record of why.' },
  ];
  return (
    <Section id="why-now" tone="alt">
      <SectionHead eyebrow="Why now" title="AI made answers cheap. Decisions are the bottleneck." body="The next gain for industrial companies is not another dashboard or chatbot. It is making the recurring, expensive calls better, and keeping what was learned." />
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ icon: I, t, b }, n) => (
          <Reveal key={t} delay={n * 120} className="h-full">
            <div className="lift h-full rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <I size={22} />
              </span>
              <h3 className="mt-5 text-xl font-bold leading-tight text-primary">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <a href="https://kimaru.ai/blog/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-active no-underline hover:underline">
        Read how we think about decisions <ArrowUpRight size={15} />
      </a>
    </Section>
  );
}

const founders = [
  { name: 'Evan Burkosky', role: 'Cofounder and CEO', initials: 'EB', note: 'Leads the company and customer relationships.', grad: 'from-logo-blue to-logo-purple' },
  { name: 'Hareesh Nambiar', role: 'Cofounder and CTO', initials: 'HN', note: 'Leads the platform. Patent work on decision intelligence.', grad: 'from-logo-purple to-logo-teal' },
];

export function Team() {
  return (
    <Section id="team">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <Eyebrow>The company</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] text-primary">Built for industrial decisions, from Austin.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Kimaru AI, Inc. was founded in 2024. We work with manufacturers and supply chain teams to turn their hardest recurring decisions into something measurable.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-brand" /> Austin, Texas</span>
            <span className="inline-flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.08em]">Backed by</span>
              <img src={asset('alchemist.webp')} alt="Alchemist Accelerator" className="h-7 w-auto" />
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={BOOK_URL}>Talk to the founders <ArrowUpRight size={15} /></Button>
            <Button href="https://kimaru.ai/about-us/" variant="outline">About Kimaru</Button>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {founders.map((f, n) => (
            <Reveal key={f.name} delay={n * 120}>
              <div className="lift h-full rounded-2xl border border-border bg-card p-6">
                <div className={`grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${f.grad} text-xl font-extrabold text-white`}>{f.initials}</div>
                <h3 className="mt-5 text-xl font-bold text-primary">{f.name}</h3>
                <p className="text-sm font-semibold text-active">{f.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={240} className="sm:col-span-2">
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-panel p-5">
              <Gauge size={24} className="shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <b className="text-foreground">Investors, partners and customers:</b> we are happy to walk through the product, the pilot results and the roadmap on a call.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
