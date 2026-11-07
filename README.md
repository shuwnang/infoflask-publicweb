# InfoFlask 官方網站（infoflask.com）

富來思科技股份有限公司（InfoFlask）正式企業官網。Next.js 15（App Router）＋ TypeScript ＋ Tailwind CSS v4，**純靜態輸出**（`next build` → `out/`），以 GitHub Pages 部署、Cloudflare 代管 DNS。

與 `prediction_web`（量化預測站 app.infoflask.com）、`interact_web`（財務預測互動站）**完全獨立**，不共用程式碼，也不讀取任何內部資料。

## 開發

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint         # ESLint
npx tsc --noEmit     # 型別檢查
npm run build        # 靜態輸出到 out/
python3 -m http.server 8787 --directory out   # 本機預覽建置結果
```

Node 20+。建置時 `next/font` 會下載 Inter（需要網路）。中文 11-07 起改用裝置內建字型（蘋方、微軟正黑體、思源黑體），不再下載 Noto Sans TC。

## 目錄

```
src/app/                 頁面（/、/product＝InfoFlask Crystal、/crystal/login＝Crystal 工作台登入入口（noindex）、/scope＝Scope 研究實驗室、/about、/early-access、/privacy、/terms、404）＋ sitemap.ts、robots.ts
src/content/             ★ 所有文案與設定集中於此（改字請改這裡）
  site.ts                品牌、導覽（產品／實測數據／關於我們）、CTA、對外連結（LinkedIn／登入／信箱）、表單端點、功能開發狀態、法律聲明
  home.ts / product.ts（Crystal）/ scope.ts（Scope）/ about.ts / legal.ts
  benchmarks.ts          ★ 實測數據（速度／成本／公司數／2026Q3 對帳），首頁數字列與 Crystal 頁共用 `stats`；每個數字須有說明書出處並標 asOf；費用是運算成本不是售價；`showRecon` 控制第三季對帳表（11-07 起先隱藏）
src/lib/finance.ts       示意用簡化財務模型（所有互動示範共用同一套計算；「新增訂單」後的假設只定義一次：`afterNewOrderAssumptions`）
src/components/
  layout/                Header、Footer、Logo（LogoPaths.tsx 由 AI 檔自動轉出，勿手改）
  ui/                    Button、Badge（功能狀態／示意標示）、Section、Container
  charts/                GroupedBars、TrendLines（純 SVG，含 hover／focus 工具提示）
  product/               HeroResultCard（首頁產品畫面）、HeroWorkspace（Crystal 頁產品畫面）、TextToNumbers、FeapFlow、UpdateFlow、KnobSimulator、DemoTabs（同一段的多個示範用分頁切換）、Benchmarks（實測數據）、ScopeSignal（Scope 裝飾圖）…
  forms/EarlyAccessForm  搶先體驗表單；forms/CrystalLoginForm 工作台登入（`NEXT_PUBLIC_CRYSTAL_URL` 未設定時，登入頁改顯示「工作台即將開放」，不出現帳密欄位）
  seo/JsonLd             全站結構化資料（schema.org：Organization／Person／WebSite／兩個產品），放在 layout
public/                  CNAME、logo.svg、logo-white.svg、icon.svg、favicon.ico、apple-touch-icon.png、og.png
BRAND.md                 ★ 品牌顏色表（色階、對比度、使用規則）
scripts/make_og.py       重新產生 og.png（需 Pillow、PyMuPDF、系統 Noto Sans CJK）
.github/workflows/deploy.yml   push main → 建置 → GitHub Pages
```

## 需要設定的項目

| 項目 | 位置 | 說明 |
|---|---|---|
| 搶先體驗表單端點 | GitHub repo → Settings → Secrets and variables → Actions → **Variables** → `NEXT_PUBLIC_FORM_ENDPOINT`（本機用 `.env.local`） | Formspree 或相容服務的 POST URL（如 `https://formspree.io/f/xxxxxxxx`）。未設定時表單會顯示「尚未開放送出」並停用送出鈕，不會假裝成功。 |
| 創辦人 LinkedIn | `src/content/site.ts` → `links.founderLinkedIn` | 填入正確網址後，About 頁才會顯示 LinkedIn 連結；留空＝不顯示。 |
| 登入入口 | `src/content/site.ts` → `links.platformLogin` | 指向官網的 `/crystal/login/`；頁首顯示為不顯眼的「登入」文字連結（工作台正式開放前不做成按鈕）。留空＝不顯示。 |
| Crystal 工作台網址 | GitHub Variables → `NEXT_PUBLIC_CRYSTAL_URL`（本機 `.env.local`） | interact_web 伺服器的公開網址（不含結尾斜線）。設定後 `/crystal/login/` 顯示登入表單並原生 POST 到 `<網址>/login`（工作台自己發 cookie）；未設定時顯示「工作台即將開放」說明。 |
| 對外信箱 | `src/content/site.ts` → `links.contactEmail` | 留空＝Footer 不顯示。 |
| 功能開發狀態 | `src/content/site.ts` → `featureStatus` | `beta`＝早期測試中、`dev`＝開發中；對外描述須與真實進度一致。 |
| 法律文件 | `src/content/legal.ts` | 隱私權政策與服務條款為**初稿**，正式使用前須經法律審查。 |

## 部署（GitHub Pages ＋ 自訂網域）

1. 在 GitHub 建立新 repo（例如 `shuwnang/infoflask-publicweb`），推上 `main`。
2. Repo → Settings → Pages → Build and deployment → Source 選 **GitHub Actions**。
3. 第一次 push 後 workflow 會自動建置並發佈；`public/CNAME` 內容為 `infoflask.com`，Pages 會自動套用自訂網域。
4. Cloudflare DNS：
   - 移除現有 `infoflask.com` → `app.infoflask.com` 的 301 轉址規則（Page Rule／Redirect Rule）。
   - `infoflask.com` A 記錄指向 GitHub Pages IP（185.199.108.153 / 109.153 / 110.153 / 111.153），`www` CNAME 指向 `shuwnang.github.io`。
   - Pages 設定中勾選 Enforce HTTPS（DNS 生效後）。
   - `app.infoflask.com` 維持原樣，不受影響。
5. 表單端點以 Actions Variable 注入（見上表）。

## 內容與品牌規範（摘要）

- 品牌色取自 logo：品牌藍 `#0081CC`、墨黑 `#231916`；完整色階、對比度與使用規則見 **`BRAND.md`**，程式中的 token 在 `src/app/globals.css` 的 `@theme`（`brand-*`／`navy-*`／`ink-*`）。文字與按鈕用 `brand-600`／`brand-700`，`brand`（500）只用於圖形、標記與大面積色塊。
- 品牌句只有兩句：英文標語 **Turn Information into Insight.**，中文 **AI，讓投資變得更簡單。**（放在首頁最後的理念段與頁尾）。其他主標一律寫具體描述：做什麼、給誰、產出什麼、多快。
- 首頁第一屏（11-07 改版）：主標「輸入股票代號，7 分鐘完成財報預估。」＋產品畫面；順序為 產品 → 實測數字 → 四個步驟 → 為什麼可信 → 理念。
- 對外只有一個產品 **InfoFlask Crystal**（台股 AI 財報預估，頁面 `/product/`，三項核心功能）。**InfoFlask Scope** 是量化研究實驗室（頁面 `/scope/`，不在主導覽；內部研究用途、未對外銷售，不連結 app.infoflask.com、不展示任何績效數字）。
- 對外不用內部用語：FEAP 寫成「事實、證據、假設、預測」，旋鈕寫成「假設」，差量寫成「只更新受影響的假設」，不顯示 A.REV_GROWTH_YOY 這類程式代號。FEAP 定義仍以 `financial_model_project/schema/FEAP_ARCHITECTURE_20261019.md` 為準。
- 11-07 起不再對外使用 Your Research, Your Model.、AI-Assisted, Human-Controlled.、AI Financial Intelligence、AI Market Intelligence 等標語（結構化資料的 alternateName 除外）。
- 預測產出是**三表**（損益表、資產負債表、現金流量表）與**三種情境**（保守、基準、樂觀），全站用語一致。
- 中文標題只在標點與空白處換行（`globals.css` 對 h1～h3 與 `.balance` 設定）；數字與單位之間用不換行空格 `\u00a0`，例如 `7\u00a0分鐘`。
- 所有示範數字皆為虛構示意，頁面上一律標示「互動示範，所有數據皆為示意，不代表真實企業預測。」
- 不宣稱自動選股／交易、不保證獲利、不虛構客戶與評價、不公開定價、未完成功能標「開發中」。
- 實測數據（`src/content/benchmarks.ts`）只放說明書或對帳筆記裡查得到的數字，標明日期、樣本數與口徑，並附「不代表未來準確度」的限制說明；展示的費用是 AI 運算成本，不是售價。
