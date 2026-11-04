import type { IncomeStatement } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";

type Row = { key: keyof IncomeStatement; label: string; kind: "money" | "pct" | "eps"; strong?: boolean; sub?: boolean };

const ROWS: Row[] = [
  { key: "revenue", label: "營業收入", kind: "money", strong: true },
  { key: "grossProfit", label: "營業毛利", kind: "money" },
  { key: "grossMargin", label: "毛利率", kind: "pct", sub: true },
  { key: "opex", label: "營業費用", kind: "money" },
  { key: "operatingIncome", label: "營業利益", kind: "money", strong: true },
  { key: "operatingMargin", label: "營業利益率", kind: "pct", sub: true },
  { key: "nonOperating", label: "業外收支", kind: "money" },
  { key: "tax", label: "所得稅費用", kind: "money" },
  { key: "netIncome", label: "本期淨利", kind: "money", strong: true },
  { key: "eps", label: "每股盈餘（EPS）", kind: "eps", strong: true },
];

function cell(v: number, kind: Row["kind"]) {
  return kind === "money" ? fmtM(v) : kind === "pct" ? fmtPct(v) : fmtEps(v);
}

/**
 * 簡易模擬損益表：基準 vs 調整後，含差異欄。
 */
export function StatementTable({
  base,
  adjusted,
  baseLabel = "AI 基準",
  adjLabel = "你的調整",
  compact = false,
  flashKey,
}: {
  base: IncomeStatement;
  adjusted: IncomeStatement;
  baseLabel?: string;
  adjLabel?: string;
  compact?: boolean;
  flashKey?: number;
}) {
  const rows = compact ? ROWS.filter((r) => !r.sub && r.key !== "nonOperating" && r.key !== "tax") : ROWS;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13.5px] border-collapse">
        <thead>
          <tr className="text-[11.5px] uppercase tracking-[0.08em] text-ink-3">
            <th scope="col" className="text-left font-semibold py-2 pr-3">
              科目
            </th>
            <th scope="col" className="text-right font-semibold py-2 px-3">
              {baseLabel}
            </th>
            <th scope="col" className="text-right font-semibold py-2 px-3 text-teal-700">
              {adjLabel}
            </th>
            <th scope="col" className="text-right font-semibold py-2 pl-3">
              差異
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const b = base[r.key];
            const a = adjusted[r.key];
            const isPct = r.kind === "pct";
            const diff = isPct ? a - b : b === 0 ? 0 : (a - b) / Math.abs(b);
            const diffText = isPct ? `${diff >= 0 ? "+" : "−"}${Math.abs(diff * 100).toFixed(1)} pp` : fmtPctSigned(diff);
            const changed = Math.abs(a - b) > 1e-9;
            return (
              <tr key={r.key} className={`border-t border-line ${r.sub ? "text-ink-3" : ""}`}>
                <th scope="row" className={`text-left py-2 pr-3 ${r.strong ? "font-semibold text-navy" : "font-normal text-ink"} ${r.sub ? "pl-3 text-[12.5px] text-ink-3" : ""}`}>
                  {r.label}
                </th>
                <td className="text-right py-2 px-3 tnum text-ink-2">{cell(b, r.kind)}</td>
                <td key={flashKey} className={`text-right py-2 px-3 tnum font-semibold text-ink rounded ${changed && flashKey ? "flash-update" : ""}`}>
                  {cell(a, r.kind)}
                </td>
                <td className={`text-right py-2 pl-3 tnum text-[12.5px] ${!changed ? "text-ink-3" : diff >= 0 ? "text-teal-700" : "text-ink-2"}`}>
                  {changed ? diffText : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
