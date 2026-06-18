import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DataEgress | 用 AI 工作的真實紀錄',
  description: '記錄上班族與學生用 AI 工具實際工作的過程，包含踩坑與成功案例。不賣神話，只說真實。',
  verification: {
    google: '0N2QeqjiEH6k4GEPUfmGalaiGLNT4gUGRDJvs-LylHI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-slate-50 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-DDER4SF7Y3" />
    </html>
  );
}
