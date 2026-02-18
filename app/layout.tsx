import "./globals.css";
import "./performance.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { Suspense } from "react";
import Loading from "./loading";
import { Chat } from "@/components/ui/chat";
import { CursorProvider } from "@/components/Cursor";
import { MainNav } from "@/components/main-nav";
import CardNav from "@/components/CardNav";
import { StructuredData } from "@/components/structured-data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const items = [
  {
    label: "About",
    bgImage: "/about.PNG",
    textColor: "#fff",
    links: [
      { label: "Journey", ariaLabel: "About Journey" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects",
    bgImage: "/cover@2x.jpg",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    bgImage: "/cont.jpg",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us", href: "mailto:amanr3388@gmail.com" },
      { label: "GitHub", ariaLabel: "GitHub Profile", href: "https://github.com/Amankumar-007" },
      { label: "LinkedIn", ariaLabel: "LinkedIn Profile", href: "https://www.linkedin.com/in/amankumarweb/" }
    ]
  }
];
export const metadata: Metadata = {
  title: {
    default: "Aman Kumar | Best Full Stack Developer & SaaS Solutions Expert",
    template: "%s | Aman Kumar - Full Stack Developer",
  },
  description: "Aman Kumar - Expert Full Stack Developer specializing in high-performance web applications and SaaS solutions. Best portfolio showcasing React, Node.js, Next.js, and modern tech stacks. Hire top freelance developer for scalable software.",
  keywords: [
    "Aman Kumar",
    "Full Stack Developer",
    "SaaS Solutions",
    "SaaS Developer",
    "best portfolio",
    "modern portfolio",
    "React developer",
    "Node.js developer",
    "full stack developer",
    "MongoDB expert",
    "Next.js developer",
    "TypeScript developer",
    "web developer",
    "freelance developer",
    "portfolio website",
    "best web portfolio",
    "modern web design",
    "full stack development",
    "React.js",
    "Express.js",
    "JavaScript developer",
    "Software as a Service",
    "Custom SaaS development"
  ],
  authors: [{ name: "Aman Kumar", url: "https://github.com/Amankumar-007" }],
  creator: "Aman Kumar",
  publisher: "Aman Kumar",
  metadataBase: new URL("https://amankumarr.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amankumarr.in",
    title: "Aman Kumar | Best Full Stack Developer & Modern Portfolio",
    description: "Expert Full Stack Developer creating modern, high-performance web applications and SaaS solutions. Best portfolio showcasing React, Node.js, Next.js projects.",
    siteName: "Aman Kumar Portfolio - Best Modern Portfolio",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kumar | Best Full Stack Developer & Modern Portfolio",
    description: "Expert Full Stack Developer creating modern, high-performance web applications and SaaS solutions. Best portfolio showcasing React, Node.js, Next.js projects.",
    images: ["/about-image.png"],
    creator: "@amankumarweb",
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
  verification: {
    google: "your-google-verification-code",
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="application-name" content="Aman Kumar Portfolio" />
        <meta name="apple-mobile-web-app-title" content="Aman Kumar" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ELW5X4DQ5Q"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ELW5X4DQ5Q');
        `}
      </Script>
      <body className={playfair.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <CursorProvider>
            <CardNav
              items={items}
              baseColor="#fff"
              menuColor="#000"
              buttonBgColor="#111"
              buttonTextColor="#fff"
              ease="power3.out"
            />          <Suspense fallback={<Loading />}>
              <PageTransition>{children}</PageTransition>
            </Suspense>
            <Chat />

          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}