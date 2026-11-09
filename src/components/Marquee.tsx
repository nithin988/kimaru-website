import type { LucideIcon } from 'lucide-react';
import { Database, FileSpreadsheet, Network, PackageSearch, Truck, Warehouse } from 'lucide-react';
import { brandLogos } from '../data/brandLogos';
import { Container, cn } from './ui';
import { Reveal } from './motion';

type Logo = { kind: 'logo'; key: keyof typeof brandLogos; name: string; showName?: boolean };
type Chip = { kind: 'chip'; label: string; icon: LucideIcon };
type Cat = { kind: 'cat'; label: string };
type Item = Logo | Chip | Cat;

const logo = (key: keyof typeof brandLogos, name: string, showName = false): Logo => ({ kind: 'logo', key, name, showName });
const chip = (label: string, icon: LucideIcon): Chip => ({ kind: 'chip', label, icon });
const cat = (label: string): Cat => ({ kind: 'cat', label });

// Example systems and agents that can take part when configured and authorized.
const rowA: Item[] = [
  cat('ERP and business systems'),
  logo('sap', 'SAP'),
  logo('oracle', 'Oracle'),
  logo('microsoft', 'Microsoft'),
  logo('salesforce', 'Salesforce'),
  chip('Supply chain planning', PackageSearch),
  chip('WMS', Warehouse),
  chip('TMS', Truck),
  cat('Data and cloud'),
  logo('aws', 'AWS'),
  logo('microsoft-azure', 'Azure', true),
  logo('google-cloud', 'Google Cloud', true),
  logo('snowflake', 'Snowflake'),
  logo('databricks', 'Databricks'),
  logo('postgresql', 'PostgreSQL', true),
  logo('mongodb', 'MongoDB'),
  logo('kafka-icon', 'Kafka', true),
];
const rowB: Item[] = [
  cat('Analytics'),
  logo('microsoft-power-bi', 'Power BI', true),
  logo('tableau-icon', 'Tableau', true),
  logo('looker', 'Looker'),
  cat('AI agents'),
  logo('claude-icon', 'Claude', true),
  logo('openai-icon', 'OpenAI', true),
  logo('github-copilot', 'Copilot', true),
  logo('google-gemini', 'Gemini'),
  cat('Your own data'),
  chip('Spreadsheets', FileSpreadsheet),
  chip('Databases', Database),
  chip('APIs and files', Network),
];

function Cell({ item }: { item: Item }) {
  if (item.kind === 'cat') {
    return (
      <li className="flex shrink-0 items-center gap-2 pl-5 pr-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        <span className="size-2 rotate-45 rounded-[2px] bg-logo-teal" />
        {item.label}
      </li>
    );
  }
  if (item.kind === 'chip') {
    const I = item.icon;
    return (
      <li className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
        <I size={18} className="text-brand" />
        <span className="text-[13px] font-semibold text-slate-600">{item.label}</span>
      </li>
    );
  }
  const l = brandLogos[item.key];
  const h = l.w / l.h > 2.2 ? 20 : 28; // wordmarks sit a little shorter than square marks
  return (
    <li className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
      <svg
        role="img"
        aria-label={item.name}
        viewBox={`0 0 ${l.w} ${l.h}`}
        style={{ height: h, width: (h * l.w) / l.h }}
        className="shrink-0 opacity-70 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        dangerouslySetInnerHTML={{ __html: l.body }}
      />
      {item.showName && <span className="text-[13px] font-semibold text-slate-600 group-hover:text-foreground">{item.name}</span>}
    </li>
  );
}

function Row({ items, reverse, speed }: { items: Item[]; reverse?: boolean; speed: number }) {
  return (
    <div className={cn('marquee -my-3 overflow-hidden py-3', reverse && 'rev')} style={{ ['--speed' as string]: `${speed}s` }}>
      <ul className="marquee-track dock m-0 flex w-max list-none items-center gap-3 p-0">
        {[...items, ...items].map((it, i) => (
          <Cell key={`${it.kind}-${i}`} item={it} />
        ))}
      </ul>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative border-y border-border bg-white/80 py-8">
      <Container>
        <Reveal className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">Works with the stack you already run</p>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">ERP and supply chain systems, data platforms, analytics tools and the AI agents your team uses. Start from files or read-only access.</p>
        </Reveal>
      </Container>
      <div className="grid gap-3">
        <Row items={rowA} speed={70} />
        <Row items={rowB} reverse speed={58} />
      </div>
      <Container>
        <p className="mt-5 text-xs text-muted-foreground">Example systems and agents that can take part when configured and authorized. Logos are trademarks of their owners and do not imply endorsement.</p>
      </Container>
    </div>
  );
}
