import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { HeroWorkspace } from "@/components/product/HeroWorkspace";
import { IntegrationDemo } from "@/components/product/IntegrationDemo";
import { FeapFlow } from "@/components/product/FeapFlow";
import { TextToNumbers } from "@/components/product/TextToNumbers";
import { KnobSimulator } from "@/components/product/KnobSimulator";
import { UpdateFlow } from "@/components/product/UpdateFlow";
import { crystal, features } from "@/content/product";
import { cta, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "InfoFlask Crystal｜AI Financial Intelligence",
  description:
    "InfoFlask Crystal：將無形資訊凝結成具體的財務洞察。資料減法、FEAP 架構、資訊財報化、互動式假設旋鈕、快速動態更新，把分散的研究資訊轉化為可調整、可追溯的財務假設與預測模型。",
  alternates: { canonical: routes.crystal },
};

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
