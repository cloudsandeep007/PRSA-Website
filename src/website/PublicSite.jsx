import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import CoachesSection from './components/CoachesSection';
import AchievementsSection from './components/AchievementsSection';
import GallerySection from './components/GallerySection';
import EventsSection from './components/EventsSection';
import TestimonialsSection from './components/TestimonialsSection';
import TrialBookingSection from './components/TrialBookingSection';
import LocationsSection from './components/LocationsSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

export default function PublicSite() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [settings, setSettings] = useState({});
  const [programs, setPrograms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [locations, setLocations] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const ts = Date.now();
        const [
          resContent,
          resSettings,
          resPrograms,
          resCoaches,
          resEvents,
          resAch,
          resGallery,
          resTest,
          resLoc,
          resFaqs
        ] = await Promise.all([
          fetch(`/api/content?t=${ts}`).then(r => r.json()).catch(() => ({})),
          fetch(`/api/settings?t=${ts}`).then(r => r.json()).catch(() => ({})),
          fetch(`/api/programs?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/coaches?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/events?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/achievements?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/gallery?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/testimonials?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/locations?t=${ts}`).then(r => r.json()).catch(() => ([])),
          fetch(`/api/faqs?t=${ts}`).then(r => r.json()).catch(() => ([]))
        ]);

        let localContent = {}, localSettings = null, localPrograms = null, localCoaches = null, localEvents = null, localAch = null, localGallery = null, localTest = null, localLoc = null, localFaqs = null;
        try {
          const rawContent = localStorage.getItem('prsa_live_content');
          if (rawContent) localContent = JSON.parse(rawContent);

          const rawSettings = localStorage.getItem('prsa_live_settings');
          if (rawSettings) localSettings = JSON.parse(rawSettings);

          const rawCoaches = localStorage.getItem('prsa_live_coaches');
          if (rawCoaches) localCoaches = JSON.parse(rawCoaches);

          const rawPrograms = localStorage.getItem('prsa_live_programs');
          if (rawPrograms) localPrograms = JSON.parse(rawPrograms);

          const rawEvents = localStorage.getItem('prsa_live_events');
          if (rawEvents) localEvents = JSON.parse(rawEvents);

          const rawAch = localStorage.getItem('prsa_live_achievements');
          if (rawAch) localAch = JSON.parse(rawAch);

          const rawGallery = localStorage.getItem('prsa_live_gallery');
          if (rawGallery) localGallery = JSON.parse(rawGallery);

          const rawTest = localStorage.getItem('prsa_live_testimonials');
          if (rawTest) localTest = JSON.parse(rawTest);

          const rawLoc = localStorage.getItem('prsa_live_locations');
          if (rawLoc) localLoc = JSON.parse(rawLoc);

          const rawFaqs = localStorage.getItem('prsa_live_faqs');
          if (rawFaqs) localFaqs = JSON.parse(rawFaqs);
        } catch (lErr) {}

        setContent({ ...(resContent || {}), ...localContent });
        setSettings(localSettings || resSettings || {});
        setPrograms(localPrograms || resPrograms || []);
        setCoaches(localCoaches || resCoaches || []);
        setEvents(localEvents || resEvents || []);
        setAchievements(localAch || resAch || []);
        setGallery(localGallery || resGallery || []);
        setTestimonials(localTest || resTest || []);
        setLocations(localLoc || resLoc || []);
        setFaqs(localFaqs || resFaqs || []);
      } catch (err) {
        console.error('Failed to load website data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();

    const handleUpdate = () => {
      try {
        const rawContent = localStorage.getItem('prsa_live_content');
        if (rawContent) setContent(prev => ({ ...prev, ...JSON.parse(rawContent) }));

        const rawSettings = localStorage.getItem('prsa_live_settings');
        if (rawSettings) setSettings(JSON.parse(rawSettings));

        const rawCoaches = localStorage.getItem('prsa_live_coaches');
        if (rawCoaches) setCoaches(JSON.parse(rawCoaches));

        const rawPrograms = localStorage.getItem('prsa_live_programs');
        if (rawPrograms) setPrograms(JSON.parse(rawPrograms));

        const rawEvents = localStorage.getItem('prsa_live_events');
        if (rawEvents) setEvents(JSON.parse(rawEvents));

        const rawAch = localStorage.getItem('prsa_live_achievements');
        if (rawAch) setAchievements(JSON.parse(rawAch));

        const rawGallery = localStorage.getItem('prsa_live_gallery');
        if (rawGallery) setGallery(JSON.parse(rawGallery));

        const rawTest = localStorage.getItem('prsa_live_testimonials');
        if (rawTest) setTestimonials(JSON.parse(rawTest));

        const rawLoc = localStorage.getItem('prsa_live_locations');
        if (rawLoc) setLocations(JSON.parse(rawLoc));

        const rawFaqs = localStorage.getItem('prsa_live_faqs');
        if (rawFaqs) setFaqs(JSON.parse(rawFaqs));
      } catch (e) {}
    };

    window.addEventListener('prsa_content_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('prsa_content_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-4 text-primary">
        <Loader2 className="w-10 h-10 animate-spin text-primary-container" />
        <div className="font-headline-sm text-sm tracking-widest uppercase">Loading PRSA Academy Arena...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Header settings={settings} />
      <main className="w-full pt-20 bg-surface">
        <Hero content={content} settings={settings} />
        <Metrics content={content} />
        <AboutSection />
        <ProgramsSection programs={programs} />
        <CoachesSection coaches={coaches} />
        <AchievementsSection achievements={achievements} />
        <GallerySection gallery={gallery} />
        <EventsSection events={events} />
        <TestimonialsSection testimonials={testimonials} />
        <TrialBookingSection locations={locations} />
        <LocationsSection locations={locations} />
        <FAQSection faqs={faqs} />
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp whatsappNumber={settings.whatsapp} />
    </div>
  );
}
