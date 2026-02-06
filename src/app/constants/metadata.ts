import type { Metadata, Viewport } from "next";
import { BASE_URL, SEO_KEYWORDS, SITE_INFO } from "./constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL || "https://knjigovodstvo-matka.hr"),
  title: {
    default: SITE_INFO.title,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: SEO_KEYWORDS,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: SITE_INFO.name, url: BASE_URL }],
  creator: SITE_INFO.name,
  publisher: SITE_INFO.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    url: BASE_URL,
    siteName: SITE_INFO.name,
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "hr-HR": BASE_URL,
    },
  },
  category: "business",
};
