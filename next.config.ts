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
};

export default nextConfig;