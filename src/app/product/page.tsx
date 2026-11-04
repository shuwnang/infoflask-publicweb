import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { IntegrationDemo } from "@/components/product/IntegrationDemo";
import { FeapFlow } from "@/components/product/FeapFlow";
import { Workbench } from "@/components/product/Workbench";
import { KnobSimulator } from "@/components/product/KnobSimulator";
import { UpdateFlow } from "@/components/product/UpdateFlow";
import { features, productPage } from "@/content/product";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "產品功能｜AI 模擬財務報表",
  description: "InfoFlask 產品功能：企業資訊整合、FEAP 研究架構、AI 模擬財務報表、互動式假設旋鈕、新資訊快速更新。依實際研究流程說明 AI 如何協助投資研究。",
  alternates: { canonical: "/product/" },
};

const demos = {
  integration: <IntegrationDemo />,
  feap: <FeapFlow />,
  simulate: <Workbench />,
  knobs: <KnobSimulator showTax />,
  update: <UpdateFlow />,
};

export default function ProductPage() {
  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-teal">Product</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.2] tracking-tight text-navy">{productPage.title}</h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.8] text-ink-2">{productPage.lead}</p>
          <nav aria-label="功能目錄" className="mt-8 flex flex-wrap gap-2">
            {features.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-ink-2 hover:border-navy hover:text-navy">
                {f.n} {f.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {features.map((f, i) => (
        <Section key={f.id} id={f.id} tone={i % 2 === 1 ? "mist" : "white"}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="tnum text-[13px] font-semibold text-teal">{f.n}</p>
              <h2 className="mt-1 text-[1.6rem] sm:text-[1.9rem] font-bold leading-tight tracking-tight text-navy">{f.title}</h2>
              <div className="mt-3">
                <StatusBadge status={f.status} />
              </div>
              <p className="mt-4 text-[15.5px] leading-[1.8] text-ink-2">{f.summary}</p>
              <div className="mt-5 rounded-xl border border-line bg-white p-4">
                <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">研究情境</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{f.scenario}</p>
              </div>
              <div className="mt-4">
                <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">使用者可以獲得</p>
                <ul className="mt-2 space-y-1.5">
                  {f.value.map((v) => (
                    <li key={v} className="flex items-start gap-2 text-[14px] text-ink-2">
                      <svg className="mt-[5px] h-3.5 w-3.5 shrink-0 text-teal" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>{demos[f.demo]}</div>
          </div>
        </Section>
      ))}

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold tracking-tight text-white">想在自己的研究上試試看？</h2>
          <p className="mt-4 text-[1.02rem] leading-[1.8] text-navy-100">加入早期體驗名單，我們會依序寄出邀請，並說明目前可用與開發中的功能範圍。</p>
          <div className="mt-8">
            <Button href={cta.primary.href} variant="inverse" size="lg">
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
