// dataegress-v2/app/pricing/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | DataEgress - Transparent & Predictable",
  description: "Simple, transparent pricing for SEO professionals and agencies. No hidden fees, cancel anytime.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- 標題區塊 (強調透明與無痛) --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Simple pricing. No <span className="text-blue-600">hidden traps.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pay for the capacity you need. Generate billable internal link audits in minutes. 
            <strong className="text-gray-900"> Cancel anytime.</strong>
          </p>
        </div>

        {/* --- 定價卡片區塊 --- */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 方案 1: Solo (Freelancer) */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Solo Consultant</h3>
            <p className="text-gray-500 mb-6 h-12">Perfect for independent SEO freelancers managing a few clients.</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$29</span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            <Link href="/signup?plan=solo" className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center font-bold rounded-xl transition-colors mb-8">
              Start Free Trial
            </Link>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">✅ <span className="font-medium">Up to 3 Active Projects</span></li>
              <li className="flex items-center gap-3">✅ <span>10,000 URLs Crawled / mo</span></li>
              <li className="flex items-center gap-3">✅ <span>AI Topic Cluster Mapping</span></li>
              <li className="flex items-center gap-3 text-gray-400">❌ <span>White-label Client Reports</span></li>
            </ul>
          </div>

          {/* 方案 2: Agency Pro (主推方案) */}
          <div className="bg-blue-600 rounded-3xl p-8 border border-blue-600 shadow-xl transform md:-translate-y-4 relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
              Most Popular / High ROI
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Agency Pro</h3>
            <p className="text-blue-100 mb-6 h-12">Built for scaling agencies. Turn audits into instant billable client reports.</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">$99</span>
              <span className="text-blue-200 font-medium">/month</span>
            </div>
            <Link href="/signup?plan=pro" className="block w-full py-3 px-4 bg-white hover:bg-gray-50 text-blue-600 text-center font-bold rounded-xl shadow-md transition-colors mb-8">
              Upgrade to Agency
            </Link>
            <ul className="space-y-4 text-blue-50">
              <li className="flex items-center gap-3">✅ <span className="font-bold text-white">Up to 15 Active Projects</span></li>
              <li className="flex items-center gap-3">✅ <span>100,000 URLs Crawled / mo</span></li>
              <li className="flex items-center gap-3">✅ <span>AI Topic Cluster Mapping</span></li>
              <li className="flex items-center gap-3">🔥 <span className="font-bold text-white">White-label PDF Export (For Clients)</span></li>
              <li className="flex items-center gap-3">✅ <span>Priority API Support</span></li>
            </ul>
          </div>
        </div>

        {/* --- 消除摩擦的 FAQ (Anti-Marketing) --- */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">The "No-BS" FAQ</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Are there any hidden fees or add-on modules?</h4>
              <p className="text-gray-600">No. We hate "SaaS tool traps" as much as you do. You get exactly what is listed in your tier. If you hit your URL limit, the tool simply pauses until the next month unless you choose to upgrade.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Yes. No annual lock-ins required. You can cancel your subscription from your dashboard with one click. We won't force you to jump through hoops to leave.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Why is the Agency Pro tier worth $99?</h4>
              <p className="text-gray-600">Because it pays for itself with one client. The White-label PDF export allows you to generate a professional internal link audit and task list that you can instantly bill your clients for. We do the heavy lifting; you get the credit.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}