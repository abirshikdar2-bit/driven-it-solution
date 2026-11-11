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

import defaultTeam from '@/data/team.json';
import defaultProjects from '@/data/projects.json';
import defaultServices from '@/data/servicesList.json';
import defaultProducts from '@/data/products.json';
import defaultReviews from '@/data/reviews.json';
import defaultSettings from '@/data/settings.json';

import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

export default function ClientPage({
  initialTeam = null,
  initialProjects = null,
  initialServices = null,
  initialProducts = null,
  initialReviews = null,
  initialSettings = null
}) {
  const [team, setTeam] = useState(() => {
    if (Array.isArray(initialTeam) && initialTeam.length > 0) return initialTeam;
    if (typeof window !== 'undefined') {
      const cached = getLocalCache('team');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    }
    return defaultTeam;
  });

  const [projects, setProjects] = useState(() => {
    if (Array.isArray(initialProjects) && initialProjects.length > 0) return initialProjects;
    if (typeof window !== 'undefined') {
      const cached = getLocalCache('projects');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    }
    return defaultProjects;
  });

  const [services, setServices] = useState(() => {
    if (Array.isArray(initialServices) && initialServices.length > 0) return initialServices;
    if (typeof window !== 'undefined') {
      const cached = getLocalCache('services');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    }
    return defaultServices;
  });

  const [products, setProducts] = useState(() => {
    if (Array.isArray(initialProducts) && initialProducts.length > 0) return initialProducts;
    if (typeof window !== 'undefined') {
      const cached = getLocalCache('products');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    }
    return defaultProducts;
  });

  const [reviews, setReviews] = useState(() => {
    if (Array.isArray(initialReviews) && initialReviews.length > 0) return initialReviews;
    if (typeof window !== 'undefined') {
      const cached = getLocalCache('reviews');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    }
    return defaultReviews;
  });

  const [settings, setSettings] = useState(() => {
    if (initialSettings) return initialSettings;
    if (typeof window !== 'undefined') {
      const cached = getLocalCache('settings');
      if (cached && cached.whatsappNumber) return cached;
    }
    return defaultSettings;
  });

  // Granular fetchers with strict zero-cache policy
  const refreshTeam = useCallback(async () => {
    try {
      const res = await fetch(`/api/team?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const cached = getLocalCache('team');
          if (Array.isArray(cached) && cached.length > json.data.length) {
            setTeam(cached);
          } else {
            setTeam(json.data);
            saveLocalCache('team', json.data);
          }
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
        if (Array.isArray(data) && data.length > 0) {
          const cached = getLocalCache('projects');
          if (Array.isArray(cached) && cached.length > data.length) {
            setProjects(cached);
          } else {
            setProjects(data);
            saveLocalCache('projects', data);
          }
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
        if (Array.isArray(data) && data.length > 0) {
          const cached = getLocalCache('services');
          if (Array.isArray(cached) && cached.length > data.length) {
            setServices(cached);
          } else {
            setServices(data);
            saveLocalCache('services', data);
          }
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
        if (Array.isArray(data) && data.length > 0) {
          const cached = getLocalCache('products');
          if (Array.isArray(cached) && cached.length > data.length) {
            setProducts(cached);
          } else {
            setProducts(data);
            saveLocalCache('products', data);
          }
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
        if (Array.isArray(data) && data.length > 0) {
          const cached = getLocalCache('reviews');
          if (Array.isArray(cached) && cached.length > data.length) {
            setReviews(cached);
          } else {
            setReviews(data);
            saveLocalCache('reviews', data);
          }
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
          saveLocalCache('settings', data);
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
    const cachedServices = getLocalCache('services');
    if (Array.isArray(cachedServices) && cachedServices.length > 0) setServices(cachedServices);
    const cachedTeam = getLocalCache('team');
    if (Array.isArray(cachedTeam) && cachedTeam.length > 0) setTeam(cachedTeam);
    const cachedProjects = getLocalCache('projects');
    if (Array.isArray(cachedProjects) && cachedProjects.length > 0) setProjects(cachedProjects);
    const cachedProducts = getLocalCache('products');
    if (Array.isArray(cachedProducts) && cachedProducts.length > 0) setProducts(cachedProducts);
    const cachedReviews = getLocalCache('reviews');
    if (Array.isArray(cachedReviews) && cachedReviews.length > 0) setReviews(cachedReviews);
    const cachedSettings = getLocalCache('settings');
    if (cachedSettings && cachedSettings.whatsappNumber) setSettings(cachedSettings);

    refreshAll();
  }, [refreshAll]);

  // Real-time synchronization listener (BroadcastChannel + LocalStorage + VisibilityChange + Focus)
  useEffect(() => {
    const unsubscribe = subscribeToDataChanges((event) => {
      const entity = event.entity || 'all';
      if (entity === 'team') {
        if (event.meta?.data && Array.isArray(event.meta.data)) setTeam(event.meta.data);
        else refreshTeam();
      } else if (entity === 'projects') {
        if (event.meta?.data && Array.isArray(event.meta.data)) setProjects(event.meta.data);
        else refreshProjects();
      } else if (entity === 'services') {
        if (event.meta?.data && Array.isArray(event.meta.data)) setServices(event.meta.data);
        else refreshServices();
      } else if (entity === 'products') {
        if (event.meta?.data && Array.isArray(event.meta.data)) setProducts(event.meta.data);
        else refreshProducts();
      } else if (entity === 'reviews') {
        if (event.meta?.data && Array.isArray(event.meta.data)) setReviews(event.meta.data);
        else refreshReviews();
      } else if (entity === 'settings') {
        if (event.meta?.data) setSettings(event.meta.data);
        else refreshSettings();
      } else {
        refreshAll();
      }
    });

    // 8-second background heartbeat when tab is active (for cross-device / multi-admin edits)
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        refreshAll();
      }
    }, 8000);

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
