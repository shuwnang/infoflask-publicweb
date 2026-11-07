/**
 * InfoFlask Scope 頁文案。
 * 2026-11-07 改版：定位從「產品」改為「量化研究實驗室」，移出主導覽；五個研究領域各留一句，
 * 研究原則與研究現況合併。2026-11-05 使用者提供的原始文案在 git 歷史中。
 */

export const scope = {
  eyebrow: "Research Lab",
  name: "InfoFlask Scope",
  descriptor: "量化研究實驗室",
  title: "用統計與機器學習，研究台股的市場訊號。",
  lead: "從價格、成交量、籌碼及市場行為中，運用統計分析與機器學習，辨識一般圖表不容易察覺的變化及潛在規律。",
  badge: "內部研究用途・未對外銷售",
};

export interface ScopeArea {
  id: string;
  n: string;
  name: string;
  text: string;
}

export const scopeAreasHeading = "研究領域";

export const scopeAreas: ScopeArea[] = [
  {
    id: "amplify",
    n: "01",
    name: "市場訊號",
    text: "整合股價、成交量、籌碼與技術指標，辨識價格動能、資金流向與市場結構中的潛在訊號。",
  },
  {
    id: "models",
    n: "02",
    name: "機器學習量化模型",
    text: "建立不同預測期間與投資風格的研究模型，涵蓋動能、趨勢、籌碼與短期市場行為。",
  },
  {
    id: "backtest",
    n: "03",
    name: "策略回測與驗證",
    text: "以歷史回測與樣本外驗證檢查交易成本、報酬分布、最大回撤與穩定性，並檢驗是否過度擬合。",
  },
  {
    id: "risk",
    n: "04",
    name: "市場風險觀測",
    text: "分析市場波動與風險狀態，觀察不同市場環境對量化策略的影響。",
  },
  {
    id: "platform",
    n: "05",
    name: "多模型研究平台",
    text: "自動更新資料、評分模型與追蹤策略，讓不同期間與邏輯的模型能獨立驗證、相互比較。",
  },
];

export const scopePrinciple = {
  title: "持續研究，不追求單一答案",
  text: "金融市場不斷變化，過去有效的規律未必能持續成立。Scope 不以任何單一模型作為答案，而是持續更新資料、測試模型與追蹤績效。我們相信，AI 的價值不是保證預測市場，而是用更有系統的方法研究市場。",
};

export const scopeStatus = {
  id: "status",
  title: "研究現況與合作洽詢",
  paras: [
    "Scope 目前用於 InfoFlask 內部的量化研究、模型開發與策略驗證，沒有規劃對外銷售或訂閱。",
    "若您是專業投資機構或量化研究團隊，有策略研究、模型驗證或技術合作的需求，歡迎與我們聯繫。我們會依研究需求、技術可行性、資料使用權與相關法規個別評估。",
  ],
  ctaLabel: "合作洽詢",
  ctaNote: "目前透過搶先體驗表單收件，請在需求說明欄註明「Scope 合作洽詢」。",
};

export const scopeDisclaimer =
  "本頁所述之模型訊號、歷史回測及模擬績效均屬量化研究內容，不代表實際交易績效或未來報酬保證，亦不構成個別證券投資建議。";
