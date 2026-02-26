// app/protect/page.tsx
import { getSaaSTools, SaaSTool } from '@/lib/notion';
import Link from 'next/link';

export default async function ProtectPage() {
  const allTools = await getSaaSTools();
  const protectTools = allTools.filter((tool: SaaSTool) => tool.category.includes('Security'));

  return (
    <div className="relative isolate min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      
      {/* 🌟 背景光暈特效 (專屬 Protect 的祖母綠色系) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34d399] to-[#0d9488] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 標題區塊 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Protect</span> Your Digital Assets
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Build an impenetrable digital moat. Here, we review top-tier VPNs and security tools to ensure your privacy remains intact.
          </p>
        </div>

        {/* 動態渲染軍火庫卡片 */}
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
                <Link 
                  href={tool.affiliateUrl} 
                  target="_blank"
                  className="w-full text-center font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  Get {tool.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}