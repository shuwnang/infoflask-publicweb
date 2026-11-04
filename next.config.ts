import type { NextConfig } from "next";

// 靜態輸出：GitHub Pages 以 out/ 目錄部署；trailingSlash 讓 /product 對應 out/product/index.html
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
