// app/terms/page.tsx
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">服務條款</h1>
        <div className="prose prose-slate max-w-none">
          <p>最後更新：{new Date().toLocaleDateString('zh-TW', { month: 'long', year: 'numeric' })}</p>
          
          <h3>1. 同意條款</h3>
          <p>使用 DataEgress 即表示你同意本服務條款的所有規定。如果你不同意，請勿繼續使用本網站。</p>
          
          <h3>2. 聯盟行銷聲明</h3>
          <p>DataEgress 為讀者支持型平台。本網站部分連結為聯盟行銷連結，當你透過這些連結購買商品或服務時，我們可能獲得佣金，對你的費用不會有任何影響。所有工具評測均基於我們的獨立研究與實際使用體驗。</p>

          <h3>3. 內容免責聲明</h3>
          <p>DataEgress 提供的所有資訊僅供教育與參考用途。雖然我們盡力保持工具定價與功能資訊的準確性，但由於各服務商隨時可能更新方案，我們無法保證所有資訊完全即時。使用前請以各工具官方網站資訊為準。</p>

          <h3>4. 智慧財產權</h3>
          <p>本網站所有原創內容，包含評測、教學與網站設計，均為 DataEgress 所有，受著作權法保護。未經明確授權，不得轉載或重製本網站內容。</p>
        </div>
      </div>
    </div>
  );
}
