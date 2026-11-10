'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function InteractiveTicket() {
  const [activePlan, setActivePlan] = useState('web');
  const cardRef = useRef(null);
  // Default is completely straight (0, 0) as requested by user
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const plans = {
    web: {
      name: 'Full-Stack Web Engineering',
      code: 'DRV-WEB-2026',
      lead: 'Jakia Sultana (Co-founder)',
      delivery: '14 - 21 Days',
      stack: 'Next.js 16, Tailwind CSS, Node.js, Vercel/Cloud',
      features: [
        'Custom 3D & Kinetic Animation Architecture',
        'Responsive Mobile & Tablet Optimization',
        'Dynamic Admin Dashboard & Profile Management',
        'Speed Score 99+ & Enterprise SEO Ready',
        '1 Year Dedicated Maintenance & Technical Support'
      ],
      badge: 'MOST POPULAR'
    },
    marketing: {
      name: 'Growth & Digital Marketing',
      code: 'DRV-MKT-2026',
      lead: 'Rezhone Hossain (CEO)',
      delivery: 'Monthly Retainer / Sprint',
      stack: 'Omnichannel Funnels, Brand Strategy, Analytics',
      features: [
        'Complete Competitor & Audience Reconnaissance',
        'Multi-Platform Campaign Deployment & Scaling',
        'High-Converting Copywriting & Creative Hooks',
        'Weekly Performance ROI Reporting & Analytics',
        'Continuous A/B Conversion Rate Optimization'
      ],
      badge: 'HIGH ROI'
    },
    meta: {
      name: 'AI & Meta Ads Scaler',
      code: 'DRV-META-2026',
      lead: 'Irfan Sadik (AI & Meta Specialist)',
      delivery: 'Fast Onboarding (3 Days)',
      stack: 'Meta Pixel, Conversions API (CAPI), AI Models',
      features: [
        'Laser-targeted Custom & Lookalike Audience Segments',
        'Pixel & Server-Side Tracking Safeguards',
        'Automated Retargeting & Lead Acquisition Sequences',
        'Budget Optimization to Slash Cost-per-Acquisition',
        'Meta Verified Setup & Ad Account Safeguards'
      ],
      badge: 'FAST TRACK'
    },
    creative: {
      name: 'Brand Identity & Visual System',
      code: 'DRV-DES-2026',
      lead: 'Sharafat Islam (Lead Designer)',
      delivery: '7 - 10 Days',
      stack: 'Figma, Adobe Creative Cloud, 3D Assets',
      features: [
        'Comprehensive Corporate Brand Identity Book',
        'Logo Variations & Vector Exports (SVG/PNG/PDF)',
        '30+ Social Media Templates & Marketing Assets',
        'Print Collaterals & Executive Stationery Kits',
        'Unlimited Precision Iterations & Design Polish'
      ],
      badge: 'CREATIVE MASTER'
    }
  };

  const selected = plans[activePlan];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Follows mouse smoothly
    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    // Return to completely straight position
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="ticket" className="relative py-28 px-4 sm:px-6 bg-[#030712] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            <Sparkles size={13} />
            <span>INTERACTIVE SPECIFICATION PASS (REEL INSPIRATION)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Project Launch Pass
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-light">
            Select a vertical below to inspect your project roadmap. Hover your mouse over the ticket to interact with dynamic 3D perspective movement.
          </p>

          {/* Service Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {Object.keys(plans).map((key) => (
              <button
                key={key}
                onClick={() => setActivePlan(key)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activePlan === key
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/5'
                }`}
              >
                {plans[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Floating Ticket Presentation - Perfectly Straight By Default */}
        <div className="flex justify-center perspective-1000">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-white/15 p-6 sm:p-9 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Top punch-hole ticket effect */}
            <div className="flex items-center justify-between pb-6 border-b border-dashed border-white/20">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
                  DRIVEN IT SOLUTION • OFFICIAL PASS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selected.name}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-mono font-bold text-blue-300">
                {selected.badge}
              </div>
            </div>

            {/* Spec details row */}
            <div className="grid grid-cols-2 gap-4 py-5 border-b border-dashed border-white/15 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">TICKET ID / CODE</span>
                <span className="text-white font-bold">{selected.code}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">LEAD ARCHITECT</span>
                <span className="text-blue-300 font-bold">{selected.lead}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ESTIMATED TIMELINE</span>
                <span className="text-emerald-400 font-bold">{selected.delivery}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TECH ECOSYSTEM</span>
                <span className="text-slate-200 truncate block">{selected.stack}</span>
              </div>
            </div>

            {/* Features check list */}
            <div className="py-5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Key Inclusions &amp; Deliverables:
              </span>
              <ul className="space-y-2.5">
                {selected.features.map((item, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Barcode & Booking CTA footer */}
            <div className="pt-6 border-t border-dashed border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Barcode visual simulation */}
                <div className="h-10 flex items-center gap-1 bg-white/90 p-1.5 rounded-lg">
                  <div className="w-1 h-full bg-black" />
                  <div className="w-2 h-full bg-black" />
                  <div className="w-0.5 h-full bg-black" />
                  <div className="w-1.5 h-full bg-black" />
                  <div className="w-1 h-full bg-black" />
                  <div className="w-2.5 h-full bg-black" />
                  <div className="w-0.5 h-full bg-black" />
                  <div className="w-1 h-full bg-black" />
                  <div className="w-2 h-full bg-black" />
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  <span>AUTH: DRV-VERIFIED</span>
                  <span className="block text-emerald-400 font-semibold">100% Guaranteed</span>
                </div>
              </div>

              <a
                href={`https://wa.me/8801909711808?text=Hello%20Driven%20IT%20Solution,%20I%20am%20ready%20to%20proceed%20with%20the%20${encodeURIComponent(selected.name)}%20package.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={14} className="text-[#25D366]" />
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
