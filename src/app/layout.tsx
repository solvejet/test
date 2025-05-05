// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import NonceProvider from '@/components/NonceProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://solvejet.net'),
  title: {
    template: '%s | SolveJet',
    default: 'SolveJet - Engineering Tomorrow | Custom Software Development',
  },
  description:
    'SolveJet is a Custom Software Development Company, Google Partner, and ISO 27001:2022 Certified with 4.9 ratings on Clutch and GoodFirms. Serving 100+ global clients from USA and India.',
  manifest: '/manifest.json',
  applicationName: 'Solvejet',
  authors: [{ name: 'Solvejet Team', url: 'https://solvejet.net/team' }],
  creator: 'Solvejet',
  publisher: 'Solvejet',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  keywords: [
    'SolveJet',
    'Custom Software Development',
    'Google Partner',
    'ISO 27001 Certified',
    'Software Engineering',
    'Enterprise Solutions',
    'Digital Transformation',
    'Web Development',
    'Mobile App Development',
    'Cloud Solutions',
    'Software Consulting',
    'USA',
    'India',
  ],
  category: 'Technology',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solvejet.net',
    title: 'SolveJet - Engineering Tomorrow | Custom Software Development',
    description:
      'Custom Software Development Company | Google Partner | ISO 27001:2022 Certified | 4.9 Ratings on Clutch and GoodFirms | 100+ Global Clients',
    siteName: 'SolveJet',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Engineering Tomorrow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Engineering Tomorrow | Custom Software Development',
    description:
      'Custom Software Development Company | Google Partner | ISO 27001:2022 Certified | 100+ Global Clients from USA and India',
    creator: '@solvejet',
    images: ['/images/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://solvejet.net',
    languages: {
      'en-US': 'https://solvejet.net',
    },
  },
  verification: {
    // Add verification tokens when you have them
    google: 'google-site-verification-token',
    // bing: 'msvalidate.01=token',
    // yandex: 'yandex-verification-token',
  },
  archives: ['https://solvejet.net/blog'],
  assets: ['https://solvejet.net/assets'],
  bookmarks: ['https://solvejet.net/homepage'],
  other: {
    'msapplication-TileColor': '#3B82F6',
    'mobile-web-app-capable': 'yes',
    'mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-title': 'Solvejet',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the nonce from the response headers
  const headersList = headers();
  const nonce = (await headersList).get('x-csp-nonce') || '';

  return (
    <html lang="en">
      <head>
        {/* Add the nonce meta tag for client scripts to access */}
        <meta name="csp-nonce" content={nonce} />
      </head>
      <body className={inter.className}>
        <NonceProvider nonce={nonce}>
          <div className="min-h-screen flex flex-col bg-light-background dark:bg-dark-background">
            {/* Header component */}
            <Header />

            {/* Main content */}
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>

            {/* Footer component */}
            <Footer />
          </div>
        </NonceProvider>
      </body>
    </html>
  );
}