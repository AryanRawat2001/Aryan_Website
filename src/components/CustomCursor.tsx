'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { stiffness: 300, damping: 28 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 12) trailRef.current.shift();
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      ) {
        setHovered(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      ) {
        setHovered(false);
      }
    };

    const handleHide = () => setHidden(true);
    const handleShow = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleHide);
    document.addEventListener('mouseenter', handleShow);

    // Trail canvas animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const drawTrail = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const trail = trailRef.current;
        if (trail.length > 2) {
          for (let i = 1; i < trail.length; i++) {
            const alpha = (i / trail.length) * 0.15;
            const size = (i / trail.length) * 2;
            ctx.beginPath();
            ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.fill();
          }
        }
        rafRef.current = requestAnimationFrame(drawTrail);
      };
      drawTrail();

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseover', handleOver);
        document.removeEventListener('mouseout', handleOut);
        document.removeEventListener('mouseleave', handleHide);
        document.removeEventListener('mouseenter', handleShow);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(rafRef.current);
      };
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleHide);
      document.removeEventListener('mouseenter', handleShow);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        aria-hidden="true"
      />
      {/* Dot (follows mouse exactly) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            width: hovered ? 6 : 4,
            height: hovered ? 6 : 4,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white"
        />
      </motion.div>

      {/* Ring (springs behind) */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            width: hovered ? 48 : 32,
            height: hovered ? 48 : 32,
            borderColor: hovered
              ? 'rgba(96, 165, 250, 0.5)'
              : 'rgba(96, 165, 250, 0.2)',
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
  );
}
