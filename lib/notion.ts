import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export interface SaaSTool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string[];
  pricing: string;
  affiliateUrl: string;
  rating: number;
  videoUrl: string | null;
  pros: string[];
  cons: string[];
  content?: string;
}

export interface Article {
  id: string;
  slug: string; 
  title: string;
  coverImage: string | null; 
  publishStatus: string;
  content: string;
  createdAt: string;
}

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY || "",
});
const n2m = new NotionToMarkdown({ notionClient: notionClient });

export async function getSaaSTools(): Promise<SaaSTool[]> {
  const rawDbId = process.env.NOTION_DATABASE_ID || "";
  const rawApiKey = process.env.NOTION_API_KEY || "";
  const databaseId = rawDbId.trim().split('?')[0]; 
  const apiKey = rawApiKey.trim();

  if (!databaseId || !apiKey) {
    console.warn("⚠️ 尚未設定 NOTION_DATABASE_ID 或 NOTION_API_KEY");
    return [];
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Status',
          status: { equals: 'Published' },
        },
        sorts: [
          { property: 'Rating', direction: 'descending' },
        ],
      }),
      cache: 'no-store' 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Notion API 原始錯誤訊息：", errorText);
      return [];
    }

    const data = await response.json();

    return data.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: props.Name?.title?.[0]?.plain_text || "Untitled",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        tagline: props.Tagline?.rich_text?.[0]?.plain_text || "",
        category: props.Category?.multi_select?.map((c: any) => c.name) || [],
        pricing: props.Pricing_Start?.rich_text?.[0]?.plain_text || "TBD",
        affiliateUrl: props.Affiliate_URL?.url || "#",
        rating: props.Rating?.number || 0,
        videoUrl: props.Video_URL?.url || null,
        pros: props.Pros?.multi_select?.map((p: any) => p.name) || [],
        cons: props.Cons?.multi_select?.map((c: any) => c.name) || [],
      };
    });
  } catch (error) {
    console.error("❌ 系統發生預期外的錯誤:", error);
    return [];
  }
}

export async function getNotionPageContent(pageId: string) {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent || ""; 
  } catch (error) {
    console.error("❌ 轉換 Markdown 失敗:", error);
    return "";
  }
}

// 🌟 對接英文版 Content Pipeline
export async function getPublishedArticles(): Promise<Article[]> {
  const databaseId = process.env.NOTION_CONTENT_DB_ID || "";
  const apiKey = process.env.NOTION_API_KEY || "";

  if (!databaseId || !apiKey) {
    console.warn("⚠️ 尚未設定 NOTION_CONTENT_DB_ID");
    return [];
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Status', // 對接 Status 欄位
          status: { equals: 'Published' }, 
        },
        sorts: [
          { timestamp: 'created_time', direction: 'descending' },
        ],
      }),
      cache: 'no-store' 
    });

    if (!response.ok) return [];

    const data = await response.json();

    const articles = await Promise.all(data.results.map(async (page: any) => {
      const props = page.properties;
      const contentMarkdown = await getNotionPageContent(page.id); 

      let coverImageUrl = null;
      // 對接 Cover Image 欄位
      const coverFile = props["Cover Image"]?.files?.[0];
      if (coverFile) {
        coverImageUrl = coverFile.external?.url || coverFile.file?.url || null;
      }

      return {
        id: page.id,
        slug: props["Slug"]?.rich_text?.[0]?.plain_text || page.id,
        title: props["Title"]?.title?.[0]?.plain_text || "Untitled", // 對接 Title 欄位
        coverImage: coverImageUrl, 
        publishStatus: props["Status"]?.status?.name || "Draft", // 對接 Status 欄位
        createdAt: page.created_time,
        content: contentMarkdown, 
      };
    }));

    return articles;
  } catch (error) {
    console.error("❌ 抓取文章清單失敗:", error);
    return [];
  }
}