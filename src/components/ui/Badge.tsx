import { statusLabel, type FeatureStatus } from "@/content/site";

export function StatusBadge({ status, className = "" }: { status: FeatureStatus; className?: string }) {
  const cls =
    status === "beta"
      ? "bg-teal-50 text-teal-700 border-teal-100"
      : "bg-amber-50 text-amber-800 border-amber-200";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${cls} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "beta" ? "bg-teal" : "bg-amber-500"}`} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}

export function DemoTag({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`inline-flex items-start gap-2 text-[12.5px] text-ink-3 ${className}`}>
      <svg className="mt-[3px] h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 7v4.2M8 4.8v.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span>{text}</span>
    </p>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[12.5px] font-semibold tracking-[0.12em] uppercase text-teal ${className}`}>{children}</p>;
}
