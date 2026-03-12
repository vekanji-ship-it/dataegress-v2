// app/blog/[id]/page.tsx
import { getPublishedArticles } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

// 🌟 升級點：兼容 Next.js 15 的非同步 Params
export default async function BlogPost({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // 1. 強制等待網址參數解析完成 (打開包裹)
  const resolvedParams = await Promise.resolve(params);
  const articleId = resolvedParams.id;

  // 2. 抓取文章並比對 ID
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.id === articleId);

  // 如果真的找不到，才顯示 404
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

        {/* 渲染 AI 寫好的 Markdown SEO 長文 */}
        <div className="prose prose-lg prose-blue max-w-none leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}