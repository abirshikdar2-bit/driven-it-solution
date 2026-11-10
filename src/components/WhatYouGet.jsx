'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Palette,
  Code2,
  Target,
  Megaphone,
  LayoutDashboard,
  Globe,
  Briefcase,
  Layers,
  Cpu,
  Smartphone,
  ArrowUpRight
} from 'lucide-react';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import initialServices from '@/data/servicesList.json';

const iconMap = {
  Palette,
  Code2,
  Target,
  Megaphone,
  LayoutDashboard,
  Globe,
  Briefcase,
  Layers,
  Cpu,
  Smartphone
};

export default function WhatYouGet({ services: propServices = null }) {
  const [services, setServices] = useState(
    Array.isArray(propServices) && propServices.length > 0
      ? propServices
      : Array.isArray(initialServices) ? initialServices : []
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(propServices)) {
      setServices(propServices);
    }
  }, [propServices]);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch(`/api/services?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setServices(data);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic services:', err);
      }
    }
    if (!propServices) {
      loadServices();
    }
  }, [propServices]);

  // Smooth hover intent: 75ms buffer prevents erratic switching during rapid cursor transit
  const handleMouseEnter = (idx) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIdx(idx);
    }, 75);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleClick = (idx) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveIdx(idx);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 py-28">
      {/* Section Header */}
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionBadge>Services</SectionBadge>
          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            What you get
          </h2>
        </div>
        <p className="max-w-[22rem] text-base leading-snug text-white/60 font-light italic font-sans">
          A focused set of digital marketing, web engineering, branding and custom automation services, delivered to a brief, a timeline and a price.
        </p>
      </div>

      {/* Horizontal Accordion */}
      <div
        className="relative flex flex-col gap-2 md:h-[520px] md:flex-row"
        onMouseLeave={handleMouseLeave}
      >
        {services.map((s, idx) => {
          const isActive = idx === activeIdx;
          const Icon = typeof s.icon === 'string' ? (iconMap[s.icon] || Code2) : (s.icon || Code2);

          return (
            <div
              key={s.slug}
              onMouseEnter={() => handleMouseEnter(idx)}
              onClick={() => handleClick(idx)}
              className={`relative overflow-hidden border bg-[#0c0c0c] transition-[flex-grow,background-color,border-color] duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                isActive
                  ? 'md:flex-[6] border-cyan-400/30 bg-[#0d0f14] shadow-2xl'
                  : 'md:flex-[0.75] border-white/5 bg-[#09090b] hover:border-white/15 hover:bg-[#0c0c0e]'
              }`}
            >
              {/* Collapsed Button (visible when inactive on desktop, or toggles on mobile) */}
              <button
                type="button"
                aria-expanded={isActive}
                className={`flex w-full items-center justify-between gap-4 p-5 text-left md:h-full md:flex-col md:items-start ${
                  isActive ? 'md:hidden' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="text-[11px] font-mono text-cyan-400/80">{s.num}</span>
                <span className="text-sm font-medium uppercase text-white md:rotate-180 md:[writing-mode:vertical-rl] tracking-wider whitespace-nowrap">
                  {s.shortTitle}
                </span>
              </button>

              {/* Expanded Card Content - Stable, Permanent, Zero Text Movement */}
              {isActive && (
                <div className="grid gap-6 p-5 md:h-full md:grid-cols-[1fr_1.15fr] md:p-7 min-w-[560px] lg:min-w-[620px]">
                  {/* Left Column: Details (Completely stationary, no transform, no movement) */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="hidden text-xs font-mono text-cyan-400 md:block">{s.num}</span>
                      <h3 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white font-mono">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60 font-light italic font-sans">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-6">
                      <p className="text-[11px] uppercase tracking-wider text-white/45 font-light italic font-sans">
                        What we offer
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.features.map((feature) => (
                          <li
                            key={feature}
                            className="relative px-3 py-1.5 text-[11px] uppercase text-white/80 font-light italic font-sans bg-white/[0.02]"
                          >
                            {feature}
                            <CornerBrackets className="border-white/20" />
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/contact?service=${s.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-xs uppercase font-mono font-bold text-[#02B8FA] hover:text-white transition-colors"
                      >
                        <span>Explore service</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Icon & Ambient Glow Box (Stationary) */}
                  <div className="relative hidden min-h-[240px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_60%,#111622,#070707_75%)] md:flex border border-white/5">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute rounded-full bg-[#02B8FA] blur-[120px] left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-25"
                    />
                    <div className="relative flex h-32 w-32 items-center justify-center border border-cyan-400/30 bg-black/70 shadow-[0_0_90px_-10px_#02B8FA]">
                      <Icon className="h-14 w-14 text-white" strokeWidth={1.25} />
                      <CornerBrackets className="border-[#02B8FA]" />
                    </div>
                    <span className="absolute bottom-4 right-4 text-[11px] uppercase text-white/40 font-mono font-light italic">
                      {s.pricing}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Bar */}
      <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center border-t border-white/5 pt-8">
        <p className="text-lg font-medium uppercase text-white tracking-wide">
          Not sure which service fits? Let&apos;s talk.
        </p>
        <Link
          href="/contact"
          className="relative inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-mono uppercase font-bold tracking-wider text-white transition-all hover:bg-logo-gradient hover:text-black hover:border-transparent"
        >
          <span>Get in touch</span>
          <ArrowUpRight className="h-4 w-4" />
          <CornerBrackets className="border-white/30" />
        </Link>
      </div>
    </section>
  );
}
