import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { NewOrderDemo, PriceChangeDemo } from "@/components/product/UseCaseDemos";
import { ScenarioCompare } from "@/components/product/ScenarioCompare";
import { useCases, useCasesPage } from "@/content/usecases";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "使用情境｜新訂單、售價變化與情境分析",
  description: "InfoFlask 使用情境：新客戶訂單對獲利的影響、產品價格變化對毛利與 EPS 的影響、同一家公司在基準／樂觀／保守假設下的財務差異。所有案例皆為虛構示意。",
  alternates: { canonical: "/use-cases/" },
};

const demos = {
  order: <NewOrderDemo />,
  price: <PriceChangeDemo />,
  scenarios: <ScenarioCompare />,
};

export default function UseCasesPage() {
  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-teal">Use Cases</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.2] tracking-tight text-navy">{useCasesPage.title}</h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.8] text-ink-2">{useCasesPage.lead}</p>
        </div>
      </section>

      {useCases.map((u, i) => (
        <Section key={u.id} id={u.id} tone={i % 2 === 1 ? "mist" : "white"}>
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold tracking-[0.1em] text-teal">{u.n}</p>
            <h2 className="mt-1 text-[1.6rem] sm:text-[1.9rem] font-bold leading-tight tracking-tight text-navy">{u.title}</h2>
            <p className="mt-4 text-[1.15rem] font-medium leading-relaxed text-ink">「{u.question}」</p>
            <ol className="mt-5 flex flex-wrap gap-2">
              {u.steps.map((s, k) => (
                <li key={s} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-ink-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">{k + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8">{demos[u.demo]}</div>
        </Section>
      ))}

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.75rem] sm:text-[2.1rem] font-bold tracking-tight text-white">有自己的研究問題想驗證？</h2>
          <p className="mt-4 text-[1.02rem] leading-[1.8] text-navy-100">在申請表單中告訴我們你最想解決的投資研究問題，我們會優先安排相關情境的體驗。</p>
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
