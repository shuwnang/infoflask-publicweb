/**
 * 示意用簡化財務模型：所有示範區塊共用同一套計算，確保畫面上的數字彼此一致。
 * 單位：新台幣百萬元；EPS 元。這不是真實產品引擎，僅用於官網示意。
 */

export interface Assumptions {
  /** 營收年增率，小數（0.12 = 12%） */
  revenueGrowth: number;
  /** 毛利率 */
  grossMargin: number;
  /** 營業費用率（營業費用 ÷ 營收） */
  opexRatio: number;
  /** 有效稅率 */
  taxRate: number;
}

export interface DemoCompany {
  name: string;
  /** 基期（上一年度）營收，百萬元 */
  baseRevenue: number;
  /** 經常性業外收支（每年，百萬元） */
  nonOperating: number;
  /** 流通在外股數（百萬股） */
  shares: number;
  /** 季節分配（四季合計 1） */
  seasonality: [number, number, number, number];
}

export interface IncomeStatement {
  revenue: number;
  grossProfit: number;
  grossMargin: number;
  opex: number;
  operatingIncome: number;
  operatingMargin: number;
  nonOperating: number;
  pretax: number;
  tax: number;
  netIncome: number;
  netMargin: number;
  eps: number;
}

/** 虛構示意公司：以中型電子零組件製造商的量級設定 */
export const demoCompany: DemoCompany = {
  name: "示意公司（虛構）",
  baseRevenue: 12_400,
  nonOperating: 180,
  shares: 520,
  seasonality: [0.22, 0.24, 0.26, 0.28],
};

/** AI 建議的基準假設（示意） */
export const baselineAssumptions: Assumptions = {
  revenueGrowth: 0.1,
  grossMargin: 0.31,
  opexRatio: 0.14,
  taxRate: 0.2,
};

export const knobRanges = {
  revenueGrowth: { min: -0.2, max: 0.4, step: 0.005 },
  grossMargin: { min: 0.15, max: 0.5, step: 0.0025 },
  opexRatio: { min: 0.06, max: 0.25, step: 0.0025 },
  taxRate: { min: 0.1, max: 0.3, step: 0.005 },
} as const;

export function simulate(a: Assumptions, c: DemoCompany = demoCompany): IncomeStatement {
  const revenue = c.baseRevenue * (1 + a.revenueGrowth);
  const grossProfit = revenue * a.grossMargin;
  const opex = revenue * a.opexRatio;
  const operatingIncome = grossProfit - opex;
  const pretax = operatingIncome + c.nonOperating;
  const tax = Math.max(0, pretax) * a.taxRate;
  const netIncome = pretax - tax;
  return {
    revenue,
    grossProfit,
    grossMargin: a.grossMargin,
    opex,
    operatingIncome,
    operatingMargin: revenue ? operatingIncome / revenue : 0,
    nonOperating: c.nonOperating,
    pretax,
    tax,
    netIncome,
    netMargin: revenue ? netIncome / revenue : 0,
    eps: netIncome / c.shares,
  };
}

/** 將年度結果依季節分配拆成四季（示意） */
export function quarterly(is: IncomeStatement, c: DemoCompany = demoCompany) {
  return c.seasonality.map((w, i) => ({
    label: `Q${i + 1}`,
    revenue: is.revenue * w,
    operatingIncome: is.operatingIncome * w,
    netIncome: is.netIncome * w,
    eps: is.eps * w,
  }));
}

/**
 * 產品售價調整對假設的影響（售價變化示範）：
 * 售價 +p、銷量與成本不變 → 營收 ×(1+p)，成本不變，毛利率 = 1 − (1−gm)/(1+p)。
 */
export function applyPriceChange(a: Assumptions, priceChange: number): Assumptions {
  const gm = 1 - (1 - a.grossMargin) / (1 + priceChange);
  const growth = (1 + a.revenueGrowth) * (1 + priceChange) - 1;
  return { ...a, revenueGrowth: growth, grossMargin: gm, opexRatio: a.opexRatio / (1 + priceChange) };
}

/** 新客戶訂單（新訂單示範）：訂單金額直接加到營收，毛利率與費用率維持 */
export function applyNewOrder(a: Assumptions, orderAmount: number, c: DemoCompany = demoCompany): Assumptions {
  const base = c.baseRevenue * (1 + a.revenueGrowth);
  const growth = (base + orderAmount) / c.baseRevenue - 1;
  return { ...a, revenueGrowth: growth };
}

/**
 * 「新增訂單約 9 億元」之後的假設（示意）：訂單計入營收；固定費用不變、營收擴大，費用率由 14.0% 降到 13.6%。
 * 首頁、產品畫面、版本紀錄都用這一組，確保同一則消息在全站算出同一個 EPS。
 */
export const afterNewOrderAssumptions: Assumptions = { ...applyNewOrder(baselineAssumptions, 900), opexRatio: 0.136 };

export const scenarios = {
  bear: { label: "保守情境", color: "var(--color-viz-bear)", a: { revenueGrowth: 0.02, grossMargin: 0.29, opexRatio: 0.145, taxRate: 0.2 } },
  base: { label: "基準情境", color: "var(--color-viz-adj)", a: baselineAssumptions },
  bull: { label: "樂觀情境", color: "var(--color-viz-bull)", a: { revenueGrowth: 0.18, grossMargin: 0.33, opexRatio: 0.135, taxRate: 0.2 } },
} as const;

export type ScenarioKey = keyof typeof scenarios;
