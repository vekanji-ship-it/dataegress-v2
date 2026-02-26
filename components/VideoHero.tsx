// components/VideoHero.tsx
import Link from 'next/link';

interface VideoHeroProps {
  title: string;
  subtitle: string;
  videoUrl?: string; // 未來可填寫 YouTube 或 IG Reel 的 Embed 網址
  winnerName: string;
  winnerUrl: string; // 你的 Affiliate URL
}

export default function VideoHero({ title, subtitle, videoUrl, winnerName, winnerUrl }: VideoHeroProps) {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">
        
        {/* 左側：文案與懶人包結論 */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 mb-6 border border-blue-200">
            🏆 Winner Revealed: {winnerName}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {subtitle}
          </p>
          <Link 
            href={winnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-lg transition-all"
          >
            Try {winnerName} for Free 🚀
          </Link>
          <p className="mt-3 text-sm text-slate-400">
            *Includes our exclusive partner discount.
          </p>
        </div>

        {/* 右側：影音播放器容器 (完美支援 IG/YT 比例) */}
        <div className="w-full lg:w-5/12 aspect-[9/16] max-h-[600px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center border-4 border-slate-100">
          {videoUrl ? (
            <iframe 
              src={videoUrl} 
              className="absolute inset-0 w-full h-full"
              frameBorder="0" 
              allowFullScreen 
            />
          ) : (
            <div className="text-slate-500 flex flex-col items-center">
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Video Placement (IG Reel / YT Short)</span>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
}