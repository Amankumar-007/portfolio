import type { Metadata } from "next";
import StickyPortfolioHomepage from "@/components/sections/sticky-portfolio-homepage";

export const metadata: Metadata = {
  title: "Aman Kumar | Software Engineer & Full Stack Developer",
  description:
    "Welcome to Aman Kumar's portfolio. Software Engineer specializing in SaaS solutions, full stack web apps, React, Next.js, and modern performance-focused designs. Available for hire.",
  alternates: {
    canonical: "https://amankumarr.in",
  },
  openGraph: {
    title: "Aman Kumar | Software Engineer & Full Stack Developer",
    description:
      "Welcome to Aman Kumar's portfolio — Software Engineer specializing in SaaS solutions and modern web applications.",
    url: "https://amankumarr.in",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    title: "Aman Kumar | Software Engineer & Full Stack Developer",
    description:
      "Software Engineer specializing in SaaS solutions, full stack web apps, and modern designs.",
    images: ["/about-image.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0e]">
      <StickyPortfolioHomepage />
    </main>
  );
}