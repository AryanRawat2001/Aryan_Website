'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  layer: number;
  pulsePhase: number;
  label?: string;
}

interface Connection {
  from: number;
  to: number;
  weight: number;
  active: boolean;
  flowOffset: number;
}

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Create neural network nodes in layers
    const layers = [3, 5, 7, 5, 3];
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    const labels = [
      ['Data', 'Features', 'Signal'],
      ['Clean', 'Transform', 'Encode', 'Scale', 'Validate'],
      ['Conv', 'Dense', 'Attn', 'Pool', 'ReLU', 'Norm', 'Drop'],
      ['Merge', 'Reduce', 'Decode', 'Score', 'Rank'],
      ['Predict', 'Insight', 'Action'],
    ];

    const setupNodesAndConnections = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const layerSpacing = w / (layers.length + 1);

      if (nodes.length === 0) {
        // Initial creation
        layers.forEach((count, layerIdx) => {
          const nodeSpacing = h / (count + 1);
          for (let i = 0; i < count; i++) {
            const x = layerSpacing * (layerIdx + 1);
            const y = nodeSpacing * (i + 1);
            nodes.push({
              x: w / 2,
              y: h / 2,
              targetX: x,
              targetY: y,
              radius: layerIdx === Math.floor(layers.length / 2) ? 6 : 4,
              layer: layerIdx,
              pulsePhase: Math.random() * Math.PI * 2,
              label: labels[layerIdx]?.[i],
            });
          }
        });

        // Create connections between adjacent layers
        let nodeOffset = 0;
        for (let l = 0; l < layers.length - 1; l++) {
          const nextOffset = nodeOffset + layers[l];
          for (let i = 0; i < layers[l]; i++) {
            for (let j = 0; j < layers[l + 1]; j++) {
              if (Math.random() > 0.6) continue;
              connections.push({
                from: nodeOffset + i,
                to: nextOffset + j,
                weight: Math.random() * 0.6 + 0.2,
                active: false,
                flowOffset: Math.random() * 100,
              });
            }
          }
          nodeOffset = nextOffset;
        }
      } else {
        // Recalculate target positions on resize
        let idx = 0;
        layers.forEach((count, layerIdx) => {
          const nodeSpacing = h / (count + 1);
          for (let i = 0; i < count; i++) {
            nodes[idx].targetX = layerSpacing * (layerIdx + 1);
            nodes[idx].targetY = nodeSpacing * (i + 1);
            idx++;
          }
        });
      }
    };

    setupNodesAndConnections();

    const draw = () => {
      time += 0.016;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Animate nodes toward target positions
      const progress = Math.min(time / 2, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      for (const node of nodes) {
        node.x = w / 2 + (node.targetX - w / 2) * ease;
        node.y = h / 2 + (node.targetY - h / 2) * ease;
      }

      // Draw connections with flowing data pulses
      for (const conn of connections) {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        if (!from || !to) continue;

        const alpha = conn.weight * 0.25 * ease;

        // Base connection line
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha * 1.2})`);
        gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Flowing data pulse
        if (progress > 0.5) {
          const pulseT =
            ((time * 0.5 + conn.flowOffset) % 1);
          const px = from.x + (to.x - from.x) * pulseT;
          const py = from.y + (to.y - from.y) * pulseT;

          const pulseAlpha = Math.sin(pulseT * Math.PI) * 0.8;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${pulseAlpha})`;
          ctx.fill();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const r = node.radius * pulse * ease;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r * 4
        );

        const layerColors = [
          [59, 130, 246],  // blue
          [59, 130, 246],  // blue
          [6, 182, 212],   // cyan
          [139, 92, 246],  // purple
          [139, 92, 246],  // purple
        ];

        const color = layerColors[node.layer] || layerColors[0];
        glowGradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.3 * ease})`
        );
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.9 * ease})`;
        ctx.fill();

        // Node label
        if (node.label && progress > 0.7 && node.radius > 4) {
          ctx.font = '9px monospace';
          ctx.fillStyle = `rgba(148, 163, 184, ${(progress - 0.7) * 3.3})`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + r + 14);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resize();
      setupNodesAndConnections();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 bg-navy overflow-hidden"
      aria-hidden="true"
    >
      {/* Top & bottom gradient fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
            // data_pipeline.visualize()
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl border border-border/50 overflow-hidden bg-surface/20"
          style={{ height: '320px' }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ opacity: 0.85, willChange: 'transform' }}
          />

          {/* Overlay labels */}
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-8 sm:px-16 z-10">
            {['Input', 'Processing', 'Intelligence', 'Synthesis', 'Output'].map(
              (label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
                  className="text-[10px] font-mono text-slate-500 hidden sm:block"
                >
                  {label}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
