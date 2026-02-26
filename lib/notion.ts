// lib/notion.ts
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
}

export async function getSaaSTools(): Promise<SaaSTool[]> {
  // 🧹 1. 自動清理字串 (去除可能不小心複製到的空格或 ?v= 參數)
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
        // 🚨 【診斷模式】：我們先暫時註解掉過濾器，看看是不是 Status 欄位格式的問題
        /*
        filter: {
          property: 'Status',
          status: { equals: 'Published' },
        },
        */
        sorts: [
          { property: 'Rating', direction: 'descending' },
        ],
      }),
      // 為了除錯，我們暫時不快取，確保每次重整都是最新狀態
      cache: 'no-store' 
    });

    if (!response.ok) {
      // 🌟 2. 攔截最原始的錯誤文字，絕對不會再顯示 {}
      const errorText = await response.text();
      console.error("❌ Notion API 原始錯誤訊息：", errorText);
      console.error("👉 正在嘗試讀取的 Database ID 為：", databaseId);
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