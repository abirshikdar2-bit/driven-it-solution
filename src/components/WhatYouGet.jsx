'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
import { subscribeToDataChanges } from '@/lib/syncEvents';

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
    Array.isArray(propServices)
      ? propServices
      : Array.isArray(initialServices) ? initialServices : []
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const hoverTimeoutRef = useRef(null);

  const loadServices = useCallback(async () => {
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
  }, []);

  // Update when prop changes
  useEffect(() => {
    if (Array.isArray(propServices)) {
      setServices(propServices);
    }
  }, [propServices]);

  // Direct real-time subscription for immediate cross-tab updates
  useEffect(() => {
    if (!propServices) {
      loadServices();
    }
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.entity === 'services' || event.entity === 'all') {
        loadServices();
      }
    });
    return () => unsubscribe();
  }, [propServices, loadServices]);

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
    <section id="services" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pt-10 sm:pb-10">
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <div>
          <SectionBadge>Services</SectionBadge>
          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            What you get
          </h2>
        </div>
      </div>

      {/* Horizontal Accordion */}
      {services.length === 0 ? (
        <div className="relative border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 md:p-16 text-center overflow-hidden group">
          <CornerBrackets className="border-cyan-400/30" />
          
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Tailored Engineering & Marketing Solutions
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              Bespoke Digital & Growth Capabilities
            </h3>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light italic max-w-xl mb-6">
              Every client engagement is built around customized project requirements, revenue growth architecture, and production SLA guarantees.
            </p>

            {/* Core Capability Badges */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-8">
              <span className="px-3 py-1.5 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10">
                #Custom Web Architecture
              </span>
              <span className="px-3 py-1.5 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10">
                #Meta AI Ad Scaling & CAPI
              </span>
              <span className="px-3 py-1.5 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10">
                #Enterprise UI/UX Design
              </span>
              <span className="px-3 py-1.5 text-xs font-mono text-white/80 bg-white/[0.03] border border-white/10">
                #Custom SaaS & Cloud Systems
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/8801909711808?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20discuss%20a%20custom%20service%20scope."
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 bg-white/5 hover:bg-logo-gradient hover:text-black text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <span>Discuss Custom Scope</span>
                <ArrowUpRight size={15} />
                <CornerBrackets className="border-white/30" />
              </a>

              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-white/40 hover:text-cyan-400 transition-colors"
              >
                <span>Add Services in Admin →</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
      <div
        className="relative flex flex-col gap-2 md:h-[520px] md:flex-row"
        onMouseLeave={handleMouseLeave}
      >
        {services.map((s, idx) => {
          const isActive = idx === activeIdx;
          const Icon = typeof s.icon === 'string' ? (iconMap[s.icon] || Code2) : (s.icon || Code2);
          const serviceSlug = s.slug || s.id || `service-${idx}`;
          const serviceNum = s.num || `/00${idx + 1}/`;
          const serviceShortTitle = s.shortTitle || s.title || `Service ${idx + 1}`;
          const serviceFeatures = Array.isArray(s.features) ? s.features : [];

          return (
            <div
              key={serviceSlug}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(idx);
                }}
                aria-expanded={isActive}
                className={`flex w-full items-center justify-between gap-4 p-5 text-left md:h-full md:flex-col md:items-start ${
                  isActive ? 'md:hidden' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="text-[11px] font-mono text-cyan-400/80">{serviceNum}</span>
                <span className="text-sm font-medium uppercase text-white md:rotate-180 md:[writing-mode:vertical-rl] tracking-wider whitespace-nowrap">
                  {serviceShortTitle}
                </span>
              </button>

              {/* Expanded Card Content - Stable, Permanent, Zero Text Movement */}
              {isActive && (
                <div className="grid gap-6 p-5 md:h-full md:grid-cols-[1fr_1.15fr] md:p-7 w-full min-w-0 md:min-w-[520px] lg:min-w-[600px]">
                  {/* Left Column: Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-cyan-400">{serviceNum}</span>
                        <span className="text-xs font-mono text-cyan-400/80 md:hidden">{s.pricing}</span>
                      </div>
                      <h3 className="mt-3 text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-mono">
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
                        {serviceFeatures.map((feature) => (
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
                        href={`/contact?service=${encodeURIComponent(serviceSlug)}`}
                        className="mt-6 inline-flex items-center gap-2 text-xs uppercase font-mono font-bold text-[#02B8FA] hover:text-white transition-colors"
                      >
                        <span>Explore service</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Icon & Ambient Glow Box */}
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
      )}
    </section>
  );
}
