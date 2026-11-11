'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CornerBrackets from './CornerBrackets';

export default function MollahsHero() {
  return (
    <section id="header" className="relative pt-20 sm:pt-24 md:pt-28 font-sans">
      <div className="mx-auto w-full max-w-[1520px] px-3 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden border border-white/5 bg-[radial-gradient(120%_90%_at_50%_0%,#1a1c22_0%,#0a0a0b_55%,#050505_100%)] px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:pb-12 md:pt-12 md:min-h-[calc(100svh-8.5rem)] flex flex-col justify-between">
          
          {/* Cyan Light Streak & Glow Accents */}
          <div
            aria-hidden="true"
            className="absolute -right-[10%] top-[55%] h-[2px] w-[85%] -rotate-[24deg] bg-logo-streak pointer-events-none opacity-50 sm:opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute -right-[10%] top-[55%] h-10 w-[85%] -rotate-[24deg] bg-logo-streak opacity-20 sm:opacity-40 blur-2xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-logo-glow blur-[80px] sm:blur-[120px] -right-10 sm:-right-20 top-1/3 h-[240px] w-[280px] sm:h-[420px] sm:w-[520px] opacity-40 sm:opacity-60"
          />

          {/* Top Row: Availability Pill */}
          <div>
            <div className="relative inline-flex items-center gap-2 sm:gap-2.5 bg-white/[0.03] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[9.5px] sm:text-[11px] font-sans font-medium uppercase text-white tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-logo opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-logo" />
              </span>
              <span>2 SLOTS OPEN THIS MONTH</span>
              <CornerBrackets className="border-white/30" />
            </div>

            {/* Main Hero Headline */}
            <h1 className="mt-4 sm:mt-8 text-[clamp(1.75rem,0.9rem+4.2vw,3.2rem)] md:text-[clamp(2.6rem,1.2rem+5.8vw,6rem)] font-bold uppercase leading-[0.98] md:leading-[0.92] tracking-[-0.035em] md:tracking-[-0.045em] text-white font-sans">
              AN IT STUDIO BUILT FOR{' '}
              <span className="block bg-logo-gradient bg-clip-text text-transparent">
                AMBITIOUS BUSINESSES
              </span>
            </h1>
          </div>

          {/* Bottom Row: Agency Bio, CTA Buttons, Metrics */}
          <div className="relative mt-7 sm:mt-12 md:mt-32 flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-[13.5px] sm:text-[15px] md:text-base leading-relaxed text-white/70 font-light italic font-sans">
                A remote-first engineering and growth studio designing high-performance Next.js platforms, AI automation systems, and Meta ad scaling engines that turn attention into revenue.{' '}
                <span className="text-white font-normal not-italic">Strategy, design and engineering</span>, from first brief to global launch.
              </p>

              {/* CTAs */}
              <div className="mt-5 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:px-6 sm:py-3.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white/[0.04] text-white hover:bg-white/[0.09] transition-all duration-300"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-cyan-400" />
                  <CornerBrackets className="border-white/40" />
                </Link>

                <a
                  href="#work"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:px-6 sm:py-3.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-white/[0.02] text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                >
                  <span>Explore Work</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <CornerBrackets className="border-white/20" />
                </a>
              </div>
            </div>

            {/* Social Proof / Metrics Badge */}
            <div className="md:text-right font-mono mt-2 sm:mt-0">
              <div className="text-logo text-sm sm:text-base tracking-widest" aria-hidden="true">
                ★★★★★
              </div>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold uppercase text-white tracking-wider">
                12+ BRANDS · 9 COUNTRIES
              </p>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] uppercase text-white/50 tracking-wider font-light italic font-sans">
                THEY HIT THEIR TARGETS — YOU&apos;RE NEXT.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
