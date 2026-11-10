'use client';

import { motion } from 'framer-motion';
import { Code2, TrendingUp, Bot, Palette, ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: Code2,
    tag: 'ENGINEERING',
    title: 'Custom Web & Software Development',
    description: 'We architect lightning-fast Next.js, React, and full-stack enterprise web platforms. Designed with responsive aesthetics, speed score 99+, and enterprise SEO readiness.',
    deliverables: ['Next.js & React Architecture', 'Mobile-First Responsive Design', 'Admin Dashboard & CMS Integration', 'Sub-second Load Times & Security'],
    lead: 'Jakia Sultana (Co-founder)',
    color: 'blue'
  },
  {
    icon: TrendingUp,
    tag: 'GROWTH STRATEGY',
    title: 'Performance Digital Marketing',
    description: 'Data-driven marketing blueprints engineered to position your brand before high-intent buyers. Precision audience funnels, conversion architecture, and brand authority scaling.',
    deliverables: ['Comprehensive Market & Competitor Audit', 'Multi-Channel Acquisition Funnels', 'High-Converting Copywriting', 'Weekly Analytics & ROI Telemetry'],
    lead: 'Rezhone Hossain (CEO)',
    color: 'emerald'
  },
  {
    icon: Palette,
    tag: 'CREATIVE DIRECTION',
    title: 'Graphic Design & Brand Identity',
    description: 'From iconic logo systems to complete corporate visual guidelines. Social media assets, 3D design components, and premium visual storytelling that commands respect.',
    deliverables: ['Official Brand Identity & Logo Systems', 'Social Media Campaign Templates', 'UI/UX Visual Design Systems', 'Print & Commercial Stationery Kits'],
    lead: 'Sharafat Islam (Lead Designer)',
    color: 'purple'
  },
  {
    icon: Bot,
    tag: 'AI PERFORMANCE',
    title: 'AI & Meta Ads Optimization',
    description: 'Leveraging predictive AI analytics and Meta Ads Manager to deploy laser-targeted campaigns. Reducing customer acquisition cost while maximizing qualified inbound leads.',
    deliverables: ['Laser-Targeted Audience Segmentation', 'Meta Pixel & Conversions API (CAPI)', 'Automated Behavioral Retargeting', 'Continuous ROAS & Budget Optimization'],
    lead: 'Irfan Sadik (Meta Specialist)',
    color: 'cyan'
  }
];

export default function ServicesShowcase() {
  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 bg-slate-100 text-slate-900 transition-colors duration-500 overflow-hidden">
      {/* Subtle background ambient dot grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono mb-3 shadow-md">
              <Zap size={12} className="text-yellow-400" />
              <span>THEME SHIFT TO LIGHT • 4 CORE VERTICALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Our Core Services &amp; Solutions
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg font-light max-w-xl">
              End-to-end digital solutions tailored to accelerate your business growth.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-500">
            DRIVEN IT SOLUTION • 2026 EDITION
          </div>
        </div>

        {/* 4 Cards Grid with Light Aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-3xl p-8 bg-white border border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-400/60 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon size={22} className="text-blue-400" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500 tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                      Key Inclusions &amp; Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {item.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    Department Lead: <strong className="text-slate-800">{item.lead}</strong>
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
