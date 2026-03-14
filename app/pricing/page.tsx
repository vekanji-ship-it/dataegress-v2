// dataegress-v2/app/pricing/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "定價方案 | DataEgress - 透明且可預測的服務",
  description: "專為 SEO 專業人士與代理商設計的透明定價。無隱藏費用，隨時可取消。",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- 標題區塊 --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            簡單透明，拒絕 <span className="text-blue-600">SaaS 陷阱。</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            根據您的需求選擇方案。我們幫您把 GSC 數據變成可請款的專業報表。 
            <strong className="text-gray-900"> 目前金流系統升級中，開放早期名單預約。</strong>
          </p>
        </div>

        {/* --- 定價卡片區塊 --- */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 方案 1: 個人接案版 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">個人接案版 (Solo)</h3>
            <p className="text-gray-500 mb-6 h-12">適合管理少數客戶網站的獨立 SEO 自由職業者。</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$29</span>
              <span className="text-gray-500 font-medium">/月</span>
            </div>
            {/* 🌟 調整：導向預約表單而非支付頁 */}
            <Link href="https://your-form-link.com" className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center font-bold rounded-xl transition-colors mb-8">
              預約早期測試名單
            </Link>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">✅ <span className="font-medium">最多 3 個活動專案</span></li>
              <li className="flex items-center gap-3">✅ <span>每月 10,000 個 URL 抓取</span></li>
              <li className="flex items-center gap-3">✅ <span>AI 主題叢集 (Topic Cluster) 對齊</span></li>
              <li className="flex items-center gap-3 text-gray-400">❌ <span>客製化白牌 PDF 報表</span></li>
            </ul>
          </div>

          {/* 方案 2: 專業代理商版 (主推) */}
          <div className="bg-blue-600 rounded-3xl p-8 border border-blue-600 shadow-xl transform md:-translate-y-4 relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
              高 ROI 推薦方案
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">代理商版 (Agency Pro)</h3>
            <p className="text-blue-100 mb-6 h-12">專為規模化團隊設計，快速產出可直接請款的專業審計報表。</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">$99</span>
              <span className="text-blue-200 font-medium">/月</span>
            </div>
            <Link href="https://your-form-link.com" className="block w-full py-3 px-4 bg-white hover:bg-gray-50 text-blue-600 text-center font-bold rounded-xl shadow-md transition-colors mb-8">
              申請創始人 5 折優惠
            </Link>
            <ul className="space-y-4 text-blue-50">
              <li className="flex items-center gap-3">✅ <span className="font-bold text-white">最多 15 個活動專案</span></li>
              <li className="flex items-center gap-3">✅ <span>每月 100,000 個 URL 抓取</span></li>
              <li className="flex items-center gap-3">✅ <span>AI 全自動內部連結地圖</span></li>
              <li className="flex items-center gap-3">🔥 <span className="font-bold text-white">白牌 PDF 報表 (直接發給客戶)</span></li>
              <li className="flex items-center gap-3">✅ <span>優先 API 技術支援</span></li>
            </ul>
          </div>
        </div>

        {/* --- 🌟 新增：與 Blog 內容連結的區塊 --- */}
        <div className="mt-24 bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">不相信 AI？看看我們的實戰結果</h2>
          <p className="text-gray-600 mb-8">我們利用這套 AI 引擎產出了數十篇排名第一的文章。點擊下方看我們的內容策略。</p>
          <Link href="/blog" className="text-blue-600 font-bold hover:underline">
            瀏覽我們的 AI 實戰案例庫 →
          </Link>
        </div>

        {/* --- 翻譯後的 FAQ --- */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">常見問答 (No-BS FAQ)</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">會有任何隱藏費用或加購模組嗎？</h4>
              <p className="text-gray-600">絕對不會。我們跟您一樣討厭「工具陷阱」。您訂閱的級別包含所有標註的功能，若超過 URL 限制，系統會提示您手動升級，不會自動刷卡。</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">我可以隨時取消嗎？</h4>
              <p className="text-gray-600">可以。我們不搞年約綁架，您可以隨時在後台一鍵終止服務，我們不會設下任何重重關卡。</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">為什麼「代理商版」價值 $99 美金？</h4>
              <p className="text-gray-600">因為它只要成交一個客戶就回本了。白牌 PDF 報表讓您省下數小時的盤點時間，這份時間成本遠高於 $99 美金。</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}