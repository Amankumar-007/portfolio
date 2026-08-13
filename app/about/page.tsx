import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Aman Kumar | Full Stack Engineer & AI Developer",
  description:
    "Learn about Aman Kumar's journey: 2+ years building production SaaS and AI applications. Self-taught to full-time Full Stack Engineer. Expert in React, Next.js, Node.js, TypeScript, AWS, and LLM integration. Education: MCA (AKTU) & BCA (Dr. Bhimrao Ambedkar University).",
  alternates: {
    canonical: "https://amankumarr.in/about",
  },
  openGraph: {
    title: "About Aman Kumar | Full Stack Engineer & AI Developer",
    description:
      "Full Stack Engineer with 2+ years shipping production applications. Self-taught journey through Learn2Earn, Ninepages Techsolutions, and StartupCoaching. Expert in modern web stack and AI integration.",
    url: "https://amankumarr.in/about",
    type: "website",
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
    card: "summary_large_image",
    title: "About Aman Kumar | Full Stack Engineer",
    description:
      "2+ years shipping production SaaS. React, Next.js, Node.js specialist. Self-taught to Full Stack Engineer journey.",
    images: ["/about-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}