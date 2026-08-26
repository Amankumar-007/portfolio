import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllThoughts, getThoughtById } from "@/data/thoughts";
import ThoughtClient from "./ThoughtClient";

export async function generateStaticParams() {
  return getAllThoughts().map((thought) => ({ id: thought.id }));
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const thought = getThoughtById(params.id);

  if (!thought) {
    return {
      title: "Thought Not Found | Aman Kumar",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${thought.title} | Aman Kumar`,
    description: thought.excerpt,
    alternates: {
      canonical: `https://amankumarr.in/thoughts/${thought.id}`,
    },
    openGraph: {
      title: thought.title,
      description: thought.excerpt,
      url: `https://amankumarr.in/thoughts/${thought.id}`,
      type: "article",
      publishedTime: thought.date,
      authors: ["Aman Kumar"],
      tags: thought.tags,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: thought.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: thought.title,
      description: thought.excerpt,
      images: ["/og-image.jpg"],
    },
  };
}

export default function ThoughtDetailPage({ params }: { params: { id: string } }) {
  const thought = getThoughtById(params.id);
  if (!thought) return notFound();

  const allThoughts = getAllThoughts();

  return <ThoughtClient thought={thought} allThoughts={allThoughts} />;
}
