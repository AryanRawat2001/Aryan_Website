import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Aryan Rawat — Data Scientist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050510 0%, #0d0d1a 40%, #14142a 70%, #050510 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            right: -60,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              border: '3px solid rgba(59,130,246,0.5)',
              overflow: 'hidden',
              display: 'flex',
              boxShadow: '0 0 40px rgba(59,130,246,0.3)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://aryanrawat.vercel.app/avatar.jpeg"
              alt="Aryan Rawat"
              width={120}
              height={120}
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3B82F6, #06B6D4, #8B5CF6)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Aryan Rawat
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              fontWeight: 500,
            }}
          >
            Data Scientist at Bristol Myers Squibb
          </div>

          {/* Skills bar */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 12,
            }}
          >
            {['Machine Learning', 'GenAI', 'Clinical Analytics', 'Python'].map(
              (skill) => (
                <div
                  key={skill}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 12,
                    border: '1px solid rgba(59,130,246,0.3)',
                    background: 'rgba(59,130,246,0.1)',
                    color: '#60a5fa',
                    fontSize: 18,
                  }}
                >
                  {skill}
                </div>
              )
            )}
          </div>
        </div>

        {/* URL footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 18,
            color: '#475569',
            fontFamily: 'monospace',
          }}
        >
          aryanrawat.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
