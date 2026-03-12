import { getPublishedArticles } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPost({ params }: { params: Promise<{ Slug?: string; slug?: string }> }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.Slug || resolvedParams.slug;
  
  if (!rawSlug) {
    notFound();
  }

  const urlSlug = rawSlug.toLowerCase().trim();
  const articles = await getPublishedArticles();
  
  const article = articles.find((a) => {
    const notionSlug = (a.slug || "").toLowerCase().trim();
    const notionId = (a.id || "").trim();
    return notionSlug === urlSlug || notionId === urlSlug;
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        &larr; Back to Blog {/* 🌟 英文返回按鈕 */}
      </Link>
      
      <article>
        <header className="mb-10 pb-6 border-b">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {/* 🌟 英文發布日期與美式格式 */}
            Published on: {new Date(article.createdAt).toLocaleDateString('en-US')}
          </p>
        </header>

        <div className="prose prose-lg prose-blue max-w-none leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}