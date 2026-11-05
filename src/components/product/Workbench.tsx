"use client";

import { useMemo, useState } from "react";
import { baselineAssumptions, demoCompany, knobRanges, quarterly, simulate, type Assumptions } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { KnobSlider } from "./KnobSlider";
import { StatementTable } from "./StatementTable";
import { TrendLines } from "@/components/charts/TrendLines";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

const TABS = [
  { key: "feap", label: "FEAP", sub: "查看資訊與假設" },
  { key: "assume", label: "Assumptions", sub: "調整重要財務變數" },
  { key: "predict", label: "Prediction", sub: "檢視模擬財務報表" },
] as const;
type Tab = (typeof TABS)[number]["key"];

/**
 * 「Your Research, Your Model.」大型產品工作台：三個分頁共用同一組假設狀態，
 * 在 Assumptions 調整後，Prediction 的報表與圖同步改變，FEAP 分頁顯示來源與依據。
 */
export function Workbench() {
  const [tab, setTab] = useState<Tab>("assume");
  const [a, setA] = useState<Assumptions>(baselineAssumptions);
  const base = useMemo(() => simulate(baselineAssumptions), []);
  const adj = useMemo(() => simulate(a), [a]);
  const qBase = useMemo(() => quarterly(base), [base]);
  const qAdj = useMemo(() => quarterly(adj), [adj]);
  const set = (k: keyof Assumptions) => (v: number) => setA((s) => ({ ...s, [k]: v }));
  const dirty = JSON.stringify(a) !== JSON.stringify(baselineAssumptions);

  // 歷史四季（示意）＋預測四季
  const hist = demoCompany.seasonality.map((w) => demoCompany.baseRevenue * w); // 2025 Q1–Q4（同一組季節比例，合計 12,400）
  const cats = ["25Q1", "25Q2", "25Q3", "25Q4", "26Q1", "26Q2", "26Q3", "26Q4"];
  const seriesBase = [...hist, ...qBase.map((x) => x.revenue)];
  const seriesAdj = [...hist, ...qAdj.map((x) => x.revenue)];

  return (
    <div className="rounded-2xl border border-line bg-white shadow-float overflow-hidden">
      {/* 頂列 */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-navy px-5 py-3 text-white">
        <span className="text-[13.5px] font-semibold">示意公司（虛構）</span>
        <span className="text-[12.5px] text-navy-100">下一年度・基準情境</span>
        <span className="ml-auto inline-flex items-center gap-2 text-[12.5px] text-navy-100">
          <span className={`h-2 w-2 rounded-full ${dirty ? "bg-amber-400" : "bg-brand-100"}`} aria-hidden="true" />
          {dirty ? "假設已修改，預測已重算" : "與 AI 建議一致"}
        </span>
      </div>

      {/* 分頁 */}
      <div role="tablist" aria-label="工作台分頁" className="grid grid-cols-3 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`wb-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`wb-panel-${t.key}`}
            onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-left border-b-2 transition-colors ${tab === t.key ? "border-brand bg-brand-50/60" : "border-transparent hover:bg-mist"}`}
          >
            <span className={`block text-[14px] font-semibold ${tab === t.key ? "text-ink" : "text-ink-2"}`}>{t.label}</span>
            <span className="block text-[12px] text-ink-3">{t.sub}</span>
          </button>
        ))}
      </div>

      <div className="p-5 min-h-[360px]">
        {tab === "feap" && (
          <div id="wb-panel-feap" role="tabpanel" aria-labelledby="wb-tab-feap" className="grid gap-4 md:grid-cols-3 text-[13px]">
            <Card title="事實（已公布）">
              <KV k="2025 營收" v="12,400 百萬元" />
              <KV k="2025 毛利率" v="30.2%" />
              <KV k="2025 費用率" v="14.5%" />
              <KV k="股數" v="520 百萬股" />
            </Card>
            <Card title="證據（關於未來）">
              <Note tag="法說會" text="新產線 Q2 量產，良率達門檻" />
              <Note tag="券商" text="明年營收年增 8～12%" />
              <Note tag="產業" text="終端需求回溫、庫存去化尾聲" />
              <Note tag="待驗證" text="主要客戶可能增加採購量" warn />
            </Card>
            <Card title="目前假設與依據">
              <KV k="營收年增率" v={fmtPctSigned(a.revenueGrowth, 1)} sub={dirty && a.revenueGrowth !== baselineAssumptions.revenueGrowth ? "使用者修改" : "券商共識＋產業證據"} />
              <KV k="毛利率" v={fmtPct(a.grossMargin, 1)} sub={dirty && a.grossMargin !== baselineAssumptions.grossMargin ? "使用者修改" : "新產線良率（法說會）"} />
              <KV k="營業費用率" v={fmtPct(a.opexRatio, 1)} sub={dirty && a.opexRatio !== baselineAssumptions.opexRatio ? "使用者修改" : "歷史費用率略降"} />
              <p className="mt-2 text-[12px] text-ink-3">每一筆假設都記錄建立時間、依據的事實與證據，以及尚未納入的證據。</p>
            </Card>
          </div>
        )}

        {tab === "assume" && (
          <div id="wb-panel-assume" role="tabpanel" aria-labelledby="wb-tab-assume" className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[13px] text-ink-2 mb-1">AI 已依證據提出建議值；你可以直接調整，右側即時重算。</p>
              <KnobSlider label="營收年增率" code="A.REV_GROWTH_YOY" value={a.revenueGrowth} baseline={baselineAssumptions.revenueGrowth} {...knobRanges.revenueGrowth} onChange={set("revenueGrowth")} format={(v) => fmtPctSigned(v, 1)} />
              <KnobSlider label="毛利率" code="A.GROSS_MARGIN" value={a.grossMargin} baseline={baselineAssumptions.grossMargin} {...knobRanges.grossMargin} onChange={set("grossMargin")} format={(v) => fmtPct(v, 1)} />
              <KnobSlider label="營業費用率" code="A.OPEX_RATIO" value={a.opexRatio} baseline={baselineAssumptions.opexRatio} {...knobRanges.opexRatio} onChange={set("opexRatio")} format={(v) => fmtPct(v, 1)} />
              <button type="button" onClick={() => setA(baselineAssumptions)} disabled={!dirty} className="mt-2 text-[13px] font-medium text-brand-700 hover:underline underline-offset-4 disabled:text-ink-3 disabled:no-underline">
                還原 AI 建議值
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 content-start">
              <Big label="模擬營收" v={fmtM(adj.revenue)} unit="百萬元" d={adj.revenue / base.revenue - 1} />
              <Big label="模擬毛利" v={fmtM(adj.grossProfit)} unit="百萬元" d={adj.grossProfit / base.grossProfit - 1} />
              <Big label="模擬營業利益" v={fmtM(adj.operatingIncome)} unit="百萬元" d={adj.operatingIncome / base.operatingIncome - 1} />
              <Big label="模擬 EPS" v={fmtEps(adj.eps)} unit="元" d={adj.eps / base.eps - 1} />
              <button type="button" onClick={() => setTab("predict")} className="col-span-2 mt-1 h-10 rounded-lg border border-line text-[13.5px] font-medium text-ink hover:bg-mist">
                查看完整模擬報表 →
              </button>
            </div>
          </div>
        )}

        {tab === "predict" && (
          <div id="wb-panel-predict" role="tabpanel" aria-labelledby="wb-tab-predict" className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[13px] font-medium text-ink mb-1">季度營收：實際與預測</p>
              <TrendLines
                ariaLabel="2025 四季實際營收與 2026 四季預測營收，比較 AI 基準與你的調整"
                categories={cats}
                forecastFrom={4}
                format={(v) => `${Math.round(v / 100) / 10}K`}
                series={[
                  { key: "base", label: "AI 基準", color: "var(--color-viz-base)", values: seriesBase, dashed: true },
                  { key: "adj", label: "你的調整", color: "var(--color-viz-adj)", values: seriesAdj },
                ]}
                height={230}
              />
            </div>
            <div>
              <p className="text-[13px] font-medium text-ink mb-1">模擬損益表（下一年度）</p>
              <StatementTable base={base} adjusted={adj} compact />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-line bg-mist px-5 py-3">
        <DemoTag text={demoDisclaimer} />
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3 mb-2">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
function KV({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line last:border-0 py-1.5">
      <span className="text-ink-2">
        {k}
        {sub && <span className="block text-[11.5px] text-ink-3">{sub}</span>}
      </span>
      <span className="tnum font-semibold text-ink">{v}</span>
    </div>
  );
}
function Note({ tag, text, warn = false }: { tag: string; text: string; warn?: boolean }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <span className={`mt-[2px] shrink-0 rounded px-1.5 text-[10.5px] font-semibold ${warn ? "bg-amber-50 text-amber-800" : "bg-navy-50 text-ink"}`}>{tag}</span>
      <span className="text-ink-2 leading-snug">{text}</span>
    </div>
  );
}
function Big({ label, v, unit, d }: { label: string; v: string; unit: string; d: number }) {
  const changed = Math.abs(d) > 1e-9;
  return (
    <div className="rounded-xl border border-line p-3.5">
      <p className="text-[12px] text-ink-3">{label}</p>
      <p className="text-[22px] font-semibold text-ink leading-tight mt-0.5">
        {v} <span className="text-[11px] font-normal text-ink-3">{unit}</span>
      </p>
      <p className={`text-[12px] tnum mt-0.5 ${!changed ? "text-ink-3" : d >= 0 ? "text-brand-700" : "text-ink-2"}`}>{changed ? `${fmtPctSigned(d)} vs AI 基準` : "＝AI 基準"}</p>
    </div>
  );
}
