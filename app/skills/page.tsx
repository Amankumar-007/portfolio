import type { Metadata } from "next";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills — Aman Kumar | Tech Stack & Expertise",
  description:
    "Explore Aman Kumar's technical skills: React, Next.js, Node.js, TypeScript, MongoDB, Docker, and more. Searchable skills directory organized by Frontend, Backend, Database, DevOps, and Design.",
  alternates: {
    canonical: "https://amankumarr.in/skills",
  },
  openGraph: {
    title: "Skills — Aman Kumar | Tech Stack & Expertise",
    description:
      "Explore Aman Kumar's technical skills across Frontend, Backend, Database, DevOps, and Design.",
    url: "https://amankumarr.in/skills",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Tech Stack & Skills",
      },
    ],
  },
  twitter: {
    title: "Skills — Aman Kumar | Tech Stack & Expertise",
    description:
      "Explore Aman Kumar's full tech stack: React, Next.js, Node.js, TypeScript, MongoDB, and more.",
    images: ["/about-image.png"],
  },
};

export default function SkillsPage() {
  return <SkillsPageClient />;
}