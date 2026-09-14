import React, { useState } from 'react';
import { Menu, X, Shield, Lock, Phone, MessageSquare } from 'lucide-react';

export default function Header({ settings, onBookTrialClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phoneNum = settings.phone || "+91 98765 43210";
  const whatsappNum = settings.whatsapp || "919876543210";

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin h-20 flex items-center justify-between gap-space-md">
        {/* Brand Insignia */}
        <div className="flex items-center gap-space-sm shrink-0">
          <a href="#" className="flex items-center gap-2.5 focus:outline-none">
            <img
              src="/logo/prsa_logo.png"
              alt="PRSA Official Logo"
              className="h-10 w-auto object-contain transition-transform hover:scale-105"
            />

            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold uppercase leading-none">PRSA</span>
              <span className="font-label-uppercase text-[9px] tracking-widest text-on-surface-variant font-bold hidden sm:inline-block">ROLLER SKATING ACADEMY</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container inline-block shadow-[0_0_8px_#00f0ff]"></span>
          </a>
        </div>


        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-surface-container-lowest/60 p-1 rounded-lg border border-outline-variant/20">
          <a href="#" className="px-2.5 xl:px-3 py-1.5 transition-colors bg-surface-container-highest text-primary font-bold rounded-lg shadow-sm text-xs xl:text-sm">Home</a>
          <a href="#about-philosophy" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">About</a>
          <a href="#programs" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">Programs</a>
          <a href="#coaches" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">Coaches</a>
          <a href="#achievements" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">Achievements</a>
          <a href="#gallery" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">Gallery</a>
          <a href="#events" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">Events</a>
          <a href="#locations" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">Locations</a>
          <a href="#faq" className="font-label-md text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-2.5 xl:px-3 py-1.5 transition-colors">FAQ</a>
        </nav>

        {/* Action Controls & Portal */}
        <div className="flex items-center gap-2 sm:gap-space-sm shrink-0">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://wa.me/${whatsappNum}?text=Hello%20PRSA!%20I%20want%20to%20enquire%20about%20skating%20classes.`, '_blank');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-bold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#trial"
            onClick={onBookTrialClick}
            className="bg-primary-container text-on-primary-container font-label-uppercase text-xs sm:text-label-uppercase tracking-wider px-3.5 py-2 sm:px-space-md sm:py-space-sm rounded-full shadow-[0_0_16px_rgba(0,240,255,0.35)] hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center font-bold shrink-0"
          >
            Book Free Trial
          </a>

          <div className="h-6 w-[1px] bg-outline-variant/40 hidden sm:block"></div>

          <a
            href="/admin/login"
            className="hidden sm:flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Admin</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-surface-container-high text-on-surface hover:text-primary transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-margin-mobile py-space-md space-y-3 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-2">
            <a onClick={() => setMobileMenuOpen(false)} href="#" className="py-2.5 px-3 rounded bg-surface-container-highest text-primary font-bold text-sm">Home</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#about-philosophy" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">About & Rink Specs</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#programs" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">Programs</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#coaches" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">Coaches</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#achievements" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">Achievements</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#gallery" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">Gallery</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#events" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">Events</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#locations" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">Locations</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#faq" className="py-2.5 px-3 text-on-surface-variant hover:text-on-surface text-sm">FAQ</a>
            <a onClick={() => setMobileMenuOpen(false)} href="/admin/login" className="py-2.5 px-3 text-primary font-bold flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" /> Admin Portal
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
