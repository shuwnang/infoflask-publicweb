"use client";

import { useState } from "react";
import { baselineAssumptions, simulate } from "@/lib/finance";
import { fmtEps, fmtM, fmtPct, fmtPctSigned } from "@/lib/format";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

type EvidenceItem = { id: string; text: string; source: string; verified: boolean };
type AssumptionItem = { id: string; label: string; value: string; basis: string[]; note: string };

const facts = [
  { id: "F1", label: "2025 年營業收入", value: "12,400 百萬元", source: "年度財報" },
  { id: "F2", label: "2025 年毛利率", value: "30.2%", source: "年度財報" },
  { id: "F3", label: "2025 年營業費用率", value: "14.5%", source: "年度財報" },
  { id: "F4", label: "流通在外股數", value: "520 百萬股", source: "財報附註" },
];

const evidence: EvidenceItem[] = [
  { id: "E1", text: "新產線預計明年第二季量產，良率已達量產門檻。", source: "法說會逐字稿", verified: true },
  { id: "E2", text: "多家券商預估明年營收年增 8～12%。", source: "券商研究報告", verified: true },
  { id: "E3", text: "終端市場需求自低點回溫，庫存去化接近尾聲。", source: "產業研究", verified: true },
  { id: "E4", text: "主要客戶可能增加明年採購量。", source: "供應鏈消息（尚待驗證）", verified: false },
];

const assumptions: AssumptionItem[] = [
  { id: "A1", label: "營收年增率", value: fmtPctSigned(baselineAssumptions.revenueGrowth, 0), basis: ["E1", "E3", "F1"], note: "依新產線量產與需求回溫估算，落在券商預估區間內；尚待驗證的客戶消息未納入" },
  { id: "A2", label: "毛利率", value: fmtPct(baselineAssumptions.grossMargin, 0), basis: ["E1", "F2"], note: "新產線良率改善，較 2025 年提高 0.8 個百分點" },
  { id: "A3", label: "營業費用率", value: fmtPct(baselineAssumptions.opexRatio, 0), basis: ["F3"], note: "規模擴大後費用率略降" },
];

/**
 * 事實→證據→假設→預測四階段流程圖＋同一家示意公司的具體案例。
 * 互動：將游標移到假設上，會標示它依據了哪些事實與證據（血緣）。
 */
export function FeapFlow() {
  const [active, setActive] = useState<string | null>(null);
  const pred = simulate(baselineAssumptions);
  const basis = active ? assumptions.find((a) => a.id === active)?.basis ?? [] : [];
  const isLit = (id: string) => !active || basis.includes(id);

  return (
    <div>
      {/* 四階段標題列 */}
      <ol className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 mb-6">
        {[
          ["F", "Fact", "事實", "企業已公布、可查證的客觀資料"],
          ["E", "Evidence", "證據", "支持對未來判斷的資訊與來源"],
          ["A", "Assumption", "假設", "根據事實與證據建立的模型輸入"],
          ["P", "Prediction", "預測", "依確認後的假設計算的模擬報表"],
        ].map(([k, en, zh, d], i) => (
          <li key={k} className="relative flex items-start gap-3 md:pr-7">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white text-[17px] font-bold">{k}</span>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-tight text-ink">{zh}</p>
              <p className="text-[11.5px] font-medium tracking-wide text-ink-3">{en}</p>
              <p className="mt-1 text-[12.5px] text-ink-3 leading-snug">{d}</p>
            </div>
            {i < 3 && (
              <svg className="hidden md:block absolute right-1 top-3 h-4 w-4 text-line-strong" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>

      {/* 案例：四欄 */}
      <div className="rounded-2xl border border-line bg-white shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist px-5 py-3 text-[13px]">
          <span className="font-semibold text-ink">研究案例：示意公司（虛構）・下一年度預測</span>
          <span className="text-ink-3">選一項「假設」，查看它依據了哪些事實與證據</span>
        </div>
        <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line text-[13px]">
          {/* Fact */}
          <Col title="事實" sub="已發生、不可變" twoUpOnPhone>
            {facts.map((f) => (
              <Item key={f.id} id={f.id} lit={isLit(f.id)}>
                <p className="text-ink-2">{f.label}</p>
                <p className="tnum font-semibold text-ink">{f.value}</p>
                <p className="text-[11.5px] text-ink-3">{f.source}</p>
              </Item>
            ))}
          </Col>
          {/* Evidence */}
          <Col title="證據" sub="關於未來；可被取代、撤回">
            {evidence.map((e) => (
              <Item key={e.id} id={e.id} lit={isLit(e.id)}>
                <p className="text-ink leading-snug">{e.text}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-ink-3">
                  <span className={`shrink-0 whitespace-nowrap rounded px-1.5 py-[1px] font-medium ${e.verified ? "bg-navy-50 text-ink" : "bg-amber-50 text-amber-800"}`}>{e.verified ? "已驗證來源" : "待驗證"}</span>
                  {e.source}
                </p>
              </Item>
            ))}
          </Col>
          {/* Assumption */}
          <Col title="假設" sub="記錄時間、依據與未納入的證據">
            {assumptions.map((a) => (
              <button
                key={a.id}
                type="button"
                onMouseEnter={() => setActive(a.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(a.id)}
                onBlur={() => setActive(null)}
                aria-pressed={active === a.id}
                className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors ${
                  active === a.id ? "border-brand bg-brand-50" : "border-line hover:border-brand/60"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-ink">{a.label}</span>
                  <span className="tnum font-semibold text-brand-700">{a.value}</span>
                </div>
                <p className="mt-1 text-[12px] text-ink-2 leading-snug">{a.note}</p>
                <p className="mt-1 text-[11px] text-ink-3">依據：{a.basis.join("、")}　<span className="text-brand-700">可修改／可否決</span></p>
              </button>
            ))}
          </Col>
          {/* Prediction */}
          <Col title="預測" sub="每次計算都是新版本，可對實際">
            <div className="rounded-lg border border-line p-3">
              <table className="w-full tnum">
                <tbody>
                  <PRow l="模擬營收" v={`${fmtM(pred.revenue)}`} />
                  <PRow l="模擬毛利" v={`${fmtM(pred.grossProfit)}`} />
                  <PRow l="模擬營業利益" v={`${fmtM(pred.operatingIncome)}`} />
                  <PRow l="模擬淨利" v={`${fmtM(pred.netIncome)}`} />
                  <PRow l="模擬 EPS" v={`${fmtEps(pred.eps)} 元`} strong />
                </tbody>
              </table>
              <p className="mt-2 text-[11.5px] text-ink-3">單位：百萬元。用到的事實 F1～F4、假設 A1～A3 與計算公式的版本都一併記錄。</p>
            </div>
            <div className="rounded-lg border border-dashed border-line-strong p-3 text-[12px] text-ink-2">
              <p className="font-medium text-ink">尚未納入的證據</p>
              <p className="mt-1">E4 主要客戶可能增加採購量（待驗證）。驗證後可加入並重算，形成新版本預測。</p>
            </div>
          </Col>
        </div>
        <div className="border-t border-line bg-mist px-5 py-3">
          <DemoTag text={demoDisclaimer} />
        </div>
      </div>
    </div>
  );
}

function Col({ title, sub, children, twoUpOnPhone = false }: { title: string; sub: string; children: React.ReactNode; twoUpOnPhone?: boolean }) {
  return (
    <div className="p-4">
      <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">{title}</p>
      <p className="text-[11.5px] text-ink-3 mb-3">{sub}</p>
      <div className={twoUpOnPhone ? "grid grid-cols-2 gap-2 md:grid-cols-1" : "space-y-2"}>{children}</div>
    </div>
  );
}

function Item({ id, lit, children }: { id: string; lit: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-lg border px-3 py-2.5 transition-all ${lit ? "border-line bg-white" : "border-transparent opacity-35"}`}>
      <span className="float-right ml-2 font-mono text-[10.5px] text-ink-3">{id}</span>
      {children}
    </div>
  );
}

function PRow({ l, v, strong = false }: { l: string; v: string; strong?: boolean }) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className={`py-1.5 ${strong ? "font-semibold text-ink" : "text-ink-2"}`}>{l}</td>
      <td className={`py-1.5 text-right ${strong ? "font-bold text-ink" : "font-semibold text-ink"}`}>{v}</td>
    </tr>
  );
}
