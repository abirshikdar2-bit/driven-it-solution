'use client';

import { useEffect, useRef } from 'react';

export default function FlowFieldCanvas({
  className = '',
  color = '#22d3ee',
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 0.5,
  particleSize = 1.6
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = 200 * Math.random() + 100;
      }

      update() {
        // Pure, permanent mathematical flow - completely unaffected by cursor movement
        const angle = (Math.cos(0.005 * this.x) + Math.sin(0.005 * this.y)) * Math.PI;
        this.vx += 0.2 * Math.cos(angle) * speed;
        this.vy += 0.2 * Math.sin(angle) * speed;

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.age++;

        if (this.age > this.life) {
          this.reset();
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = 200 * Math.random() + 100;
      }

      draw(context) {
        context.fillStyle = color;
        context.globalAlpha = Math.max(0, 1 - 2 * Math.abs(this.age / this.life - 0.5));
        context.fillRect(this.x, this.y, particleSize, particleSize);
      }
    }

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Fill canvas background with solid #050505 initially so it is never transparent
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let isRunning = false;

    const render = () => {
      ctx.fillStyle = `rgba(5, 5, 5, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
    };

    const loop = () => {
      render();
      animId = requestAnimationFrame(loop);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    init();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer = null;

    if (prefersReducedMotion) {
      render();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!isRunning) {
                isRunning = true;
                loop();
              }
            } else {
              stop();
            }
          });
        },
        { threshold: 0 }
      );
      observer.observe(container);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      stop();
    };
  }, [color, trailOpacity, particleCount, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none bg-[#050505] ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
