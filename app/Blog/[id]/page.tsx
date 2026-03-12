// app/blog/[id]/page.tsx
import { getPublishedArticles } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPost({ params }: { params: { id: string } }) {
  // 取得所有文章，並找出符合目前網址 ID 的那一篇
  const articles = await getPublishedArticles();
  const article = articles.find((a) => a.id === params.id);

  // 如果找不到文章，顯示 404 頁面
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

        {/* 使用 react-markdown 渲染 Notion 傳來的文字 */}
        <div className="prose prose-lg prose-blue max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}