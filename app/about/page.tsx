import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — Aman Kumar | Full Stack Engineer",
  description:
    "Aman Kumar is a Full Stack Engineer with 2+ years of experience in full stack web development, Next.js, and TypeScript — from self-taught beginnings and Learn2Earn training to Ninepages Techsolutions and StartupCoaching.",
  alternates: {
    canonical: "https://amankumarr.in/about",
  },
  openGraph: {
    title: "About — Aman Kumar | Full Stack Engineer",
    description:
      "Aman Kumar's journey from self-taught developer to Full Stack Engineer — Learn2Earn, Ninepages Techsolutions, and StartupCoaching.",
    url: "https://amankumarr.in/about",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Full Stack Engineer",
      },
    ],
  },
  twitter: {
    title: "About — Aman Kumar | Full Stack Engineer",
    description:
      "Aman Kumar's journey from self-taught developer to Full Stack Engineer.",
    images: ["/about-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}