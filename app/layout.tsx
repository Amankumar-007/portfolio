import "./globals.css";
import "./performance.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { Suspense } from "react";
import Loading from "./loading";
import { Chat } from "@/components/ui/chat";
import { CursorProvider } from "@/components/Cursor";
import ModernNavbar from "@/components/ModernNavbar";
import { StructuredData } from "@/components/structured-data";

// Load only 3 essential weights (was 7) — saves ~120KB of font payload
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "600", "800"],
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Aman Kumar | Full Stack Engineer — MERN Stack Developer, India",
    template: "%s | Aman Kumar",
  },
  description:
    "Aman Kumar — Full Stack Engineer with 2+ years of experience on the MERN stack, Next.js, and TypeScript. Currently at StartupCoaching, previously Ninepages Techsolutions. Creator of SnippetsX, TomatoAI, and Awasdhara. Available for freelance & collaboration.",
  keywords: [
    "Aman Kumar",
    "Full Stack Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "SaaS Developer",
    "React developer",
    "Node.js developer",
    "Next.js developer",
    "TypeScript developer",
    "web developer India",
    "freelance developer",
    "full stack development",
    "MongoDB expert",
    "JavaScript developer",
    "Software as a Service",
    "Custom SaaS development",
    "SnippetsX",
    "TomatoAI",
    "Awasdhara",
    "portfolio website",
    "hire developer India",
  ],
  authors: [{ name: "Aman Kumar", url: "https://github.com/Amankumar-007" }],
  creator: "Aman Kumar",
  publisher: "Aman Kumar",
  metadataBase: new URL("https://amankumarr.in"),
  alternates: {
    canonical: "https://amankumarr.in",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/favicon-32x32.png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amankumarr.in",
    title: "Aman Kumar | Full Stack Engineer — MERN Stack Developer, India",
    description:
      "Full Stack Engineer building on the MERN stack and Next.js — creator of SnippetsX, TomatoAI, and Awasdhara, currently shipping at StartupCoaching.",
    siteName: "Aman Kumar — Portfolio",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Full Stack Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kumar | Full Stack Engineer — MERN Stack Developer, India",
    description:
      "Full Stack Engineer building on the MERN stack and Next.js — creator of SnippetsX, TomatoAI, and Awasdhara.",
    images: [{ url: "/about-image.png", alt: "Aman Kumar Portfolio" }],
    creator: "@amankumarweb",
    site: "@amankumarweb",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="application-name" content="Aman Kumar Portfolio" />
        <meta name="apple-mobile-web-app-title" content="Aman Kumar" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no, email=no" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        {/* Preconnect for critical third parties */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for social/external links */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />

        {/* Preload the LCP image — critical for Largest Contentful Paint score */}
        <link
          rel="preload"
          as="image"
          href="/about-image.png"
          type="image/png"
          fetchPriority="high"
        />
      </head>

      {/* Google Analytics — afterInteractive so it never blocks rendering */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ELW5X4DQ5Q"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ELW5X4DQ5Q', { page_path: window.location.pathname });
        `}
      </Script>

      <body className={`${poppins.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CursorProvider>
            <ModernNavbar />
            <Suspense fallback={<Loading />}>
              <PageTransition>{children}</PageTransition>
            </Suspense>
            <Chat />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}