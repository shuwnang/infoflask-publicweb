"use client";

import { useId, useState } from "react";
import { fmtM } from "@/lib/format";
import { useWidth } from "./useWidth";

export interface BarSeries {
  key: string;
  label: string;
  color: string;
  values: number[];
  /** 是否直接標示數值（選擇性標示：只標重點系列） */
  labeled?: boolean;
}

/**
 * 分組柱狀圖（SVG）：共用單一 y 軸、柱寬 ≤ 24px、資料端 4px 圓角、相鄰柱 2px 留白、hover/focus 工具提示。
 */
export function GroupedBars({
  categories,
  series,
  unit = "百萬元",
  height = 240,
  ariaLabel,
}: {
  categories: string[];
  series: BarSeries[];
  unit?: string;
  height?: number;
  ariaLabel: string;
}) {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const { ref, width } = useWidth<HTMLElement>();
  const W = Math.max(300, width);
  const H = height;
  const padL = 48;
  const padR = 12;
  const padT = 18;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allVals = series.flatMap((s) => s.values);
  const maxV = Math.max(1, ...allVals);
  const minV = Math.min(0, ...allVals);
  const niceMax = niceCeil(maxV);
  const niceMin = minV < 0 ? -niceCeil(-minV) : 0;
  const y = (v: number) => padT + plotH - ((v - niceMin) / (niceMax - niceMin)) * plotH;
  const y0 = y(0);

  const band = plotW / categories.length;
  const n = series.length;
  const gap = 2;
  const barW = Math.min(24, (band * 0.62 - gap * (n - 1)) / n);
  const groupW = barW * n + gap * (n - 1);

  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => niceMin + ((niceMax - niceMin) * i) / ticks);

  return (
    <figure className="w-full" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block max-w-full h-auto" role="img" aria-labelledby={`${id}-t`}>
        <title id={`${id}-t`}>{ariaLabel}</title>
        {tickVals.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#e8ecf0" strokeWidth="1" />
            <text x={padL - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="#6c767f" className="tnum">
              {compact(t)}
            </text>
          </g>
        ))}
        <line x1={padL} x2={W - padR} y1={y0} y2={y0} stroke="#cbd2d8" strokeWidth="1" />

        {categories.map((c, ci) => {
          const gx = padL + band * ci + (band - groupW) / 2;
          const active = hover === ci;
          return (
            <g
              key={c}
              tabIndex={0}
              role="group"
              aria-label={`${c}：${series.map((s) => `${s.label} ${fmtM(s.values[ci])} ${unit}`).join("，")}`}
              onPointerEnter={() => setHover(ci)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(ci)}
              onBlur={() => setHover(null)}
              className="outline-none"
            >
              <rect x={padL + band * ci} y={padT} width={band} height={plotH} fill={active ? "rgba(11,41,63,0.035)" : "transparent"} />
              {series.map((s, si) => {
                const v = s.values[ci];
                const x = gx + si * (barW + gap);
                const top = Math.min(y(v), y0);
                const h = Math.max(0, Math.abs(y(v) - y0));
                return (
                  <g key={s.key}>
                    <path d={roundedBar(x, top, barW, h, v >= 0)} fill={s.color} opacity={active ? 1 : 0.92} />
                    {s.labeled && h > 0 && (
                      <text
                        x={x + barW / 2}
                        y={v >= 0 ? top - 5 : top + h + 12}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight={600}
                        fill="#231916"
                        className="tnum"
                      >
                        {compact(v)}
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={padL + band * ci + band / 2} y={H - 10} textAnchor="middle" fontSize="12" fill="#464e55">
                {c}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-ink-2">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
          </span>
        ))}
        <span className="ml-auto text-ink-3">單位：{unit}</span>
      </div>

      <div className="min-h-[40px] mt-2" aria-live="polite">
        {hover !== null && (
          <div className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-line bg-white px-3 py-2 text-[13px] shadow-card">
            <span className="font-semibold text-ink">{categories[hover]}</span>
            {series.map((s) => (
              <span key={s.key} className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-3 rounded" style={{ background: s.color }} aria-hidden="true" />
                <strong className="tnum text-ink">{fmtM(s.values[hover])}</strong>
                <span className="text-ink-3">{s.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}

function roundedBar(x: number, top: number, w: number, h: number, positive: boolean) {
  const r = Math.min(4, w / 2, h);
  if (h <= 0) return "";
  if (positive) {
    // 頂端圓角、底端（基線）方角
    return `M${x},${top + h} V${top + r} Q${x},${top} ${x + r},${top} H${x + w - r} Q${x + w},${top} ${x + w},${top + r} V${top + h} Z`;
  }
  const b = top + h;
  return `M${x},${top} V${b - r} Q${x},${b} ${x + r},${b} H${x + w - r} Q${x + w},${b} ${x + w},${b - r} V${top} Z`;
}

function niceCeil(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  const nice = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
  return nice * p;
}

function compact(v: number) {
  const a = Math.abs(v);
  if (a >= 10000) return `${(v / 1000).toFixed(0)}K`;
  if (a >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return `${Math.round(v)}`;
}
