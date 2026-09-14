import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function LocationsSection({ locations }) {
  return (
    <section className="w-full py-space-2xl bg-surface-container-lowest" id="locations">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-space-md">
            <span className="font-label-uppercase text-label-uppercase tracking-widest text-primary-container font-bold text-[11px]">
              CERTIFIED TRAINING CENTERS
            </span>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              PRSA TRAINING VENUES
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              All complexes are equipped with synthetic banked rinks, shock-cushioned perimeter barriers, gear rental counters, and RSFI timing gates.
            </p>

            <div className="space-y-space-sm pt-space-xs">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2 shadow-md hover:border-primary-container/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">{loc.name}</span>
                    <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-uppercase text-[10px] font-bold">
                      {loc.tag_label || "VENUES"}
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>

                  <div className="text-xs text-primary-container flex items-center gap-1 font-semibold">
                    <Clock className="w-4 h-4 text-primary-container shrink-0" />
                    <span>{loc.schedule}</span>
                  </div>

                  {loc.maps_url && (
                    <a
                      href={loc.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-secondary hover:underline pt-1 font-bold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Google Maps Location Preview / Image */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 relative min-h-[350px] shadow-xl flex flex-col justify-end">
            <img
              src="/uploads/prsa_media_10.jpg"
              alt="PRSA Banked Rink Venue"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>

            <div className="relative z-10 p-space-lg space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-xs">
                <span>DEDICATED BANKED SPEED TRACK</span>
              </div>
              <h4 className="text-xl font-bold text-primary">PRSA Electronic City Headquarters</h4>
              <p className="text-xs text-on-surface-variant max-w-md">
                Featuring a 200m banked synthetic speed track, 3000W night floodlights, safety rails, parent seating lounge, and RSFI timing gates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
