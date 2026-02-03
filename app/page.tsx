'use client';
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from '@/components/sections/hero';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { AboutPreview } from '@/components/sections/about-preview';
import { Services } from '@/components/sections/services';
import { SkillsPreview } from '@/components/sections/skills-preview';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default;
        
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          lerp: 0.1,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 1500);

        return () => {
          lenis.destroy();
        };
      } catch (error) {
        console.error('Error loading Lenis:', error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main 
      ref={containerRef} 
      data-scroll-container 
      className="relative min-h-screen bg-[#FDFCFB] selection:bg-orange-200 selection:text-orange-900"
    >
      
      {/* --- GLOBAL FIXED BACKGROUND (Applies to all sections) --- */}
      {/* We use 'fixed' so the background stays put while content scrolls over it */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Global Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12] mix-blend-multiply" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* 2. Global Gradient Orb */}
        {/* Centered large orb that slowly rotates. Content scrolls OVER this. */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[100px] opacity-30 will-change-transform"
          style={{
            background: 'conic-gradient(from 90deg at 50% 50%, #FFD700, #FF8C00, #FF4500, #FFD700)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      {/* z-10 ensures content sits on top of the fixed background */}
      <div className="relative z-10">
        <Hero />
        <AboutPreview />
        <ProjectsShowcase />
        <Services />
        <SkillsPreview />
        <Contact />
      </div>

    </main>
  );
}