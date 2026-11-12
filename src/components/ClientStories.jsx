'use client';

import { useState, useEffect, useCallback } from 'react';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import initialReviews from '../data/reviews.json';
import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

export default function ClientStories({ reviews: propReviews = null }) {
  const [reviews, setReviews] = useState(() => {
    if (Array.isArray(propReviews) && propReviews.length > 0) return propReviews;
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
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionBadge>Reviews</SectionBadge>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Client stories
          </h2>
        </div>

        <p className="max-w-[22rem] text-sm sm:text-base leading-relaxed text-white/60 font-light italic font-sans">
          Honest feedback from founder-led teams we&apos;ve worked with — built on deep technical trust, consistency, and long-term collaboration.
        </p>
      </div>

      {/* Testimonials Bento Grid */}
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
    </section>
  );
}
