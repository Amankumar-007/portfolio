"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageTransition } from "@/components/page-transition";
import { useEffect, useState, useRef } from 'react';
import { Terminal, Code2, Cpu, Globe } from "lucide-react";
import Head from 'next/head';

// Categorized Skills for better organization
const skillCategories = [
  {
    name: "Core Tech",
    icon: <Code2 size={14} />,
    items: ["React", "Next.js", "Node.js", "TypeScript", "JavaScript", "MongoDB", "Express.js"],
    color: "bg-orange-100/50"
  },
  {
    name: "Frontend & UI",
    icon: <Globe size={14} />,
    items: ["Tailwind CSS", "Responsive Design", "UI/UX Implementation", "CSS3", "HTML5", "Animations"],
    color: "bg-white"
  },
  {
    name: "Workflow",
    icon: <Cpu size={14} />,
    items: ["Git & GitHub", "Agile", "REST APIs", "Problem Solving", "Open Source"],
    color: "bg-orange-50/50"
  }
];

const experiences = [

  {

    period: "2024 - Present",

    role: "Application Developer (MERN Stack)",

    company: "Freelancer / Personal Projects",

    description: "Building web applications using React, Node.js, Express, MongoDB, and integrating frontend with backend systems. Continuously learning and improving skills in full-stack development.",

  },

  {

    period: "2023 - 2024",

    role: "Junior Developer",

    company: "Freelance Web Developer",

    description: "Developed and maintained responsive websites for small businesses, improving their digital presence. Focused on frontend technologies like HTML, CSS, JavaScript, and React.",

  },

  {

    period: "2022 - 2023",

    role: "Intern Developer",

    company: "Self-learning and Open Source Projects",

    description: "Worked on personal projects, contributed to open-source, and participated in coding challenges to enhance development skills. Gained hands-on experience in web development and backend technologies.",

  }

];

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    let scroll: any = null;
    
    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        scroll = new LocomotiveScroll({
          el: containerRef.current as unknown as HTMLElement,
          smooth: true,
          multiplier: 0.9, // Optimized for responsiveness
          lerp: 0.15, // Better smoothing
        });
        scrollRef.current = scroll;

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 1200); // Reduced from 2000ms

        return () => {
          if (scroll) scroll.destroy();
        };
      } catch (error) {
        console.error('Error loading LocomotiveScroll:', error);
        setIsLoading(false);
      }
    };

    initScroll();

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>About | Aman Kumar - MERN Stack Developer</title>
        <meta name="description" content="Learn about Aman Kumar, expert MERN stack developer. Discover skills in React, Node.js, MongoDB, TypeScript. Professional full-stack development experience." />
        <meta name="keywords" content="Aman Kumar about, MERN stack developer, React developer, Node.js developer, full stack developer, TypeScript expert, MongoDB developer, web developer profile" />
        <meta property="og:title" content="About | Aman Kumar - MERN Stack Developer" />
        <meta property="og:description" content="Learn about Aman Kumar, expert MERN stack developer. Discover skills in React, Node.js, MongoDB, TypeScript." />
        <meta property="og:url" content="https://amankumarr.in/about" />
        <meta property="og:image" content="https://amankumarr.in/about-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Aman Kumar - MERN Stack Developer" />
        <meta name="twitter:description" content="Learn about Aman Kumar, expert MERN stack developer. Discover skills in React, Node.js, MongoDB." />
        <meta name="twitter:image" content="https://amankumarr.in/about-image.png" />
        <link rel="canonical" href="https://amankumarr.in/about" />
      </Head>
    <div 
      ref={containerRef} 
      data-scroll-container 
      className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] selection:bg-orange-500 selection:text-white"
    >
      {/* --- OPTIMIZED ROUGH GRAIN OVERLAY --- */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.25] contrast-150 mix-blend-multiply will-change-transform">
        <filter id="roughNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>

      <PageTransition>
        <div className="relative z-10 container max-w-6xl mt-20 py-20 px-4 md:px-6">
          
          {/* INTRO SECTION */}
          <div className="grid gap-16 lg:grid-cols-2 mb-25">
            <div data-scroll data-scroll-speed="1">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.85]">
                Aman <br /> <span className="text-orange-500 italic font-serif lowercase pr-4">Kumar.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-8 font-medium max-w-md">
                Full-stack developer building robust MERN applications with a focus on performance and raw aesthetics.
              </p>
              
              {/* SPECIAL SKILLS BENTO GRID */}
              <div className="mt-12 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 font-bold mb-6">Technical Arsenal</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillCategories.map((cat, i) => (
                    <div 
                      key={i} 
                      className={`${cat.color} border border-black/10 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center gap-2 mb-4 text-orange-600 font-mono text-[10px] font-bold uppercase tracking-widest">
                        {cat.icon} {cat.name}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((skill, si) => (
                          <span key={si} className="text-[11px] font-bold px-2 py-0.5 bg-black/5 rounded-md border border-black/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="bg-black text-white p-5 rounded-2xl flex flex-col justify-between border border-black">
                     <Terminal size={20} className="text-orange-500" />
                     <p className="text-[11px] font-mono opacity-70 mt-4">System.ready(); <br /> {/* Always learning new stacks */}</p>
                  </div>
                </div>
              </div>
            </div>
          
            <div 
              data-scroll 
              data-scroll-speed="2"
              className="relative h-[600px] rounded-[3rem] overflow-hidden border-2 border-black shadow-[25px_25px_0px_0px_rgba(251,146,60,0.15)]"
            >
              <Image 
                src="/image.png" 
                alt="Aman Kumar" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        
          <Separator className="my-20 bg-black/10" />
        
          {/* WORK EXPERIENCE */}
          <div data-scroll data-scroll-speed="1">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-16">
              Experience <span className="text-orange-600">Log</span>
            </h2>
            
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="grid md:grid-cols-[250px_1fr] gap-8 group"
                >
                  <div className="font-mono text-sm flex flex-col gap-2">
                    <span className="text-orange-500 font-black tracking-[0.2em] uppercase">0{index + 1}</span>
                    <span className="text-slate-400">[{exp.period}]</span>
                  </div>
                  <div className="border-l-2 border-black/10 pl-10 group-hover:border-orange-500 transition-all">
                    <h3 className="text-3xl font-black tracking-tight uppercase group-hover:text-orange-600 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-slate-400 font-mono text-sm mb-4 uppercase">{exp.company}</p>
                    <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
    </>
  );
}