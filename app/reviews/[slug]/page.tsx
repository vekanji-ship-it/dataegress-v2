// app/reviews/[slug]/page.tsx
import { getSaaSTools } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import Link from 'next/link';

export default async function SingleReviewArticle({ params }: { params: Promise<{ slug: string }> }) {
  // 🌟 解開 Next.js 15 的非同步參數
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  const allTools = await getSaaSTools();
  const product = allTools.find(tool => tool.slug === currentSlug);

  // 🚨 偵探除錯畫面
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full text-center">
          <span className="text-4xl mb-4 block">🕵️‍♂️</span>
          <h1 className="text-2xl font-bold text-red-600 mb-4">找不到對應的 Slug (評測文章)</h1>
          <p className="text-lg text-slate-700 mb-2">
            網址輸入的 Slug 是：<code className="bg-red-100 text-red-800 px-2 py-1 rounded">{currentSlug}</code>
          </p>
          <div className="mt-8 text-left border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">目前 Notion 成功抓下來的工具清單：</h2>
            <ul className="space-y-3">
              {allTools.map(t => (
                <li key={t.id} className="bg-slate-100 p-3 rounded flex justify-between">
                  <span className="font-semibold text-slate-800">{t.name}</span>
                  <code className="text-blue-600">[{t.slug || '⚠️ 抓不到 Slug'}]</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // 自動提取價格數字給 Schema 用
  const priceNumber = product.pricing.replace(/[^0-9.]/g, '') || "0";
  
  // 生成 Google SEO 結構化資料 (AEO 必備)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": product.name,
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": priceNumber,
        "priceCurrency": "USD"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": product.rating.toString(),
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Moji"
    }
  };

  return (
    <>
      <SchemaInjector data={jsonLd} />

      <article className="min-h-screen bg-slate-50 pb-20">
        
        {/* 🌟 頂部英雄導購區塊 (Hero Section) */}
        <header className="bg-white border-b border-slate-200 py-16 lg:py-24 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* 左側：文案與按鈕 */}
            <div>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 mb-6 border border-blue-200">
                ⭐ {product.rating} / 5.0 Editor's Choice
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                {product.name} Review (2026)
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {product.tagline}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 inline-block w-full max-w-md">
                <div className="text-sm text-slate-500 mb-1">Starting Price</div>
                <div className="text-3xl font-bold text-slate-900 mb-4">{product.pricing}</div>
                <Link 
                  href={product.affiliateUrl} 
                  target="_blank"
                  className="block w-full text-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-lg transition-all"
                >
                  Try {product.name} Now 🚀
                </Link>
                <div className="text-xs text-slate-400 text-center mt-3">*May include our partner discount.</div>
              </div>
            </div>

            {/* 右側：短影音/圖片 佔位區塊 */}
            <div className="w-full max-w-md mx-auto aspect-[9/16] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden relative flex items-center justify-center border-8 border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {product.videoUrl ? (
                <iframe 
                  src={product.videoUrl} 
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0" 
                  allowFullScreen 
                />
              ) : (
                <div className="text-slate-500 flex flex-col items-center">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Video Review Space</span>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* 🌟 核心內容與優缺點區塊 */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          
          {/* 優缺點 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Pros */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">✅</span> What we love
              </h3>
              <ul className="space-y-3">
                {product.pros && product.pros.length > 0 ? (
                  product.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start text-emerald-800 font-medium">
                      <span className="mr-2 mt-0.5 text-emerald-500">✓</span> {pro}
                    </li>
                  ))
                ) : (
                  <li className="text-emerald-700 italic">Excellent feature set and great value for solo founders.</li>
                )}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">❌</span> What could be better
              </h3>
              <ul className="space-y-3">
                {product.cons && product.cons.length > 0 ? (
                  product.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start text-rose-800 font-medium">
                      <span className="mr-2 mt-0.5 text-rose-500">✗</span> {con}
                    </li>
                  ))
                ) : (
                  <li className="text-rose-700 italic">Might have a slight learning curve for absolute beginners.</li>
                )}
              </ul>
            </div>
          </div>

          {/* 文章內文區 */}
          <div className="prose prose-slate lg:prose-xl max-w-none text-slate-700">
            <h2 className="text-3xl font-bold text-slate-900">In-Depth Verdict</h2>
            <p>
              When evaluating {product.name}, we specifically looked at how it serves solopreneurs and small digital teams. 
              The balance between its starting price of <strong>{product.pricing}</strong> and the features it unlocks makes it a strong contender in the market.
            </p>
            <p>
              (未來這裡可以接入 Markdown 或是 Notion 的 Page Content API，讓你的長篇評測文章自動渲染在這裡。)
            </p>
          </div>

        </main>
      </article>
    </>
  );
}