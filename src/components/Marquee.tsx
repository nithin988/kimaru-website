import { brandLogos } from '../data/brandLogos';
import { Container, cn } from './ui';
import { Reveal } from './motion';

type Item = { key: keyof typeof brandLogos; name: string; showName?: boolean };

// Example systems and agents that can take part when configured and authorized.
const systems: Item[] = [
  { key: 'sap', name: 'SAP' },
  { key: 'oracle', name: 'Oracle' },
  { key: 'microsoft', name: 'Microsoft' },
  { key: 'salesforce', name: 'Salesforce' },
  { key: 'aws', name: 'AWS' },
  { key: 'microsoft-azure', name: 'Azure', showName: true },
  { key: 'google-cloud', name: 'Google Cloud', showName: true },
  { key: 'snowflake', name: 'Snowflake' },
  { key: 'databricks', name: 'Databricks' },
  { key: 'postgresql', name: 'PostgreSQL', showName: true },
  { key: 'mongodb', name: 'MongoDB' },
  { key: 'microsoft-power-bi', name: 'Power BI', showName: true },
  { key: 'tableau-icon', name: 'Tableau', showName: true },
  { key: 'kafka-icon', name: 'Kafka', showName: true },
];
const agents: Item[] = [
  { key: 'claude-icon', name: 'Claude', showName: true },
  { key: 'openai-icon', name: 'OpenAI', showName: true },
  { key: 'github-copilot', name: 'Copilot', showName: true },
  { key: 'microsoft-teams', name: 'Teams', showName: true },
  { key: 'slack-icon', name: 'Slack', showName: true },
  { key: 'jira', name: 'Jira', showName: true },
  { key: 'hubspot', name: 'HubSpot' },
  { key: 'zapier', name: 'Zapier' },
  { key: 'shopify', name: 'Shopify', showName: true },
  { key: 'looker', name: 'Looker' },
];

function Logo({ item }: { item: Item }) {
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
      <ul className="marquee-track dock m-0 flex w-max list-none gap-3 p-0">
        {[...items, ...items].map((it, i) => (
          <Logo key={`${it.key}-${i}`} item={it} />
        ))}
      </ul>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative border-y border-border bg-white/80 py-8">
      <Container>
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">Works with the systems and AI tools you already run</p>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">ERP, supply chain, data platforms, spreadsheets and the agents your team already uses. Start from files or read-only access.</p>
          </div>
        </Reveal>
      </Container>
      <div className="grid gap-3">
        <Row items={systems} speed={55} />
        <Row items={agents} reverse speed={48} />
      </div>
      <Container>
        <p className="mt-5 text-xs text-muted-foreground">Example systems and agents that can take part when configured and authorized. Logos are trademarks of their owners and do not imply endorsement.</p>
      </Container>
    </div>
  );
}
