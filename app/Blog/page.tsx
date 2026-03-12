// app/blog/page.tsx
import Link from "next/link";
import { getPublishedArticles } from "@/lib/notion"; // 確保路徑與你的 notion.ts 一致

// 🌟 ISR 增量靜態生成：每 60 秒自動去 Notion 檢查有沒有新文章，不用重新部署網站！
export const revalidate = 60; 

export default async function BlogIndex() {
  // 呼叫我們剛剛寫好的引擎，抓取已發布文章
  const articles = await getPublishedArticles();

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">DataEgress Blog</h1>
        <p className="text-lg text-gray-600">精選 SaaS 瘦身指南與數位遊民生存策略</p>
      </div>

      {articles.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-lg border text-center">
          <p className="text-gray-500">目前還沒有文章喔！快去 Notion 把狀態改成「Published」吧！</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.id}`} 
              key={article.id} 
              className="block p-6 border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-500 transition-all bg-white"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{article.title}</h2>
              <p className="text-gray-500 text-sm">
                發布日期：{new Date(article.createdAt).toLocaleDateString('zh-TW')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}