import { applyNewOrder, baselineAssumptions, quarterly, simulate } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { DeviceFrame } from "./DeviceFrame";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

/**
 * Hero 視覺：Financial Research Workspace 三區（研究資訊輸入／AI 假設與控制／模擬財務報表）。
 * 數字全部由 lib/finance.ts 計算，與其他示範一致。
 */
export function HeroWorkspace() {
  const base = simulate(baselineAssumptions);
  const updatedA = applyNewOrder(baselineAssumptions, 900);
  const upd = simulate(updatedA);
  const q = quarterly(upd);
  const qBase = quarterly(base);

  const knobs = [
    { label: "營收年增率", code: "A.REV_GROWTH_YOY", v: fmtPctSigned(updatedA.revenueGrowth), pct: ((updatedA.revenueGrowth + 0.2) / 0.6) * 100, changed: true, from: fmtPctSigned(baselineAssumptions.revenueGrowth) },
    { label: "毛利率", code: "A.GROSS_MARGIN", v: fmtPct(updatedA.grossMargin), pct: ((updatedA.grossMargin - 0.15) / 0.35) * 100, changed: false },
    { label: "營業費用率", code: "A.OPEX_RATIO", v: fmtPct(updatedA.opexRatio), pct: ((updatedA.opexRatio - 0.06) / 0.19) * 100, changed: false },
  ];

  const maxRev = Math.max(...q.map((x) => x.revenue));

  return (
    <div>
      <DeviceFrame title="InfoFlask Workspace — 示意公司（虛構）・AI 模擬財務報表">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1.25fr)] text-[12.5px]">
          {/* ① 研究資訊輸入 */}
          <div className="border-b md:border-b-0 md:border-r border-line p-4 rise">
            <PanelHead n="1" title="研究資訊輸入" />
            <div className="rounded-lg border border-line bg-mist p-3 leading-relaxed text-ink">
              <p className="text-[11px] text-ink-3 mb-1">你新增的研究資訊</p>
              <p>主要客戶預計明年增加採購量，估計新增訂單約 <span className="font-semibold">9 億元</span>，產品組合與現有相近。</p>
            </div>
            <div className="mt-3 space-y-2">
              <SourceChip kind="已驗證" text="2025 年報：營收 12,400 百萬元、毛利率 30.2%" />
              <SourceChip kind="證據" text="法說會：新產線預計 Q2 量產" />
              <SourceChip kind="證據" text="券商：明年營收年增 8～12%" />
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-brand-700 font-medium">
              <Spark /> AI 已辨識 1 項可能影響營收的新資訊
            </p>
          </div>

          {/* ② AI 假設與控制 */}
          <div className="border-b md:border-b-0 md:border-r border-line p-4 rise-2">
            <PanelHead n="2" title="AI 假設與控制" />
            <div className="space-y-3">
              {knobs.map((k) => (
                <div key={k.code}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium text-ink">{k.label}</span>
                    <span className="tnum font-semibold">{k.v}</span>
                  </div>
                  <div className="relative mt-1.5 h-1 rounded-full bg-line-strong">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-brand" style={{ width: `${k.pct}%` }} />
                    <span className="absolute top-1/2 -mt-[7px] h-[14px] w-[14px] -ml-[7px] rounded-full border-2 border-brand bg-white shadow" style={{ left: `${k.pct}%` }} />
                  </div>
                  <p className="mt-1 text-[11px] text-ink-3">
                    {k.changed ? (
                      <>
                        AI 建議由 {k.from} 調整為 {k.v}（新增訂單）・<span className="text-brand-700">待你確認</span>
                      </>
                    ) : (
                      "維持 AI 建議值"
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex h-8 items-center rounded-md bg-brand-600 px-3 text-white font-semibold">確認假設</span>
              <span className="inline-flex h-8 items-center rounded-md border border-line px-3 text-ink-2">逐項調整</span>
            </div>
          </div>

          {/* ③ 模擬財務報表 */}
          <div className="p-4 rise-3">
            <PanelHead n="3" title="模擬財務報表" />
            <table className="w-full">
              <thead>
                <tr className="text-[11px] text-ink-3">
                  <th className="text-left font-medium pb-1">科目（百萬元）</th>
                  <th className="text-right font-medium pb-1">原預測</th>
                  <th className="text-right font-medium pb-1 text-brand-700">更新後</th>
                </tr>
              </thead>
              <tbody className="tnum">
                <Row l="營業收入" a={fmtM(base.revenue)} b={fmtM(upd.revenue)} />
                <Row l="營業毛利" a={fmtM(base.grossProfit)} b={fmtM(upd.grossProfit)} />
                <Row l="營業利益" a={fmtM(base.operatingIncome)} b={fmtM(upd.operatingIncome)} />
                <Row l="本期淨利" a={fmtM(base.netIncome)} b={fmtM(upd.netIncome)} />
                <Row l="EPS（元）" a={fmtEps(base.eps)} b={fmtEps(upd.eps)} strong />
              </tbody>
            </table>
            <div className="mt-3">
              <p className="text-[11px] text-ink-3 mb-1">季度營收（更新後 vs 原預測）</p>
              <svg viewBox="0 0 240 64" className="w-full h-16" role="img" aria-label="四季營收柱狀圖，更新後高於原預測">
                {q.map((x, i) => {
                  const h = (x.revenue / maxRev) * 48;
                  const hb = (qBase[i].revenue / maxRev) * 48;
                  const x0 = 12 + i * 58;
                  return (
                    <g key={x.label}>
                      <rect x={x0} y={52 - hb} width="16" height={hb} rx="3" fill="var(--color-viz-base)" />
                      <rect x={x0 + 18} y={52 - h} width="16" height={h} rx="3" fill="var(--color-viz-adj)" />
                      <text x={x0 + 17} y="62" textAnchor="middle" fontSize="9" fill="#6c767f">
                        {x.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </DeviceFrame>
      <DemoTag text={demoDisclaimer} className="mt-3" />
    </div>
  );
}

function PanelHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">{n}</span>
      <span className="text-[13px] font-semibold text-ink">{title}</span>
    </div>
  );
}

function SourceChip({ kind, text }: { kind: string; text: string }) {
  const verified = kind === "已驗證";
  return (
    <div className="flex items-start gap-2 rounded-md border border-line px-2.5 py-1.5">
      <span className={`mt-[2px] shrink-0 rounded px-1.5 text-[10px] font-semibold ${verified ? "bg-navy-50 text-ink" : "bg-brand-50 text-brand-700"}`}>{kind}</span>
      <span className="text-ink-2 leading-snug">{text}</span>
    </div>
  );
}

function Row({ l, a, b, strong = false }: { l: string; a: string; b: string; strong?: boolean }) {
  return (
    <tr className="border-t border-line">
      <td className={`py-1.5 ${strong ? "font-semibold text-ink" : "text-ink-2"}`}>{l}</td>
      <td className="py-1.5 text-right text-ink-3">{a}</td>
      <td className={`py-1.5 text-right ${strong ? "font-bold text-ink" : "font-semibold text-ink"}`}>{b}</td>
    </tr>
  );
}

function Spark() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4Z" fill="currentColor" />
    </svg>
  );
}
