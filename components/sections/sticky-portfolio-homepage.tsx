"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Send,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Newspaper,
} from "lucide-react";
import {
  AnimatedNumber,
  FadeInView,
  StaggerContainer,
  staggerChild,
} from "@/components/ui/scroll-animations";
import { getAllThoughts } from "@/data/thoughts";


interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  thumbImage: string;
  link: string;
}

interface ToolItem {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

const recentProjects: ProjectItem[] = [
  {
    id: "project-5",
    title: "TomatoAI",
    subtitle: "All-in-one AI Tools Platform",
    thumbImage: "/ai-tools/ai-tools.png",
    link: "/projects/project-5"
  },
  {
    id: "project-10",
    title: "Awasdhara",
    subtitle: "Real Estate & Land Investment Platform",
    thumbImage: "/logos/awasdhara-logo.png",
    link: "/projects/project-10"
  },
  {
    id: "project-9",
    title: "SnippetsX",
    subtitle: "Real-time Collaborative Code Editor",
    thumbImage: "/projects/snippetsx-cover.png",
    link: "/projects/project-9"
  },
  {
    id: "project-11",
    title: "TwoFloww",
    subtitle: "Software Development & Digital Agency",
    thumbImage: "/projects/twofloww-cover.png",
    link: "/projects/project-11"
  }
];

const premiumTools: ToolItem[] = [
  {
    id: "react",
    name: "React",
    subtitle: "Frontend Library",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "nodejs",
    name: "Node.js",
    subtitle: "JavaScript Runtime",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    subtitle: "Relational Database",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "docker",
    name: "Docker",
    subtitle: "Container Platform",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    subtitle: "Container Orchestration",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "graphql",
    name: "GraphQL",
    subtitle: "Query Language",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" alt="GraphQL" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "vscode",
    name: "VS Code",
    subtitle: "Code Editor",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "git",
    name: "Git",
    subtitle: "Version Control",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "terraform",
    name: "Terraform",
    subtitle: "Infrastructure as Code",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "nextjs",
    name: "Next.js",
    subtitle: "React Framework",
    icon: (
      <svg className="w-6 h-6 text-black fill-black" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.4 17.1l-6.8-9.4v9.4H9V6.9h2.3l6.5 9v-9h1.6v10.2h-2z" fill="#000000" />
      </svg>
    )
  },
  {
    id: "figma",
    name: "Figma",
    subtitle: "Design Tool",
    icon: (
      <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" width={24} height={24} unoptimized className="w-6 h-6 object-contain" />
    )
  },
  {
    id: "framer",
    name: "Framer",
    subtitle: "Website Builder",
    icon: (
      <svg className="w-6 h-6 text-black fill-black" viewBox="0 0 24 24">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#000000" />
      </svg>
    )
  }
];

const designThoughts = getAllThoughts().slice(0, 3).map((t) => ({
  id: t.id,
  title: t.title,
  excerpt: t.excerpt,
  date: t.displayDate,
  readTime: t.readTime,
  link: `/thoughts/${t.id}`
}));

const experienceList = [
  {
    period: "OCT 2025 - PRESENT",
    role: "Full Stack Engineer",
    company: "StartupCoaching",
    location: "Delhi, India · On-site",
    logo: "/logos/startupcoaching-logo.png",
    description: "Developing scalable web applications and digital solutions at StartupCoaching.in — working across frontend, backend, APIs, databases, and performance optimization to deliver seamless user experiences.",
    skills: ["Full Stack", "Next.js", "TypeScript", "REST APIs", "Tailwind CSS", "Git"]
  },
  {
    period: "JUN 2024 - OCT 2025",
    role: "Full Stack Engineer",
    company: "Ninepages Techsolutions Pvt. Ltd.",
    location: "Agra, Uttar Pradesh, India · On-site",
    logo: "/logos/ninepagestech-logo.png",
    description: "Built and shipped client web applications end-to-end as a Full Stack Engineer over 1 year 5 months — from database schema design and REST APIs to Redux-driven React frontends.",
    skills: ["Full Stack", "Redux.js", "Express.js", "MongoDB", "React.js", "Node.js"]
  },
  {
    period: "2023 - 2024",
    role: "Full Stack Developer Training",
    company: "Learn2Earn",
    location: "Structured Training Program",
    description: "Completed an intensive full-stack developer training program — structured code reviews and production-style project specs that bridged self-taught fundamentals into job-ready practice.",
    skills: ["JavaScript (ES6+)", "React.js", "Node.js", "MongoDB", "Git & GitHub"]
  },
  {
    period: "2022 - 2023",
    role: "Intern Developer",
    company: "Self-learning and Open Source Projects",
    location: "Remote / Independent",
    description: "Worked on personal projects, contributed to open-source, and participated in coding challenges to enhance development skills. Gained hands-on experience in web development and backend technologies.",
    skills: ["HTML5", "CSS3", "JavaScript", "Git", "Open Source"]
  }
];

export default function StickyPortfolioHomepage() {
  const [activeTab, setActiveTab] = useState("home");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "tools", "thoughts", "experience", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId === "hero" ? "home" : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-[#121212] text-zinc-100 min-h-screen selection:bg-[#F05335] selection:text-white font-poppins antialiased relative">


      {/* ========================================================= */}
      {/* FLOATING TOP PILL NAVBAR (COMPACT)                        */}
      {/* ========================================================= */}
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1rem)] px-1">
        <div className="bg-[#1e1e20]/90 backdrop-blur-md border border-white/10 px-2 sm:px-3.5 py-1.5 rounded-2xl shadow-2xl flex items-center gap-1 sm:gap-2.5 overflow-x-auto scrollbar-none">
          <Link
            href="/"
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${activeTab === "home" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            title="Home"
          >
            <Home className="w-4 h-4" />
          </Link>

          <Link
            href="/projects"
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${activeTab === "projects" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            title="Projects Directory"
          >
            <Folder className="w-4 h-4" />
          </Link>

          <Link
            href="/skills"
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${activeTab === "tools" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            title="Tools & Skills"
          >
            <Wrench className="w-4 h-4" />
          </Link>

          <Link
            href="/about"
            className="p-1.5 sm:p-2 rounded-xl transition-all text-zinc-400 hover:text-white hover:bg-white/5"
            title="About"
          >
            <BookOpen className="w-4 h-4" />
          </Link>

          <Link
            href="/thoughts"
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${activeTab === "thoughts" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            title="Design Thoughts"
          >
            <Newspaper className="w-4 h-4" />
          </Link>

          <Link
            href="/career"
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${activeTab === "experience" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            title="Career Experience"
          >
            <Briefcase className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${activeTab === "contact" ? "bg-white/15 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            title="Contact"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN CONTAINER WITH EXACT GAP AND PADDING                  */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-24 xl:px-32 pt-20 sm:pt-40 lg:pt-44 pb-36 sm:pb-32">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-16 xl:gap-24 items-start relative">

          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: STICKY PROFILE CARD (MATCHING REFERENCE)  */}
          {/* ------------------------------------------------------- */}
          <aside className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 lg:sticky lg:top-6 xl:top-8 z-30 self-start">
            <div className="bg-white text-black rounded-[36px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-between border border-zinc-200/90">

              {/* 1. Top-Left Dashed Orange Arc (Matching Screenshot) */}
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

              {/* 2. Bottom-Left Dashed Orange Curve to Flame Badge (Matching Screenshot) */}
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

              {/* Photo Container with Orange Portrait Gradient */}
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

              {/* Profile Content */}
              <div className="text-center relative z-10">

                {/* Name directly below photo */}
                <h1 className="text-3xl font-black tracking-tight text-black font-poppins mb-3">
                  Aman Kumar
                </h1>

                {/* Central Flame Badge connected to bottom-left dashed arc */}
                <div className="flex justify-center mb-3.5 relative">
                  <div className="w-9 h-9 rounded-full bg-[#F05335] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 relative z-10">
                    <Flame className="w-4.5 h-4.5 fill-white text-white" />
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm font-semibold text-zinc-500 leading-relaxed max-w-[260px] mx-auto mb-6">
                  A Full Stack Engineer building production SaaS products.
                </p>

                {/* Social Links Row (Orange Outline Icons matching reference) */}
                <div className="flex items-center justify-center gap-5 text-[#F05335] pt-1">
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full hover:bg-orange-50 transition-colors"
                    title="Dribbble"
                  >
                    <Dribbble className="w-5 h-5 stroke-[2.2]" />
                  </a>
                  <a
                    href="https://twitter.com/amankumarweb"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full hover:bg-orange-50 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5 stroke-[2.2]" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full hover:bg-orange-50 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5 stroke-[2.2]" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full hover:bg-orange-50 transition-colors"
                    title="YouTube"
                  >
                    <Youtube className="w-5 h-5 stroke-[2.2]" />
                  </a>
                </div>

              </div>

            </div>
          </aside>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: MAIN CONTENT SECTIONS                     */}
          {/* ------------------------------------------------------- */}
          <main className="flex-1 w-full space-y-36 lg:space-y-44 xl:space-y-48 min-w-0">

            {/* HERO SECTION (#hero) */}
            <section id="hero" className="scroll-mt-28">
              {/* Massive Stacked Header — letter-by-letter fade in */}
              <div className="select-none mb-6">
                <FadeInView delay={0}>
                  <h2 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase tracking-tight leading-[0.88] block font-poppins ultra-heavy">
                    FULL STACK
                  </h2>
                </FadeInView>
                <FadeInView delay={0.12}>
                  <h2 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#262628] uppercase tracking-tight leading-[0.88] block font-poppins ultra-heavy">
                    ENGINEER
                  </h2>
                </FadeInView>
              </div>

              {/* Headline Bio */}
              <FadeInView delay={0.22}>
                <p className="text-sm sm:text-lg text-[#888888] max-w-xl leading-relaxed mb-8 sm:mb-12 font-normal">
                  Full Stack Engineer — from self-taught fundamentals to shipping production SaaS products like SnippetsX, TomatoAI, and Awasdhara.
                </p>
              </FadeInView>

              {/* Stats Row — animated counters */}
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-10 sm:pb-12 border-b border-zinc-900/80 mb-10 sm:mb-12">
                <StaggerContainer className="grid grid-cols-3 gap-3 sm:gap-10" staggerDelay={0.15}>
                  {/* Stat 1 */}
                  <motion.div variants={staggerChild}>
                    <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-poppins">
                      +<AnimatedNumber value={2} duration={1.2} />
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1.5 leading-tight font-poppins">
                      YEARS OF<br />EXPERIENCE
                    </div>
                  </motion.div>

                  {/* Stat 2 */}
                  <motion.div variants={staggerChild}>
                    <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-poppins">
                      +<AnimatedNumber value={11} duration={1.6} />
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1.5 leading-tight font-poppins">
                      PROJECTS<br />COMPLETED
                    </div>
                  </motion.div>

                  {/* Stat 3 */}
                  <motion.div variants={staggerChild}>
                    <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-poppins">
                      +<AnimatedNumber value={15} duration={1.8} />
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1.5 leading-tight font-poppins">
                      TECHNOLOGIES<br />MASTERED
                    </div>
                  </motion.div>
                </StaggerContainer>
              </div>

              {/* Bento Cards Grid matching exact reference screenshot 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left Card: Vibrant Orange (#F05335) with topographic lines */}
                <div
                  onClick={() => scrollTo("tools")}
                  className="bg-[#F05335] text-white rounded-[30px] p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between h-56 group cursor-pointer shadow-[0_15px_40px_rgba(240,83,53,0.25)] hover:shadow-[0_20px_50px_rgba(240,83,53,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Subtle Wavy Topographic Background SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                    viewBox="0 0 300 200"
                    fill="none"
                  >
                    <path
                      d="M-50 50 C 50 150, 150 -20, 350 100 M-20 120 C 80 200, 180 50, 350 160"
                      stroke="#000"
                      strokeWidth="24"
                    />
                  </svg>

                  {/* Top Left Stacked Layers Icon */}
                  <div className="relative z-10">
                    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Heading */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase leading-[1.15] max-w-[240px]">
                      FULL STACK, <br /> REAL-TIME SYSTEMS
                    </h3>
                  </div>

                  {/* Bottom Right Rounded Button with right arrow */}
                  <div className="absolute bottom-6 right-6 z-10">
                    <div className="w-10 h-10 rounded-xl border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#F05335] transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Right Card: Neon Lime (#C4F135) with zigzag geometric lines */}
                <div
                  onClick={() => scrollTo("projects")}
                  className="bg-[#C4F135] text-zinc-950 rounded-[30px] p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between h-56 group cursor-pointer shadow-[0_15px_40px_rgba(196,241,53,0.2)] hover:shadow-[0_20px_50px_rgba(196,241,53,0.35)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Subtle Geometric Zigzag Pattern SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                    viewBox="0 0 250 200"
                    fill="none"
                  >
                    <path
                      d="M10 200 L50 20 L90 200 L140 0 L180 200 L230 40"
                      stroke="#86bd00"
                      strokeWidth="3.5"
                    />
                  </svg>

                  {/* Top Left Minimalist Layout/Window Icon */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg border-2 border-zinc-950 flex flex-col justify-between p-1">
                      <div className="w-full h-2 bg-zinc-950 rounded-sm" />
                      <div className="flex gap-1 h-3">
                        <div className="w-1/2 h-full bg-zinc-950 rounded-sm" />
                        <div className="w-1/2 h-full bg-zinc-950 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase leading-[1.15] max-w-[240px]">
                      REACT, NODE.JS, <br /> NEXT.JS, MONGODB
                    </h3>
                  </div>

                  {/* Bottom Right Rounded Button with right arrow */}
                  <div className="absolute bottom-6 right-6 z-10">
                    <div className="w-10 h-10 rounded-xl border border-black/40 flex items-center justify-center text-zinc-950 group-hover:bg-zinc-950 group-hover:text-[#C4F135] transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RECENT PROJECTS SECTION (#projects) */}
            <section id="projects" className="scroll-mt-28">
              <div className="select-none mb-10">
                <FadeInView delay={0}>
                  <h2 className="text-6xl sm:text-7xl xl:text-8xl font-black text-white uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    RECENT
                  </h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <h2 className="text-6xl sm:text-7xl xl:text-8xl font-black text-zinc-800/80 uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    PROJECTS
                  </h2>
                </FadeInView>
              </div>

              <StaggerContainer className="space-y-8" staggerDelay={0.12}>
                {recentProjects.map((proj) => (
                  <motion.div key={proj.id} variants={staggerChild}>
                    <Link
                      href={proj.link}
                      className="flex items-center justify-between gap-3 sm:gap-6 group py-2 border-b border-zinc-900/60 hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                        <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden relative flex-shrink-0 shadow-md">
                          <Image
                            src={proj.thumbImage}
                            alt={proj.title}
                            fill
                            sizes="112px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#F05335] transition-colors truncate font-poppins">
                            {proj.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1 line-clamp-1 font-poppins">
                            {proj.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-[#F05335] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform p-1 sm:p-2 flex-shrink-0">
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>

              <div className="mt-8 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F05335] hover:border-[#F05335] transition-all group font-poppins"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* EXPERIENCE SECTION (#experience) */}
            <section id="experience" className="scroll-mt-28">
              <div className="select-none mb-10">
                <FadeInView delay={0}>
                  <h2 className="text-6xl sm:text-7xl font-black text-white uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    WORK
                  </h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <h2 className="text-6xl sm:text-7xl font-black text-zinc-800/80 uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    EXPERIENCE
                  </h2>
                </FadeInView>
              </div>

              <div className="space-y-6">
                {experienceList.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1a1a1c] border border-zinc-800/70 p-5 sm:p-7 rounded-3xl hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-3">
                      <span className="text-xs font-bold text-[#F05335] uppercase tracking-wider">
                        {exp.period}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{exp.role}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-2">
                <a
                  href="/experience"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F05335] hover:border-[#F05335] transition-all group"
                >
                  <span>Explore Full Career Experience & Credentials</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </section>

            {/* PREMIUM TOOLS SECTION (#tools) */}
            <section id="tools" className="scroll-mt-28">
              <div className="select-none mb-10">
                <FadeInView delay={0}>
                  <h2 className="text-6xl sm:text-7xl xl:text-8xl font-black text-white uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    PREMIUM
                  </h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <h2 className="text-6xl sm:text-7xl xl:text-8xl font-black text-zinc-800/80 uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    TOOLS
                  </h2>
                </FadeInView>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                {premiumTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer p-2 sm:p-2.5 rounded-2xl bg-zinc-950/60 sm:bg-transparent border border-zinc-800/60 sm:border-0 hover:bg-zinc-900/40 transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-13 sm:h-13 bg-white rounded-[14px] sm:rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 group-hover:shadow-[0_10px_20px_rgba(240,83,53,0.2)] transition-all duration-300">
                      {tool.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-lg font-bold text-white tracking-tight group-hover:text-[#F05335] transition-colors leading-tight truncate font-poppins">
                        {tool.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-medium text-zinc-400 mt-0.5 leading-tight truncate font-poppins">
                        {tool.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DESIGN THOUGHTS SECTION (#thoughts) */}
            <section id="thoughts" className="scroll-mt-28">
              <div className="select-none mb-10">
                <FadeInView delay={0}>
                  <h2 className="text-6xl sm:text-7xl xl:text-8xl font-black text-white uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    DESIGN
                  </h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <h2 className="text-6xl sm:text-7xl xl:text-8xl font-black text-zinc-800/80 uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    THOUGHTS
                  </h2>
                </FadeInView>
              </div>

              <StaggerContainer className="space-y-8" staggerDelay={0.13}>
                {designThoughts.map((article) => (
                  <motion.div key={article.id} variants={staggerChild}>
                    <Link
                      href={article.link}
                      className="group block py-4 border-b border-zinc-900/80 hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#F05335] transition-colors max-w-xl font-poppins">
                          {article.title}
                        </h3>
                        <div className="text-[#F05335] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform p-1 flex-shrink-0">
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mt-2.5 max-w-xl font-poppins">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between gap-4 mt-5 text-xs font-medium text-zinc-500 font-poppins">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>

              <div className="mt-8 pt-2">
                <Link
                  href="/thoughts"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F05335] hover:border-[#F05335] transition-all group font-poppins"
                >
                  <span>Read All Thoughts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* CONTACT SECTION (#contact) */}
            <section id="contact" className="scroll-mt-28 mb-24 sm:mb-32 pb-12">
              <div className="select-none mb-10">
                <FadeInView delay={0}>
                  <h2 className="text-6xl sm:text-7xl font-black text-white uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    GET IN
                  </h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <h2 className="text-6xl sm:text-7xl font-black text-zinc-800/80 uppercase tracking-tight font-poppins leading-[0.88] block ultra-heavy">
                    TOUCH
                  </h2>
                </FadeInView>
              </div>

              <FadeInView delay={0.15}>
                <div className="bg-[#1a1a1c] border border-zinc-800/90 p-6 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden mb-12">

                  {/* Contact Quick Info Badges */}
                  <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-zinc-800/80">
                    <div className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for Hire</span>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
                      Response time: &lt; 24 hrs
                    </div>
                  </div>

                  {formSubmitted ? (
                    <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                      <span>Message sent successfully! I will reply soon.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Smith"
                            className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-[#F05335] focus:ring-2 focus:ring-[#F05335]/30 transition-all shadow-inner"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Your Email</label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. alex@example.com"
                            className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-[#F05335] focus:ring-2 focus:ring-[#F05335]/30 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Your Message</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Tell me about your project or inquiry..."
                          className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-400 text-sm font-medium focus:outline-none focus:border-[#F05335] focus:ring-2 focus:ring-[#F05335]/30 transition-all shadow-inner resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-2xl bg-[#F05335] hover:bg-[#ff5d3d] active:scale-[0.99] text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(240,83,53,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                      >
                        <Send className="w-4.5 h-4.5" />
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      </button>
                    </form>
                  )}
                </div>
              </FadeInView>

              {/* Aesthetic Footer Strip */}
              <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
                <button
                  onClick={() => scrollTo("hero")}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Back to top</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

          </main>

        </div>
      </div>

    </div>
  );
}
