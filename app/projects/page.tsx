import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects — Aman Kumar | Full Stack & SaaS Portfolio",
  description:
    "Explore Aman Kumar's portfolio of projects: e-commerce platforms, real estate apps, LMS systems, AI tools, SaaS solutions, and more. Built with React, Next.js, Node.js, and MongoDB.",
  alternates: {
    canonical: "https://amankumarr.in/projects",
  },
  openGraph: {
    title: "Projects — Aman Kumar | Full Stack & SaaS Portfolio",
    description:
      "Explore Aman Kumar's portfolio of full-stack projects including e-commerce, real estate, LMS, and AI tools.",
    url: "https://amankumarr.in/projects",
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
    title: "Projects — Aman Kumar | Full Stack & SaaS Portfolio",
    description:
      "Explore Aman Kumar's portfolio of full-stack projects including e-commerce, real estate, LMS, and AI tools.",
    images: ["/about-image.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}