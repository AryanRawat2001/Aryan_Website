'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'wave' | 'dots';
}

export default function SectionDivider({ variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className="relative w-full h-24 overflow-hidden bg-navy" aria-hidden="true">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0 40 C360 80, 720 0, 1080 40 S1440 80, 1440 40 V80 H0 Z"
            fill="url(#waveGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="30%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.2)" />
              <stop offset="70%" stopColor="rgba(139,92,246,0.15)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="relative w-full py-8 bg-navy flex items-center justify-center" aria-hidden="true">
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  i === 2
                    ? 'linear-gradient(135deg, #3B82F6, #06B6D4)'
                    : 'rgba(59, 130, 246, 0.3)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: animated gradient line
  return (
    <div className="relative w-full py-6 bg-navy overflow-hidden" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="relative h-px w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Base gradient line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

          {/* Animated shimmer */}
          <motion.div
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
            initial={{ left: '-8rem' }}
            whileInView={{
              left: ['calc(-8rem)', 'calc(100% + 8rem)'],
            }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />

          {/* Center glow dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-cyan"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: [0, 1, 0.6], scale: [0, 1.5, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              boxShadow: '0 0 12px rgba(6,182,212,0.6), 0 0 30px rgba(6,182,212,0.2)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
