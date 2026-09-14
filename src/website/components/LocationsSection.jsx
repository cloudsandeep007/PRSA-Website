import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Compass, MessageSquare } from 'lucide-react';

export default function LocationsSection({ locations }) {
  // Default to first location if available
  const defaultLoc = locations && locations.length > 0 ? locations[0] : {
    id: 1,
    name: "PRSA Floodlit Skating Arena",
    tag_label: "MAIN HEADQUARTERS",
    address: "Electronic City / Neo Town Corridor, Bengaluru, Karnataka 560100",
    phone: "+91 98765 43210",
    schedule: "Morning: 6:00 AM – 9:30 AM • Evening: 5:00 PM – 8:30 PM",
    maps_url: "https://maps.google.com/?q=Professional+Roller+Skating+Academy+Electronic+City+Bengaluru",
    description: "Banked synthetic track with floodlight illumination, practice safety rails & spectator stands."
  };

  const [selectedLoc, setSelectedLoc] = useState(defaultLoc);

  const cleanPhone = (selectedLoc.phone || "+919876543210").replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi PRSA! I am asking about your ${selectedLoc.name} venue.`)}`;

  const mapEmbedQuery = encodeURIComponent(selectedLoc.address || selectedLoc.name + " Bengaluru");
  const iframeSrc = `https://maps.google.com/maps?q=${mapEmbedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="w-full py-space-2xl bg-surface-container-lowest" id="locations">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
          <div>
            <span className="font-label-uppercase text-label-uppercase tracking-widest text-primary-container font-bold text-[11px]">
              INTERACTIVE VENUE MAP
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mt-1">
              PRSA TRAINING VENUES & GOOGLE MAPS
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-2 text-xs md:text-sm">
              All PRSA centers are equipped with synthetic banked rinks, shock-cushioned perimeter barriers, gear rental counters, and RSFI timing gates. Select a venue below to locate it on Google Maps.
            </p>
          </div>

          <a
            href={selectedLoc.maps_url || `https://maps.google.com/?q=${mapEmbedQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all shrink-0 self-start md:self-auto"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Directions in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Left Column: Location Selector Cards */}
          <div className="lg:col-span-5 space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-sm">
              {locations.map((loc) => {
                const isSelected = selectedLoc.id === loc.id || selectedLoc.name === loc.name;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLoc(loc)}
                    className={`p-space-md rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? "bg-surface-container-high border-primary-container/80 shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-primary-container/40"
                        : "bg-surface-container-low border-outline-variant/20 hover:border-primary-container/40 hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">{loc.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-label-uppercase text-[10px] font-bold ${
                        isSelected
                          ? "bg-primary-container text-on-primary-container"
                          : "bg-primary-container/10 text-primary-container"
                      }`}>
                        {loc.tag_label || "VENUE"}
                      </span>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2 text-xs">
                      <MapPin className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </p>

                    <div className="text-xs text-on-surface-variant flex items-center gap-2 font-medium">
                      <Clock className="w-4 h-4 text-primary-container shrink-0" />
                      <span>{loc.schedule}</span>
                    </div>

                    {loc.description && (
                      <p className="text-[11px] text-outline pt-1 border-t border-outline-variant/10">
                        {loc.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href={loc.maps_url || `https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-primary-container hover:underline font-bold"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <span className="text-outline-variant">•</span>

                      <a
                        href={`https://wa.me/${(loc.phone || "+919876543210").replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi PRSA! I want to visit ${loc.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-bold"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Venue</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Box */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-2 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Phone className="w-4 h-4 text-primary-container" />
                <span>Need immediate location assistance or parking info?</span>
              </div>
              <p>Call admissions directly at <strong className="text-primary">{selectedLoc.phone || "+91 98765 43210"}</strong> or message us on WhatsApp for exact pin drops.</p>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embedded View */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 relative min-h-[420px] shadow-2xl flex flex-col justify-between">
            {/* Embedded Live Google Maps Iframe */}
            <div className="w-full h-full min-h-[380px] relative bg-surface-container-high">
              <iframe
                title={`Google Map for ${selectedLoc.name}`}
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full inset-0 rounded-t-2xl opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>

            {/* Location Banner Overlay */}
            <div className="p-space-md bg-surface-container-high border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-container" />
                  <h4 className="text-sm font-bold text-primary">{selectedLoc.name}</h4>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-1">{selectedLoc.address}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs hover:bg-emerald-500/25 transition-all inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={selectedLoc.maps_url || `https://maps.google.com/?q=${mapEmbedQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-bold text-xs hover:shadow-cyan-500/30 transition-all inline-flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
