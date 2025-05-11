import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { MainNav } from "@/components/main-nav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNav />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}