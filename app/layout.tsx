import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_TITLE = "MUSKVERSE — The Empire Timeline";
const SITE_DESCRIPTION =
  "An immersive visual history of Elon Musk — from a $500 game at age 12 through Zip2, PayPal, SpaceX, Tesla, Neuralink, The Boring Company, and xAI, to the world's first trillionaire. 1971 → 2026, one timeline.";

export const metadata: Metadata = {
  metadataBase: new URL("https://muskverse-nine.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Elon Musk",
    "SpaceX",
    "Tesla",
    "Neuralink",
    "xAI",
    "The Boring Company",
    "PayPal",
    "Zip2",
    "timeline",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "MUSKVERSE",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} grain bg-void font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
