import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

export const metadata: Metadata = {
  title: "Case Studies — Aman Kumar | Full Stack Engineer Work History",
  description:
    "Explore Aman Kumar's case studies and work history — full-stack architectures, AI/ML projects, SaaS platforms, and high-performance web interfaces built with React, Next.js, Node.js, and MongoDB.",
  alternates: {
    canonical: "https://amankumarr.in/case-study",
  },
  openGraph: {
    title: "Case Studies — Aman Kumar | Full Stack Engineer Work History",
    description:
      "A collection of Aman Kumar's full-stack case studies: e-commerce, AI/ML, SaaS, and web3 projects.",
    url: "https://amankumarr.in/case-study",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Case Studies & Work History",
      },
    ],
  },
  twitter: {
    title: "Case Studies — Aman Kumar | Full Stack Engineer Work History",
    description:
      "Explore Aman Kumar's full-stack case studies: e-commerce, AI, SaaS, and high-performance interfaces.",
    images: ["/about-image.png"],
  },
};

export default function CaseStudyPage() {
  return <CaseStudyClient />;
}