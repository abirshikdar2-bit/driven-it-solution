'use client';

import { useState, useEffect } from 'react';
import MollahsNavbar from '@/components/MollahsNavbar';
import MollahsHero from '@/components/MollahsHero';
import LogoMarquee from '@/components/LogoMarquee';
import GlobalReach from '@/components/GlobalReach';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import SoftwareWeOwn from '@/components/SoftwareWeOwn';
import WhatYouGet from '@/components/WhatYouGet';
import WhyChooseUs from '@/components/WhyChooseUs';
import ClientStories from '@/components/ClientStories';
import MetricsBar from '@/components/MetricsBar';
import ContactSection from '@/components/ContactSection';
import MollahsFooter from '@/components/MollahsFooter';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import initialSettings from '@/data/settings.json';

export default function ClientPage() {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data && data.whatsappNumber) {
            setSettings(data);
          }
        }
      } catch (err) {
        console.error('Failed to load settings in ClientPage:', err);
      }
    }
    loadSettings();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f3f4f6] flex flex-col selection:bg-cyan-400 selection:text-black">
      {/* Fixed Header */}
      <MollahsNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <MollahsHero />

        {/* Slow Marquee Ticker with Hover Color Shift */}
        <LogoMarquee />

        {/* Global Reach - A Team Without Borders */}
        <GlobalReach />

        {/* Case Studies */}
        <CaseStudiesSection />

        {/* Software We Own - Dalil OS & Cafe OS */}
        <SoftwareWeOwn />

        {/* What You Get - Services */}
        <WhatYouGet />

        {/* Why Choose Us - Bento Grid with Docs Team Photos */}
        <WhyChooseUs />

        {/* Client Stories - Editable Reviews */}
        <ClientStories />

        {/* Metrics Bar */}
        <MetricsBar />

        {/* Contact Section matching Mollahs IT 1:1 with Canvas Animation */}
        <ContactSection />
      </main>

      {/* Footer with Giant Watermark Typography */}
      <MollahsFooter />

      {/* Floating "Book Free Call" Button with Official WhatsApp integration */}
      <a
        href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Driven%20IT%20Solution,%20I%20would%20like%20to%20book%20a%20free%20call`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book Free Call on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium px-4 py-2.5 rounded-full flex items-center gap-2 text-xs shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <WhatsAppIcon size={18} />
        <span>{settings.ctaText || 'Book Free Call'}</span>
      </a>
    </div>
  );
}
