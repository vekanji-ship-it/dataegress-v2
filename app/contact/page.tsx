// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Let's Connect</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Have a question about a tool? Want to collaborate? Drop a message and we'll get back to you.
        </p>
      </div>

      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200 text-center transform hover:-translate-y-1 transition-transform duration-300">
        
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          👋
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Reach Out Directly</h2>
        <p className="text-slate-500 mb-8">
          The best way to reach us is via email or sliding into our DMs on Instagram.
        </p>

        <div className="space-y-4">
          {/* Email 按鈕 */}
          <a 
            href="mailto:mookie.kanji@gmail.com" 
            className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            <span className="mr-3">✉️</span> mookie.kanji@gmail.com
          </a>

          {/* Instagram 按鈕 */}
          <a 
            href="https://www.instagram.com/moji_ailife" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors shadow-sm"
          >
            <span className="mr-3">📸</span> DM on Instagram (@moji_ailife)
          </a>
        </div>
        
      </div>
    </div>
  );
}