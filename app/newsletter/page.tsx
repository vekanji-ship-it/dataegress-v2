// app/newsletter/page.tsx
export default function NewsletterPage() {
  return (
    <div className="relative isolate flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      
      {/* 🌟 背景光暈特效 (深邃藍色調，象徵專業與隱私) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#1e3a8a] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="max-w-3xl mx-auto text-center z-10">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 mb-6 border border-blue-200 shadow-sm">
          💌 Join 1,000+ Solopreneurs & Digital Nomads
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Sovereignty</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Get weekly insights on privacy tools, SaaS marketing automation, and strategies to scale your digital empire. Zero fluff. No spam.
        </p>

        {/* 🌟 Beehiiv 嵌入表單區塊 */}
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-300">
          {/* ✅ 已修正：只保留純網址，並將高度設為 300 以完整顯示表單內容 */}
          <iframe 
            src="https://subscribe-forms.beehiiv.com/066502fb-90a9-4c4b-bbfc-bc97cc4eed96" 
            data-test-id="beehiiv-embed" 
            height="300" 
            frameBorder="0" 
            scrolling="no" 
            style={{ margin: 0, borderRadius: '0px', backgroundColor: 'transparent', width: '100%' }}
          ></iframe>
        </div>
        
        <p className="text-sm text-slate-500 mt-6 flex items-center justify-center gap-2">
          <span>🔒</span> 100% Secure. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}