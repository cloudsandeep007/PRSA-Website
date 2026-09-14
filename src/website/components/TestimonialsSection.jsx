import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="w-full py-space-2xl bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl space-y-space-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary font-label-uppercase text-[11px] font-bold">
            <span className="text-[#FFB800]">★ 4.9 RATING</span>
            <span>• GOOGLE BUSINESS REVIEWS</span>
          </div>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold mt-1">
            TRUSTED BY 850+ FAMILIES
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Read genuine experiences from parents and competitive skaters training at Professional Roller Skating Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between shadow-md border border-outline-variant/20 relative"
            >
              <div className="space-y-space-sm">
                <div className="flex text-[#FFB800] gap-0.5">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed italic text-sm">
                  "{test.quote}"
                </p>
              </div>

              <div className="mt-space-md pt-space-sm border-t border-outline-variant/20 flex items-center gap-space-sm">
                {test.photo_url ? (
                  <img
                    src={test.photo_url}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-primary-container/40"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-primary text-xs">
                    {test.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-label-md text-label-md text-on-surface font-bold block text-sm">{test.name}</span>
                  <span className="font-body-sm text-[11px] text-primary-container block">{test.role_desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
