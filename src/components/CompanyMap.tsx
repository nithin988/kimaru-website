import { useMemo } from 'react';
import { geoNaturalEarth1, geoPath, geoInterpolate } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection } from 'geojson';
import land from 'world-atlas/land-110m.json';
import { CalendarDays, MapPin } from 'lucide-react';
import { asset } from './ui';

const W = 800;
const H = 350;
const AUSTIN: [number, number] = [-97.74, 30.27];
const JAPAN: [number, number] = [138.25, 36.2];

/** Where Kimaru is based, and where the cofounders first worked together. */
export function CompanyMap() {
  const { d, austin, japan, arc } = useMemo(() => {
    const geo = feature(land as never, (land as never as { objects: { land: never } }).objects.land) as unknown as FeatureCollection;
    const proj = geoNaturalEarth1().rotate([-150, 0]).fitExtent([[6, -8], [W - 6, 392]], geo);
    const a = proj(AUSTIN)!;
    const j = proj(JAPAN)!;
    // Arc across the Pacific: lift the midpoint so the line curves like a flight path.
    const mid = proj(geoInterpolate(JAPAN, AUSTIN)(0.5))!;
    const lift = 38;
    return {
      d: geoPath(proj)(geo) ?? '',
      austin: a,
      japan: j,
      arc: `M${j[0]} ${j[1]} Q${mid[0]} ${mid[1] - lift} ${a[0]} ${a[1]}`,
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-28px_rgb(37_59_127/0.4)]">
      <div className="relative bg-[linear-gradient(160deg,#f5f7ff,#eef6ff_55%,#ecfeff)]">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <svg viewBox={`0 34 ${W} 280`} className="relative block w-full" role="img" aria-label="World map showing Kimaru's office in Austin, Texas, and Japan, where the cofounders first worked together">
          <path d={d} className="fill-brand/15 stroke-brand/30" strokeWidth="0.6" strokeLinejoin="round" />
          <path d={arc} fill="none" strokeWidth="1.6" strokeDasharray="4 5" className="stroke-brand/60" />

          {/* Japan */}
          <g transform={`translate(${japan[0]} ${japan[1]})`}>
            <circle r="5" className="fill-card stroke-brand" strokeWidth="2" />
            <g transform="translate(-70 -38)">
              <rect width="150" height="26" rx="13" className="fill-card stroke-border" />
              <text x="75" y="17" textAnchor="middle" className="fill-primary text-[12px] font-bold">Japan · where we met</text>
            </g>
          </g>

          {/* Austin */}
          <g transform={`translate(${austin[0]} ${austin[1]})`}>
            <circle r="16" className="fill-active/20">
              <animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values=".7;0;.7" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r="6.5" className="fill-active stroke-card" strokeWidth="2.5" />
            <g transform="translate(-160 12)">
              <rect width="150" height="26" rx="13" className="fill-primary" />
              <text x="75" y="17" textAnchor="middle" className="fill-white text-[12px] font-bold">Austin, Texas · office</text>
            </g>
          </g>
        </svg>
      </div>
      <dl className="m-0 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex min-w-0 items-center gap-3 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><CalendarDays size={18} /></span>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Founded</dt>
            <dd className="m-0 text-[15px] font-bold text-primary">November 2024</dd>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-3 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><MapPin size={18} /></span>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Based in</dt>
            <dd className="m-0 text-[15px] font-bold text-primary">Austin, Texas</dd>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-3 p-4">
          <div className="min-w-0">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Backed by</dt>
            <dd className="m-0 mt-1"><img src={asset('alchemist.webp')} alt="Alchemist Accelerator" className="h-6 w-auto max-w-full" /></dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
