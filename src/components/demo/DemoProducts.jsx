'use client';

import { ExternalLink, CheckCircle, Sparkles, Layers } from 'lucide-react';

export default function DemoProducts({ products = [] }) {
  return (
    <section id="products" className="py-20 sm:py-28 bg-[#050811] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Proprietary Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Software We Own & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                Operate In-House
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Beyond client engineering, we build, incubate, and scale our own commercial SaaS platforms with real-world users and operational revenue.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((prod, idx) => (
            <div
              key={prod.id || idx}
              className="group rounded-2xl bg-[#090d18] border border-white/[0.08] hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/20 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Product Top Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      {prod.status || 'Active SaaS'}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                    {prod.tag || 'SaaS Platform'}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-baseline gap-2">
                    {prod.name}
                    {prod.banglaName && (
                      <span className="text-sm font-medium text-gray-400">
                        ({prod.banglaName})
                      </span>
                    )}
                  </h3>
                </div>

                {/* Product Mockup Image */}
                {prod.image && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#111624] border border-white/10 mb-5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  {prod.description}
                </p>

                {/* Features Checklist */}
                {Array.isArray(prod.features) && prod.features.length > 0 && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                    {prod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-white/[0.06]">
                {prod.liveUrl ? (
                  <a
                    href={prod.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-cyan-500 hover:text-black text-cyan-400 font-semibold text-xs border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 cursor-pointer"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="text-center text-xs text-gray-500 italic py-2">
                    Private Enterprise Cloud
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
