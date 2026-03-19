import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net', // 🌟 授權 OpenAI
        port: '',
        pathname: '/**',
      },
      // (如果你還有其他外部圖片，例如 Unsplash，也可以加在這裡)
    ],
  },
  
  // ✅ 新增：處理 Google Search Console 報錯的重定向邏輯
  async redirects() {
    return [
      {
        source: '/tools',
        destination: '/stack', // 將舊路徑導向目前的工具棧頁面
        permanent: true,       // 設定為 true 代表 301 永久重定向，有利於轉移 SEO 權重
      },
    ];
  },
};

export default nextConfig;