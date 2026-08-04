import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — Aman Kumar | Full Stack Developer & SaaS Expert",
  description:
    "Learn about Aman Kumar, an expert Full Stack Developer specializing in high-performance web apps and SaaS solutions. Skilled in React, Next.js, Node.js, TypeScript, and MongoDB.",
  alternates: {
    canonical: "https://amankumarr.in/about",
  },
  openGraph: {
    title: "About — Aman Kumar | Full Stack Developer & SaaS Expert",
    description:
      "Learn about Aman Kumar, expert Full Stack developer specializing in modern web applications and SaaS solutions.",
    url: "https://amankumarr.in/about",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Full Stack Developer",
      },
    ],
  },
  twitter: {
    title: "About — Aman Kumar | Full Stack Developer & SaaS Expert",
    description:
      "Learn about Aman Kumar, expert Full Stack developer specializing in modern web applications and SaaS solutions.",
    images: ["/about-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}