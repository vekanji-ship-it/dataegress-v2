import { getSaaSTools } from '@/lib/notion';
import Link from 'next/link';

export default async function StackPage() {
  const allTools = await getSaaSTools();
  
  // ✅ 修改：加入 'Identity Protection' 以顯示 LogMeOnce
  const stackTools = allTools.filter((tool) => 
    tool.category.some(c => ['Stack', 'Automation', 'Productivity', 'Project Management', 'Identity Protection'].includes(c))
  );

  return (
    <div className="relative isolate min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Stack</span> Your Perfect Workflow
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            The ultimate digital arsenal curated for solopreneurs and digital nomads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {stackTools.map((tool) => (
            <div key={tool.id} className="bg-white/80 backdrop-blur-sm rounded-[32px] shadow-lg border border-slate-200 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
                  <span className="bg-indigo-50 text-indigo-600 text-sm font-bold px-3 py-1 rounded-full border border-indigo-100">
                    {tool.rating || '4.8'} ⭐
                  </span>
                </div>
                
                {/* ✅ 高亮顯示：針對 LogMeOnce 強化 Mugshot 描述 */}
                <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                  {tool.name === 'LogMeOnce' ? (
                    <>
                      Features patented <span className="text-indigo-600 font-semibold">Mugshot™ technology</span> that photographs intruders attempting to access your vault.
                    </>
                  ) : (
                    tool.tagline
                  )}
                </p>

                {/* ✅ 新增：LogMeOnce 專屬 10% 折扣區塊 */}
                {tool.name === 'LogMeOnce' && (
                  <div className="mb-6 p-4 bg-indigo-50/50 rounded-2xl border border-dashed border-indigo-200">
                    <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1 text-center">Exclusive Offer</p>
                    <p className="text-sm font-bold text-slate-900 text-center">
                      10% OFF Code: <span className="text-indigo-600">LOGMEONCE10</span>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 border-b border-slate-100 pb-4">
                  <span>Starting at</span>
                  {/* ✅ 修改：LogMeOnce 價格設為 $1.67 */}
                  <span className="text-lg text-slate-900 font-bold">
                    {tool.name === 'LogMeOnce' ? '$1.67/mo' : tool.pricing}
                  </span>
                </div>
                
                <Link 
                  href={tool.affiliateUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:shadow-lg hover:shadow-indigo-200 px-6 py-3 rounded-xl transition-all active:scale-95"
                >
                  Get {tool.name}
                </Link>

                {tool.slug && (
                  <Link href={`/comparisons/${tool.slug}`} className="text-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors py-1">
                    Read Comparison Review →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}