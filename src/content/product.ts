import { featureStatus, type FeatureStatus } from "./site";

/** InfoFlask Crystal 產品頁文案（2026-11-05 依使用者提供文案改版） */
export const crystal = {
  eyebrow: "Product",
  name: "InfoFlask Crystal",
  en: "AI Financial Intelligence",
  title: "將無形資訊，凝結成具體的財務洞察。",
  lead: "把分散在財報、法說會、新聞及產業知識中的資訊，透過 FEAP 架構轉化為可調整、可追溯的財務假設與預測模型。",
};

export interface Feature {
  id: string;
  n: string;
  /** 功能名稱（目錄與小標） */
  name: string;
  /** 主標題 */
  title: string;
  paras: string[];
  status: FeatureStatus;
  /** 展示元件代號（由頁面對應） */
  demo: "integration" | "feap" | "simulate" | "knobs" | "update";
}

export const features: Feature[] = [
  {
    id: "subtraction",
    n: "01",
    name: "資料減法",
    title: "從海量資訊中，找到真正重要的訊號。",
    paras: [
      "整合企業財報、年報、法說會、財經新聞與產業資訊，運用 AI 語意理解與向量檢索技術，自動整理分散的研究資料。",
      "省去繁瑣的搜尋、擷取與彙整工作，將複雜資訊轉化為直觀、易於理解的研究內容，讓投資人把時間留給真正重要的分析與判斷。",
    ],
    status: featureStatus.integration,
    demo: "integration",
  },
  {
    id: "feap",
    n: "02",
    name: "FEAP 架構",
    title: "從事實到預測，讓每一步推論都有跡可循。",
    paras: [
      "將專業分析師的研究邏輯轉化為 FEAP 架構，以 Fact（事實）、Evidence（證據）、Assumption（假設）、Prediction（預測）串聯完整的財務分析流程。",
      "讓 AI 協助使用者從研究證據逐步建立財務假設，並透過模型推導出未來財務預測。每一項假設都有依據，每一個預測都能回溯。",
    ],
    status: featureStatus.feap,
    demo: "feap",
  },
  {
    id: "financialize",
    n: "03",
    name: "資訊財報化",
    title: "讓文字變成數字，讓觀點反映在財報上。",
    paras: [
      "投資研究不該停留在文字與想像。",
      "透過 AI 理解產業動態、企業資訊及使用者的個人研究觀點，將原本難以量化的資訊轉換為具體的財務假設，進一步反映至營收、毛利率、獲利與 EPS 預測。",
      "讓腦中的研究想法，快速成為看得見、算得出、可以驗證的財務結果。",
    ],
    status: featureStatus.simulate,
    demo: "simulate",
  },
  {
    id: "knobs",
    n: "04",
    name: "互動式假設旋鈕",
    title: "改變一個假設，看見不同的未來。",
    paras: [
      "企業的未來不只有一種可能。",
      "透過 AI 協助建立個人化財務假設，使用者可以自由調整營收成長、產品需求、毛利率等關鍵參數，即時比較不同情境下的財務預測結果。",
      "從保守到樂觀，讓使用者親自探索不同假設如何影響企業未來的獲利表現，而不是被動接受單一預測答案。",
    ],
    status: featureStatus.knobs,
    demo: "knobs",
  },
  {
    id: "update",
    n: "05",
    name: "快速動態更新",
    title: "市場不斷變化，研究也應該與時俱進。",
    paras: [
      "當企業公布最新法說會資訊、推出新產品，或產業供需發生重大變化時，AI 能協助辨識新資訊可能影響的財務假設，並快速更新相關預測。",
      "不必每次都從頭建立模型，讓財務研究能隨著新資訊持續調整，縮短市場事件發生到財務影響分析之間的時間差。",
    ],
    status: featureStatus.update,
    demo: "update",
  },
];
