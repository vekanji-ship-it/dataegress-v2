// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 lg:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* 左側品牌資訊 */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-white tracking-tight mb-4 block">
              DataEgress<span className="text-blue-500">.</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              We help solopreneurs and digital nomads build, secure, and scale their digital assets. Honest reviews, automated workflows, and privacy first.
            </p>
          </div>

          {/* 快速連結區塊 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/protect" className="hover:text-white transition-colors">Protect (Security)</Link></li>
              <li><Link href="/build" className="hover:text-white transition-colors">Build (Web & Hosting)</Link></li>
              <li><Link href="/scale" className="hover:text-white transition-colors">Scale (Marketing & SEO)</Link></li>
              <li><Link href="/stack" className="hover:text-white transition-colors">Stack (Productivity)</Link></li>
            </ul>
          </div>

          {/* 法律與聯絡資訊 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* 🌟 聯盟行銷聲明 (SEO 與法規必備) */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-xs leading-relaxed border border-slate-700/50">
          <strong className="text-slate-300">Affiliate Disclosure: </strong>
          DataEgress is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. Our reviews are based on independent research and our own 30-day rigorous testing methodology.
        </div>

        {/* 底部版權宣告 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs border-t border-slate-800 pt-8">
          <p>© {new Date().getFullYear()} DataEgress. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span className="hover:text-white cursor-pointer transition-colors">Twitter (X)</span>
            <span className="hover:text-white cursor-pointer transition-colors">YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}