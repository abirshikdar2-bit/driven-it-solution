'use client';

import Image from 'next/image';

export default function DrivenItWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 100% Official Client Logo from Doc's with Original Colors */}
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 transition-transform duration-200 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(0,229,255,0.35)]">
        <Image
          src="/images/driven-logo-badge.png"
          alt="Driven IT Solution Official Logo"
          fill
          sizes="44px"
          className="object-contain"
          priority
        />
      </div>

      {/* Brand Typography: DRIVEN in White, IT in Cyan Gradient */}
      <div className="flex items-center font-black tracking-tight font-mono text-xl sm:text-2xl leading-none">
        <span className="text-white">DRIVEN</span>
        <span className="ml-1.5 text-cyan-400 bg-logo-gradient bg-clip-text text-transparent">IT</span>
      </div>
    </div>
  );
}
