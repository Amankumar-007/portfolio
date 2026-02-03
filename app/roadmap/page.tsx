


"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { Terminal, ArrowRight, Zap, Code2, Database, ShieldCheck, Cpu, Target, Bookmark } from "lucide-react";

export default function CareerPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const scroll = new LocomotiveScroll({
        el: containerRef.current as any,
        smooth: true,
        multiplier: 1,
        lerp: 0.1,
      });
      return () => scroll.destroy();
    })();
  }, []);

  return (
    <div ref={containerRef} data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] selection:bg-orange-500 overflow-x-hidden">
      
      {/* ROUGH NOISE ENGINE */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.20] contrast-150 mix-blend-multiply">
        <filter id="roughNoise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>

      <PageTransition>
        {/* TOP MARGIN ADJUSTED (mt-32) */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20">
          
          {/* HEADER SECTION */}
          <header className="mb-32" data-scroll data-scroll-speed="1">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[9px] mb-6">
              <Terminal size={12} /> <span>Career_Evolution.log</span>
            </div>
            <h1 className="text-[12vw] md:text-[7.5vw] leading-[0.9] font-black uppercase tracking-tighter">
              About My <br /> <span className="text-orange-500 italic font-serif lowercase">Journey.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl font-bold tracking-tight max-w-3xl leading-snug text-slate-800">
              I’m a MERN stack developer who started with curiosity and stayed because I enjoy building things that <span className="text-orange-600">actually work.</span>
            </p>
          </header>

          {/* SECTION 1: THE GROWTH ARCHIVE */}
          <section className="grid md:grid-cols-[1fr_300px] gap-16 mb-48">
            <div className="space-y-8 border-l border-black/10 pl-8">
              <p className="text-lg font-medium leading-relaxed">
                I began with JavaScript, struggled like everyone does, broke things, fixed them, and slowly started understanding how the web fits together.
              </p>
              <p className="text-lg font-medium leading-relaxed text-slate-500">
                Right now, I’m focused on becoming a solid full-stack developer who understands both frontend logic and backend architecture. I don’t just follow tutorials. I build, fail, debug, and improve.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                 {["Focused", "Resilient", "Self-Taught", "Architecture-Minded"].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white border border-black text-[10px] font-mono uppercase font-bold shadow-[3px_3px_0px_0px_rgba(251,146,60,1)]">{tag}</span>
                 ))}
              </div>
            </div>
            <div className="bg-orange-500/5 p-8 border-2 border-black flex flex-col justify-between">
               <Bookmark className="text-orange-600 mb-10" />
               <div>
                 <span className="text-5xl font-black text-orange-600 tracking-tighter block leading-none">MCA</span>
                 <p className="font-bold text-xs uppercase mt-2">Currently Pursuing</p>
                 <div className="w-full h-[1px] bg-black/10 my-4"></div>
                 <p className="text-[10px] font-mono text-slate-500 uppercase">BCA Graduate</p>
               </div>
            </div>
          </section>

          {/* SECTION 2: WHAT I DO (CAPABILITIES) */}
          <section className="mb-48">
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-slate-400 font-bold mb-10">01 // Capability_Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "React Ecosystem", desc: "Building UIs & State with Redux Toolkit.", icon: <Code2 /> },
                { title: "API Design", desc: "Node & Express backend architecture.", icon: <Cpu /> },
                { title: "Data Flow", desc: "NoSQL storage & Schema design with MongoDB.", icon: <Database /> },
                { title: "Access Control", desc: "Role-based auth & Admin dashboard flow.", icon: <ShieldCheck /> },
                { title: "Pixel Perfect", desc: "Converting designs to clean, usable code.", icon: <Zap /> },
                { title: "Optimization", desc: "Improving code quality and system structure.", icon: <Target /> },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-black/10 hover:border-orange-500 transition-colors group">
                  <div className="text-orange-500 mb-4 group-hover:rotate-12 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: PROJECTS THAT DEFINE ME */}
          <section className="mb-48">
             <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-slate-400 font-bold mb-10">02 // Defining_Outputs</h2>
             <div className="space-y-4">
                {[
                  { title: "Real Estate Web App", role: "Full Stack", desc: "Role-based property system with messaging." },
                  { title: "LMS Platform", role: "Architecture", desc: "Multi-role academic & exam tracking engine." },
                  { title: "E-Commerce", role: "State Logic", desc: "Redux-driven checkout & product management." }
                ].map((p, i) => (
                  <div key={i} className="group p-8 border-b border-black/10 hover:bg-orange-50/30 transition-all flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-orange-600 mb-2 block">{p.role}</span>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">{p.title}</h3>
                      <p className="text-sm text-slate-500 mt-2 font-medium">{p.desc}</p>
                    </div>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all text-orange-500 mt-6 md:mt-0" />
                  </div>
                ))}
             </div>
          </section>

          {/* SECTION 4: THE MINDSET (BLACK BLOCK) */}
          <section className="bg-black text-white p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden mb-48 shadow-[15px_15px_0px_0px_rgba(251,146,60,1)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 text-orange-500">How I Think.</h2>
              <ul className="space-y-6">
                {[
                  "I value clarity over clever code",
                  "I write code that future-me can understand",
                  "I enjoy solving problems more than tasks",
                  "I'm not chasing shortcuts. I'm building skills."
                ].map((text, i) => (
                  <li key={i} className="text-lg font-bold tracking-tight flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-orange-500 shrink-0"></span> {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FINAL NOTE & CTA */}
          <footer className="text-center py-20 max-w-3xl mx-auto border-t-2 border-black/10">
             <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-6">Final_Note</p>
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-10 italic">
                I&apos;m still learning. But I&apos;m serious about this path — <span className="text-orange-600">and I put in the work.</span>
             </h2>
             <button className="px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs border border-black shadow-[5px_5px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_black] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none">
                Start a Conversation
             </button>
          </footer>

        </div>
      </PageTransition>
    </div>
  );
}