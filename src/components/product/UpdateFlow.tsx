"use client";

import { useMemo, useState } from "react";
import { applyNewOrder, baselineAssumptions, simulate, type Assumptions } from "@/lib/finance";
import { fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { StatementTable } from "./StatementTable";
import { DemoTag, StatusBadge } from "@/components/ui/Badge";
import { demoDisclaimer, featureStatus } from "@/content/site";

const STEPS = ["新增研究資訊", "AI 建議假設", "使用者確認", "模擬財務報表更新"];
const NEW_INFO = "主要客戶預計明年增加採購量，估計新增訂單約 9 億元，產品組合與現有訂單相近。";
const ORDER = 900;

type Candidate = { key: keyof Assumptions; label: string; code: string; from: number; to: number; reason: string; fmt: (v: number) => string };

/**
 * 新資訊快速更新：四步互動示意。
 * 步驟 2 的候選假設由同一套簡化模型推得；步驟 3 使用者可逐項採納或維持原值；步驟 4 比較前後報表。
 */
export function UpdateFlow() {
  const [step, setStep] = useState(0);
  const proposed = useMemo(() => applyNewOrder(baselineAssumptions, ORDER), []);
  const candidates: Candidate[] = useMemo(
    () => [
      { key: "revenueGrowth", label: "營收年增率", code: "A.REV_GROWTH_YOY", from: baselineAssumptions.revenueGrowth, to: proposed.revenueGrowth, reason: `新增訂單 ${fmtM(ORDER)} 百萬元直接計入明年營收`, fmt: (v) => fmtPctSigned(v, 1) },
      { key: "grossMargin", label: "毛利率", code: "A.GROSS_MARGIN", from: baselineAssumptions.grossMargin, to: baselineAssumptions.grossMargin, reason: "產品組合相近，維持原假設", fmt: (v) => fmtPct(v, 1) },
      { key: "opexRatio", label: "營業費用率", code: "A.OPEX_RATIO", from: baselineAssumptions.opexRatio, to: 0.136, reason: "固定費用不變、營收擴大，費用率略降（規模效益）", fmt: (v) => fmtPct(v, 1) },
    ],
    [proposed],
  );
  const [accepted, setAccepted] = useState<Record<string, boolean>>({ revenueGrowth: true, grossMargin: true, opexRatio: true });

  const finalA: Assumptions = useMemo(() => {
    const a = { ...baselineAssumptions };
    for (const c of candidates) if (accepted[c.key]) a[c.key] = c.to;
    return a;
  }, [candidates, accepted]);

  const before = useMemo(() => simulate(baselineAssumptions), []);
  const after = useMemo(() => simulate(finalA), [finalA]);

  return (
    <div className="rounded-2xl border border-line bg-white shadow-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist px-5 py-3 text-[13px]">
        <span className="font-semibold text-ink">示意公司（虛構）・已完成的財務預測＋一則新資訊</span>
        <StatusBadge status={featureStatus.update} />
      </div>

      {/* 步驟列 */}
      <ol className="grid grid-cols-2 md:grid-cols-4 border-b border-line" aria-label="操作步驟">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "now" : "todo";
          return (
            <li key={s} className="contents">
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={state === "now" ? "step" : undefined}
                className={`flex items-center gap-2.5 px-4 py-3 text-left text-[13px] border-b-2 transition-colors md:border-b-0 md:border-r last:border-r-0 border-line ${
                  state === "now" ? "bg-brand-50 text-ink" : state === "done" ? "text-ink-2 hover:bg-mist" : "text-ink-3 hover:bg-mist"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold ${
                    state === "done" ? "bg-brand-600 text-white" : state === "now" ? "bg-navy text-white" : "bg-line text-ink-3"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className="font-medium">{s}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="p-5 min-h-[300px]">
        {step === 0 && (
          <div className="grid gap-5 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-[13px] text-ink-3 mb-2">你取得的新資訊（直接輸入系統）</p>
              <div className="rounded-xl border border-line bg-mist p-4 text-[14.5px] leading-relaxed text-ink">{NEW_INFO}</div>
              <p className="mt-3 text-[12.5px] text-ink-3">來源會記為「使用者研究」，與公司公告、券商報告等來源分開標示；之後可隨時撤回或取代。</p>
            </div>
            <div className="rounded-xl border border-line p-4 text-[13.5px]">
              <p className="font-medium text-ink">原有預測（AI 基準）</p>
              <ul className="mt-2 space-y-1 tnum text-ink-2">
                <li>營收年增率 {fmtPctSigned(baselineAssumptions.revenueGrowth, 0)}・毛利率 {fmtPct(baselineAssumptions.grossMargin, 0)}・費用率 {fmtPct(baselineAssumptions.opexRatio, 0)}</li>
                <li>模擬營收 {fmtM(before.revenue)} 百萬元</li>
                <li>模擬營業利益 {fmtM(before.operatingIncome)} 百萬元</li>
                <li>模擬 EPS {before.eps.toFixed(2)} 元</li>
              </ul>
              <p className="mt-3 text-[12.5px] text-ink-3">這份預測不需要從頭重做，新資訊會接在它之後成為新版本。</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-[13px] text-ink-3 mb-3">AI 分析新資訊可能影響的財務變數，提出候選假設（只是建議，尚未生效）。</p>
            <div className="grid gap-3 md:grid-cols-3">
              {candidates.map((c) => {
                const changed = Math.abs(c.to - c.from) > 1e-9;
                return (
                  <div key={c.key} className={`rounded-xl border p-4 ${changed ? "border-brand/50 bg-brand-50/40" : "border-line"}`}>
                    <p className="text-[14px] font-medium text-ink">{c.label}</p>
                    <p className="font-mono text-[10.5px] text-ink-3">{c.code}</p>
                    <p className="mt-2 tnum text-[15px]">
                      <span className="text-ink-3">{c.fmt(c.from)}</span>
                      <span className="mx-2 text-ink-3">→</span>
                      <span className={`font-semibold ${changed ? "text-brand-700" : "text-ink"}`}>{c.fmt(c.to)}</span>
                    </p>
                    <p className="mt-2 text-[12.5px] text-ink-2 leading-snug">{c.reason}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[12.5px] text-ink-3">AI 同時列出它參考了哪些既有事實與證據，以及這則新資訊與既有證據是否衝突。</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-[13px] text-ink-3 mb-3">由你決定：採納 AI 的建議，或維持原假設。每一項都可以單獨決定。</p>
            <div className="divide-y divide-line rounded-xl border border-line">
              {candidates.map((c) => {
                const changed = Math.abs(c.to - c.from) > 1e-9;
                const on = accepted[c.key];
                return (
                  <div key={c.key} className="flex flex-wrap items-center gap-3 px-4 py-3">
                    <div className="min-w-[160px] flex-1">
                      <p className="text-[14px] font-medium text-ink">{c.label}</p>
                      <p className="text-[12.5px] text-ink-3">{c.reason}</p>
                    </div>
                    <p className="tnum text-[14px] w-44">
                      <span className="text-ink-3">{c.fmt(c.from)}</span>
                      <span className="mx-1.5 text-ink-3">→</span>
                      <span className={`font-semibold ${on && changed ? "text-brand-700" : "text-ink"}`}>{c.fmt(on ? c.to : c.from)}</span>
                    </p>
                    <div role="group" aria-label={`${c.label} 的決定`} className="inline-flex rounded-lg border border-line overflow-hidden text-[12.5px]">
                      <button
                        type="button"
                        onClick={() => setAccepted((s) => ({ ...s, [c.key]: true }))}
                        aria-pressed={on}
                        className={`px-3 py-1.5 ${on ? "bg-navy text-white" : "bg-white text-ink-2 hover:bg-mist"}`}
                        disabled={!changed}
                      >
                        採納建議
                      </button>
                      <button
                        type="button"
                        onClick={() => setAccepted((s) => ({ ...s, [c.key]: false }))}
                        aria-pressed={!on}
                        className={`px-3 py-1.5 border-l border-line ${!on ? "bg-navy text-white" : "bg-white text-ink-2 hover:bg-mist"}`}
                        disabled={!changed}
                      >
                        維持原值
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[12.5px] text-ink-3">你的決定會與時間、依據一併記錄；未採納的證據仍會保留在「尚未納入」清單中。</p>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-[13px] text-ink-3 mb-3">系統依確認後的假設重新計算，並呈現調整前後的差異。</p>
            <StatementTable base={before} adjusted={after} baseLabel="更新前" adjLabel="更新後" compact />
            <p className="mt-3 text-[13px] text-ink-2">
              更新後 EPS <strong className="tnum text-ink">{after.eps.toFixed(2)}</strong> 元，較原預測 {fmtPctSigned(after.eps / before.eps - 1)}。
              {accepted.opexRatio ? "（含費用率調降）" : "（費用率維持原值）"}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 bg-mist">
        <DemoTag text={demoDisclaimer} />
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="h-9 rounded-md border border-line bg-white px-3 text-[13px] font-medium text-ink disabled:opacity-40"
          >
            上一步
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={step === STEPS.length - 1}
            className="h-9 rounded-md bg-brand-600 px-3.5 text-[13px] font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            {step === 0 ? "送出新資訊" : step === 1 ? "進入確認" : step === 2 ? "確認並重算" : "完成"}
          </button>
        </div>
      </div>
    </div>
  );
}
