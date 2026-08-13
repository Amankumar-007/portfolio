import type { Metadata } from "next";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills & Tech Stack — Aman Kumar | Full Stack Developer",
  description:
    "Complete tech stack: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Redis, Docker, AWS, Tailwind CSS, GraphQL, WebSockets, JWT, Stripe, LLM APIs (OpenAI, Claude), and more. Full Stack Engineer with expertise in modern web development and AI integration.",
  keywords: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "AWS", "Full Stack", "Web Development", "LLM", "GraphQL", "WebSockets"],
  alternates: {
    canonical: "https://amankumarr.in/skills",
  },
  openGraph: {
    title: "Skills & Tech Stack — Aman Kumar | Full Stack Developer",
    description:
      "React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, Docker, LLM APIs — complete tech stack of a Full Stack Engineer.",
    url: "https://amankumarr.in/skills",
    type: "website",
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
    card: "summary_large_image",
    title: "Skills & Tech Stack — Aman Kumar",
    description:
      "Full Stack: React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Docker, AWS, LLM APIs.",
    images: ["/about-image.png"],
  },
};

export default function SkillsPage() {
  return <SkillsPageClient />;
}