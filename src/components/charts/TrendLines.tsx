"use client";

import { useId, useState } from "react";
import { useWidth } from "./useWidth";

export interface LineSeries {
  key: string;
  label: string;
  color: string;
  values: number[];
  dashed?: boolean;
}

/**
 * 多序列折線圖（SVG）：2px 線、≥8px 端點、2px 面色環、十字線尋 X、單一工具提示列出所有序列。
 */
export function TrendLines({
  categories,
  series,
  format,
  height = 220,
  ariaLabel,
  forecastFrom,
}: {
  categories: string[];
  series: LineSeries[];
  format: (v: number) => string;
  height?: number;
  ariaLabel: string;
  /** 從第幾個索引起為預測期（以底色標示） */
  forecastFrom?: number;
}) {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const { ref, width } = useWidth<HTMLElement>();
  const W = Math.max(300, width);
  const H = height;
  const padL = 44;
  const padR = 16;
  const padT = 14;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = categories.length;

  const all = series.flatMap((s) => s.values);
  const maxV = Math.max(...all);
  const minV = Math.min(...all);
  const span = maxV - minV || 1;
  const yMax = maxV + span * 0.15;
  const yMin = Math.min(0, minV - span * 0.15) === 0 && minV >= 0 ? Math.max(0, minV - span * 0.3) : minV - span * 0.15;
  const x = (i: number) => padL + (plotW * i) / Math.max(1, n - 1);
  const y = (v: number) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const ticks = 3;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => yMin + ((yMax - yMin) * i) / ticks);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - padL) / plotW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <figure className="w-full" ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="block max-w-full h-auto touch-none"
        role="img"
        aria-labelledby={`${id}-t`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <title id={`${id}-t`}>{ariaLabel}</title>
        {forecastFrom !== undefined && forecastFrom < n && (
          <rect x={x(forecastFrom) - (forecastFrom > 0 ? plotW / (n - 1) / 2 : 0)} y={padT} width={W - padR - x(forecastFrom) + (forecastFrom > 0 ? plotW / (n - 1) / 2 : 0)} height={plotH} fill="rgba(0,129,204,0.06)" />
        )}
        {tickVals.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#e8ecf0" strokeWidth="1" />
            <text x={padL - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="#6c767f" className="tnum">
              {format(t)}
            </text>
          </g>
        ))}
        {categories.map((c, i) => {
          const every = plotW / Math.max(1, n - 1) < 44 ? 2 : 1;
          if (i % every !== 0 && i !== n - 1) return null;
          return (
            <text key={c} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11.5" fill={i >= (forecastFrom ?? n) ? "#0081cc" : "#464e55"}>
              {c}
            </text>
          );
        })}
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={padT} y2={padT + plotH} stroke="#cbd2d8" strokeWidth="1" />}
        {series.map((s) => {
          const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
          const last = s.values.length - 1;
          return (
            <g key={s.key}>
              <path d={d} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? "5 4" : undefined} />
              <circle cx={x(last)} cy={y(s.values[last])} r="5.5" fill="#fff" />
              <circle cx={x(last)} cy={y(s.values[last])} r="4" fill={s.color} />
              {hover !== null && (
                <>
                  <circle cx={x(hover)} cy={y(s.values[hover])} r="6" fill="#fff" />
                  <circle cx={x(hover)} cy={y(s.values[hover])} r="4" fill={s.color} />
                </>
              )}
            </g>
          );
        })}
        {/* 透明命中層 */}
        <rect x={padL} y={padT} width={plotW} height={plotH} fill="transparent" />
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-ink-2">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-2">
            <svg width="18" height="6" aria-hidden="true">
              <line x1="0" x2="18" y1="3" y2="3" stroke={s.color} strokeWidth="2" strokeDasharray={s.dashed ? "4 3" : undefined} />
            </svg>
            {s.label}
          </span>
        ))}
        {forecastFrom !== undefined && (
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-[2px] bg-brand/10 border border-brand/20" aria-hidden="true" />
            預測期
          </span>
        )}
      </div>

      <div className="min-h-[40px] mt-2" aria-live="polite">
        {hover !== null && (
          <div className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-line bg-white px-3 py-2 text-[13px] shadow-card">
            <span className="font-semibold text-ink">{categories[hover]}</span>
            {series.map((s) => (
              <span key={s.key} className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-3 rounded" style={{ background: s.color }} aria-hidden="true" />
                <strong className="tnum text-ink">{format(s.values[hover])}</strong>
                <span className="text-ink-3">{s.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
