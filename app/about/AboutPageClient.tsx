"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageTransition } from "@/components/page-transition";
import { useLenis } from '@/hooks/useLenis';
import { Terminal, Code2, Cpu, Globe, Sparkles } from "lucide-react";

// Categorized Skills for better organization
const skillCategories = [
  {
    name: "Languages",
    icon: <Code2 size={14} />,
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"]
  },
  {
    name: "Frontend",
    icon: <Globe size={14} />,
    items: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS", "Responsive UI", "Component-driven"]
  },
  {
    name: "Backend & APIs",
    icon: <Cpu size={14} />,
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "WebSockets", "JWT & OAuth", "Stripe"]
  },
  {
    name: "Databases",
    icon: <Cpu size={14} />,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Redis"]
  },
  {
    name: "Cloud & DevOps",
    icon: <Cpu size={14} />,
    items: ["AWS (EC2, S3, Lambda)", "Docker", "CI/CD with GitHub Actions", "Vercel", "Render", "Netlify"]
  },
  {
    name: "AI Engineering",
    icon: <Sparkles size={14} />,
    items: ["LLM APIs", "OpenAI Integration", "Claude Integration", "Prompt Engineering", "RAG Pipelines", "n8n Automation"]
  }
];

const experiences = [
  {
    period: "Oct 2025 - Present",
    role: "Full Stack Engineer",
    company: "StartupCoaching",
    description: "Build and maintain scalable full-stack applications — React/Next.js interfaces, Node.js services, REST APIs and data layers. Design and optimise data models and API contracts, cutting redundant queries and improving response times on core flows. Integrate LLM and workflow-automation features into client products, turning founder requirements into shipped releases.",
  },
  {
    period: "Jun 2024 - Oct 2025",
    role: "Full Stack Engineer",
    company: "Ninepages Techsolutions Pvt. Ltd.",
    description: "Delivered features across 3 production applications in Agile teams, contributing to a 25% increase in client engagement. Reduced API latency by ~20% via query optimisation and caching, while holding a 95% on-time sprint completion rate. Implemented secure authentication and role-based access control with JWT, plus Stripe payment flows for transactional modules.",
  },
  {
    period: "2023 - 2024",
    role: "Full Stack Developer Training",
    company: "Learn2Earn",
    description: "Completed an intensive full-stack developer training program with structured code reviews and production-style project specifications. Bridged self-taught fundamentals into job-ready practice through deadline-driven builds and real-world project patterns.",
  },
  {
    period: "2022 - 2023",
    role: "Self-taught Developer & Open Source",
    company: "Independent Learning",
    description: "Worked on personal projects, built multiple web applications, contributed to open-source repositories, and participated in coding challenges. Gained hands-on experience in full-stack web development, backend technologies, and modern JavaScript frameworks.",
  }
];

export default function AboutPageClient() {
  const { isLoading } = useLenis();

  return (
    <>
      <div
        data-scroll-container
        className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-28 pb-24"
      >
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#F05335]/15 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

        <PageTransition>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

            {/* INTRO SECTION */}
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div data-scroll data-scroll-speed="1" className="space-y-8">
                <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.25em] uppercase text-zinc-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F05335] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F05335]"></span>
                  </span>
                  <span className="font-bold text-zinc-300">About Aman Kumar</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                  Aman <br /> <span className="text-[#F05335] italic font-serif lowercase pr-4">Kumar.</span>
                </h1>
                <p className="text-base md:text-lg text-zinc-400 font-normal max-w-md leading-relaxed">
                  Full Stack Engineer with 2+ years shipping production applications end to end. Expert in React, Next.js, Node.js, TypeScript, and modern web architectures. Building AI-powered SaaS products and developer tools.
                </p>

                {/* SPECIAL SKILLS BENTO GRID */}
                <div className="pt-6 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4">Technical Arsenal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillCategories.map((cat, i) => (
                      <div
                        key={i}
                        className="bg-zinc-950/80 border border-zinc-800/80 p-5 rounded-2xl shadow-lg hover:border-[#F05335]/50 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3 text-[#F05335] font-mono text-[10px] font-bold uppercase tracking-widest">
                          {cat.icon} {cat.name}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((skill, si) => (
                            <span key={si} className="text-[11px] font-bold px-2.5 py-1 bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800/80">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="bg-zinc-950/80 border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between">
                      <Terminal size={20} className="text-[#F05335]" />
                      <p className="text-[11px] font-mono text-zinc-400 mt-4">System.ready(); <br /> {/* Always learning new stacks */}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-scroll
                data-scroll-speed="2"
                className="relative h-[550px] sm:h-[600px] rounded-[3rem] overflow-hidden border-2 border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              >
                <Image
                  src="/image.png"
                  alt="Aman Kumar — Full Stack Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                />
              </div>
            </div>

            <Separator className="my-16 bg-zinc-900" />

            {/* EDUCATION */}
            <div data-scroll data-scroll-speed="1" className="pb-12">
              <div className="mb-12">
                <span className="text-xs font-mono text-[#F05335] font-bold uppercase tracking-wider block mb-1">Education & Credentials</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                  Academic <span className="text-[#F05335] italic font-serif lowercase">Foundation</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-2 border-[#F05335] pl-8 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">Master of Computer Applications (MCA)</h3>
                  <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider">Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">Aug 2025 – Jun 2027</p>
                  <p className="text-zinc-300 text-sm leading-relaxed font-semibold">CGPA: 8.4 / 10</p>
                </div>

                <div className="border-l-2 border-zinc-700 pl-8 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">Bachelor of Computer Applications (BCA)</h3>
                  <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider">Dr. Bhimrao Ambedkar University, Agra</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">Jun 2021 – Jul 2024</p>
                  <p className="text-zinc-300 text-sm leading-relaxed font-semibold">Percentage: 74.92%</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-bold mb-4">Relevant Coursework</h3>
                <div className="flex flex-wrap gap-2">
                  {["Data Structures & Algorithms", "Operating Systems", "DBMS", "OOP", "Computer Networks", "Web Development"].map((course, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-bold mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2.5 rounded-xl bg-[#F05335]/15 border border-[#F05335]/30 text-sm font-semibold text-[#F05335]">
                    Generative AI — LinkedIn Learning, 2024
                  </div>
                  <div className="px-4 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-sm font-semibold text-cyan-400">
                    MERN Stack Development — Simplilearn, 2024
                  </div>
                </div>
              </div>
            </div>

            {/* WORK EXPERIENCE */}
            <div data-scroll data-scroll-speed="1">
              <div className="mb-12">
                <span className="text-xs font-mono text-[#F05335] font-bold uppercase tracking-wider block mb-1">Career Journey</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                  Experience <span className="text-[#F05335] italic font-serif lowercase">Log</span>
                </h2>
              </div>

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-[220px_1fr] gap-6 group"
                  >
                    <div className="font-mono text-sm flex flex-col gap-1">
                      <span className="text-[#F05335] font-black tracking-[0.2em] uppercase">0{index + 1}</span>
                      <span className="text-zinc-500 font-bold">[{exp.period}]</span>
                    </div>
                    <div className="border-l-2 border-zinc-800/80 pl-8 group-hover:border-[#F05335] transition-all space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white group-hover:text-[#F05335] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider">{exp.company}</p>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">{exp.description}</p>
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
