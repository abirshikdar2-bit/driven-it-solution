'use client';

import { useState, useEffect, useCallback } from 'react';
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
import defaultSettings from '@/data/settings.json';
import { subscribeToDataChanges } from '@/lib/syncEvents';

export default function ClientPage({
  initialTeam = [],
  initialProjects = [],
  initialServices = [],
  initialProducts = [],
  initialReviews = [],
  initialSettings = null
}) {
  const [team, setTeam] = useState(initialTeam);
  const [projects, setProjects] = useState(initialProjects);
  const [services, setServices] = useState(initialServices);
  const [products, setProducts] = useState(initialProducts);
  const [reviews, setReviews] = useState(initialReviews);
  const [settings, setSettings] = useState(initialSettings || defaultSettings);

  // Granular fetchers with strict zero-cache policy
  const refreshTeam = useCallback(async () => {
    try {
      const res = await fetch(`/api/team?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTeam(json.data);
        }
      }
    } catch (e) {
      console.warn('Failed to refresh team:', e);
    }
  }, []);

  const refreshProjects = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      }
    } catch (e) {
      console.warn('Failed to refresh projects:', e);
    }
  }, []);

  const refreshServices = useCallback(async () => {
    try {
      const res = await fetch(`/api/services?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data);
        }
      }
    } catch (e) {
      console.warn('Failed to refresh services:', e);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/products?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      }
    } catch (e) {
      console.warn('Failed to refresh products:', e);
    }
  }, []);

  const refreshReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setReviews(data);
        }
      }
    } catch (e) {
      console.warn('Failed to refresh reviews:', e);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.whatsappNumber) {
          setSettings(data);
        }
      }
    } catch (e) {
      console.warn('Failed to refresh settings:', e);
    }
  }, []);

  const refreshAll = useCallback(() => {
    refreshTeam();
    refreshProjects();
    refreshServices();
    refreshProducts();
    refreshReviews();
    refreshSettings();
  }, [refreshTeam, refreshProjects, refreshServices, refreshProducts, refreshReviews, refreshSettings]);

  // Initial client verification on mount
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Real-time synchronization listener (BroadcastChannel + LocalStorage + VisibilityChange + Focus)
  useEffect(() => {
    const unsubscribe = subscribeToDataChanges((event) => {
      const entity = event.entity || 'all';
      if (entity === 'team') refreshTeam();
      else if (entity === 'projects') refreshProjects();
      else if (entity === 'services') refreshServices();
      else if (entity === 'products') refreshProducts();
      else if (entity === 'reviews') refreshReviews();
      else if (entity === 'settings') refreshSettings();
      else refreshAll();
    });

    // 10-second background heartbeat when tab is active (for cross-device / multi-admin edits)
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        refreshAll();
      }
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [refreshTeam, refreshProjects, refreshServices, refreshProducts, refreshReviews, refreshSettings, refreshAll]);

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

        {/* Case Studies - Real-time Connected */}
        <CaseStudiesSection projects={projects} />

        {/* Software We Own - Real-time Connected */}
        <SoftwareWeOwn products={products} />

        {/* What You Get - Services - Real-time Connected */}
        <WhatYouGet services={services} />

        {/* Why Choose Us - Leadership & Teachers - Real-time Connected */}
        <WhyChooseUs team={team} />

        {/* Client Stories - Reviews - Real-time Connected */}
        <ClientStories reviews={reviews} />

        {/* Metrics Bar */}
        <MetricsBar />

        {/* Contact Section matching Mollahs IT 1:1 with Canvas Animation */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer with Giant Watermark Typography - Real-time Connected */}
      <MollahsFooter settings={settings} />

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
