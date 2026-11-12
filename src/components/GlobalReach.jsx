'use client';

import { useId } from 'react';

const dots = [
  {
    start: { label: 'USA', lat: 40.7128, lng: -74.006 },
    end: { label: 'UK', lat: 51.5074, lng: -0.1278 }
  },
  {
    start: { label: 'UK', lat: 51.5074, lng: -0.1278 },
    end: { label: 'Sweden', lat: 59.3293, lng: 18.0686 }
  },
  {
    start: { label: 'Sweden', lat: 59.3293, lng: 18.0686 },
    end: { label: 'Bosnia', lat: 43.8563, lng: 18.4131 }
  },
  {
    start: { label: 'Bosnia', lat: 43.8563, lng: 18.4131 },
    end: { label: 'Italy', labelBelow: true, lat: 41.9028, lng: 12.4964 }
  },
  {
    start: { label: 'Italy', labelBelow: true, lat: 41.9028, lng: 12.4964 },
    end: { label: 'Tanzania', lat: -6.7924, lng: 39.2083 }
  },
  {
    start: { label: 'Tanzania', lat: -6.7924, lng: 39.2083 },
    end: { label: 'India', lat: 28.6139, lng: 77.209 }
  },
  {
    start: { label: 'India', lat: 28.6139, lng: 77.209 },
    end: { label: 'Singapore', lat: 1.3521, lng: 103.8198 }
  },
  {
    start: { label: 'Singapore', lat: 1.3521, lng: 103.8198 },
    end: { label: 'Bangladesh', lat: 23.8103, lng: 90.4125 }
  },
  {
    start: { label: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
    end: { label: 'USA', lat: 40.7128, lng: -74.006 }
  }
];

const clientProjects = [
  { name: 'Pearl Lux Hair', stack: 'Shopify', country: 'USA' },
  { name: 'Doctorchoice', stack: 'Product Mgmt', country: 'USA' },
  { name: 'Caribbrew', stack: 'Shopify', country: 'USA' },
  { name: 'Studio M Beauty', stack: 'Shopify', country: 'USA' },
  { name: 'Q&G Lyfe Stylez', stack: 'Astro · Wix', country: 'USA' },
  { name: 'PHD Doctor Turners', stack: 'Wix Blog', country: 'USA' },
  { name: 'Search for Suits', stack: 'Next.js · Supabase', country: 'UK' },
  { name: 'Amovita', stack: 'WooCommerce · Python', country: 'UK' },
  { name: 'Travel In Style Group', stack: 'Scraping · CSV', country: 'UK' },
  { name: 'Enota Express', stack: 'WooCommerce', country: 'Italy' },
  { name: 'Bellevill', stack: 'Next.js · Tailwind', country: 'Singapore' },
  { name: 'Finocado', stack: 'Next.js · Supabase', country: 'Bangladesh' },
];

function projectCoordinates(lat, lng) {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
}

export default function GlobalReach() {
  const gradId = useId();

  // Deduplicate points for rendering pins
  const uniquePointsMap = new Map();
  dots.forEach((dot) => {
    [dot.start, dot.end].forEach((pt) => {
      if (!uniquePointsMap.has(pt.label)) {
        uniquePointsMap.set(pt.label, pt);
      }
    });
  });
  const points = Array.from(uniquePointsMap.values());

  return (
    <section id="reach" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 relative pt-16 pb-8 sm:pt-20 sm:pb-10 font-sans">
      {/* Header matching Mollahs IT 1:1 */}
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          {/* Badge: 100% Exact Copy of Mollahs IT */}
          <span className="relative inline-flex items-center gap-3 bg-white/[0.03] px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-white">
            <span aria-hidden="true" className="flex gap-[2px]">
              <span className="h-2.5 w-[2px]" style={{ background: 'rgb(0, 229, 255)' }} />
              <span className="h-2.5 w-[2px]" style={{ background: 'rgb(1, 212, 253)' }} />
              <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 195, 251)' }} />
              <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 169, 242)' }} />
              <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 144, 235)' }} />
              <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 119, 228)' }} />
            </span>
            Global reach
            <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 left-0 top-0 border-l border-t" />
            <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 right-0 top-0 border-r border-t" />
            <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 bottom-0 left-0 border-b border-l" />
            <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 bottom-0 right-0 border-b border-r" />
          </span>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            A team without borders
          </h2>
        </div>

        <p className="max-w-[20rem] text-base leading-snug text-white/60">
          Our team works remotely as digital nomads across countries — so we build with first-hand feel for the culture, trends and buyers of every market. Clients in 9 countries and counting.
        </p>
      </div>

      {/* Main Map Visual Container */}
      <div className="relative overflow-hidden border border-white/5 bg-white/[0.015]">
        {/* Ambient Radial Blue Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-logo-glow blur-[110px] left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-30"
        />

        {/* Map Container */}
        <div className="relative mx-auto max-w-5xl p-6 block">
          <div className="relative w-full aspect-[2/1] font-sans">
            {/* Dot-matrix world map texture */}
            <img
              src="/world-dots.svg"
              className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)] pointer-events-none select-none"
              alt=""
              aria-hidden="true"
              height={495}
              width={1056}
              draggable={false}
            />

            {/* Glowing Interconnected Curved Flight Paths & Pulsing Pins */}
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full absolute inset-0 pointer-events-none select-none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="5%" stopColor="#02B8FA" stopOpacity="1" />
                  <stop offset="95%" stopColor="#02B8FA" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Connected Curved Flight Arcs */}
              {dots.map((dot, s) => {
                const start = projectCoordinates(dot.start.lat, dot.start.lng);
                const end = projectCoordinates(dot.end.lat, dot.end.lng);
                const midX = (start.x + end.x) / 2;
                const midY = Math.min(start.y, end.y) - 50;
                const pathString = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;

                return (
                  <path
                    key={`path-${s}`}
                    d={pathString}
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    className="opacity-80"
                  />
                );
              })}

              {/* Pulsing Country Points & Labels */}
              {points.map((pt, i) => {
                const { x, y } = projectCoordinates(pt.lat, pt.lng);
                return (
                  <g key={`point-${pt.label}-${i}`}>
                    <circle cx={x} cy={y} r="2" fill="#02B8FA" />
                    <circle cx={x} cy={y} r="2" fill="#02B8FA" opacity="0.6">
                      <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    {pt.label && (
                      <text
                        x={x}
                        y={pt.labelBelow ? y + 16 : y - 10}
                        textAnchor="middle"
                        className="fill-gray-400 text-[9px] font-bold tracking-widest uppercase font-sans select-none"
                      >
                        {pt.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 12-item Client Brands List Grid */}
        <ul className="relative grid grid-cols-1 border-t border-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {clientProjects.map((project, idx) => (
            <li
              key={`${project.name}-${idx}`}
              className="flex items-baseline justify-between gap-3 border-b border-white/5 px-5 py-4 sm:border-r hover:bg-white/[0.02] transition-colors"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium uppercase text-white font-sans">
                  {project.name}
                </div>
                <div className="truncate text-xs text-white/45 font-sans font-light italic">
                  {project.stack}
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-medium uppercase text-logo font-sans">
                {project.country}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
