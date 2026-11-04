import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "找不到頁面", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-24 sm:py-32 text-center">
      <p className="tnum text-[13px] font-semibold tracking-[0.12em] uppercase text-teal">404</p>
      <h1 className="mt-3 text-[2rem] font-bold tracking-tight text-navy">找不到這個頁面。</h1>
      <p className="mt-3 text-[1.02rem] text-ink-2">網址可能已變更，或這個頁面尚未建立。</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">回到首頁</Button>
        <Button href="/product/" variant="secondary">
          產品功能
        </Button>
      </div>
    </section>
  );
}
