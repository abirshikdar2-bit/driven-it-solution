'use client';

import { Mail, Star } from 'lucide-react';
import { LinkedInIcon, FacebookIcon } from './SocialIcons';

export default function DemoTeam({ team = [] }) {
  return (
    <section id="team" className="py-20 sm:py-28 bg-[#04060c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Leadership & Mentors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Strategic Leadership & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Senior Engineering Minds
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            Our multi-disciplinary leads combine deep architectural proficiency with commercial growth strategy to scale products and businesses globally.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={member.id || idx}
              className="group rounded-2xl bg-[#090d18] border border-white/[0.08] hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/25 hover:-translate-y-1 relative"
            >
              <div>
                {/* Photo & Role Badge */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#111624] border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors shrink-0 shadow-lg shadow-cyan-950/40">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cyan-400 font-bold text-xl">
                        {member.name?.charAt(0) || 'D'}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide">
                      {member.department || 'Executive'}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium">
                      {member.role}
                    </p>
                    {member.experience && (
                      <span className="inline-block mt-2 text-[10px] font-medium text-gray-400 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                        {member.experience}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tagline / Quote */}
                {member.tagline && (
                  <p className="text-xs font-semibold text-cyan-300/90 italic mb-3">
                    "{member.tagline}"
                  </p>
                )}

                {/* Bio */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Skills Badges */}
                {Array.isArray(member.skills) && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/[0.06]">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium text-gray-300 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Card Footer: Rating & Socials */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{member.rating || '5.0/5'}</span>
                  {member.projectsCompleted && (
                    <span className="text-gray-400 font-normal">
                      · {member.projectsCompleted}+ projects
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials?.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label={`${member.name} Facebook`}
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label={`${member.name} Email`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
