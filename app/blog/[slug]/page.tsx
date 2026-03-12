// app/blog/[Slug]/page.tsx
import { getPublishedArticles } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPost({ params }: { params: Promise<{ Slug?: string; slug?: string }> }) {
  // 1. 拿到網址上的參數 (同時兼容 Slug 和 slug)
  const resolvedParams = await params;
  
  // 🌟 防彈機制：不管系統給大寫還是小寫，都抓出來，並確保它不是 undefined
  const rawSlug = resolvedParams.Slug || resolvedParams.slug;
  
  if (!rawSlug) {
    console.error("❌ 找不到網址參數 params");
    notFound();
  }

  const urlSlug = rawSlug.toLowerCase().trim();

  // 2. 抓取文章清單
  const articles = await getPublishedArticles();
  
  // 3. 強化版比對邏輯
  const article = articles.find((a) => {
    const notionSlug = (a.slug || "").toLowerCase().trim();
    const notionId = (a.id || "").trim();
    return notionSlug === urlSlug || notionId === urlSlug;
  });

  // 如果找不到文章，顯示 404
  if (!article) {
    console.warn(`⚠️ 找不到對應的文章內容，Slug 為: ${urlSlug}`);
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
          <p className="text-gray-500 text-sm">
            發布日期：{new Date(article.createdAt).toLocaleDateString('zh-TW')}
          </p>
        </header>

        {/* 渲染內文 */}
        <div className="prose prose-lg prose-blue max-w-none leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}