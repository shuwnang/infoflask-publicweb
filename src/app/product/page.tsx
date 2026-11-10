import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { ProductShot } from "@/components/product/ProductShot";
import { Benchmarks } from "@/components/product/Benchmarks";
import { crystal, crystalFaq, features } from "@/content/product";
import { benchmarks } from "@/content/benchmarks";
import { SITE_URL, cta, links, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "InfoFlask Crystal｜台股 AI 財報分析與財報預估工具",
  description:
    "InfoFlask Crystal：台股 AI 財報分析與財報預估工具。輸入股票代號，AI 整理財報、法說會與新聞，建立有出處的財務假設，預估未來三年的損益表、資產負債表、現金流量表與 EPS；新資訊出現時只更新受影響的假設。實測一家公司 7 分鐘、AI 運算成本約 US$0.4。",
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

const chips = [
  ...features.map((f) => ({ href: `#${f.id}`, n: f.n, label: f.name })),
  { href: `#${crystalFaq.id}`, n: "", label: crystalFaq.eyebrow },
  { href: `#${benchmarks.id}`, n: "", label: benchmarks.eyebrow },
];

export default function CrystalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_420px_at_80%_-10%,rgba(0,129,204,0.12),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20">
          <div className="max-w-3xl">
            <p className="rise text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">{crystal.eyebrow}</p>
            <h1 className="rise-2 mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.15] tracking-tight text-ink">{crystal.name}</span>
              <span className="text-[clamp(1rem,1.6vw,1.2rem)] font-semibold tracking-tight text-brand-700">{crystal.descriptor}</span>
            </h1>
            <p className="balance rise-2 mt-5 text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-[1.3] tracking-tight text-ink">{crystal.title}</p>
            <p className="rise-3 mt-5 max-w-2xl text-[1.05rem] sm:text-[1.1rem] leading-[1.85] text-ink-2">{crystal.lead}</p>
            <div className="rise-3 mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
              <Button href={`#${features[0].id}`} variant="secondary" size="lg">
                看三項核心功能
              </Button>
            </div>
          </div>
          <ProductShot id="overview" priority note className="rise-3 mt-12 sm:mt-14" />
        </div>
      </section>

      {/* 頁內目錄 */}
      <div className="sticky top-16 z-40 border-b border-line bg-white/90 backdrop-blur-md">
        <nav aria-label="頁內目錄" className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-5 sm:px-8 py-2.5 [scrollbar-width:none]">
          {chips.map((c) => (
            <a key={c.href} href={c.href} className="shrink-0 rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-ink-2 hover:bg-mist hover:text-ink">
              {c.n && (
                <>
                  <span className="tnum text-brand-600">{c.n}</span>
                  <span className="mx-1.5 text-line-strong" aria-hidden="true">
                    ｜
                  </span>
                </>
              )}
              {c.label}
            </a>
          ))}
        </nav>
      </div>

      {/* 三項核心功能：說明在上、實際畫面在下（截圖需要全寬才看得清楚） */}
      {features.map((f, i) => (
        <Section key={f.id} id={f.id} tone={i % 2 === 1 ? "mist" : "white"} className="scroll-mt-28">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <div>
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
            </div>
            <div className="space-y-4 text-[15.5px] leading-[1.85] text-ink-2 lg:pt-7">
              {f.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ProductShot id={f.shot} className="mt-8 sm:mt-10" />
        </Section>
      ))}

      {/* 常見問題（搜尋者用語：財報分析／財報預估） */}
      <Section id={crystalFaq.id} tone="mist" className="scroll-mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">{crystalFaq.eyebrow}</p>
            <h2 className="mt-3 text-[1.6rem] sm:text-[1.9rem] font-bold leading-[1.3] tracking-tight text-ink">{crystalFaq.title}</h2>
          </div>
          <div className="divide-y divide-line rounded-2xl border border-line bg-white">
            {crystalFaq.items.map((it, i) => (
              <details key={it.q} className="group px-5 sm:px-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.02rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  <span className="balance">{it.q}</span>
                  <svg className="h-4 w-4 shrink-0 text-ink-3 transition-transform group-open:rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="pb-5 text-[15px] leading-[1.85] text-ink-2">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 實測數據：速度、成本、規模 */}
      <Section id={benchmarks.id} tone="white" className="scroll-mt-28">
        <Benchmarks />
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
          </div>
          {links.platformLogin && (
            <p className="mt-6 text-[14px] text-navy-100">
              已收到邀請？
              <Link href={links.platformLogin} className="ml-1 font-semibold text-white underline-offset-4 hover:underline">
                登入工作台
              </Link>
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
