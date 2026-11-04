"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formEndpoint } from "@/content/site";

const USER_TYPES = ["個人投資人", "專業分析師", "資產管理機構", "其他"] as const;
const LS_KEY = "infoflask_early_access_submitted_at";
const DUP_WINDOW_MS = 24 * 60 * 60 * 1000;

type Status = "idle" | "submitting" | "success" | "error";

/**
 * 搶先體驗表單。
 * - 端點：NEXT_PUBLIC_FORM_ENDPOINT（Formspree 或相容服務）；未設定時明確顯示尚未開放，不假裝成功。
 * - 驗證：必填、Email 格式、同意隱私告知；honeypot 欄位防機器人；送出中鎖定按鈕；24 小時內重複送出提示。
 */
export function EarlyAccessForm() {
  const configured = Boolean(formEndpoint);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMsg, setServerMsg] = useState("");
  const [recent, setRecent] = useState(false);
  const [override, setOverride] = useState(false);

  useEffect(() => {
    try {
      const t = Number(localStorage.getItem(LS_KEY) || 0);
      if (t && Date.now() - t < DUP_WINDOW_MS) setRecent(true);
    } catch {
      /* 無法讀取 localStorage 時忽略 */
    }
  }, []);

  const validate = (fd: FormData) => {
    const e: Record<string, string> = {};
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const type = String(fd.get("user_type") || "");
    if (!name) e.name = "請輸入姓名";
    if (!email) e.email = "請輸入電子郵件";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "電子郵件格式不正確";
    if (!type) e.user_type = "請選擇使用者類型";
    if (!fd.get("consent")) e.consent = "送出前請閱讀並同意隱私告知";
    if (String(fd.get("_gotcha") || "")) e._gotcha = "spam";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!configured || status === "submitting") return;
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      if (e._gotcha) setStatus("success"); // 機器人：靜默
      return;
    }
    setStatus("submitting");
    setServerMsg("");
    try {
      const payload = {
        name: String(fd.get("name")).trim(),
        email: String(fd.get("email")).trim(),
        user_type: String(fd.get("user_type")),
        problem: String(fd.get("problem") || "").trim(),
        _subject: "InfoFlask 搶先體驗申請",
        source: "infoflask.com/early-access",
      };
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        try {
          localStorage.setItem(LS_KEY, String(Date.now()));
        } catch {
          /* ignore */
        }
        form.reset();
      } else {
        let msg = "送出失敗，請稍後再試。";
        try {
          const j = (await res.json()) as { errors?: { message?: string }[]; error?: string };
          if (j.errors?.length) msg = j.errors.map((x) => x.message).filter(Boolean).join("；") || msg;
          else if (j.error) msg = j.error;
        } catch {
          /* ignore */
        }
        setServerMsg(msg);
        setStatus("error");
      }
    } catch {
      setServerMsg("無法連線到表單服務，請檢查網路後再試。");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-teal/40 bg-teal-50/60 p-8 text-center">
        <svg className="mx-auto h-10 w-10 text-teal" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
          <path d="m12.5 20.5 5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="mt-4 text-[20px] font-semibold text-navy">已收到你的申請</h2>
        <p className="mt-2 text-[14.5px] text-ink-2">我們會依序寄出早期體驗邀請與後續說明。感謝你的關注。</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card">
      {!configured && (
        <div role="status" className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
          <p className="font-semibold">表單尚未開放送出</p>
          <p className="mt-1">尚未設定表單服務端點（NEXT_PUBLIC_FORM_ENDPOINT）。設定完成前，這裡不會接受申請，也不會顯示假的成功訊息。</p>
        </div>
      )}
      {recent && !override && configured && (
        <div role="status" className="mb-5 rounded-lg border border-line bg-mist px-4 py-3 text-[13.5px] text-ink-2">
          這個瀏覽器在 24 小時內已送出過申請。若需更正資料，可以
          <button type="button" className="ml-1 font-medium text-teal-700 underline underline-offset-4" onClick={() => setOverride(true)}>
            再送一次
          </button>
          。
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="姓名" id="name" error={errors.name} required>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} className={inputCls(!!errors.name)} />
        </Field>
        <Field label="電子郵件" id="email" error={errors.email} required>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={!!errors.email} className={inputCls(!!errors.email)} />
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="text-[14px] font-medium text-navy">
          使用者類型 <span className="text-teal" aria-hidden="true">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {USER_TYPES.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-[14px] has-[:checked]:border-teal has-[:checked]:bg-teal-50 hover:bg-mist">
              <input type="radio" name="user_type" value={t} className="accent-teal" />
              {t}
            </label>
          ))}
        </div>
        {errors.user_type && (
          <p className="mt-1.5 text-[12.5px] text-red-700" role="alert">
            {errors.user_type}
          </p>
        )}
      </fieldset>

      <Field label="最希望解決的投資研究問題（選填）" id="problem" className="mt-5">
        <textarea id="problem" name="problem" rows={4} maxLength={1000} className={inputCls(false)} placeholder="例如：想更快評估新訂單對明年獲利的影響…" />
      </Field>

      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          請勿填寫
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 text-[13.5px] text-ink-2">
        <input type="checkbox" name="consent" className="mt-1 accent-teal" aria-invalid={!!errors.consent} />
        <span>
          我已閱讀並同意 InfoFlask 依{" "}
          <Link href="/privacy/" className="text-teal-700 underline underline-offset-4">
            隱私權政策
          </Link>{" "}
          使用我提供的資料，僅用於早期體驗名單管理與產品聯繫。
        </span>
      </label>
      {errors.consent && (
        <p className="mt-1.5 text-[12.5px] text-red-700" role="alert">
          {errors.consent}
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-800">
          {serverMsg}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!configured || status === "submitting" || (recent && !override)}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-teal px-7 text-[15px] font-semibold text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "送出中…" : "申請早期體驗"}
        </button>
        <p className="text-[12.5px] text-ink-3">送出即表示你同意我們以電子郵件與你聯繫早期體驗事項。</p>
      </div>
    </form>
  );
}

function Field({ label, id, error, required, className = "", children }: { label: string; id: string; error?: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[14px] font-medium text-navy">
        {label}
        {required && (
          <span className="text-teal ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[12.5px] text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(invalid: boolean) {
  return `w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25 ${
    invalid ? "border-red-400" : "border-line-strong"
  }`;
}
