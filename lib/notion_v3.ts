// lib/notion_v3.ts
export async function getV3Content() {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !DATABASE_ID) return [];

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          // 嘗試搜尋 Status 或 狀態 欄位 [cite: 739]
          or: [
            { property: 'Status', status: { equals: 'Published' } },
            { property: '狀態', status: { equals: 'Published' } }
          ]
        }
      }),
      next: { revalidate: 1 } 
    });

    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((page: any) => {
      const p = page.properties;
      
      // 動態尋找「標題」類型的欄位，不管它叫 Title 還是 Name
      const titleProp = Object.values(p).find((prop: any) => prop.type === 'title') as any;
      const titleText = titleProp?.title[0]?.plain_text || '未命名工具';

      // 動態尋找「內容」或「描述」欄位
      const contentProp = p['Content'] || p['內容'] || p['Description'];
      const contentText = contentProp?.rich_text[0]?.plain_text || '點擊下方按鈕查看詳細安裝與工具說明。';

      return {
        id: page.id,
        title: titleText,
        content: contentText,
        // 相容不同命名方式的分類與連結
        category: p['Skill Category']?.select?.name || p['分類']?.select?.name || 'AI 工具',
        affiliateLink: p['Affiliate Link']?.url || p['聯盟連結']?.url || '#',
        voiceover: p['配音連結']?.url || '',
      };
    });
  } catch (error) {
    console.error("V3 Fetch 失敗:", error);
    return [];
  }
}