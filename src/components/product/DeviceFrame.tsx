import type { ReactNode } from "react";

/** 產品畫面外框（瀏覽器視窗風格），讓產品截圖有一致外觀 */
export function DeviceFrame({ title, badge, children, className = "" }: { title?: string; badge?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-white shadow-float overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 h-10">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        {title && <span className="ml-2 min-w-0 truncate text-[12px] text-ink-3">{title}</span>}
        {badge && <span className="ml-auto shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[11.5px] font-medium text-brand-700">{badge}</span>}
      </div>
      {children}
    </div>
  );
}
