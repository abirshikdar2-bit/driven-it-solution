'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import initialTeam from '@/data/team.json';
import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

export default function WhyChooseUs({ team = null }) {
  const [teamMembers, setTeamMembers] = useState(() => {
    if (Array.isArray(team) && team.length > 0) return team;
    return Array.isArray(initialTeam) ? initialTeam : [];
  });

  const loadTeam = useCallback(async () => {
    try {
      const res = await fetch(`/api/team?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTeamMembers(json.data);
          saveLocalCache('team', json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load dynamic team in WhyChooseUs:', err);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(team)) {
      setTeamMembers(team);
    }
  }, [team]);

  useEffect(() => {
    if (!team) {
      loadTeam();
    }
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.entity === 'team' || event.entity === 'all') {
        if (event.meta?.data && Array.isArray(event.meta.data)) {
          setTeamMembers(event.meta.data);
          saveLocalCache('team', event.meta.data);
        } else {
          loadTeam();
        }
      }
    });
    return () => unsubscribe();
  }, [team, loadTeam]);

  const highlighted = teamMembers.filter(m => m.isHighlighted !== false);
  const visibleMembers = highlighted.length > 0 ? highlighted : teamMembers;

  return (
    <section id="benefits" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 py-28 relative">
      {/* Section Header */}
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionBadge>Benefits</SectionBadge>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Why choose us
          </h2>
        </div>

        <p className="max-w-[22rem] text-sm sm:text-base leading-relaxed text-white/60 font-light italic font-sans">
          Senior craft, architectural precision, decisions tied strictly to revenue, and builds engineered to perform under high traffic.
        </p>
      </div>

      {/* Dynamic Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Dynamic Teacher & Leadership Cards */}
        {visibleMembers.map((member) => (
          <div
            key={member.id}
            className="relative min-h-[440px] overflow-hidden border border-white/10 bg-[#0c0c0c] p-6 sm:p-8 flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300"
          >
            <CornerBrackets className="border-white/20 group-hover:border-cyan-400/40 transition-colors" />

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-slate-950">
              <Image
                src={member.photo || '/images/logo.jpg'}
                alt={`${member.name}, ${member.role}`}
                fill
                unoptimized
                className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-black/80 text-white/90 border border-white/10 uppercase truncate max-w-[70%]">
                  {member.name} · {member.role}
                </span>
                <span className="text-cyan-400 font-semibold shrink-0">
                  {member.experience || '5+ Yrs Exp'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
                {member.department || 'EXECUTIVE LEADERSHIP'}
              </span>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-tight text-white font-mono">
                {member.tagline || member.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60 font-light italic font-sans">
                &ldquo;{member.quote || member.bio}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
