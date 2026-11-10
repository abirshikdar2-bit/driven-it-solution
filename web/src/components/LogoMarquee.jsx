'use client';

import Image from 'next/image';

const techLogos = [
  { name: 'n8n', src: '/logos/n8n-wordmark.svg', width: 96, height: 28 },
  { name: 'Supabase', src: '/logos/supabase.svg', width: 96, height: 28 },
  { name: 'Shopify', src: '/logos/shopify-wordmark.svg', width: 96, height: 28 },
  { name: 'Google', src: '/logos/google-wordmark.svg', width: 96, height: 28 },
  { name: 'OpenAI', src: '/logos/openai-wordmark.svg', width: 96, height: 28 },
  { name: 'Playwright', src: '/logos/playwright-wordmark.svg', width: 96, height: 28 },
];

export default function LogoMarquee() {
  // Duplicate array 3 times for seamless infinite scroll
  const marqueeItems = [...techLogos, ...techLogos, ...techLogos];

  return (
    <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden border-x border-b border-white/5 py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee-slow">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex h-12 w-48 shrink-0 items-center justify-center border-r border-white/5 px-6 group"
            >
              <img
                src={item.src}
                alt={item.name}
                loading="lazy"
                className="h-7 w-auto object-contain opacity-40 brightness-0 invert transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 group-hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
