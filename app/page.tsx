import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 mb-8 border border-blue-200 shadow-sm">
        🚀 DataEgress 2.0: From Privacy Defense to Digital Empire
      </div>
      
      <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-8 leading-tight">
        Master Your Digital Sovereignty,<br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Scale Your Solo Business
        </span>
      </h1>
      
      <p className="max-w-2xl text-lg text-slate-600 mb-10 mx-auto leading-relaxed">
        We don't just teach you how to defend; we show you how to securely build and scale your digital assets. Combining objective SaaS reviews, automated workflow tutorials, and advanced privacy guides to build the ultimate digital arsenal for modern creators.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
        <Link href="/scale" className="rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-200">
          Explore Pro Tools
        </Link>
        <Link href="/protect" className="rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all duration-200">
          Fortify Privacy
        </Link>
      </div>
    </div>
  );
}