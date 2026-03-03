// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfd]">
      
      {/* 🚀 Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wider">
          For Solopreneurs & Digital Nomads
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
          The Ultimate Tech Stack <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            For One-Person Empires
          </span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop wasting money on bloated software. We curate, test, and compare the most cost-effective tools to help you protect, build, and scale your digital business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/checkup" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            Free Privacy Checkup
          </Link>
          <Link href="/stack" className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all text-lg">
            Explore The Stack
          </Link>
        </div>
      </section>

      {/* 🧭 分類導覽指南 (How It Works) */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Build Your Empire</h2>
            <p className="text-slate-500 text-lg">Follow our 4-step framework to assemble your perfect toolkit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1: Protect */}
            <Link href="/protect" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700">1. Protect</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Secure your digital footprint before building. Discover the best VPNs and password managers.</p>
              <span className="text-emerald-600 font-semibold text-sm">View Tools →</span>
            </Link>

            {/* Step 2: Build */}
            <Link href="/build" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-fuchsia-50 hover:border-fuchsia-200 transition-all duration-300">
              <div className="w-14 h-14 bg-fuchsia-100 text-fuchsia-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🏗️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-fuchsia-700">2. Build</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Construct your base. Compare lightweight website builders, hosting, and community platforms.</p>
              <span className="text-fuchsia-600 font-semibold text-sm">View Tools →</span>
            </Link>

            {/* Step 3: Scale */}
            <Link href="/scale" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-700">3. Scale</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Multiply your reach. We analyze SEO tools, cold email software, and marketing automations.</p>
              <span className="text-orange-600 font-semibold text-sm">View Tools →</span>
            </Link>

            {/* Step 4: Stack */}
            <Link href="/stack" className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🧠</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700">4. Stack</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Connect the dots. Find the ultimate productivity hubs and project management systems.</p>
              <span className="text-blue-600 font-semibold text-sm">View Tools →</span>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}