import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects Portfolio — Aman Kumar | SaaS, AI & Full Stack Apps",
  description:
    "Portfolio of 11+ full-stack projects: SnippetsX (real-time code editor), TomatoAI (AI tools platform), Awasdhara (real estate), LMS, e-commerce, and more. Built with React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and LLM APIs.",
  keywords: ["Projects", "Portfolio", "SnippetsX", "TomatoAI", "Awasdhara", "SaaS", "AI Tools", "Full Stack", "React", "Next.js", "Web Development"],
  alternates: {
    canonical: "https://amankumarr.in/projects",
  },
  openGraph: {
    title: "Projects Portfolio — Aman Kumar | SaaS, AI & Full Stack Apps",
    description:
      "11+ production projects: SnippetsX (real-time collaboration), TomatoAI (AI platform), Awasdhara (real estate). React, Next.js, Node.js, TypeScript, MongoDB, AWS.",
    url: "https://amankumarr.in/projects",
    type: "website",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Project Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Portfolio — Aman Kumar",
    description:
      "11+ SaaS & full-stack projects. SnippetsX, TomatoAI, Awasdhara. React, Next.js, Node.js, TypeScript, PostgreSQL, AWS.",
    images: ["/about-image.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}