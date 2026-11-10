export default function CornerBrackets({ className = "border-white/30", size = "h-2 w-2" }) {
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute ${size} ${className} left-0 top-0 border-l border-t`} />
      <span aria-hidden="true" className={`pointer-events-none absolute ${size} ${className} right-0 top-0 border-r border-t`} />
      <span aria-hidden="true" className={`pointer-events-none absolute ${size} ${className} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`pointer-events-none absolute ${size} ${className} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export function SixBarGradient({ className = '' }) {
  return (
    <span aria-hidden="true" className={`flex gap-[2px] shrink-0 items-center ${className}`}>
      <span className="h-2.5 w-[2px]" style={{ background: 'rgb(0, 229, 255)' }} />
      <span className="h-2.5 w-[2px]" style={{ background: 'rgb(1, 212, 253)' }} />
      <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 195, 251)' }} />
      <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 169, 242)' }} />
      <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 144, 235)' }} />
      <span className="h-2.5 w-[2px]" style={{ background: 'rgb(2, 119, 228)' }} />
    </span>
  );
}

export function SectionBadge({ children, className = '' }) {
  return (
    <span className={`relative inline-flex items-center gap-3 bg-white/[0.03] px-3 py-2 text-[11px] font-sans font-medium uppercase tracking-wide text-white ${className}`}>
      <SixBarGradient />
      <span>{children}</span>
      <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 left-0 top-0 border-l border-t" />
      <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 right-0 top-0 border-r border-t" />
      <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 bottom-0 left-0 border-b border-l" />
      <span aria-hidden="true" className="pointer-events-none absolute h-2 w-2 border-white/30 bottom-0 right-0 border-b border-r" />
    </span>
  );
}
