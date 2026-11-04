import type { ReactNode } from "react";

export function Container({ children, className = "", narrow = false }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return <div className={`mx-auto w-full ${narrow ? "max-w-3xl" : "max-w-[1200px]"} px-5 sm:px-8 ${className}`}>{children}</div>;
}
