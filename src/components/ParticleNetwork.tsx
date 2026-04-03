'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const BASE_PARTICLE_COUNT = 90;
const MAX_DISTANCE = 140;
const MAX_DISTANCE_SQ = MAX_DISTANCE * MAX_DISTANCE;
const MOUSE_RADIUS = 120;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MOUSE_FORCE = 0.8;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    // Pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationId) {
          animationId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles.length = 0;
      const count = window.innerWidth < 768 ? 45 : BASE_PARTICLE_COUNT;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.55 + 0.2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      if (!isVisible.current) {
        animationId = 0;
        return;
      }

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_FORCE;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > 6.25) {
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * 2.5;
          p.vy = (p.vy / speed) * 2.5;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const mouseProximity =
          distSq < MOUSE_RADIUS_SQ * 2.25
            ? 1 - Math.sqrt(distSq) / (MOUSE_RADIUS * 1.5)
            : 0;
        const glowOpacity = p.opacity + mouseProximity * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + mouseProximity * 1.5, 0, Math.PI * 2);
        ctx.fillStyle =
          mouseProximity > 0
            ? `rgba(6, 182, 212, ${glowOpacity})`
            : `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      }

      // Connection lines — use squared distance to skip Math.sqrt
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          // Early exit: if dx alone exceeds MAX_DISTANCE, skip
          if (dx > MAX_DISTANCE || dx < -MAX_DISTANCE) continue;
          const dy = particles[i].y - particles[j].y;
          if (dy > MAX_DISTANCE || dy < -MAX_DISTANCE) continue;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DISTANCE_SQ) {
            const alpha = (1 - Math.sqrt(distSq) / MAX_DISTANCE) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Mouse connection lines
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < MOUSE_RADIUS_SQ) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / MOUSE_RADIUS) * 0.15;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    animationId = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initParticles();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55, willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}
