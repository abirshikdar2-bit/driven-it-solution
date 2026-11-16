'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import initialProducts from '@/data/products.json';
import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

export default function SoftwareWeOwn({ products: propProducts = null }) {
  const [products, setProducts] = useState(() => {
    if (Array.isArray(propProducts)) return propProducts;
    return Array.isArray(initialProducts) ? initialProducts : [];
  });

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/products?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
          saveLocalCache('products', data);
        }
      }
    } catch (err) {
      console.error('Failed to load dynamic products:', err);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(propProducts)) {
      setProducts(propProducts);
    }
  }, [propProducts]);

  useEffect(() => {
    if (!propProducts) {
      loadProducts();
    }
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.entity === 'products' || event.entity === 'all') {
        if (event.meta?.data && Array.isArray(event.meta.data)) {
          setProducts(event.meta.data);
          saveLocalCache('products', event.meta.data);
        } else {
          loadProducts();
        }
      }
    });
    return () => unsubscribe();
  }, [propProducts, loadProducts]);

  return (
    <section id="products" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 relative pt-8 pb-8 sm:pt-10 sm:pb-10">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div>
          <SectionBadge>Products</SectionBadge>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Software we own
          </h2>
        </div>
      </div>

      {/* 2-Column Product Grid */}
      {products.length === 0 ? (
        <div className="relative border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 md:p-16 text-center overflow-hidden group">
          <CornerBrackets className="border-cyan-400/30" />
          
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              R&D Lab & Proprietary Incubations
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              Proprietary SaaS Ecosystem Under Incubation
            </h3>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light italic max-w-xl mb-8">
              Beyond client engineering, we build and run internal commercial software. Specialized SaaS tools, operations software, and AI systems will be introduced here upon official release.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/8801909711808?text=Hi%20Driven%20IT%20Solution,%20I%20am%20interested%20in%20your%20upcoming%20proprietary%20SaaS%20platforms."
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 bg-white/5 hover:bg-logo-gradient hover:text-black text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <span>Inquire for Early Access</span>
                <ArrowUpRight size={15} />
                <CornerBrackets className="border-white/30" />
              </a>

              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-white/40 hover:text-cyan-400 transition-colors"
              >
                <span>Add Products in Admin →</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((prod) => (
          <div key={prod.id} className="group relative flex h-full flex-col border border-white/10 bg-white/[0.015] transition-all hover:border-cyan-400/40">
            {/* Screenshot Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-slate-950">
              <Image
                src={prod.image}
                alt={prod.name}
                fill
                unoptimized
                className="object-cover object-top opacity-80 grayscale transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="absolute right-4 top-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase text-white/90 border border-white/10">
                {prod.tag}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-[-0.03em] text-white font-mono flex items-center">
                    {prod.name}
                    {prod.banglaName && (
                      <span className="ml-3 text-lg font-normal text-white/40">
                        {prod.banglaName}
                      </span>
                    )}
                  </h3>

                  {prod.liveUrl ? (
                    <a
                      href={prod.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${prod.name}`}
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-white/5 text-white transition-colors group-hover:bg-logo-gradient group-hover:text-black cursor-pointer"
                    >
                      <ArrowUpRight size={18} />
                      <CornerBrackets className="border-white/30" />
                    </a>
                  ) : (
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-white/5 text-white transition-colors group-hover:bg-logo-gradient group-hover:text-black">
                      <ArrowUpRight size={18} />
                      <CornerBrackets className="border-white/30" />
                    </div>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/60 font-light italic font-sans">
                  {prod.description}
                </p>
              </div>

              {/* Feature Badges */}
              <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                {prod.features.map((feat, fidx) => (
                  <span
                    key={fidx}
                    className="px-2.5 py-1 text-[11px] font-mono uppercase text-white/75 bg-white/[0.03] border border-white/5"
                  >
                    #{feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
}
