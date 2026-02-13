import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RevealAnimProps {
  children: React.ReactNode;
  delay?: number;
}

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  router: any;
}

const Hero = () => {
  const ref = useRef(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects (disabled/reduced on mobile via media queries in CSS if needed, 
  // but framer handles it reasonably well)
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={ref} className="relative w-full min-h-screen bg-[#FDFCFB] text-neutral-900 overflow-hidden selection:bg-orange-200 selection:text-orange-900 flex flex-col">

      {/* --- Background Elements --- */}

      {/* 1. Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-40 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Animated Gradient Orb */}
      <div className="absolute top-[-10%] right-[-10%] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-0 pointer-events-none">
        <motion.div
          className="w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[80px] md:blur-[100px] opacity-40 will-change-transform"
          style={{
            background: 'conic-gradient(from 90deg at 50% 50%, #FFD700, #FF8C00, #FF4500, #FFD700)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* --- Content Container --- */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex-grow flex flex-col justify-center pt-20 md:pt-0">

        {/* Top Bar / Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-6 left-4 right-4 md:top-8 md:left-6 md:right-6 flex justify-between items-center text-[10px] md:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase"
        >
          <span>Portfolio ©2026</span>
          <span className="flex items-center gap-1 text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open to Work
          </span>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-0">

          {/* Typography Block */}
          <motion.div style={{ y: yText }} className="relative z-20 mt-10 md:mt-0">
            <h1 className="font-black leading-[0.85] tracking-tighter text-neutral-800">

              {/* Line 1: AMAN */}
              <RevealAnim delay={0.1}>
                <span className="block text-[18vw] lg:text-[11rem]">
                  AMAN
                </span>
              </RevealAnim>

              {/* Line 2: Full Stack Developer (The Aesthetic Bridge) */}
              <RevealAnim delay={0.2}>
                <div className="flex items-center gap-2 md:gap-4 my-2 md:my-0 md:pl-2">
                  <div className="h-[1px] w-8 md:w-16 bg-neutral-400"></div>
                  <span className="font-serif italic font-light text-2xl md:text-5xl text-neutral-600">
                    Full Stack Developer
                  </span>
                </div>
              </RevealAnim>

              {/* Line 3: KUMAR */}
              <RevealAnim delay={0.3}>
                <span className="block text-[18vw] lg:text-[11rem] text-orange-600/90">
                  KUMAR<span className="text-neutral-800">.</span>
                </span>
              </RevealAnim>
            </h1>
          </motion.div>

          {/* Info Card (Stacks on mobile, floats right on desktop) */}
          <motion.div
            className="w-full lg:w-auto lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 max-w-md backdrop-blur-xl bg-white/30 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-6 md:p-8 rounded-3xl z-30"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ y: yCard }} // Only applies nicely on desktop usually, but okay here
          >
            <div className="flex items-center gap-2 mb-4 text-neutral-500 text-sm font-semibold tracking-wide uppercase">
              <MapPin size={14} />
              Noida, India
            </div>

            <p className="text-neutral-700 text-base md:text-lg leading-relaxed font-medium">
              Creating robust, scalable web applications and SaaS solutions with modern Full Stack technologies. Focused on clean code and premium user experiences.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-6 mb-8">
              {['React', 'Next.js', 'Node.js', 'Tailwind'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/50 border border-white/60 rounded-full text-xs font-bold text-neutral-600">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-6 text-neutral-800">
              <SocialLink icon={<Github size={20} />} href="#" />
              <SocialLink icon={<Linkedin size={20} />} href="#" />
              <SocialLink icon={<Mail size={20} />} href="#" />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Area */}
        <div className="mt-12 md:mt-0 md:absolute md:bottom-12 md:left-6 flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 md:pb-0">
          <MagneticButton router={router}>
            <span className="relative z-10 flex items-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
              See My Work <ArrowDownRight size={18} />
            </span>
          </MagneticButton>
        </div>

      </div>
    </div>
  );
};

// --- Sub-components ---

const RevealAnim: React.FC<RevealAnimProps> = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: delay }}
    >
      {children}
    </motion.div>
  </div>
);

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => (
  <a
    href={href}
    className="p-2 -m-2 hover:text-orange-600 transition-colors duration-300"
  >
    {icon}
  </a>
);

// Magnetic Button with Touch Support fallbacks
const MagneticButton: React.FC<MagneticButtonProps> = ({ children, router }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    router.push('/projects');
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative w-full md:w-auto px-8 py-4 bg-neutral-900 rounded-full overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-orange-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="flex justify-center">{children}</div>
    </motion.button>
  );
};

export default Hero;