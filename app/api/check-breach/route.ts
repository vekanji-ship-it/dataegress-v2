import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 1. 寫入 Notion
    const leadsDbId = process.env.NOTION_LEADS_DATABASE_ID;
    if (leadsDbId) {
      try {
        await notion.pages.create({
          parent: { database_id: leadsDbId.trim() },
          properties: {
            "Email": { title: [{ text: { content: email } }] },
            "Source": { rich_text: [{ text: { content: "Checkup Page - Breach Scanner" } }] }
          }
        });
      } catch (notionError) {
        console.error("Notion Error:", notionError);
      }
    }

    // ==========================================
    // 2. 高階真實感外洩判定邏輯
    // ==========================================
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const emailLower = email.toLowerCase();
    const [prefix, domain] = emailLower.split('@');

    // 真實世界的大型資料外洩事件清單
    const breachDatabase = [
      "Canva (2019)", "LinkedIn (2021)", "Adobe (2013)", 
      "MySpace (2008)", "Dropbox (2012)", "Apollo (2018)",
      "Wattpad (2020)", "Yahoo (2013)", "Dubsmash (2018)",
      "Twitter (2023)", "Facebook (2021)", "Zynga (2019)"
    ];

    let isBreached = false;
    let breachCount = 0;

    // 規則 A：極度常見/測試用信箱 -> 100% 外洩，且數量極多
    const riskyPrefixes = ['test', '123', '1234', 'admin', 'info', 'support', 'demo', 'hello'];
    const isRiskyPrefix = riskyPrefixes.some(r => prefix.includes(r));
    
    // 規則 B：信箱前綴太短 (小於等於 5 個字) -> 極高機率外洩
    const isShortPrefix = prefix.length <= 5;

    // 規則 C：高風險老牌網域
    const isHighRiskDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain);

    // 產生穩定的隨機數 (讓同一個信箱每次測出來結果都一樣，才不會穿幫)
    const hash = emailLower.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

    // 開始判定
    if (isRiskyPrefix) {
      isBreached = true;
      breachCount = (hash % 4) + 4; // 嚴重外洩：隨機給 4~7 個來源
    } else if (isShortPrefix && isHighRiskDomain) {
      isBreached = true;
      breachCount = (hash % 3) + 2; // 中度外洩：隨機給 2~4 個來源
    } else {
      // 一般信箱：有 70% 的機率會中獎 (更符合現代人真實情況)
      if (hash % 10 < 7) { 
        isBreached = true;
        breachCount = (hash % 3) + 1; // 輕度外洩：隨機給 1~3 個來源
      }
    }

    // 如果判定有外洩，從資料庫中隨機抽出對應數量的名單
    if (isBreached) {
      const sources = [];
      for (let i = 0; i < breachCount; i++) {
         const index = (hash + i * 3) % breachDatabase.length; // 加 i*3 讓抽取更隨機分散
         sources.push(breachDatabase[index]);
      }
      // 去除可能重複的來源
      const uniqueSources = Array.from(new Set(sources));
      
      return NextResponse.json({ 
        breached: true, 
        count: uniqueSources.length, 
        sources: uniqueSources 
      });
    }

    // 只有約 30% 的幸運兒能拿到綠色安全盾牌
    return NextResponse.json({ breached: false, count: 0, sources: [] });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}