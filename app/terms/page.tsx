// app/terms/page.tsx
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using DataEgress, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this site.</p>
          
          <h3>2. Affiliate Disclaimer</h3>
          <p>DataEgress is a reader-supported platform. Many of the links on this website are affiliate links. This means that if you click on the link and make a purchase, we may receive a commission at no extra cost to you. Our reviews are based on our own independent research.</p>

          <h3>3. Content Disclaimer</h3>
          <p>The information provided on DataEgress is for educational and informational purposes only. While we strive to keep information regarding SaaS pricing and features up-to-date, we make no guarantees regarding the accuracy of information as software companies frequently update their offerings.</p>

          <h3>4. Intellectual Property</h3>
          <p>All original content, including reviews, guides, and site design, is the property of DataEgress and is protected by copyright laws. You may not reproduce our content without explicit permission.</p>
        </div>
      </div>
    </div>
  );
}