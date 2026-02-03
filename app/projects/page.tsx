"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useCursor } from '@/components/Cursor';
import { useRouter } from 'next/navigation';
import FAQ from '@/components/Faq';
import ProjectTimeline from '@/components/ProjectTimeline';
import { VideoThumbnail } from '@/components/VideoThumbnail';
import { getAllProjects } from '@/data/projects';
import { ArrowUpRight, Terminal, Hash, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: any;
  index: number;
}

const ProjectCard = React.memo<ProjectCardProps>(({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { setCursorHover } = useCursor();
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '20px' }
    );
    const currentRef = cardRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setCursorHover(true, 'View Details', 70, '#f97316');
  }, [setCursorHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCursorHover(false);
  }, [setCursorHover]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div 
        className="relative mb-6 overflow-hidden bg-white border-2 border-black aspect-[16/10] group cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(251,146,60,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => router.push(`/projects/${project.id}`)}
      >
        <VideoThumbnail
          videoSrc={project.video}
          posterSrc={project.screenshots[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'}
          alt={project.title}
          className="w-full h-full object-cover"
          isHovered={isHovered}
        />
        <div className="absolute top-3 left-3 z-20">
           <div className="bg-orange-500 text-white px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest border border-black">
             Project_0{index + 1}
           </div>
        </div>
      </div>

      <div className="space-y-2 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-orange-500 transition-colors">
            {project.title}
          </h3>
          <Hash className="text-orange-500 w-4 h-4 opacity-40" />
        </div>
        <p className="text-sm font-medium text-gray-500 leading-snug italic font-serif max-w-[90%]">
          {project.description}
        </p>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const scroll = new LocomotiveScroll({
        el: containerRef.current as any,
        smooth: true,
        multiplier: 0.85,
        lerp: 0.1,
      });
      return () => scroll.destroy();
    })();
  }, []);

  const projects = useMemo(() => getAllProjects(), []);

  return (
    <div ref={containerRef} data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] selection:bg-orange-500 overflow-x-hidden">
      
      {/* ROUGH NOISE ENGINE */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.20] contrast-150 mix-blend-multiply">
        <filter id="roughNoise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" /></filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* UPDATED HEADLINE: THE_WORK.ARCHIVE */}
        <header className="pt-40 pb-14 md:pb-20" data-scroll data-scroll-speed="1">
          <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[9px] mb-4">
            <Layers size={12} /> <span>System.Index_Manifest</span>
          </div>
          <h1 className="text-[10vw] md:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.85] mb-6">
            The Work <br /> <span className="text-orange-500 italic font-serif lowercase">Archive.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-medium leading-tight">
            A comprehensive directory of full-stack builds, experimental logic, and production-ready applications.
          </p>
        </header>

        {/* PROJECTS GRID */}
        <main className="pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14 md:gap-y-24">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={index % 2 === 1 ? 'md:mt-16' : ''}
                data-scroll
                data-scroll-speed={index % 2 === 1 ? "0.6" : "1"}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </main>

        <ProjectTimeline />
        <FAQ />

        {/* REFINED CTA */}
        <section className="py-20 border-t border-black/10">
          <div className="max-w-4xl mx-auto text-center bg-black text-white p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(251,146,60,1)]">
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                Start a <span className="text-orange-500">Project?</span>
              </h2>
              <p className="text-base text-gray-400 mb-10 font-medium max-w-md mx-auto">
                Whether it&apos;s a complex SaaS or a lean MVP, let&apos;s build it with intent.
              </p>
              <button className="bg-orange-500 text-white px-10 py-4 border-2 border-orange-500 hover:bg-transparent hover:text-orange-500 font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-[6px_6px_0px_0px_white] active:shadow-none active:translate-x-1 active:translate-y-1">
                Initialize_Chat
              </button>
            </div>
          </div>
        </section>
      </div> 
    </div> 
  );
};

export default ProjectsPage;