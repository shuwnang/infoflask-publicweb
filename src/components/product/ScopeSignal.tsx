/**
 * Scope 頁面裝飾圖：市場訊號被「放大鏡」局部放大的意象。
 * 純裝飾、不表示任何真實資料（aria-hidden）。
 */
export function ScopeSignal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 320" className={className} aria-hidden="true" fill="none">
      <defs>
        <clipPath id="scope-lens">
          <circle cx="372" cy="150" r="92" />
        </clipPath>
        <linearGradient id="scope-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-brand)" stopOpacity="0" />
          <stop offset="0.15" stopColor="var(--color-brand)" stopOpacity="1" />
          <stop offset="0.85" stopColor="var(--color-brand)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 網格 */}
      {[60, 110, 160, 210, 260].map((y) => (
        <line key={y} x1="0" x2="560" y1={y} y2={y} stroke="var(--color-line)" strokeDasharray="2 6" />
      ))}

      {/* 雜訊層：原始訊號（細、灰） */}
      <path
        d="M0 190 C20 170 30 230 50 205 S80 150 100 180 S130 240 150 200 S180 160 200 178 S230 210 250 190 S280 120 300 160 S330 230 350 185 S380 100 400 150 S430 210 450 170 S480 130 500 160 S530 200 560 170"
        stroke="var(--color-viz-base)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* 平滑後趨勢（品牌藍，兩端淡出） */}
      <path
        d="M0 205 C60 200 90 196 140 190 S230 176 290 168 S380 140 440 150 S520 165 560 160"
        stroke="url(#scope-fade)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* 成交量柱（極淡） */}
      {Array.from({ length: 28 }).map((_, i) => {
        const h = 10 + ((i * 37) % 23);
        return <rect key={i} x={8 + i * 20} y={300 - h} width="8" height={h} rx="2" fill="var(--color-navy-100)" opacity="0.6" />;
      })}

      {/* 放大鏡內容：放大的同一段訊號 */}
      <g clipPath="url(#scope-lens)">
        <circle cx="372" cy="150" r="92" fill="var(--color-brand-50)" />
        {[100, 150, 200].map((y) => (
          <line key={y} x1="280" x2="464" y1={y} y2={y} stroke="var(--color-brand-100)" />
        ))}
        <path
          d="M284 196 C300 150 312 230 326 188 S350 86 372 130 S404 220 426 168 S448 100 462 128"
          stroke="var(--color-viz-base)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M284 176 C320 170 340 150 372 140 S430 128 462 134" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
        {/* 標記點 */}
        <circle cx="372" cy="140" r="6" fill="var(--color-brand)" stroke="white" strokeWidth="2.5" />
        <circle cx="426" cy="131" r="6" fill="var(--color-viz-bull)" stroke="white" strokeWidth="2.5" />
      </g>
      {/* 放大鏡外框與握柄 */}
      <circle cx="372" cy="150" r="92" stroke="var(--color-navy)" strokeWidth="4" fill="none" />
      <circle cx="372" cy="150" r="99" stroke="var(--color-brand-200)" strokeWidth="1.5" fill="none" />
      <line x1="437" y1="215" x2="500" y2="278" stroke="var(--color-navy)" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
