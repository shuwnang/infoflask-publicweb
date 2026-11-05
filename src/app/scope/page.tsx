import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ScopeSignal } from "@/components/product/ScopeSignal";
import { scope, scopeAreas, scopeAreasHeading, scopeClosing, scopeDisclaimer, scopeIntro, scopePhilosophy, scopeStatus } from "@/content/scope";
import { cta, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "InfoFlask Scope｜AI Market Intelligence",
  description:
    "InfoFlask Scope：放大市場訊號，看見數據背後的細節。InfoFlask 的量化研究實驗室，結合金融資料工程、統計分析與機器學習，從價格、成交量與籌碼中探索可重複驗證的市場規律。目前以內部研究為主。",
  alternates: { canonical: routes.scope },
};

export default function ScopePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_420px_at_80%_-10%,rgba(0,129,204,0.12),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center">
            <div>
              <p className="rise text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">{scope.eyebrow}</p>
              <h1 className="rise-2 mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.15] tracking-tight text-ink">{scope.name}</span>
                <span className="text-[clamp(1rem,1.6vw,1.2rem)] font-semibold tracking-tight text-brand-700">{scope.en}</span>
              </h1>
              <p className="rise-2 mt-6 text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-[1.3] tracking-tight text-ink">{scope.title}</p>
              <p className="rise-3 mt-5 max-w-2xl text-[1.05rem] sm:text-[1.1rem] leading-[1.85] text-ink-2">{scope.lead}</p>
              <div className="rise-3 mt-8 flex flex-wrap gap-3">
                <Button href="#areas" size="lg">
                  核心研究領域
                </Button>
                <Button href="#status" variant="secondary" size="lg">
                  研究現況與合作
                </Button>
              </div>
            </div>
            <div className="rise-3 rounded-2xl border border-line bg-white p-4 shadow-float">
              <ScopeSignal className="h-auto w-full" />
              <p className="mt-2 text-[12px] text-ink-3">示意圖，不代表任何真實市場資料。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 介紹 */}
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <p className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-tight text-white">{scopeIntro.en}</p>
            <h2 className="mt-3 text-[1.25rem] font-semibold text-brand-100">{scopeIntro.zh}</h2>
          </div>
          <div className="space-y-5 text-[1.05rem] leading-[1.9] text-navy-100">
            {scopeIntro.paras.map((p, i) => (
              <p key={p} className={i === 1 ? "text-[1.25rem] font-semibold text-white" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 核心研究領域 */}
      <Section id="areas" className="scroll-mt-20">
        <h2 className="text-[1.75rem] sm:text-[2.25rem] font-bold tracking-tight text-ink">{scopeAreasHeading}</h2>
        <ol className="mt-10 divide-y divide-line border-t border-line">
          {scopeAreas.map((a) => (
            <li key={a.id} id={a.id} className="grid gap-4 py-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.04em] text-brand-600">
                  <span className="tnum">{a.n}</span>
                  <span className="mx-1 text-line-strong" aria-hidden="true">
                    ｜
                  </span>
                  {a.name}
                </p>
                <h3 className="mt-2 text-[1.35rem] sm:text-[1.6rem] font-bold leading-[1.3] tracking-tight text-ink">{a.title}</h3>
              </div>
              <div className="space-y-4 text-[15.5px] leading-[1.85] text-ink-2">
                {a.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 研究哲學 */}
      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.25] font-bold tracking-tight text-ink lg:sticky lg:top-24 self-start">{scopePhilosophy.title}</h2>
          <div className="space-y-5 text-[1.05rem] leading-[1.9] text-ink">
            {scopePhilosophy.paras.map((p, i) => (
              <p key={p} className={i === scopePhilosophy.paras.length - 1 ? "font-semibold" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 研究現況與合作洽詢 */}
      <Section id="status" className="scroll-mt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.25] font-bold tracking-tight text-ink">{scopeStatus.title}</h2>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[12px] font-medium text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
              {scopeStatus.badge}
            </span>
          </div>
          <div>
            <div className="space-y-5 text-[1.05rem] leading-[1.9] text-ink-2">
              {scopeStatus.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-line bg-mist p-5">
              <div className="flex flex-wrap items-center gap-4">
                <Button href={cta.primary.href} size="lg">
                  {scopeStatus.ctaLabel}
                </Button>
                <p className="text-[13.5px] leading-relaxed text-ink-3">{scopeStatus.ctaNote}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 收尾與聲明 */}
      <Section tone="navy">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[clamp(1.5rem,3vw,2.3rem)] font-bold leading-[1.2] tracking-tight text-white">{scopeClosing}</p>
          <p className="mx-auto mt-10 max-w-2xl text-[13px] leading-[1.8] text-navy-100">{scopeDisclaimer}</p>
          <p className="mt-8 text-[14px] text-navy-100">
            另一個產品：
            <a href={routes.crystal} className="ml-1 font-semibold text-white underline-offset-4 hover:underline">
              InfoFlask Crystal — AI Financial Intelligence
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
