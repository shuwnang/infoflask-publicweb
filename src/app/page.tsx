import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Eyebrow, StatusBadge } from "@/components/ui/Badge";
import { HeroWorkspace } from "@/components/product/HeroWorkspace";
import { WorkflowCompare } from "@/components/product/WorkflowCompare";
import { Workbench } from "@/components/product/Workbench";
import { FeapFlow } from "@/components/product/FeapFlow";
import { KnobSimulator } from "@/components/product/KnobSimulator";
import { UpdateFlow } from "@/components/product/UpdateFlow";
import { cta, featureStatus } from "@/content/site";
import { audiences, feapSection, finalCta, hero, knobsSection, problem, simulateSection, updateSection, yourModel } from "@/content/home";

export const metadata: Metadata = {
  title: { absolute: "InfoFlask｜Turn Information into Insight." },
  description: "InfoFlask（富來思科技）將 AI 導入投資研究：整合企業資訊、建立有依據的財務假設、AI 模擬財務報表。Your Research, Your Model——你的研究，你的預測。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_420px_at_70%_-10%,rgba(24,143,135,0.10),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-16 sm:pt-24 pb-14">
          <div className="max-w-3xl">
            <p className="rise text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-navy">{hero.en}</p>
            <h1 className="rise-2 mt-4 text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-snug text-ink">{hero.zh}</h1>
            <div className="rise-3 mt-6 space-y-1 text-[1.05rem] leading-[1.8] text-ink-2">
              {hero.lead.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="rise-3 mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
                <ArrowIcon />
              </Button>
            </div>
          </div>
          <div className="mt-14">
            <HeroWorkspace />
          </div>
        </div>
      </section>

      {/* 2 問題與解決方案 */}
      <Section tone="mist">
        <SectionHeading title={problem.title} lead={problem.paras.map((p) => <p key={p}>{p}</p>)} />
        <div className="mt-10">
          <WorkflowCompare />
        </div>
      </Section>

      {/* 3 AI 模擬財務報表 */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <SectionHeading eyebrow={simulateSection.eyebrow} title={simulateSection.title} lead={simulateSection.paras.map((p) => <p key={p}>{p}</p>)} />
            <div className="mt-5 flex items-center gap-3">
              <StatusBadge status={featureStatus.simulate} />
              <Link href="/product/#simulate" className="text-[14px] font-medium text-teal-700 hover:underline underline-offset-4">
                了解完整流程 →
              </Link>
            </div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {simulateSection.steps.map((s, i) => (
              <li key={s.t} className="rounded-xl border border-line bg-white p-5 shadow-card">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[12.5px] font-bold text-white">{i + 1}</span>
                <p className="mt-3 text-[15px] font-semibold text-navy leading-snug">{s.t}</p>
                <p className="mt-1.5 text-[13.5px] text-ink-2 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 4 Your Research, Your Model. */}
      <Section tone="navy" id="your-model">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-tight text-white">{yourModel.en}</p>
            <h2 className="mt-2 text-[1.35rem] font-semibold text-teal-100">{yourModel.zh}</h2>
            <div className="mt-6 space-y-1 text-[1.02rem] leading-[1.8] text-navy-100">
              {yourModel.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-5">
              <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-teal-100">支持原則</p>
              <p className="mt-1.5 text-[1.2rem] font-semibold text-white">{yourModel.principleEn}</p>
              <p className="text-[15px] text-navy-100">{yourModel.principleZh}</p>
              <div className="mt-3 space-y-2 text-[14px] leading-relaxed text-navy-100">
                {yourModel.principleParas.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {yourModel.proofs.map((p) => (
                  <li key={p.t}>
                    <a href={p.href} className="block rounded-lg border border-white/15 px-3 py-2.5 hover:bg-white/5">
                      <span className="block text-[14px] font-semibold text-white">{p.t}</span>
                      <span className="block text-[12.5px] text-navy-100 leading-snug">{p.d}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Workbench />
          </div>
        </div>
      </Section>

      {/* 5 FEAP */}
      <Section id="feap">
        <SectionHeading eyebrow={feapSection.eyebrow} title={feapSection.title} lead={feapSection.paras.map((p) => <p key={p}>{p}</p>)} />
        <div className="mt-4">
          <StatusBadge status={featureStatus.feap} />
        </div>
        <div className="mt-10">
          <FeapFlow />
        </div>
      </Section>

      {/* 6 財務假設旋鈕 */}
      <Section tone="mist" id="knobs">
        <SectionHeading eyebrow={knobsSection.eyebrow} title={knobsSection.title} lead={knobsSection.paras.map((p) => <p key={p}>{p}</p>)} />
        <div className="mt-4 flex items-center gap-3">
          <StatusBadge status={featureStatus.knobs} />
          <span className="text-[13px] text-ink-3">目前版本可檢視並整批確認 AI 假設；逐項調整介面開發中。</span>
        </div>
        <div className="mt-10">
          <KnobSimulator />
        </div>
      </Section>

      {/* 7 新資訊更新 */}
      <Section id="update">
        <SectionHeading eyebrow={updateSection.eyebrow} title={updateSection.title} lead={updateSection.paras.map((p) => <p key={p}>{p}</p>)} />
        <div className="mt-10">
          <UpdateFlow />
        </div>
      </Section>

      {/* 8 適用對象 */}
      <Section tone="mist">
        <SectionHeading title={audiences.title} align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {audiences.items.map((a, i) => (
            <div key={a.t} className="rounded-2xl border border-line bg-white p-7 shadow-card">
              <Eyebrow>{["Individual", "Analyst", "Team"][i]}</Eyebrow>
              <p className="mt-2 text-[19px] font-semibold text-navy">{a.t}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{a.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 9 最後 CTA */}
      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold tracking-tight text-white">{finalCta.title}</p>
          <div className="mt-5 space-y-1 text-[1.02rem] leading-[1.8] text-navy-100">
            {finalCta.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
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
