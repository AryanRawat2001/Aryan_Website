'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Makes every Framer Motion animation on the page honor the OS-level
 * `prefers-reduced-motion` setting (transform/layout animations are skipped,
 * opacity still animates). The global CSS rule only covers CSS animations —
 * Framer Motion drives values with rAF, so it needs this config.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
