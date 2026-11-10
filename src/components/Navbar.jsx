'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-950/20'
            : 'bg-slate-900/40 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-blue-500/30 group-hover:border-blue-400 transition-colors">
            <Image
              src="/images/logo.jpg"
              alt="Driven IT Solution Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Driven IT Solution
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider -mt-0.5">
              YOUR GROWTH OUR MISSION
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items in English */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <a
            href="#home"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Home
          </a>
          <a
            href="#team"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            Leadership Team
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </a>
          <a
            href="#services"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Portfolio
          </a>
          <a
            href="#ticket"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Launch Pass
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 transition-colors"
          >
            <ShieldAlert size={14} className="text-blue-400" />
            Admin Panel
          </Link>
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 transition-all transform hover:scale-[1.02]"
          >
            Start a Project
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-3xl p-5 bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-3">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
          >
            Home
          </a>
          <a
            href="#team"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
          >
            Leadership Team
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
          >
            Services
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
          >
            Portfolio
          </a>
          <a
            href="#ticket"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
          >
            Launch Pass
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
          >
            Contact Us
          </a>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-mono rounded-xl bg-slate-800 text-slate-200 border border-white/10"
            >
              Admin Panel
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
