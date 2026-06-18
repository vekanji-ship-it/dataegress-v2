"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, CheckCircle2, ArrowRight, Sparkles, Bot, Zap,
  MessageSquare, Globe, Database, FileText
} from 'lucide-react';

interface V3ClientPageProps {
  skills?: any[]; 
}

// 龍蝦 AI 假資料 (技能商店看板)
const dummyLobsterSkills = [
  { id: "d1", category: "越南 & 印尼電商", title: "龍蝦 Zalo/Shopee 銷量增長助手", content: "自動處理 Zalo 與 Shopee 客服問答，轉化率提升 35% 以上。", icon: <MessageSquare className="w-6 h-6 text-indigo-600" />, badge: "Hot" },
  { id: "d2", category: "短影音流量引擎", title: "龍蝦 TikTok 爆款腳本大腦", content: "輸入產品亮點，AI 自動產出多語系 TikTok 腳本。", icon: <Zap className="w-6 h-6 text-amber-500" />, badge: "Trending" },
  { id: "d3", category: "跨境出海解決方案", title: "龍蝦 跨國語境翻譯橋樑", content: "解決中國賣家出海障礙，專業翻譯與在地化溝通。", icon: <Globe className="w-6 h-6 text-emerald-500" />, badge: "Enterprise" },
  { id: "d4", category: "數據與自動化", title: "龍蝦 Notion AI 自動化 CRM", content: "將客戶詢價自動分類並存入 Notion，自動生成報價單。", icon: <Database className="w-6 h-6 text-rose-500" />, badge: "Standard" }
];

export default function V3ClientPage({ skills = [] }: V3ClientPageProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");

  const displaySkills = skills.length > 0 ? skills : dummyLobsterSkills;

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const bodyData = {
      contact_name: formData.get('name'),
      company_name: formData.get('company'),
      email: formData.get('email'),
      industry: formData.get('industry'),
      needs: formData.get('pain_point'),
    };

    try {
      const res = await fetch('http://localhost:8000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      
      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data.suggestion);
        setSubmitted(true);
      }
    } catch (err) {
      console.error("提交失敗", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-900 selection:bg-indigo-100">
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg"><Sparkles className="text-white w-5 h-5" /></div>
            <span className="font-black text-xl italic uppercase">Lobster AI</span>
          </div>
          <a href="#leads" className="text-sm font-bold text-white bg-indigo-600 px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-all">立即診斷</a>
        </div>
      </nav>

      <header className="py-24 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900">
          讓 AI 成為您的<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">最強龍蝦員工</span>
        </h1>
      </header>

      <section id="skills" className="py-24 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <h2 className="text-4xl font-black mb-16 flex items-center gap-3"><Bot className="text-indigo-600" /> 龍蝦 AI Skills 技能商店</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displaySkills.map((skill: any) => (
            <motion.div key={skill.id} whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">{skill.icon || <Bot className="text-indigo-600" />}</div>
                {skill.badge && <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-1 rounded-md">{skill.badge}</span>}
              </div>
              <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">{skill.content}</p>
              <button className="w-full py-4 bg-slate-50 rounded-2xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">查看部署文檔</button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="leads" className="py-24 bg-slate-900 relative">
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl">
            
            {submitted ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle2 className="text-green-600 w-6 h-6" /></div>
                  <h2 className="text-2xl font-black text-slate-900">龍蝦 AI 診斷報告已生成</h2>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative">
                  <FileText className="absolute top-6 right-6 text-slate-200 w-12 h-12" />
                  <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{analysisResult}</div>
                </div>
                <button onClick={() => setSubmitted(false)} className="w-full text-indigo-600 font-bold hover:underline py-4">再次提交其他需求</button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black mb-8 text-slate-900">一人公司 AI 深度診斷</h2>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="name" placeholder="稱呼" required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                    <input name="company" placeholder="工作室名" required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                  <input name="email" type="email" placeholder="Email" required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  <select name="industry" required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-500">
                    <option value="">選擇產業</option>
                    <option value="數位行銷">數位行銷</option>
                    <option value="電商零售">電商零售</option>
                    <option value="教育培訓">教育培訓</option>
                  </select>
                  <textarea name="pain_point" placeholder="描述最想自動化的流程..." required className="w-full p-4 bg-slate-50 border-none rounded-2xl h-32 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"></textarea>
                  <button disabled={loading} className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                    {loading ? "龍蝦顧問正在思考中..." : <><Send className="w-5 h-5" /> 立即獲取 AI 方案建議</>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-20 text-center"><p className="text-slate-300 text-xs font-bold tracking-widest uppercase italic">Lobster AI Strategy 2026</p></footer>
    </div>
  );
}