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

Node 20+。建置時 `next/font` 會下載 Inter 與 Noto Sans TC（需要網路）。

## 目錄

```
src/app/                 頁面（/、/product＝InfoFlask Crystal、/scope＝InfoFlask Scope、/about、/early-access、/privacy、/terms、404）＋ sitemap.ts、robots.ts
src/content/             ★ 所有文案與設定集中於此（改字請改這裡）
  site.ts                品牌、導覽、CTA、對外連結（LinkedIn／登入／信箱）、表單端點、功能開發狀態、法律聲明
  home.ts / product.ts（Crystal）/ scope.ts（Scope）/ about.ts / legal.ts
src/lib/finance.ts       示意用簡化財務模型（所有互動示範共用同一套計算）
src/components/
  layout/                Header、Footer、Logo（LogoPaths.tsx 由 AI 檔自動轉出，勿手改）
  ui/                    Button、Badge（功能狀態／示意標示）、Section、Container
  charts/                GroupedBars、TrendLines（純 SVG，含 hover／focus 工具提示）
  product/               HeroWorkspace、Workbench、FeapFlow、KnobSimulator、UpdateFlow、TextToNumbers、ScopeSignal（Scope 裝飾圖）…
  forms/EarlyAccessForm  搶先體驗表單
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
| 登入平台入口 | `src/content/site.ts` → `links.platformLogin` | 目前無公開入口，留空＝導覽不顯示「登入平台」。 |
| 對外信箱 | `src/content/site.ts` → `links.contactEmail` | 留空＝Footer 不顯示。 |
| 功能開發狀態 | `src/content/site.ts` → `featureStatus` | `beta`＝早期測試中、`dev`＝開發中；對外描述須與真實進度一致。 |
| 法律文件 | `src/content/legal.ts` | 隱私權政策與服務條款為**初稿**，正式使用前須經法律審查。 |

## 部署（GitHub Pages ＋ 自訂網域）

1. 在 GitHub 建立新 repo（例如 `shuwnang/infoflask-web`），推上 `main`。
2. Repo → Settings → Pages → Build and deployment → Source 選 **GitHub Actions**。
3. 第一次 push 後 workflow 會自動建置並發佈；`public/CNAME` 內容為 `infoflask.com`，Pages 會自動套用自訂網域。
4. Cloudflare DNS：
   - 移除現有 `infoflask.com` → `app.infoflask.com` 的 301 轉址規則（Page Rule／Redirect Rule）。
   - `infoflask.com` A 記錄指向 GitHub Pages IP（185.199.108.153 / 109.153 / 110.153 / 111.153），`www` CNAME 指向 `<帳號>.github.io`。
   - Pages 設定中勾選 Enforce HTTPS（DNS 生效後）。
   - `app.infoflask.com` 維持原樣，不受影響。
5. 表單端點以 Actions Variable 注入（見上表）。

## 內容與品牌規範（摘要）

- 品牌色取自 logo：品牌藍 `#0081CC`、墨黑 `#231916`；完整色階、對比度與使用規則見 **`BRAND.md`**，程式中的 token 在 `src/app/globals.css` 的 `@theme`（`brand-*`／`navy-*`／`ink-*`）。文字與按鈕用 `brand-600`／`brand-700`，`brand`（500）只用於圖形、標記與大面積色塊。
- 品牌標語唯一：**Turn Information into Insight.**；使命：將 AI 導入投資流程，讓投資變得更簡單。
- 兩個產品：**InfoFlask Crystal**（AI Financial Intelligence，主力，頁面 `/product/`；功能描述沿用「AI 模擬財務報表」，不以「財務建模」作主標題）與 **InfoFlask Scope**（AI Market Intelligence，量化研究實驗室，頁面 `/scope/`；目前為內部研究用途、未對外銷售，頁面不連結 app.infoflask.com、不展示任何績效數字）。
- 差異化主題 **Your Research, Your Model.**，其下支持原則 **AI-Assisted, Human-Controlled.**
- FEAP 定義以 `financial_model_project/schema/FEAP_ARCHITECTURE_20261019.md` 為準；旋鈕代號（A.REV_GROWTH_YOY 等）取自 `schema/seed/knob_metric_map.yaml`。
- 所有示範數字皆為虛構示意，頁面上一律標示「互動示範，所有數據皆為示意，不代表真實企業預測。」
- 不宣稱自動選股／交易、不保證獲利、不虛構客戶與評價、不公開定價、未完成功能標「開發中」。
