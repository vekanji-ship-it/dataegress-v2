import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// ==========================================
// 1. 介面定義 (Interfaces)
// ==========================================
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
  slug: string; // 🌟 新增：漂亮網址標籤
  title: string;
  publishStatus: string;
  content: string;
  createdAt: string;
}

// ==========================================
// 2. 初始化 Notion 客戶端
// ==========================================
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY || "",
});
const n2m = new NotionToMarkdown({ notionClient: notionClient });

// ==========================================
// 3. 原本的 SaaS 工具抓取 (完全保留)
// ==========================================
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
        name: props.Name?.title?.[0]?.plain_text || "未命名",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        tagline: props.Tagline?.rich_text?.[0]?.plain_text || "",
        category: props.Category?.multi_select?.map((c: any) => c.name) || [],
        pricing: props.Pricing_Start?.rich_text?.[0]?.plain_text || "價格未定",
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

// ==========================================
// 4. 新增的魔法：抓取 Notion 頁面正文並轉成 Markdown
// ==========================================
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

// ==========================================
// 5. 🌟 升級版函數：抓取包含 Slug 的部落格文章
// ==========================================
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
          property: '發布狀態', 
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

      return {
        id: page.id,
        // 🌟 核心升級：抓取 Slug 欄位，如果沒填則用 ID 當後備
        slug: props["Slug"]?.rich_text?.[0]?.plain_text || page.id,
        title: props["文章標題"]?.title?.[0]?.plain_text || "無標題",
        publishStatus: props["發布狀態"]?.status?.name || "未知狀態",
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