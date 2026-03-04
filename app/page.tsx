// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfd]">
      
      {/* 🚀 1. Hero Section (主視覺：點出身份與價值) */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wider">
          For Solopreneurs & Digital Nomads
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
          The Ultimate Tech Stack <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            For One-Person Empires
          </span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          The average founder wastes $3,000/year on bloated SaaS. We curate, test, and compare the most cost-effective tools to help you protect, build, and scale your digital business without the subscription fatigue.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/checkup" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            Free Privacy Checkup
          </Link>
          <a href="#how-it-works" className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all text-lg">
            Explore The Stack
          </a>
        </div>
      </section>

      {/* ⚔️ 2. 真實痛點對決區 (The "Stop Overpaying" Section - 高轉換率核心) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-red-400 font-bold tracking-wider uppercase text-sm mb-2 block">The 2026 Reality</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop Bleeding Money & Leaking Data.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              80% of US consumers received a data breach notice last year, and 41% are suffering from SaaS subscription fatigue. It's time to cut the bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 痛點 1：昂貴的 SEO 工具 */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <span className="text-xl">❌</span>
                <span className="font-semibold line-through opacity-70">Paying $140/mo for Semrush</span>
              </div>
              <div className="flex items-start gap-3 text-emerald-400 mb-6">
                <span className="text-xl">✅</span>
                <p className="font-semibold leading-snug">Switch to SE Ranking for $55/mo and keep the exact same core SEO features.</p>
              </div>
              <Link href="/comparisons/semrush-vs-se-ranking" className="block w-full text-center py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                Read the Breakdown →
              </Link>
            </div>

            {/* 痛點 2：肥大卡頓的專案管理 */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <span className="text-xl">❌</span>
                <span className="font-semibold line-through opacity-70">Laggy & Expensive ClickUp</span>
              </div>
              <div className="flex items-start gap-3 text-emerald-400 mb-6">
                <span className="text-xl">✅</span>
                <p className="font-semibold leading-snug">Build a blazing fast, customizable, and flat-priced brain in Notion.</p>
              </div>
              <Link href="/comparisons/notion-vs-clickup" className="block w-full text-center py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                See Why Notion Wins →
              </Link>
            </div>

            {/* 痛點 3：資安外洩恐慌 */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <span className="text-xl">❌</span>
                <span className="font-semibold line-through opacity-70">Using public Wi-Fi unprotected</span>
              </div>
              <div className="flex items-start gap-3 text-emerald-400 mb-6">
                <span className="text-xl">✅</span>
                <p className="font-semibold leading-snug">Lock down your digital nomad traffic with NordVPN or Surfshark.</p>
              </div>
              <Link href="/comparisons/nordvpn-vs-surfshark" className="block w-full text-center py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                Compare Top VPNs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🧭 3. 分類導覽指南 (How It Works) */}
      <section id="how-it-works" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Build Your Empire</h2>
            <p className="text-slate-500 text-lg">Follow our 4-step framework to assemble your perfect, lean toolkit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1: Protect */}
            <Link href="/protect" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm">🛡️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700">1. Protect</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Secure your digital footprint first. Essential VPNs (NordVPN, Surfshark) and password managers.</p>
              <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1">View Tools <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>

            {/* Step 2: Build */}
            <Link href="/build" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-fuchsia-50 hover:border-fuchsia-200 transition-all duration-300">
              <div className="w-14 h-14 bg-fuchsia-100 text-fuchsia-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm">🏗️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-fuchsia-700">2. Build</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Construct your base. Compare lightweight website builders (Framer, Webflow) and communities.</p>
              <span className="text-fuchsia-600 font-semibold text-sm flex items-center gap-1">View Tools <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>

            {/* Step 3: Scale */}
            <Link href="/scale" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm">🚀</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-700">3. Scale</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Multiply your reach. Discover affordable SEO tools (SE Ranking), email software, and automations.</p>
              <span className="text-orange-600 font-semibold text-sm flex items-center gap-1">View Tools <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>

            {/* Step 4: Stack */}
            <Link href="/stack" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm">🧠</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700">4. Stack</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Connect the dots. Find the ultimate productivity hubs (Notion) and daily operations software.</p>
              <span className="text-blue-600 font-semibold text-sm flex items-center gap-1">View Tools <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}