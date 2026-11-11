'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

const defaultProjects = [
  {
    id: 'proj-1',
    num: '/001/',
    category: 'Web Design & Development',
    title: 'Nexus Enterprise Platform',
    description: 'Next.js 16 + Supabase real-time cloud aggregator engineered with automated data telemetry.',
    image: '/images/projects/web-development-showcase.webp',
    liveUrl: '',
    isFeatured: true
  },
  {
    id: 'proj-2',
    num: '/002/',
    category: 'AI & Meta Ad Expert',
    title: 'Velocita Automotive Scale',
    description: 'Conversion-first landing page with Meta CAPI telemetry and luxury aesthetic.',
    image: '/images/projects/meta-ads-showcase.webp',
    liveUrl: '',
    isFeatured: true
  },
  {
    id: 'proj-3',
    num: '/003/',
    category: 'Graphics Designing',
    title: 'Caribbrew Artisan Brand Identity',
    description: 'Custom Shopify storefront and full visual brand identity for an artisan brand.',
    image: '/images/projects/graphic-design-showcase.webp',
    liveUrl: '',
    isFeatured: true
  },
  {
    id: 'proj-4',
    num: '/004/',
    category: 'Digital Marketing',
    title: 'Bellevill Heritage Interiors',
    description: 'Premium Next.js experience and high-converting lead capture pipeline built around brand heritage.',
    image: '/images/projects/digital-marketing-showcase.webp',
    liveUrl: '',
    isFeatured: true
  }
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)');
    const checkScroll = () => {
      const el = ref.current;
      if (el) {
        const top = el.getBoundingClientRect().top;
        setIsPinned(top <= (isMobile.matches ? 0.5 * window.innerHeight : 89));
      }
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const isActive = isPinned || isHovered;
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);

  return (
    <article
      ref={ref}
      className="md:sticky"
      style={{ top: 88 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#0f0f0f] sm:aspect-[16/10] md:aspect-[16/8]">
        {/* Full-bleed background image with Mollahs IT transitions */}
        <img
          src={project.image}
          alt={`${project.title} website`}
          className={`object-cover motion-reduce:!object-top ${
            isActive ? 'object-bottom opacity-100 grayscale-0' : 'object-top opacity-50 grayscale'
          }`}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: '0px',
            color: 'transparent',
            transition: isActive
              ? 'object-position 18s ease-in-out, opacity 0.8s, filter 0.8s'
              : 'object-position 0.8s ease-out, opacity 0.8s, filter 0.8s'
          }}
          loading="lazy"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

        {/* Page / Index Number Badge at Top Left */}
        <span className="pointer-events-none absolute left-4 top-4 bg-black/70 px-2 py-1 text-[11px] font-mono text-white">
          /{String(index + 1).padStart(3, '0')}/
        </span>

        {/* Category Tag at Top Right */}
        <span className="pointer-events-none absolute right-4 top-4 bg-black/70 px-2 py-1 text-[11px] font-mono uppercase text-white">
          {project.category}
        </span>

        {/* Bottom Details Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
          <div>
            <h3 className="text-3xl font-semibold uppercase tracking-[-0.03em] text-white md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/65">
              {project.description}
            </p>
          </div>

          {/* Visit Button with Corner Brackets */}
          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-12 shrink-0 items-center gap-2 bg-white/5 px-4 text-sm font-medium uppercase text-white transition-colors hover:bg-logo-gradient hover:text-black pointer-events-auto hidden sm:inline-flex"
            >
              <span>Visit</span>
              <ArrowUpRight className="h-4 w-4" />
              <CornerBrackets className="border-white/40" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="Showcase Concept Preview · Add live URL in Admin to activate"
              className="relative inline-flex h-12 shrink-0 items-center gap-2 bg-white/5 px-4 text-sm font-medium uppercase text-white/40 pointer-events-auto hidden sm:inline-flex cursor-not-allowed"
            >
              <span>Visit</span>
              <ArrowUpRight className="h-4 w-4 opacity-40" />
              <CornerBrackets className="border-white/20" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudiesSection({ projects: propProjects = null }) {
  const [projects, setProjects] = useState(() => {
    if (Array.isArray(propProjects) && propProjects.length > 0) return propProjects;
    return defaultProjects;
  });

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
          saveLocalCache('projects', data);
        }
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(propProjects)) {
      setProjects(propProjects);
    }
  }, [propProjects]);

  useEffect(() => {
    if (!propProjects) {
      loadProjects();
    }
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.entity === 'projects' || event.entity === 'all') {
        if (event.meta?.data && Array.isArray(event.meta.data)) {
          setProjects(event.meta.data);
          saveLocalCache('projects', event.meta.data);
        } else {
          loadProjects();
        }
      }
    });
    return () => unsubscribe();
  }, [propProjects, loadProjects]);

  return (
    <section id="work" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 relative py-28">
      {/* Header Matching Mollahs IT */}
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionBadge>Projects</SectionBadge>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Case studies
          </h2>
        </div>

        <p className="max-w-[20rem] text-base leading-snug text-white/60">
          A selection of recent work showcasing quality, clarity and real-world results.
        </p>
      </div>

      {/* Sticky Stacking Projects List (Exact Mollahs IT Architecture) */}
      <div className="flex flex-col gap-6 md:gap-[35vh]">
        {projects.map((proj, idx) => (
          <ProjectCard key={proj.id || proj.num || idx} project={proj} index={idx} />
        ))}
      </div>

      {/* Bottom Footer Row Matching Mollahs IT */}
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
        <p className="text-lg font-medium uppercase text-white">
          More projects showcasing quality work.
        </p>
        <a
          href="#contact"
          className="relative inline-flex items-center gap-2 bg-white/5 px-5 py-3 text-xs font-mono uppercase font-bold text-white transition-colors hover:bg-logo-gradient hover:text-black border border-white/10 hover:border-transparent"
        >
          <span>Get in touch</span>
          <ArrowUpRight className="h-4 w-4" />
          <CornerBrackets className="border-white/30" />
        </a>
      </div>
    </section>
  );
}
