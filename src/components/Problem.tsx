import { AlertTriangle, FileSpreadsheet, FileX, UserX } from 'lucide-react';
import { Section, SectionHead, cn, useInView } from './ui';

type Step = { label: string; start: number; len: number; lost?: string; tone: 'slate' | 'red' | 'teal' };

// Axis is 4 days. Illustrative walk-through of one decision, not customer data.
const today: Step[] = [
  { label: 'Spot the shortage', start: 0, len: 0.35, tone: 'slate' },
  { label: 'Build a spreadsheet', start: 0.35, len: 0.85, tone: 'red', lost: 'Logic lives in one file' },
  { label: 'Email thread', start: 1.2, len: 1.0, tone: 'red', lost: 'No single owner' },
  { label: 'Meeting', start: 2.2, len: 0.8, tone: 'slate' },
  { label: 'Decide', start: 3.0, len: 1.0, tone: 'red', lost: 'Reasoning not written down' },
];
const kimaru: Step[] = [
  { label: 'Appears in Work Hub', start: 0, len: 0.18, tone: 'teal' },
  { label: 'Options compared', start: 0.18, len: 0.2, tone: 'teal' },
  { label: 'Owner approves', start: 0.38, len: 0.3, tone: 'teal' },
  { label: 'Result tracked', start: 0.68, len: 0.32, tone: 'teal' },
];

const toneCls = { slate: 'bg-slate-300 text-slate-800', red: 'bg-red-100 text-red-800 ring-1 ring-red-200', teal: 'bg-active text-white' };

function Lane({ title, badge, steps, good, legend }: { title: string; badge: string; steps: Step[]; good?: boolean; legend?: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn('lane rounded-xl border bg-card p-5 sm:p-6', good ? 'border-active' : 'border-border', seen && 'play')}>
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <span className={cn('ml-auto rounded-full px-3 py-1 text-[13px] font-semibold', good ? 'bg-teal-50 text-active' : 'bg-red-50 text-destructive')}>{badge}</span>
      </div>
      <div className="relative h-14">
        {steps.map((s) => (
          <div
            key={s.label}
            className={cn('bar absolute top-0 flex h-14 items-center overflow-hidden rounded-md px-2 text-[11px] font-semibold leading-tight sm:text-xs', toneCls[s.tone])}
            style={{ left: `${(s.start / 4) * 100}%`, width: `calc(${(s.len / 4) * 100}% - 3px)` }}
            title={s.label}
          >
            {!legend && <span className="line-clamp-3">{s.label}</span>}
          </div>
        ))}
      </div>
      {legend && (
        <ol className="m-0 mt-3 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 text-[13px] font-medium text-foreground">
          {steps.map((s, n) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-active text-[11px] font-bold text-white">{n + 1}</span>
              {s.label}
            </li>
          ))}
        </ol>
      )}
      <div className="mt-2 grid grid-cols-4 border-t border-dashed border-border pt-1.5 text-[11px] font-medium text-muted-foreground">
        {['Day 1', 'Day 2', 'Day 3', 'Day 4'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

const lost = [
  { icon: FileSpreadsheet, title: 'The logic lives in one file', body: 'The way the call gets made sits in a spreadsheet only one person understands.' },
  { icon: UserX, title: 'Nobody clearly owns it', body: 'Purchasing, sales and planning each hold a piece. The decision waits for a meeting.' },
  { icon: FileX, title: 'The reasoning disappears', body: 'Next quarter the same problem returns, and the company starts from zero.' },
];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHead
        eyebrow="The problem"
        title="Every company has a hard call it makes over and over."
        body="The answer lives in spreadsheets, inboxes, and one expert's head. When that person is out, the company starts over."
      />
      <div className="grid gap-4">
        <Lane title="Today" badge="About 4 days" steps={today} />
        <Lane title="With Kimaru" badge="Same day" steps={kimaru} good legend />
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <AlertTriangle size={12} /> Illustrative walk-through of one material-shortage decision. Timings vary by company.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {lost.map(({ icon: I, title, body }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 grid size-10 place-items-center rounded-[10px] bg-red-50 text-destructive">
              <I size={20} />
            </div>
            <h3 className="text-lg font-bold text-primary">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
