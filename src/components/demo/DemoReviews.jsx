'use client';

import { Star, Quote, CheckCircle2, TrendingUp } from 'lucide-react';

export default function DemoReviews({ reviews = [] }) {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#050811] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Client Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Trusted by Founders & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                High-Growth Companies
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Real feedback from enterprise clients and visionary founders who trusted Driven IT Solution to engineer their core digital infrastructure.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="group rounded-2xl bg-[#090d18] border border-white/[0.08] hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/25 hover:-translate-y-1 relative"
            >
              <div>
                {/* 5 Stars & Metric Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {rev.metrics && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3" />
                      <span>{rev.metrics}</span>
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-6">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author & Company */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {rev.clientName}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {rev.role} {rev.company ? `· ${rev.company}` : ''}
                  </p>
                </div>

                {rev.country && (
                  <span className="text-[11px] font-medium text-gray-400 px-2 py-0.5 rounded bg-white/[0.04]">
                    {rev.country}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
