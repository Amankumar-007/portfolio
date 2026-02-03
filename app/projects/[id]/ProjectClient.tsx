"use client";

import { memo, useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, X, Calendar, User, Briefcase, Terminal, Target, Rocket } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  };
}

function ProjectClientComponent({ project }: ProjectClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Always call hooks at the top level
  const scrollY = useScroll();
  const y1 = useTransform(scrollY.scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY.scrollY, [0, 400], [1, 0]);
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
    
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Remove any scroll locks that might be applied
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.position = '';
    
    // Ensure scrolling is enabled
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    
    // Add scroll event listener to ensure scroll works
    const enableScroll = () => {
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
    };
    
    enableScroll();
    
    // Double-check after a short delay
    const timeoutId = setTimeout(enableScroll, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fffcf9] dark:bg-neutral-950 relative isolate selection:bg-orange-200">
      
      {/* 1. CINEMATIC HERO SECTION - FIXED FOR WHITE BACKGROUNDS */}
      <section className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden border-b-2 border-black">
        {isMounted ? (
          <motion.div style={{ y: y1 }} className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover scale-105"
              quality={100}
            />
            
            {/* LAYERED SCRIM: This ensures text visibility on white/bright images */}
            <div className="absolute inset-0 bg-black/30 z-[5]" /> {/* Global dim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-[6]" /> {/* Bottom-up shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-1/3 z-[6]" /> {/* Top-down shadow for Nav */}
          </motion.div>
        ) : (
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover scale-105"
              quality={100}
            />
            
            {/* LAYERED SCRIM: This ensures text visibility on white/bright images */}
            <div className="absolute inset-0 bg-black/30 z-[5]" /> {/* Global dim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-[6]" /> {/* Bottom-up shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-1/3 z-[6]" /> {/* Top-down shadow for Nav */}
          </div>
        )}

        {isMounted ? (
          <motion.div 
            style={{ opacity }}
            className="container relative z-20 h-full flex flex-col justify-end pb-12 md:pb-20 max-w-7xl mx-auto px-6"
          >
            {/* Back Button with Glassmorphism for visibility */}
            <Button asChild variant="ghost" className="w-fit mb-8 text-white hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-none font-bold uppercase tracking-widest text-[10px]">
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Library</span>
              </Link>
            </Button>
            
            {/* Category with Rough highlight */}
            <Badge className="w-fit mb-4 bg-orange-500 text-white border-2 border-black px-4 py-1 rounded-none uppercase italic font-black tracking-tighter shadow-[4px_4px_0px_0px_black]">
              {project.category}
            </Badge>

            {/* Title with Text Shadow for extra legibility */}
            <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {project.title}
            </h1>
          </motion.div>
        ) : (
          <div 
            className="container relative z-20 h-full flex flex-col justify-end pb-12 md:pb-20 max-w-7xl mx-auto px-6"
          >
            {/* Back Button with Glassmorphism for visibility */}
            <Button asChild variant="ghost" className="w-fit mb-8 text-white hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-none font-bold uppercase tracking-widest text-[10px]">
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Library</span>
              </Link>
            </Button>
            
            {/* Category with Rough highlight */}
            <Badge className="w-fit mb-4 bg-orange-500 text-white border-2 border-black px-4 py-1 rounded-none uppercase italic font-black tracking-tighter shadow-[4px_4px_0px_0px_black]">
              {project.category}
            </Badge>

            {/* Title with Text Shadow for extra legibility */}
            <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {project.title}
            </h1>
          </div>
        )}
      </section>

      {/* 2. BLUEPRINT SIDEBAR & NARRATIVE GRID */}
      <main className="container relative z-30 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* SIDEBAR (Responsive Order) */}
          <aside className="w-full lg:col-span-4 lg:sticky lg:top-12 order-last lg:order-first space-y-8 mt-12 lg:mt-0">
            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(251,146,60,1)]">
              <h3 className="font-black uppercase tracking-widest text-sm mb-8 flex items-center gap-2 border-b-2 border-black pb-4">
                <Terminal className="w-4 h-4 text-orange-500" /> System_Specs
              </h3>
              
              <div className="space-y-6 mb-10">
                <DetailRow label="Client" value={project.client} />
                <DetailRow label="Timeline" value={project.year} />
                <DetailRow label="My_Role" value={project.role} />
              </div>

              <div className="space-y-4 mb-10">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">Tech_Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-neutral-100 border border-black/10 text-[10px] font-bold uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => window.open(project.demoUrl, '_blank')} className="w-full bg-orange-500 hover:bg-black text-white font-black uppercase tracking-tighter rounded-none h-14 border-2 border-black transition-all shadow-[4px_4px_0px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1">
                  Launch Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>

          {/* CONTENT NARRATIVE */}
          <div className="w-full lg:col-span-8 space-y-24 order-first lg:order-last">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-orange-500" />
                <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-neutral-400">01 // The Problem</h2>
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">Solving the digital <span className="text-orange-500">bottleneck.</span></h3>
              <p className="text-xl text-neutral-600 leading-relaxed font-medium">
                {project.challenge}
              </p>
            </section>

            {/* STRATEGY CARDS */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 bg-orange-50 border-2 border-orange-100">
                <Target className="w-8 h-8 text-orange-600 mb-6" />
                <h4 className="text-xl font-black uppercase mb-4 tracking-tighter">Strategic Solution</h4>
                <p className="text-neutral-600 font-serif italic text-lg leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div className="p-10 bg-[#1a1a1a] text-white">
                <Rocket className="w-8 h-8 text-orange-400 mb-6" />
                <h4 className="text-xl font-black uppercase mb-4 tracking-tighter text-orange-400">Key Results</h4>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <section className="mt-20 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-orange-500" />
                <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-neutral-400">02 // Take Action</h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={() => window.open(project.demoUrl, '_blank')} 
                  className="w-full sm:w-auto bg-orange-500 hover:bg-black text-white font-black uppercase tracking-tighter rounded-none h-16 px-12 border-2 border-black transition-all shadow-[6px_6px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 text-lg"
                >
                  <ExternalLink className="mr-3 h-5 w-5" />
                  See Live Project
                </Button>
                
                <Button 
                  onClick={() => window.open('https://calendly.com/your-username/consultation', '_blank')} 
                  className="w-full sm:w-auto bg-black hover:bg-orange-500 text-white font-black uppercase tracking-tighter rounded-none h-16 px-12 border-2 border-black transition-all shadow-[6px_6px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_black] hover:text-white active:shadow-none active:translate-x-1 active:translate-y-1 text-lg"
                >
                  <Rocket className="mr-3 h-5 w-5" />
                  Start a Project
                </Button>
              </div>
              
              <p className="text-center text-neutral-500 text-sm mt-6">
                Ready to bring your ideas to life? Let&rsquo;s collaborate on something amazing.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
    <span className="text-neutral-400 font-mono text-[10px] uppercase">{label}</span>
    <span className="font-bold text-xs uppercase tracking-tight">{value}</span>
  </div>
);

export const ProjectClient = memo(ProjectClientComponent);