"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { getAllThoughts } from "@/data/thoughts";

export default function ThoughtsPageClient() {
  const thoughts = getAllThoughts();

  return (
    <div className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-28 pb-24">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#F05335]/15 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

      <PageTransition>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* HEADER */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.25em] uppercase text-zinc-400">
              <BookOpen className="w-3.5 h-3.5 text-[#F05335]" />
              <span className="font-bold text-zinc-300">Design Thoughts</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Field <span className="text-[#F05335] italic font-serif lowercase">Notes.</span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Unfiltered notes from building SnippetsX, TomatoAI, and Awasdhara, and from working
              full-time as a Full Stack Engineer — what actually changed, what broke, and what I&apos;d
              do differently.
            </p>
          </div>

          {/* THOUGHTS LIST */}
          <div className="divide-y divide-zinc-900">
            {thoughts.map((thought) => (
              <Link
                key={thought.id}
                href={`/thoughts/${thought.id}`}
                className="group block py-8 first:pt-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-[#F05335] transition-colors max-w-2xl">
                    {thought.title}
                  </h2>
                  <ArrowUpRight className="w-6 h-6 text-[#F05335] flex-shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mt-3 max-w-2xl">
                  {thought.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-xs font-semibold text-zinc-500">
                  <time dateTime={thought.date}>{thought.displayDate}</time>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span>{thought.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <div className="flex flex-wrap gap-1.5">
                    {thought.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
