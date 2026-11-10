'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'High-Performance SaaS Web Application',
    category: 'web',
    categoryName: 'Web Development',
    impact: '99 Speed Score • Next.js 16',
    description: 'Ultra-fast, responsive web platform featuring kinetic scroll transitions, interactive 3D UI components, and dynamic admin content management.',
    image: '/images/portfolio/web-dev-driven.jpg',
    tags: ['Next.js 16', 'Tailwind CSS', 'Framer Motion', 'Lenis']
  },
  {
    id: 2,
    title: 'AI & Meta Ad Scaling Command Engine',
    category: 'meta',
    categoryName: 'AI & Meta Ads',
    impact: '4.8x ROAS • $140k Revenue',
    description: 'Scalable advertising telemetry utilizing Meta Conversions API (CAPI), AI audience modeling, and automated conversion funnels that slash CAC.',
    image: '/images/portfolio/meta-ads-driven.jpg',
    tags: ['Meta Ads', 'CAPI Tracking', 'AI Funnels', 'ROAS Scaler']
  },
  {
    id: 3,
    title: 'Executive Brand Identity & Design System',
    category: 'design',
    categoryName: 'Graphic Design',
    impact: 'Complete Brand Book & 3D Assets',
    description: 'Comprehensive brand architecture, bespoke typography posters, Pantone color harmonies, digital stationery, and Figma design tokens.',
    image: '/images/portfolio/graphic-design-driven.jpg',
    tags: ['Brand Guidelines', 'Figma', 'Typography', 'Logo Systems']
  },
  {
    id: 4,
    title: 'Omnichannel B2B Growth Strategy',
    category: 'marketing',
    categoryName: 'Digital Marketing',
    impact: '350% Qualified Leads Surge',
    description: 'Strategic B2B market penetration across search and social channels with automated high-converting nurture funnels and SEO supremacy.',
    image: '/images/portfolio/digital-marketing-driven.jpg',
    tags: ['Growth Hacking', 'B2B Funnels', 'Content Engine', 'SEO']
  }
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="relative py-28 px-4 sm:px-6 bg-[#030712] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
              <Layers size={13} />
              <span>PROVEN TRACK RECORD • BESPOKE CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected Work &amp; Case Studies
            </h2>
            <p className="mt-3 text-slate-300 text-base font-light">
              Explore how we engineer quantifiable impact across engineering, digital marketing, AI ads, and branding.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'web', label: 'Web Development' },
              { id: 'meta', label: 'AI & Meta Ads' },
              { id: 'design', label: 'Graphic Design' },
              { id: 'marketing', label: 'Digital Marketing' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono capitalize transition-all ${
                  filter === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with newly generated AI images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl p-6 sm:p-8 bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950 mb-6 border border-white/10 shadow-lg">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] font-mono text-blue-300">
                      {proj.categoryName}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                      {proj.impact}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
