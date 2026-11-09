import { ArrowRight, Check, Database, FileSpreadsheet, Network, PlugZap, Sparkles, Truck, Warehouse } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, asset } from './ui';

const links = [
  ['Product', '#edos'],
  ['How it works', '#how'],
  ['Solutions', '#start'],
  ['Results', '#results'],
  ['Trust & Security', '#trust'],
  ['FAQ', '#faq'],
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
      <Container className="flex h-[68px] items-center gap-6">
        <a href="#top" aria-label="kimaru.ai home" className="flex shrink-0 items-center">
          <img src={asset('logo.png')} alt="kimaru.ai" className="h-7 w-auto sm:h-8" />
        </a>
        <nav className="ml-4 hidden gap-6 text-sm font-medium text-muted-foreground lg:flex" aria-label="Main">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="no-underline transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Button href={BOOK_URL} className="ml-auto">
          <span className="sm:hidden">Book a walkthrough</span>
          <span className="hidden sm:inline">Book a Decision Walkthrough</span>
        </Button>
      </Container>
    </header>
  );
}

const sources = [
  { icon: Database, label: 'ERP' },
  { icon: Warehouse, label: 'SCM, WMS' },
  { icon: Truck, label: 'TMS' },
  { icon: FileSpreadsheet, label: 'Spreadsheets' },
  { icon: Network, label: 'Databases, APIs' },
  { icon: Sparkles, label: 'AI assistants' },
];

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      {/* GPS route with the logo diamonds as waypoints, kept to the edges so it never crosses text */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <path d="M-20 120 C 120 120, 120 330, 70 470 S 40 760, 240 800" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
        <path d="M1460 90 C 1330 100, 1330 300, 1380 430 S 1400 700, 1200 760" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
        <rect x="60" y="150" width="22" height="22" rx="6" transform="rotate(45 71 161)" fill="#518de0" />
        <rect x="1360" y="130" width="22" height="22" rx="6" transform="rotate(45 1371 141)" fill="#6f33bf" />
        <rect x="1352" y="580" width="26" height="26" rx="7" transform="rotate(45 1365 593)" fill="#5aaeb0" />
      </svg>

      <Container className="relative pt-14 text-center lg:pt-20">
        <Eyebrow>Enterprise Decision Operating System</Eyebrow>
        <h1 className="mx-auto mt-4 max-w-[14em] text-[clamp(38px,6.2vw,76px)] font-extrabold leading-[1.03] text-primary">
          The operating system for your <span className="grad-text">hardest decisions.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[38em] text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Kimaru is built for manufacturing and supply chains. It pulls in the data you already have, compares realistic options, lets the right person choose, and learns from every result.{' '}
          <b className="font-semibold text-foreground">Think GPS for business decisions.</b>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href={BOOK_URL} size="lg">
            Book a Decision Walkthrough <ArrowRight size={16} />
          </Button>
          <Button href="#how" variant="outline" size="lg">
            See how it works
          </Button>
        </div>
        <p className="mt-5 inline-flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="size-2.5 shrink-0 rotate-45 rounded-[3px] bg-logo-teal" />
          <span>
            In one pilot, on-time production went from <b className="text-foreground">43% to 75%</b>. Measured, not universal.
          </span>
        </p>
      </Container>

      <Container className="relative mt-10 pb-14">
        <div className="relative">
          <BrowserFrame
            src="screens/recommendation-detail.png"
            alt="Kimaru recommendations screen showing a recommendation, its predicted outcome and the Accept, Agent and Defer actions"
            title="Decide on recommendations"
            aspect="2000 / 940"
          >
            <span className="absolute left-[41%] top-[74%] hidden items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-lg md:flex">
              <Check size={12} /> Predicted outcome for every recommendation
            </span>
            <span className="absolute right-[2%] top-[74%] hidden items-center gap-1.5 rounded-full bg-agent px-3 py-1.5 text-xs font-semibold text-white shadow-lg md:flex">
              <PlugZap size={12} /> Accept, ask the agent, or defer
            </span>
          </BrowserFrame>
        </div>
      </Container>

      <div className="relative border-y border-border bg-white/80">
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
          <p className="max-w-[14em] text-[13px] font-semibold text-muted-foreground">Works with the systems you already run</p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {sources.map(({ icon: I, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium">
                <I size={14} className="text-muted-foreground" /> {label}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
