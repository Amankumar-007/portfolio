"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Layers, Command } from "lucide-react";
import { memo, useState } from "react";
import { useLenis } from '@/hooks/useLenis';

const ProjectCard = memo(({ project, index }: { project: typeof PROJECTS[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      key={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative border-b border-black py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer overflow-hidden transition-all duration-300"
    >
      <div className="relative z-20">
        <span className="text-xs font-mono mb-2 block opacity-50">0{index + 1} / {project.tag}</span>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
          {project.title}
        </h2>
      </div>

      {/* Hover Image Preview - Optimized */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? 5 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-40 ${project.color} z-10 rounded-sm pointer-events-none hidden md:block shadow-2xl border-2 border-black`}
      >
        <div className="p-4 font-mono text-[10px] text-black/40">
          PREVIEW_DATA_0{index}.LOG <br />
          LATENCY: 12ms <br />
          STACK: REACT/RUST
        </div>
      </motion.div>

      <div className="relative z-20 flex items-center gap-10 mt-6 md:mt-0">
        <span className="font-mono text-xl">{project.year}</span>
        <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
          <ArrowUpRight size={24} />
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const PROJECTS = [
  { title: "KINETIC", tag: "Full Stack", year: "2026", color: "bg-orange-200" },
  { title: "NEURAL", tag: "AI / ML", year: "2025", color: "bg-orange-300" },
  { title: "VOID", tag: "Backend", year: "2026", color: "bg-orange-100" },
  { title: "OSMOSIS", tag: "Web3", year: "2024", color: "bg-orange-400" },
];

export default function CaseStudyClient() {
  const { isLoading } = useLenis();

  return (
    <div data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] overflow-x-hidden selection:bg-orange-500 selection:text-white">
      
      {/* --- OPTIMIZED NOISE LAYER --- */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.12]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          mixBlendMode: 'multiply'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* TOP NAV / LOGO */}
        <nav className="flex justify-between items-center mb-32 border-b border-black/10 pb-6">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <Command size={24} /> FULLSTACK.LOG
          </div>
          <div className="text-sm font-mono tracking-widest uppercase opacity-60">
            Based in 2026 — Available for hire
          </div>
        </nav>

        {/* HERO SECTION - OPTIMIZED */}
        <section className="mb-40">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter"
          >
            Work <br /> 
            <span className="text-orange-500 flex items-center gap-4">
              History <ArrowUpRight className="w-[10vw] h-[10vw]" />
            </span>
          </motion.h1>
          <div className="mt-10 flex flex-col md:flex-row gap-10 items-end">
            <p className="max-w-md text-xl font-medium leading-tight">
              A collection of raw, full-stack architectures and high-performance interfaces built with grit and code.
            </p>
            <div className="flex-1 h-[1px] bg-black/20 mb-3 hidden md:block"></div>
          </div>
        </section>

        {/* PROJECT LIST - MINIMAL & ROUGH */}
        <div className="space-y-0 border-t border-black">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        {/* ROUGH CTA */}
        <footer className="mt-40 grid md:grid-cols-2 gap-10">
          <div className="bg-orange-500 p-10 flex flex-col justify-between h-[400px] border-2 border-black">
            <Layers size={40} className="text-white" />
            <h3 className="text-5xl font-black uppercase text-white tracking-tighter">Ready to <br /> Scale?</h3>
          </div>
          <div className="bg-black text-white p-10 flex flex-col justify-between h-[400px] border-2 border-black">
            <p className="text-2xl font-mono">Let&apos;s build something that survives the noise.</p>
            <button className="flex items-center justify-between border border-white/30 p-6 hover:bg-white hover:text-black transition-all group">
              <span className="text-xl font-bold uppercase">Contact Now</span>
              <Zap className="group-hover:fill-current" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
