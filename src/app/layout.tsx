import { manrope } from "../app/fonts";

import "./globals.css";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import PageTransition from "./components/transitions/PageTransition";
import { NavProvider } from "./context/NavContext";
import SmoothScroll from "./components/scroll/SmoothScroll";
import { metadata as siteMetadata, viewport as siteViewport } from "./constants/metadata";
import { BASE_URL, SITE_INFO } from "./constants/constants";

export const metadata = siteMetadata;
export const viewport = siteViewport;

// JSON-LD structured data for local business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: SITE_INFO.name,
  description: SITE_INFO.description,
  url: BASE_URL,
  telephone: SITE_INFO.phone,
  email: SITE_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_INFO.address,
    addressLocality: SITE_INFO.city,
    postalCode: SITE_INFO.zip_code,
    addressCountry: "HR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "45.832336",
    longitude: "15.977287",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
  },
  priceRange: "$$",
  image: `${BASE_URL}/opengraph-image`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const font = manrope;
  return (
    <html lang="hr" className={font.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${font.variable} antialiased`}>
        <SmoothScroll>
          <NavProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </div>
          </NavProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
