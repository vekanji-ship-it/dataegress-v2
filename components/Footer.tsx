import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 lg:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-white tracking-tight mb-4 block">
              DataEgress<span className="text-blue-500">.</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              記錄上班族與學生用 AI 工具實際工作的過程，包含踩坑與成功案例。不賣神話，只說真實。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">內容分類</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/protect" className="hover:text-white transition-colors">認識工具</Link></li>
              <li><Link href="/build" className="hover:text-white transition-colors">選對工具</Link></li>
              <li><Link href="/scale" className="hover:text-white transition-colors">上手實作</Link></li>
              <li><Link href="/stack" className="hover:text-white transition-colors">自動化串接</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors font-medium text-blue-400">部落格</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">法律聲明</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">隱私權政策</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">服務條款</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">聯絡我們</Link></li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-xs leading-relaxed border border-slate-700/50">
          <strong className="text-slate-300">聯盟行銷聲明：</strong>
          本網站部分連結為聯盟行銷連結，透過連結購買商品或服務時，我們可能獲得佣金，對你的費用不會有任何影響。所有工具評測均基於我們的實際使用體驗與獨立研究。
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs border-t border-slate-800 pt-8">
          <p>© {new Date().getFullYear()} DataEgress. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a 
              href="https://www.instagram.com/moji_ailife" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Instagram @moji_ailife
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
