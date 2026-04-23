import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { aeonikPro } from "@/lib/fonts";
import { SITE_URL, getSiteUrl } from "@/lib/site";
import { HubSpotProvider } from "@/components/HubSpotProvider";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Blackhorse Mobility | Executive Chauffeur Services & Fleet Management",
  description:
    "Global executive ride and chauffeur mobility platform. Luxury, precision, and privacy for the modern leader. Manage fleets, corporate transportation, and rental services.",
  keywords: [
    "executive chauffeur services",
    "corporate transportation",
    "fleet management",
    "ride sharing",
    "luxury mobility",
    "executive mobility",
    "corporate fleet",
    "chauffeur service",
    "transportation management",
    "fleet owner platform",
  ],
  authors: [{ name: "Blackhorse Mobility" }],
  creator: "Blackhorse Mobility",
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
  openGraph: {
    title:
      "Blackhorse Mobility | Corporate Mobility Services & Fleet Management",
    description:
      "Global corporate mobility platform. Luxury, precision, and privacy for the modern leader. Manage fleets, corporate transportation, and rental services.",
    type: "website",
    url: SITE_URL,
    siteName: "Blackhorse Mobility",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blackhorse Mobility - Corporate Mobility Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blackhorse Mobility | Corporate Mobility Services",
    description:
      "Global corporate mobility platform. Luxury, precision, and privacy for the modern leader.",
    creator: "@BlackhorseMobility",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  applicationName: "Blackhorse Mobility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blackhorse Mobility",
    description:
      "Global corporate mobility platform providing corporate transportation and fleet management solutions.",
    url: SITE_URL,
    logo: getSiteUrl("/assets/Primary/BH_Horizontal_DarkBlue.png"),
    sameAs: [
      "https://www.linkedin.com/company/blackhorse-mobility",
      "https://twitter.com/BlackhorseMobility",
      "https://www.instagram.com/blackhorsemobility",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: "en",
    },
    serviceArea: {
      "@type": "Country",
      name: "Global",
    },
    service: [
      {
        "@type": "Service",
        name: "Corporate Mobility Services",
        description: "Premium corporate transportation and chauffeur services",
      },
      {
        "@type": "Service",
        name: "Corporate Fleet Management",
        description:
          "Comprehensive fleet management platform for corporate clients",
      },
      {
        "@type": "Service",
        name: "Rental Vehicle Network",
        description: "Connection to verified fleet owners and rental partners",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${aeonikPro.variable} bg-obsidian text-white`}
        suppressHydrationWarning
      >
        <HubSpotProvider>
          {children}
          <CookieConsent />
        </HubSpotProvider>
      </body>
    </html>
  );
}
