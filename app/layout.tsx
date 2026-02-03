import "./globals.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { Suspense } from "react";
import Loading from "./loading";
import { Chat } from "@/components/ui/chat";
import { CursorProvider } from "@/components/Cursor";
import { MainNav } from "@/components/main-nav";
import CardNav from "@/components/CardNav";

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
    default: "Aman Kumar | MERN Stack Developer",
    template: "%s | Aman Kumar",
  },
  description: "MERN Stack Developer specialized in building modern web applications",
  metadataBase: new URL("https://your-website.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-website.com",
    title: "Aman Kumar | MERN Stack Developer",
    description: "MERN Stack Developer specialized in building modern web applications",
    siteName: "Aman Kumar Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
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