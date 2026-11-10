'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, X, Calendar } from 'lucide-react';
import CornerBrackets from './CornerBrackets';
import DrivenItWordmark from './DrivenItWordmark';
import WhatsAppIcon from './WhatsAppIcon';
import initialSettings from '@/data/settings.json';

export default function MollahsNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data && data.whatsappNumber) {
            setSettings(data);
          }
        }
      } catch (err) {
        console.error('Failed to load settings in Navbar:', err);
      }
    }
    loadSettings();
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Products', href: '/#products' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050505]/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        
        {/* Brand Wordmark Logo matching Mollahs IT */}
        <Link href="/" aria-label="Driven IT Solution home" className="shrink-0 flex items-center group py-1">
          <DrivenItWordmark className="h-8 w-auto sm:h-9 transition-transform duration-200 group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-3">
          {navLinks.map((link, idx) => (
            <span key={link.label} className="flex items-center gap-3">
              {idx > 0 && <span aria-hidden="true" className="text-white/20 text-xs">/</span>}
              <Link
                href={link.href}
                className="text-xs font-medium uppercase text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Chat via WhatsApp */}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Driven%20IT%20Solution,%20I%20am%20interested%20in%20your%20services`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/20 transition-all rounded-md shadow-[0_0_12px_rgba(37,211,102,0.15)]"
          >
            <WhatsAppIcon size={16} />
            <span>WhatsApp Quick Chat</span>
          </a>

          {/* Get in touch matching Mollahs IT */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-white/[0.04] text-white hover:bg-white/[0.08] transition-all duration-300"
          >
            <span>Get in touch</span>
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <CornerBrackets className="border-white/40" />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            className="relative flex h-10 w-10 items-center justify-center bg-white/[0.03] text-white lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            <CornerBrackets className="border-white/40" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#050505] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono text-sm uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-cyan-400 py-1"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-mono uppercase text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 rounded-md"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp Quick Chat</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="relative flex items-center justify-center gap-2 py-2.5 text-xs font-mono uppercase bg-logo-gradient text-black font-semibold"
              >
                <span>Book a Free Call</span>
                <CornerBrackets className="border-black/40" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
