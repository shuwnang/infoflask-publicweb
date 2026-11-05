import type { Metadata } from "next";
import { EarlyAccessForm } from "@/components/forms/EarlyAccessForm";
import { statusLabel, featureStatus } from "@/content/site";

export const metadata: Metadata = {
  title: "搶先體驗",
  description: "申請 InfoFlask 早期體驗：讓 AI 協助投資研究與財務報表模擬，更有效率地分析企業、調整預測假設，將研究資訊快速反映在模擬財務報表中。",
  alternates: { canonical: "/early-access/" },
};

export default function EarlyAccessPage() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">Early Access</p>
            <h1 className="mt-3 text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.2] tracking-tight text-ink">搶先體驗 InfoFlask。</h1>
            <div className="mt-5 space-y-3 text-[1.05rem] leading-[1.8] text-ink-2">
              <p>我們正在開發讓 AI 協助投資研究與財務報表模擬的工具。</p>
              <p>如果你希望更有效率地分析企業、調整預測假設，或將自己的研究資訊快速反映在模擬財務報表中，歡迎加入早期體驗名單。</p>
            </div>
            <div className="mt-8 rounded-xl border border-line bg-white p-5">
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">目前進度（對外說明）</p>
              <ul className="mt-3 space-y-2 text-[14px]">
                <Row label="企業資訊整合" s={statusLabel[featureStatus.integration]} />
                <Row label="FEAP 研究架構" s={statusLabel[featureStatus.feap]} />
                <Row label="AI 模擬財務報表" s={statusLabel[featureStatus.simulate]} />
                <Row label="互動式假設旋鈕" s={statusLabel[featureStatus.knobs]} />
                <Row label="新資訊快速更新" s={statusLabel[featureStatus.update]} />
              </ul>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">早期體驗以台灣上市櫃公司為範圍，依序邀請；申請不保證取得體驗資格。</p>
            </div>
          </div>
          <EarlyAccessForm />
        </div>
      </div>
    </section>
  );
}

function Row({ label, s }: { label: string; s: string }) {
  const dev = s === "開發中";
  return (
    <li className="flex items-center justify-between gap-3 border-b border-line last:border-0 pb-2 last:pb-0">
      <span className="text-ink">{label}</span>
      <span className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium ${dev ? "text-amber-800" : "text-brand-700"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dev ? "bg-amber-500" : "bg-brand"}`} aria-hidden="true" />
        {s}
      </span>
    </li>
  );
}
