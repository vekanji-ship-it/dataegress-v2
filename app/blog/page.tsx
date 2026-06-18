import Link from "next/link";
import Image from "next/image"; 
import { getPublishedArticles } from "@/lib/notion"; 

export const revalidate = 60; 

export default async function BlogIndex() {
  const articles = await getPublishedArticles();

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      {/* --- 標題區塊 --- */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">實作紀錄</h1>
        <p className="text-xl text-gray-600">
          用 AI 工具工作的真實過程，包含踩坑與修復。
          <span className="block text-sm text-gray-400 mt-2">台灣・馬來西亞・新加坡</span>
        </p>
      </div>

      {/* --- 空狀態處理 --- */}
      {articles.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-lg border text-center">
          <p className="text-gray-500">文章準備中，敬請期待！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const isZH = article.slug.endsWith("-zh");
            
            return (
              <Link 
                href={`/blog/${article.slug}`} 
                key={article.id} 
                className="group relative block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500 transition-all bg-white"
              >
                {/* 語系 Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`
                    text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm
                    ${isZH 
                      ? "bg-red-500 text-white"
                      : "bg-blue-600 text-white"
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
                      發布於：{new Date(article.createdAt).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <span className="text-blue-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      閱讀更多 →
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
