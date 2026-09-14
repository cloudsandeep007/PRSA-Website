import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

export default function TrialBookingSection({ locations }) {
  const [formData, setFormData] = useState({
    athlete_name: '',
    age: '',
    parent_phone: '',
    email: '',
    discipline: 'Beginner Assessment (Tots & Kids 4–7)',
    location: locations.length > 0 ? locations[0].name : 'PRSA Main Banked Track Arena',
    experience: 'First Timer',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/trial-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          athlete_name: '',
          age: '',
          parent_phone: '',
          email: '',
          discipline: 'Beginner Assessment (Tots & Kids 4–7)',
          location: locations.length > 0 ? locations[0].name : 'PRSA Main Banked Track Arena',
          experience: 'First Timer',
          message: ''
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit booking request.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-space-2xl bg-surface relative" id="trial">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="bg-surface-container-low rounded-2xl p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden border border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Booking Left Pitch */}
            <div className="lg:col-span-5 space-y-space-md flex flex-col justify-between">
              <div className="space-y-space-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/15 text-primary font-label-uppercase text-[11px] font-bold">
                  <span>RSFI ACCREDITED ASSESSMENT</span>
                </div>
                <h3 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold">
                  TEST YOUR STRIDE WITH A CHIEF COACH.
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Experience PRSA's proven training methodology first-hand. Every complimentary trial class includes boot fitting, track safety briefing, and personalized squad placement recommendations.
                </p>
              </div>

              <div className="space-y-space-sm pt-space-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-xs">01</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Free Equipment Provided (Skates + Helmet + Knee Guards)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-xs">02</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">1-on-1 kinetic diagnostic with an RSFI certified coach</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-xs">03</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Safety-barrier banked track tour for parents & guardians</span>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-lowest/60 text-xs text-outline flex items-center gap-2 border border-outline-variant/20">
                <UserCheck className="w-4 h-4 text-primary-container shrink-0" />
                <span>100% Free Trial • Skates & Protective Pads Provided Free on Rink</span>
              </div>
            </div>

            {/* Booking Right Interactive Form */}
            <div className="lg:col-span-7 bg-surface-container p-space-lg rounded-xl shadow-lg border border-outline-variant/20">
              {submitted ? (
                <div className="p-8 text-center space-y-4 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary">TRIAL BOOKING CONFIRMED!</h4>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    🎉 Thank you! PRSA's coaching concierge will call you within 2 business hours with batch slot confirmation and complimentary skate sizing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-bold text-xs shadow-lg hover:shadow-cyan-500/50"
                  >
                    Book Another Trial
                  </button>
                </div>
              ) : (
                <form className="space-y-space-md" onSubmit={handleSubmit}>
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                        FULL NAME OF ATHLETE *
                      </label>
                      <input
                        type="text"
                        name="athlete_name"
                        value={formData.athlete_name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Leo Sharma"
                        className="w-full bg-surface-container-high text-on-surface placeholder:text-outline px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container font-body-sm transition-all border border-outline-variant/30 text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                        ATHLETE AGE *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="4"
                        max="75"
                        placeholder="e.g. 7"
                        className="w-full bg-surface-container-high text-on-surface placeholder:text-outline px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container font-body-sm transition-all border border-outline-variant/30 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                        PARENT / GUARDIAN PHONE *
                      </label>
                      <input
                        type="tel"
                        name="parent_phone"
                        value={formData.parent_phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full bg-surface-container-high text-on-surface placeholder:text-outline px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container font-body-sm transition-all border border-outline-variant/30 text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="parent@prsaroller.com"
                        className="w-full bg-surface-container-high text-on-surface placeholder:text-outline px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container font-body-sm transition-all border border-outline-variant/30 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                        SELECT DISCIPLINE
                      </label>
                      <select
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleChange}
                        className="w-full bg-surface-container-high text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container font-body-sm transition-all border border-outline-variant/30 text-sm"
                      >
                        <option>Beginner Assessment (Tots & Kids 4–7)</option>
                        <option>Quad Skates (Basic & Recreational)</option>
                        <option>Inline Speed Skates (Competitive Track)</option>
                        <option>Artistic & Freestyle Slalom</option>
                        <option>Adult Fitness & Open Rink</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                        PREFERRED RINK LOCATION
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-surface-container-high text-on-surface px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container font-body-sm transition-all border border-outline-variant/30 text-sm"
                      >
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.name}>{loc.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-label-uppercase text-label-uppercase text-on-surface-variant block mb-1.5 font-bold text-[10px]">
                      CURRENT SKATING EXPERIENCE
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['First Timer', 'Can Glide / Turn', 'Past Medalist'].map(exp => (
                        <label
                          key={exp}
                          className={`p-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors border text-xs ${
                            formData.experience === exp
                              ? 'bg-primary-container/20 border-primary-container text-primary font-bold'
                              : 'bg-surface-container-high border-outline-variant/20 text-on-surface hover:bg-surface-container-highest'
                          }`}
                        >
                          <input
                            type="radio"
                            name="experience"
                            value={exp}
                            checked={formData.experience === exp}
                            onChange={handleChange}
                            className="text-primary-container"
                          />
                          <span>{exp}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-container text-on-primary-container font-label-uppercase text-label-uppercase tracking-widest py-4 rounded-lg font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>CONFIRM FREE TRIAL CLASS NOW</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
