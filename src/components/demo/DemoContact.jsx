'use client';

import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function DemoContact({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Design & Development',
    budget: '$1,000 - $3,000',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const whatsappNum = settings?.whatsappNumber || '8801909711808';
  const displayPhone = settings?.displayPhone || '+880 1909-711808 (24/7 Priority)';
  const officialEmail = settings?.officialEmail || 'drivenitsolution@gmail.com';
  const officeAddress = settings?.officeAddress || 'Dhaka, Bangladesh · Remote-First Worldwide';
  const workingHours = settings?.workingHours || 'Mon-Fri from 8am to 6pm (Official WhatsApp Active)';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#04060c] relative border-t border-white/[0.06]">
      {/* Background Gradient */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Direct Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Let's Engineer Your Next{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Market Advantage
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Have a project in mind or need enterprise AI systems? Reach out to our senior engineers today for a free architectural roadmap.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Access Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#090d18] border border-white/[0.08] p-8 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Priority Consultation</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Connect directly with our engineering founders. We review every incoming brief within 4 business hours.
              </p>

              {/* Direct Info Items */}
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${whatsappNum}`}
                      className="text-sm font-medium text-white hover:text-cyan-300 transition-colors"
                    >
                      {displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${officialEmail}`}
                      className="text-sm font-medium text-white hover:text-cyan-300 transition-colors"
                    >
                      {officialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <p className="text-sm font-medium text-white">
                      {workingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Headquarters
                    </span>
                    <p className="text-sm font-medium text-white">
                      {officeAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp Box */}
              <div className="pt-6 border-t border-white/[0.06]">
                <a
                  href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20discuss%20a%20new%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on Official WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#090d18] border border-white/[0.08] p-8 sm:p-10 relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Transmission Received
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>. Our lead architect will review your project brief and respond shortly.
                  </p>
                  <div className="pt-4">
                    <a
                      href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20my%20name%20is%20${encodeURIComponent(formData.name)}.%20I%20just%20submitted%20an%20inquiry%20regarding%20${encodeURIComponent(formData.service)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs shadow-lg"
                    >
                      <span>Speed up on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-gray-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-gray-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Service of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090d18] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors cursor-pointer"
                      >
                        <option value="Web Design & Development">Web Design & Development</option>
                        <option value="AI & Meta Ads Expert">AI & Meta Ads Expert</option>
                        <option value="Graphic Designing">Graphic Designing</option>
                        <option value="Proprietary SaaS / Custom Software">Proprietary SaaS / Custom Software</option>
                        <option value="Digital Marketing & Scaling">Digital Marketing & Scaling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090d18] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors cursor-pointer"
                      >
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                        <option value="$3,000 - $10,000">$3,000 - $10,000</option>
                        <option value="$10,000+ Enterprise">$10,000+ Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Project Goals & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your product vision, timeline, target audience, and key business objectives..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-gray-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Send Project Inquiry</span>
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
