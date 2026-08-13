import type { Metadata } from "next";
import StickyPortfolioHomepage from "@/components/sections/sticky-portfolio-homepage";

export const metadata: Metadata = {
  title: "Aman Kumar | Full Stack Engineer & AI Developer",
  description:
    "Full Stack Engineer with 2+ years shipping production SaaS and AI products. Expert in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and LLM integration. Creator of SnippetsX (real-time code editor), TomatoAI (AI tools platform), and Awasdhara (real estate platform). Available for hire.",
  keywords: ["Full Stack Engineer", "React Developer", "Next.js Developer", "Node.js", "TypeScript", "AI Engineer", "SaaS Developer", "Web Developer India", "LLM Integration", "Full Stack Development"],
  alternates: {
    canonical: "https://amankumarr.in",
  },
  openGraph: {
    title: "Aman Kumar | Full Stack Engineer & AI Developer",
    description:
      "2+ years building production SaaS and AI-powered applications. React, Next.js, Node.js, TypeScript specialist. Creator of SnippetsX, TomatoAI, Awasdhara. Currently at StartupCoaching.",
    url: "https://amankumarr.in",
    type: "website",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Full Stack Engineer & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kumar | Full Stack Engineer & AI Developer",
    description:
      "2+ years shipping production SaaS. React, Next.js, Node.js, TypeScript, AWS, LLM APIs. Building SnippetsX, TomatoAI, Awasdhara.",
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
