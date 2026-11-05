"use client";

import { useId } from "react";

export function KnobSlider({
  label,
  code,
  value,
  min,
  max,
  step,
  onChange,
  format,
  baseline,
  hint,
}: {
  label: string;
  /** 對應產品旋鈕代號（例：A.REV_GROWTH_YOY） */
  code?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  /** AI 建議值；顯示為基準標記 */
  baseline?: number;
  hint?: string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  const basePct = baseline !== undefined ? ((baseline - min) / (max - min)) * 100 : undefined;
  const changed = baseline !== undefined && Math.abs(value - baseline) > 1e-9;
  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-medium text-ink">
          {label}
          {code && <span className="ml-2 font-mono text-[11px] font-normal text-ink-3 tracking-tight">{code}</span>}
        </label>
        <div className="text-right">
          <span className="tnum text-[15px] font-semibold text-ink">{format(value)}</span>
          {baseline !== undefined && (
            <span className="ml-2 text-[11.5px] text-ink-3 tnum">
              {changed ? `AI 建議 ${format(baseline)}` : "＝AI 建議"}
            </span>
          )}
        </div>
      </div>
      <div className="relative mt-1">
        {basePct !== undefined && (
          <span
            className="pointer-events-none absolute top-1/2 -mt-[7px] h-[14px] w-[2px] rounded bg-navy/40"
            style={{ left: `calc(${basePct}% + ${9 - (basePct / 100) * 18}px)` }}
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          type="range"
          className="knob"
          min={min}
          max={max}
          step={step}
          value={value}
          style={{ ["--pct" as string]: `${pct}%` }}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-valuetext={format(value)}
        />
      </div>
      <div className="flex justify-between text-[11px] text-ink-3 tnum">
        <span>{format(min)}</span>
        {hint ? <span className="text-ink-3">{hint}</span> : null}
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
