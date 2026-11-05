"use client";

import { useMemo, useState } from "react";
import { applyNewOrder, applyPriceChange, baselineAssumptions, simulate } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { KnobSlider } from "./KnobSlider";
import { StatementTable } from "./StatementTable";
import { GroupedBars } from "@/components/charts/GroupedBars";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

/** 情境一：新客戶訂單 → 營收成長假設 → 重算 */
export function NewOrderDemo() {
  const [order, setOrder] = useState(900);
  const [accepted, setAccepted] = useState(true);
  const base = useMemo(() => simulate(baselineAssumptions), []);
  const proposed = useMemo(() => applyNewOrder(baselineAssumptions, order), [order]);
  const after = useMemo(() => simulate(accepted ? proposed : baselineAssumptions), [proposed, accepted]);

  return (
    <Shell head="示意公司（虛構）・新訂單對下一年度獲利的影響">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Step n={1} title="輸入新訂單資訊" />
          <div className="rounded-xl border border-line bg-mist p-4 text-[14px] leading-relaxed">
            主要客戶預計明年增加採購，估計新增訂單約 <strong className="tnum text-ink">{fmtM(order)}</strong> 百萬元。
          </div>
          <KnobSlider label="新增訂單金額（百萬元）" value={order} min={0} max={2000} step={50} onChange={setOrder} format={(v) => fmtM(v)} hint="拖動調整訂單規模" />

          <Step n={2} title="AI 提出營收成長假設" className="mt-4" />
          <div className="rounded-xl border border-brand/40 bg-brand-50/40 p-4 text-[13.5px]">
            <p className="font-medium text-ink">營收年增率 <span className="font-mono text-[10.5px] text-ink-3">A.REV_GROWTH_YOY</span></p>
            <p className="tnum mt-1 text-[15px]">
              <span className="text-ink-3">{fmtPctSigned(baselineAssumptions.revenueGrowth, 1)}</span>
              <span className="mx-2 text-ink-3">→</span>
              <span className="font-semibold text-brand-700">{fmtPctSigned(proposed.revenueGrowth, 1)}</span>
            </p>
            <p className="mt-1 text-[12.5px] text-ink-2">依據：使用者輸入的訂單金額；毛利率與費用率維持原假設（產品組合相近）。</p>
          </div>

          <Step n={3} title="使用者確認或調整" className="mt-4" />
          <div role="group" aria-label="是否採納" className="inline-flex rounded-lg border border-line overflow-hidden text-[13px]">
            <button type="button" aria-pressed={accepted} onClick={() => setAccepted(true)} className={`px-3.5 py-2 ${accepted ? "bg-navy text-white" : "bg-white text-ink-2 hover:bg-mist"}`}>
              採納 AI 假設
            </button>
            <button type="button" aria-pressed={!accepted} onClick={() => setAccepted(false)} className={`px-3.5 py-2 border-l border-line ${!accepted ? "bg-navy text-white" : "bg-white text-ink-2 hover:bg-mist"}`}>
              暫不納入
            </button>
          </div>
        </div>
        <div>
          <Step n={4} title="系統重新計算模擬財務報表" />
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Tile label="模擬營收" v={fmtM(after.revenue)} unit="百萬元" d={after.revenue / base.revenue - 1} />
            <Tile label="模擬營業利益" v={fmtM(after.operatingIncome)} unit="百萬元" d={after.operatingIncome / base.operatingIncome - 1} />
            <Tile label="模擬 EPS" v={fmtEps(after.eps)} unit="元" d={after.eps / base.eps - 1} />
          </div>
          <StatementTable base={base} adjusted={after} baseLabel="原預測" adjLabel="納入新訂單" compact />
        </div>
      </div>
    </Shell>
  );
}

/** 情境二：產品價格 +5% → 營收與毛利率連動 → 毛利與 EPS 變化 */
export function PriceChangeDemo() {
  const [p, setP] = useState(0.05);
  const base = useMemo(() => simulate(baselineAssumptions), []);
  const a = useMemo(() => applyPriceChange(baselineAssumptions, p), [p]);
  const after = useMemo(() => simulate(a), [a]);

  return (
    <Shell head="示意公司（虛構）・售價調整對毛利與 EPS 的影響">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <KnobSlider label="產品售價調整" code="A.ASP_GROWTH_YOY" value={p} min={-0.1} max={0.15} step={0.005} onChange={setP} format={(v) => fmtPctSigned(v, 1)} baseline={0} hint="銷量與單位成本不變" />
          <div className="mt-2 rounded-xl border border-line p-4 text-[13.5px] space-y-2">
            <p className="text-[12.5px] text-ink-3">連動的假設（由系統依售價變動推算）</p>
            <Line k="營收年增率" from={fmtPctSigned(baselineAssumptions.revenueGrowth, 1)} to={fmtPctSigned(a.revenueGrowth, 1)} />
            <Line k="毛利率" from={fmtPct(baselineAssumptions.grossMargin, 1)} to={fmtPct(a.grossMargin, 1)} />
            <Line k="營業費用率" from={fmtPct(baselineAssumptions.opexRatio, 1)} to={fmtPct(a.opexRatio, 1)} />
            <p className="pt-1 text-[12px] text-ink-3">售價提高而成本不變，每一元營收的成本占比下降，因此毛利率上升；固定費用不變時費用率亦略降。</p>
          </div>
        </div>
        <div>
          <GroupedBars
            ariaLabel="售價調整前後的毛利、營業利益、淨利比較（百萬元）"
            categories={["毛利", "營業利益", "淨利"]}
            series={[
              { key: "b", label: "調整前", color: "var(--color-viz-base)", values: [base.grossProfit, base.operatingIncome, base.netIncome] },
              { key: "a", label: `售價 ${fmtPctSigned(p, 1)}`, color: "var(--color-viz-adj)", values: [after.grossProfit, after.operatingIncome, after.netIncome], labeled: true },
            ]}
            height={220}
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Tile label="毛利率" v={fmtPct(after.grossMargin, 1)} unit="" d={after.grossMargin - base.grossMargin} pp />
            <Tile label="模擬 EPS" v={fmtEps(after.eps)} unit="元" d={after.eps / base.eps - 1} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ head, children }: { head: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white shadow-card overflow-hidden">
      <div className="border-b border-line bg-mist px-5 py-3 text-[13px] font-semibold text-ink">{head}</div>
      <div className="p-5">{children}</div>
      <div className="border-t border-line bg-mist px-5 py-3">
        <DemoTag text={demoDisclaimer} />
      </div>
    </div>
  );
}

function Step({ n, title, className = "" }: { n: number; title: string; className?: string }) {
  return (
    <p className={`mb-2 flex items-center gap-2 text-[13px] font-semibold text-ink ${className}`}>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[11px] text-white">{n}</span>
      {title}
    </p>
  );
}

function Line({ k, from, to }: { k: string; from: string; to: string }) {
  const changed = from !== to;
  return (
    <p className="flex items-baseline justify-between gap-3">
      <span className="text-ink-2">{k}</span>
      <span className="tnum">
        <span className="text-ink-3">{from}</span>
        <span className="mx-1.5 text-ink-3">→</span>
        <span className={`font-semibold ${changed ? "text-brand-700" : "text-ink"}`}>{to}</span>
      </span>
    </p>
  );
}

function Tile({ label, v, unit, d, pp = false }: { label: string; v: string; unit: string; d: number; pp?: boolean }) {
  const changed = Math.abs(d) > 1e-9;
  const txt = pp ? `${d >= 0 ? "+" : "−"}${Math.abs(d * 100).toFixed(1)} pp` : fmtPctSigned(d);
  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-[11.5px] text-ink-3">{label}</p>
      <p className="mt-0.5 text-[20px] font-semibold text-ink leading-tight">
        {v} {unit && <span className="text-[11px] font-normal text-ink-3">{unit}</span>}
      </p>
      <p className={`mt-0.5 text-[12px] tnum ${!changed ? "text-ink-3" : d >= 0 ? "text-brand-700" : "text-ink-2"}`}>{changed ? `${txt} vs 原預測` : "與原預測相同"}</p>
    </div>
  );
}
