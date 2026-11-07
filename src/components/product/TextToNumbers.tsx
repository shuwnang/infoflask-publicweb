"use client";

import { useMemo, useState } from "react";
import { afterNewOrderAssumptions, applyPriceChange, baselineAssumptions, simulate, type Assumptions } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

type Change = { key: keyof Assumptions; label: string; reason: string; fmt: (v: number) => string };

type Example = {
  key: string;
  chip: string;
  /** 輸入框內容；以 [[ ]] 包住的片段為 AI 擷取到的關鍵資訊 */
  text: string;
  derive: (a: Assumptions) => Assumptions;
  changes: Change[];
};

const pct = (v: number) => fmtPct(v, 1);
const pctS = (v: number) => fmtPctSigned(v, 1);

const EXAMPLES: Example[] = [
  {
    key: "order",
    chip: "新客戶訂單",
    text: "主要客戶預計明年增加採購量，[[估計新增訂單約 9 億元]]，[[產品組合與現有相近]]。",
    derive: () => afterNewOrderAssumptions,
    changes: [
      { key: "revenueGrowth", label: "營收年增率", reason: "新增訂單 900 百萬元直接計入明年營收", fmt: pctS },
      { key: "grossMargin", label: "毛利率", reason: "產品組合相近，維持原假設", fmt: pct },
      { key: "opexRatio", label: "營業費用率", reason: "固定費用不變、營收擴大，費用率略降", fmt: pct },
    ],
  },
  {
    key: "yield",
    chip: "新產線良率",
    text: "法說會表示新產線已於第二季量產，[[良率達到目標]]，管理層預期[[毛利率可較去年提升約 2 個百分點]]。",
    derive: (a) => ({ ...a, grossMargin: a.grossMargin + 0.02 }),
    changes: [
      { key: "revenueGrowth", label: "營收年增率", reason: "資訊未提及營收，維持原假設", fmt: pctS },
      { key: "grossMargin", label: "毛利率", reason: "依管理層指引上調 2 個百分點", fmt: pct },
      { key: "opexRatio", label: "營業費用率", reason: "未受影響，維持原假設", fmt: pct },
    ],
  },
  {
    key: "price",
    chip: "售價調降",
    text: "面對同業競爭，公司規劃明年[[主力產品售價調降 5%]]，[[銷量預期持平]]，成本結構不變。",
    derive: (a) => applyPriceChange(a, -0.05),
    changes: [
      { key: "revenueGrowth", label: "營收年增率", reason: "銷量持平、售價 −5%，營收同步下修", fmt: pctS },
      { key: "grossMargin", label: "毛利率", reason: "成本不變、售價下降，毛利率被壓縮", fmt: pct },
      { key: "opexRatio", label: "營業費用率", reason: "費用金額不變、營收變小，費用率略升", fmt: pct },
    ],
  },
];

/** 把 [[ ]] 片段渲染成標記 */
function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\[\[.*?\]\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") ? (
          <mark key={i} className="rounded-[3px] bg-brand-100 px-0.5 text-ink">
            {p.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/**
 * 資訊財報化：一段文字研究資訊 → AI 轉換成財務假設 → 反映到營收成長與 EPS。
 * 三段式流程，切換範例即重算；數字由 lib/finance.ts 共用模型計算。
 */
export function TextToNumbers() {
  const [key, setKey] = useState<string>("yield");
  const ex = EXAMPLES.find((e) => e.key === key) ?? EXAMPLES[0];
  const base = useMemo(() => simulate(baselineAssumptions), []);
  const derived = useMemo(() => ex.derive(baselineAssumptions), [ex]);
  const after = useMemo(() => simulate(derived), [derived]);
  const epsDelta = after.eps / base.eps - 1;

  return (
    <div className="rounded-2xl border border-line bg-white shadow-float overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist px-5 py-3 text-[13px]">
        <span className="font-semibold text-ink">示意公司（虛構）・把一段研究資訊變成財務數字</span>
        <span className="text-ink-3">切換範例看不同資訊如何反映在財報上</span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1.15fr)_auto_minmax(0,1.2fr)_auto_minmax(0,0.95fr)] gap-4 md:gap-3 p-5">
        {/* ① 研究資訊輸入 */}
        <div>
          <Head n="1" title="輸入研究資訊" />
          <div className="flex flex-wrap gap-1.5 mb-2" role="tablist" aria-label="範例資訊">
            {EXAMPLES.map((e) => (
              <button
                key={e.key}
                type="button"
                role="tab"
                aria-selected={e.key === key}
                onClick={() => setKey(e.key)}
                className={`rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors ${
                  e.key === key ? "border-brand bg-brand-50 text-brand-700" : "border-line text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {e.chip}
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-line-strong bg-white p-3 text-[13.5px] leading-[1.75] text-ink min-h-[132px] shadow-[inset_0_1px_2px_rgba(11,41,63,.06)]" aria-label="研究資訊（示意）">
            <Highlighted key={ex.key} text={ex.text} />
            <span className="inline-block w-[2px] h-[1.1em] align-[-0.2em] ml-0.5 bg-brand-600 animate-pulse" aria-hidden="true" />
          </div>
          <p className="mt-2 text-[11.5px] text-ink-3">
            <mark className="rounded-[3px] bg-brand-100 px-0.5 text-ink">標記</mark> 為 AI 擷取到的關鍵資訊。示範版僅解讀上列範例。
          </p>
        </div>

        <Arrow />

        {/* ② AI 轉換成假設 */}
        <div>
          <Head n="2" title="AI 轉換成財務假設" />
          <ul className="space-y-2">
            {ex.changes.map((c) => {
              const from = baselineAssumptions[c.key];
              const to = derived[c.key];
              const changed = Math.abs(to - from) > 1e-9;
              return (
                <li key={c.key} className={`rounded-lg border p-3 ${changed ? "border-brand-200 bg-brand-50/50" : "border-line"}`}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-medium text-ink">{c.label}</span>
                    <span className="tnum text-[13px]">
                      <span className="text-ink-3">{c.fmt(from)}</span>
                      <span className="mx-1 text-ink-3" aria-hidden="true">
                        →
                      </span>
                      <span className={`font-semibold ${changed ? "text-brand-700" : "text-ink-2"}`}>{c.fmt(to)}</span>
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-snug text-ink-2">{c.reason}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <Arrow />

        {/* ③ 反映到財報 */}
        <div>
          <Head n="3" title="反映到模擬財報" />
          <div className="space-y-2">
            <Big label="營收年增率" from={pctS(baselineAssumptions.revenueGrowth)} to={pctS(derived.revenueGrowth)} changed={Math.abs(derived.revenueGrowth - baselineAssumptions.revenueGrowth) > 1e-9} up={derived.revenueGrowth >= baselineAssumptions.revenueGrowth} />
            <Big label="模擬營收（百萬元）" from={fmtM(base.revenue)} to={fmtM(after.revenue)} changed={Math.abs(after.revenue - base.revenue) > 0.5} up={after.revenue >= base.revenue} />
            <Big label="模擬 EPS（元）" from={fmtEps(base.eps)} to={fmtEps(after.eps)} sub={`${fmtPctSigned(epsDelta, 1)} vs 原預測`} changed={Math.abs(epsDelta) > 1e-6} up={epsDelta >= 0} strong />
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-mist px-5 py-3">
        <DemoTag text={demoDisclaimer} />
      </div>
    </div>
  );
}

function Head({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">{n}</span>
      <span className="text-[13px] font-semibold text-ink">{title}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:flex items-center justify-center pt-10 text-line-strong" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M4 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Big({ label, from, to, sub, changed, up, strong = false }: { label: string; from: string; to: string; sub?: string; changed: boolean; up: boolean; strong?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 ${strong ? "border-brand-200 bg-brand-50/50" : "border-line"}`}>
      <p className="text-[12px] text-ink-3">{label}</p>
      <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
        <span className={`tnum font-semibold leading-tight text-ink ${strong ? "text-[24px]" : "text-[19px]"}`}>{to}</span>
        <span className="tnum text-[12px] text-ink-3">原預測 {from}</span>
      </div>
      {sub && <p className={`mt-0.5 tnum text-[12px] ${!changed ? "text-ink-3" : up ? "text-brand-700" : "text-ink-2"}`}>{changed ? sub : "＝原預測"}</p>}
    </div>
  );
}
