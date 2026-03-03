// app/comparisons/[slug]/page.tsx
import { getSaaSTools, getNotionPageContent } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import VideoHero from '@/components/VideoHero';
import ComparisonTable from '@/components/ComparisonTable';
import ReactMarkdown from 'react-markdown'; 
import Link from 'next/link';

const competitorData: Record<string, any> = {
  // === 原有對手 ===
  "snov-io-vs-lemlist-2026-review": { name: "Lemlist", price: "From $59/mo", url: "https://lemlist.com", features: [{ name: "Cold Email Drip Campaigns", included: true }, { name: "Email Finder Extension", included: false }, { name: "Built-in CRM", included: false }] },
  "semrush-vs-se-ranking": { name: "SE Ranking", price: "From $55/mo", url: "https://seranking.com", features: [{ name: "Keyword Tracking", included: true }, { name: "Competitor Analysis", included: true }, { name: "Site Audit", included: true }] },
  "nordvpn-vs-surfshark": { name: "Surfshark", price: "From $2.49/mo", url: "https://surfshark.com", features: [{ name: "Unlimited Devices", included: true }, { name: "Dedicated IP Address", included: false }, { name: "Ad Blocker", included: true }] },
  "1password-vs-bitwarden": { name: "Bitwarden", price: "Free / $10/yr", url: "https://bitwarden.com", features: [{ name: "Open Source", included: true }, { name: "Travel Mode", included: false }, { name: "Unlimited Passwords", included: true }] },
  "notion-vs-clickup": { name: "ClickUp", price: "From $7/mo", url: "https://clickup.com", features: [{ name: "Pre-built Dashboards", included: true }, { name: "Native Time Tracking", included: true }, { name: "Fast & Lightweight", included: false }] },
  
  // === 🚀 新增的工具對手 (預防錯誤) ===
  "surfer-seo-review": { name: "Clearscope", price: "From $170/mo", url: "https://www.clearscope.io", features: [{ name: "Content Optimization", included: true }, { name: "Keyword Research", included: true }, { name: "Affordable Pricing", included: false }] },
  "beehiiv-review": { name: "Substack", price: "Free", url: "https://substack.com", features: [{ name: "Newsletter Sending", included: true }, { name: "0% Revenue Cut", included: false }, { name: "Advanced API", included: false }] },
  "skool-review": { name: "Circle", price: "From $49/mo", url: "https://circle.so", features: [{ name: "Community Spaces", included: true }, { name: "Built-in Gamification", included: false }, { name: "Unlimited Courses", included: true }] },
  "webflow-review": { name: "WordPress", price: "Free (Hosting varies)", url: "https://wordpress.org", features: [{ name: "Visual Canvas", included: false }, { name: "Plugin Ecosystem", included: true }, { name: "No Maintenance", included: false }] },
  "hostinger-review": { name: "Bluehost", price: "From $2.95/mo", url: "https://www.bluehost.com", features: [{ name: "cPanel", included: true }, { name: "LiteSpeed Servers", included: false }, { name: "24/7 Support", included: true }] },
  "surfshark-review": { name: "ExpressVPN", price: "From $6.67/mo", url: "https://www.expressvpn.com", features: [{ name: "High Speed", included: true }, { name: "Unlimited Devices", included: false }, { name: "No-logs Policy", included: true }] },
  "clickup-review": { name: "Asana", price: "From $10.99/mo", url: "https://asana.com", features: [{ name: "Task Management", included: true }, { name: "Complex Dashboards", included: false }, { name: "Beginner Friendly", included: true }] },
  "framer-review": { name: "Webflow", price: "From $14/mo", url: "https://webflow.com", features: [{ name: "Visual Canvas", included: true }, { name: "Complex CMS", included: true }, { name: "Steep Learning Curve", included: true }] }
};

export default async function ComparisonArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  const allTools = await getSaaSTools();
  const productA_Notion = allTools.find(tool => tool.slug === currentSlug);

  if (!productA_Notion) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">The review for "{currentSlug}" is coming soon!</h1>
        <p className="text-slate-500">We are still writing this deep-dive comparison.</p>
        <Link href="/stack" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">Go Back</Link>
      </div>
    );
  }

  const markdownContent = await getNotionPageContent(productA_Notion.id);
  const productB_Data = competitorData[currentSlug] || { name: "Alternative Tool", price: "Varies", url: "#", features: [] };

  const safePros = Array.isArray(productA_Notion.pros) ? productA_Notion.pros : [];

  const productA = {
    name: productA_Notion.name || "Product",
    price: productA_Notion.pricing || "Varies",
    url: productA_Notion.affiliateUrl || "#",
    isWinner: true,
    features: safePros.length > 0 ? safePros.map(pro => ({ name: pro, included: true })) : [{ name: "Core Feature 1", included: true }, { name: "Core Feature 2", included: true }]
  };

  const productB = {
    name: productB_Data.name,
    price: productB_Data.price,
    url: productB_Data.url || "#",
    isWinner: false,
    features: Array.isArray(productB_Data.features) && productB_Data.features.length > 0 ? productB_Data.features : [{ name: "Feature 1", included: false }, { name: "Feature 2", included: false }]
  };

  let backLink = "/scale";
  let backCategoryName = "Marketing & SEO";
  let backColor = "hover:text-orange-600";
  const categories = Array.isArray(productA_Notion.category) ? productA_Notion.category.join(' ') : (productA_Notion.category || '');

  if (categories.includes('Security') || categories.includes('VPN') || categories.includes('Privacy')) {
    backLink = "/protect"; backCategoryName = "Security & Privacy"; backColor = "hover:text-emerald-600"; 
  } else if (categories.includes('Stack') || categories.includes('Productivity') || productA_Notion.name === 'Notion') {
    backLink = "/stack"; backCategoryName = "Productivity Stack"; backColor = "hover:text-blue-600";
  } else if (categories.includes('Web Design') || categories.includes('Hosting') || categories.includes('Community')) {
    backLink = "/build"; backCategoryName = "Build Your Empire"; backColor = "hover:text-fuchsia-600";
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
          title={`${productA.name} vs ${productB.name}`}
          subtitle={productA_Notion.tagline || `We tested both platforms. Here is why ${productA.name} wins.`}
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
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Why {productA.name} Wins</h2>
              <p>Based on our analysis, {productA.name} is the superior choice for solo users.</p>
            </div>
          )}
        </div>
      </article>
    </>
  );
}