/**
 * 網站層級設定：品牌、導覽、對外連結、表單端點、功能開發狀態。
 * 所有需要日後修改的「設定值」集中在此，文案見同目錄其他檔案。
 */

export const SITE_URL = "https://infoflask.com";

export const brand = {
  name: "InfoFlask",
  legalName: "富來思科技股份有限公司",
  legalNameEn: "InfoFlask Technology Co., Ltd.",
  founded: 2023,
  tagline: "Turn Information into Insight.",
  mission: "將 AI 導入投資流程，讓投資變得更簡單。",
  /** 兩個產品的對外名稱 */
  productName: "InfoFlask Crystal",
  productNameScope: "InfoFlask Scope",
  /** Crystal 的功能描述（舊稿主標題，現作為描述詞沿用） */
  productDescriptor: "AI 模擬財務報表",
  locale: "zh-Hant",
} as const;

/** 對外連結：尚未確認者留空字串，介面會自動隱藏，不放假連結。 */
export const links = {
  /** 創辦人 LinkedIn 個人檔案（待提供正確網址後填入，填入即啟用 About 頁連結） */
  founderLinkedIn: "https://www.linkedin.com/in/gswang/",
  /** 現有產品登入入口：官網上的 Crystal 工作台登入頁（11-06）；留空＝導覽不顯示「登入平台」 */
  platformLogin: "/crystal/login/",
  /** 對外聯絡信箱（目前不公開，留空＝不顯示） */
  contactEmail: "",
} as const;

/**
 * 搶先體驗表單端點（Formspree 或相容服務的 POST URL，例如 https://formspree.io/f/xxxxxxxx）。
 * 以建置時環境變數 NEXT_PUBLIC_FORM_ENDPOINT 注入；未設定時表單會明確顯示「尚未開放送出」，不會假裝成功。
 */
export const formEndpoint: string = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/**
 * Crystal 工作台（interact_web）的網址，例如 https://crystal.infoflask.com（不含結尾斜線）。
 * 以建置時環境變數 NEXT_PUBLIC_CRYSTAL_URL 注入；未設定時 /crystal/login/ 只是入口頁，送出會顯示「尚未開放」，不會傳送任何資料。
 */
export const crystalUrl: string = (process.env.NEXT_PUBLIC_CRYSTAL_URL ?? "").replace(/\/+$/, "");

export type FeatureStatus = "beta" | "dev";

export const statusLabel: Record<FeatureStatus, string> = {
  beta: "早期測試中",
  dev: "開發中",
};

/**
 * 功能開發狀態（對外描述必須與真實進度一致）。
 * beta＝已有可運作的早期版本、尚在封閉測試；dev＝設計完成或部分實作，尚未開放使用者操作。
 */
export const featureStatus = {
  integration: "beta" as FeatureStatus, // 企業資訊整合：財報／附註／法說會／新聞／券商資料入庫
  feap: "beta" as FeatureStatus, // FEAP 四層架構：已實作、每次預測皆記錄依據
  simulate: "beta" as FeatureStatus, // AI 模擬財務報表：證據→假設→三表的流程已可運作
  knobs: "dev" as FeatureStatus, // 互動式假設旋鈕：目前版本只能檢視與整批確認，逐一調整介面開發中
  update: "dev" as FeatureStatus, // 新資訊快速更新：引擎已有差量重算，使用者端輸入介面開發中
};

/** 產品路徑：Crystal 為唯一對外產品（沿用 /product/）；Scope 為量化研究實驗室，不放主導覽 */
export const routes = {
  crystal: "/product/",
  benchmarks: "/product/#benchmarks",
  scope: "/scope/",
} as const;

/** 主導覽（2026-11-07）：點 Logo 回首頁，所以不另列「首頁」；Scope 只放頁尾與首頁最後一段 */
export const nav = [
  { href: routes.crystal, label: "產品" },
  { href: routes.benchmarks, label: "實測數據" },
  { href: "/about/", label: "關於我們" },
] as const;

export const cta = {
  primary: { href: "/early-access/", label: "申請搶先體驗" },
  secondary: { href: routes.crystal, label: "了解 InfoFlask Crystal" },
} as const;

export const footerLinks = {
  site: [
    { href: "/", label: "首頁" },
    { href: routes.crystal, label: "InfoFlask Crystal" },
    { href: routes.benchmarks, label: "實測數據" },
    { href: "/about/", label: "關於我們" },
    { href: routes.scope, label: "Scope 研究實驗室" },
    { href: "/crystal/login/", label: "登入工作台" },
  ],
  legal: [
    { href: "/early-access/", label: "申請搶先體驗" },
    { href: "/privacy/", label: "隱私權政策" },
    { href: "/terms/", label: "服務條款" },
  ],
} as const;

export const legalNotice =
  "InfoFlask 提供投資研究、財務報表模擬及分析輔助工具。相關預測結果具有假設性及不確定性，不構成個別證券買賣建議，亦不保證未來投資績效。";

export const demoDisclaimer = "互動示範，所有數據皆為示意，不代表真實企業預測。";

export const seoKeywords = [
  "InfoFlask",
  "InfoFlask Crystal",
  "InfoFlask Scope",
  "AI 投資研究",
  "量化研究",
  "AI 模擬財務報表",
  "AI 財報分析",
  "財報分析",
  "財報預估",
  "財報預測",
  "財務報表預測",
  "EPS 預估",
  "營收預估",
  "投資研究工具",
  "企業財務分析",
  "情境分析",
];
