import { getSaaSTools, getNotionPageContent } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import VideoHero from '@/components/VideoHero';
import ComparisonTable from '@/components/ComparisonTable';
import ReactMarkdown from 'react-markdown'; 
import Link from 'next/link';

const competitorData: Record<string, any> = {
  "snov-io-vs-lemlist-2026-review": {
    name: "Lemlist",
    price: "From $59/mo",
    url: "https://lemlist.com", 
    features: [
      { name: "Cold Email Drip Campaigns", included: true },
      { name: "Email Finder Extension", included: false },
      { name: "Built-in CRM", included: false },
    ]
  },
  "semrush-vs-se-ranking": {
    name: "SE Ranking",
    price: "From $55/mo",
    url: "https://seranking.com",
    features: [
      { name: "Keyword Tracking", included: true },
      { name: "Competitor Analysis", included: true },
      { name: "Site Audit", included: true },
    ]
  },
  "nordvpn-vs-surfshark": {
    name: "Surfshark",
    price: "From $2.49/mo",
    url: "https://surfshark.com", 
    features: [
      { name: "Unlimited Devices", included: true },
      { name: "Dedicated IP Address", included: false },
      { name: "Ad Blocker (CleanWeb)", included: true },
    ]
  },
  "1password-vs-bitwarden": {
    name: "Bitwarden",
    price: "Free / $10/yr",
    url: "https://bitwarden.com",
    features: [
      { name: "Open Source", included: true },
      { name: "Travel Mode", included: false },
      { name: "Unlimited Passwords", included: true },
    ]
  },
  "notion-vs-clickup": {
    name: "ClickUp",
    price: "From $7/mo (+ Hidden Fees)",
    url: "https://clickup.com",
    features: [
      { name: "Pre-built Dashboards", included: true },
      { name: "Native Time Tracking", included: true },
      { name: "Fast & Lightweight", included: false },
    ]
  },
};

export default async function ComparisonArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  const allTools = await getSaaSTools();
  const productA_Notion = allTools.find(tool => tool.slug === currentSlug);

  if (!productA_Notion) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">找不到對應的 Slug: {currentSlug}</h1>
      </div>
    );
  }

  const markdownContent = await getNotionPageContent(productA_Notion.id);
  const productB_Data = competitorData[currentSlug] || { name: "Competitor", price: "Varies", url: "#", features: [] };

  const productA = {
    name: productA_Notion.name,
    price: productA_Notion.pricing,
    url: productA_Notion.affiliateUrl, // 🌟 正確帶入賺錢網址
    isWinner: true,
    features: productA_Notion.pros.map(pro => ({ name: pro, included: true }))
  };

  const productB = {
    name: productB_Data.name,
    price: productB_Data.price,
    url: productB_Data.url,
    isWinner: false,
    features: productB_Data.features
  };

  let backLink = "/scale";
  let backCategoryName = "Marketing & SEO";
  let backColor = "hover:text-orange-600";

  if (productA_Notion.category.includes('Security') || productA_Notion.category.includes('VPN')) {
    backLink = "/protect";
    backCategoryName = "Security & Privacy";
    backColor = "hover:text-emerald-600"; 
  } else if (productA_Notion.category.includes('Stack') || productA_Notion.category.includes('Productivity')) {
    backLink = "/stack";
    backCategoryName = "Productivity Stack";
    backColor = "hover:text-blue-600";
  }

  return (
    <>
      <SchemaInjector data={{}} />
      <article className="min-h-screen bg-slate-50 pb-20">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Link href={backLink} className={`inline-flex items-center text-sm font-medium text-slate-500 transition-colors ${backColor}`}>
            ← Back to {backCategoryName}
          </Link>
        </div>

        <VideoHero 
          title={`${productA.name} vs ${productB.name}: Which is better in 2026?`}
          subtitle={productA_Notion.tagline || `We tested both platforms.`}
          winnerName={productA.name}
          winnerUrl={productA.url} // 🚀 傳入賺錢連結給 Hero 按鈕
          videoUrl={productA_Notion.videoUrl || undefined} 
        />
        <ComparisonTable productA={productA} productB={productB} />
        
        <div className="max-w-3xl mx-auto px-4 mt-12">
          {markdownContent ? (
            <div className="prose prose-slate prose-blue lg:prose-xl text-slate-700 max-w-none">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          ) : (
            <div className="prose prose-slate lg:prose-xl text-slate-700 text-center">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Why {productA.name} Wins</h2>
              <p>Based on our analysis, {productA.name} is the superior choice for solo users.</p>
            </div>
          )}
        </div>
      </article>
    </>
  );
}