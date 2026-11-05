import { legalMeta } from "@/content/legal";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string[] }[] }) {
  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">Legal</p>
      <h1 className="mt-3 text-[2rem] font-bold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-[13.5px] text-ink-3 tnum">最後更新：{legalMeta.updated}</p>
      <div role="note" className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
        {legalMeta.reviewNote}
      </div>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-[1.15rem] font-semibold text-ink">{s.h}</h2>
            <div className="mt-2 space-y-2 text-[15px] leading-[1.85] text-ink-2">
              {s.p.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
