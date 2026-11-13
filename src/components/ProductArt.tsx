import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsRight, CloudRain, Clock, Database, FileDown, FileText, Home, LineChart,
  Boxes, ClipboardList, Cpu, FileSpreadsheet, Layers, Mic, Network, Package, PackageSearch, ReceiptText, Server, ShieldCheck, ThumbsUp, Truck, Workflow, X,
} from 'lucide-react';

/*
 * Composed product views.
 * These redraw the Kimaru pages at the same layout as the real screens, with the sensitive details left out:
 * no part names or numbers, no source or vendor names, no record IDs and no internal wording.
 * Each view is drawn on a fixed canvas and scaled to fit, so proportions stay the same at any size.
 */

const base = import.meta.env.BASE_URL;
const mark = `${base}favicon.svg`;

/** Draws children on a fixed w x h canvas and scales it to the width of its container. */
export function ScaledArt({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setK(el.clientWidth / w);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-white" style={{ height: h * k }} role="img" aria-label="Kimaru screen, illustrative">
      <div className="absolute left-0 top-0 origin-top-left text-slate-900" style={{ width: w, height: h, transform: `scale(${k})` }}>
        {children}
      </div>
    </div>
  );
}

/* ---------- Shared pieces ---------- */

function Rail() {
  return (
    <div className="absolute inset-y-0 left-0 w-[41px] border-r border-slate-200 bg-white">
      <img src={mark} alt="" className="absolute left-[11px] top-[14px] size-[20px]" />
      <Home size={19} className="absolute left-[11px] top-[66px] text-slate-700" />
      <LineChart size={19} className="absolute left-[11px] top-[110px] text-slate-700" />
      <Network size={19} className="absolute left-[11px] top-[154px] text-slate-700" />
    </div>
  );
}

function BtnAccept({ on }: { on?: boolean }) {
  return (
    <span className={`grid size-[40px] place-items-center rounded-[8px] ${on ? 'bg-slate-950 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>
      <ThumbsUp size={19} />
    </span>
  );
}
function BtnAgent() {
  return (
    <span className="grid size-[40px] place-items-center rounded-[8px] border-2 border-violet-600 bg-white shadow-[0_0_0_4px_rgb(124_58_237/0.14)]">
      <img src={mark} alt="" className="size-[20px]" />
    </span>
  );
}
function BtnDefer() {
  return (
    <span className="grid size-[40px] place-items-center rounded-[8px] bg-slate-100 text-slate-700">
      <Clock size={19} />
    </span>
  );
}
function BtnDark({ children, w }: { children: ReactNode; w?: number }) {
  return (
    <span className="inline-flex h-[40px] items-center justify-center gap-[8px] rounded-[8px] bg-slate-950 px-[18px] text-[17px] font-semibold text-white" style={w ? { width: w } : undefined}>
      {children}
    </span>
  );
}

/* ---------- Work Hub (1440 x 651) ---------- */

function AlertCard({ top, title, dim }: { top: number; title: string; dim?: boolean }) {
  return (
    <div className="absolute rounded-[10px] border border-slate-200 bg-white shadow-sm" style={{ left: 459, top, width: 931, height: 244, opacity: dim ? 0.85 : 1 }}>
      <div className="flex h-[50px] items-center border-b border-slate-200 bg-slate-50 px-[24px] text-[24px] font-semibold">{title}</div>
      <div className="absolute left-[24px] top-[68px] flex gap-[14px]">
        <CloudRain size={30} className="mt-[2px] text-sky-600" />
        <div className="text-[19px] leading-[28px]">
          <p className="font-semibold">Shipping disruption</p>
          <p className="text-slate-600">Impact: <span className="text-slate-900">Late shipments</span></p>
          <p className="text-slate-600">Duration: <span className="text-slate-900">Next 5 days</span></p>
          <p className="text-slate-600">Confidence: <span className="text-slate-900">92%</span></p>
        </div>
      </div>
      <div className="absolute top-[68px]" style={{ left: 345, width: 255 }}>
        <p className="text-[19px] font-semibold leading-[26px]">Components affected by the delay</p>
        {[['5 days', 62], ['10 days', 78], ['15 days', 92]].map(([d, wd]) => (
          <div key={d as string} className="mt-[12px] flex items-center gap-[10px]">
            <span className="size-[24px] shrink-0 rounded-[6px] bg-slate-200" />
            <span className="h-[10px] rounded-full bg-slate-300" style={{ width: (wd as number) * 1.2 }} />
            <span className="ml-auto text-[16px] text-slate-600">{d}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-[64px]" style={{ left: 649, width: 262 }}>
        <p className="text-[19px] leading-[26px]">Review 7 recommendations to decrease order fulfillment risk by 96%</p>
        <div className="mt-[14px] flex items-center gap-[12px]">
          <BtnDark w={104}>Review</BtnDark>
          <BtnAgent />
          <BtnDefer />
        </div>
      </div>
    </div>
  );
}

export function HubArt() {
  return (
    <>
      <Rail />
      <p className="absolute left-[65px] top-[10px] text-[30px] font-semibold">Good Morning</p>
      <div className="absolute rounded-[10px] border border-slate-200 bg-white" style={{ left: 66, top: 65, width: 1346, height: 640 }}>
        <div className="absolute left-[14px] top-[14px] text-[24px] font-semibold">My Tasks</div>
        <div className="absolute left-[11px] top-[56px] flex h-[40px] items-center justify-between rounded-[8px] bg-slate-100 px-[12px]" style={{ width: 341 }}>
          <span className="text-[18px]">Manufacturing alerts, 4 alerts</span>
          <span className="flex items-center gap-[10px]">
            <span className="grid size-[28px] place-items-center rounded-full bg-slate-950 text-[15px] font-semibold text-white">4</span>
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="absolute left-[371px] top-[0px] h-full border-l border-slate-200" />
        <p className="absolute top-[26px] text-[25px] font-semibold" style={{ left: 399 }}>24 recommendations</p>
        <div className="absolute right-[24px] top-[22px] flex gap-[8px] text-[17px] font-medium text-slate-500">
          <span className="px-[12px] py-[6px]">Product</span>
          <span className="rounded-[8px] bg-slate-100 px-[12px] py-[6px] text-slate-900">Site</span>
          <span className="px-[12px] py-[6px]">Order</span>
        </div>
      </div>
      <AlertCard top={149} title="Shipping disruption alert" />
      <AlertCard top={402} title="Supplier delay alert" dim />
    </>
  );
}

/* ---------- Recommendations (1440 x 745) and expanded row (1440 x 872) ---------- */

const rowNames = ['Component group A', 'Component group B', 'Component group C', 'Component group D', 'Component group E', 'Component group F', 'Component group G'];
const rowRisk = [70, 70, 69, 68, 67, 25, 22];
const rowConf = [94, 94, 82, 91, 90, 88, 85];
const cover = [[46, 80], [52, 70], [50, 56], [58, 66], [64, 80], [92, 40], [88, 44]];

function RecsTable({ expanded, top }: { expanded?: boolean; top: number }) {
  const rows = rowNames.map((_, i) => i);
  let y = top + 58;
  return (
    <>
      <div className="absolute rounded-[10px] border border-slate-200 bg-white" style={{ left: 66, top, width: 1348, height: 58 + 7 * 49 + 52 + (expanded ? 128 : 0) }} />
      <div className="absolute flex items-center text-[19px] font-semibold" style={{ left: 66, top: top + 12, width: 1348, height: 42 }}>
        <ChevronsRight size={20} className="ml-[14px] text-slate-600" />
        <span className="absolute" style={{ left: 69 }}>Recommendations</span>
        <span className="absolute" style={{ left: 330 }}>Component</span>
        <span className="absolute" style={{ left: 553 }}>Stock against backlog</span>
        <span className="absolute" style={{ left: 790 }}>Order fulfillment risk</span>
        <span className="absolute" style={{ left: 1005 }}>Confidence</span>
        <span className="absolute" style={{ left: 1150 }}>Actions</span>
      </div>
      {rows.map((i) => {
        const rowTop = y;
        y += 49;
        const open = expanded && i === 0;
        if (open) y += 128;
        return (
          <div key={i}>
            <div className="absolute flex items-center border-t border-slate-200 text-[19px]" style={{ left: 66, top: rowTop, width: 1348, height: 49, background: open ? '#f1f5f9' : undefined }}>
              {open ? <ChevronDown size={20} className="ml-[14px] text-slate-700" /> : <ChevronRight size={20} className="ml-[14px] text-slate-600" />}
              <span className="absolute" style={{ left: 69 }}>1 Recommendation</span>
              <span className="absolute flex items-center gap-[10px]" style={{ left: 330 }}>
                <span className="grid size-[28px] place-items-center rounded-[6px] bg-slate-200"><Package size={16} className="text-slate-500" /></span>
                <span>{rowNames[i]}</span>
              </span>
              <span className="absolute flex flex-col gap-[5px]" style={{ left: 553, width: 170 }}>
                <span className="h-[8px] rounded-full bg-sky-200" style={{ width: cover[i][0] * 1.7 }} />
                <span className="h-[8px] rounded-full bg-slate-300" style={{ width: cover[i][1] * 1.7 }} />
              </span>
              <span className={`absolute flex items-center gap-[6px] ${i < 2 ? 'text-orange-600' : ''}`} style={{ left: 790 }}>
                {i < 2 && <AlertTriangle size={17} />}
                {rowRisk[i]}%
              </span>
              <span className="absolute" style={{ left: 1005 }}>{rowConf[i]}%</span>
              <span className="absolute flex items-center gap-[8px]" style={{ left: 1150, top: 5 }}>
                <BtnAgent />
                <BtnDefer />
              </span>
            </div>
            {open && (
              <div className="absolute border-t border-slate-200 bg-slate-50" style={{ left: 66, top: rowTop + 49, width: 1348, height: 128 }}>
                <div className="absolute rounded-[6px] border border-slate-200 bg-white" style={{ left: 120, top: 18, width: 1180, height: 94 }}>
                  <div className="flex h-[40px] items-center border-b border-slate-200 text-[16px] font-semibold">
                    <span className="absolute left-[14px]">Recommendation</span>
                    <span className="absolute" style={{ left: 640 }}>Predicted outcome</span>
                    <span className="absolute" style={{ left: 1010 }}>Actions</span>
                  </div>
                  <div className="absolute flex items-center text-[18px]" style={{ left: 14, top: 44, height: 44 }}>Expedite the order by switching to a faster carrier.</div>
                  <div className="absolute flex items-center gap-[8px] text-[18px]" style={{ left: 640, top: 44, height: 44 }}>
                    <Package size={18} className="text-emerald-600" /> Prevent stockout
                  </div>
                  <div className="absolute flex items-center gap-[8px]" style={{ left: 1010, top: 42 }}>
                    <BtnAccept on />
                    <BtnAgent />
                    <BtnDefer />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <p className="absolute text-[17px] text-slate-600" style={{ right: 60, top: top + 58 + 7 * 49 + (expanded ? 128 : 0) + 14 }}>Rows per page 10 · 1-7 of 7</p>
    </>
  );
}

function TopBar({ left, steps, cta }: { left: string; steps: ReactNode; cta: string }) {
  return (
    <>
      <div className="absolute inset-x-[41px] top-0 h-[47px] border-b border-slate-200 bg-white" />
      <span className="absolute left-[56px] top-[12px] flex items-center gap-[6px] text-[18px] font-medium"><ChevronLeft size={19} /> {left}</span>
      <div className="absolute left-[560px] top-[11px] flex items-center gap-[10px] text-[17px]">{steps}</div>
      <span className="absolute right-0 top-0 flex h-[47px] items-center justify-center gap-[8px] whitespace-nowrap bg-slate-900 text-[18px] font-semibold text-white" style={{ width: 330 }}>{cta} <ChevronRight size={18} /></span>
    </>
  );
}

function Step({ n, label, done, on }: { n: number; label: string; done?: boolean; on?: boolean }) {
  return (
    <span className={`flex items-center gap-[8px] ${on || done ? 'font-semibold text-slate-900' : 'text-slate-400'}`}>
      <span className={`grid size-[26px] place-items-center rounded-full border-2 text-[14px] ${done ? 'border-slate-950 bg-slate-950 text-white' : on ? 'border-slate-500' : 'border-slate-300'}`}>
        {done ? <Check size={14} /> : n}
      </span>
      {label}
    </span>
  );
}

function RecsHeader() {
  return (
    <div className="absolute rounded-[10px] border border-slate-200 bg-white" style={{ left: 66, top: 80, width: 1348, height: 170 }}>
      <div className="flex h-[48px] items-center border-b border-slate-200 bg-slate-50 px-[22px] text-[24px] font-semibold">Shipping disruption alert</div>
      <div className="absolute left-[22px] top-[62px] flex gap-[14px] text-[18px] leading-[27px]">
        <CloudRain size={28} className="mt-[2px] text-sky-600" />
        <div>
          <p className="font-semibold">Shipping disruption expected</p>
          <p className="text-slate-600">Expected impact: <span className="text-slate-900">Late inbound shipments</span></p>
          <p className="text-slate-600">Duration: Next 5 days · Confidence: 92%</p>
        </div>
      </div>
    </div>
  );
}

export function RecsArt({ expanded }: { expanded?: boolean }) {
  return (
    <>
      <Rail />
      <TopBar left="Back to Tasks" cta="Review Recommendations" steps={<><Step n={1} label="Decide" on /><span className="w-[40px] border-t border-slate-300" /><Step n={2} label="Review" /></>} />
      <RecsHeader />
      <RecsTable top={268} expanded={expanded} />
    </>
  );
}

/* ---------- Review (1440 x 775) ---------- */

const outs = [
  { icon: Database, t: 'Send to your ERP', b: 'Kimaru sends the accepted recommendations to your system.', on: true },
  { icon: FileDown, t: 'Download a file', b: 'Receive a CSV file to open in a spreadsheet.' },
  { icon: Workflow, t: 'Send to your workflow tool', b: 'Send recommendations into your workflows.' },
  { icon: FileText, t: 'Create a report', b: 'Generate a report for further analysis.' },
];

export function ActArt() {
  return (
    <>
      <Rail />
      <TopBar left="Decide on Recommendations" cta="Finalize Recommendations" steps={<><Step n={1} label="Decide" done /><span className="w-[40px] border-t border-slate-300" /><Step n={2} label="Review" on /></>} />
      <p className="absolute left-[66px] top-[58px] text-[28px] font-semibold">Review Recommendations</p>
      <p className="absolute left-[66px] top-[93px] text-[18px] text-slate-600">Please confirm the recommendation selections you have made.</p>
      <div className="absolute rounded-[10px] border border-slate-200 bg-white" style={{ left: 66, top: 129, width: 1348, height: 358 }}>
        <div className="absolute border-r border-slate-200" style={{ left: 0, top: 0, width: 366, height: 358 }}>
          {[['Accepted', 1, true], ['Adjusted', 0, false], ['Deferred', 0, false]].map(([t, c, on], i) => (
            <div key={t as string} className={`absolute flex h-[48px] items-center justify-between rounded-[8px] px-[16px] text-[19px] ${on ? 'bg-slate-200' : ''}`} style={{ left: 12, top: 12 + i * 56, width: 342 }}>
              <span>{t}</span>
              <span className="flex items-center gap-[12px]">
                <span className={`grid size-[28px] place-items-center rounded-full text-[15px] ${on ? 'bg-slate-950 text-white' : 'bg-slate-100'}`}>{c as number}</span>
                <ChevronRight size={17} className="text-slate-500" />
              </span>
            </div>
          ))}
        </div>
        <p className="absolute flex items-center gap-[10px] text-[24px] font-semibold" style={{ left: 392, top: 20 }}><ThumbsUp size={22} /> Accepted Recommendations</p>
        <p className="absolute flex items-center gap-[12px] text-[19px]" style={{ left: 394, top: 72 }}><Check size={20} /> Expedite the order by switching to a faster carrier.</p>
      </div>
      <p className="absolute left-[66px] top-[510px] text-[24px] font-semibold">Choose how to process the recommendations</p>
      {outs.map(({ icon: I, t, b, on }, n) => (
        <div key={t} className="absolute flex items-center rounded-[8px] border border-slate-200 bg-white" style={{ left: 66 + (n % 2) * 684, top: 552 + Math.floor(n / 2) * 114, width: 664, height: 96 }}>
          <span className="grid h-full w-[56px] place-items-center rounded-l-[8px] bg-slate-50">
            <span className={`size-[22px] rounded-full border-2 ${on ? 'border-slate-950 bg-white shadow-[inset_0_0_0_5px_#020617]' : 'border-slate-300 bg-white'}`} />
          </span>
          <div className="ml-[20px]">
            <p className="text-[20px] font-semibold">{t}</p>
            <p className="text-[16px] text-slate-600">{b}</p>
          </div>
          <I size={34} className="absolute right-[26px] text-slate-400" />
        </div>
      ))}
    </>
  );
}

/* ---------- Agent drawer (1440 x 900) ---------- */

const chain = [
  ['Shipping disruption', 'inbound shipments are delayed by roughly three weeks.'],
  ['Delay', 'stock runs down faster than planned.'],
  ['Days of cover', 'fall below the safety threshold.'],
  ['Recommended plan', 'dispatch now to prevent a stockout before the delayed shipment arrives.'],
];

export function AgentArt() {
  return (
    <>
      <div className="absolute inset-0 opacity-60 blur-[3px]" aria-hidden="true">
        <RecsArt />
      </div>
      <div className="absolute inset-y-0 right-0 border-l border-violet-200 bg-slate-50 shadow-[-24px_0_60px_-30px_rgb(76_29_149/0.4)]" style={{ width: 576 }}>
        <div className="h-[5px] bg-[linear-gradient(90deg,#0284c7,#5eead4,#6d28d9,#4f46e5)]" />
        <div className="flex items-center justify-between px-[22px] pt-[16px] text-[24px] font-semibold">
          <span>kimaru.ai Agent Interaction</span>
          <X size={22} />
        </div>
        <div className="mx-[16px] mt-[16px] rounded-[10px] border border-slate-200 bg-white px-[16px] py-[14px]">
          <p className="text-[20px] font-semibold">Recommendation Summary</p>
          <p className="mt-[6px] text-[16px] text-slate-600">Component group A</p>
        </div>
        <div className="mx-[22px] mt-[26px] flex items-center gap-[14px] rounded-[10px] border border-slate-200 bg-white px-[16px] py-[14px] text-[21px]">
          <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-slate-200 text-[15px] font-semibold text-slate-600">You</span>
          Why this option, and what else could we do?
        </div>
        <div className="mx-[22px] mt-[18px] rounded-[10px] border border-slate-200 bg-slate-100 px-[22px] py-[20px]">
          <div className="flex gap-[14px]">
            <img src={mark} alt="" className="mt-[2px] size-[26px]" />
            <div className="text-[19px] leading-[28px]">
              <p className="font-bold">Why this plan was recommended</p>
              <p className="mt-[8px] font-semibold">Kimaru traced the chain behind it:</p>
              <ol className="m-0 mt-[8px] list-none p-0">
                {chain.map(([a, b], n) => (
                  <li key={a} className="mb-[4px]"><span className="text-slate-500">{n + 1}.</span> <b>{a}</b> <ArrowRight size={14} className="inline text-slate-500" /> {b}</li>
                ))}
              </ol>
              <p className="mt-[8px] text-slate-700">The plan favours the fastest-moving items and restores enough cover until the delayed shipment arrives.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-[22px] bottom-[20px] h-[96px] rounded-[10px] border border-slate-200 bg-white">
          <Mic size={20} className="absolute bottom-[18px] left-[18px] text-slate-700" />
          <span className="absolute left-[56px] top-[18px] text-[17px] text-slate-400">Ask kimaru.ai a question or tell it what to do...</span>
          <span className="absolute bottom-[14px] right-[14px] grid size-[34px] place-items-center rounded-full bg-slate-400 text-white"><ArrowRight size={17} /></span>
        </div>
      </div>
    </>
  );
}

/* ---------- Decision models (1440 x 760) ---------- */

const models = [
  { icon: Truck, t: 'Production commitment', q: 'Which builds run next?', s: 'Live', m: 82 },
  { icon: Package, t: 'Material readiness', q: 'Is every kit ready to build?', s: 'Live', m: 68 },
  { icon: Boxes, t: 'Inventory and allocation', q: 'Where should scarce stock go?', s: 'In design', m: 54 },
  { icon: PackageSearch, t: 'Supplier, BOM and cost', q: 'Which exception needs action?', s: 'In design', m: 46 },
  { icon: ClipboardList, t: 'Order prioritization', q: 'Which order first?', s: 'Planned', m: 30 },
  { icon: ReceiptText, t: 'Invoice exceptions', q: 'Which one to resolve now?', s: 'Planned', m: 24 },
];

export function ModelsArt() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#f8fafc,#eef2ff)]" />
      <p className="absolute left-[56px] top-[40px] text-[34px] font-semibold">Decision models</p>
      <p className="absolute left-[56px] top-[88px] text-[20px] text-slate-600">One application per recurring decision, each with its own rules, options and outcome measures.</p>
      {models.map(({ icon: I, t, q, s: st, m }, n) => {
        const x = 56 + (n % 3) * 452;
        const y = 150 + Math.floor(n / 3) * 290;
        const live = st === 'Live';
        return (
          <div key={t} className={'absolute rounded-[16px] border bg-white ' + (n === 0 ? 'border-violet-500 shadow-[0_18px_44px_-18px_rgb(91_33_182/0.5)]' : 'border-slate-200 shadow-sm')} style={{ left: x, top: y, width: 424, height: 262 }}>
            <span className={'absolute left-[26px] top-[26px] grid size-[56px] place-items-center rounded-[14px] ' + (live ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600')}><I size={28} /></span>
            <span className={'absolute right-[24px] top-[32px] rounded-full px-[14px] py-[5px] text-[16px] font-semibold ' + (live ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-500')}>{st}</span>
            <p className="absolute left-[26px] top-[108px] text-[25px] font-semibold">{t}</p>
            <p className="absolute left-[26px] top-[148px] text-[19px] text-slate-600">{q}</p>
            <div className="absolute left-[26px] right-[26px] top-[206px]">
              <div className="h-[9px] rounded-full bg-slate-100"><div className={'h-full rounded-full ' + (live ? 'bg-teal-600' : 'bg-slate-300')} style={{ width: m + '%' }} /></div>
              <p className="mt-[8px] text-[15px] text-slate-500">{live ? 'Outcome measured against baseline' : st === 'In design' ? 'Rules and options being mapped' : 'Next in line'}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ---------- Works with your stack (1440 x 760) ---------- */

const sources = [
  { icon: Server, t: 'ERP' },
  { icon: Truck, t: 'SCM, WMS, TMS' },
  { icon: FileSpreadsheet, t: 'Spreadsheets and files' },
  { icon: Database, t: 'Databases and APIs' },
  { icon: Layers, t: 'Planner know-how' },
];

export function StackArt() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#f8fafc,#eef2ff)]" />
      <p className="absolute left-[56px] top-[40px] text-[34px] font-semibold">Works with what you already run</p>
      <p className="absolute left-[56px] top-[88px] text-[20px] text-slate-600">Start from files or read-only access. Nothing is written back to begin.</p>
      <svg className="absolute inset-0" width="1440" height="760" fill="none" aria-hidden="true">
        {sources.map((_, n) => (
          <path key={n} d={'M430 ' + (199 + n * 104) + ' C 540 ' + (199 + n * 104) + ', 540 440, 600 440'} stroke="#6366f1" strokeOpacity=".45" strokeWidth="2.4" strokeDasharray="6 7" />
        ))}
        <path d="M840 440 C 920 440, 940 339, 1010 339" stroke="#0f766e" strokeOpacity=".6" strokeWidth="2.4" strokeDasharray="6 7" />
        <path d="M840 440 C 920 440, 940 539, 1010 539" stroke="#0f766e" strokeOpacity=".6" strokeWidth="2.4" strokeDasharray="6 7" />
      </svg>
      {sources.map(({ icon: I, t }, n) => (
        <div key={t} className="absolute flex items-center gap-[16px] rounded-[14px] border border-slate-200 bg-white px-[20px] shadow-sm" style={{ left: 56, top: 160 + n * 104, width: 374, height: 78 }}>
          <span className="grid size-[44px] place-items-center rounded-[12px] bg-slate-100 text-slate-700"><I size={24} /></span>
          <span className="text-[22px] font-semibold">{t}</span>
        </div>
      ))}
      <div className="absolute grid place-items-center rounded-[22px] border-2 border-violet-500 bg-white shadow-[0_26px_60px_-24px_rgb(91_33_182/0.55)]" style={{ left: 600, top: 330, width: 240, height: 220 }}>
        <div className="text-center">
          <img src={mark} alt="" className="mx-auto size-[56px]" />
          <p className="mt-[12px] text-[26px] font-semibold">Kimaru</p>
          <p className="text-[16px] text-slate-500">Read-only to start</p>
        </div>
      </div>
      {[{ icon: Cpu, t: 'AI assistants', y: 300 }, { icon: ShieldCheck, t: 'Approved action', y: 500 }].map(({ icon: I, t, y }) => (
        <div key={t} className="absolute flex items-center gap-[16px] rounded-[14px] border border-teal-300 bg-white px-[20px] shadow-sm" style={{ left: 1010, top: y, width: 374, height: 78 }}>
          <span className="grid size-[44px] place-items-center rounded-[12px] bg-teal-50 text-teal-700"><I size={24} /></span>
          <span className="text-[22px] font-semibold">{t}</span>
        </div>
      ))}
    </>
  );
}

/* ---------- Generic decision map (1440 x 840) ---------- */

type CNode = { id: string; t: string; col: 0 | 1 | 2; y: number };
const NW = 250;
const NH = 66;
const COLX = [48, 400, 752];
const cnodes: CNode[] = [
  { id: 'supplier', t: 'Supplier mix', col: 0, y: 108 },
  { id: 'stock', t: 'Safety stock', col: 0, y: 196 },
  { id: 'maint', t: 'Maintenance plan', col: 0, y: 284 },
  { id: 'sched', t: 'Schedule sequencing', col: 0, y: 372 },
  { id: 'demand', t: 'Demand swing', col: 0, y: 520 },
  { id: 'port', t: 'Port delay', col: 0, y: 608 },
  { id: 'tariff', t: 'Tariff change', col: 0, y: 696 },
  { id: 'avail', t: 'Component availability', col: 1, y: 136 },
  { id: 'util', t: 'Line utilisation', col: 1, y: 260 },
  { id: 'qual', t: 'Incoming quality', col: 1, y: 384 },
  { id: 'risk', t: 'Order risk', col: 1, y: 508 },
  { id: 'otd', t: 'On-time delivery', col: 2, y: 190 },
  { id: 'cost', t: 'Cost per unit', col: 2, y: 360 },
  { id: 'fpy', t: 'First pass yield', col: 2, y: 530 },
];
// from, to, strength 0 to 1, helps the target (true) or works against it (false)
const clinks: Array<[string, string, number, boolean]> = [
  ['supplier', 'avail', 0.82, true], ['supplier', 'qual', 0.74, true],
  ['stock', 'avail', 0.71, true], ['stock', 'risk', 0.64, false],
  ['maint', 'util', 0.66, true],
  ['sched', 'util', 0.78, true], ['sched', 'risk', 0.58, false],
  ['demand', 'risk', 0.69, true], ['port', 'avail', 0.61, false], ['tariff', 'avail', 0.4, false],
  ['avail', 'otd', 0.82, true], ['avail', 'cost', 0.35, true],
  ['util', 'otd', 0.88, true], ['util', 'fpy', 0.52, false],
  ['qual', 'fpy', 0.93, true], ['qual', 'otd', 0.72, true],
  ['risk', 'otd', 0.94, false], ['risk', 'cost', 0.78, false],
];
const SEL = 'risk';

export function CddArt() {
  const byId = Object.fromEntries(cnodes.map((n) => [n.id, n]));
  const related = new Set<string>([SEL]);
  clinks.forEach(([a, b]) => { if (a === SEL || b === SEL) { related.add(a); related.add(b); } });
  const pos = (n: CNode, side: 'l' | 'r') => [COLX[n.col] + (side === 'r' ? NW : 0), n.y + NH / 2] as const;
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#fbfcff,#f1f5ff)]" />
      <p className="absolute text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500" style={{ left: COLX[0], top: 62 }}>Levers you control</p>
      <p className="absolute text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500" style={{ left: COLX[0], top: 470 }}>Outside factors</p>
      <p className="absolute text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500" style={{ left: COLX[1], top: 62 }}>What they change</p>
      <p className="absolute text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500" style={{ left: COLX[2], top: 62 }}>Outcomes</p>
      <div className="absolute left-[1016px] top-[0px] h-full border-l border-slate-200" />
      <svg className="absolute inset-0" width="1440" height="840" fill="none" aria-hidden="true">
        {clinks.map(([a, b, w, up], i) => {
          const A = byId[a], B = byId[b];
          const [x1, y1] = pos(A, 'r'), [x2, y2] = pos(B, 'l');
          const on = a === SEL || b === SEL;
          const mx = (x1 + x2) / 2;
          return (
            <path
              key={i}
              d={'M' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2}
              stroke={up ? '#0f766e' : '#dc2626'}
              strokeOpacity={on ? 0.85 : 0.2}
              strokeWidth={1.5 + w * (on ? 7 : 4)}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {clinks.filter(([a, b]) => a === SEL || b === SEL).map(([a, b, w, up], i) => {
        const A = byId[a], B = byId[b];
        const [x1, y1] = pos(A, 'r'), [x2, y2] = pos(B, 'l');
        return (
          <span key={i} className={'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white px-[10px] py-[3px] text-[16px] font-bold shadow-sm ' + (up ? 'border-teal-600 text-teal-700' : 'border-red-500 text-red-600')} style={{ left: (x1 + x2) / 2, top: (y1 + y2) / 2 }}>
            {w.toFixed(2)}
          </span>
        );
      })}
      {cnodes.map((n) => {
        const sel = n.id === SEL;
        const rel = related.has(n.id);
        return (
          <div
            key={n.id}
            className={'absolute flex items-center gap-[12px] rounded-[12px] border-2 bg-white px-[16px] ' + (sel ? 'border-slate-900 shadow-[0_14px_36px_-14px_rgb(15_23_42/0.55)]' : rel ? 'border-teal-600' : 'border-slate-200')}
            style={{ left: COLX[n.col], top: n.y, width: NW, height: NH, opacity: rel ? 1 : 0.55 }}
          >
            <span className={'size-[11px] shrink-0 rounded-full ' + (n.col === 2 ? 'bg-teal-600' : n.col === 1 ? 'bg-violet-500' : 'bg-sky-500')} />
            <span className="text-[21px] font-semibold leading-tight">{n.t}</span>
          </div>
        );
      })}
      <div className="absolute" style={{ left: 1052, top: 62, width: 340 }}>
        <p className="text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500">Selected</p>
        <p className="mt-[8px] text-[30px] font-bold leading-tight">Order risk</p>
        <p className="mt-[6px] text-[18px] leading-snug text-slate-600">Chance that confirmed orders miss their ship date.</p>
        <p className="mt-[34px] text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500">Impact on outcomes</p>
        {[['On-time delivery', 0.94, 96], ['Cost per unit', 0.78, 92]].map(([t, w, c]) => (
          <div key={t as string} className="mt-[18px]">
            <div className="flex items-baseline justify-between text-[20px] font-semibold">
              <span>{t}</span>
              <span className="text-[22px] font-bold">{(w as number).toFixed(2)}</span>
            </div>
            <div className="mt-[8px] h-[12px] rounded-full bg-slate-100"><div className="h-full rounded-full bg-red-500" style={{ width: (w as number) * 100 + '%' }} /></div>
            <p className="mt-[6px] text-[16px] text-slate-500">{c}% sure · lowers the outcome</p>
          </div>
        ))}
        <p className="mt-[40px] text-[17px] font-semibold uppercase tracking-[0.1em] text-slate-500">Driven by</p>
        {[['Demand swing', 0.69], ['Safety stock', 0.64], ['Schedule sequencing', 0.58]].map(([t, w]) => (
          <div key={t as string} className="mt-[14px] flex items-center justify-between rounded-[10px] border border-slate-200 bg-white px-[14px] py-[10px] text-[19px] font-medium">
            <span>{t}</span>
            <span className="font-bold">{(w as number).toFixed(2)}</span>
          </div>
        ))}
        <p className="mt-[34px] text-[15px] leading-snug text-slate-500">Strength of influence, 0 to 1. Line thickness shows strength. Teal raises the item it points to, red lowers it. Illustrative values.</p>
      </div>
    </>
  );
}

/** Product views that replace real screenshots. Keys match the screenshot path they stand in for. */
export const ART: Record<string, { w: number; h: number; node: ReactNode }> = {
  'screens/uc-cdd-select.png': { w: 1440, h: 840, node: <CddArt /> },
  'screens/uc-cdd-weights.png': { w: 1440, h: 840, node: <CddArt /> },
  'art:models': { w: 1440, h: 760, node: <ModelsArt /> },
  'art:stack': { w: 1440, h: 760, node: <StackArt /> },
};
