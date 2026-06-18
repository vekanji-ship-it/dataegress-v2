// lib/notion.ts
import { Client } from '@notionhq/client';

// 確保只會實例化一次，避免 Next.js 熱重載出錯
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function getAutomatedContent() {
  if (!DATABASE_ID) {
    console.error("❌ NOTION_DATABASE_ID 未設定");
    return [];
  }

  try {
    // 明確呼叫實例化的 notionClient
    const response = await notionClient.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status', // 必須對齊 Content Pipeline 的欄位名稱
        status: {
          equals: 'Published',
        },
      },
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title[0]?.plain_text || 'Untitled',
        content: props.Content?.rich_text[0]?.plain_text || '',
        category: props['Skill Category']?.select?.name || 'General',
        affiliateLink: props['Affiliate Link']?.url || '#',
        voiceover: props.配音連結?.url || '',
      };
    });
  } catch (error) {
    console.error("❌ Notion API 查詢失敗:", error);
    return [];
  }
}