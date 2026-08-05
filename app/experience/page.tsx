import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Experience — Aman Kumar | Full Stack Engineer",
  description:
    "2+ years of professional experience as a Full Stack Engineer — StartupCoaching, Ninepages Techsolutions, Learn2Earn training, and a self-taught foundation in open source.",
  alternates: {
    canonical: "https://amankumarr.in/experience",
  },
  openGraph: {
    title: "Experience — Aman Kumar | Full Stack Engineer",
    description:
      "Aman Kumar's full work history: StartupCoaching, Ninepages Techsolutions, Learn2Earn training, and self-taught beginnings — 2+ years of full stack engineering.",
    url: "https://amankumarr.in/experience",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Work Experience",
      },
    ],
  },
  twitter: {
    title: "Experience — Aman Kumar | Full Stack Engineer",
    description:
      "Aman Kumar's full work history: StartupCoaching, Ninepages Techsolutions, Learn2Earn training, and self-taught beginnings.",
    images: ["/about-image.png"],
  },
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
