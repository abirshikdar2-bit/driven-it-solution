import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30">
              <Image src="/images/logo.jpg" alt="Driven IT Solution" fill className="object-cover" />
            </div>
            <span className="font-bold text-white text-base">Driven IT Solution</span>
          </Link>
          <p className="mt-2 text-slate-400 font-mono text-xs">
            Your Growth Our Mission • Together Towards a Smarter Digital Future
          </p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Dream • Plan • Develop • Grow
          </p>
        </div>

        {/* Quick Nav Links in English */}
        <div className="flex flex-wrap justify-center gap-6 font-medium text-slate-300">
          <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#team" className="hover:text-blue-400 transition-colors">Leadership Team</a>
          <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a>
          <a href="#ticket" className="hover:text-blue-400 transition-colors">Launch Pass</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="p-2.5 rounded-full bg-slate-900 border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all"
            title="Back to Top"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-slate-500 text-[11px] font-mono">
        <div>
          © 2026 Driven IT Solution. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5">
          <span>Engineered with Next.js 16, Tailwind CSS &amp; Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
