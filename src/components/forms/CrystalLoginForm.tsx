"use client";

import Link from "next/link";
import { useState } from "react";
import { crystalUrl } from "@/content/site";

/**
 * InfoFlask Crystal 工作台登入表單（官網入口）。
 * - 後端尚未接上時（NEXT_PUBLIC_CRYSTAL_URL 未設定）：送出只顯示「尚未開放」，不假裝登入成功。
 * - 設定後：原生表單 POST 到 `${NEXT_PUBLIC_CRYSTAL_URL}/login`（工作台自己發 cookie 並導向首頁），官網不經手密碼。
 */
export function CrystalLoginForm() {
  const connected = Boolean(crystalUrl);
  const [notice, setNotice] = useState(false);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    if (connected) return; // 交給瀏覽器原生送出
    ev.preventDefault();
    setNotice(true);
  };

  return (
    <form
      method="post"
      action={connected ? `${crystalUrl}/login` : undefined}
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card"
    >
      <input type="hidden" name="next" value="/" />
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
        <p className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-brand-600">InfoFlask Crystal</p>
      </div>
      <h2 className="mt-2 text-[22px] font-bold tracking-tight text-ink">登入工作台</h2>
      <p className="mt-1 text-[14px] text-ink-2">帳號由邀請制發放；早期體驗名單依序開放。</p>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="crystal-username" className="text-[14px] font-medium text-ink">
            帳號
          </label>
          <input
            id="crystal-username"
            name="username"
            autoComplete="username"
            required
            className="mt-1.5 w-full rounded-lg border border-line-strong px-3.5 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20"
          />
        </div>
        <div>
          <label htmlFor="crystal-password" className="text-[14px] font-medium text-ink">
            密碼
          </label>
          <input
            id="crystal-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1.5 w-full rounded-lg border border-line-strong px-3.5 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20"
          />
        </div>
      </div>

      {notice && (
        <div role="status" className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
          <p className="font-semibold">工作台尚未對外開放</p>
          <p className="mt-1">
            登入入口已準備好，後端正在調整中；開放後會通知早期體驗名單。還沒申請的話，請先
            <Link href="/early-access/" className="ml-1 font-medium text-brand-700 underline underline-offset-4">
              申請搶先體驗
            </Link>
            。
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-600 px-7 text-[15px] font-semibold text-white hover:bg-brand-700 active:bg-brand-800 sm:w-auto"
        >
          登入
        </button>
        <Link href="/early-access/" className="text-[14px] font-medium text-brand-700 underline-offset-4 hover:underline">
          還沒有帳號？申請搶先體驗
        </Link>
      </div>
      <p className="mt-5 text-[12.5px] leading-relaxed text-ink-3">
        {connected ? "登入後由工作台（另一個網域）處理，官網不保存你的密碼。" : "目前僅為入口頁面，不會傳送任何資料。"}
      </p>
    </form>
  );
}
