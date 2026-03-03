import { getSaaSTools } from '@/lib/notion';
import Link from 'next/link';

export default async function StackPage() {
  const allTools = await getSaaSTools();
  const stackTools = allTools.filter((tool) => 
    tool.category.some(c => ['Stack', 'Automation', 'Productivity', 'Project Management'].includes(c))
  );

  return (
    <div className="relative isolate min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Stack</span> Your Perfect Workflow
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {stackTools.map((tool) => (
            <div key={tool.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full">{tool.rating || '4.5'} ⭐</span>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">{tool.tagline}</p>
              </div>
              
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 border-b border-slate-100 pb-4">
                  <span>Starting at</span>
                  <span className="text-lg text-slate-900 font-bold">{tool.pricing}</span>
                </div>
                
                <Link 
                  href={tool.affiliateUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 px-6 py-3 rounded-xl shadow-md transition-all"
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