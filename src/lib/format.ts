const nf0 = new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat("zh-TW", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 百萬元，整數千分位 */
export const fmtM = (v: number) => nf0.format(Math.round(v));

/** 元（EPS） */
export const fmtEps = (v: number) => nf2.format(v);

/** 百分比，預設一位小數 */
export const fmtPct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;

/** 帶正負號百分比 */
export const fmtPctSigned = (v: number, digits = 1) => `${v >= 0 ? "+" : "−"}${Math.abs(v * 100).toFixed(digits)}%`;

/** 帶正負號百分點 */
export const fmtPp = (v: number, digits = 1) => `${v >= 0 ? "+" : "−"}${Math.abs(v * 100).toFixed(digits)} 個百分點`;

/** 相對變動（a→b） */
export const delta = (from: number, to: number) => (from === 0 ? 0 : (to - from) / Math.abs(from));
