"use client";

import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutImage = memo(function AboutImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl z-10"
    >
      <Image
        src="/about.PNG"
        alt="Aman Kumar working"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
      />
    </motion.div>
  );
});

const AboutContent = memo(function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-lg relative z-10"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-0.5 bg-orange-500"></div>
        <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">
          About Me
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6 text-neutral-900 leading-tight">
        Turning real-world problems into <span className="italic text-neutral-500 font-serif">powerful solutions.</span>
      </h2>
      <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
        I&apos;m <span className="font-bold text-neutral-900">Aman Kumar</span>, a Full Stack Developer passionate about building
        scalable SaaS solutions and real-world web applications. From responsive UIs to robust
        cloud architectures, I bring ideas to life through clean
        code and modern technologies.
      </p>
      <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
        I&apos;ve built SaaS platforms, e-commerce systems, and data-driven dashboards —
        focusing on user experience, performance, and seamless integration.
        My goal is to deliver innovative digital products that solve real business challenges.
      </p>
      <MagneticButton>
        <Link href="/about" className="flex items-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
          Learn More About Me
          <ArrowRight size={18} />
        </Link>
      </MagneticButton>
    </motion.div>
  );
});

// Magnetic Button with Touch Support fallbacks
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative w-full md:w-auto px-8 py-4 bg-neutral-900 rounded-full overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-orange-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="flex justify-center relative z-10">{children}</div>
    </motion.button>
  );
};

export function AboutPreview() {
  return (
    <section className="relative py-24 px-4 bg-[#FDFCFB] overflow-hidden selection:bg-orange-200 selection:text-orange-900">

      {/* --- BACKGROUND LAYERS (From Hero) --- */}

      {/* 1. Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none z-0 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* 2. Gradient Orb (Positioned behind the Image for depth) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 z-0 pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 will-change-transform"
          style={{
            background: 'conic-gradient(from 90deg at 50% 50%, #FFD700, #FF8C00, #FF4500, #FFD700)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="container max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </section>
  );
}