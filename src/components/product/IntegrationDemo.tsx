import { DeviceFrame } from "./DeviceFrame";
import { DemoTag } from "@/components/ui/Badge";
import { demoDisclaimer } from "@/content/site";

const sources = [
  { kind: "財報", layer: "事實", title: "2025 年度合併財務報告", meta: "損益表・資產負債表・現金流量表・附註", at: "2026-03-28" },
  { kind: "附註", layer: "事實", title: "營收細分：依產品與地區", meta: "附註第 6 節拆分成分類成員", at: "2026-03-28" },
  { kind: "月營收", layer: "事實", title: "2026 年 3 月營收", meta: "年增率、月增率、累計", at: "2026-04-09" },
  { kind: "法說會", layer: "證據", title: "2026 Q1 法人說明會逐字稿", meta: "指引：新產線 Q2 量產；資本支出區間", at: "2026-04-22" },
  { kind: "券商", layer: "證據", title: "券商研究報告（3 份）", meta: "明年營收年增預估 8～12%、目標價區間", at: "2026-04-24" },
  { kind: "重大訊息", layer: "事實", title: "董事會通過資本支出計畫", meta: "狀態事實：已核准", at: "2026-05-02" },
  { kind: "產業", layer: "證據", title: "終端需求與庫存週期追蹤", meta: "客觀序列：出貨量、庫存天數", at: "每月更新" },
];

/** 企業資訊整合：各來源集中一處，並區分事實層／證據層（靜態示意） */
export function IntegrationDemo() {
  return (
    <div>
      <DeviceFrame title="研究空間 — 示意公司（虛構）・資料來源">
        <div className="grid md:grid-cols-[200px_1fr] text-[13px]">
          <aside className="border-b md:border-b-0 md:border-r border-line bg-mist p-4">
            <p className="text-[11.5px] font-semibold tracking-[0.08em] uppercase text-ink-3 mb-2">資料層</p>
            <ul className="space-y-1.5">
              <li className="flex items-center justify-between rounded-md bg-white border border-line px-2.5 py-1.5"><span className="font-medium text-navy">事實</span><span className="tnum text-ink-3">4</span></li>
              <li className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-ink-2"><span>證據</span><span className="tnum text-ink-3">3</span></li>
              <li className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-ink-2"><span>假設</span><span className="tnum text-ink-3">—</span></li>
              <li className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-ink-2"><span>預測</span><span className="tnum text-ink-3">—</span></li>
            </ul>
            <p className="mt-4 text-[11.5px] text-ink-3 leading-snug">已發生的數字歸「事實」；關於未來的資訊歸「證據」，兩者不混用。</p>
          </aside>
          <div className="p-4">
            <ul className="divide-y divide-line">
              {sources.map((s) => (
                <li key={s.title} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
                  <span className="w-14 shrink-0 rounded bg-navy-50 px-1.5 py-[2px] text-center text-[11px] font-semibold text-navy">{s.kind}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink truncate">{s.title}</p>
                    <p className="text-[12px] text-ink-3 truncate">{s.meta}</p>
                  </div>
                  <span className={`rounded px-1.5 py-[2px] text-[11px] font-medium ${s.layer === "事實" ? "bg-navy-50 text-navy" : "bg-teal-50 text-teal-700"}`}>{s.layer}</span>
                  <span className="tnum w-24 text-right text-[12px] text-ink-3">{s.at}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DeviceFrame>
      <DemoTag text={demoDisclaimer} className="mt-3" />
    </div>
  );
}
