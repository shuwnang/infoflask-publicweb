import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, brand, seoKeywords } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${brand.name}｜${brand.tagline}`, template: `%s｜${brand.name}` },
  description:
    "InfoFlask（富來思科技）開發 InfoFlask Crystal：輸入股票代號，AI 在 7 分鐘內完成一份台股財報預估，每一項財務假設都附上出處。",
  keywords: [...seoKeywords],
  applicationName: brand.name,
  authors: [{ name: brand.legalName }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: brand.name,
    url: SITE_URL,
    title: `${brand.name}｜${brand.tagline}`,
    description: "台股 AI 財報預估：輸入股票代號，7 分鐘完成一份財報預估，每一項財務假設都附上出處。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "InfoFlask：台股 AI 財報預估，7 分鐘完成一家公司" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0081CC",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={inter.variable}>
      <body className="min-h-dvh flex flex-col bg-white text-ink">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          跳到主要內容
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
