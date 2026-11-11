'use client';

import { useState, useEffect, useCallback } from 'react';
import FlowFieldCanvas from './FlowFieldCanvas';
import WhatsAppIcon from './WhatsAppIcon';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import { Mail, Clock, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import initialSettings from '@/data/settings.json';
import { subscribeToDataChanges } from '@/lib/syncEvents';

export default function ContactSection({ settings: propSettings = null }) {
  const [settings, setSettings] = useState(
    propSettings && propSettings.whatsappNumber ? propSettings : initialSettings
  );

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.whatsappNumber) {
          setSettings(data);
        }
      }
    } catch (err) {
      console.error('Failed to load dynamic contact settings:', err);
    }
  }, []);

  useEffect(() => {
    if (propSettings && propSettings.whatsappNumber) {
      setSettings(propSettings);
    }
  }, [propSettings]);

  useEffect(() => {
    loadSettings();
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.entity === 'settings' || event.entity === 'all') {
        loadSettings();
      }
    });
    return () => unsubscribe();
  }, [loadSettings]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Web Design & Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* 100% Exact FlowField Background matching Mollahs IT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FlowFieldCanvas
          color="#22d3ee"
          trailOpacity={0.15}
          particleCount={600}
          speed={0.5}
        />
      </div>

      <div className="container-custom relative z-10 mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex justify-center mb-6">
            <SectionBadge>Contact</SectionBadge>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 uppercase tracking-tight text-white font-sans">
            Get in <span className="bg-logo-gradient bg-clip-text text-transparent">touch</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-light italic font-sans leading-relaxed max-w-2xl mx-auto">
            Ready to scale your business? Let&apos;s discuss your engineering requirements and see how we can accelerate your enterprise growth.
          </p>
        </div>

        {/* 2-Column Form & Direct Access Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Left: Transmission Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 z-0" />
            <div className="bg-[#0b0c10]/85 backdrop-blur-2xl border border-white/5 p-10 md:p-12 rounded-[2rem] relative z-10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 transition-all duration-500" />
              
              <h3 className="text-3xl font-bold text-white mb-10 flex items-center font-display tracking-tight group-hover:text-cyan-400 transition-colors relative z-10">
                <MessageSquare size={26} className="mr-4 text-cyan-400 shrink-0" />
                Send us a message
              </h3>

              {submitted ? (
                <div className="py-16 text-center relative z-10">
                  <CheckCircle2 size={56} className="mx-auto text-emerald-400 mb-4 animate-bounce" />
                  <h4 className="text-3xl font-bold font-display uppercase tracking-wider text-white">
                    Transmission Received
                  </h4>
                  <p className="mt-3 text-base text-gray-400 italic leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out. Our engineering team reviews every brief and responds within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-8 py-3.5 bg-cyan-600/20 border border-cyan-500/30 text-xs font-bold uppercase tracking-widest text-cyan-300 hover:bg-cyan-500/30 rounded-xl transition-all"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 italic">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-6 py-4 bg-black/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-600 transition-all font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 italic">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-6 py-4 bg-black/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-600 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 italic">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 bg-black/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-600 transition-all font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 italic">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+880 1909-711808"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-6 py-4 bg-black/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-600 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 italic">
                      Service Interest
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-6 py-4 bg-black/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white transition-all appearance-none font-light cursor-pointer"
                      >
                        <option value="Graphic Designing" className="bg-[#0b0c10] text-white">Graphic Designing</option>
                        <option value="Web Design & Development" className="bg-[#0b0c10] text-white">Web Design &amp; Development</option>
                        <option value="AI & Meta Ads Expert" className="bg-[#0b0c10] text-white">AI &amp; Meta Ads Expert</option>
                        <option value="Digital Marketing" className="bg-[#0b0c10] text-white">Digital Marketing</option>
                        <option value="Custom Business Dashboard" className="bg-[#0b0c10] text-white">Custom Business Dashboard</option>
                        <option value="Custom Next.js Development" className="bg-[#0b0c10] text-white">Custom Next.js Development</option>
                        <option value="Other" className="bg-[#0b0c10] text-white">Other</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 opacity-50">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 italic">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 bg-black/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-600 transition-all resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl py-5 shadow-lg shadow-cyan-500/20 transition-all duration-300 tracking-widest uppercase text-xs flex items-center justify-center space-x-3 cursor-pointer"
                  >
                    <span>Send Transmission</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Direct Access Details */}
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display tracking-tight">
              Let&apos;s build something <span className="text-gradient">incredible</span>
            </h3>
            <p className="text-gray-400 text-lg sm:text-xl mb-12 leading-relaxed font-light italic font-sans">
              We&apos;re not just a service provider; we&apos;re your partner in digital evolution. Whether you have a specific project in mind or just want to explore the possibilities of technology, we&apos;re here to guide you.
            </p>

            <div className="space-y-10">
              {/* Email */}
              <div className="flex items-start space-x-6 group p-6 rounded-2xl bg-white/0 hover:bg-white/5 transition-all duration-500 border border-white/0 hover:border-white/5 shadow-2xl">
                <div className="w-16 h-16 bg-cyan-950/30 rounded-2xl flex items-center justify-center flex-shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <Mail className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 font-display tracking-tight">
                    Email
                  </h4>
                  <a
                    href={`mailto:${settings.officialEmail}`}
                    className="text-gray-300 text-lg font-light mb-1 hover:text-white transition-colors duration-200 block underline decoration-cyan-500/30 underline-offset-4"
                  >
                    {settings.officialEmail}
                  </a>
                  <p className="text-gray-500 text-sm font-light italic font-sans tracking-wide">
                    Send us an email anytime
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start space-x-6 group p-6 rounded-2xl bg-white/0 hover:bg-white/5 transition-all duration-500 border border-white/0 hover:border-white/5 shadow-2xl">
                <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#25D366]/20 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/50 transition-all duration-500 shadow-[0_0_15px_rgba(37,211,102,0.15)]">
                  <WhatsAppIcon size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-[#25D366] transition-colors duration-300 font-display tracking-tight flex items-center gap-2">
                    <span>Phone &amp; WhatsApp</span>
                  </h4>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 text-lg font-light mb-1 hover:text-white transition-colors duration-200 block underline decoration-[#25D366]/40 underline-offset-4"
                  >
                    {settings.displayPhone || `+${settings.whatsappNumber}`}
                  </a>
                  <p className="text-gray-500 text-sm font-light italic font-sans tracking-wide">
                    {settings.workingHours}
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start space-x-6 group p-6 rounded-2xl bg-white/0 hover:bg-white/5 transition-all duration-500 border border-white/0 hover:border-white/5 shadow-2xl">
                <div className="w-16 h-16 bg-cyan-950/30 rounded-2xl flex items-center justify-center flex-shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <Clock className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 font-display tracking-tight">
                    Response Time
                  </h4>
                  <p className="text-gray-300 text-lg font-light mb-1 italic">
                    24 hours
                  </p>
                  <p className="text-gray-500 text-sm font-light italic font-sans tracking-wide">
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Section */}
        <div className="bg-[#0b0c10]/85 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-16 lg:p-24 relative overflow-hidden group text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent group-hover:from-cyan-500/10 transition-all duration-700" />
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display tracking-tight">
              Ready to <span className="text-gradient">scale</span> your business?
            </h3>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light italic">
              Don&apos;t let your competition outpace you. Book a free consultation and let&apos;s strategize your path to digital dominance starting today.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href="https://wa.me/8801909711808?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20book%20a%20free%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/20 transition-all duration-300 tracking-widest uppercase text-sm flex items-center justify-center group cursor-pointer"
              >
                <WhatsAppIcon size={20} className="mr-3 text-[#25D366]" />
                <span>Book Free Consultation via WhatsApp</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
