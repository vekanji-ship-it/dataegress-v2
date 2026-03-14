import Link from "next/link";
import Image from "next/image"; 
import { getPublishedArticles } from "@/lib/notion"; 

// 設定每 60 秒重新校準一次資料庫，確保 AI 生產後能快速顯示
export const revalidate = 60; 

export default async function BlogIndex() {
  const articles = await getPublishedArticles();

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      {/* --- 標題區塊 --- */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">DataEgress Blog</h1>
        <p className="text-xl text-gray-600">
          Curated SaaS optimization guides & digital nomad strategies.
          <span className="block text-sm text-gray-400 mt-2">Now serving both Global & Asian markets.</span>
        </p>
      </div>

      {/* --- 空狀態處理 --- */}
      {articles.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-lg border text-center">
          <p className="text-gray-500">No articles yet! Check back soon.</p>
        </div>
      ) : (
        /* --- 文章網格系統 (V7.0 多語系優化版) --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            // 🌟 核心增強：語系自動識別邏輯
            // 檢查 slug 是否以 -zh 結尾來判斷語系
            const isZH = article.slug.endsWith("-zh");
            
            return (
              <Link 
                href={`/blog/${article.slug}`} 
                key={article.id} 
                className="group relative block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500 transition-all bg-white"
              >
                {/* 🌟 核心增強：語系 Badge (UI 標籤) */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`
                    text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm
                    ${isZH 
                      ? "bg-red-500 text-white" // 繁中版使用熱情的紅色
                      : "bg-blue-600 text-white" // 英文版使用專業的深藍
                    }
                  `}>
                    {isZH ? "繁體中文" : "English"}
                  </span>
                </div>

                {/* --- 封面圖片區塊 --- */}
                <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-bold tracking-tighter">
                      DataEgress
                    </div>
                  )}
                </div>

                {/* --- 文字內容區塊 --- */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 line-clamp-2">
                    {article.title}
                  </h2>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-gray-500 text-xs">
                      Published on: {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    {/* 閱讀更多提示 */}
                    <span className="text-blue-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}