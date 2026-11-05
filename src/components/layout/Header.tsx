"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { Button } from "@/components/ui/Button";
import { cta, links, nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-line" : "bg-white border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="rounded-md" aria-label="InfoFlask 首頁">
          <LogoMark className="h-9 w-9 text-ink" />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="主要導覽">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`rounded-md px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                isActive(n.href) ? "text-ink bg-navy-50" : "text-ink-2 hover:text-ink hover:bg-mist"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {links.platformLogin && (
            <Button href={links.platformLogin} variant="ghost">
              登入平台
            </Button>
          )}
          <Button href={cta.primary.href}>{cta.primary.label}</Button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-mist"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "關閉選單" : "開啟選單"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-line bg-white">
          <nav className="mx-auto max-w-[1200px] px-5 py-4 flex flex-col gap-1" aria-label="行動版導覽">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-[16px] font-medium ${isActive(n.href) ? "bg-navy-50 text-ink" : "text-ink-2"}`}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {links.platformLogin && (
                <Button href={links.platformLogin} variant="secondary" size="lg">
                  登入平台
                </Button>
              )}
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
