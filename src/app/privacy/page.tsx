import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "InfoFlask（富來思科技）網站隱私權政策：我們如何蒐集、處理與利用你的個人資料。",
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage title={privacy.title} sections={privacy.sections} />;
}
