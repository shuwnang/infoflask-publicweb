import { featureStatus, type FeatureStatus } from "./site";

export const productPage = {
  title: "從資訊到洞察，讓 AI 協助你的投資研究。",
  lead: "產品功能頁依照實際研究流程，依序說明 InfoFlask 如何運作：從整合企業資訊、建立有依據的假設，到模擬財務報表與持續更新。",
};

export interface Feature {
  id: string;
  n: string;
  title: string;
  summary: string;
  scenario: string;
  value: string[];
  status: FeatureStatus;
  /** 展示元件代號（由頁面對應） */
  demo: "integration" | "feap" | "simulate" | "knobs" | "update";
}

export const features: Feature[] = [
  {
    id: "integration",
    n: "01",
    title: "企業資訊整合",
    summary: "整合企業財報、附註、公告、產業資訊及研究資料，讓使用者不必在大量不同資料來源之間反覆切換。",
    scenario: "研究一家公司時，財報主表、附註拆分、法說會內容、重大訊息、月營收與券商報告散落各處。InfoFlask 將它們整理到同一個研究空間，並區分「已公布的事實」與「關於未來的資訊」。",
    value: ["減少跨來源切換與重複整理的時間", "每一筆資料保留出處與可得時間，日後可追溯", "為後續的假設與預測提供一致的資料基礙"],
    status: featureStatus.integration,
    demo: "integration",
  },
  {
    id: "feap",
    n: "02",
    title: "FEAP 研究架構",
    summary: "透過事實、證據、假設與預測的關聯，協助使用者理解研究資訊如何影響模擬結果。",
    scenario: "AI 建議「明年營收年增 10%」時，你可以直接看到它依據了哪幾份券商報告與法說會內容，哪些證據尚未納入，以及這個假設最後影響了哪幾個預測數字。",
    value: ["預測不是黑盒子：每個數字都能回溯到依據", "假設失準時可以歸因，知道是哪個環節需要修正", "新證據出現時，系統會列出受影響的假設"],
    status: featureStatus.feap,
    demo: "feap",
  },
  {
    id: "simulate",
    n: "03",
    title: "AI 模擬財務報表",
    summary: "根據使用者確認的財務假設，模擬企業未來的營收、毛利、營業利益及 EPS。",
    scenario: "確認假設後，系統以一致的財務公式計算未來四季的簡易損益表、資產負債表與現金流量表，並和近八季實際數字並列，讓趨勢一眼可見。",
    value: ["從假設到三表一次算完，不必手動維護試算表", "歷史實際與未來預測同一張表對照", "基準、樂觀、保守情境分別計算、分別比較"],
    status: featureStatus.simulate,
    demo: "simulate",
  },
  {
    id: "knobs",
    n: "04",
    title: "互動式假設旋鈕",
    summary: "自行調整重要變數，快速比較不同情境下的模擬結果。",
    scenario: "你認為毛利率會比 AI 建議的更保守，直接把旋鈕調低兩個百分點，右側的營業利益與 EPS 立即重算，並標示與 AI 基準的差距。",
    value: ["用自己的判斷覆寫 AI 建議，而不是只能全盤接受", "即時看到單一變數對獲利的影響幅度", "每次調整都形成新版本，可以回頭比較"],
    status: featureStatus.knobs,
    demo: "knobs",
  },
  {
    id: "update",
    n: "05",
    title: "新資訊快速更新",
    summary: "將新的研究發現加入分析流程，協助使用者持續調整原有假設與財務預測。",
    scenario: "一則「主要客戶增加採購」的消息出現。你把它輸入系統，AI 分析可能影響的變數並提出候選假設，你確認後，模擬報表在原有版本之上更新，並呈現前後差異。",
    value: ["研究是持續的過程，不必每次從頭重做", "新資訊與既有證據是否衝突，一併提示", "更新前後差異清楚可見"],
    status: featureStatus.update,
    demo: "update",
  },
];
