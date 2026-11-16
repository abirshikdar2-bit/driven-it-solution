'use client';

export default function DemoMarquee() {
  const stack = [
    { name: 'Next.js 16', tag: 'Core Framework' },
    { name: 'React 19', tag: 'UI Library' },
    { name: 'Supabase', tag: 'PostgreSQL & Realtime' },
    { name: 'Tailwind CSS', tag: 'Styling Engine' },
    { name: 'TypeScript', tag: 'Type Safety' },
    { name: 'Python & AI', tag: 'Machine Learning' },
    { name: 'Node.js', tag: 'Backend Runtime' },
    { name: 'Meta CAPI', tag: 'Conversion Telemetry' },
    { name: 'OpenAI API', tag: 'Intelligent Workflows' },
    { name: 'Vercel Cloud', tag: 'Edge Infrastructure' },
    { name: 'Docker', tag: 'Containerization' },
    { name: 'Shopify Plus', tag: 'Modern E-commerce' },
  ];

  return (
    <div className="py-6 bg-[#04060d] border-y border-white/[0.06] overflow-hidden relative">
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#04060d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#04060d] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
        {[...stack, ...stack].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 mx-4 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-200"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold text-gray-200 tracking-wide">
              {item.name}
            </span>
            <span className="text-[10px] text-gray-400 font-normal px-2 py-0.5 rounded-full bg-white/[0.04]">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
