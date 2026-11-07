import { benchmarks } from "@/content/benchmarks";
import { fmtEps } from "@/lib/format";

const err = (r: { actual: number; forecast: number }) => (r.forecast - r.actual) / r.actual;
const fmtErr = (e: number) => `${e >= 0 ? "+" : "−"}${Math.abs(e * 100).toFixed(1)}%`;

/** 單列的帶號誤差條：中央為 0，向右＝高估，向左＝低估；±50% 滿格。 */
function ErrBar({ e }: { e: number }) {
  const W = 120;
  const H = 10;
  const half = W / 2;
  const len = Math.min(Math.abs(e), 0.5) / 0.5 * (half - 2);
  const x = e >= 0 ? half : half - len;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="shrink-0">
      <line x1={half} y1={0} x2={half} y2={H} stroke="var(--color-line-strong)" strokeWidth={1} />
      <rect x={x} y={2} width={len} height={H - 4} rx={2} fill={e >= 0 ? "var(--color-brand)" : "var(--color-navy)"} />
    </svg>
  );
}

/**
 * 實測數據區塊：四個主數字、第三季逐家對帳（showRecon 打開才顯示，否則顯示預告）、券商對照、規模，以及限制說明。
 * 所有數字來自 src/content/benchmarks.ts（含出處與 as-of 日期）。
 */
export function Benchmarks() {
  const b = benchmarks;
  const sorted = [...b.recon.rows].sort((p, q) => Math.abs(err(p)) - Math.abs(err(q)));
  return (
    <div>
      <div className="max-w-3xl">
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">
          {b.eyebrow}
          <span className="ml-2 font-medium tracking-normal normal-case text-ink-3">{b.asOf} 更新</span>
        </p>
        <h2 className="mt-3 text-[1.75rem] sm:text-[2.25rem] leading-[1.25] font-bold tracking-tight text-ink">{b.title}</h2>
        <p className="mt-5 text-[1.05rem] leading-[1.8] text-ink-2">{b.lead}</p>
      </div>

      {/* 主數字 */}
      <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {b.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-white p-4 sm:p-5 shadow-float">
            <dt className="text-[12.5px] sm:text-[13.5px] font-medium leading-snug text-ink-2">{s.label}</dt>
            <dd className="mt-2">
              <span className="whitespace-nowrap">
                <span className="tnum text-[1.45rem] sm:text-[2rem] font-bold leading-none tracking-tight text-ink">{s.value}</span>
                <span className="ml-1 sm:ml-1.5 text-[12.5px] sm:text-[13px] font-medium text-ink-3">{s.unit}</span>
              </span>
              <p className="mt-3 text-[12px] sm:text-[12.5px] leading-[1.6] text-ink-3">{s.note}</p>
            </dd>
          </div>
        ))}
      </dl>

      {/* 逐家對帳：第三季財報全數公布、對帳完成前先顯示預告 */}
      {!b.showRecon ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line-strong bg-white/60 p-6">
          <h3 className="text-[1.05rem] font-bold text-ink">{b.reconPending.title}</h3>
          <p className="mt-2 max-w-3xl text-[14.5px] leading-[1.8] text-ink-2">{b.reconPending.text}</p>
        </div>
      ) : (
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <h3 className="text-[1.3rem] sm:text-[1.5rem] font-bold leading-[1.3] tracking-tight text-ink">{b.recon.title}</h3>
          <p className="mt-4 text-[15px] leading-[1.85] text-ink-2">{b.recon.desc}</p>
          <ul className="mt-5 space-y-3 text-[14.5px] leading-[1.75] text-ink-2">
            {b.recon.findings.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[640px] border-collapse text-[13.5px]">
            <caption className="sr-only">2026 年第三季九家公司的實際 EPS、公布前預測 EPS 與誤差</caption>
            <thead>
              <tr className="text-[11.5px] uppercase tracking-[0.08em] text-ink-3">
                <th scope="col" className="px-4 py-3 text-left font-semibold">公司</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">實際 EPS</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">預測 EPS</th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">誤差</th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <span>低估</span>
                    <span aria-hidden="true" className="text-line-strong">｜</span>
                    <span>高估</span>
                  </span>
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">主要差異來源</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const e = err(r);
                return (
                  <tr key={r.company} className="border-t border-line">
                    <th scope="row" className="whitespace-nowrap px-4 py-2.5 text-left font-semibold text-ink">{r.company}</th>
                    <td className="tnum px-3 py-2.5 text-right text-ink">{fmtEps(r.actual)}</td>
                    <td className="tnum px-3 py-2.5 text-right text-ink-2">{fmtEps(r.forecast)}</td>
                    <td className={`tnum whitespace-nowrap px-3 py-2.5 text-right font-semibold ${Math.abs(e) > 0.15 ? "text-ink-2" : "text-ink"}`}>{fmtErr(e)}</td>
                    <td className="px-3 py-2.5"><ErrBar e={e} /></td>
                    <td className="px-4 py-2.5 text-[12.5px] leading-snug text-ink-3">{r.cause}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="border-t border-line px-4 py-2.5 text-[12px] text-ink-3">EPS 單位：新台幣元。誤差＝（預測－實際）／實際；誤差條以 ±50% 為滿格。依誤差由小到大排序。</p>
        </div>
      </div>
      )}

      {/* 券商對照與規模 */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h3 className="text-[1.05rem] font-bold text-ink">{b.brokers.title}</h3>
          <ul className="mt-4 divide-y divide-line">
            {b.brokers.items.map((it) => (
              <li key={it.k} className="py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[14px] font-medium text-ink-2">{it.k}</span>
                  <span className="tnum whitespace-nowrap text-[15px] font-semibold text-ink">{it.v}</span>
                </div>
                <p className="mt-1 text-[12.5px] leading-[1.6] text-ink-3">{it.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12.5px] leading-[1.6] text-ink-3">{b.brokers.note}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <h3 className="text-[1.05rem] font-bold text-ink">運作規模</h3>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {b.scale.map((s) => (
              <div key={s.k}>
                <dd className="tnum text-[1.5rem] font-bold leading-none tracking-tight text-ink">{s.v}</dd>
                <dt className="balance mt-1.5 text-[12.5px] leading-snug text-ink-3">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="mt-8 space-y-1.5 text-[12.5px] leading-[1.7] text-ink-3">
        {[...b.caveats, ...(b.showRecon ? [b.reconCaveat] : [])].map((c) => (
          <li key={c}>※ {c}</li>
        ))}
      </ul>
    </div>
  );
}
