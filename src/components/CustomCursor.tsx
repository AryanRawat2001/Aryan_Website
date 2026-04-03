'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const hovered = useRef(false);
  const hidden = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 250, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 22 });

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (
      isTouchDevice ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateStyles = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      dot.style.opacity = hidden.current ? '0' : '1';
      dot.style.transform = `scale(${hovered.current ? 1.5 : 1})`;

      ring.style.opacity = hidden.current ? '0' : '1';
      ring.style.transform = `scale(${hovered.current ? 1.6 : 1})`;
      ring.style.borderColor = hovered.current
        ? 'rgba(96, 165, 250, 0.4)'
        : 'rgba(96, 165, 250, 0.15)';
    };

    const handleOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest(
          'a, button, [role="button"], input, textarea, select'
        )
      ) {
        hovered.current = true;
        updateStyles();
      }
    };

    const handleOut = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest(
          'a, button, [role="button"], input, textarea, select'
        )
      ) {
        hovered.current = false;
        updateStyles();
      }
    };

    const handleLeave = () => {
      hidden.current = true;
      updateStyles();
    };
    const handleEnter = () => {
      hidden.current = false;
      updateStyles();
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        aria-hidden="true"
      >
        <div
          ref={dotRef}
          className="w-1 h-1 rounded-full bg-white transition-transform duration-150"
        />
      </motion.div>

      {/* Ring — springs behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        aria-hidden="true"
      >
        <div
          ref={ringRef}
          className="w-7 h-7 rounded-full border transition-all duration-150"
          style={{ borderColor: 'rgba(96, 165, 250, 0.15)' }}
        />
      </motion.div>
    </>
  );
}
