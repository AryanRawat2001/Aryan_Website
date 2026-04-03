import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#050510',
        surface: {
          DEFAULT: '#0d0d1a',
          2: '#14142a',
          3: '#1a1a35',
        },
        accent: {
          blue: '#3B82F6',
          'blue-bright': '#60A5FA',
          cyan: '#06B6D4',
          'cyan-bright': '#22D3EE',
          purple: '#8B5CF6',
        },
        border: {
          DEFAULT: '#1e1e3a',
          glow: 'rgba(59,130,246,0.25)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
