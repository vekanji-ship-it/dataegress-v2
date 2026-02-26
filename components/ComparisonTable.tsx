// components/ComparisonTable.tsx
import Link from 'next/link';

interface ProductData {
  name: string;
  price: string;
  url: string; // Affiliate URL
  features: { name: string; included: boolean }[];
  isWinner?: boolean;
}

interface ComparisonTableProps {
  productA: ProductData;
  productB: ProductData;
}

export default function ComparisonTable({ productA, productB }: ComparisonTableProps) {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Head-to-Head Comparison</h2>
      
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 divide-x divide-slate-200 text-center">
          <div className="p-6 font-semibold text-slate-500 uppercase tracking-wider text-sm flex items-center justify-center">Features</div>
          
          {/* Product A Header */}
          <div className={`p-6 flex flex-col items-center ${productA.isWinner ? 'bg-blue-50/50' : ''}`}>
            {productA.isWinner && <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded mb-2 uppercase tracking-wide">🏆 Winner</span>}
            <h3 className="text-2xl font-bold text-slate-900">{productA.name}</h3>
            <p className="text-slate-500 mt-1">{productA.price}</p>
          </div>

          {/* Product B Header */}
          <div className={`p-6 flex flex-col items-center ${productB.isWinner ? 'bg-blue-50/50' : ''}`}>
            {productB.isWinner && <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded mb-2 uppercase tracking-wide">🏆 Winner</span>}
            <h3 className="text-2xl font-bold text-slate-900">{productB.name}</h3>
            <p className="text-slate-500 mt-1">{productB.price}</p>
          </div>
        </div>

        {/* Feature Rows */}
        <div className="divide-y divide-slate-200">
          {productA.features.map((feature, index) => (
            <div key={index} className="grid grid-cols-3 divide-x divide-slate-200 text-center hover:bg-slate-50 transition-colors">
              <div className="p-4 flex items-center justify-center text-sm font-medium text-slate-700">{feature.name}</div>
              
              <div className={`p-4 flex items-center justify-center ${productA.isWinner ? 'bg-blue-50/20' : ''}`}>
                {feature.included ? (
                  <span className="text-emerald-500 text-xl">✓</span>
                ) : (
                  <span className="text-slate-300 text-xl">✗</span>
                )}
              </div>
              
              <div className={`p-4 flex items-center justify-center ${productB.isWinner ? 'bg-blue-50/20' : ''}`}>
                {productB.features[index].included ? (
                  <span className="text-emerald-500 text-xl">✓</span>
                ) : (
                  <span className="text-slate-300 text-xl">✗</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Rows */}
        <div className="grid grid-cols-3 bg-slate-50 border-t border-slate-200 divide-x divide-slate-200 text-center p-6">
          <div></div>
          <div className="px-4">
            <Link href={productA.url} target="_blank" className={`block w-full rounded-lg py-3 text-sm font-bold shadow-sm transition-all ${productA.isWinner ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50'}`}>
              Get {productA.name}
            </Link>
          </div>
          <div className="px-4">
            <Link href={productB.url} target="_blank" className={`block w-full rounded-lg py-3 text-sm font-bold shadow-sm transition-all ${productB.isWinner ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50'}`}>
              Get {productB.name}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}