import React from 'react';

export default function Metrics({ content }) {
  const stat1Val = content.stat_1_val || "850+";
  const stat1Lbl = content.stat_1_lbl || "ACTIVE SKATERS TRAINED";
  const stat2Val = content.stat_2_val || "12+";
  const stat2Lbl = content.stat_2_lbl || "NATIONAL CHAMPIONSHIP MEDALS";
  const stat3Val = content.stat_3_val || "8 RSFI";
  const stat3Lbl = content.stat_3_lbl || "CERTIFIED CHIEF COACHES";
  const stat4Val = content.stat_4_val || "100%";
  const stat4Lbl = content.stat_4_lbl || "SAFETY & HELMET COMPLIANCE";

  return (
    <section className="w-full bg-surface-container-low py-space-md shadow-xl relative z-20 border-y border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-space-md gap-x-space-sm divide-y-0 md:divide-y-0">
          <div className="p-space-sm flex flex-col justify-center">
            <div className="flex items-baseline gap-1 text-primary">
              <span className="font-metric-stat text-metric-stat font-bold text-4xl md:text-5xl">{stat1Val}</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-on-surface-variant font-medium mt-1 text-[11px]">
              {stat1Lbl}
            </span>
          </div>

          <div className="p-space-sm flex flex-col justify-center">
            <div className="flex items-baseline gap-1 text-secondary">
              <span className="font-metric-stat text-metric-stat font-bold text-4xl md:text-5xl">{stat2Val}</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-on-surface-variant font-medium mt-1 text-[11px]">
              {stat2Lbl}
            </span>
          </div>

          <div className="p-space-sm flex flex-col justify-center">
            <div className="flex items-baseline gap-1 text-primary">
              <span className="font-metric-stat text-metric-stat font-bold text-4xl md:text-5xl">{stat3Val}</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-on-surface-variant font-medium mt-1 text-[11px]">
              {stat3Lbl}
            </span>
          </div>

          <div className="p-space-sm flex flex-col justify-center bg-surface-container-high/40 rounded-lg">
            <div className="flex items-baseline gap-1 text-primary-container">
              <span className="font-metric-stat text-metric-stat font-bold text-4xl md:text-5xl">{stat4Val}</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-on-surface-variant font-medium mt-1 text-[11px]">
              {stat4Lbl}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
