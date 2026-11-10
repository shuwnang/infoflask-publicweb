import { statusLabel, type FeatureStatus } from "@/content/site";

export function StatusBadge({ status, className = "" }: { status: FeatureStatus; className?: string }) {
  const cls =
    status === "beta"
      ? "bg-brand-50 text-brand-700 border-brand-100"
      : "bg-amber-50 text-amber-800 border-amber-200";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${cls} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "beta" ? "bg-brand" : "bg-amber-500"}`} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[12.5px] font-semibold tracking-[0.12em] uppercase text-brand-600 ${className}`}>{children}</p>;
}
