import { SITE_URL, brand, links, routes } from "@/content/site";
import { aboutPage } from "@/content/about";

/**
 * 全站結構化資料（schema.org JSON-LD）：讓搜尋引擎把「InfoFlask／富來思科技」與本網站、
 * 創辦人與兩個產品對應起來。只放已公開且確定的資訊：不放聯絡方式、不放評價與定價。
 */
export function JsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  const founderId = `${SITE_URL}/about/#founder`;

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: brand.name,
      legalName: brand.legalName,
      alternateName: [brand.legalName, brand.legalNameEn],
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
      image: `${SITE_URL}/og.png`,
      slogan: brand.tagline,
      description: brand.mission,
      foundingDate: String(brand.founded),
      founder: { "@id": founderId },
      address: { "@type": "PostalAddress", addressCountry: "TW" },
      knowsLanguage: ["zh-Hant", "en"],
      knowsAbout: ["財報分析", "財報預估", "AI 模擬財務報表", "財務假設建模", "量化研究"],
    },
    {
      "@type": "Person",
      "@id": founderId,
      name: aboutPage.founder.name,
      alternateName: aboutPage.founder.nameEn,
      jobTitle: aboutPage.founder.role,
      worksFor: { "@id": orgId },
      url: `${SITE_URL}/about/`,
      ...(links.founderLinkedIn ? { sameAs: [links.founderLinkedIn] } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: brand.name,
      alternateName: brand.legalName,
      inLanguage: "zh-Hant",
      publisher: { "@id": orgId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}${routes.crystal}#product`,
      name: brand.productName,
      alternateName: `${brand.productName} | AI Financial Intelligence`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: `${SITE_URL}${routes.crystal}`,
      description: `AI 財報分析與財報預估工具（${brand.productDescriptor}）：整合財報、法說會與新聞等企業資訊，建立可追溯的財務假設，模擬營收、毛利率與 EPS 等財務報表。`,
      provider: { "@id": orgId },
    },
    {
      "@type": "ResearchProject",
      "@id": `${SITE_URL}${routes.scope}#product`,
      name: brand.productNameScope,
      alternateName: `${brand.productNameScope} | AI Market Intelligence`,
      url: `${SITE_URL}${routes.scope}`,
      description: "量化研究實驗室：以機器學習研究市場訊號的結構與規律。目前為內部研究用途，未對外銷售。",
      parentOrganization: { "@id": orgId },
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
