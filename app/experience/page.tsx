import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Work Experience — Aman Kumar | Full Stack Engineer Career",
  description:
    "2+ years professional full stack engineering experience: StartupCoaching (current), Ninepages Techsolutions (1yr 5mo), Learn2Earn training, and self-taught beginnings. Expertise in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and LLM integration.",
  keywords: ["Full Stack Engineer", "Work Experience", "StartupCoaching", "Ninepages", "Career Timeline", "Developer Journey"],
  alternates: {
    canonical: "https://amankumarr.in/experience",
  },
  openGraph: {
    title: "Work Experience — Aman Kumar | Full Stack Engineer Career",
    description:
      "2+ years shipping production applications. Current: StartupCoaching. Previous: Ninepages Techsolutions (1yr 5mo). Trained at Learn2Earn. Self-taught beginnings.",
    url: "https://amankumarr.in/experience",
    type: "website",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Work Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience — Aman Kumar | Full Stack Engineer",
    description:
      "2+ years: StartupCoaching, Ninepages Techsolutions, Learn2Earn. React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS.",
    images: ["/about-image.png"],
  },
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
