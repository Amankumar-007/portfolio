"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Folder,
  Briefcase,
  Wrench,
  Edit3,
  ArrowUpRight,
  Flame,
  Dribbble,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  Zap,
  Code2,
  Terminal,
  Layers,
  Star,
  Users
} from "lucide-react";

const experienceTimeline = [
  {
    id: "exp-1",
    period: "2024 - PRESENT",
    role: "Senior Full Stack & SaaS Architect",
    company: "Independent SaaS Studio",
    location: "Remote / India",
    type: "Full-Time / Freelance",
    highlights: [
      "Architected and deployed full-stack SaaS applications including NajmAI, Damas, and GetBeds SaaS Platform.",
      "Engineered high-concurrency Node.js REST & GraphQL APIs with PostgreSQL database optimization.",
      "Built modern responsive frontends using Next.js 14 App Router, TypeScript, and Framer Motion micro-animations.",
      "Achieved 99.9% uptime and reduced server response latency by 35% through Redis caching and CDN edge routing."
    ],
    skills: ["Next.js 14", "React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "AWS", "Docker", "Framer Motion"]
  },
  {
    id: "exp-2",
    period: "2023 - 2024",
    role: "Lead Full Stack Developer",
    company: "Tech Solutions Inc.",
    location: "Hybrid",
    type: "Full-Time",
    highlights: [
      "Led a team of 5 engineers building enterprise Web Apps, LMS portals, and dynamic analytics dashboards.",
      "Designed reusable design systems and UI component libraries used across 8 core company applications.",
      "Integrated secure authentication, payment gateways (Lemon Squeezy / Stripe), and webhooks.",
      "Optimized web performance metrics resulting in 45% faster LCP (Largest Contentful Paint) times."
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "GraphQL", "Redux Toolkit", "Docker", "Figma"]
  },
  {
    id: "exp-3",
    period: "2021 - 2023",
    role: "Software Engineer & Frontend Specialist",
    company: "Digital Craft Agency",
    location: "On-site",
    type: "Full-Time",
    highlights: [
      "Developed 25+ production websites and interactive web applications for clients across US, Europe, and Asia.",
      "Translated complex Figma design mockups into pixel-perfect, accessible HTML5/CSS3/JavaScript code.",
      "Worked closely with product designers and QA engineers to maintain strict WCAG accessibility standards.",
      "Implemented automated CI/CD deployment pipelines using GitHub Actions and Vercel."
    ],
    skills: ["JavaScript (ES6+)", "React.js", "REST APIs", "CSS3 / SASS", "TailwindCSS", "Git / GitHub", "Vercel"]
  }
];

const certifications = [
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: <Zap className="w-5 h-5 text-amber-400" />
  },
  {
    title: "Full Stack Web Development Masterclass",
    issuer: "Meta / Coursera",
    year: "2022",
    icon: <Code2 className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "Modern UI/UX & Design Systems",
    issuer: "Figma Academy",
    year: "2022",
    icon: <Layers className="w-5 h-5 text-pink-400" />
  }
];

const clientEndorsements = [
  {
    name: "Alex Rivera",
    role: "Founder, TechLaunch SaaS",
    comment: "Aman is an extraordinary engineer who turned our vision into a high-performing SaaS product in record time. His attention to detail and UI aesthetic are unmatched.",
    stars: 5
  },
  {
    name: "Sarah Chen",
    role: "Product Director, Digital Studio",
    comment: "Working with Aman was seamless. He delivers clean, maintainable code with modern animations that wowed our stakeholders.",
    stars: 5
  }
];

export default function ExperiencePage() {
  return (
    <div className="bg-[#121212] text-zinc-100 min-h-screen selection:bg-[#F05335] selection:text-white font-sans antialiased relative">

      {/* MOBILE ONLY: LIQUID GLASS BOTTOM DOCK */}
      <header className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] sm:hidden w-auto max-w-[95vw]">
        <div className="liquid-glass-dock px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300">
          <Link
            href="/"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            title="Home"
          >
            <Home className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/#projects"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            title="Projects"
          >
            <Folder className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/experience"
            className="p-2.5 rounded-full bg-[#F05335] text-white shadow-[0_8px_20px_rgba(240,83,53,0.5)] scale-110 transition-all"
            title="Experience"
          >
            <Briefcase className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/#tools"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            title="Tools"
          >
            <Wrench className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/#contact"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            title="Contact"
          >
            <Edit3 className="w-4.5 h-4.5" />
          </Link>
        </div>
      </header>

      {/* DESKTOP ONLY: FLOATING TOP PILL NAVBAR */}
      <header className="hidden sm:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[#1e1e20]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3">
          <Link
            href="/"
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
          <Link
            href="/#projects"
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            title="Projects"
          >
            <Folder className="w-4 h-4" />
          </Link>
          <Link
            href="/experience"
            className="p-2.5 rounded-xl bg-[#F05335] text-white shadow-md transition-all"
            title="Experience"
          >
            <Briefcase className="w-4 h-4" />
          </Link>
          <Link
            href="/#tools"
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            title="Tools"
          >
            <Wrench className="w-4 h-4" />
          </Link>
          <Link
            href="/#contact"
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            title="Contact"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-24 xl:px-32 pt-10 sm:pt-40 lg:pt-44 pb-36 sm:pb-32">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-16 xl:gap-24 items-start relative">

          {/* Sticky Profile Sidebar (Matching Reference Image) */}
          <aside className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 lg:sticky lg:top-6 xl:top-8 z-30 self-start">
            <div className="bg-white text-black rounded-[36px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-between border border-zinc-200/90">

              {/* 1. Top-Left Dashed Orange Arc */}
              <svg
                className="absolute -top-4 -left-4 w-48 h-48 pointer-events-none z-0"
                viewBox="0 0 200 200"
                fill="none"
              >
                <path
                  d="M 10 120 C 30 30, 110 10, 190 15"
                  stroke="#F05335"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* 2. Bottom-Left Dashed Orange Curve to Flame Badge */}
              <svg
                className="absolute bottom-28 -left-6 w-56 h-36 pointer-events-none z-0"
                viewBox="0 0 220 140"
                fill="none"
              >
                <path
                  d="M 0 110 Q 90 105, 125 45"
                  stroke="#F05335"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* Photo Container with Orange Portrait Background */}
              <div className="relative z-10 mb-5 mt-1">
                <div className="bg-gradient-to-b from-[#E64A19] to-[#D84315] relative rounded-[28px] overflow-hidden aspect-[4/4.2] shadow-lg border border-black/5 flex items-end justify-center">
                  <Image
                    src="/about.PNG"
                    alt="Aman Kumar"
                    fill
                    sizes="360px"
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="text-center relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-black font-sans mb-3">
                  Aman Kumar
                </h1>

                {/* Central Flame Badge */}
                <div className="flex justify-center mb-3.5 relative">
                  <div className="w-9 h-9 rounded-full bg-[#F05335] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 relative z-10">
                    <Flame className="w-4.5 h-4.5 fill-white text-white" />
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm font-semibold text-zinc-500 leading-relaxed max-w-[260px] mx-auto mb-6">
                  A Software Engineer who has developed countless innovative solutions.
                </p>

                {/* Orange Outline Social Icons */}
                <div className="flex items-center justify-center gap-5 text-[#F05335] pt-1">
                  <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-orange-50 transition-colors" title="Dribbble">
                    <Dribbble className="w-5 h-5 stroke-[2.2]" />
                  </a>
                  <a href="https://twitter.com/amankumarweb" target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-orange-50 transition-colors" title="Twitter">
                    <Twitter className="w-5 h-5 stroke-[2.2]" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-orange-50 transition-colors" title="Instagram">
                    <Instagram className="w-5 h-5 stroke-[2.2]" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-orange-50 transition-colors" title="YouTube">
                    <Youtube className="w-5 h-5 stroke-[2.2]" />
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 w-full space-y-16 lg:space-y-20 min-w-0">

            {/* Header */}
            <div>
              <div className="select-none mb-6">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase tracking-wide leading-[0.88] block">
                  WORK
                </h2>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-zinc-800/80 uppercase tracking-wide leading-[0.88] block">
                  EXPERIENCE
                </h2>
              </div>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal">
                Over 4+ years of hands-on experience building scalable web products, cloud architectures, and user-centric interfaces.
              </p>
            </div>

            {/* Career Metrics Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#F05335]">4+</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Years Experience</div>
              </div>
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#C4F135]">46+</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Projects Shipped</div>
              </div>
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-cyan-400">99.9%</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">SaaS Uptime</div>
              </div>
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-purple-400">50k+</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Users Reached</div>
              </div>
            </div>

            {/* Detailed Experience Timeline */}
            <div className="space-y-8">
              {experienceTimeline.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1a1a1c] border border-zinc-800/80 rounded-3xl p-7 sm:p-8 hover:border-zinc-700 transition-colors shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-zinc-800/60">
                    <div>
                      <span className="text-xs font-bold text-[#F05335] tracking-widest uppercase block mb-1">
                        {item.period}
                      </span>
                      <h3 className="text-2xl font-black text-white">{item.role}</h3>
                      <div className="text-sm font-semibold text-zinc-400 mt-0.5">
                        {item.company} • <span className="text-zinc-500">{item.location}</span>
                      </div>
                    </div>

                    <span className="self-start sm:self-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                      {item.type}
                    </span>
                  </div>

                  {/* Highlights List */}
                  <ul className="space-y-2.5 mb-6 text-sm text-zinc-300 leading-relaxed">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#F05335] mt-1 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Education */}
            <div className="space-y-6 pt-4">
              <h3 className="text-2xl font-black text-white tracking-wide uppercase">
                Certifications & Education
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1a1a1c] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white leading-snug mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-medium">{cert.issuer}</p>
                    </div>
                    <span className="text-[11px] font-bold text-zinc-500 mt-4 block">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Endorsements */}
            <div className="space-y-6 pt-4">
              <h3 className="text-2xl font-black text-white tracking-wide uppercase">
                Endorsements & Testimonials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {clientEndorsements.map((end, i) => (
                  <div key={i} className="bg-[#1a1a1c] border border-zinc-800/80 p-6 rounded-3xl">
                    <div className="flex gap-1 mb-3 text-amber-400">
                      {[...Array(end.stars)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-4">
                      &quot;{end.comment}&quot;
                    </p>
                    <div>
                      <div className="text-sm font-bold text-white">{end.name}</div>
                      <div className="text-xs text-zinc-500">{end.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>

        </div>
      </div>

    </div>
  );
}
