import type { Metadata } from "next";
import RoadmapPageClient from "./RoadmapPageClient";

export const metadata: Metadata = {
  title: "Roadmap — Aman Kumar | Developer Growth Plan",
  description:
    "Discover Aman Kumar's developer roadmap: upcoming technologies, skills being mastered, and future project directions. React, Rust, Docker, AI/ML, and more.",
  alternates: {
    canonical: "https://amankumarr.in/roadmap",
  },
  openGraph: {
    title: "Roadmap — Aman Kumar | Developer Growth Plan",
    description:
      "Discover Aman Kumar's developer roadmap — upcoming technologies and future project directions.",
    url: "https://amankumarr.in/roadmap",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Developer Roadmap",
      },
    ],
  },
  twitter: {
    title: "Roadmap — Aman Kumar | Developer Growth Plan",
    description:
      "Discover Aman Kumar's developer roadmap — upcoming technologies and future project directions.",
    images: ["/about-image.png"],
  },
};

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}