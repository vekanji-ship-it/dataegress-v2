import { getSaaSTools } from '@/lib/notion';
import Link from 'next/link';

export default async function ScalePage() {
  const allTools = await getSaaSTools();
  const scaleTools = allTools.filter((tool) => 
    tool.category.some(c => ['Sales', 'Marketing', 'SEO', 'Newsletter', 'AI'].includes(c))
  );

  return (
    <div className="relative isolate min-h-screen px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">Scale</span> Your Solo Business
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {scaleTools.map((tool) => (
            <div key={tool.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200 p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{tool.name}</h2>
                <p className="text-slate-600 mb-8 h-12">{tool.tagline}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link 
                  href={tool.affiliateUrl} 
                  target="_blank"
                  className="w-full text-center font-bold text-white bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  Get {tool.name}
                </Link>
                {tool.slug && (
                  <Link href={`/comparisons/${tool.slug}`} className="text-center text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors">
                    Read Full Comparison →
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