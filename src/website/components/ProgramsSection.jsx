import React, { useState } from 'react';
import { Sparkles, ArrowRight, Clock, Users, X } from 'lucide-react';

export default function ProgramsSection({ programs }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProgram, setActiveModalProgram] = useState(null);

  const filterOptions = ['All', 'Quad Skates', 'Inline Speed'];

  const filteredPrograms = programs.filter(p => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Quad Skates') return p.name.includes('Quad') || p.name.includes('Tots') || p.level.includes('Foundational');
    if (selectedFilter === 'Inline Speed') return p.name.includes('Inline') || p.name.includes('Speed') || p.name.includes('RSFI');
    return true;
  });

  return (
    <section className="w-full py-space-2xl bg-surface-container-lowest relative" id="programs">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-uppercase text-label-uppercase tracking-widest text-primary-container font-bold text-[11px]">
              ACADEMY DISCIPLINES
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-1">
              FIND YOUR PERFECT PROGRAM
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              Tailored curriculums from ages 4 to adults across Quad Skates, Inline Speed, and Freestyle Slalom. Certified RSFI progression with safe student-to-coach ratios.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant font-label-uppercase text-xs font-bold">Filter:</span>
            {filterOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-3.5 py-1.5 rounded-full font-label-uppercase text-[11px] font-bold transition-all ${
                  selectedFilter === opt
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between hover:bg-surface-container transition-all group shadow-md hover:shadow-2xl border border-outline-variant/20 relative overflow-hidden"
            >
              <div className="space-y-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-surface-container-highest font-label-uppercase text-[10px] text-primary font-bold">
                    {prog.age_group || "ALL AGES"}
                  </span>
                  <span className="text-xs text-primary-container font-semibold">{prog.level}</span>
                </div>

                {prog.image_url && (
                  <div className="w-full h-44 rounded-lg overflow-hidden border border-outline-variant/30">
                    <img
                      src={prog.image_url}
                      alt={prog.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold group-hover:text-primary-container transition-colors">
                    {prog.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-3">
                    {prog.short_desc}
                  </p>
                </div>
              </div>

              <div className="pt-space-lg mt-space-md border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="font-label-uppercase text-[10px] text-outline block">SESSIONS</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold text-xs">{prog.schedule}</span>
                </div>
                
                <button
                  onClick={() => setActiveModalProgram(prog)}
                  className="px-4 py-2 rounded-full bg-surface-container-highest text-primary font-label-uppercase text-[11px] font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1"
                >
                  <span>VIEW MODULE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Detail Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl max-w-2xl w-full p-space-lg space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProgram(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high text-on-surface hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary-container text-xs font-bold">
                {activeModalProgram.age_group}
              </span>
              <span className="text-xs text-secondary font-bold">{activeModalProgram.level}</span>
            </div>

            <h3 className="text-2xl font-bold text-primary">{activeModalProgram.name}</h3>

            {activeModalProgram.image_url && (
              <img
                src={activeModalProgram.image_url}
                alt={activeModalProgram.name}
                className="w-full h-56 object-cover rounded-xl border border-outline-variant/30"
              />
            )}

            <p className="text-on-surface-variant text-sm leading-relaxed">
              {activeModalProgram.full_desc || activeModalProgram.short_desc}
            </p>

            <div className="grid grid-cols-2 gap-3 bg-surface-container p-3 rounded-xl border border-outline-variant/20 text-xs">
              <div>
                <span className="text-outline block">TRAINING SCHEDULE</span>
                <span className="text-on-surface font-semibold">{activeModalProgram.schedule}</span>
              </div>
              <div>
                <span className="text-outline block">MODULE DURATION</span>
                <span className="text-on-surface font-semibold">{activeModalProgram.duration}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-highest"
              >
                Close
              </button>
              <a
                href="#trial"
                onClick={() => setActiveModalProgram(null)}
                className="px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs shadow-lg hover:shadow-cyan-500/50"
              >
                Enroll in Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
