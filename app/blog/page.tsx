import Link from "next/link";
import Image from "next/image"; // 🌟 匯入 Image 元件
import { getPublishedArticles } from "@/lib/notion"; 

export const revalidate = 60; 

export default async function BlogIndex() {
  const articles = await getPublishedArticles();

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">DataEgress Blog</h1>
        <p className="text-xl text-gray-600">精選 SaaS 瘦身指南與數位遊民生存策略</p>
      </div>

      {articles.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-lg border text-center">
          <p className="text-gray-500">目前還沒有文章喔！快去 Notion 把狀態改成「Published」吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.id} 
              className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500 transition-all bg-white"
            >
              {/* 🌟 顯示圖片區域 */}
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
                  <div className="flex items-center justify-center h-full text-gray-400">
                    DataEgress
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 line-clamp-2">{article.title}</h2>
                <p className="text-gray-500 text-sm">
                  發布日期：{new Date(article.createdAt).toLocaleDateString('zh-TW')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}