import React, { useState } from 'react';
import { MapPin, Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ settings }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const phoneNum = settings.phone || "+91 98765 43210";
  const whatsappNum = settings.whatsapp || "919876543210";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 pt-space-2xl pb-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-2xl">
        <div className="lg:col-span-4 space-y-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-container to-primary flex items-center justify-center text-on-primary-container font-headline-sm font-bold shadow-md">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold uppercase leading-none">PRSA</span>
              <span className="font-label-uppercase text-[9px] tracking-widest text-on-surface-variant font-bold">ROLLER SKATING ACADEMY</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed text-xs">
            Professional Roller Skating Academy (PRSA) is the premier center for quad, inline speed, and freestyle slalom skating in Bangalore. Committed to kinetic excellence, child safety, and national podium achievement.
          </p>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-high border border-outline-variant/30 text-primary font-label-uppercase text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              RSFI AFFILIATED TRAINING ACADEMY
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-space-sm">
          <h3 className="font-label-uppercase text-label-uppercase tracking-widest text-primary font-bold text-xs">Navigation</h3>
          <ul className="space-y-2 font-body-sm text-xs">
            <li><a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Academy Home</a></li>
            <li><a href="#about-philosophy" className="text-on-surface-variant hover:text-on-surface transition-colors">About & Rink Specs</a></li>
            <li><a href="#coaches" className="text-on-surface-variant hover:text-on-surface transition-colors">Chief Coaches</a></li>
            <li><a href="#achievements" className="text-on-surface-variant hover:text-on-surface transition-colors">Championship Medals</a></li>
            <li><a href="#events" className="text-on-surface-variant hover:text-on-surface transition-colors">Competitions & Trials</a></li>
            <li><a href="#faq" className="text-on-surface-variant hover:text-on-surface transition-colors">Safety FAQ</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-space-sm">
          <h3 className="font-label-uppercase text-label-uppercase tracking-widest text-primary font-bold text-xs">Programs</h3>
          <ul className="space-y-2 font-body-sm text-xs">
            <li><a href="#programs" className="text-on-surface-variant hover:text-on-surface transition-colors">Beginner Tots (Ages 4-7)</a></li>
            <li><a href="#programs" className="text-on-surface-variant hover:text-on-surface transition-colors">Basic Quad Skates</a></li>
            <li><a href="#programs" className="text-on-surface-variant hover:text-on-surface transition-colors">Inline Velocity Tier</a></li>
            <li><a href="#programs" className="text-on-surface-variant hover:text-on-surface transition-colors">Speed Roller (RSFI Track)</a></li>
            <li><a href="#programs" className="text-on-surface-variant hover:text-on-surface transition-colors">Artistic & Slalom</a></li>
            <li><a href="#trial" className="text-primary font-semibold hover:underline">Book a Free Trial</a></li>
          </ul>
        </div>

        <div className="lg:col-span-4 space-y-space-md">
          <h3 className="font-label-uppercase text-label-uppercase tracking-widest text-primary font-bold text-xs">PRSA Arena Bulletin</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Stay updated with RSFI state tournament schedules, summer camps, and squad trial dates.</p>
          
          {subscribed ? (
            <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Subscribed! You will receive PRSA squad bulletins.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-space-xs">
              <div className="flex items-stretch gap-space-xs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email address"
                  className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-3 py-2 font-body-sm text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container"
                />
                <button
                  type="submit"
                  className="bg-primary-container text-on-primary-container font-label-uppercase text-xs tracking-widest px-4 rounded-lg font-bold hover:shadow-cyan-500/40 transition-all shrink-0"
                >
                  JOIN
                </button>
              </div>
              <span className="font-body-sm text-outline block text-[11px]">Strict zero-spam policy. Unsubscribe anytime.</span>
            </form>
          )}

          <div className="pt-space-xs font-body-sm text-xs text-on-surface-variant space-y-1">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{settings.address || "PRSA Banked Speed Arena, Electronic City, Bengaluru"}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>{phoneNum}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>{settings.email || "admissions@prsaroller.com"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin border-t border-outline-variant/20 pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-md text-xs text-outline">
        <div>© 2026 PRSA — Professional Roller Skating Academy. All rights reserved. RSFI Recognized.</div>
        <div className="flex items-center gap-space-md">
          <a href="#faq" className="hover:text-on-surface transition-colors">Safety & Protocols</a>
          <a href="#trial" className="hover:text-on-surface transition-colors">Privacy Policy</a>
          <a href="/admin/login" className="text-primary hover:underline font-bold">Admin Portal Login</a>
        </div>
      </div>
    </footer>
  );
}
