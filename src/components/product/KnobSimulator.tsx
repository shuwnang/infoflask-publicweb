"use client";

import { useMemo, useState } from "react";
import { baselineAssumptions, knobRanges, simulate, type Assumptions } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { demoDisclaimer } from "@/content/site";
import { KnobSlider } from "./KnobSlider";
import { StatementTable } from "./StatementTable";
import { GroupedBars } from "@/components/charts/GroupedBars";
import { DemoTag } from "@/components/ui/Badge";

const pct1 = (v: number) => `${(v * 100).toFixed(1)}%`;
const pctSigned1 = (v: number) => fmtPctSigned(v, 1);

/**
 * 互動式財務假設旋鈕示範：左側三個 slider，右側模擬損益表＋基準／調整比較圖。
 */
export function KnobSimulator({ showTax = false }: { showTax?: boolean }) {
  const [a, setA] = useState<Assumptions>(baselineAssumptions);
  const [touched, setTouched] = useState(0);
  const base = useMemo(() => simulate(baselineAssumptions), []);
  const adj = useMemo(() => simulate(a), [a]);
  const set = (k: keyof Assumptions) => (v: number) => {
    setA((s) => ({ ...s, [k]: v }));
    setTouched((t) => t + 1);
  };
  const reset = () => {
    setA(baselineAssumptions);
    setTouched((t) => t + 1);
  };
  const dirty = JSON.stringify(a) !== JSON.stringify(baselineAssumptions);

  return (
    <div className="rounded-2xl border border-line bg-white shadow-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mist px-5 py-3">
        <div className="flex items-center gap-2 text-[13px] text-ink-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
          <span className="font-semibold text-navy">財務假設旋鈕</span>
          <span className="text-ink-3">示意公司（虛構）・下一年度</span>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={!dirty}
          className="text-[13px] font-medium text-teal-700 hover:underline underline-offset-4 disabled:text-ink-3 disabled:no-underline"
        >
          還原 AI 建議值
        </button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="px-5 py-4 lg:border-r border-line">
          <p className="text-[12.5px] text-ink-3 mb-1">拖動旋鈕即可調整假設；黑色短線為 AI 建議值。</p>
          <KnobSlider
            label="營收年增率"
            code="A.REV_GROWTH_YOY"
            value={a.revenueGrowth}
            baseline={baselineAssumptions.revenueGrowth}
            {...knobRanges.revenueGrowth}
            onChange={set("revenueGrowth")}
            format={pctSigned1}
          />
          <KnobSlider
            label="毛利率"
            code="A.GROSS_MARGIN"
            value={a.grossMargin}
            baseline={baselineAssumptions.grossMargin}
            {...knobRanges.grossMargin}
            onChange={set("grossMargin")}
            format={pct1}
          />
          <KnobSlider
            label="營業費用率"
            code="A.OPEX_RATIO"
            value={a.opexRatio}
            baseline={baselineAssumptions.opexRatio}
            {...knobRanges.opexRatio}
            onChange={set("opexRatio")}
            format={pct1}
          />
          {showTax && (
            <KnobSlider
              label="有效稅率"
              code="A.TAX_RATE"
              value={a.taxRate}
              baseline={baselineAssumptions.taxRate}
              {...knobRanges.taxRate}
              onChange={set("taxRate")}
              format={pct1}
            />
          )}
        </div>

        <div className="px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <Tile label="模擬營收" value={fmtM(adj.revenue)} delta={adj.revenue / base.revenue - 1} unit="百萬元" />
            <Tile label="模擬毛利" value={fmtM(adj.grossProfit)} delta={adj.grossProfit / base.grossProfit - 1} unit="百萬元" />
            <Tile label="模擬營業利益" value={fmtM(adj.operatingIncome)} delta={adj.operatingIncome / base.operatingIncome - 1} unit="百萬元" />
            <Tile label="模擬 EPS" value={fmtEps(adj.eps)} delta={adj.eps / base.eps - 1} unit="元" />
          </div>

          <GroupedBars
            ariaLabel="基準與調整後情境的營收、毛利、營業利益、淨利比較（百萬元）"
            categories={["營收", "毛利", "營業利益", "淨利"]}
            series={[
              { key: "base", label: "AI 基準", color: "var(--color-viz-base)", values: [base.revenue, base.grossProfit, base.operatingIncome, base.netIncome] },
              { key: "adj", label: "你的調整", color: "var(--color-viz-adj)", values: [adj.revenue, adj.grossProfit, adj.operatingIncome, adj.netIncome], labeled: true },
            ]}
            height={210}
          />

          <details className="mt-3 group">
            <summary className="cursor-pointer list-none text-[13.5px] font-medium text-navy inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 transition-transform group-open:rotate-90" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              展開模擬損益表
            </summary>
            <div className="mt-3">
              <StatementTable base={base} adjusted={adj} flashKey={touched} />
            </div>
          </details>
        </div>
      </div>

      <div className="border-t border-line px-5 py-3 bg-mist">
        <DemoTag text={`${demoDisclaimer} 計算邏輯：營收＝基期 ×（1＋年增率）、毛利＝營收 × 毛利率、營業利益＝毛利 − 營收 × 費用率、淨利＝（營業利益＋業外）×（1 − 稅率 ${fmtPct(a.taxRate, 0)}）、EPS＝淨利 ÷ 股數。`} />
      </div>
    </div>
  );
}

function Tile({ label, value, delta, unit }: { label: string; value: string; delta: number; unit: string }) {
  const changed = Math.abs(delta) > 1e-9;
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <p className="text-[11.5px] text-ink-3">{label}</p>
      <p className="mt-0.5 text-[20px] font-semibold text-navy leading-tight">
        {value} <span className="text-[11px] font-normal text-ink-3">{unit}</span>
      </p>
      <p className={`mt-0.5 text-[12px] tnum ${!changed ? "text-ink-3" : delta >= 0 ? "text-teal-700" : "text-ink-2"}`}>
        {changed ? `${fmtPctSigned(delta)} vs 基準` : "與基準相同"}
      </p>
    </div>
  );
}
