'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Award, 
  Layers, 
  CheckCircle2, 
  X,
  Compass,
  ArrowUpRight
} from 'lucide-react';

// Custom Crisp Brand SVGs
function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function FacebookIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

// 3D Tilt Card Component
function TiltCard({ member, index, onSelect, onHoverStart, onHoverEnd }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const isLeft = index % 2 === 0;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    if (onHoverEnd) onHoverEnd();
  };

  const handleMouseEnter = () => {
    if (onHoverStart) onHoverStart(member);
  };

  return (
    <div className={`w-full flex ${isLeft ? 'justify-start md:pr-12' : 'justify-end md:pl-12'} mb-16 sm:mb-24 relative z-10`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        className="w-full max-w-2xl"
      >
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-blue-500/50 hover:shadow-blue-900/30 transition-all duration-300 group overflow-hidden"
        >
          {/* Dynamic cursor glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glowPos.x}% ${glowPos.y}%, rgba(59, 130, 246, 0.2), transparent 70%)`,
            }}
          />

          {/* Staggered Index Indicator (As per Hand-Drawn Sketch) */}
          <div className="absolute top-6 right-6 font-mono text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>0{index + 1} / LEADERSHIP</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Portrait Image Container */}
            <div className="relative shrink-0 w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-blue-500/40 via-slate-800 to-purple-500/40 border border-white/15 shadow-xl group-hover:shadow-blue-500/30 transition-all">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src={member.photo || '/images/logo.jpg'}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-2 left-2 right-2 py-1 px-2 rounded-lg bg-slate-900/95 backdrop-blur-md border border-white/10 text-[10px] font-mono text-center text-blue-300 flex items-center justify-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-400" />
                <span>Verified Executive</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-2">
                <Compass size={12} />
                <span>{member.department || 'Driven IT Solution'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {member.name}
              </h3>

              <p className="text-sm font-semibold text-blue-400 mt-1">
                {member.role}
              </p>

              {member.tagline && (
                <p className="text-xs font-mono text-slate-400 mt-1 italic">
                  "{member.tagline}"
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-300 mt-3 line-clamp-3 font-light leading-relaxed">
                {member.bio}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center sm:justify-start">
                {member.skills?.slice(0, 4).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800/90 text-slate-300 border border-white/5 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Socials & Bio button */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10 w-full justify-between">
                <div className="flex items-center gap-2">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon size={15} />
                    </a>
                  )}
                  {member.socials?.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
                      title="Facebook"
                    >
                      <FacebookIcon size={15} />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-300 transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
                      title="Email"
                    >
                      <Mail size={15} />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onSelect(member)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-medium border border-blue-500/30 transition-all flex items-center gap-1.5"
                >
                  <span>Full Biography</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TeamZigzag({ team = [] }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeHoverPhoto, setActiveHoverPhoto] = useState(null);

  return (
    <section id="team" className="relative py-32 px-4 sm:px-6 bg-[#030712] overflow-hidden min-h-screen transition-colors duration-700">
      {/* Dynamic Background Image Reveal on Profile Hover */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Default Theme Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

        {/* Hovered Member Photo Backdrop with Cinematic Fade and Zoom */}
        <AnimatePresence>
          {activeHoverPhoto && (
            <motion.div
              key={activeHoverPhoto}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.32, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeHoverPhoto}
                alt="Leadership Background"
                fill
                priority
                className="object-cover object-top filter blur-[3px] brightness-90 contrast-110"
              />
              {/* Gradient Vignette so cards and typography remain 100% legible */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/75 to-[#030712]" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/40 to-[#030712]/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4 shadow-lg shadow-blue-950/30">
            <Sparkles size={13} />
            <span>EXECUTIVE WIREFRAME • AS PER OFFICIAL PAPER SKETCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Core Leadership &amp; Engineering Pioneers
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            Engineered in an alternating left-to-right zigzag sequence following our official blueprint. Hover over any profile card to reveal their high-resolution background presence.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Synchronized with Admin Panel: Profiles can be updated in real-time</span>
          </div>
        </div>

        {/* Alternating Zigzag Cards Layout */}
        <div className="relative">
          {/* Center Timeline Line for Desktop */}
          <div className="hidden md:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent pointer-events-none" />

          {team.map((member, idx) => (
            <TiltCard
              key={member.id || idx}
              member={member}
              index={idx}
              onSelect={setSelectedMember}
              onHoverStart={(m) => setActiveHoverPhoto(m.photo || null)}
              onHoverEnd={() => setActiveHoverPhoto(null)}
            />
          ))}
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-28 h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-slate-950">
                  <Image
                    src={selectedMember.photo || '/images/logo.jpg'}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                    {selectedMember.department}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm font-semibold text-blue-400">
                    {selectedMember.role}
                  </p>
                  <p className="text-xs text-slate-400 italic mt-1 font-mono">
                    "{selectedMember.tagline}"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Professional Background &amp; Bio
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {selectedMember.bio}
                </p>

                {selectedMember.quote && (
                  <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200 italic font-mono">
                    💡 "{selectedMember.quote}"
                  </div>
                )}

                <div className="mt-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Core Specializations &amp; Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills?.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-xl bg-slate-800 text-slate-200 border border-white/5 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-center">
                  <div className="p-3 rounded-2xl bg-slate-800/50">
                    <div className="text-xl font-bold text-white font-mono">{selectedMember.experience || '3+ Years'}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Industrial Track</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/50">
                    <div className="text-xl font-bold text-emerald-400 font-mono">{selectedMember.projectsCompleted || '100+'}+</div>
                    <div className="text-[11px] text-slate-400 font-mono">Successful Deliveries</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
