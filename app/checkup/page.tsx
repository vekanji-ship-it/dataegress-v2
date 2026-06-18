"use client";
import { useState } from 'react';

// ==========================================
// 🤖 工具 1：AI 工具需求評估
// ==========================================
function AIToolQuiz() {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    "你有重複做同樣事情超過三次以上的工作流程嗎？",
    "你曾經花超過一小時整理別人給你的資料或文件嗎？",
    "你有試過 ChatGPT 或其他 AI 工具，但不知道怎麼真正用在工作上？",
    "你每個月花在 SaaS 工具的費用超過 500 元台幣，但只用到部分功能？",
    "你希望有人告訴你「這個情境就用這個工具」，不要自己研究嗎？"
  ];

  const handleAnswer = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 max-w-3xl mx-auto transition-all">
      {!isFinished ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">AI 工具需求評估</span>
            <span className="text-slate-400 text-sm font-medium">第 {step} / 5 題</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-10 leading-tight">
            <span>{questions[step - 1]}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={handleAnswer} className="py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <span>是</span>
            </button>
            <button onClick={handleAnswer} className="py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <span>否</span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 animate-fade-in-up">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            <span>你有很多可以自動化的空間！</span>
          </h3>
          <p className="text-slate-600 mb-8">
            <span>根據你的回答，Make.com + Notion 的組合很適合你的工作情境。建議從部落格的入門文章開始看。</span>
          </p>
          <button onClick={() => { setStep(1); setIsFinished(false); }} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            <span>重新評估</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 🔍 工具 2：AI 工具費用試算
// ==========================================
function CostCalculator() {
  const [tools, setTools] = useState('');
  const [monthly, setMonthly] = useState('');
  const [status, setStatus] = useState<'idle' | 'done'>('idle');

  const handleCalculate = () => {
    if (!monthly || isNaN(Number(monthly))) {
      alert('請輸入有效的金額');
      return;
    }
    setStatus('done');
  };

  const amount = Number(monthly) || 0;
  const yearly = amount * 12;
  const saved = Math.round(yearly * 0.4);

  return (
    <div className="bg-slate-900 rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl max-w-5xl mx-auto transition-all">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest">
          💰 訂閱費用試算
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"><span>你每個月花了多少在 AI 工具上？</span></h2>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          <span>輸入你目前每月的工具訂閱總費用，看看如果整合自動化後可以省下多少。</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="number" 
            placeholder="例：1500（台幣）" 
            value={monthly}
            onChange={(e) => {
              setMonthly(e.target.value);
              if (status !== 'idle') setStatus('idle'); 
            }}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button 
            onClick={handleCalculate}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors min-w-[140px]"
          >
            <span>試算</span>
          </button>
        </div>
        
        {status === 'done' && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-xl animate-fade-in-up space-y-2">
            <p>📅 年費支出：<strong>NT$ {yearly.toLocaleString()}</strong></p>
            <p>✂️ 整合後預估可省：<strong>NT$ {saved.toLocaleString()}</strong>（約 40%）</p>
            <p className="text-sm text-emerald-300 mt-2">透過 Make.com 串接工具，減少重複訂閱的功能重疊。</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 📋 工具 3：AI 工具推薦對照表
// ==========================================
function ToolRecommender() {
  const [role, setRole] = useState('');
  const [usecase, setUsecase] = useState('');

  const recommendations: Record<string, Record<string, string>> = {
    '上班族': {
      '整理資料': 'Notion + Claude：建立資料庫自動分類',
      '重複流程': 'Make.com：設定觸發條件自動執行',
      '寫報告': 'Claude：輸入資料讓 AI 生成草稿',
    },
    '學生': {
      '整理資料': 'Notion：筆記系統 + AI 摘要',
      '重複流程': 'Make.com 免費方案：自動收集資料',
      '寫報告': 'Claude：協助架構與潤稿',
    },
    '自由工作者': {
      '整理資料': 'Airtable + Make.com：客戶資料自動整理',
      '重複流程': 'Make.com：自動發票、提醒、回覆',
      '寫報告': 'Beehiiv + Claude：內容生產流水線',
    },
  };

  const result = role && usecase ? recommendations[role]?.[usecase] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          <span>告訴我你的情況</span>
        </h3>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">你的身分</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors">
              <option value="">請選擇</option>
              <option value="上班族">上班族</option>
              <option value="學生">學生</option>
              <option value="自由工作者">自由工作者</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">你想解決的問題</label>
            <select value={usecase} onChange={(e) => setUsecase(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors">
              <option value="">請選擇</option>
              <option value="整理資料">整理資料</option>
              <option value="重複流程">重複流程自動化</option>
              <option value="寫報告">寫報告/文件</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            <span>推薦工具組合</span>
          </h3>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 min-h-[200px] flex items-center justify-center">
          {result ? (
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-slate-800 font-bold text-lg">{result}</p>
              <p className="text-slate-500 text-sm mt-4">查看部落格了解詳細設定方式</p>
            </div>
          ) : (
            <p className="text-slate-400 text-center">請先選擇你的身分與問題類型</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 主頁面
// ==========================================
export default function CheckupPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto px-6 mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          AI 工具<span className="text-blue-600">需求診斷</span>
        </h1>
        <p className="text-slate-500 text-lg">回答幾個問題，找出最適合你的 AI 工具組合。</p>
      </div>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4"><span>你需要 AI 工具嗎？</span></h2>
        </div>
        <AIToolQuiz />
      </section>

      <section className="container mx-auto px-6 max-w-6xl mb-24">
        <CostCalculator />
      </section>

      <section className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4"><span>工具推薦對照</span></h2>
        </div>
        <ToolRecommender />
      </section>
    </main>
  );
}
