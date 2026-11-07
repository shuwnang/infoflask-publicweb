import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { ScopeSignal } from "@/components/product/ScopeSignal";
import { scope, scopeAreas, scopeAreasHeading, scopeDisclaimer, scopePrinciple, scopeStatus } from "@/content/scope";
import { cta, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "InfoFlask Scope｜量化研究實驗室",
  description:
    "InfoFlask Scope 是 InfoFlask 的量化研究實驗室：用統計與機器學習研究台股的價格、成交量與籌碼，以樣本外驗證檢查策略穩定性。目前為內部研究用途，未對外銷售。",
  alternates: { canonical: routes.scope },
};

export default function ScopePage() {
  return (
    <>
      {/* Hero：一開始就說明這是研究實驗室、目前不對外銷售 */}
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_420px_at_80%_-10%,rgba(0,129,204,0.12),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center">
            <div>
              <p className="rise text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">{scope.eyebrow}</p>
              <h1 className="rise-2 mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.15] tracking-tight text-ink">{scope.name}</span>
                <span className="text-[clamp(1rem,1.6vw,1.2rem)] font-semibold tracking-tight text-brand-700">{scope.descriptor}</span>
              </h1>
              <p className="balance rise-2 mt-5 text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-[1.35] tracking-tight text-ink">{scope.title}</p>
              <p className="rise-3 mt-4 max-w-2xl text-[1.05rem] leading-[1.85] text-ink-2">{scope.lead}</p>
              <span className="rise-3 mt-5 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[12.5px] font-medium text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                {scope.badge}
              </span>
              <div className="rise-3 mt-7 flex flex-wrap gap-3">
                <Button href={`#${scopeStatus.id}`} size="lg">
                  {scopeStatus.ctaLabel}
                </Button>
                <Button href="#areas" variant="secondary" size="lg">
                  {scopeAreasHeading}
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

      {/* 研究領域：每項一句 */}
      <Section id="areas" className="scroll-mt-20">
        <h2 className="text-[1.6rem] sm:text-[2.1rem] font-bold tracking-tight text-ink">{scopeAreasHeading}</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scopeAreas.map((a) => (
            <li key={a.id} id={a.id} className="rounded-2xl border border-line bg-white p-5">
              <p className="tnum text-[13px] font-semibold text-brand-600">{a.n}</p>
              <h3 className="mt-1 text-[1.1rem] font-bold text-ink">{a.name}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.75] text-ink-2">{a.text}</p>
            </li>
          ))}
          <li className="rounded-2xl border border-line bg-mist p-5">
            <h3 className="text-[1.1rem] font-bold text-ink">{scopePrinciple.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.75] text-ink-2">{scopePrinciple.text}</p>
          </li>
        </ol>
      </Section>

      {/* 研究現況與合作洽詢 */}
      <Section id={scopeStatus.id} tone="mist" className="scroll-mt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="text-[1.6rem] sm:text-[2.1rem] leading-[1.25] font-bold tracking-tight text-ink">{scopeStatus.title}</h2>
          <div>
            <div className="space-y-4 text-[1.02rem] leading-[1.85] text-ink-2">
              {scopeStatus.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-white p-5">
              <Button href={cta.primary.href} size="lg">
                {scopeStatus.ctaLabel}
              </Button>
              <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-ink-3">{scopeStatus.ctaNote}</p>
            </div>
            <p className="mt-6 text-[12.5px] leading-[1.8] text-ink-3">{scopeDisclaimer}</p>
          </div>
        </div>
      </Section>

      {/* 導回主力產品 */}
      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.08em] text-brand-600">InfoFlask 的產品</p>
            <p className="balance mt-1 text-[1.2rem] font-bold text-ink">InfoFlask Crystal：台股 AI 財報預估</p>
          </div>
          <Link href={routes.crystal} className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 underline-offset-4 hover:underline">
            了解 InfoFlask Crystal
            <ArrowIcon />
          </Link>
        </div>
      </Section>
    </>
  );
}
