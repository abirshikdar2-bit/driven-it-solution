'use client';

import { ArrowRight, MessageSquare, ShieldCheck, Zap, Sparkles, TrendingUp, Code2, Globe2 } from 'lucide-react';

export default function DemoHero({ settings }) {
  const whatsappNum = settings?.whatsappNumber || '8801909711808';

  return (
    <section className="relative pt-36 sm:pt-44 pb-20 md:pb-28 overflow-hidden bg-[#050811]">
      {/* Dynamic Background Glow & Ambient Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-cyan-600/20 via-sky-500/15 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />
      
      {/* Subtle Matrix / Geometric Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-cyan-500/30 backdrop-blur-md mb-8 group hover:border-cyan-400/60 transition-all duration-300">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-cyan-300">
              High-Velocity Software & AI Studio
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-[11px] sm:text-xs text-gray-300 font-medium flex items-center gap-1">
              Global Delivery <Sparkles className="w-3 h-3 text-cyan-400" />
            </span>
          </div>

          {/* Main Power Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] sm:leading-[1.1] mb-6">
            Engineering High-Impact Platforms &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Intelligent AI Ecosystems
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed mb-10">
            Driven IT Solution builds bespoke web applications, revenue-generating Meta ad infrastructures, and proprietary SaaS platforms engineered for ambitious businesses worldwide.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Explore Proven Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20schedule%20a%20free%20consultation`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-500/40 text-white font-medium text-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Book Strategy Call</span>
            </a>
          </div>

          {/* Metric Strip Cards */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/[0.08]">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18]/60 border border-white/[0.06] backdrop-blur-md flex flex-col items-center sm:items-start text-left hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">130+</span>
              </div>
              <p className="text-xs font-semibold text-gray-200">Projects Shipped</p>
              <p className="text-[11px] text-gray-400">Web apps & digital scale</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18]/60 border border-white/[0.06] backdrop-blur-md flex flex-col items-center sm:items-start text-left hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4.8x</span>
              </div>
              <p className="text-xs font-semibold text-gray-200">Average Meta ROAS</p>
              <p className="text-[11px] text-gray-400">AI-optimized ad funnels</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18]/60 border border-white/[0.06] backdrop-blur-md flex flex-col items-center sm:items-start text-left hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">99.9%</span>
              </div>
              <p className="text-xs font-semibold text-gray-200">Production Uptime</p>
              <p className="text-[11px] text-gray-400">Cloud & serverless reliability</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18]/60 border border-white/[0.06] backdrop-blur-md flex flex-col items-center sm:items-start text-left hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Globe2 className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">9+</span>
              </div>
              <p className="text-xs font-semibold text-gray-200">Countries Served</p>
              <p className="text-[11px] text-gray-400">USA, UK, UAE, BD & beyond</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
