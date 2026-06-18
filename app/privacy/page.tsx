// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">隱私權政策</h1>
        <div className="prose prose-slate max-w-none">
          <p>最後更新：{new Date().toLocaleDateString('zh-TW', { month: 'long', year: 'numeric' })}</p>
          
          <h3>1. 我們收集哪些資料</h3>
          <p>我們只收集你主動提供的資料，例如透過 Beehiiv 訂閱電子報時填寫的電子信箱，或直接聯絡我們時提供的資訊。我們也使用標準的網站分析工具，收集匿名的瀏覽行為資料，用於改善內容品質。</p>
          
          <h3>2. 我們如何使用你的資料</h3>
          <p>你的資料僅用於發送電子報、回覆你的詢問，以及改善 DataEgress 的使用體驗。我們絕對不會出售、出租或濫發你的電子信箱。</p>

          <h3>3. Cookie 與追蹤</h3>
          <p>我們使用 Cookie 了解你如何與本網站互動，以及追蹤聯盟行銷連結的點擊行為。當你點擊聯盟連結（例如 Make.com、Notion 等工具）時，你的瀏覽器會存放一個 Cookie，用於將推薦歸屬到 DataEgress。</p>

          <h3>4. 第三方服務</h3>
          <p>本網站包含第三方工具與網站的連結。我們對這些外部網站的隱私權實踐或內容不負任何責任。在提供個人資料前，請先詳閱各服務的隱私權政策。</p>
        </div>
      </div>
    </div>
  );
}
