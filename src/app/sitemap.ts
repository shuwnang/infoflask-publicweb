import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/product/", priority: 0.9 },
    { path: "/use-cases/", priority: 0.8 },
    { path: "/about/", priority: 0.7 },
    { path: "/early-access/", priority: 0.8 },
    { path: "/privacy/", priority: 0.3 },
    { path: "/terms/", priority: 0.3 },
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: now, changeFrequency: "monthly", priority: p.priority }));
}
