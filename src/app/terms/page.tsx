import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "服務條款",
  description: "InfoFlask（富來思科技）網站服務條款：服務內容、非投資建議聲明、智慧財產權、責任限制。",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return <LegalPage title={terms.title} sections={terms.sections} />;
}
