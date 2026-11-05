"use client";

import { useState } from "react";
import { scenarios, simulate, type ScenarioKey } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { GroupedBars } from "@/components/charts/GroupedBars";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

const ORDER: ScenarioKey[] = ["bear", "base", "bull"];

/** 三情境比較：基準／樂觀／保守的假設與模擬結果（使用情境三） */
export function ScenarioCompare() {
  const [sel, setSel] = useState<ScenarioKey>("base");
  const results = Object.fromEntries(ORDER.map((k) => [k, simulate(scenarios[k].a)])) as Record<ScenarioKey, ReturnType<typeof simulate>>;

  return (
    <div className="rounded-2xl border border-line bg-white shadow-card overflow-hidden">
      <div className="border-b border-line bg-mist px-5 py-3 text-[13px]">
        <span className="font-semibold text-ink">示意公司（虛構）・同一家公司，三組研究觀點</span>
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <p className="text-[13px] text-ink-3 mb-2">點選情境，查看對應的假設組合</p>
          <div role="tablist" aria-label="情境" className="grid grid-cols-3 gap-2 mb-4">
            {ORDER.map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={sel === k}
                onClick={() => setSel(k)}
                className={`rounded-lg border px-3 py-2 text-left transition-colors ${sel === k ? "border-ink bg-navy text-white" : "border-line hover:bg-mist"}`}
              >
                <span className="flex items-center gap-2 text-[13px] font-semibold">
                  <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: scenarios[k].color }} aria-hidden="true" />
                  {scenarios[k].label}
                </span>
                <span className={`block tnum text-[12px] mt-0.5 ${sel === k ? "text-navy-100" : "text-ink-3"}`}>EPS {fmtEps(results[k].eps)} 元</span>
              </button>
            ))}
          </div>
          <table className="w-full text-[13.5px]">
            <tbody>
              <TR k="營收年增率" v={fmtPctSigned(scenarios[sel].a.revenueGrowth, 0)} />
              <TR k="毛利率" v={fmtPct(scenarios[sel].a.grossMargin, 0)} />
              <TR k="營業費用率" v={fmtPct(scenarios[sel].a.opexRatio, 1)} />
              <TR k="模擬營收" v={`${fmtM(results[sel].revenue)} 百萬元`} />
              <TR k="模擬營業利益" v={`${fmtM(results[sel].operatingIncome)} 百萬元`} />
              <TR k="模擬 EPS" v={`${fmtEps(results[sel].eps)} 元`} strong />
            </tbody>
          </table>
          <p className="mt-3 text-[12.5px] text-ink-3">三組情境可各自存檔、各自記錄依據，之後新資訊出現時分別更新。</p>
        </div>
        <div>
          <GroupedBars
            ariaLabel="三種情境下的營收、營業利益、淨利比較（百萬元）"
            categories={["營收", "營業利益", "淨利"]}
            series={ORDER.map((k) => ({
              key: k,
              label: scenarios[k].label,
              color: scenarios[k].color,
              values: [results[k].revenue, results[k].operatingIncome, results[k].netIncome],
              labeled: k === sel,
            }))}
            height={250}
          />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.08em] text-ink-3">
                  <th className="text-left font-semibold py-1.5">情境</th>
                  <th className="text-right font-semibold py-1.5">營收</th>
                  <th className="text-right font-semibold py-1.5">營業利益</th>
                  <th className="text-right font-semibold py-1.5">淨利</th>
                  <th className="text-right font-semibold py-1.5">EPS</th>
                </tr>
              </thead>
              <tbody className="tnum">
                {ORDER.map((k) => (
                  <tr key={k} className={`border-t border-line ${sel === k ? "bg-brand-50/60" : ""}`}>
                    <td className="py-1.5 flex items-center gap-2 text-ink">
                      <span className="h-2 w-2 rounded-[2px]" style={{ background: scenarios[k].color }} aria-hidden="true" />
                      {scenarios[k].label}
                    </td>
                    <td className="py-1.5 text-right">{fmtM(results[k].revenue)}</td>
                    <td className="py-1.5 text-right">{fmtM(results[k].operatingIncome)}</td>
                    <td className="py-1.5 text-right">{fmtM(results[k].netIncome)}</td>
                    <td className="py-1.5 text-right font-semibold text-ink">{fmtEps(results[k].eps)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border-t border-line bg-mist px-5 py-3">
        <DemoTag text={demoDisclaimer} />
      </div>
    </div>
  );
}

function TR({ k, v, strong = false }: { k: string; v: string; strong?: boolean }) {
  return (
    <tr className="border-t border-line">
      <td className={`py-2 ${strong ? "font-semibold text-ink" : "text-ink-2"}`}>{k}</td>
      <td className={`py-2 text-right tnum ${strong ? "font-bold text-ink" : "font-semibold text-ink"}`}>{v}</td>
    </tr>
  );
}
