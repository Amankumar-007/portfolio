"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { Terminal, ArrowRight, Zap, Layers, Microscope, History } from "lucide-react";

const JOURNEY_DATA = [
  {
    date: "2026",
    title: "The Architect Era",
    desc: "Focusing on distributed systems, micro-frontend architecture, and AI-driven automation.",
    skills: ["Next.js 16", "Rust", "Docker", "Terraform"],
    icon: <Zap size={20} />
  },
  {
    date: "2024",
    title: "MERN Dominance",
    desc: "Mastering the full-stack flow. Real-time sockets, complex state, and NoSQL optimization.",
    skills: ["React", "Node.js", "MongoDB", "Redux"],
    icon: <Layers size={20} />
  },
  {
    date: "2022",
    title: "Genesis",
    desc: "Where it started. Syntax, semantics, and the curiosity of how the web actually works.",
    skills: ["JS", "HTML5", "CSS3", "Git"],
    icon: <Microscope size={20} />
  }
];

export default function LearningJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -500]);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const scroll = new LocomotiveScroll({
        el: containerRef.current as any,
        smooth: true,
        multiplier: 1,
        lerp: 0.1,
        smartphone: { smooth: true },
      });
      return () => scroll.destroy();
    })();
  }, []);

  return (
    <div ref={containerRef} data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] selection:bg-orange-500 overflow-x-hidden">
      
      {/* ROUGH NOISE OVERLAY */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.22] contrast-150 mix-blend-multiply">
        <filter id="roughNoise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>

      <PageTransition>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-40">
          
          {/* HERO - RESPONSIVE TYPOGRAPHY */}
          <header className="mb-32 md:mb-30" data-scroll data-scroll-speed="1">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
              <History size={14} /> <span>Log_Version: 2.0.26</span>
            </div>
            <h1 className="text-[18vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter">
              The <br /> <span className="text-orange-500 italic font-serif lowercase">Journal.</span>
            </h1>
          </header>

          {/* KINETIC MARQUEE - Added Thing */}
          <div className="whitespace-nowrap flex overflow-hidden border-y-2 border-black py-4 mb-40">
            <motion.div style={{ x: xTranslate }} className="flex gap-20 text-6xl md:text-8xl font-black uppercase tracking-tighter opacity-10">
              {["Fullstack", "Performance", "Brutalism", "Scale", "Logic", "Design"].map((text, i) => (
                <span key={i}>{text}</span>
              ))}
            </motion.div>
          </div>

          {/* MAIN JOURNEY FEED */}
          <div className="space-y-40">
            {JOURNEY_DATA.map((item, i) => (
              <div key={i} className="flex flex-col gap-8">
                {/* LARGE STICKY DATE */}
                <div className="sticky top-20 z-0 pointer-events-none">
                  <span className="text-[25vw] md:text-[15vw] font-black tracking-tighter leading-none text-orange-500/10">
                    {item.date}
                  </span>
                </div>

                {/* CONTENT LAYER */}
                <div className="relative z-10 -mt-[15vw] md:-mt-[10vw]">
                  <div className="flex items-center gap-4 text-orange-600 mb-4">
                    <span className="p-2 border border-black bg-white">{item.icon}</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">{item.title}</span>
                  </div>
                  
                  <p className="text-3xl md:text-6xl font-black tracking-tighter mb-8 max-w-4xl">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {item.skills.map((skill, j) => (
                      <span key={j} className="text-lg md:text-3xl font-mono font-bold hover:text-orange-500 transition-colors cursor-crosshair">
                        [{skill}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LEARNING PRINCIPLES - Added Thing */}
          <section className="mt-60 grid md:grid-cols-3 gap-10 border-t-2 border-black pt-20">
            {[
              { title: "First Principles", d: "Breaking down complex features into fundamental truths before coding." },
              { title: "Continuous Beta", d: "The mindset that software is never finished, only iterated upon." },
              { title: "Radical Clarity", d: "Clean code is not enough; it must be intuitively understood by the next dev." }
            ].map((p, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-2xl font-black uppercase tracking-tighter text-orange-600">{p.title}</h4>
                <p className="text-sm font-medium leading-relaxed text-slate-500">{p.d}</p>
              </div>
            ))}
          </section>

          {/* METRICS - MOBILE OPTIMIZED */}
          <section className="mt-60 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { val: "1.2k", lab: "Commits" },
              { val: "18", lab: "Languages" },
              { val: "24/7", lab: "Thinking" },
              { val: "∞", lab: "Curiosity" }
            ].map((s, i) => (
              <div key={i} className="border-l-4 border-orange-500 pl-4">
                <p className="text-5xl font-black tracking-tighter">{s.val}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">{s.lab}</p>
              </div>
            ))}
          </section>

          {/* THE QUOTE - BRUTALIST STYLE */}
          <footer className="mt-60 py-20 bg-black text-white px-6 rounded-[2rem] md:rounded-[4rem] relative overflow-hidden text-center">
             <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
             
             <div className="relative z-10 space-y-10">
                <div className="flex justify-center"><Terminal className="text-orange-500" size={40} /></div>
                <blockquote className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic">
                  &quot;The beautiful thing about learning is that <span className="text-orange-500">nobody</span> can take it away from you.&quot;
                </blockquote>
                <div className="text-orange-500 font-mono tracking-widest text-xs">— B.B. KING // ACCESS_GRANTED</div>
                
                <motion.button 
                   whileHover={{ scale: 1.05 }}
                   className="mt-20 px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs border border-white hover:bg-white hover:text-black transition-all"
                >
                   Continue the Tour <ArrowRight className="inline ml-2" size={16} />
                </motion.button>
             </div>
          </footer>

        </div>
      </PageTransition>
    </div>
  );
}


