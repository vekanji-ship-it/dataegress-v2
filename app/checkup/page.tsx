"use client";

import { useState } from 'react';

// ==========================================
// 🛡️ 工具 1：Privacy Quiz (隱私測驗)
// ==========================================
function PrivacyQuiz() {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

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
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">Privacy Checkup</span>
            <span className="text-slate-400 text-sm font-medium">Step {step} / 5</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-10 leading-tight">
            {step === 1 && "Do you use the same password across multiple accounts?"}
            {step === 2 && "Have you ever searched your own name on Google?"}
            {step === 3 && "Do you use a VPN on public Wi-Fi?"}
            {step === 4 && "Have you ever clicked 'Accept All Cookies' without reading?"}
            {step === 5 && "Is your phone number linked to your social media profiles?"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={handleAnswer} className="py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              Yes
            </button>
            <button onClick={handleAnswer} className="py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              No
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 animate-fade-in-up">
          <div className="text-5xl mb-4">🚨</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">High Risk Detected</h3>
          <p className="text-slate-600 mb-8">Your digital footprint is highly exposed. We strongly recommend using a password manager and a VPN immediately.</p>
          <button onClick={() => { setStep(1); setIsFinished(false); }} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 🚨 工具 2：Breach Checker (外洩掃描器)
// ==========================================
function BreachChecker() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'result'>('idle');

  const handleScan = () => {
    if (!email) return;
    setStatus('scanning');
    // 模擬掃描延遲
    setTimeout(() => {
      setStatus('result');
    }, 2000);
  };

  return (
    <div className="bg-slate-900 rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest">
          🔒 Breach_Database_v2.0
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Has your email been leaked on the Dark Web?</h2>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          Enter your primary email address, and we will scan the world's largest data breach databases to check if your credentials have been compromised.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button 
            onClick={handleScan}
            disabled={status === 'scanning'}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors disabled:opacity-50 min-w-[140px]"
          >
            {status === 'scanning' ? 'Scanning...' : 'Check Now'}
          </button>
        </div>
        
        {status === 'result' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl animate-fade-in-up">
            ⚠️ <strong>Alert:</strong> We found 2 potential breaches related to this email in public databases. Please update your passwords.
          </div>
        )}
        <p className="text-slate-500 text-xs mt-4">* This tool performs simulated queries for educational purposes. We do not store your email.</p>
      </div>
      
      {/* 右側背景大盾牌裝飾 (使用純 CSS 繪製) */}
      <div className="absolute right-[-10%] top-1/2 transform -translate-y-1/2 opacity-[0.03] pointer-events-none hidden md:block">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// ⚖️ 工具 3：Legal Generator (律師信生成器)
// ==========================================
function LegalGenerator() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const letterContent = `Subject: Formal Data Deletion Request (Authorized by CCPA/GDPR)

To Data Privacy Officer,

My name is ${name || '[Your Full Name]'} and I reside at ${address || '[Your Address]'}.

I am writing to formally request the permanent deletion of my personal information from your database. This request is made under the rights guaranteed to me by consumer privacy laws (including CCPA, GDPR, and other applicable local regulations).

Furthermore, I request that you:
1. Remove all my personal identifiable information (PII) from your public-facing websites.
2. Notify any third-party data brokers or service providers with whom you have shared my data to do the same.
3. Provide a written confirmation once the deletion process is complete.

Thank you for your prompt attention to this legal matter.

Sincerely,

${name || '[Your Signature]'}
Date: ${date}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    alert('Letter copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* 左側：表單 */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Fill in Your Details
        </h3>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Address</label>
            <input type="text" placeholder="e.g. 123 Privacy St, New York, NY" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Request Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-600" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-6">* Your data is used only for real-time generation in your browser. We do not store any personal information.</p>
      </div>

      {/* 右側：預覽與複製 */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 relative shadow-blue-900/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Preview & Copy
          </h3>
          <button onClick={handleCopy} className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            Copy Letter
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono text-sm text-slate-600 whitespace-pre-wrap h-[400px] overflow-y-auto custom-scrollbar">
          {letterContent}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 主頁面：整合以上三個工具
// ==========================================
export default function CheckupPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] py-12 md:py-20">
      
      {/* 頂部標題介紹 */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          Security <span className="text-blue-600">Checkup</span>
        </h1>
        <p className="text-xl text-slate-500">
          Evaluate your digital footprint, scan for dark web breaches, and generate legal removal requests in minutes.
        </p>
      </div>

      {/* 🛡️ 第一關：Privacy Quiz */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Is your data safe?</h2>
          <p className="text-slate-500 text-lg">Most personal data is traded openly on the black market. Complete a 60-second check to get your personalized privacy protection advice.</p>
        </div>
        <PrivacyQuiz />
      </section>

      {/* 🚨 第二關：Breach Checker */}
      <section className="container mx-auto px-6 max-w-6xl mb-24">
         <BreachChecker />
      </section>

      {/* ⚖️ 第三關：Legal Generator */}
      <section className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            Free Tool
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Free Legal Letter Generator</h2>
          <p className="text-slate-500 text-lg">Encountering a site with no "Opt-out" button? Use this tool to generate a GDPR/CCPA compliant request instantly.</p>
        </div>
        <LegalGenerator />
      </section>

    </main>
  );
}