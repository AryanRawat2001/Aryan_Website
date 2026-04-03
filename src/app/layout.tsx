import type { Metadata } from 'next';
import { Exo_2, Roboto_Mono, Inter } from 'next/font/google';
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

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Aryan Rawat — Data Scientist',
    description: 'Data Scientist at Bristol Myers Squibb. ML · GenAI · Clinical Analytics.',
    type: 'website',
  },
  other: {
    'theme-color': '#050510',
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
              worksFor: { '@type': 'Organization', name: 'Bristol Myers Squibb' },
              email: 'aryanrawat2001@gmail.com',
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
      </body>
    </html>
  );
}
