import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import Link from "next/link";
import { cta, routes } from "@/content/site";
import { hero, insight, productPointer, subtraction } from "@/content/home";
import { benchmarks } from "@/content/benchmarks";

export const metadata: Metadata = {
  title: { absolute: "InfoFlask 富來思科技｜AI 財報分析與財報預估，讓投資變得更簡單" },
  description: "InfoFlask（富來思科技）以 AI 協助財報分析與財報預估：整合企業資訊、建立有依據的財務假設、模擬不同情境下的財務報表，降低投資研究的時間成本與專業門檻，讓投資人形成自己的判斷。Turn Information into Insight.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 公司介紹 */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(900px_420px_at_70%_-10%,rgba(0,129,204,0.10),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-20 sm:pt-32 pb-20 sm:pb-28">
          <div className="max-w-3xl">
            <p className="rise text-[14px] font-semibold tracking-[0.12em] uppercase text-brand-600">{hero.eyebrow}</p>
            <h1 className="rise-2 mt-4 text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-ink">{hero.title}</h1>
            <p className="rise-3 mt-7 max-w-2xl text-[1.1rem] sm:text-[1.2rem] leading-[1.85] text-ink-2">{hero.lead}</p>
            <div className="rise-3 mt-9 flex flex-wrap gap-3">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
                <ArrowIcon />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 1b 實測數據摘要（數字來源同 Crystal 頁實測區塊） */}
      <section className="border-y border-line bg-mist">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-4 px-5 sm:px-8 py-6">
          <p className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-brand-600">
            {benchmarks.eyebrow}
            <span className="ml-2 font-medium tracking-normal normal-case text-ink-3">{benchmarks.asOf}</span>
          </p>
          <dl className="flex flex-wrap gap-x-10 gap-y-3">
            {benchmarks.stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <dd className="tnum text-[1.35rem] font-bold leading-none tracking-tight text-ink">
                  {s.value}
                  <span className="ml-1 text-[12px] font-medium text-ink-3">{s.unit}</span>
                </dd>
                <dt className="text-[13px] text-ink-2">{s.label}</dt>
              </div>
            ))}
          </dl>
          <Link href={`${routes.crystal}#${benchmarks.id}`} className="ml-auto text-[13.5px] font-semibold text-brand-700 underline-offset-4 hover:underline">
            看完整實測與對帳 →
          </Link>
        </div>
      </section>

      {/* 2 資料減法 */}
      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.25] font-bold tracking-tight text-ink lg:sticky lg:top-24 self-start">{subtraction.title}</h2>
          <div className="space-y-5 text-[1.05rem] leading-[1.9] text-ink">
            {subtraction.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 Turn Information into Insight. */}
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <p className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-tight text-white">{insight.en}</p>
            <h2 className="mt-3 text-[1.25rem] font-semibold text-brand-100">{insight.zh}</h2>
          </div>
          <div className="space-y-5 text-[1.05rem] leading-[1.9] text-navy-100">
            {insight.paras.map((p, i) => (
              <p key={p} className={i === insight.paras.length - 1 ? "font-semibold text-white" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 4 產品導引與 CTA */}
      <Section>
        <div className="text-center">
          <Eyebrow>{productPointer.eyebrow}</Eyebrow>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Link href={routes.crystal} className="group rounded-2xl border border-line bg-white p-7 sm:p-9 shadow-float transition-colors hover:border-brand-300">
            <p className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-brand-600">{productPointer.crystal.en}</p>
            <h2 className="mt-2 text-[1.6rem] sm:text-[2rem] font-bold tracking-tight text-ink">{productPointer.crystal.name}</h2>
            <p className="mt-4 text-[1.02rem] leading-[1.8] text-ink-2">{productPointer.crystal.d}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-700 group-hover:underline underline-offset-4">
              {cta.secondary.label}
              <ArrowIcon />
            </span>
          </Link>
          <Link href={routes.scope} className="group rounded-2xl border border-line bg-mist p-7 sm:p-9 transition-colors hover:border-brand-300">
            <p className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-brand-600">{productPointer.scope.en}</p>
            <h2 className="mt-2 text-[1.4rem] sm:text-[1.6rem] font-bold tracking-tight text-ink">{productPointer.scope.name}</h2>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-ink-2">{productPointer.scope.d}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-700 group-hover:underline underline-offset-4">
              了解 InfoFlask Scope
              <ArrowIcon />
            </span>
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={cta.primary.href} size="lg">
            {cta.primary.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
