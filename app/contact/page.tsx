// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">聯絡我們</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          對工具有疑問？想合作？歡迎直接聯絡，我們會盡快回覆。
        </p>
      </div>

      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200 text-center transform hover:-translate-y-1 transition-transform duration-300">
        
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          👋
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">直接聯絡我們</h2>
        <p className="text-slate-500 mb-8">
          透過 Email 或 Instagram 私訊都可以找到我們。
        </p>

        <div className="space-y-4">
          <a 
            href="mailto:Nexkanji@gmail.com" 
            className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            <span className="mr-3">✉️</span> Nexkanji@gmail.com
          </a>

          <a 
            href="https://www.instagram.com/moji_ailife" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-sm"
          >
            <span className="mr-3">📸</span> Instagram 私訊（@moji_ailife）
          </a>
        </div>
        
      </div>
    </div>
  );
}
