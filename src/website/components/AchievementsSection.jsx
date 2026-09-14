import React from 'react';
import { Trophy, Medal, Flag, Star } from 'lucide-react';

export default function AchievementsSection({ achievements }) {
  return (
    <section className="w-full py-space-2xl bg-surface-container-lowest relative border-y border-outline-variant/20" id="achievements">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-uppercase text-label-uppercase tracking-widest text-secondary font-bold text-[11px]">
              CHAMPIONSHIP PODIUM WALL
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-1">
              ACADEMY MEDAL TALLY
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              PRSA athletes regularly win top medals at District, RSFI State, RSFI National, and prestigious inter-school competitions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="bg-surface-container-low rounded-xl p-space-lg border border-outline-variant/30 flex flex-col justify-between hover:border-secondary/50 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-bold text-xs">
                    {ach.year} {ach.category}
                  </span>
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>

                {ach.image_url && (
                  <div className="w-full h-40 rounded-lg overflow-hidden border border-outline-variant/20">
                    <img
                      src={ach.image_url}
                      alt={ach.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <span className="text-secondary font-bold text-xl block">{ach.count_label}</span>
                  <h3 className="text-lg font-bold text-primary mt-1">{ach.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
