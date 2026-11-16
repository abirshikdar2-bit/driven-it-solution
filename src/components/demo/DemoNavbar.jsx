'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';

export default function DemoNavbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#projects' },
    { name: 'Software OS', href: '#products' },
    { name: 'Leadership', href: '#team' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const whatsappNum = settings?.whatsappNumber || '8801909711808';

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 border ${
          scrolled
            ? 'bg-[#070a12]/85 backdrop-blur-xl border-cyan-500/20 shadow-2xl shadow-cyan-950/40 py-3 px-5 sm:px-6'
            : 'bg-[#090d16]/70 backdrop-blur-lg border-white/10 py-3.5 px-6'
        } flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <Link href="/demo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
            <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
              <span className="text-cyan-400 font-extrabold text-base tracking-tighter group-hover:scale-105 transition-transform">
                D<span className="text-white">IT</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-wider text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                DRIVEN IT
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                SOLUTION
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium tracking-tight">
              Enterprise Software & AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action & Status Badge */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Q2 Projects</span>
          </div>

          {/* Quick Consultation CTA */}
          <a
            href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20discuss%20a%20new%20project`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-black" />
            <span>Start a Project</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl rounded-2xl bg-[#090d16]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-200 hover:text-cyan-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Q2 Projects</span>
            </div>
            <a
              href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20discuss%20a%20new%20project`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-center shadow-lg"
            >
              <MessageCircle className="w-4 h-4 text-black" />
              <span>Start a Project on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
