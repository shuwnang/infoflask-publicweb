import { baselineAssumptions, scenarios, simulate } from "@/lib/finance";
import { fmtEps, fmtPct, fmtPctSigned } from "@/lib/format";
import { DemoTag } from "@/components/ui/Badge";

/**
 * 首頁第一屏的產品畫面：一家示意公司的預估結果（三種情境 EPS＋每項假設的出處）。
 * 數字由 lib/finance.ts 共用模型計算；假設與出處和 Crystal 頁的追溯示範（FeapFlow）一致。
 */
const ROWS = [
  { label: "營收年增率", value: fmtPctSigned(baselineAssumptions.revenueGrowth), sources: ["法說會：新產線 Q2 量產", "產業研究：需求回溫"] },
  { label: "毛利率", value: fmtPct(baselineAssumptions.grossMargin), sources: ["2025 年報：30.2%", "法說會：良率達量產門檻"] },
  { label: "營業費用率", value: fmtPct(baselineAssumptions.opexRatio), sources: ["2025 年報：14.5%", "規模擴大，費用率略降"] },
];

export function HeroResultCard() {
  const eps = {
    bear: simulate(scenarios.bear.a).eps,
    base: simulate(scenarios.base.a).eps,
    bull: simulate(scenarios.bull.a).eps,
  };
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-float">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-mist px-5 py-3 text-[12.5px]">
          <span className="font-semibold text-ink">示意公司（虛構）・下一年度財報預估</span>
          <span className="shrink-0 text-ink-3">示意畫面</span>
        </div>
        <div className="px-5 pt-4">
          <p className="text-[12px] font-medium text-ink-3">EPS（元），三種情境並列</p>
          <dl className="mt-2 grid grid-cols-3 gap-2">
            {(
              [
                ["保守", eps.bear, false],
                ["基準", eps.base, true],
                ["樂觀", eps.bull, false],
              ] as const
            ).map(([k, v, on]) => (
              <div key={k} className={`rounded-xl border px-3 py-2.5 ${on ? "border-brand bg-brand-50" : "border-line"}`}>
                <dt className={`text-[12px] ${on ? "font-semibold text-brand-700" : "text-ink-3"}`}>{k}</dt>
                <dd className="tnum mt-0.5 text-[1.45rem] font-bold leading-tight tracking-tight text-ink">{fmtEps(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="mt-4 px-5">
          {ROWS.map((r) => (
            <li key={r.label} className="border-t border-line py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] font-semibold text-ink">{r.label}</span>
                <span className="tnum text-[14px] font-bold text-ink">{r.value}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {r.sources.map((src) => (
                  <span key={src} className="rounded-md border border-line bg-mist px-2 py-0.5 text-[11.5px] text-ink-2">
                    {src}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <p className="border-t border-line bg-mist px-5 py-2.5 text-[12px] text-ink-3">每一項假設都記錄引用的資料來源，可以逐項檢視。</p>
      </div>
      <DemoTag text="示意畫面：公司與數字皆為虛構，不代表任何真實企業的預測。" className="mt-3" />
    </div>
  );
}
