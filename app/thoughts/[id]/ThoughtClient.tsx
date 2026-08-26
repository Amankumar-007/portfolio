"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  Sparkles,
  ThumbsUp,
  ArrowRight,
  Bookmark,
  Github,
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import type { Thought } from "@/data/thoughts";

export default function ThoughtClient({
  thought,
  allThoughts = [],
}: {
  thought: Thought;
  allThoughts?: Thought[];
}) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [bookmarked, setBookmarked] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate Next and Previous thoughts
  const currentIndex = allThoughts.findIndex((t) => t.id === thought.id);
  const prevThought = currentIndex > 0 ? allThoughts[currentIndex - 1] : null;
  const nextThought =
    currentIndex !== -1 && currentIndex < allThoughts.length - 1
      ? allThoughts[currentIndex + 1]
      : null;

  // Filter 2 related thoughts (excluding current)
  const relatedThoughts = allThoughts
    .filter((t) => t.id !== thought.id)
    .slice(0, 2);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://amankumarr.in/thoughts/${thought.id}`;
  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Read "${thought.title}" by @AmanCodex`
  )}&url=${encodeURIComponent(articleUrl)}`;
  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

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
    <div className="relative min-h-screen bg-[#0b0b0e] text-zinc-100 selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-32 sm:pt-36 pb-24">
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F05335] via-orange-400 to-[#F05335] z-50 origin-left"
        style={{ scaleX }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-radial from-[#F05335]/10 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

      <PageTransition>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Navigation (Sits safely below floating navbar) */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-900/80">
            <Link
              href="/thoughts"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#F05335]" />
              <span>Back to Thoughts</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-xl border text-xs transition-all ${
                  bookmarked
                    ? "bg-[#F05335]/15 border-[#F05335]/40 text-[#F05335]"
                    : "bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
                title={bookmarked ? "Bookmarked" : "Bookmark thought"}
              >
                <Bookmark
                  className="w-3.5 h-3.5"
                  fill={bookmarked ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-semibold transition-all"
                title="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <article className="space-y-10">
            {/* Header */}
            <header className="space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {thought.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-[11px] font-semibold text-[#F05335] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {thought.title}
              </h1>

              {/* Author & Meta */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-b border-zinc-900/80 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#F05335]/40 shrink-0">
                    <Image
                      src="/aman.jpg"
                      alt="Aman Kumar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white">Aman Kumar</h2>
                    <p className="text-[11px] text-zinc-400">
                      Full Stack Engineer @ StartupCoaching
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <time dateTime={thought.date}>{thought.displayDate}</time>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{thought.readTime}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Core Insight Callout Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#F05335]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Insight</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-zinc-300 italic leading-relaxed">
                &ldquo;{thought.excerpt}&rdquo;
              </p>
            </div>

            {/* Main Content Body */}
            <div className="space-y-6 text-base sm:text-lg text-zinc-300 leading-[1.8] font-normal">
              {thought.content.map((para, i) => (
                <p key={i} className="text-zinc-300">
                  {para}
                </p>
              ))}
            </div>

            {/* Engagement & Share Footer */}
            <div className="pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                    liked
                      ? "bg-[#F05335] border-[#F05335] text-white"
                      : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <ThumbsUp
                    className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`}
                  />
                  <span>{liked ? "Liked" : "Helpful"}</span>
                  <span className="ml-1 text-[10px] opacity-75 px-1.5 py-0.5 rounded-md bg-black/20">
                    {likeCount}
                  </span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white text-xs font-bold transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-medium mr-1">
                  Share on:
                </span>
                <a
                  href={shareTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                  title="Share on Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={shareLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#F05335]/50 shrink-0">
                <Image
                  src="/aman.jpg"
                  alt="Aman Kumar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Written by Aman Kumar
                  </h3>
                  <p className="text-xs text-[#F05335]">
                    Full Stack Engineer — React, Node.js & Next.js
                  </p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Building scalable web applications, developer tools, and AI products. Currently shipping full-stack features at StartupCoaching.
                </p>
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2.5">
                  <a
                    href="https://github.com/Amankumar-007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 hover:text-white transition-all"
                    title="GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aman-kumar-442845233/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 hover:text-white transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/contact"
                    className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F05335] hover:bg-[#d94226] text-white text-xs font-bold transition-all"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Next / Previous Article Pagination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {prevThought ? (
                <Link
                  href={`/thoughts/${prevThought.id}`}
                  className="group p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/70 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-[#F05335] transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Thought</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white line-clamp-2">
                    {prevThought.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}

              {nextThought ? (
                <Link
                  href={`/thoughts/${nextThought.id}`}
                  className="group p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/70 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between items-end text-right space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-[#F05335] transition-colors">
                    <span>Next Thought</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white line-clamp-2">
                    {nextThought.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* More Thoughts Grid Section */}
            {relatedThoughts.length > 0 && (
              <section className="pt-10 border-t border-zinc-900 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#F05335]" />
                    <h3 className="text-lg font-bold text-white">More Thoughts</h3>
                  </div>
                  <Link
                    href="/thoughts"
                    className="text-xs font-bold uppercase tracking-wider text-[#F05335] hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedThoughts.map((t) => (
                    <Link
                      key={t.id}
                      href={`/thoughts/${t.id}`}
                      className="group p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/70 hover:border-[#F05335]/40 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-[10px] font-bold text-zinc-300">
                            {t.tags[0]}
                          </span>
                          <span className="text-[11px] text-zinc-500">{t.readTime}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#F05335] transition-colors line-clamp-2">
                          {t.title}
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {t.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center text-xs font-bold text-[#F05335] gap-1 group-hover:translate-x-1 transition-transform pt-1">
                        <span>Read article</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </PageTransition>
    </div>
  );
}
