import { getSaaSTools } from '@/lib/notion';
import Link from 'next/link';

export default async function BuildPage() {
  const allTools = await getSaaSTools();
  const buildTools = allTools.filter((tool) => 
    tool.category.some(c => ['Web Design', 'Community / Courses', 'Hosting'].includes(c))
  );

  return (
    <div className="relative isolate min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">Build</span> Your Digital Empire
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {buildTools.map((tool) => (
            <div key={tool.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200 p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{tool.name}</h2>
                <p className="text-slate-600 mb-8 h-12 leading-relaxed">{tool.tagline}</p>
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <Link 
                  href={tool.affiliateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full text-center font-bold text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  Get {tool.name}
                </Link>
                {tool.slug && (
                  <Link href={`/comparisons/${tool.slug}`} className="text-center text-sm font-medium text-slate-500 hover:text-fuchsia-600 transition-colors py-1">
                    Read Expert Review →
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