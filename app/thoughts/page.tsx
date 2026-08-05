import type { Metadata } from "next";
import ThoughtsPageClient from "./ThoughtsPageClient";

export const metadata: Metadata = {
  title: "Thoughts — Aman Kumar | Notes on Full Stack Engineering",
  description:
    "Real, first-person notes from Aman Kumar's journey as a Full Stack Engineer — building SnippetsX, TomatoAI, and Awasdhara, shipping web applications in production, and lessons from Ninepages Techsolutions and StartupCoaching.",
  alternates: {
    canonical: "https://amankumarr.in/thoughts",
  },
  openGraph: {
    title: "Thoughts — Aman Kumar | Notes on Full Stack Engineering",
    description:
      "First-person notes on full stack engineering, shipping products, and system architecture — from Aman Kumar's day-to-day work and side projects.",
    url: "https://amankumarr.in/thoughts",
    type: "website",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Thoughts",
      },
    ],
  },
  twitter: {
    title: "Thoughts — Aman Kumar | Notes on Full Stack Engineering",
    description:
      "First-person notes on full stack engineering, shipping products, and system architecture.",
    images: ["/about-image.png"],
  },
};

export default function ThoughtsPage() {
  return <ThoughtsPageClient />;
}
