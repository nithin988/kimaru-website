import { ChevronDown } from 'lucide-react';
import { BOOK_URL, Button, Container, PRODUCT_URL, Section, SectionHead, asset, homeHref } from './ui';

const faqs = [
  { q: 'Does Kimaru replace human judgment?', a: 'No. Kimaru recommends. The person with the authority accepts, adjusts, defers or escalates, and the reasoning stays on record.' },
  { q: 'Do we have to replace or rewire our systems?', a: 'No. Kimaru works next to your ERP, supply chain tools, spreadsheets and databases. A first pilot can run from files or read-only access.' },
  { q: 'How is this different from Copilot or Claude?', a: 'An assistant answers a request. Kimaru keeps the options, rules, approval and result together for a recurring decision. Assistants can still carry out what was approved.' },
  { q: 'What do we need to start?', a: 'One recurring decision, the person who owns it, and a sample of the data they use today. Files are fine.' },
];

export function Faq() {
  return (
    <Section id="faq" tone="alt">
      <SectionHead eyebrow="Common questions" title="Things buyers ask first." />
      <div className="max-w-3xl divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-primary">
              {f.q}
              <ChevronDown size={18} className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function Closing() {
  return (
    <section id="book" className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] bg-brand px-6 py-16 text-center text-white sm:px-10">
          <div className="shimmer absolute inset-x-0 top-0 h-1" style={{ background: 'linear-gradient(90deg, #0284c7, #5eead4, #6d28d9, #4f46e5, #0284c7, #5eead4)' }} />
          <span className="floaty pointer-events-none absolute max-sm:hidden left-[7%] top-[22%] size-7 rotate-45 rounded-lg bg-logo-blue/70" />
          <span className="floaty-b pointer-events-none absolute max-sm:hidden bottom-[18%] right-[8%] size-9 rotate-45 rounded-xl bg-logo-purple/70" />
          <span className="floaty pointer-events-none absolute max-sm:hidden bottom-[14%] left-[16%] size-5 rotate-45 rounded-md bg-logo-teal/80" />
          <h2 className="mx-auto max-w-[14em] text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.05] text-white">Show us one hard decision.</h2>
          <p className="mx-auto mb-7 mt-4 max-w-[34em] text-lg text-white/85">A 20 to 30 minute walkthrough. Bring a decision your team keeps making the hard way and we will show the full loop on it. Investors and partners are welcome too.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href={BOOK_URL} variant="light" size="lg">
              Book a Decision Walkthrough
            </Button>
            <Button href={BOOK_URL} size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <span className="sm:hidden">Investors and partners</span><span className="max-sm:hidden">Investors and partners: talk to the founders</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  const col = (title: string, items: Array<[string, string]>) => (
    <div>
      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-foreground">{title}</h4>
      {items.map(([l, h]) => (
        <a key={l} href={homeHref(h)} className="block py-1 text-sm text-muted-foreground no-underline hover:text-foreground">
          {l}
        </a>
      ))}
    </div>
  );
  return (
    <footer className="pb-10 pt-6">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <img src={asset('logo.png')} alt="kimaru.ai" className="h-7 w-auto" />
            <p className="mt-3 max-w-[24em] text-sm text-muted-foreground">The Enterprise Decision Operating System for manufacturing and supply chains.</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Backed by</span>
              <img src={asset('alchemist.webp')} alt="Alchemist Accelerator" className="h-7 w-auto" />
            </div>
          </div>
          {col('Product', [['Product overview', PRODUCT_URL], ['Why Kimaru', '#cost'], ['How it works', '#how']])}
          {col('Learn more', [['What you get', '#benefits'], ['Industries', '#industries'], ['Trust and security', '#trust']])}
          {col('Company', [['About', 'https://kimaru.ai/about-us/'], ['Blog', 'https://kimaru.ai/blog/'], ['Contact', 'https://kimaru.ai/contact-us/']])}
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-[13px] text-muted-foreground">
          <span>© Kimaru AI, Inc.</span>
          <span>Product screens are synthetic demo data. Design preview, not the live site.</span>
        </div>
      </Container>
    </footer>
  );
}
