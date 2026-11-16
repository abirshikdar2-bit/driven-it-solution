'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import initialReviews from '../data/reviews.json';
import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

export default function ClientStories({ reviews: propReviews = null }) {
  const [reviews, setReviews] = useState(() => {
    if (Array.isArray(propReviews)) return propReviews;
    return Array.isArray(initialReviews) ? initialReviews : [];
  });

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setReviews(data);
          saveLocalCache('reviews', data);
        }
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(propReviews)) {
      setReviews(propReviews);
    }
  }, [propReviews]);

  useEffect(() => {
    if (!propReviews) {
      fetchReviews();
    }
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.entity === 'reviews' || event.entity === 'all') {
        if (event.meta?.data && Array.isArray(event.meta.data)) {
          setReviews(event.meta.data);
          saveLocalCache('reviews', event.meta.data);
        } else {
          fetchReviews();
        }
      }
    });
    return () => unsubscribe();
  }, [propReviews, fetchReviews]);

  return (
    <section id="reviews" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-10 sm:pb-16 relative">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <div>
          <SectionBadge>Reviews</SectionBadge>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Client stories
          </h2>
        </div>
      </div>

      {/* Testimonials Bento Grid */}
      {reviews.length === 0 ? (
        <div className="relative border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 md:p-16 text-center overflow-hidden group">
          <CornerBrackets className="border-cyan-400/30" />
          
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* 5 Stars Rating Visual */}
            <div className="flex items-center gap-1.5 text-amber-400 text-lg mb-4 tracking-widest">
              {'★★★★★'}
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Verified Client Trust & Delivery
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              Trusted by Ambitious Founders Worldwide
            </h3>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light italic max-w-xl mb-8">
              We partner closely with founder-led teams and scaling enterprises across 9+ countries. Detailed client endorsements and verified conversion metrics are being published following recent enterprise launches.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/8801909711808?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20learn%20more%20about%20your%20client%20partnerships."
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 bg-white/5 hover:bg-logo-gradient hover:text-black text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <span>Talk with Our Leadership</span>
                <ArrowUpRight size={15} />
                <CornerBrackets className="border-white/30" />
              </a>

              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-white/40 hover:text-cyan-400 transition-colors"
              >
                <span>Add Reviews in Admin →</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev) => (
          <div
            key={rev.id}
            className="relative border border-white/10 bg-[#0a0a0b] p-8 flex flex-col justify-between group hover:border-cyan-400/40 transition-colors"
          >
            <div>
              {/* Stars & Metric Pill */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="text-cyan-400 text-sm tracking-widest" aria-hidden="true">
                  {'★'.repeat(rev.rating || 5)}
                </div>
                {rev.metrics && (
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    {rev.metrics}
                  </span>
                )}
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-sm leading-relaxed text-white/80 font-light italic font-sans">
                &ldquo;{rev.quote}&rdquo;
              </blockquote>
            </div>

            {/* Client Profile */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold overflow-hidden">
                {rev.avatar && (rev.avatar.startsWith('/') || rev.avatar.startsWith('http')) ? (
                  <img src={rev.avatar} alt={rev.clientName} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                ) : (
                  <span>{rev.avatar || (rev.clientName ? rev.clientName.slice(0, 2).toUpperCase() : 'CL')}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white font-mono uppercase tracking-wide truncate">
                  {rev.clientName}
                </span>
                <span className="text-[11px] text-white/50 font-sans font-light italic truncate">
                  {rev.role}{rev.company ? ` · ${rev.company}` : ''}{rev.country ? ` (${rev.country})` : ''}
                </span>
              </div>
            </div>

            <CornerBrackets className="border-white/20" />
          </div>
        ))}
        </div>
      )}
    </section>
  );
}
