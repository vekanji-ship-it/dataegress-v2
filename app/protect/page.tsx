// app/protect/page.tsx
import { getSaaSTools, SaaSTool } from '@/lib/notion';
import Link from 'next/link';

export default async function ProtectPage() {
  const allTools = await getSaaSTools();
  // 過濾出資安與隱私相關工具 (Notion 裡的 Category 必須包含這些字眼)
  const protectTools = allTools.filter((tool: SaaSTool) => 
    tool.category.some(c => ['Security', 'VPN', 'Privacy', 'Password Manager'].includes(c))
  );

  return (
    <div className="relative isolate min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* 🌟 背景光暈特效 (翡翠綠/藍綠色系，象徵安全) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#10b981] to-[#0d9488] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Protect</span> Your Digital Life
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Military-grade VPNs, password managers, and privacy tools to secure your solopreneur business from anywhere.
          </p>
        </div>

        {/* 🛡️ 動態抓取 Notion 的工具清單卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {protectTools.map((tool) => (
            <div key={tool.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
                <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">
                  {tool.rating} ⭐
                </span>
              </div>
              <p className="text-slate-600 mb-8 h-12 leading-relaxed">{tool.tagline}</p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 border-b border-slate-100 pb-4">
                  <span>Starting at</span>
                  <span className="text-lg text-slate-900 font-bold">{tool.pricing}</span>
                </div>
                <Link href={tool.affiliateUrl} target="_blank" className="w-full text-center font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-6 py-3 rounded-xl shadow-md transition-all">
                  Get {tool.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 🚀 深度對比文章區塊 (接在工具清單下方) */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">🛡️ Deep Dive Comparisons</h2>
              <p className="text-slate-500">Don't risk your data. Read our rigorous security tool breakdowns.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* 🔒 第一張卡片：NordVPN vs Surfshark */}
            <Link href="/comparisons/nordvpn-vs-surfshark" className="group block bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 mb-4">VPN & Security</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">NordVPN vs Surfshark</h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed">The ultimate 2026 VPN showdown. Which one actually keeps your digital nomad lifestyle secure without throttling speed?</p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors text-slate-400">↗</div>
              </div>
            </Link>

            {/* 🔒 第二張卡片：1Password vs Bitwarden */}
            <Link href="/comparisons/1password-vs-bitwarden" className="group block bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:border-teal-200 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 mb-4">Password Managers</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-2">1Password vs Bitwarden</h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed">Stop reusing passwords. We compare the premium security of 1Password against the open-source champion.</p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors text-slate-400">↗</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}