'use client';

export default function MetricsBar() {
  const metrics = [
    { num: '/001/', value: '12+ BRANDS SHIPPED' },
    { num: '/002/', value: '9 COUNTRIES SERVED' },
    { num: '/003/', value: '4 CORE DISCIPLINES' },
    { num: '/004/', value: '30-DAY MONEY-BACK' },
  ];

  return (
    <div className="border-y border-white/5 bg-white/[0.01]">
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div key={m.num} className="flex flex-col font-mono">
              <span className="text-[11px] text-cyan-400/80 tracking-wider font-sans font-light italic">
                {m.num}
              </span>
              <span className="mt-1 text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
