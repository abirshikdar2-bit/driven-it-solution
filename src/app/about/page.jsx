'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MollahsNavbar from '@/components/MollahsNavbar';
import MollahsFooter from '@/components/MollahsFooter';
import CornerBrackets, { SectionBadge } from '@/components/CornerBrackets';
import initialTeamData from '@/data/team.json';
import { Mail, Award, CheckCircle } from 'lucide-react';
import { subscribeToDataChanges } from '@/lib/syncEvents';

function LinkedInIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function AboutPage() {
  const [team, setTeam] = useState(initialTeamData);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch(`/api/team?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setTeam(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load team in AboutPage:', err);
      }
    }
    loadTeam();

    const unsub = subscribeToDataChanges((event) => {
      if (event.entity === 'team' || event.entity === 'all') {
        loadTeam();
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <MollahsNavbar />

      <main className="relative z-10 pt-32 pb-24 mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <SectionBadge>Leadership &amp; Engineering</SectionBadge>

          <h1 className="mt-6 text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white font-sans">
            Our <span className="bg-logo-gradient bg-clip-text text-transparent">Team</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-light max-w-2xl">
            A tight-knit collective of senior software engineers, digital marketing tacticians, visual identity designers, and AI advertising experts.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {team.map((member) => (
            <div
              key={member.id}
              className="relative border border-white/10 bg-[#0a0a0b] p-8 flex flex-col justify-between group hover:border-cyan-400/40 transition-colors"
            >
              <div>
                {/* Photo & Role Header */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-white/5 pb-6">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shrink-0">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
                      {member.department}
                    </span>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-white font-mono">
                      {member.name}
                    </h2>
                    <p className="text-sm font-mono text-white/70 mt-1">
                      {member.role}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <Award size={13} />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Bio & Quote */}
                <p className="mt-6 text-sm leading-relaxed text-white/70 font-light">
                  {member.bio}
                </p>

                <blockquote className="mt-4 p-3 bg-white/[0.02] border-l-2 border-cyan-400 text-xs italic text-white/60 font-mono">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>

                {/* Skills */}
                <div className="mt-6">
                  <p className="text-[10px] font-mono uppercase text-white/40 tracking-wider mb-2">
                    Core Technical Competencies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase text-white/80 bg-white/[0.03] border border-white/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Socials & Email */}
              <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">
                  {member.projectsCompleted}+ Projects Delivered
                </span>

                <div className="flex items-center gap-2">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-white/[0.03] text-white/70 hover:text-cyan-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon size={15} />
                    </a>
                  )}
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-white/[0.03] text-white/70 hover:text-cyan-400 transition-colors"
                      aria-label="Facebook"
                    >
                      <FacebookIcon size={15} />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 rounded bg-white/[0.03] text-white/70 hover:text-cyan-400 transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={15} />
                    </a>
                  )}
                </div>
              </div>

              <CornerBrackets className="border-white/20" />
            </div>
          ))}
        </div>

      </main>

      <MollahsFooter />
    </div>
  );
}
