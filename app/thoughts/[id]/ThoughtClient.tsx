"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import type { Thought } from "@/data/thoughts";

export default function ThoughtClient({ thought }: { thought: Thought }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://amankumarr.in/thoughts/${thought.id}#article`,
    headline: thought.title,
    description: thought.excerpt,
    datePublished: thought.date,
    dateModified: thought.date,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      "@id": "https://amankumarr.in/#person",
      name: "Aman Kumar",
      url: "https://amankumarr.in",
    },
    publisher: {
      "@type": "Person",
      name: "Aman Kumar",
    },
    keywords: thought.tags.join(", "),
    articleBody: thought.content.join("\n\n"),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://amankumarr.in/thoughts/${thought.id}`,
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#F05335]/15 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

      <PageTransition>
        <article className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Thoughts</span>
          </Link>

          <header className="space-y-5">
            <div className="flex flex-wrap gap-1.5">
              {thought.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-[#F05335] uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
              {thought.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
              <span>By Aman Kumar</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <time dateTime={thought.date}>{thought.displayDate}</time>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span>{thought.readTime}</span>
            </div>
          </header>

          <div className="space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal border-t border-zinc-900 pt-10">
            {thought.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-10 border-t border-zinc-900 flex items-center justify-between">
            <Link
              href="/thoughts"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F05335] hover:border-[#F05335] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Thoughts</span>
            </Link>
          </div>
        </article>
      </PageTransition>
    </div>
  );
}
