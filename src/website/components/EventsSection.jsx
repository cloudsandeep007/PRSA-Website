import React from 'react';
import { Calendar, MapPin, Ticket, Shield } from 'lucide-react';

export default function EventsSection({ events }) {
  return (
    <section className="w-full py-space-2xl bg-surface-container-lowest relative border-y border-outline-variant/20" id="events">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-space-xs">
          <span className="font-label-uppercase text-label-uppercase tracking-widest text-secondary font-bold text-[11px]">
            COMPETITION CALENDAR
          </span>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold mt-1 text-center">
            UPCOMING TOURNAMENTS & TRIALS
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl text-center mx-auto">
            Official RSFI state trials, inter-school championships, and summer speed clinics.
          </p>
        </div>

        <div className="space-y-space-md">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-surface-container-low p-space-md rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-space-md hover:bg-surface-container transition-colors border border-outline-variant/20 shadow-md"
            >
              <div className="flex items-start md:items-center gap-space-md">
                {/* Date Badge */}
                <div className="bg-surface-container-high p-space-sm rounded-lg text-center min-w-[85px] border border-outline-variant/30">
                  <span className="font-label-uppercase text-[10px] text-secondary font-bold block">{evt.date_str.split(' ')[0]}</span>
                  <span className="font-headline-md text-headline-md text-primary font-bold">{evt.date_str.split(' ').slice(1).join(' ')}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-secondary-container/40 text-secondary font-label-uppercase text-[10px] font-bold">
                      {evt.category}
                    </span>
                    <span className="text-on-surface-variant text-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary-container" />
                      <span>{evt.location}</span>
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-bold">{evt.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{evt.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-space-md shrink-0 justify-between lg:justify-end">
                <div className="text-left lg:text-right">
                  <span className="font-label-uppercase text-[10px] text-primary-container font-bold block uppercase">
                    STATUS: {evt.registration_status}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">PRSA Squad Delegation</span>
                </div>

                <a
                  href="#trial"
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-uppercase text-[11px] font-bold hover:bg-primary-container transition-colors shadow-md"
                >
                  Register Skater
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
