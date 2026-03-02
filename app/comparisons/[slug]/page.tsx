// app/comparisons/[slug]/page.tsx
import { getSaaSTools, getNotionPageContent } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import VideoHero from '@/components/VideoHero';
import ComparisonTable from '@/components/ComparisonTable';
import ReactMarkdown from 'react-markdown'; 
import Link from 'next/link'; // 🌟 新增 Link 引入

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
  },
  "semrush-vs-se-ranking": {
    name: "SE Ranking",
    price: "From $55/mo",
    url: "#",
    features: [
      { name: "Keyword Tracking", included: true },
      { name: "Competitor Analysis", included: true },
      { name: "Site Audit", included: true },
    ]
  }
};

export default async function ComparisonArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  const allTools = await getSaaSTools();
  const productA_Notion = allTools.find(tool => tool.slug === currentSlug);

  if (!productA_Notion) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full text-center">
          <span className="text-4xl mb-4 block">🕵️‍♂️</span>
          <h1 className="text-2xl font-bold text-red-600 mb-4">找不到對應的 Slug</h1>
          <p className="text-lg text-slate-700 mb-2">
            網址輸入的 Slug 是：<code className="bg-red-100 text-red-800 px-2 py-1 rounded">{currentSlug}</code>
          </p>
        </div>
      </div>
    );
  }

  const markdownContent = await getNotionPageContent(productA_Notion.id);

  const productB_Data = competitorData[currentSlug] || {
    name: "Competitor",
    price: "Varies",
    url: "#",
    features: [
      { name: "Feature 1", included: true },
      { name: "Feature 2", included: false },
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
          { name: "Core Feature 1", included: true },
          { name: "Core Feature 2", included: true },
        ]
  };

  const productB = {
    name: productB_Data.name,
    price: productB_Data.price,
    url: productB_Data.url,
    isWinner: false,
    features: productB_Data.features
  };

  return (
    <>
      <SchemaInjector data={{}} />
      <article className="min-h-screen bg-slate-50 pb-20">
        
        {/* 🚀 這裡就是新增的返回按鈕 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link href="/scale" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors">
            <span className="mr-2">←</span> Back to Marketing & SEO
          </Link>
        </div>

        <VideoHero 
          title={`${productA.name} vs ${productB.name}: Which is better in 2026?`}
          subtitle={productA_Notion.tagline || `We tested both platforms. Here is why ${productA.name} takes the lead.`}
          winnerName={productA.name}
          winnerUrl={productA.url}
          videoUrl={productA_Notion.videoUrl || undefined} 
        />
        <ComparisonTable productA={productA} productB={productB} />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
          {markdownContent ? (
            <div className="prose prose-slate prose-blue lg:prose-xl text-slate-700 max-w-none">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          ) : (
            <div className="prose prose-slate lg:prose-xl text-slate-700">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Why {productA.name} Wins</h2>
              <p>Based on our analysis, {productA.name} provides the most robust solution for solopreneurs.</p>
            </div>
          )}
        </div>
      </article>
    </>
  );
}