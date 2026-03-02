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

    // 2. 模擬檢測
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const isHighRisk = email.includes('gmail.com') || email.includes('yahoo.com') || email.includes('hotmail.com');
    
    // 🌟 這裡就是解決 Vercel 編譯失敗的關鍵
    const hash = email.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    
    if (isHighRisk && hash % 3 !== 0) {
      const mockBreaches = ["Canva (2019)", "LinkedIn (2021)", "Adobe (2013)"];
      const breachCount = (hash % 3) + 1;
      return NextResponse.json({ 
        breached: true, 
        count: breachCount, 
        sources: mockBreaches.slice(0, breachCount) 
      });
    }

    return NextResponse.json({ breached: false, count: 0, sources: [] });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}