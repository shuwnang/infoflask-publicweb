export const useCasesPage = {
  title: "從研究資訊，探索企業未來的可能性。",
  lead: "以實際的研究問題為主題，說明 InfoFlask 如何應用在投資研究工作中。所有案例皆使用虛構企業與示意數字。",
};

export const useCases = [
  {
    id: "new-order",
    n: "情境一",
    title: "新的客戶訂單",
    question: "公司取得新的客戶訂單，未來獲利可能增加多少？",
    steps: ["使用者輸入新訂單資訊", "AI 協助提出營收成長假設", "使用者確認或調整假設", "系統重新計算模擬財務報表"],
    demo: "order" as const,
  },
  {
    id: "pricing",
    n: "情境二",
    title: "產品價格變化",
    question: "如果產品價格提高 5%，公司的毛利與 EPS 可能如何改變？",
    steps: ["透過財務假設旋鈕調整產品價格", "營收與毛利率隨之連動", "展示模擬財務報表的變化"],
    demo: "price" as const,
  },
  {
    id: "views",
    n: "情境三",
    title: "不同研究觀點",
    question: "同一家公司，在不同成長假設下，未來財務表現有什麼差異？",
    steps: ["建立基準、樂觀、保守三種情境", "各情境分別記錄假設與依據", "比較不同假設下的營收、營業利益及 EPS"],
    demo: "scenarios" as const,
  },
];
