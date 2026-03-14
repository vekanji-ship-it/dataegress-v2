// dataegress-v2/app/tw/page.tsx
import Link from "next/link";
import { Metadata } from "next";

// 🌟 針對台港市場的專屬 SEO 設定
export const metadata: Metadata = {
  title: "DataEgress | 專為台港 SEO 顧問打造的內部連結自動化工具",
  description: "告別 10 小時的 Excel 地獄。將 GSC 數據轉化為可執行的內部連結 To-Do List，支援繁體中文主題叢集語義分析。",
  alternates: {
    canonical: 'https://www.dataegress.com/tw',
    languages: {
      'en-US': 'https://www.dataegress.com',
    },
  },
};

export default function TaiwanLandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* 🌟 痛點直擊標籤 */}
        <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6 inline-block">
          拒絕無效的黑盒子 AI
        </span>
        
        {/* 🌟 核心價值主張 (H1) */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
          把 GSC 冰冷數據，<br className="hidden md:block" />
          變成工程師看得懂的 <span className="text-blue-600">內部連結清單</span>
        </h1>
        
        {/* 🌟 副標題 (H2) 凸顯效率 */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Screaming Frog 的報表有幾萬行，但你的時間很寶貴。
          DataEgress 專為 agency 與 SEO 顧問設計，精準抓取「主題叢集」，
          將 10 小時的 Excel mapping 縮短為 20 分鐘的專業審閱。
        </p>

        {/* 🌟 行動呼籲 (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/pricing" // 導向您的計費頁或註冊頁
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            免費匯入 GSC 數據實測
          </Link>
          <Link 
            href="/blog" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-300 hover:border-blue-500 text-gray-700 font-bold rounded-xl shadow-sm transition-colors"
          >
            查看繁體中文案例
          </Link>
        </div>

        {/* 🌟 信任指標 (Social Proof) */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 font-semibold uppercase tracking-widest">
            核心技術支援
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60 grayscale">
            {/* 這裡可以放 Ahrefs, GSC, Notion 等 Icon，增強專業感 */}
            <span className="font-bold text-xl">Google Search Console</span>
            <span className="font-bold text-xl">Ahrefs</span>
          </div>
        </div>
      </div>
    </main>
  );
}