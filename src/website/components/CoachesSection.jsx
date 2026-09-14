import React from 'react';
import { Award, Star, Trophy, Shield } from 'lucide-react';

export default function CoachesSection({ coaches = [] }) {
  // Determine layout class based on number of coaches
  const isSingle = coaches.length === 1;
  const isDouble = coaches.length === 2;

  return (
    <section className="w-full py-space-2xl bg-surface relative" id="coaches">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-space-2xl space-y-space-xs">
          <span className="font-label-uppercase text-label-uppercase tracking-widest text-primary-container font-bold text-[11px]">
            RSFI ACCREDITED INSTRUCTORS
          </span>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold">
            MEET OUR CHIEF COACHES
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Learn from decorated national champions and RSFI certified instructors committed to safety, technique, and podium success.
          </p>
        </div>

        {/* Coaches Centered Flex Container */}
        <div className="flex flex-wrap justify-center gap-space-lg max-w-6xl mx-auto">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className={`bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 shadow-lg hover:border-primary-container/50 transition-all group flex flex-col justify-between ${
                isSingle
                  ? 'w-full max-w-md'
                  : isDouble
                  ? 'w-full md:w-[calc(50%-1rem)] max-w-md'
                  : 'w-full md:w-[calc(33.333%-1.5rem)] max-w-md'
              }`}
            >
              <div>
                {/* Photo & Telemetry Overlay */}
                <div className="relative h-80 overflow-hidden bg-surface-container-high">
                  <img
                    src={coach.photo_url || "/uploads/prsa_media_02.jpg"}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x500?text=Coach+Photo";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>

                  <div className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] text-primary-container font-bold border border-primary-container/30">
                    {coach.experience}
                  </div>
                </div>

                {/* Content */}
                <div className="p-space-lg space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-primary-container transition-colors">
                      {coach.name}
                    </h3>
                    <span className="text-xs font-semibold text-secondary block mt-0.5">
                      {coach.position}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {coach.bio}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-outline-variant/20 text-xs">
                    <div className="flex items-center gap-2 text-on-surface">
                      <Shield className="w-4 h-4 text-primary-container shrink-0" />
                      <span className="truncate">{coach.specialization}</span>
                    </div>
                    {coach.achievements && (
                      <div className="flex items-center gap-2 text-secondary">
                        <Trophy className="w-4 h-4 text-secondary shrink-0" />
                        <span className="truncate font-medium">{coach.achievements}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-space-lg pb-space-lg pt-2">
                <a
                  href="#trial"
                  className="w-full py-2.5 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-bold text-xs flex items-center justify-center transition-all shadow-sm"
                >
                  Book Session with Coach
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
