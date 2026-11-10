import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { ProductShot } from "@/components/product/ProductShot";
import { cta, routes } from "@/content/site";
import { hero, how, mission, trust } from "@/content/home";
import { benchmarks } from "@/content/benchmarks";

export const metadata: Metadata = {
  title: { absolute: "InfoFlask 富來思科技｜台股 AI 財報分析與財報預估" },
  description:
    "輸入股票代號，InfoFlask Crystal 用 AI 在 7 分鐘內完成一份財報預估：整理財報、法說會與新聞，替每一項財務假設附上出處，產出未來三年的損益表、資產負債表、現金流量表與 EPS。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 第一屏：做什麼、給誰、多快＋產品實際畫面 */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(900px_420px_at_75%_-10%,rgba(0,129,204,0.10),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="max-w-4xl">
            <p className="rise text-[14px] font-semibold tracking-[0.08em] text-brand-600">{hero.eyebrow}</p>
            <h1 className="rise-2 mt-4 text-[clamp(1.75rem,5.2vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-ink">{hero.title}</h1>
            <p className="rise-3 mt-6 max-w-[34em] text-[1.05rem] leading-[1.85] text-ink-2 sm:text-[1.12rem]">{hero.lead}</p>
            <div className="rise-3 mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
              <Button href={`#${how.id}`} variant="secondary" size="lg">
                看它怎麼運作
              </Button>
            </div>
            <ul className="rise-3 mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-ink-2">
              {hero.trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ProductShot id="overview" priority note className="rise-3 mt-10 sm:mt-14" />
        </div>
      </section>

      {/* 2 實測數字列（與 Crystal 頁實測區塊共用同一組數字） */}
      <section className="border-y border-line bg-mist" aria-label={benchmarks.eyebrow}>
        <div className="mx-auto max-w-[1200px] px-5 py-7 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="text-[12.5px] font-semibold tracking-[0.12em] text-brand-600">
              {benchmarks.eyebrow}
              <span className="ml-2 font-medium tracking-normal text-ink-3">{benchmarks.asOf}</span>
            </p>
            <Link href={routes.benchmarks} className="text-[13.5px] font-semibold text-brand-700 underline-offset-4 hover:underline">
              看完整實測數據 →
            </Link>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
            {benchmarks.stats.map((s) => (
              <div key={s.label}>
                <dd className="tnum whitespace-nowrap text-[1.6rem] font-bold leading-none tracking-tight text-ink">
                  {s.value}
                  <span className="ml-1 text-[13px] font-medium text-ink-3">{s.unit}</span>
                </dd>
                <dt className="mt-2 text-[13.5px] leading-snug text-ink-2">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 怎麼運作 */}
      <Section id={how.id} className="scroll-mt-20">
        <p className="text-[13px] font-semibold tracking-[0.12em] text-brand-600">{how.eyebrow}</p>
        <h2 className="mt-3 text-[1.6rem] font-bold leading-[1.3] tracking-tight text-ink sm:text-[2.1rem]">{how.title}</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {how.steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-line bg-white p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-[14px] font-bold text-white tnum">{i + 1}</span>
              <h3 className="mt-4 text-[1.05rem] font-bold text-ink">{s.t}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.75] text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href={routes.crystal} className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 underline-offset-4 hover:underline">
            看產品細節與實際畫面
            <ArrowIcon />
          </Link>
        </div>
      </Section>

      {/* 4 為什麼可信 */}
      <Section tone="mist">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-7 sm:p-9">
            <p className="text-[13px] font-semibold tracking-[0.08em] text-brand-600">{trust.founder.eyebrow}</p>
            <h2 className="mt-3 text-[1.4rem] font-bold leading-[1.35] tracking-tight text-ink sm:text-[1.65rem]">{trust.founder.title}</h2>
            <p className="mt-4 text-[15.5px] leading-[1.85] text-ink-2">{trust.founder.text}</p>
            <Link href={trust.founder.link.href} className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-700 underline-offset-4 hover:underline">
              {trust.founder.link.label}
              <ArrowIcon />
            </Link>
          </div>
          <div className="rounded-2xl border border-line bg-white p-7 sm:p-9">
            <p className="text-[13px] font-semibold tracking-[0.08em] text-brand-600">{trust.evidence.eyebrow}</p>
            <h2 className="mt-3 text-[1.4rem] font-bold leading-[1.35] tracking-tight text-ink sm:text-[1.65rem]">{trust.evidence.title}</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-[1.75] text-ink-2">
              {trust.evidence.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <svg className="mt-[5px] h-4 w-4 shrink-0 text-brand" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link href={routes.benchmarks} className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-700 underline-offset-4 hover:underline">
              {trust.evidence.link.label}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </Section>

      {/* 5 理念與行動 */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold tracking-tight text-brand-600">{mission.en}</p>
          <h2 className="mt-3 text-[1.75rem] font-bold leading-[1.3] tracking-tight text-ink sm:text-[2.25rem]">{mission.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-left text-[1.02rem] leading-[1.9] text-ink-2 sm:text-center">{mission.text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="secondary" size="lg">
              {cta.secondary.label}
              <ArrowIcon />
            </Button>
          </div>
          <p className="mx-auto mt-12 max-w-2xl border-t border-line pt-6 text-[14px] leading-[1.8] text-ink-3">
            {mission.scope.text}
            <Link href={routes.scope} className="ml-1 font-semibold text-brand-700 underline-offset-4 hover:underline">
              {mission.scope.label} →
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
