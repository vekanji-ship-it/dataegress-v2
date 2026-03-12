// app/blog/[Slug]/page.tsx
import { getPublishedArticles } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

// 🌟 核心修改：params 裡面的 key 必須與資料夾名稱 [Slug] 一致
export default async function BlogPost({ params }: { params: Promise<{ Slug: string }> }) {
  // 1. 等待網址參數解析
  const resolvedParams = await params;
  const currentSlug = resolvedParams.Slug; 

  // 2. 抓取文章清單
  const articles = await getPublishedArticles();
  
  // 3. 比對 Slug (如果 Notion 沒填 Slug，我們會自動 fallback 到 ID)
  const article = articles.find((a) => a.slug === currentSlug || a.id === currentSlug);

  // 如果真的找不到，顯示 404
  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← 返回部落格列表
      </Link>
      
      <article>
        <header className="mb-10 pb-6 border-b">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-500">
            {new Date(article.createdAt).toLocaleDateString('zh-TW')}
          </p>
        </header>

        {/* 使用 Typography 排版魔法渲染內文 */}
        <div className="prose prose-lg prose-blue max-w-none leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}