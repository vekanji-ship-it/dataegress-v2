import { getSaaSTools, getNotionPageContent } from '@/lib/notion';
import SchemaInjector from '@/components/SchemaInjector';
import VideoHero from '@/components/VideoHero';
import ComparisonTable from '@/components/ComparisonTable';
import ReactMarkdown from 'react-markdown'; 
import Link from 'next/link';

const competitorData: Record<string, any> = {
  // 原有對手
  "snov-io-vs-lemlist-2026-review": { name: "Lemlist", price: "From $59/mo", url: "https://lemlist.com", features: [{ name: "Cold Email Drip Campaigns", included: true }, { name: "Email Finder Extension", included: false }, { name: "Built-in CRM", included: false }] },
  "semrush-vs-se-ranking": { name: "SE Ranking", price: "From $55/mo", url: "https://seranking.com", features: [{ name: "Keyword Tracking", included: true }, { name: "Competitor Analysis", included: true }, { name: "Site Audit", included: true }] },
  "nordvpn-vs-surfshark": { name: "Surfshark", price: "From $2.49/mo", url: "https://surfshark.com", features: [{ name: "Unlimited Devices", included: true }, { name: "Dedicated IP Address", included: false }, { name: "Ad Blocker", included: true }] },
  "1password-vs-bitwarden": { name: "Bitwarden", price: "Free / $10/yr", url: "https://bitwarden.com", features: [{ name: "Open Source", included: true }, { name: "Travel Mode", included: false }, { name: "Unlimited Passwords", included: true }] },
  "notion-vs-clickup": { name: "ClickUp", price: "From $7/mo", url: "https://clickup.com", features: [{ name: "Pre-built Dashboards", included: true }, { name: "Native Time Tracking", included: true }, { name: "Fast & Lightweight", included: false }] },
  "surfer-seo-review": { name: "Clearscope", price: "From $170/mo", url: "https://www.clearscope.io", features: [{ name: "Content Optimization", included: true }, { name: "Keyword Research", included: true }, { name: "Affordable Pricing", included: false }] },
  "beehiiv-review": { name: "Substack", price: "Free", url: "https://substack.com", features: [{ name: "Newsletter Sending", included: true }, { name: "0% Revenue Cut", included: false }, { name: "Advanced API", included: false }] },
  "skool-review": { name: "Circle", price: "From $49/mo", url: "https://circle.so", features: [{ name: "Community Spaces", included: true }, { name: "Built-in Gamification", included: false }, { name: "Unlimited Courses", included: true }] },
  "webflow-review": { name: "WordPress", price: "Free (Hosting varies)", url: "https://wordpress.org", features: [{ name: "Visual Canvas", included: false }, { name: "Plugin Ecosystem", included: true }, { name: "No Maintenance", included: false }] },
  "hostinger-review": { name: "Bluehost", price: "From $2.95/mo", url: "https://www.bluehost.com", features: [{ name: "cPanel", included: true }, { name: "LiteSpeed Servers", included: false }, { name: "24/7 Support", included: true }] },
  "surfshark-review": { name: "ExpressVPN", price: "From $6.67/mo", url: "https://www.expressvpn.com", features: [{ name: "High Speed", included: true }, { name: "Unlimited Devices", included: false }, { name: "No-logs Policy", included: true }] },
  "clickup-review": { name: "Asana", price: "From $10.99/mo", url: "https://asana.com", features: [{ name: "Task Management", included: true }, { name: "Complex Dashboards", included: false }, { name: "Beginner Friendly", included: true }] },
  "framer-review": { name: "Webflow", price: "From $14/mo", url: "https://webflow.com", features: [{ name: "Visual Canvas", included: true }, { name: "Complex CMS", included: true }, { name: "Steep Learning Curve", included: true }] },
  "logmeonce": { name: "1Password", price: "From $2.99/mo", url: "https://1password.com", features: [{ name: "Anti-Hacker Mugshot", included: false }, { name: "Watchtower Security", included: true }, { name: "Free Tier", included: false }] }
};

export default async function ComparisonArticle({ params }: { params: Promise<{ slug: string }> }) {
  // 🚀 強制攔截所有錯誤的 Try-Catch 防護網
  try {
    const resolvedParams = await params;
    const currentSlug = resolvedParams.slug;
    const allTools = await getSaaSTools();
    const productA_Notion = allTools.find(tool => tool.slug === currentSlug);

    if (!productA_Notion) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">The review for "{currentSlug}" is coming soon!</h1>
          <Link href="/stack" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">Go Back</Link>
        </div>
      );
    }

    const markdownContent = await getNotionPageContent(productA_Notion.id);
    const productB_Data = competitorData[currentSlug] || { name: "Alternative Tool", price: "Varies", url: "#", features: [] };
    const safePros = Array.isArray(productA_Notion.pros) ? productA_Notion.pros : [];

    const productA = {
      name: String(productA_Notion.name || "Product A"),
      price: String(productA_Notion.pricing || "Varies"),
      url: String(productA_Notion.affiliateUrl || "#"),
      isWinner: true,
      features: safePros.length > 0 ? safePros.map(pro => ({ name: String(pro), included: true })) : [{ name: "Core Feature", included: true }]
    };

    const productB = {
      name: String(productB_Data.name),
      price: String(productB_Data.price),
      url: String(productB_Data.url || "#"),
      isWinner: false,
      features: Array.isArray(productB_Data.features) ? productB_Data.features : [{ name: "Feature 1", included: false }]
    };

    let backLink = "/scale";
    let backCategoryName = "Marketing & SEO";
    let backColor = "hover:text-orange-600";
    const categories = Array.isArray(productA_Notion.category) ? productA_Notion.category.join(' ') : (productA_Notion.category || '');

    if (categories.includes('Security') || categories.includes('VPN') || categories.includes('Identity Protection')) {
      backLink = "/protect"; backCategoryName = "Security & Privacy"; backColor = "hover:text-emerald-600"; 
    } else if (categories.includes('Stack') || categories.includes('Productivity') || productA_Notion.name === 'Notion') {
      backLink = "/stack"; backCategoryName = "Productivity Stack"; backColor = "hover:text-blue-600";
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
          <VideoHero title={`${productA.name} vs ${productB.name}`} subtitle={productA_Notion.tagline || ""} winnerName={productA.name} winnerUrl={productA.url} />
          <ComparisonTable productA={productA} productB={productB} />
          <div className="max-w-3xl mx-auto px-4 mt-12">
            <div className="prose prose-slate prose-blue lg:prose-xl text-slate-700 max-w-none">
              {markdownContent ? <ReactMarkdown>{markdownContent}</ReactMarkdown> : <p>Loading...</p>}
            </div>
          </div>
        </article>
      </>
    );
  } catch (error: any) {
    // 🚨 抓到錯誤了！把真正的錯誤訊息印在畫面上
    return (
      <div style={{ padding: '40px', backgroundColor: '#fef2f2', color: '#991b1b', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', borderBottom: '2px solid #f87171', paddingBottom: '10px' }}>
          🚨 營運長抓蟲系統：找到當機原因了！
        </h1>
        <p style={{ marginTop: '20px', fontSize: '18px' }}>老闆，請把下面這個深色框框裡的文字截圖給我，我一秒就能解決：</p>
        <pre style={{ backgroundColor: '#1f2937', color: '#10b981', padding: '20px', borderRadius: '8px', overflowX: 'auto', marginTop: '20px', fontSize: '14px', lineHeight: '1.5' }}>
          {error?.message || "無法取得錯誤訊息字串"}
          {"\n\n"}
          {error?.stack || "無詳細堆疊資訊"}
        </pre>
      </div>
    );
  }
}