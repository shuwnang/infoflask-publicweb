import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "white" | "mist" | "navy";

const toneClass: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "bg-navy text-white",
};

export function Section({
  id,
  tone = "white",
  children,
  className = "",
  narrow = false,
  padded = true,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  padded?: boolean;
}) {
  return (
    <section id={id} className={`${toneClass[tone]} ${padded ? "py-16 sm:py-24" : ""} ${className}`}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleEn,
  lead,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  titleEn?: string;
  lead?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <p className={`text-[13px] font-semibold tracking-[0.12em] uppercase mb-3 ${invert ? "text-teal-100" : "text-teal"}`}>{eyebrow}</p>
      )}
      {titleEn && (
        <p className={`font-semibold text-xl sm:text-2xl mb-1 tracking-tight ${invert ? "text-white" : "text-navy"}`}>{titleEn}</p>
      )}
      <h2 className={`text-[1.75rem] sm:text-[2.25rem] leading-[1.25] font-bold tracking-tight ${invert ? "text-white" : "text-navy"}`}>{title}</h2>
      {lead && <div className={`mt-5 text-[1.05rem] leading-[1.8] ${invert ? "text-navy-100" : "text-ink-2"}`}>{lead}</div>}
    </div>
  );
}
