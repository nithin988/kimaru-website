import { ArrowRight, Check, PlugZap, TrendingUp } from 'lucide-react';
import { BOOK_URL, BrowserFrame, Button, Container, Eyebrow, asset } from './ui';
import { Depth, Parallax, ScrollProgress } from './motion';
import { Marquee } from './Marquee';

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
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
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
      <ScrollProgress />
    </header>
  );
}

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      {/* GPS routes at the edges, with the logo diamonds as waypoints and a dot travelling the route */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <path id="route-l" d="M-20 120 C 120 120, 120 330, 70 470 S 40 760, 240 800" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
        <path id="route-r" d="M1460 90 C 1330 100, 1330 300, 1380 430 S 1400 700, 1200 760" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
        <rect x="60" y="150" width="22" height="22" rx="6" transform="rotate(45 71 161)" fill="#518de0" />
        <rect x="1360" y="130" width="22" height="22" rx="6" transform="rotate(45 1371 141)" fill="#6f33bf" />
        <rect x="1352" y="580" width="26" height="26" rx="7" transform="rotate(45 1365 593)" fill="#5aaeb0" />
        <circle r="5" fill="#008080">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto"><mpath href="#route-l" /></animateMotion>
        </circle>
        <circle r="5" fill="#5215a3">
          <animateMotion dur="11s" repeatCount="indefinite" begin="-3s"><mpath href="#route-r" /></animateMotion>
        </circle>
      </svg>

      <Container className="relative pt-14 text-center lg:pt-20">
        <Eyebrow className="rise rise-1">Enterprise Decision Operating System</Eyebrow>
        <h1 className="rise rise-2 mx-auto mt-4 max-w-[14em] text-[clamp(38px,6.2vw,76px)] font-extrabold leading-[1.03] text-primary">
          The operating system for your <span className="grad-text">hardest decisions.</span>
        </h1>
        <p className="rise rise-3 mx-auto mt-5 max-w-[38em] text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Kimaru is built for manufacturing and supply chains. It pulls in the data you already have, compares realistic options, lets the right person choose, and learns from every result.{' '}
          <b className="font-semibold text-foreground">Think GPS for business decisions.</b>
        </p>
        <div className="rise rise-4 mt-7 flex flex-wrap justify-center gap-3">
          <Button href={BOOK_URL} size="lg">
            Book a Decision Walkthrough <ArrowRight size={16} />
          </Button>
          <Button href="#how" variant="outline" size="lg">
            Take the 2-minute tour
          </Button>
        </div>
        <p className="rise rise-5 mt-5 inline-flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="size-2.5 shrink-0 rotate-45 rounded-[3px] bg-logo-teal" />
          <span>
            In one pilot, on-time production went from <b className="text-foreground">43% to 75%</b>. Measured, not universal.
          </span>
        </p>
      </Container>

      <Container className="rise rise-6 relative mt-12 pb-16 max-w-[1360px]!">
        <div className="relative grid items-center lg:grid-cols-[minmax(0,0.6fr)_minmax(0,2.3fr)_minmax(0,0.6fr)]">
          {/* Left supporting screen, turned in toward the centre */}
          <Parallax factor={3} className="relative z-0 hidden lg:block lg:-mr-10">
            <div className="tilt-l floaty">
              <BrowserFrame src="screens/production-hub.png" alt="Kimaru Work Hub listing open material shortage decisions" title="Work Hub" aspect="4 / 5" imgClassName="object-left-top scale-[1.05] origin-top-left" className="shadow-2xl" />
            </div>
          </Parallax>

          {/* Main screen */}
          <div className="relative z-10">
            <Depth>
              <BrowserFrame
                src="screens/production-recs.png"
                alt="Kimaru recommendations screen for a typhoon alert, listing at-risk components, their order fulfillment risk and the recommended action with its predicted outcome"
                title="Decide on recommendations"
                aspect="2000 / 940"
              >
                <span className="ping-soft absolute left-[38%] top-[74%] hidden items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-lg md:flex">
                  <Check size={12} /> Predicted outcome
                </span>
                <span className="absolute right-[2%] top-[74%] hidden items-center gap-1.5 rounded-full bg-agent px-3 py-1.5 text-xs font-semibold text-white shadow-lg md:flex">
                  <PlugZap size={12} /> Accept, ask the agent, defer
                </span>
              </BrowserFrame>
            </Depth>
          </div>

          {/* Right supporting screen */}
          <Parallax factor={5} className="relative z-0 hidden lg:block lg:-ml-10">
            <div className="tilt-r floaty-b">
              <BrowserFrame src="screens/production-tracker.png" alt="Kimaru Decision Tracker showing on-time delivery rate by product line" title="Decision Tracker" aspect="4 / 5" imgClassName="object-right-bottom" className="shadow-2xl">
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-active px-2.5 py-1 text-[11px] font-semibold text-white">
                  <TrendingUp size={11} /> Expected vs actual
                </span>
              </BrowserFrame>
            </div>
          </Parallax>
        </div>
      </Container>

      <Marquee />
    </div>
  );
}
