'use client';

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 1], [CIRCUMFERENCE, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const shouldShow = v > 0.15;
    setVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-surface/80 backdrop-blur-sm border border-border hover:border-accent-blue/50 flex items-center justify-center text-slate-400 hover:text-accent-blue-bright hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-200 cursor-pointer group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24" cy="24" r="20"
              fill="none" stroke="currentColor"
              className="text-border" strokeWidth="1.5"
            />
            <motion.circle
              cx="24" cy="24" r="20"
              fill="none" stroke="url(#scrollGrad)"
              strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
            <defs>
              <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
