import type { Metadata } from "next";
import Link from "next/link";
import { CrystalLoginForm } from "@/components/forms/CrystalLoginForm";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { crystalUrl, cta, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "登入 InfoFlask Crystal 工作台",
  description: "InfoFlask Crystal 財務預測工作台登入入口：從基礎版本開始，加入你的證據、調整重大參數，產生三表預測與評價。",
  alternates: { canonical: "/crystal/login/" },
  robots: { index: false, follow: true },
};

const STEPS = [
  ["基礎版本", "用現行假設先算一版三表當底"],
  ["證據與補充", "重要證據一覽，用一句話補充你知道的事"],
  ["重大參數", "選保守／基準／樂觀，調整後即時試算"],
  ["三表與評價", "三表預測、河流圖、同業散佈圖、目標價"],
] as const;

export default function CrystalLoginPage() {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_420px_at_80%_-10%,rgba(0,129,204,0.12),transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brand-600">Workspace</p>
            <h1 className="mt-3 text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.2] tracking-tight text-ink">InfoFlask Crystal 工作台</h1>
            <div className="mt-3">
              <StatusBadge status="beta" />
            </div>
            <p className="mt-5 text-[1.05rem] leading-[1.8] text-ink-2">
              輸入股票代號，從基礎版本開始建立你的財務預測：系統整理證據、AI 推導假設，你只調整重大參數，最後得到三表預測與評價。
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="rounded-xl border border-line bg-white p-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-[13px] font-bold text-white">{i + 1}</span>
                  <p className="mt-2 text-[15px] font-semibold text-ink">{t}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[14px] text-ink-2">
              想先了解產品？
              <Link href={routes.crystal} className="ml-1 font-medium text-brand-700 underline-offset-4 hover:underline">
                了解 InfoFlask Crystal
              </Link>
            </p>
          </div>
          {crystalUrl ? <CrystalLoginForm /> : <ComingSoon />}
        </div>
      </div>
    </section>
  );
}

/** 工作台後端接上（NEXT_PUBLIC_CRYSTAL_URL 有值）之前，不顯示可輸入帳密的表單，改為說明。 */
function ComingSoon() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
        <p className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-brand-600">InfoFlask Crystal</p>
      </div>
      <h2 className="mt-2 text-[22px] font-bold tracking-tight text-ink">工作台即將開放</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">工作台目前以邀請制進行測試，尚未提供公開登入。想參與測試，請申請搶先體驗。</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={cta.primary.href}>{cta.primary.label}</Button>
        <Button href={routes.crystal} variant="secondary">
          了解 InfoFlask Crystal
        </Button>
      </div>
    </div>
  );
}
