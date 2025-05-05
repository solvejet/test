// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import NonceProvider from '@/components/NonceProvider';
import Header from '@/components/layout/Header';

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
          <div className="min-h-screen bg-solvejet-light-white dark:bg-solvejet-dark-grey">

            {/* Using our new Header component */}
            <Header />


            <main className="container mx-auto px-4 py-8">
              {children}
            </main>

            <footer className="border-t border-solvejet-light-off-white dark:border-solvejet-secondary-dark bg-white dark:bg-solvejet-dark-grey mt-16">
              <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-solvejet-light-dark-grey dark:text-solvejet-light-grey mb-4">
                      Contact
                    </h3>
                    <ul className="space-y-2 text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                      <li>info@solvejet.net</li>
                      <li>+1 (555) 123-4567</li>
                      <li>123 Tech Park Avenue,</li>
                      <li>San Francisco, CA 94103</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-solvejet-light-off-white dark:border-solvejet-secondary-dark mt-8 pt-6 text-center text-solvejet-light-medium-dark dark:text-solvejet-medium-grey">
                  © {new Date().getFullYear()} SolveJet. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </NonceProvider>
      </body>
    </html>
  );
}