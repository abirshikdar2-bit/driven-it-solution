'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CornerBrackets from './CornerBrackets';
import WhatsAppIcon from './WhatsAppIcon';
import initialSettings from '@/data/settings.json';

export default function MollahsFooter({ settings: propSettings = null }) {
  const [settings, setSettings] = useState(
    propSettings && propSettings.whatsappNumber ? propSettings : initialSettings
  );

  useEffect(() => {
    if (propSettings && propSettings.whatsappNumber) {
      setSettings(propSettings);
    }
  }, [propSettings]);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.whatsappNumber) {
            setSettings(data);
          }
        }
      } catch (err) {
        console.error('Failed to load settings in Footer:', err);
      }
    }
    if (!propSettings) {
      loadSettings();
    }
  }, [propSettings]);
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Ambient Blue Radial Glow at Bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-logo-glow blur-[120px] -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 opacity-40"
      />

      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 relative pt-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          
          {/* Column 1: Ready to Build */}
          <div>
            <p className="max-w-sm text-3xl sm:text-4xl font-bold uppercase leading-none tracking-[-0.03em] text-white font-mono">
              Ready to build what&apos;s next?
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-wider bg-logo-gradient font-bold text-black shadow-[0_0_40px_-8px_#02B8FA] hover:shadow-[0_0_60px_-4px_#02B8FA] transition-all duration-300"
              >
                <span>Book a call</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <CornerBrackets className="border-black/40" />
              </Link>

              <a
                href={`mailto:${settings.officialEmail}`}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-wider bg-white/[0.03] text-white hover:bg-white/[0.08] transition-all duration-300"
              >
                <span>Email us</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <CornerBrackets className="border-white/40" />
              </a>
            </div>
          </div>

          {/* Column 2: Socials */}
          <div>
            <p className="text-[11px] font-mono uppercase text-white/40 tracking-wider">
              /Socials/
            </p>
            <ul className="mt-4 space-y-3 font-mono text-xs uppercase">
              <li>
                <a
                  href={settings.socials?.linkedin || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-cyan-400"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={settings.socials?.facebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-cyan-400"
                >
                  Facebook
                </a>
              </li>
              {settings.socials?.github && (
                <li>
                  <a
                    href={settings.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 transition-colors hover:text-cyan-400"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {settings.socials?.twitter && (
                <li>
                  <a
                    href={settings.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 transition-colors hover:text-cyan-400"
                  >
                    X / Twitter
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-[#25D366]"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <p className="text-[11px] font-mono uppercase text-white/40 tracking-wider">
              /Navigation/
            </p>
            <ul className="mt-4 space-y-3 font-mono text-xs uppercase">
              <li>
                <Link href="/about" className="text-white/70 transition-colors hover:text-cyan-400">
                  About
                </Link>
              </li>
              <li>
                <a href="/#work" className="text-white/70 transition-colors hover:text-cyan-400">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="/#products" className="text-white/70 transition-colors hover:text-cyan-400">
                  Products
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 transition-colors hover:text-cyan-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-colors hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <p className="text-[11px] font-mono uppercase text-white/40 tracking-wider">
              /Resources/
            </p>
            <ul className="mt-4 space-y-3 font-mono text-xs uppercase">
              <li>
                <a href="/#services" className="text-white/70 transition-colors hover:text-cyan-400">
                  Services Spec
                </a>
              </li>
              <li>
                <span className="text-white/40">Privacy Policy</span>
              </li>
              <li>
                <span className="text-white/40">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Background Watermark Wordmark matching Mollahs IT 1:1 */}
        <div className="mt-20 w-full select-none opacity-[0.16] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)] pointer-events-none">
          <svg
            viewBox="0 0 3160 404"
            className="w-full h-auto select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Driven IT Solution"
          >
            <defs>
              <linearGradient id="ditRibbon1" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#02A7F4" />
                <stop offset="100%" stopColor="#027BE6" />
              </linearGradient>
              <linearGradient id="ditRibbon2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#0279E5" />
                <stop offset="50%" stopColor="#02B8FA" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
              <linearGradient id="ditItGrad" x1="0" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="60%" stopColor="#02B8FA" />
                <stop offset="100%" stopColor="#0277E4" />
              </linearGradient>
            </defs>

            {/* 3D Ribbon 'D' Monogram */}
            <g id="monogram">
              <rect x="40" y="38" width="90" height="328" rx="24" fill="url(#ditRibbon1)" />
              <path
                d="M 95 38 C 270 38 420 108 420 202 C 420 296 270 366 95 366 C 165 366 315 308 315 202 C 315 96 165 38 95 38 Z"
                fill="url(#ditRibbon2)"
              />
              <path
                d="M 140 116 C 228 116 290 154 290 202 C 290 250 228 288 140 288 Z"
                fill="#040e1a"
                opacity="0.95"
              />
              <path
                d="M 130 126 C 205 136 260 166 260 202 C 260 238 205 268 130 278 Z"
                fill="url(#ditRibbon1)"
                opacity="0.6"
              />
              <path
                d="M 95 40 C 265 40 412 110 412 202 C 412 294 265 364 95 364"
                stroke="#00E5FF"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.5"
                fill="none"
              />
            </g>

            {/* Brand Typography */}
            {/* RIVEN in crisp bold white */}
            <text
              x="460"
              y="298"
              fill="#FFFFFF"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Segoe UI, Roboto, sans-serif"
              fontSize="280"
              fontWeight="900"
              letterSpacing="-0.03em"
            >
              RIVEN
            </text>

            {/* IT in electric cyan gradient */}
            <text
              x="1400"
              y="298"
              fill="url(#ditItGrad)"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Segoe UI, Roboto, sans-serif"
              fontSize="280"
              fontWeight="900"
              letterSpacing="-0.02em"
            >
              IT
            </text>

            {/* SOLUTION in electric cyan gradient with full N visibility */}
            <text
              x="1760"
              y="298"
              fill="url(#ditItGrad)"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Segoe UI, Roboto, sans-serif"
              fontSize="280"
              fontWeight="900"
              letterSpacing="-0.025em"
            >
              SOLUTION
            </text>
          </svg>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col justify-between items-center gap-3 border-t border-white/5 py-6 text-[11px] font-sans font-light italic uppercase text-white/40 sm:flex-row">
          <span>&copy; 2026 DRIVEN IT SOLUTION. BUILT FOR THE AGENTIC ERA.</span>
          <span className="text-white/60 inline-flex items-center gap-1.5">
            <span>DEVELOPED BY</span>
            <span className="text-cyan-400 font-medium not-italic">ABIR SHIKDAR</span>
          </span>
          <span>REMOTE-FIRST · WORKING ACROSS TIMEZONES</span>
        </div>
      </div>
    </footer>
  );
}
