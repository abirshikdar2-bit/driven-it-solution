'use client';

import { useState, useEffect, useCallback } from 'react';
import DemoNavbar from '@/components/demo/DemoNavbar';
import DemoHero from '@/components/demo/DemoHero';
import DemoMarquee from '@/components/demo/DemoMarquee';
import DemoServices from '@/components/demo/DemoServices';
import DemoProjects from '@/components/demo/DemoProjects';
import DemoProducts from '@/components/demo/DemoProducts';
import DemoTeam from '@/components/demo/DemoTeam';
import DemoReviews from '@/components/demo/DemoReviews';
import DemoContact from '@/components/demo/DemoContact';
import DemoFooter from '@/components/demo/DemoFooter';
import WhatsAppIcon from '@/components/WhatsAppIcon';

import defaultTeam from '@/data/team.json';
import defaultProjects from '@/data/projects.json';
import defaultServices from '@/data/servicesList.json';
import defaultProducts from '@/data/products.json';
import defaultReviews from '@/data/reviews.json';
import defaultSettings from '@/data/settings.json';

import { subscribeToDataChanges } from '@/lib/syncEvents';

export default function DemoClientPage({
  initialTeam = null,
  initialProjects = null,
  initialServices = null,
  initialProducts = null,
  initialReviews = null,
  initialSettings = null
}) {
  const [team, setTeam] = useState(
    Array.isArray(initialTeam) ? initialTeam : defaultTeam
  );
  const [projects, setProjects] = useState(
    Array.isArray(initialProjects) ? initialProjects : defaultProjects
  );
  const [services, setServices] = useState(
    Array.isArray(initialServices) ? initialServices : defaultServices
  );
  const [products, setProducts] = useState(
    Array.isArray(initialProducts) ? initialProducts : defaultProducts
  );
  const [reviews, setReviews] = useState(
    Array.isArray(initialReviews) ? initialReviews : defaultReviews
  );
  const [settings, setSettings] = useState(initialSettings || defaultSettings);

  // Sync state if props change
  useEffect(() => {
    if (Array.isArray(initialTeam)) setTeam(initialTeam);
  }, [initialTeam]);

  useEffect(() => {
    if (Array.isArray(initialProjects)) setProjects(initialProjects);
  }, [initialProjects]);

  useEffect(() => {
    if (Array.isArray(initialServices)) setServices(initialServices);
  }, [initialServices]);

  useEffect(() => {
    if (Array.isArray(initialProducts)) setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    if (Array.isArray(initialReviews)) setReviews(initialReviews);
  }, [initialReviews]);

  useEffect(() => {
    if (initialSettings && typeof initialSettings === 'object') setSettings(initialSettings);
  }, [initialSettings]);

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
        if (data && typeof data === 'object') {
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

    const handleFocus = () => {
      refreshAll();
    };
    window.addEventListener('focus', handleFocus);

    // 8-second background heartbeat
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        refreshAll();
      }
    }, 8000);

    return () => {
      unsubscribe();
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [refreshTeam, refreshProjects, refreshServices, refreshProducts, refreshReviews, refreshSettings, refreshAll]);

  const whatsappNum = settings?.whatsappNumber || '8801909711808';

  return (
    <div className="relative min-h-screen bg-[#050811] text-[#f3f4f6] flex flex-col selection:bg-cyan-400 selection:text-black">
      {/* Top Demo Banner Indicator */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#0a1526] to-indigo-950 border-b border-cyan-500/20 py-2 px-4 text-center text-xs text-cyan-300 font-medium z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-white">✨ DEMO PREVIEW:</span>
            <span>100% Original, Bespoke Architecture (Zero Copyright Conflict)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="/"
              className="text-gray-400 hover:text-white underline transition-colors"
            >
              View Current Home
            </a>
            <a
              href="/admin"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Admin Panel →
            </a>
          </div>
        </div>
      </div>

      {/* Modern Floating Header */}
      <DemoNavbar settings={settings} />

      <main className="flex-1">
        {/* Bespoke Hero Section */}
        <DemoHero settings={settings} />

        {/* Tech Stack Marquee */}
        <DemoMarquee />

        {/* Dynamic Services Bento Grid */}
        <DemoServices services={services} settings={settings} />

        {/* Dynamic Case Studies Showcase */}
        <DemoProjects projects={projects} />

        {/* Dynamic Proprietary Products (Software We Own) */}
        <DemoProducts products={products} />

        {/* Dynamic Executive Leadership & Mentors */}
        <DemoTeam team={team} />

        {/* Dynamic Client Stories & Endorsements */}
        <DemoReviews reviews={reviews} />

        {/* Dynamic Modern Contact & Inquiry Hub */}
        <DemoContact settings={settings} />
      </main>

      {/* 100% Original Modern Studio Footer */}
      <DemoFooter settings={settings} />

      {/* Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/${whatsappNum}?text=Hi%20Driven%20IT%20Solution,%20I%20am%20reviewing%20the%20new%20demo%20and%20would%20like%20to%20connect!`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book Free Call on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold px-4 py-3 rounded-full flex items-center gap-2 text-xs shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <WhatsAppIcon size={18} />
        <span>{settings.ctaText || 'Book Free Call'}</span>
      </a>
    </div>
  );
}
