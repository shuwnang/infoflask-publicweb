import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, brand, seoKeywords } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const noto = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${brand.name}｜${brand.tagline}`, template: `%s｜${brand.name}` },
  description:
    "InfoFlask（富來思科技）致力於將 AI 導入投資流程。從整合企業資訊、建立財務假設到 AI 模擬財務報表，協助投資人更有效率地理解企業，形成自己的研究觀點。",
  keywords: [...seoKeywords],
  applicationName: brand.name,
  authors: [{ name: brand.legalName }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: brand.name,
    url: SITE_URL,
    title: `${brand.name}｜${brand.tagline}`,
    description: "讓 AI 融入投資研究，讓投資更簡單。AI 模擬財務報表：你的研究，你的預測。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "InfoFlask — Turn Information into Insight." }],
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
    <html lang="zh-Hant" className={`${inter.variable} ${noto.variable}`}>
      <body className="min-h-dvh flex flex-col bg-white text-ink">
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
