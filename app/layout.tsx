import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { aeonikPro } from "@/lib/fonts";
import { HubSpotProvider } from "@/components/HubSpotProvider";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Blackhorse Mobility | Executive Chauffeur Services",
  description:
    "Global executive ride and chauffeur mobility platform. Luxury, precision, and privacy for the modern leader.",
  openGraph: {
    title: "Blackhorse Mobility | Executive Chauffeur Services",
    description:
      "Global executive ride and chauffeur mobility platform. Luxury, precision, and privacy for the modern leader.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
