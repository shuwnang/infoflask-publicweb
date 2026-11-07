"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * 同一段功能底下的多個示範，用分頁切換，頁面長度只算一個示範。
 * 每個分頁內容都留在畫面結構中（hidden 切換），切回來時保留操作狀態。
 */
export function DemoTabs({ label, tabs }: { label: string; tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="mb-3 inline-flex flex-wrap gap-1 rounded-xl border border-line bg-mist p-1">
        {tabs.map((t, i) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-${t.id}-tab`}
              aria-controls={`${base}-${t.id}`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`rounded-lg px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${on ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,41,63,.12)]" : "text-ink-2 hover:text-ink"}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`${base}-${t.id}`} aria-labelledby={`${base}-${t.id}-tab`} hidden={t.id !== active}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
