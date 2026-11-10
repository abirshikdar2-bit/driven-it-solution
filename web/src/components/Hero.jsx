'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, TrendingUp, Palette, Bot, ShieldCheck, Laptop } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[96vh] pt-36 pb-24 flex flex-col justify-center items-center overflow-hidden">
      {/* Workspace Background with Apple MacBook setup */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-macbook-workspace.jpg"
          alt="Modern Apple MacBook Workspace - Driven IT Solution"
          fill
          priority
          unoptimized
          className="object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Multi-layer Dark Gradient & Vignette Overlays for Maximum Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/85 via-[#030712]/75 to-[#030712]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/50 to-[#030712]/95" />
      </div>

      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 backdrop-blur-xl text-xs font-mono text-blue-400 mb-8 shadow-2xl shadow-blue-950/40"
        >
          <Sparkles size={13} className="text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>DRIVEN IT SOLUTION • INNOVATION STUDIO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Big Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] drop-shadow-lg"
        >
          Together Towards a{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Smarter Digital Future.
          </span>
        </motion.h1>

        {/* Tagline & Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow"
        >
          <strong className="text-white font-semibold">Driven IT Solution</strong> —{' '}
          <span className="text-blue-400 italic">Your Growth Our Mission</span>. We engineer high-performance web systems, precision digital marketing, creative brand identities, and AI advertising funnels.
        </motion.p>

        {/* 4 Core Pillars Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2.5 mt-8 max-w-3xl"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-200 backdrop-blur-md shadow-lg">
            <Code2 size={13} className="text-blue-400" />
            <span>Web Engineering</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-200 backdrop-blur-md shadow-lg">
            <TrendingUp size={13} className="text-emerald-400" />
            <span>Digital Marketing</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-200 backdrop-blur-md shadow-lg">
            <Palette size={13} className="text-purple-400" />
            <span>Graphic &amp; Brand Design</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-200 backdrop-blur-md shadow-lg">
            <Bot size={13} className="text-cyan-400" />
            <span>AI &amp; Meta Ads</span>
          </div>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <a
            href="#team"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-xl shadow-blue-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Explore Leadership Team</span>
            <ArrowDown size={15} />
          </a>
          <a
            href="#ticket"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-medium text-sm border border-white/15 backdrop-blur-xl transition-all shadow-xl"
          >
            Project Launch Pass &amp; Quote
          </a>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 pt-10 border-t border-white/10 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl font-bold text-white tracking-tight">100%</span>
            <span className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-mono">Client Commitment</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl font-bold text-blue-400 tracking-tight">24/7</span>
            <span className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-mono">Dedicated Support</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl font-bold text-purple-400 tracking-tight">4+</span>
            <span className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-mono">Core Verticals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-3xl font-bold text-emerald-400 tracking-tight">5.0 ★</span>
            <span className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-mono">Executive Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
