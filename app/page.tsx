import type { Metadata } from "next";
import StickyPortfolioHomepage from "@/components/sections/sticky-portfolio-homepage";

export const metadata: Metadata = {
  title: "Aman Kumar | Full Stack Engineer — MERN Stack Developer, India",
  description:
    "Aman Kumar is a Full Stack Engineer from India specializing in the MERN stack, Next.js, and TypeScript. Currently building at StartupCoaching, previously Ninepages Techsolutions. Creator of SnippetsX, TomatoAI, and Awasdhara. Available for hire.",
  alternates: {
    canonical: "https://amankumarr.in",
  },
  openGraph: {
    title: "Aman Kumar | Full Stack Engineer — MERN Stack Developer, India",
    description:
      "Full Stack Engineer specializing in the MERN stack and Next.js — building SnippetsX, TomatoAI, and Awasdhara, and shipping production apps at StartupCoaching.",
    url: "https://amankumarr.in",
    images: [
      {
        url: "/about-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kumar — Full Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    title: "Aman Kumar | Full Stack Engineer — MERN Stack Developer, India",
    description:
      "Full Stack Engineer specializing in the MERN stack and Next.js — building SnippetsX, TomatoAI, and Awasdhara.",
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
