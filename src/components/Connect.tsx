import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Bot, CheckCircle2, Database, FileSpreadsheet, History, Network, Warehouse } from 'lucide-react';
import { brandLogos } from '../data/brandLogos';
import { Section, SectionHead, asset, cn } from './ui';
import { Reveal } from './motion';

type Src = { id: string; title: string; sub: string; logos: Array<keyof typeof brandLogos>; icon?: typeof Database };
const sources: Src[] = [
  { id: 'erp', title: 'ERP and business systems', sub: 'Orders, inventory, costs', logos: ['sap', 'oracle', 'microsoft'] },
  { id: 'scm', title: 'Supply chain systems', sub: 'Planning, WMS, TMS', logos: [], icon: Warehouse },
  { id: 'data', title: 'Data and cloud', sub: 'Warehouses, lakes, APIs', logos: ['snowflake', 'databricks', 'aws'] },
  { id: 'files', title: 'Files and spreadsheets', sub: 'The logic that lives in Excel', logos: [], icon: FileSpreadsheet },
  { id: 'agents', title: 'AI agents', sub: 'Act on what is approved', logos: ['claude-icon', 'openai-icon', 'google-gemini'] },
];
const outs = [
  { id: 'act', title: 'An approved action', sub: 'With an owner and a reason', icon: CheckCircle2, good: true },
  { id: 'track', title: 'A tracked result', sub: 'Expected versus actual', icon: History },
  { id: 'play', title: 'A playbook that improves', sub: 'Kept for the next decision', icon: Bot },
];

type Pt = { x: number; y: number };

export function Connect() {
  const wrap = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const left = useRef<Array<HTMLDivElement | null>>([]);
  const right = useRef<Array<HTMLDivElement | null>>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [wide, setWide] = useState(true);

  const measure = () => {
    const w = wrap.current;
    const h = hub.current;
    if (!w || !h) return;
    const isWide = window.matchMedia('(min-width: 900px)').matches;
    setWide(isWide);
    const wr = w.getBoundingClientRect();
    setSize({ w: wr.width, h: wr.height });
    if (!isWide) {
      setPaths([]);
      return;
    }
    const hr = h.getBoundingClientRect();
    const hubL: Pt = { x: hr.left - wr.left, y: hr.top - wr.top + hr.height / 2 };
    const hubR: Pt = { x: hr.right - wr.left, y: hubL.y };
    const curve = (a: Pt, b: Pt) => {
      const dx = (b.x - a.x) * 0.5;
      return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
    };
    const next: string[] = [];
    left.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next.push(curve({ x: r.right - wr.left, y: r.top - wr.top + r.height / 2 }, hubL));
    });
    right.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next.push(curve(hubR, { x: r.left - wr.left, y: r.top - wr.top + r.height / 2 }));
    });
    setPaths(next);
  };

  useLayoutEffect(() => {
    measure();
  }, []);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 400); // after fonts and images settle
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  return (
    <Section id="connect">
      <SectionHead
        eyebrow="Plugs into your stack"
        title="Start from what you already have."
        body="Kimaru reads from your systems, spreadsheets and data platforms, then hands approved decisions back to the people and agents who act on them."
      />
      <Reveal>
        <div ref={wrap} className="relative grid items-center gap-8 rounded-3xl border border-border bg-panel p-5 sm:p-8 md:grid-cols-[1fr_auto_1fr] md:gap-16">
          {wide && size.w > 0 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" width={size.w} height={size.h} aria-hidden="true">
              <defs>
                <linearGradient id="beam-g" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#518de0" />
                  <stop offset="50%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#6f33bf" />
                </linearGradient>
              </defs>
              {paths.map((d, i) => (
                <g key={i}>
                  <path d={d} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path d={d} fill="none" stroke="url(#beam-g)" strokeWidth="2.5" strokeLinecap="round" className="flow-line" style={{ animationDelay: `${i * 0.15}s` }} />
                </g>
              ))}
            </svg>
          )}

          <div className="relative z-10 grid gap-3">
            {sources.map((s, i) => {
              const I = s.icon ?? Network;
              return (
                <div key={s.id} ref={(el) => { left.current[i] = el; }} className="lift flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
                  <div className="flex min-h-9 min-w-[72px] items-center justify-center gap-2">
                    {s.logos.length > 0 ? (
                      s.logos.map((k) => {
                        const l = brandLogos[k];
                        const h = l.w / l.h > 2.2 ? 12 : 20;
                        return <svg key={k} role="img" aria-label={k} viewBox={`0 0 ${l.w} ${l.h}`} style={{ height: h, width: (h * l.w) / l.h }} dangerouslySetInnerHTML={{ __html: l.body }} />;
                      })
                    ) : (
                      <I size={22} className="text-brand" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-primary">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={hub} className="beam relative z-10 mx-auto grid w-full max-w-[260px] place-items-center rounded-3xl bg-brand px-6 py-8 text-center text-white shadow-[0_30px_60px_-20px_rgb(37_59_127/0.6)]">
            <img src={asset('logo.png')} alt="" className="h-8 w-auto rounded bg-white/95 px-2 py-1.5" />
            <p className="mt-4 text-sm font-semibold">Enterprise Decision Operating System</p>
            <p className="mt-1 text-xs text-white/75">Compare, govern, act, learn</p>
          </div>

          <div className="relative z-10 grid gap-3">
            {outs.map((o, i) => (
              <div
                key={o.id}
                ref={(el) => { right.current[i] = el; }}
                className={cn('lift flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm', o.good ? 'border-active bg-teal-50' : 'border-border bg-card')}
              >
                <o.icon size={22} className={o.good ? 'text-active' : 'text-brand'} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight text-primary">{o.title}</p>
                  <p className="text-xs text-muted-foreground">{o.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Files', b: 'Controlled uploads of the data your team already uses. The fastest way to a first result.' },
          { t: 'Read-only database views', b: 'A view in your warehouse or ERP database. Nothing is written back.' },
          { t: 'Scheduled API pulls', b: 'Regular pulls from your systems of record. Write-back follows the integration you agree.' },
        ].map((c, n) => (
          <Reveal key={c.t} delay={n * 100}>
            <div className="lift h-full rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-active">Three ways to start</p>
              <h3 className="mt-1.5 text-lg font-bold text-primary">{c.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
