// app/comparisons/[slug]/page.tsx
import { getSaaSTools } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import VideoHero from '@/components/VideoHero';
import ComparisonTable from '@/components/ComparisonTable';

const competitorData: Record<string, any> = {
  "snov-io-vs-lemlist-2026-review": {
    name: "Lemlist",
    price: "From $59/mo",
    url: "#",
    features: [
      { name: "Cold Email Drip Campaigns", included: true },
      { name: "Email Finder Extension", included: false },
      { name: "Built-in CRM", included: false },
    ]
  }
};

export default async function ComparisonArticle({ params }: { params: Promise<{ slug: string }> }) {
  // 🌟 解開 Next.js 15 的非同步參數
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  const allTools = await getSaaSTools();
  const productA_Notion = allTools.find(tool => tool.slug === currentSlug);

  if (!productA_Notion) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full text-center">
          <span className="text-4xl mb-4 block">🕵️‍♂️</span>
          <h1 className="text-2xl font-bold text-red-600 mb-4">找不到對應的 Slug (比對失敗)</h1>
          <p className="text-lg text-slate-700 mb-2">
            網址輸入的 Slug 是：<code className="bg-red-100 text-red-800 px-2 py-1 rounded">{currentSlug}</code>
          </p>
          
          <div className="mt-8 text-left border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">以下是目前 Notion 成功抓下來的所有工具與 Slug：</h2>
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

  const productB_Data = competitorData[currentSlug] || {
    name: "Competitor",
    price: "Varies",
    url: "#",
    features: [
      { name: "Core Feature 1", included: true },
      { name: "Core Feature 2", included: false },
      { name: "Core Feature 3", included: false },
    ]
  };

  const productA = {
    name: productA_Notion.name,
    price: productA_Notion.pricing,
    url: productA_Notion.affiliateUrl,
    isWinner: true,
    features: productA_Notion.pros.length > 0 
      ? productA_Notion.pros.map(pro => ({ name: pro, included: true }))
      : [
          { name: "Cold Email Drip Campaigns", included: true },
          { name: "Email Finder Extension", included: true },
          { name: "Built-in CRM", included: true },
        ]
  };

  const productB = {
    name: productB_Data.name,
    price: productB_Data.price,
    url: productB_Data.url,
    isWinner: false,
    features: productB_Data.features
  };

  const priceNumber = productA.price.replace(/[^0-9.]/g, '') || "0";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": productA.name,
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": priceNumber,
        "priceCurrency": "USD"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": productA_Notion.rating.toString(),
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
        <VideoHero 
          title={`${productA.name} vs ${productB.name}: Which is better in 2026?`}
          subtitle={productA_Notion.tagline || `We tested both platforms for 30 days. Here is why ${productA.name} takes the lead for solo founders.`}
          winnerName={productA.name}
          winnerUrl={productA.url}
          videoUrl={productA_Notion.videoUrl || undefined} 
        />
        <ComparisonTable 
          productA={productA} 
          productB={productB} 
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-slate lg:prose-xl mt-12 text-slate-700">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Why {productA.name} Wins</h2>
          <p className="mb-4">
            Based on our analysis of pricing, features, and community feedback, {productA.name} provides the most robust solution for solopreneurs.
          </p>
          
          {productA_Notion.pros && productA_Notion.pros.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl mt-8">
              <h3 className="text-emerald-800 font-bold m-0 mb-4">✅ Pros of {productA.name}</h3>
              <ul className="m-0">
                {productA_Notion.pros.map((pro, idx) => <li key={idx} className="text-emerald-700">{pro}</li>)}
              </ul>
            </div>
          )}
          
          {productA_Notion.cons && productA_Notion.cons.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl mt-6">
              <h3 className="text-rose-800 font-bold m-0 mb-4">❌ Cons of {productA.name}</h3>
              <ul className="m-0">
                {productA_Notion.cons.map((con, idx) => <li key={idx} className="text-rose-700">{con}</li>)}
              </ul>
            </div>
          )}
        </div>
      </article>
    </>
  );
}