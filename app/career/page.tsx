import type { Metadata } from "next";
import CareerPageClient from "./CareerPageClient";

export const metadata: Metadata = {
  title: "Career Journey — Aman Kumar | Full Stack Engineer Path",
  description:
    "Follow Aman Kumar's career journey from self-taught developer to Full Stack & SaaS Expert. Explore milestones, skills mastered, and the evolving developer mindset.",
  alternates: {
    canonical: "https://amankumarr.in/career",
  },
  openGraph: {
    title: "Career Journey — Aman Kumar | Full Stack Engineer Path",
    description:
      "Follow Aman Kumar's career journey as a Full Stack and SaaS developer. From beginner to expert full-stack developer.",
    url: "https://amankumarr.in/career",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Career Journey",
      },
    ],
  },
  twitter: {
    title: "Career Journey — Aman Kumar | Full Stack Engineer Path",
    description:
      "Follow Aman Kumar's career journey as a Full Stack and SaaS developer.",
    images: ["/about-image.png"],
  },
};

export default function CareerPage() {
  return <CareerPageClient />;
}
