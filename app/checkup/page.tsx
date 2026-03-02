"use client";
import { useState } from 'react';

// ==========================================
// 🛡️ 工具 1：Privacy Quiz 
// ==========================================
function PrivacyQuiz() {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    "Do you use the same password across multiple accounts?",
    "Have you ever searched your own name on Google?",
    "Do you use a VPN on public Wi-Fi?",
    "Have you ever clicked 'Accept All Cookies' without reading?",
    "Is your phone number linked to your social media profiles?"
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
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">Privacy Checkup</span>
            <span className="text-slate-400 text-sm font-medium">Step {step} / 5</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-10 leading-tight">
            {/* 🌟 防崩潰裝甲：用 span 包覆變動文字 */}
            <span>{questions[step - 1]}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={handleAnswer} className="py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <span>Yes</span>
            </button>
            <button onClick={handleAnswer} className="py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <span>No</span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 animate-fade-in-up">
          <div className="text-5xl mb-4">🚨</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            <span>High Risk Detected</span>
          </h3>
          <p className="text-slate-600 mb-8">
            <span>Your digital footprint is highly exposed. We strongly recommend using a password manager and a VPN immediately.</span>
          </p>
          <button onClick={() => { setStep(1); setIsFinished(false); }} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 🚨 工具 2：Breach Checker 
// ==========================================
function BreachChecker() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'clean' | 'breached' | 'error'>('idle');
  const [breachData, setBreachData] = useState<{count: number, sources: string[]}>({count: 0, sources: []});

  const handleScan = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setStatus('scanning');
    try {
      const res = await fetch('/api/check-breach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data.breached) {
        setBreachData({ count: data.count, sources: data.sources });
        setStatus('breached');
      } else {
        setStatus('clean');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-900 rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl max-w-5xl mx-auto transition-all">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest">
          🔒 Breach_Database_v2.0
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"><span>Has your email been leaked on the Dark Web?</span></h2>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          <span>Enter your primary email address, and we will scan the world's largest data breach databases to check if your credentials have been compromised.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== 'idle') setStatus('idle'); 
            }}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button 
            onClick={handleScan}
            disabled={status === 'scanning'}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors disabled:opacity-50 min-w-[140px]"
          >
            <span>{status === 'scanning' ? 'Scanning...' : 'Check Now'}</span>
          </button>
        </div>
        
        {status === 'breached' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-xl animate-fade-in-up">
            ⚠️ <strong>Alert:</strong> <span>We found your email in <strong>{breachData.count}</strong> data breaches (e.g., {breachData.sources.join(', ')}). Change your passwords immediately.</span>
          </div>
        )}
        
        {status === 'clean' && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-xl animate-fade-in-up">
            ✅ <strong>Good News:</strong> <span>We couldn't find this email in any known data breaches. Keep it safe by using a password manager!</span>
          </div>
        )}

        {status === 'error' && (
          <div className="text-amber-400 text-sm mt-4"><span>Connection error. Please try again later.</span></div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// ⚖️ 工具 3：Legal Generator
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
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          <span>Fill in Your Details</span>
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
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 relative shadow-blue-900/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            <span>Preview & Copy</span>
          </h3>
          <button onClick={handleCopy} className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <span>Copy Letter</span>
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
// 🚀 主頁面
// ==========================================
export default function CheckupPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto px-6 mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          Security <span className="text-blue-600">Checkup</span>
        </h1>
      </div>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4"><span>Is your data safe?</span></h2>
        </div>
        <PrivacyQuiz />
      </section>

      <section className="container mx-auto px-6 max-w-6xl mb-24">
         <BreachChecker />
      </section>

      <section className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4"><span>Free Legal Letter Generator</span></h2>
        </div>
        <LegalGenerator />
      </section>
    </main>
  );
}