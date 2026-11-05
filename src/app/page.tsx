import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { cta } from "@/content/site";
import { hero, insight, productPointer, subtraction } from "@/content/home";

export const metadata: Metadata = {
  title: { absolute: "InfoFlask 富來思科技｜AI，讓投資變得更簡單。" },
  description: "InfoFlask（富來思科技）運用人工智慧與資訊技術，降低投資研究的時間成本與專業門檻，讓投資人更有效率地理解資訊、分析企業，並形成自己的投資判斷。Turn Information into Insight.",
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
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{productPointer.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[1.6rem] sm:text-[2rem] font-bold tracking-tight text-ink">{productPointer.title}</h2>
          <p className="mt-4 text-[1.05rem] leading-[1.8] text-ink-2">{productPointer.d}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="secondary" size="lg">
              {cta.secondary.label}
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
