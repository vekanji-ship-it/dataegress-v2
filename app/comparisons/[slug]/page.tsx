// app/comparisons/[slug]/page.tsx
import { getSaaSTools, getNotionPageContent } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import VideoHero from '@/components/VideoHero';
import ComparisonTable from '@/components/ComparisonTable';
import ReactMarkdown from 'react-markdown'; 
import Link from 'next/link';

const competitorData: Record<string, any> = {
  "beehiiv-review": {
    name: "Substack",
    price: "免費（抽成 10%）",
    url: "https://substack.com",
    features: [
      { name: "電子報發送", included: true },
      { name: "0% 收入抽成", included: false },
      { name: "內建廣告媒合", included: false },
      { name: "內建推薦機制", included: false },
    ]
  },
  "make-review": {
    name: "Zapier",
    price: "From $19.99/mo",
    url: "https://zapier.com",
    features: [
      { name: "視覺化流程設計", included: false },
      { name: "免費方案 1,000 次/月", included: false },
      { name: "支援複雜條件邏輯", included: false },
      { name: "亞洲社群支援", included: false },
    ]
  },
  "framer-review": {
    name: "Webflow",
    price: "From $14/mo",
    url: "https://webflow.com",
    features: [
      { name: "視覺化編輯器", included: true },
      { name: "AI 輔助生成", included: false },
      { name: "適合設計初學者", included: false },
      { name: "免費方案可用", included: true },
    ]
  },
  "notion-vs-clickup": {
    name: "ClickUp",
    price: "From $7/mo",
    url: "https://clickup.com",
    features: [
      { name: "資料庫功能", included: false },
      { name: "AI 功能內建", included: false },
      { name: "介面簡潔", included: false },
      { name: "免費方案完整", included: true },
    ]
  },
  "hostinger-review": {
    name: "Bluehost",
    price: "From $2.95/mo",
    url: "https://www.bluehost.com",
    features: [
      { name: "亞洲伺服器節點", included: false },
      { name: "介面簡潔易用", included: false },
      { name: "含免費網域", included: true },
      { name: "續約價格穩定", included: false },
    ]
  },
  "canva-review": {
    name: "Adobe Express",
    price: "Free / $9.99/mo",
    url: "https://www.adobe.com/express",
    features: [
      { name: "海量模板", included: false },
      { name: "免費方案功能完整", included: false },
      { name: "AI 功能豐富", included: false },
      { name: "台灣用戶熟悉", included: false },
    ]
  },
  "gamma-review": {
    name: "Google Slides",
    price: "免費",
    url: "https://slides.google.com",
    features: [
      { name: "AI 自動生成簡報", included: false },
      { name: "排版自動化", included: false },
      { name: "可分享網頁連結", included: true },
      { name: "學習成本極低", included: false },
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
        <h1 className="text-2xl font-bold text-slate-700 mb-4">「{currentSlug}」的評測即將上線！</h1>
        <p className="text-slate-500">我們正在撰寫這篇深度比較文章，敬請期待。</p>
        <Link href="/build" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">回到工具列表</Link>
      </div>
    );
  }

  const markdownContent = await getNotionPageContent(productA_Notion.id);
  const productB_Data = competitorData[currentSlug] || {
    name: "其他替代工具",
    price: "方案不一",
    url: "#",
    features: []
  };
  const safePros = Array.isArray(productA_Notion.pros) ? productA_Notion.pros : [];

  const productA = {
    name: productA_Notion.name || "工具",
    price: productA_Notion.pricing || "方案不一",
    url: productA_Notion.affiliateUrl || "#",
    isWinner: true,
    features: safePros.length > 0
      ? safePros.map(pro => ({ name: String(pro), included: true }))
      : [{ name: "核心功能", included: true }]
  };

  const productB = {
    name: productB_Data.name || "替代工具",
    price: productB_Data.price || "方案不一",
    url: productB_Data.url || "#",
    isWinner: false,
    features: productA.features.map((aFeature, index) => {
      const bFeature = productB_Data.features ? productB_Data.features[index] : null;
      return {
        name: bFeature ? bFeature.name : aFeature.name,
        included: bFeature ? bFeature.included : false
      };
    })
  };

  // 分類路由（繁中）
  let backLink = "/scale";
  let backCategoryName = "上手實作";
  let backColor = "hover:text-orange-600";
  const categories = Array.isArray(productA_Notion.category)
    ? productA_Notion.category.join(' ')
    : (productA_Notion.category || '');

  if (categories.includes('Automation') || categories.includes('Productivity') || categories.includes('Stack')) {
    backLink = "/stack"; backCategoryName = "自動化串接"; backColor = "hover:text-blue-600";
  } else if (categories.includes('Web Design') || categories.includes('Hosting')) {
    backLink = "/build"; backCategoryName = "選對工具"; backColor = "hover:text-fuchsia-600";
  } else if (categories.includes('Newsletter') || categories.includes('AI') || categories.includes('Marketing')) {
    backLink = "/scale"; backCategoryName = "上手實作"; backColor = "hover:text-orange-600";
  } else if (categories.includes('Security') || categories.includes('VPN') || categories.includes('Privacy')) {
    backLink = "/protect"; backCategoryName = "認識工具"; backColor = "hover:text-emerald-600";
  }

  return (
    <>
      <SchemaInjector data={{}} />
      <article className="min-h-screen bg-slate-50 pb-20">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Link href={backLink} className={`inline-flex items-center text-sm font-medium text-slate-500 transition-colors ${backColor}`}>
            ← 回到{backCategoryName}
          </Link>
        </div>

        <VideoHero 
          title={`${productA.name} vs ${productB.name}`}
          subtitle={productA_Notion.tagline || `我們實際測試了兩個工具，以下是為什麼推薦 ${productA.name}。`}
          winnerName={productA.name}
          winnerUrl={productA.url}
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
              <h2 className="text-3xl font-bold mb-6 text-slate-900">為什麼推薦 {productA.name}</h2>
              <p>根據我們的實際測試，{productA.name} 是目前最適合上班族和學生的選擇。</p>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
