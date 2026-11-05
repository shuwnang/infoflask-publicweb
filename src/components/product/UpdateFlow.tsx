"use client";

import { useMemo, useState } from "react";
import { applyNewOrder, baselineAssumptions, simulate, type Assumptions } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { DemoTag, StatusBadge } from "@/components/ui/Badge";
import { demoDisclaimer, featureStatus } from "@/content/site";

type Knob = { key: keyof Assumptions; label: string; code: string; fmt: (v: number) => string };
const KNOBS: Knob[] = [
  { key: "revenueGrowth", label: "營收年增率", code: "A.REV_GROWTH_YOY", fmt: (v) => fmtPctSigned(v, 1) },
  { key: "grossMargin", label: "毛利率", code: "A.GROSS_MARGIN", fmt: (v) => fmtPct(v, 1) },
  { key: "opexRatio", label: "營業費用率", code: "A.OPEX_RATIO", fmt: (v) => fmtPct(v, 1) },
];

type Mode = "full" | "carry" | "delta";

type Version = {
  id: string;
  date: string;
  mode: Mode;
  /** 觸發這一版的新資訊（v1 為整份建模） */
  info: string;
  source: string;
  /** AI 的差量判定說明 */
  verdict: string;
  a: Assumptions;
  /** 本次重新評估並改動的旋鈕 */
  touched: (keyof Assumptions)[];
  /** 本次評估過但判定不改的旋鈕 */
  reviewed: (keyof Assumptions)[];
};

const MODE_LABEL: Record<Mode, string> = { full: "整份建模", carry: "沿用上次更新", delta: "差量更新" };
const MODE_CLS: Record<Mode, string> = {
  full: "bg-navy-50 text-ink border-navy-100",
  carry: "bg-mist text-ink-2 border-line-strong",
  delta: "bg-brand-50 text-brand-700 border-brand-100",
};

const v1a = baselineAssumptions;
const v3a: Assumptions = { ...applyNewOrder(v1a, 900), opexRatio: 0.136 };
const v4a: Assumptions = { ...v3a, grossMargin: v3a.grossMargin + 0.02 };

const VERSIONS: Version[] = [
  {
    id: "v1",
    date: "04-24",
    mode: "full",
    info: "年報、法說會逐字稿與三份券商報告入庫，AI 依全部材料建立第一版假設與三情境財務預測。",
    source: "初始建模",
    verdict: "整份建模只在初次建立或大更新（例如季報公布）時進行。",
    a: v1a,
    touched: ["revenueGrowth", "grossMargin", "opexRatio"],
    reviewed: [],
  },
  {
    id: "v2",
    date: "05-02",
    mode: "carry",
    info: "董事會通過資本支出計畫，金額與法說會先前揭露的區間一致。",
    source: "重大訊息",
    verdict: "AI 比對新資訊與既有證據：與現行假設一致、證據不足以改變任何旋鈕 → 不改，整份假設沿用上一版，不重新建模。",
    a: v1a,
    touched: [],
    reviewed: ["revenueGrowth", "opexRatio"],
  },
  {
    id: "v3",
    date: "05-15",
    mode: "delta",
    info: "主要客戶預計明年增加採購量，估計新增訂單約 9 億元，產品組合與現有相近。",
    source: "使用者研究",
    verdict: "AI 只針對受影響的旋鈕評估：營收年增率與費用率改動並落地；毛利率判定不受影響，沿用上一版。",
    a: v3a,
    touched: ["revenueGrowth", "opexRatio"],
    reviewed: ["grossMargin"],
  },
  {
    id: "v4",
    date: "06-10",
    mode: "delta",
    info: "法說會表示新產線良率達標，管理層預期毛利率可較去年提升約 2 個百分點。",
    source: "法說會",
    verdict: "只重新評估毛利率並上調 2 個百分點；營收年增率與費用率未被新資訊觸及，直接沿用 v3。",
    a: v4a,
    touched: ["grossMargin"],
    reviewed: [],
  },
];

/**
 * 快速動態更新：以版本紀錄呈現「沿用上次更新」與「差量更新」。
 * 每一版都接在上一版之後；沒有足夠證據就整份沿用，有新資訊就只重算受影響的旋鈕、其餘沿用。
 */
export function UpdateFlow() {
  const [idx, setIdx] = useState(2);
  const results = useMemo(() => VERSIONS.map((v) => simulate(v.a)), []);
  const v = VERSIONS[idx];
  const prev = idx > 0 ? VERSIONS[idx - 1] : null;
  const r = results[idx];
  const rPrev = idx > 0 ? results[idx - 1] : null;
  const carried = KNOBS.filter((k) => !v.touched.includes(k.key)).length;

  return (
    <div className="rounded-2xl border border-line bg-white shadow-float overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist px-5 py-3 text-[13px]">
        <span className="font-semibold text-ink">示意公司（虛構）・下一年度預測的版本紀錄</span>
        <StatusBadge status={featureStatus.update} />
      </div>

      {/* 版本時間軸 */}
      <ol className="grid grid-cols-2 md:grid-cols-4 border-b border-line" aria-label="預測版本">
        {VERSIONS.map((x, i) => {
          const on = i === idx;
          return (
            <li key={x.id} className="contents">
              <button
                type="button"
                onClick={() => setIdx(i)}
                aria-current={on ? "step" : undefined}
                className={`relative px-3 py-3 text-left border-b-2 transition-colors md:border-r last:border-r-0 border-line ${on ? "border-b-brand bg-brand-50/60" : "border-b-transparent hover:bg-mist"}`}
              >
                <span className="flex items-baseline gap-1.5">
                  <span className={`text-[13.5px] font-bold ${on ? "text-ink" : "text-ink-2"}`}>{x.id}</span>
                  <span className="tnum text-[11.5px] text-ink-3">{x.date}</span>
                </span>
                <span className={`mt-1 inline-block whitespace-nowrap rounded border px-1.5 py-[1px] text-[10.5px] font-medium ${MODE_CLS[x.mode]}`}>{MODE_LABEL[x.mode]}</span>
                <span className="mt-1.5 block tnum text-[12px] text-ink-2">
                  EPS <span className="font-semibold text-ink">{fmtEps(results[i].eps)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* 新資訊與判定 */}
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">
            {v.mode === "full" ? "建模材料" : "新進資訊"}
          </p>
          <div className="mt-2 rounded-xl border border-line bg-mist p-4 text-[14px] leading-relaxed text-ink">
            <span className="mb-1.5 inline-block rounded bg-white border border-line px-1.5 text-[11px] font-semibold text-ink-2">{v.source}</span>
            <p>{v.info}</p>
          </div>
          <p className="mt-4 text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">AI 判定</p>
          <div className={`mt-2 rounded-xl border p-4 ${v.mode === "delta" ? "border-brand-200 bg-brand-50/50" : "border-line"}`}>
            <span className={`inline-block rounded border px-1.5 py-[1px] text-[11px] font-medium ${MODE_CLS[v.mode]}`}>{MODE_LABEL[v.mode]}</span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{v.verdict}</p>
            {v.mode !== "full" && (
              <p className="mt-2 tnum text-[12.5px] text-ink-3">
                重新評估 {v.touched.length + v.reviewed.length} 個旋鈕・改動 {v.touched.length} 個・沿用 {carried} 個
              </p>
            )}
          </div>
        </div>

        {/* 假設表與結果 */}
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">這一版的假設</p>
          <ul className="mt-2 divide-y divide-line rounded-xl border border-line">
            {KNOBS.map((k) => {
              const val = v.a[k.key];
              const prevVal = prev ? prev.a[k.key] : null;
              const touched = v.touched.includes(k.key);
              const reviewed = v.reviewed.includes(k.key);
              // 沿用自哪一版：往前找最後一次改動
              let from = v.id;
              if (!touched) {
                for (let j = idx - 1; j >= 0; j--) {
                  if (VERSIONS[j].touched.includes(k.key)) {
                    from = VERSIONS[j].id;
                    break;
                  }
                }
              }
              return (
                <li key={k.key} className={`flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-2.5 ${touched ? "bg-brand-50/40" : ""}`}>
                  <div className="min-w-[120px] flex-1">
                    <p className="text-[13.5px] font-medium text-ink">{k.label}</p>
                    <p className="font-mono text-[10.5px] text-ink-3">{k.code}</p>
                  </div>
                  <p className="tnum text-[13.5px]">
                    {touched && prevVal !== null && (
                      <>
                        <span className="text-ink-3">{k.fmt(prevVal)}</span>
                        <span className="mx-1.5 text-ink-3" aria-hidden="true">
                          →
                        </span>
                      </>
                    )}
                    <span className={`font-semibold ${touched ? "text-brand-700" : "text-ink"}`}>{k.fmt(val)}</span>
                  </p>
                  <span
                    className={`w-[88px] text-right text-[11.5px] font-medium ${touched ? "text-brand-700" : "text-ink-3"}`}
                  >
                    {v.mode === "full" ? "初始建立" : touched ? "本次更新" : reviewed ? `評估後沿用 ${from}` : `沿用 ${from}`}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Big label="模擬營收（百萬元）" v={fmtM(r.revenue)} prev={rPrev ? fmtM(rPrev.revenue) : null} d={rPrev ? r.revenue / rPrev.revenue - 1 : 0} />
            <Big label="模擬 EPS（元）" v={fmtEps(r.eps)} prev={rPrev ? fmtEps(rPrev.eps) : null} d={rPrev ? r.eps / rPrev.eps - 1 : 0} strong />
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">
            {v.mode === "carry"
              ? "沒有需要改動的假設，這一版直接沿用上一版的全部假設與預測，不花時間也不花成本重做。"
              : v.mode === "delta"
                ? "只重算受影響的假設並接回上一版，再重跑基準／樂觀／保守三情境；每一筆改動都記錄依據的新資訊與時間。"
                : "初次建模會讀完全部材料；之後的更新都接在這一版之後，不必從頭再來。"}
          </p>
        </div>
      </div>

      <div className="border-t border-line bg-mist px-5 py-3">
        <DemoTag text={demoDisclaimer} />
      </div>
    </div>
  );
}

function Big({ label, v, prev, d, strong = false }: { label: string; v: string; prev: string | null; d: number; strong?: boolean }) {
  const changed = Math.abs(d) > 1e-6;
  return (
    <div className={`rounded-xl border p-3.5 ${strong ? "border-brand-200 bg-brand-50/40" : "border-line"}`}>
      <p className="text-[12px] text-ink-3">{label}</p>
      <p className={`mt-0.5 tnum font-semibold leading-tight text-ink ${strong ? "text-[24px]" : "text-[20px]"}`}>{v}</p>
      <p className={`mt-0.5 tnum text-[12px] ${!changed ? "text-ink-3" : d >= 0 ? "text-brand-700" : "text-ink-2"}`}>
        {prev === null ? "第一版" : changed ? `${fmtPctSigned(d, 1)} vs 上一版（${prev}）` : `＝上一版（${prev}）`}
      </p>
    </div>
  );
}
