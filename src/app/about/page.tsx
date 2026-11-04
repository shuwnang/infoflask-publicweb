import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { aboutPage } from "@/content/about";
import { brand, cta, links } from "@/content/site";

export const metadata: Metadata = {
  title: "關於我們｜富來思科技",
  description: "InfoFlask（富來思科技股份有限公司）成立於 2023 年，致力於將 AI 導入投資流程，讓投資變得更簡單。創辦人從股票分析師的研究經驗出發，希望用 AI 讓投資研究更有效率、更容易使用。",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const f = aboutPage.founder;
  return (
    <>
      {/* 使命 */}
      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-24">
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-teal">About</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.2] tracking-tight text-navy">{aboutPage.title}</h1>
          <div className="mt-6 max-w-2xl space-y-3 text-[1.05rem] leading-[1.85] text-ink-2">
            {aboutPage.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3 max-w-2xl">
            <div>
              <dt className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">公司</dt>
              <dd className="mt-1 text-[15px] font-medium text-navy">{brand.legalName}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">成立</dt>
              <dd className="mt-1 text-[15px] font-medium text-navy tnum">{brand.founded} 年</dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink-3">領域</dt>
              <dd className="mt-1 text-[15px] font-medium text-navy">AI・金融科技・投資研究</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 創辦人的故事 */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="lg:sticky lg:top-24 self-start">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-teal">Founder</p>
            <p className="mt-3 text-[1.6rem] font-bold tracking-tight text-navy">
              {f.name} <span className="text-[1.1rem] font-medium text-ink-2">{f.nameEn}</span>
            </p>
            <p className="text-[15px] text-ink-2">{f.role}</p>
            {links.founderLinkedIn ? (
              <a
                href={links.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-[13.5px] font-medium text-navy hover:border-navy hover:bg-mist"
              >
                <LinkedInIcon />
                LinkedIn 個人檔案
                <span className="sr-only">（開啟新視窗）</span>
              </a>
            ) : null}
            <p className="mt-6 text-[13.5px] leading-relaxed text-ink-3">曾任股票分析師。InfoFlask 源自研究工作中對繁瑣流程的實際觀察。</p>
          </div>
          <article className="max-w-2xl">
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold tracking-tight text-navy">{f.storyTitle}</h2>
            <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.9] text-ink">
              {f.story.map((p, i) => (
                <p key={i} className={i === 3 ? "font-semibold text-navy" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </article>
        </div>
      </Section>

      {/* Mission / Vision / Philosophy */}
      <Section tone="navy">
        <div className="grid gap-6 md:grid-cols-3">
          {aboutPage.pillars.map((p) => (
            <div key={p.en} className="rounded-2xl border border-white/15 bg-white/5 p-7">
              <p className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-teal-100">{p.en}</p>
              <p className="mt-3 text-[1.2rem] font-semibold leading-snug text-white">{p.zh}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-navy-100">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.6rem] font-bold tracking-tight text-navy">一起探索 AI 在投資研究中的應用。</h2>
          <div className="mt-6">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
