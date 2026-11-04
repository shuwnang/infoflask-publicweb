import type { ReactNode } from "react";

/** 產品畫面外框（瀏覽器視窗風格），讓產品截圖式展示有一致外觀 */
export function DeviceFrame({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-white shadow-float overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 h-10">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        {title && <span className="ml-2 text-[12px] text-ink-3 truncate">{title}</span>}
      </div>
      {children}
    </div>
  );
}
