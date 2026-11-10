/**
 * InfoFlask Crystal 實際畫面（測試版工作台，2026-11-10 擷取）。
 * 全部取自同一份預測：3008 大立光，2026-11-06 完成，基準情境；「自己調整」是同一份預測在確認前的試算畫面。
 * 截圖時只隱藏帳號、券商數字、使用者自己的補充，以及官網沒有說明的欄位；畫面上的數字一律不改。
 * 檔案在 public/screens/：桌機 1280／2560 寬、手機 780／1170 寬（WebP）；換圖時同步更新下方尺寸。
 */
export interface Screen {
  /** public/screens/ 內的檔名前綴 */
  file: string;
  /** 外框標題列 */
  title: string;
  alt: string;
  caption: string;
  /** 桌機圖 1280 寬時的像素尺寸、手機圖 780 寬時的像素尺寸（給 width／height，避免版面跳動） */
  size: { w: number; h: number };
  mobile: { w: number; h: number };
  /** 畫面在下緣被裁切時加淡出 */
  fade?: boolean;
}

export const screenNote = "InfoFlask Crystal 測試版實際畫面：3008 大立光，2026 年 11 月 6 日完成的預測。數字為模型的研究模擬結果，不構成投資建議；部分欄位已隱藏。";

export const screens = {
  overview: {
    file: "crystal-overview",
    title: "總覽",
    alt: "InfoFlask Crystal 總覽畫面：3008 大立光 FY2026 至 FY2028 的 EPS 預估分別為 164.16、146.40、153.20 元，下方是每季 EPS 長條圖（實際與預測），以及營收季增率、毛利率等對 EPS 影響最大的參數。",
    caption: "總覽：保守、基準、樂觀三種情境的年度 EPS、每季 EPS，以及對 EPS 影響最大的假設。",
    size: { w: 1280, h: 766 },
    mobile: { w: 780, h: 886 },
  },
  assumptions: {
    file: "crystal-assumptions",
    title: "假設",
    alt: "InfoFlask Crystal 假設畫面：營收季增率逐季列出 2026Q4 到 2028Q4 的數值，毛利率逐年列出 FY2026 到 FY2028，右側列出依這些假設算出的營收、毛利率、淨利與 EPS。",
    caption: "假設：AI 讀完資料後提出的財務假設，逐季或逐年列出；你補充的資訊會換算成建議值，標在對應的假設上。",
    size: { w: 1280, h: 783 },
    mobile: { w: 780, h: 1280 },
    fade: true,
  },
  evidence: {
    file: "crystal-evidence",
    title: "證據",
    alt: "InfoFlask Crystal 證據畫面：方向性消息逐則列出影響的財務項目、正負方向、新聞原文，以及來源、日期與影響期間，例如工商時報 2026-11-05 報導潛望式鏡頭開始試產，影響期間 2027Q1。",
    caption: "證據：每一則資訊都標出影響的財務項目、方向、來源、日期，以及影響哪一段期間。",
    size: { w: 1280, h: 823 },
    mobile: { w: 780, h: 1044 },
    fade: true,
  },
  adjust: {
    file: "crystal-adjust",
    title: "假設｜自己調整",
    alt: "InfoFlask Crystal 調整假設畫面：把 2027Q1 營收季增率從 AI 建議的 -12.0% 改成 -6.7%，右側即時試算並列 AI 建議與你的調整，FY2027 EPS 由 146.40 元變為 155.01 元。",
    caption: "自己調整：把 2027Q1 營收季增率從 AI 建議的 −12.0% 改成 −6.7%，財務數字立即重算，和 AI 的版本並列比較。",
    size: { w: 1280, h: 760 },
    mobile: { w: 780, h: 1320 },
    fade: true,
  },
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
