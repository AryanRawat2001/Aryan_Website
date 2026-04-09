import type { Metadata, Viewport } from 'next';
import { Exo_2, Roboto_Mono, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#050510',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aryanrawat.vercel.app'),
  title: 'Aryan Rawat — Data Scientist',
  description:
    'Personal portfolio of Aryan Rawat, Data Scientist at Bristol Myers Squibb. Specializing in machine learning, generative AI, and clinical data analytics.',
  keywords: [
    'Aryan Rawat',
    'Data Scientist',
    'Machine Learning',
    'Generative AI',
    'Bristol Myers Squibb',
    'Python',
    'Portfolio',
    'Hyderabad',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/avatar.jpeg',
    apple: '/avatar.jpeg',
  },
  openGraph: {
    title: 'Aryan Rawat — Data Scientist',
    description: 'Data Scientist at Bristol Myers Squibb. ML · GenAI · Clinical Analytics.',
    type: 'website',
    url: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${robotoMono.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Aryan Rawat',
              jobTitle: 'Data Scientist',
              url: 'https://aryanrawat.vercel.app',
              worksFor: { '@type': 'Organization', name: 'Bristol Myers Squibb' },
              email: 'aryanrawat2001@gmail.com',
              sameAs: [
                'https://github.com/AryanRawat2001/',
                'https://www.linkedin.com/in/aryan-rawat-58551618b/',
              ],
              knowsAbout: ['Machine Learning', 'Data Science', 'Python', 'Generative AI', 'Clinical Analytics'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hyderabad',
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </head>
      <body className="bg-navy text-slate-200 font-body antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
