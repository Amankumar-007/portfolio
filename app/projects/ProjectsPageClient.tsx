"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FAQ from "@/components/Faq";
import { getAllProjects, Project } from "@/data/projects";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  ChevronRight,
  ChevronLeft,
  Layers,
  Sparkles,
  Code2,
  CheckCircle2,
} from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "AI Tools", "Full Stack", "Web Development", "Real Estate", "Restaurant", "Mobile App", "SaaS"];

export default function ProjectsPageClient() {
  const projects = useMemo(() => getAllProjects() || [], []);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // Featured showcase projects for the top view & dock (ShockMe, SnippetsX, TomatoAI, Awasdhara)
  const dockProjects = useMemo(() => {
    const showcaseIds = ["project-12", "project-9", "project-5", "project-10"];
    const list = projects.filter((p) => showcaseIds.includes(p.id));
    return list.sort((a, b) => showcaseIds.indexOf(a.id) - showcaseIds.indexOf(b.id));
  }, [projects]);

  // Ensure currentIndex stays within bounds of dockProjects
  const activeProject: Project | undefined = useMemo(() => {
    if (dockProjects.length === 0) return undefined;
    return dockProjects[currentIndex % dockProjects.length];
  }, [dockProjects, currentIndex]);

  const handleNext = useCallback(() => {
    if (dockProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % dockProjects.length);
  }, [dockProjects.length]);

  const handlePrev = useCallback(() => {
    if (dockProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + dockProjects.length) % dockProjects.length);
  }, [dockProjects.length]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  // Support left/right arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-28 pb-24">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-[#F05335]/20 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.25em] uppercase text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F05335] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F05335]"></span>
              </span>
              <span className="font-bold text-zinc-300">Featured Showcase</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              Selected <span className="text-[#F05335] italic font-serif lowercase">Projects.</span>
            </h1>
            
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Explore high-performance full-stack web applications, SaaS platforms, and digital solutions crafted with modern web technologies.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-[#F05335] border-[#F05335] text-white shadow-lg shadow-[#F05335]/25 scale-105"
                    : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* MAIN HERO CAROUSEL SHOWCASE (DESKTOP MOCKUP + OVERLAPPING MOBILE)  */}
          {/* ------------------------------------------------------------------- */}
          {activeProject && (
            <div className="relative bg-gradient-to-b from-zinc-950/95 to-black/95 border border-zinc-800/90 rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-8 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
              
              {/* Outer Left Navigation Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white flex items-center justify-center hover:bg-[#F05335] hover:border-[#F05335] transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
                title="Previous Project"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Outer Right Navigation Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white flex items-center justify-center hover:bg-[#F05335] hover:border-[#F05335] transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
                title="Next Project"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Showcase Screen Frame Layout */}
              <div className="relative max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative w-full"
                  >
                    {/* Desktop Browser Window Mockup Container */}
                    <div className="relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-4 border-zinc-800/90 rounded-[20px] sm:rounded-[28px] p-2 sm:p-4 pb-2 sm:pb-3 shadow-2xl">
                      
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between pb-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900/90 px-3 py-1 rounded-full border border-zinc-800 truncate max-w-[220px] sm:max-w-xs font-semibold">
                          {activeProject.link ? activeProject.link.replace(/^https?:\/\//, "") : `amankumarr.in/projects/${activeProject.id}`}
                        </div>
                        <div className="w-8" />
                      </div>

                      {/* Web Viewport Image (High Quality & Crisp Desktop Screenshot) */}
                      <div className="relative w-full aspect-[16/9.5] rounded-[12px] sm:rounded-[18px] overflow-hidden bg-black border border-zinc-800/80">
                        <Image
                          src={activeProject.screenshots[0]?.url || "/og-image.jpg"}
                          alt={activeProject.screenshots[0]?.alt || activeProject.title}
                          fill
                          priority
                          quality={100}
                          unoptimized={false}
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Overlapping Mobile Phone Mockup (Bottom-Right Corner) */}
                    <div className="absolute right-2 sm:right-6 -bottom-6 sm:-bottom-10 w-[130px] xs:w-[160px] sm:w-[220px] md:w-[260px] aspect-[9/18.5] bg-zinc-950 border-[3px] sm:border-4 border-zinc-700/90 rounded-[28px] sm:rounded-[44px] p-1.5 sm:p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-30 block overflow-hidden">
                      
                      {/* Phone Dynamic Island Notch */}
                      <div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-3.5 sm:h-5 bg-black rounded-full z-30 flex items-center justify-between px-2 border border-white/10 shadow-lg">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-800" />
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-indigo-500/30" />
                      </div>

                      {/* Mobile Screenshot Screen (High Quality & Crisp Mobile View) */}
                      <div className="relative w-full h-full rounded-[20px] sm:rounded-[34px] overflow-hidden bg-black border border-zinc-800">
                        <Image
                          src={
                            activeProject.screenshots[1]?.url ||
                            activeProject.screenshots[0]?.url ||
                            "/tab.png"
                          }
                          alt={`${activeProject.title} mobile preview`}
                          fill
                          quality={100}
                          unoptimized={false}
                          sizes="300px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Active Project Details Card Banner (Below Laptop Frame) */}
              {activeProject && (
                <div className="mt-12 sm:mt-16 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#F05335] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F05335]" />
                        {activeProject.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 font-bold">
                        [{activeProject.year}]
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {activeProject.title}
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-2">
                      {activeProject.description}
                    </p>

                    {activeProject.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {activeProject.link && (
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 text-xs font-black uppercase tracking-widest transition-all border border-zinc-700 hover:scale-105 active:scale-95"
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink className="w-4 h-4 text-[#F05335]" />
                      </a>
                    )}
                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F05335] text-white hover:bg-[#d84427] text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-[#F05335]/20 hover:scale-105 active:scale-95"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* PROJECT PREVIEWS DOCK (MACOS STYLE INTERACTIVE RIBBON)              */}
          {/* ------------------------------------------------------------------- */}
          {dockProjects.length > 0 && (
            <div className="relative bg-gradient-to-b from-[#181414] to-[#100d0d] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden">
              
              {/* Dock Header Bar */}
              <div className="flex items-center justify-between pb-5 px-1 border-b border-white/5">
                <div className="flex items-center gap-4">
                  {/* Traffic Light Buttons */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 font-extrabold">
                    Project Previews Dock
                  </span>
                </div>

                {/* Index / Total Counter */}
                <div className="text-xs font-mono font-bold tracking-widest text-zinc-400">
                  <span className="text-[#F05335] font-black">{String(currentIndex + 1).padStart(2, "0")}</span>
                  <span className="mx-1 text-zinc-600">/</span>
                  <span>{String(dockProjects.length).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Horizontal Scrollable Thumbnails Dock */}
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pt-5 pb-2 px-1 scrollbar-none scroll-smooth">
                {dockProjects.map((project, idx) => {
                  const isActive = idx === currentIndex;
                  const itemNumber = String(idx + 1).padStart(2, "0");

                  return (
                    <div
                      key={project.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`group relative w-48 sm:w-56 md:w-64 shrink-0 aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 select-none ${
                        isActive
                          ? "border-2 border-[#F05335] shadow-[0_0_30px_rgba(240,83,53,0.45)] scale-100 opacity-100 z-10"
                          : "border border-white/10 opacity-70 hover:opacity-100 hover:border-white/30 hover:scale-[0.98] scale-95"
                      }`}
                    >
                      {/* High Quality Crisp Image */}
                      <Image
                        src={project.screenshots[0]?.url || "/og-image.jpg"}
                        alt={project.title}
                        fill
                        quality={100}
                        unoptimized={false}
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Subtle Bottom Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Number Tag Badge (Bottom Left) */}
                      <div
                        className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-lg font-mono font-black text-xs transition-all ${
                          isActive
                            ? "bg-[#F05335] text-white shadow-lg"
                            : "bg-black/80 text-zinc-400 group-hover:text-white border border-white/10 backdrop-blur-md"
                        }`}
                      >
                        {itemNumber}
                      </div>

                      {/* Glowing Active LED Dot (Top Right) */}
                      {isActive && (
                        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#F05335] shadow-[0_0_10px_rgba(240,83,53,1)] animate-pulse" />
                      )}

                      {/* Project Title Hover Tooltip Overlay */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-2 py-0.5 rounded text-[10px] text-zinc-300 font-medium truncate max-w-[120px] pointer-events-none border border-white/10">
                        {project.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* ALL PROJECTS GRID LIST                                             */}
          {/* ------------------------------------------------------------------- */}
          <div className="pt-8 space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-mono text-[#F05335] font-bold uppercase tracking-wider block">
                  Archive
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  All <span className="text-[#F05335] italic font-serif lowercase">Projects</span> ({filteredProjects.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    window.scrollTo({ top: 250, behavior: "smooth" });
                  }}
                  className={`group relative rounded-2xl border transition-all duration-300 p-5 cursor-pointer flex flex-col justify-between space-y-4 ${
                    activeProject?.id === project.id
                      ? "bg-zinc-900/90 border-[#F05335] shadow-lg shadow-[#F05335]/10"
                      : "bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                      <Image
                        src={project.screenshots[0]?.url || "/og-image.jpg"}
                        alt={project.title}
                        fill
                        quality={100}
                        unoptimized={false}
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-bold uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#F05335] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs font-bold text-[#F05335]">
                    <span>Select Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* FAQ SECTION                                                         */}
          {/* ------------------------------------------------------------------- */}
          <div className="pt-16 pb-12 max-w-4xl mx-auto">
            <div className="mb-10 text-center space-y-2">
              <span className="text-xs font-mono text-[#F05335] font-bold uppercase tracking-widest block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
                Frequently <span className="text-[#F05335] italic font-serif lowercase">Asked</span>
              </h2>
            </div>
            <FAQ />
          </div>

        </div>
      </div>
    </ErrorBoundary>
  );
}
