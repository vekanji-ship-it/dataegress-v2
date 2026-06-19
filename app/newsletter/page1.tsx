export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
      
      <div className="text-center mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
          每週一封，免費訂閱
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Kmoji 電子報
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          每週分享一個 AI 工具的真實用法，包含踩坑紀錄和實際設定步驟。
          <br className="hidden md:block" />
          適合上班族和學生，不賣神話，只說真實。
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📬</span>
            <div>
              <p className="font-bold text-slate-900">每週一封</p>
              <p className="text-slate-500 text-sm">固定週間發送，不騷擾</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛠️</span>
            <div>
              <p className="font-bold text-slate-900">真實工具測試</p>
              <p className="text-slate-500 text-sm">我用過才寫，包含失敗的部分</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-bold text-slate-900">上班族視角</p>
              <p className="text-slate-500 text-sm">不是給工程師看的，是給一般人看的</p>
            </div>
          </div>
        </div>

        <iframe
          src="https://embeds.beehiiv.com/a5bbe09e-c783-4936-a2c0-40e680e8ea4d"
          data-test-id="beehiiv-embed"
          width="100%"
          height="180"
          style={{ borderRadius: '8px', border: '0' }}
        />

        <p className="text-center text-xs text-slate-400 mt-4">
          免費訂閱，隨時可以取消
        </p>
      </div>

    </div>
  );
}
