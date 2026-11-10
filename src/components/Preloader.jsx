'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1600; // 1.6s
    const steps = 100;
    const intervalTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 350);
      } else {
        setCount(current);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Driven Logo Shape */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-28 h-28 mb-8 rounded-3xl overflow-hidden p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 shadow-2xl backdrop-blur-xl flex items-center justify-center"
            >
              <Image
                src="/images/logo.jpg"
                alt="Driven IT Solution"
                width={96}
                height={96}
                className="object-contain rounded-2xl"
                priority
              />
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Driven IT Solution
              </h2>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mt-1">
                Your Growth Our Mission
              </p>
            </motion.div>

            {/* Counter Number */}
            <div className="font-mono text-5xl font-extrabold tracking-tighter text-white/90 tabular-nums">
              {count}
              <span className="text-blue-500 text-3xl ml-1">%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-56 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
