import type { Metadata, Viewport } from 'next';
import { Sora, IBM_Plex_Sans, Lobster } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import BackToTop from '@/components/BackToTop';
import NavigationProgressBar from '@/components/NavigationProgressBar';
import Preloader from '@/components/Preloader';
import { company } from '@/data/company';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from '@/data/schema';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b1c3d',
};

export const metadata: Metadata = {
  title: {
    default: `${company.name} | Proactive Managed IT & Custom Software`,
    template: `%s | ${company.name}`,
  },
  description: `${company.tagline} Registered office: ${company.address.town}, ${company.address.region}. Telephone: ${company.phone}`,
  metadataBase: new URL('https://experttech.co.uk'),
  alternates: {
    canonical: 'https://experttech.co.uk',
  },
  keywords: [
    'Managed IT Services',
    'Cloud Solutions',
    'Custom Software Development',
    'IT Support UK',
    'Scotland IT Services',
    'Cowdenbeath IT',
    'Fife IT Support',
    'Cybersecurity UK',
    'Edinburgh IT Services',
    '24/7 IT Helpdesk',
  ],
  authors: [{ name: company.name, url: 'https://experttech.co.uk' }],
  creator: company.name,
  publisher: company.name,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/images/logo-mark.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: `${company.name} | Proactive Managed IT & Custom Software`,
    description: company.tagline,
    url: 'https://experttech.co.uk',
    siteName: company.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} | Proactive Managed IT & Custom Software`,
    description: company.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'GB-FIF',
    'geo.placename': 'Cowdenbeath, Scotland',
    'geo.position': '56.1098;-3.3512',
    'ICBM': '56.1098, -3.3512',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${sora.variable} ${ibmPlexSans.variable} ${lobster.variable} scroll-smooth`}
    >
      <head>
        <meta charSet="utf-8" />
        <SchemaMarkup schema={generateOrganizationSchema()} />
        <SchemaMarkup schema={generateLocalBusinessSchema()} />
        <SchemaMarkup schema={generateWebSiteSchema()} />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-brand-navy antialiased">
        <Preloader />
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <FloatingCta />
      </body>
    </html>
  );
}
