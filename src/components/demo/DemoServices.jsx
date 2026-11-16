'use client';

import { 
  Code2, 
  Palette, 
  Target, 
  Megaphone, 
  ShoppingBag, 
  Search, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageCircle 
} from 'lucide-react';

const ICON_MAP = {
  'Code2': Code2,
  'Palette': Palette,
  'Target': Target,
  'Megaphone': Megaphone,
  'ShoppingBag': ShoppingBag,
  'Search': Search,
  'Cpu': Cpu,
  'Layers': Layers,
};

export default function DemoServices({ services = [], settings }) {
  const whatsappNum = settings?.whatsappNumber || '8801909711808';

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Comprehensive Engineering & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Growth Solutions
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            From modern full-stack development to high-converting Meta AI ad operations, we deliver engineered solutions that generate compounding business revenue.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Code2;

            return (
              <div
                key={service.id || index}
                className="group relative rounded-2xl bg-[#090d18]/80 border border-white/[0.08] hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 hover:-translate-y-1"
              >
                {/* Subtle Card Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 group-hover:bg-cyan-500/10 blur-2xl rounded-full transition-all duration-300 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {service.pricing && (
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                        {service.pricing}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Deliverables / Features List */}
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">Ready to scale?</span>
                  <a
                    href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
