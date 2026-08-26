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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
};

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}