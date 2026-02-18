"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { ArrowUpRight, Terminal, Github, Globe, Cpu, Layers } from "lucide-react";
import { useLenis } from '@/hooks/useLenis';

const FEATURED_PROJECTS = [
  {
    "id": 1,
    "slug": "tomato-ai",
    "title": "TomatoAI",
    "category": "AI-Powered App",
    "shortDescription": "AI quality analysis for agriculture using image insights.",
    "techStack": ["React", "Node.js", "MongoDB", "Redux"],
    "status": "Completed",
    "year": "2024"
  },
  {
    "id": 4,
    "slug": "lms-platform",
    "title": "LMS Platform",
    "category": "EdTech System",
    "shortDescription": "Multi-role academic platform for exams and certification.",
    "techStack": ["React", "Express", "Node", "MongoDB"],
    "status": "In Progress",
    "year": "2025"
  },
  {
    "id": 2,
    "slug": "twofloww",
    "title": "TwoFloww",
    "category": "Business Web",
    "shortDescription": "Professional digital services brand with lead generation.",
    "techStack": ["React", "Tailwind", "JavaScript"],
    "status": "Completed",
    "year": "2024"
  },
  {
    "id": 3,
    "slug": "restro-web",
    "title": "Restro App",
    "category": "Hospitality",
    "shortDescription": "Full restaurant flow with menu filtering and admin dash.",
    "techStack": ["React", "Redux", "Node", "MongoDB"],
    "status": "Completed",
    "year": "2024"
  }
];

export default function FeaturedGrid() {
  const { isLoading } = useLenis();

  return (
    <div data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] selection:bg-orange-500 overflow-x-hidden">
      
      {/* ROUGH GRAIN OVERLAY */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.22] contrast-150 mix-blend-multiply">
        <filter id="roughNoise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>

      <PageTransition>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          
          {/* HEADER */}
          <header className="mb-24 md:mb-40" data-scroll data-scroll-speed="1">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
              <Terminal size={14} /> <span>Featured_Output.sh</span>
            </div>
            <h1 className="text-[14vw] md:text-[8vw] leading-[0.8] font-black uppercase tracking-tighter">
              Selected <br /> <span className="text-orange-500 italic font-serif lowercase">Projects.</span>
            </h1>
          </header>

          {/* 2x2 PROJECT GRID */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            {FEATURED_PROJECTS.map((project, i) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${i % 2 === 1 ? 'md:mt-32' : ''}`}
                data-scroll
                data-scroll-speed={i % 2 === 1 ? "0.5" : "1.2"}
              >
                {/* Visual Card */}
                <div className="group relative aspect-video bg-white border-2 border-black overflow-hidden shadow-[10px_10px_0px_0px_black] hover:shadow-[20px_20px_0px_0px_rgba(251,146,60,1)] transition-all duration-500 cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center font-black text-7xl opacity-[0.03] uppercase">
                    {project.title}
                  </div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <span className="bg-white border border-black px-2 py-1 text-[9px] font-mono font-black uppercase">{project.year}</span>
                    <span className={`border border-black px-2 py-1 text-[9px] font-mono font-black uppercase ${project.status === 'Completed' ? 'bg-green-400' : 'bg-orange-400'}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Links */}
                  <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                    <button className="p-2 bg-black text-white hover:bg-orange-500 transition-colors"><Github size={16} /></button>
                    <button className="p-2 bg-white border border-black hover:bg-orange-500 hover:text-white transition-all shadow-[3px_3px_0px_0px_black] active:shadow-none active:translate-x-[2px]"><ArrowUpRight size={16} /></button>
                  </div>
                </div>

                {/* Content Info */}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 italic font-serif leading-relaxed max-w-sm">
                    {project.shortDescription}
                  </p>
                  
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] font-mono font-bold border border-black/10 px-2 py-1 bg-white/50 lowercase">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </main>

        
           <footer className="mt-60 border-t-4 border-black pt-20 text-center">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">Want to see <br/> the <span className="text-orange-500">Source?</span></h2>
             <button className="px-12 py-5 bg-orange-500 text-white border-2 border-black font-black uppercase tracking-tighter text-xl shadow-[10px_10px_0px_0px_black] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0px_0px_black] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none">
                Visit GitHub Archive
             </button>
          </footer>
        </div>
      </PageTransition>
    </div>
  );
}


   