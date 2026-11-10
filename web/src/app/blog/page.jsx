'use client';

import { useState } from 'react';
import Link from 'next/link';
import MollahsNavbar from '@/components/MollahsNavbar';
import MollahsFooter from '@/components/MollahsFooter';
import FlowFieldCanvas from '@/components/FlowFieldCanvas';
import CornerBrackets, { SectionBadge } from '@/components/CornerBrackets';
import { ArrowUpRight, Search, Tag, Calendar, Clock, Sparkles } from 'lucide-react';

const blogPosts = [
  {
    id: 'meta-capi-guide-2026',
    title: 'Why Client-Side Meta Pixels Fail & How CAPI Restores 35%+ Lost Ad Telemetry',
    summary: 'A deep-dive into iOS privacy restrictions, ad-blockers, and why server-side Conversions API (CAPI) is essential to scale ad ROAS in 2026.',
    category: 'AI & Meta Ads',
    date: 'Nov 04, 2026',
    readTime: '6 min read',
    tags: ['Meta CAPI', 'Ad Telemetry', 'ROAS Scaler'],
    readMoreUrl: '/contact'
  },
  {
    id: 'nextjs-16-turbopack-production',
    title: 'Next.js 16 & Turbopack: Engineering Sub-50ms Global Core Web Vitals',
    summary: 'Architectural lessons from shipping high-traffic enterprise applications with partial prerendering, streaming server components, and edge caching.',
    category: 'AI Web Development',
    date: 'Oct 28, 2026',
    readTime: '8 min read',
    tags: ['Next.js 16', 'Performance', 'Full-Stack'],
    readMoreUrl: '/contact'
  },
  {
    id: 'swiss-typography-luxury-branding',
    title: 'The Art of Swiss Minimalism: Why Restrained Typography Commands Higher Retainers',
    summary: 'How international typographic style and grid-aligned design tokens build authority and customer trust for high-ticket technology studios.',
    category: 'Creative AI Branding',
    date: 'Oct 19, 2026',
    readTime: '5 min read',
    tags: ['Design Systems', 'Figma', 'Typography'],
    readMoreUrl: '/contact'
  },
  {
    id: 'autonomous-ai-voice-receptionists',
    title: 'Building 24/7 AI Voice Receptionists That Close Bookings Without Hallucinations',
    summary: 'How we structure deterministic guardrails, low-latency telephony APIs, and CRM integrations for automated inbound booking agents.',
    category: 'Intelligent Automation',
    date: 'Oct 12, 2026',
    readTime: '7 min read',
    tags: ['AI Agents', 'Automation', 'CRM'],
    readMoreUrl: '/contact'
  },
  {
    id: 'ai-seo-programmatic-growth',
    title: 'Programmatic SEO & Knowledge Graph Optimization: Dominating Search Results',
    summary: 'How semantic vector search and dynamic content generation allow e-commerce and SaaS brands to rank for thousands of high-intent search queries.',
    category: 'AI SEO & Analytics',
    date: 'Oct 05, 2026',
    readTime: '9 min read',
    tags: ['SEO', 'Knowledge Graph', 'Organic Traffic'],
    readMoreUrl: '/contact'
  },
  {
    id: 'headless-ecommerce-high-conversions',
    title: 'Headless E-commerce with Next.js & Shopify: Tripling Mobile Checkout Velocity',
    summary: 'Eliminating bloated checkout scripts and utilizing instant optimistic UI updates to dramatically boost mobile conversion rates.',
    category: 'AI E-commerce',
    date: 'Sep 27, 2026',
    readTime: '6 min read',
    tags: ['E-commerce', 'Shopify', 'Conversion Rate'],
    readMoreUrl: '/contact'
  }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = [
    'All',
    'AI Web Development',
    'Intelligent Automation',
    'Creative AI Branding',
    'AI & Meta Ads',
    'AI SEO & Analytics',
    'AI E-commerce'
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden relative">
      {/* 100% Exact FlowField Background matching Mollahs IT */}
      <div className="w-full h-full bg-black overflow-hidden absolute inset-0 z-0 pointer-events-none">
        <FlowFieldCanvas
          color="#22d3ee"
          trailOpacity={0.15}
          particleCount={600}
          speed={0.5}
        />
      </div>

      {/* Navbar with Driven IT Solution Brand Logo */}
      <MollahsNavbar />

      {/* Main Content Overlay */}
      <main className="relative z-10 pt-32 pb-24">
        {/* Header matching Mollahs IT */}
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <SectionBadge>Blogs</SectionBadge>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white font-sans">
            Latest <span className="bg-logo-gradient bg-clip-text text-transparent">insights</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-light italic font-sans max-w-2xl">
            Discover the latest engineering insights, detailed architecture guides, and strategies to scale your digital presence.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="bg-[#0b0c10]/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="Search technical insights, topics, tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-black/60 border border-white/5 rounded-xl text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                    selectedCat === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'bg-white/[0.02] text-gray-400 border border-white/5 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="relative group bg-[#0b0c10]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider italic">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold font-display text-white mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm text-gray-400 leading-relaxed font-light italic font-sans mb-6 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-white/[0.03] text-[10px] font-mono text-gray-400 border border-white/5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Link */}
                    <Link
                      href={post.readMoreUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Brief</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty state matching Mollahs IT */
            <div className="text-center py-32 rounded-[3.5rem] bg-[#0b0c10]/80 backdrop-blur-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent transition-all duration-700" />
              <div className="relative z-10">
                <Search size={64} className="mx-auto mb-8 text-cyan-500/20" />
                <h3 className="text-3xl font-bold text-white mb-4 font-display tracking-tight">
                  No matching insights
                </h3>
                <p className="text-gray-500 italic font-light">
                  Try adjusting your search keywords or filter categories.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mollahs Footer with Colossal Watermark */}
      <MollahsFooter />
    </div>
  );
}
