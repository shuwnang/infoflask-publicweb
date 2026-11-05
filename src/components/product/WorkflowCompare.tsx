const traditional = ["蒐集資料", "閱讀與整理", "手動修改試算表", "更新預測"];
const infoflask = ["整合資訊", "AI 建議假設", "使用者調整", "模擬報表更新"];

/** 兩種研究流程的並列比較（中性呈現工作流程差異，不誇大） */
export function WorkflowCompare() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Flow title="傳統研究流程" steps={traditional} tone="muted" note="每一次新資訊出現，多半要人工重新閱讀、整理，再回到試算表逐格修改。" />
      <Flow title="InfoFlask 的目標流程" steps={infoflask} tone="accent" note="AI 承擔整理與建議，使用者專注在判斷與調整；新資訊接在原有分析之後。" />
    </div>
  );
}

function Flow({ title, steps, tone, note }: { title: string; steps: string[]; tone: "muted" | "accent"; note: string }) {
  const accent = tone === "accent";
  return (
    <div className={`rounded-2xl border p-6 ${accent ? "border-brand/40 bg-brand-50/40" : "border-line bg-white"}`}>
      <p className={`text-[13px] font-semibold tracking-[0.06em] ${accent ? "text-brand-700" : "text-ink-3"}`}>{title}</p>
      <ol className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-y-4">
        {steps.map((s, i) => (
          <li key={s} className="relative flex flex-col items-start gap-2 pr-4">
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${accent ? "bg-brand-600 text-white" : "bg-navy-50 text-ink"}`}>{i + 1}</span>
            <span className="text-[14px] font-medium text-ink leading-snug">{s}</span>
            {i < steps.length - 1 && <span className={`hidden sm:block absolute right-1 top-4 h-px w-3 ${accent ? "bg-brand/50" : "bg-line-strong"}`} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[13.5px] text-ink-2 leading-relaxed">{note}</p>
    </div>
  );
}
