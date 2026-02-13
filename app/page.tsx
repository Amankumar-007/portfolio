'use client';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from '@/components/sections/hero';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { AboutPreview } from '@/components/sections/about-preview';
import { Services } from '@/components/sections/services';
import { SkillsPreview } from '@/components/sections/skills-preview';
import { Contact } from '@/components/sections/contact';
import Head from 'next/head';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const lenisRef = useRef<any>(null);

  // Optimized Lenis setup with performance improvements
  useEffect(() => {
    let lenis: any = null;

    const initLenis = async () => {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default;

        lenis = new Lenis({
          duration: 0.6, // Reduced duration for snappier feel
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)), // Faster easing
          lerp: 0.15, // Slightly higher for smoother but responsive feel
          wheelMultiplier: 0.8, // Reduced for better control
          touchMultiplier: 1.5, // Reduced for mobile performance
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Optimized RAF callback
        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Faster loading time
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 800); // Reduced from 1500ms

        return () => {
          if (lenis) lenis.destroy();
        };
      } catch (error) {
        console.error('Error loading Lenis:', error);
        setIsLoading(false);
      }
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Home | Best Modern Portfolio - Aman Kumar</title>
        <meta name="description" content="Welcome to Aman Kumar's best modern portfolio. Expert Full Stack developer specializing in SaaS solutions, innovative web projects, React applications, and high-performance development." />
        <meta name="keywords" content="Aman Kumar portfolio, best modern portfolio, Full Stack projects, SaaS solutions, React developer portfolio, full stack developer showcase, web development portfolio, modern portfolio design, best portfolio website" />
        <meta property="og:title" content="Home | Best Modern Portfolio - Aman Kumar" />
        <meta property="og:description" content="Welcome to Aman Kumar's best modern portfolio. Expert Full Stack developer specializing in SaaS solutions and high-performance development." />
        <meta property="og:url" content="https://amankumarr.in/" />
        <meta property="og:image" content="https://amankumarr.in/about-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | Best Modern Portfolio - Aman Kumar" />
        <meta name="twitter:description" content="Welcome to Aman Kumar's best modern portfolio. Expert Full Stack developer specializing in modern web applications." />
        <meta name="twitter:image" content="https://amankumarr.in/about-image.png" />
        <link rel="canonical" href="https://amankumarr.in/" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aman Kumar",
              "url": "https://amankumarr.in",
              "sameAs": [
                "https://github.com/Amankumar-007",
                "https://www.linkedin.com/in/amankumarweb/"
              ],
              "jobTitle": "Full Stack Developer",
              "description": "Expert Full Stack Developer and SaaS Solutions specialist creating modern, high-performance web applications",
              "knowsAbout": [
                "React", "Node.js", "MongoDB", "Express.js", "TypeScript", "Next.js", "JavaScript", "SaaS Solutions"
              ],
              "image": "https://amankumarr.in/about-image.png"
            })
          }}
        />
      </Head>
      <main
        ref={containerRef}
        data-scroll-container
        className="relative min-h-screen bg-[#FDFCFB] selection:bg-orange-200 selection:text-orange-900"
      >

        {/* --- GLOBAL FIXED BACKGROUND (Optimized for performance) --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">

          {/* 1. Optimized Grain Overlay - using CSS for better performance */}
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-multiply will-change-transform"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          />

          {/* 2. Optimized Gradient Orb - reduced animation complexity */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[100px] opacity-30 will-change-transform"
            style={{
              background: 'conic-gradient(from 90deg at 50% 50%, #FFD700, #FF8C00, #FF4500, #FFD700)',
              transform: 'translateZ(0)' // Hardware acceleration
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }, // Slower for better performance
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
    </>
  );
}