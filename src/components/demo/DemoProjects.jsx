'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react';

export default function DemoProjects({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique categories safely
  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#04060c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Proven Platforms & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                Measurable Impact
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
            A portfolio of production web applications, automated growth engines, and enterprise solutions engineered with precision.
          </p>
        </div>

        {/* Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="group rounded-2xl bg-[#090d18] border border-white/[0.08] hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 hover:-translate-y-1"
            >
              {/* Project Image Preview with Hover Zoom */}
              <div className="relative aspect-[16/10] w-full bg-[#111624] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <FolderGit2 className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                
                {/* Category Pill Over Image */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-cyan-300">
                    {project.category || 'Engineering'}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">
                    Production Case
                  </span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all cursor-pointer"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-gray-400 italic">
                      Client Confidential
                    </span>
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
