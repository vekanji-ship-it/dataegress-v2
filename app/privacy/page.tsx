// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h3>1. Information We Collect</h3>
          <p>We only collect information that you voluntarily provide to us, such as your email address when you subscribe to our newsletter via Beehiiv, or when you contact us directly. We also use standard analytics tools that collect anonymous browsing data to help us improve our content.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>Your information is used to send you the weekly newsletter, respond to your inquiries, and improve the user experience on DataEgress. We will never sell, rent, or spam your email address.</p>

          <h3>3. Cookies and Tracking</h3>
          <p>We use cookies to understand how you interact with our website and to track affiliate link clicks. When you click on an affiliate link for a SaaS product (e.g., Semrush, NordVPN), a cookie is placed in your browser to attribute the referral to DataEgress.</p>

          <h3>4. Third-Party Services</h3>
          <p>Our site contains links to third-party tools and websites. We are not responsible for the privacy practices or the content of these external sites. Please review their privacy policies before providing them with your personal information.</p>
        </div>
      </div>
    </div>
  );
}