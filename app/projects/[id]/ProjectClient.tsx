"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, ChevronRight, ChevronLeft, Star, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectClientProps {
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    year: string;
    client: string;
    role: string;
    challenge: string;
    solution: string;
    results: string;
    gallery: string[];
    technologies?: string[];
    demoUrl?: string;
    githubUrl?: string;
    metrics?: { label: string; value: string }[];
  };
}

function ProjectClientComponent({ project }: ProjectClientProps) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Default project metrics if not provided
  const metrics = project.metrics || [
    { label: "Stars on Github", value: "120+" },
    { label: "LOC Saved per project", value: "150+" },
    { label: "Performance Score", value: "99/100" }
  ];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans relative overflow-x-hidden pt-28 sm:pt-36 pb-24">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#F05335]/15 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-zinc-400 tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05335]" />
            <span className="text-[#F05335]">{project.category}</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MAIN DEVICE MOCKUP SHOWCASE (LAPTOP + IPHONE DYNAMIC ISLAND)       */}
        {/* ------------------------------------------------------------------- */}
        <div className="relative w-full py-6 pb-8">
          
          {/* Prev / Next Slide Controls (Shifted cleanly to outer sides) */}
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-8 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#F05335] hover:border-[#F05335] transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
            title="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-8 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#F05335] hover:border-[#F05335] transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
            title="Next Image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Laptop Screen Upper Lid Frame */}
          <div className="relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-4 border-zinc-800/90 rounded-t-[20px] sm:rounded-t-[28px] rounded-b-[4px] sm:rounded-b-[6px] p-2 sm:p-4 pb-2 sm:pb-3 shadow-[0_25px_70px_rgba(0,0,0,0.95)] transition-all">
            
            {/* Camera / Header Sensor Dot */}
            <div className="flex justify-center mb-1.5 sm:mb-2">
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-zinc-800 border border-zinc-700/80" />
            </div>

            {/* Display Viewport - Image Shown FULLY on Full Screen */}
            <div className="relative w-full aspect-[16/9.5] rounded-[10px] sm:rounded-[14px] overflow-hidden bg-black border border-zinc-800/80 shadow-inner group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={gallery[activeImageIndex]}
                    alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                    fill
                    priority
                    quality={100}
                    unoptimized={false}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Laptop Aluminum Base & Hinge (Bottom Chin) */}
          <div className="relative mx-auto w-[104%] -ml-[2%] h-4 sm:h-6 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 rounded-b-xl sm:rounded-b-2xl border-t border-zinc-700/80 flex items-start justify-center shadow-2xl">
            <div className="w-16 sm:w-28 h-1 sm:h-1.5 bg-zinc-700/80 rounded-b-md" />
          </div>

          {/* Overlapping Mobile iPhone Mockup with Dynamic Island (Bottom-Right Corner) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute right-1 sm:right-2 -bottom-4 sm:-bottom-8 w-[120px] xs:w-[150px] sm:w-[210px] md:w-[250px] aspect-[9/18.5] bg-zinc-950 border-[3px] sm:border-4 border-zinc-700/80 rounded-[28px] sm:rounded-[42px] p-1.5 sm:p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-30 block overflow-hidden"
          >
            {/* iPhone Dynamic Island */}
            <div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-4 sm:h-6 bg-black rounded-full z-30 flex items-center justify-between px-2 sm:px-2.5 border border-white/10 shadow-lg">
              <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-zinc-900 border border-white/15" />
              <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-indigo-500/30 border border-indigo-400/40" />
            </div>

            {/* iPhone Display Viewport - Image Shown Fully on Full Screen */}
            <div className="relative w-full h-full rounded-[20px] sm:rounded-[32px] overflow-hidden bg-black border border-zinc-800">
              <Image
                src={gallery[activeImageIndex]}
                alt={`${project.title} mobile view`}
                fill
                quality={100}
                unoptimized={false}
                sizes="300px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* PROJECT INFO & ACTION FOOTER SECTION                                */}
        {/* ------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-zinc-900">
          
          {/* LEFT COLUMN: Aesthetic Headline Title & Key Metrics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headline Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tight text-white font-serif leading-none">
                {project.title}
              </h1>
              <p className="text-xs font-semibold text-[#F05335] uppercase tracking-widest mt-2">
                {project.category} • {project.year}
              </p>
            </div>

            {/* Key Metrics / Stats Stacked */}
            <div className="space-y-4 pt-2">
              {metrics.map((metric, idx) => (
                <div key={idx} className="pb-3 border-b border-zinc-900/90">
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-zinc-400 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Chips */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Technologies Used</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Action Buttons & Description */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* CTA Action Buttons (↗ Live & Code) */}
            <div className="flex flex-wrap items-center gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border-2 border-[#F05335] text-white font-bold text-sm hover:bg-[#F05335] shadow-[0_8px_25px_rgba(240,83,53,0.3)] transition-all group"
                >
                  <ExternalLink className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                  <span>Live</span>
                </a>
              )}

              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-sm hover:bg-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <Github className="w-4.5 h-4.5" />
                  <span>Code</span>
                </a>
              )}
            </div>

            {/* Project Overview Paragraph */}
            <div className="space-y-4 text-sm sm:text-base font-normal text-zinc-300 leading-relaxed">
              <p>{project.description}</p>
              <p>{project.solution}</p>
            </div>

            {/* Key Results Card */}
            {project.results && (
              <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                <div className="flex items-center gap-2 text-[#F05335] font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Impact & Key Results</span>
                </div>
                {project.results}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export const ProjectClient = memo(ProjectClientComponent);