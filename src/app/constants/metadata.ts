import type { Metadata } from 'next';
import { BASE_URL, SEO_KEYWORDS, SITE_INFO } from './constants';

export const metadata: Metadata = {
  title: SITE_INFO.title,
  description: SITE_INFO.description,
  keywords: SEO_KEYWORDS,
  robots: 'index, follow',
  authors: [{ name: SITE_INFO.name, url: BASE_URL }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: BASE_URL,
    siteName: SITE_INFO.name,
    images: [
      {
        url: '/og-image.jpg', // Place this in /public
        width: 1200,
        height: 630,
      },
    ],
    locale: 'hr',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    images: ['/og-image.jpg'],
  },
};
