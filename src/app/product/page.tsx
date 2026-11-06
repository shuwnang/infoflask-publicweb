import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { HeroWorkspace } from "@/components/product/HeroWorkspace";
import { IntegrationDemo } from "@/components/product/IntegrationDemo";
import { FeapFlow } from "@/components/product/FeapFlow";
import { TextToNumbers } from "@/components/product/TextToNumbers";
import { KnobSimulator } from "@/components/product/KnobSimulator";
import { UpdateFlow } from "@/components/product/UpdateFlow";
import { Benchmarks } from "@/components/product/Benchmarks";
import { crystal, crystalFaq, features } from "@/content/product";
import { benchmarks } from "@/content/benchmarks";
import { SITE_URL, cta, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "InfoFlask Crystal｜AI 財報分析與財報預估工具",
  description:
    "InfoFlask Crystal（AI Financial Intelligence）：以 AI 進行財報分析與財報預估。整合財報、法說會與新聞等資訊，依 FEAP 架構建立可追溯的財務假設，模擬營收、毛利率與 EPS 等財務報表；新資訊出現時以差量更新快速重算。實測：一家公司約 7 分鐘、AI 運算成本中位 US$0.44，2026Q3 單季 EPS 絕對誤差中位 9.8%。",
  alternates: { canonical: routes.crystal },
};

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}${routes.crystal}#faq`,
  mainEntity: crystalFaq.items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
}).replace(/</g, "\\u003c");

const demos = {
  integration: <IntegrationDemo />,
  feap: <FeapFlow />,
  simulate: <TextToNumbers />,
  knobs: <KnobSimulator showTax />,
  update: <UpdateFlow />,
};

export default function CrystalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_420px_at_80%_-10%,rgba(0,129,204,0.12),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <div className="max-w-3xl">
            <p className="rise text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">{crystal.eyebrow}</p>
            <h1 className="rise-2 mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.15] tracking-tight text-ink">{crystal.name}</span>
              <span className="text-[clamp(1rem,1.6vw,1.2rem)] font-semibold tracking-tight text-brand-700">{crystal.en}</span>
            </h1>
            <p className="rise-2 mt-6 text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-[1.3] tracking-tight text-ink">{crystal.title}</p>
            <p className="rise-3 mt-5 max-w-2xl text-[1.05rem] sm:text-[1.1rem] leading-[1.85] text-ink-2">{crystal.lead}</p>
            <div className="rise-3 mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
              <Button href="#subtraction" variant="secondary" size="lg">
                了解五項核心功能
              </Button>
              <Button href="/crystal/login/" variant="ghost" size="lg">
                登入工作台
              </Button>
            </div>
          </div>
          <div className="rise-3 mt-12 sm:mt-16">
            <HeroWorkspace />
          </div>
        </div>
      </section>

      {/* 功能目錄 */}
      <div className="sticky top-16 z-40 border-b border-line bg-white/90 backdrop-blur-md">
        <nav aria-label="功能目錄" className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-5 sm:px-8 py-2.5 [scrollbar-width:none]">
          {features.map((f) => (
            <a key={f.id} href={`#${f.id}`} className="shrink-0 rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-ink-2 hover:bg-mist hover:text-ink">
              <span className="tnum text-brand-600">{f.n}</span>
              <span className="mx-1.5 text-line-strong" aria-hidden="true">
                ｜
              </span>
              {f.name}
            </a>
          ))}
          <a href={`#${benchmarks.id}`} className="shrink-0 rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-ink-2 hover:bg-mist hover:text-ink">
            {benchmarks.eyebrow}
          </a>
        </nav>
      </div>

      {/* 五項核心功能 */}
      {features.map((f, i) => (
        <Section key={f.id} id={f.id} tone={i % 2 === 1 ? "mist" : "white"} className="scroll-mt-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-[13px] font-semibold tracking-[0.04em] text-brand-600">
                <span className="tnum">{f.n}</span>
                <span className="mx-1 text-line-strong" aria-hidden="true">
                  ｜
                </span>
                {f.name}
              </p>
              <h2 className="mt-2 text-[1.6rem] sm:text-[1.9rem] font-bold leading-[1.3] tracking-tight text-ink">{f.title}</h2>
              <div className="mt-3">
                <StatusBadge status={f.status} />
              </div>
              <div className="mt-5 space-y-4 text-[15.5px] leading-[1.85] text-ink-2">
                {f.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div>{demos[f.demo]}</div>
          </div>
        </Section>
      ))}

      {/* 實測數據：速度、成本、準確度 */}
      <Section id={benchmarks.id} tone="mist" className="scroll-mt-28">
        <Benchmarks />
      </Section>

      {/* 常見問題（搜尋者用語：財報分析／財報預估） */}
      <Section id={crystalFaq.id} tone="white" className="scroll-mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">{crystalFaq.eyebrow}</p>
            <h2 className="mt-3 text-[1.6rem] sm:text-[1.9rem] font-bold leading-[1.3] tracking-tight text-ink">{crystalFaq.title}</h2>
          </div>
          <dl className="divide-y divide-line rounded-2xl border border-line bg-mist/60">
            {crystalFaq.items.map((it) => (
              <div key={it.q} className="px-5 sm:px-6 py-5">
                <dt className="text-[1.02rem] font-semibold text-ink">{it.q}</dt>
                <dd className="mt-2 text-[15px] leading-[1.85] text-ink-2">{it.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold tracking-tight text-white">想在自己的研究上試試看？</h2>
          <p className="mt-4 text-[1.02rem] leading-[1.8] text-navy-100">加入 InfoFlask Crystal 早期體驗名單，我們會依序寄出邀請，並說明目前可用與開發中的功能範圍。</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} variant="inverse" size="lg">
              {cta.primary.label}
            </Button>
            <Link href="/crystal/login/" className="inline-flex h-12 items-center justify-center rounded-lg border border-navy-100/40 px-6 text-[15px] font-semibold text-white hover:bg-navy-800">
              已有帳號？登入工作台
            </Link>
          </div>
          <p className="mt-8 text-[14px] text-navy-100">
            另一個產品：
            <a href={routes.scope} className="ml-1 font-semibold text-white underline-offset-4 hover:underline">
              InfoFlask Scope — AI Market Intelligence
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
