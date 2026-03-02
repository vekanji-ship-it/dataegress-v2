// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 引入你之前的 Navbar
import Footer from "@/components/Footer"; // 🌟 引入剛寫好的 Footer

const inter = Inter({ subsets: ["latin"] });

// 全局 SEO 設定
export const metadata: Metadata = {
  title: "DataEgress | Scale Your Digital Empire",
  description: "Honest SaaS reviews, privacy tools, and automation workflows for solopreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 flex flex-col min-h-screen`}>
        {/* 全局頂部導覽列 */}
        <Navbar />
        
        {/* 網頁主要內容區塊 (會自動撐開高度) */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* 全局底部頁尾 */}
        <Footer />
      </body>
    </html>
  );
}