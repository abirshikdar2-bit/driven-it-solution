'use client';

export default function RotatingRadarAnimation({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Central Ambient Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Rotating Conic Radar Sweep Beam - Runs constantly on the exact same 360-degree circular path */}
      <div
        className="absolute h-[680px] w-[680px] rounded-full animate-radar-spin opacity-25 blur-sm"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, rgba(0, 229, 255, 0.45) 0deg, rgba(2, 184, 250, 0.15) 45deg, transparent 90deg, transparent 360deg)'
        }}
      />

      {/* Fixed Concentric Geometric Rings - Perfectly stable, zero clutter */}
      {/* Outer Ring */}
      <div className="absolute h-[820px] w-[820px] rounded-full border border-cyan-500/10" />

      {/* Middle Ring */}
      <div className="absolute h-[580px] w-[580px] rounded-full border border-cyan-400/15" />

      {/* Inner Ring */}
      <div className="absolute h-[340px] w-[340px] rounded-full border border-cyan-300/20" />

      {/* Core Center Pulse Dot */}
      <div className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
      </div>

      {/* Rotating Orbit 1: Single light node travelling endlessly along the exact same middle ring */}
      <div
        className="absolute h-[580px] w-[580px] rounded-full animate-orbit-cw"
        style={{ transformOrigin: 'center' }}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#00e5ff]" />
        </span>
      </div>

      {/* Rotating Orbit 2: Second light node travelling along the outer ring at steady counter rate */}
      <div
        className="absolute h-[820px] w-[820px] rounded-full animate-orbit-ccw"
        style={{ transformOrigin: 'center' }}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex h-3 w-3">
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#02B8FA] shadow-[0_0_14px_#02b8fa]" />
        </span>
      </div>

      {/* Subtle Crosshair Axis Lines */}
      <div className="absolute h-[840px] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute w-[840px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
    </div>
  );
}
