'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { LinkedInIcon, FacebookIcon, GitHubIcon, TwitterXIcon, InstagramIcon } from './SocialIcons';

export default function DemoFooter({ settings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = settings?.socials || {};

  return (
    <footer className="bg-[#03050a] border-t border-white/[0.08] text-gray-400 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                  <span className="text-cyan-400 font-extrabold text-sm tracking-tighter">
                    D<span className="text-white">IT</span>
                  </span>
                </div>
              </div>
              <span className="font-bold tracking-wider text-base text-white">
                DRIVEN IT SOLUTION
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Your Growth, Our Mission. Architectural web engineering, AI-driven performance marketing, and proprietary SaaS platforms built for ambitious enterprises worldwide.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">
                All Systems Operational · 99.9% Cloud SLA
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Core Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-cyan-400 transition-colors">
                  Software OS
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-400 transition-colors">
                  Leadership Team
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-cyan-400 transition-colors">
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Web Design & Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  AI & Meta Ads Expert
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Graphic Designing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  SaaS Engineering
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Full-Stack Cloud Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Global Connect
            </h4>
            <ul className="space-y-2.5 text-xs mb-5">
              <li>
                <a
                  href={`mailto:${settings?.officialEmail || 'drivenitsolution@gmail.com'}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {settings?.officialEmail || 'drivenitsolution@gmail.com'}
                </a>
              </li>
              <li className="text-gray-500">
                {settings?.officeAddress || 'Dhaka, Bangladesh · Worldwide'}
              </li>
            </ul>

            <div className="flex items-center gap-2">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-400 border border-white/[0.06] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-400 border border-white/[0.06] transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-400 border border-white/[0.06] transition-colors"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-400 border border-white/[0.06] transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-400 border border-white/[0.06] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Driven IT Solution. All rights reserved. 100% Bespoke Architecture.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
