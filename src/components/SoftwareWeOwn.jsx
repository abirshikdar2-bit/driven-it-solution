'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import CornerBrackets, { SectionBadge } from './CornerBrackets';
import initialProducts from '@/data/products.json';
import { subscribeToDataChanges, getLocalCache, saveLocalCache } from '@/lib/syncEvents';

export default function SoftwareWeOwn({ products: propProducts = null }) {
  const [products, setProducts] = useState(() => {
    if (Array.isArray(propProducts) && propProducts.length > 0) return propProducts;
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
    <section id="products" className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 relative py-28">
      {/* Header */}
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionBadge>Products</SectionBadge>

          <h2 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Software we own
          </h2>
        </div>

        <p className="max-w-[22rem] text-sm sm:text-base leading-relaxed text-white/60 font-light italic font-sans">
          Beyond client work, we engineer, build, and run our own proprietary SaaS platforms — the same high-level engineering, with our name on the invoice.
        </p>
      </div>

      {/* 2-Column Product Grid */}
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
    </section>
  );
}
