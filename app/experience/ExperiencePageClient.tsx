"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Folder,
  Briefcase,
  Wrench,
  Edit3,
  Flame,
  Dribbble,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle2,
  BookOpen,
  Newspaper,
} from "lucide-react";

const experienceTimeline = [
  {
    id: "exp-1",
    period: "OCT 2025 - PRESENT",
    role: "Full Stack Engineer",
    company: "StartupCoaching",
    logo: "/logos/startupcoaching-logo.png",
    location: "Delhi, India",
    type: "Full-Time · On-site",
    duration: "11 mos",
    highlights: [
      "Developing scalable web applications and digital solutions at StartupCoaching.in.",
      "Working across frontend, backend, APIs, databases, and performance optimization to deliver seamless user experiences.",
      "Collaborating directly with the product team to ship features end-to-end, from schema to UI."
    ],
    skills: ["Full Stack", "Next.js", "TypeScript", "REST APIs", "Tailwind CSS", "Git"]
  },
  {
    id: "exp-2",
    period: "JUN 2024 - OCT 2025",
    role: "Full Stack Engineer",
    company: "Ninepages Techsolutions Pvt. Ltd.",
    logo: "/logos/ninepagestech-logo.png",
    location: "Agra, Uttar Pradesh, India",
    type: "Full-Time · On-site",
    duration: "1 yr 5 mos",
    highlights: [
      "Built and maintained client web applications end-to-end as a Full Stack Engineer.",
      "Designed MongoDB schemas and REST APIs, and implemented Redux-driven React frontends.",
      "Shipped a full role-based Learning Management System (LMS) covering admin, trainer, student, and examiner workflows.",
      "Worked on-site with a small team, owning features across the full stack rather than a single layer."
    ],
    skills: ["Full Stack", "Redux.js", "Express.js", "MongoDB", "React.js", "Node.js"]
  },
  {
    id: "exp-3",
    period: "2023 - 2024",
    role: "Full Stack Developer Training",
    company: "Learn2Earn",
    location: "Structured Training Program",
    type: "Training Program",
    highlights: [
      "Completed an intensive full-stack developer training program bridging self-taught fundamentals into job-ready practice.",
      "Practiced structured code reviews, deadline-driven builds, and production-style project specs.",
      "Built full-stack web applications from scratch under real deadlines and review cycles."
    ],
    skills: ["JavaScript (ES6+)", "React.js", "Node.js", "MongoDB", "Express.js", "Git & GitHub"]
  },
  {
    id: "exp-4",
    period: "2022 - 2023",
    role: "Intern Developer",
    company: "Self-learning and Open Source Projects",
    location: "Remote / Independent",
    type: "Self-Directed",
    highlights: [
      "Worked on personal projects, contributed to open-source, and participated in coding challenges to enhance development skills.",
      "Gained hands-on experience in web development and backend technologies.",
      "Built the foundation in HTML, CSS, and JavaScript that later became the basis for full-stack engineering."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Git", "Open Source"]
  }
];

export default function ExperiencePageClient() {
  return (
    <div className="bg-[#121212] text-zinc-100 min-h-screen selection:bg-[#F05335] selection:text-white font-sans antialiased relative">

      {/* MOBILE ONLY: LIQUID GLASS BOTTOM DOCK */}
      <header className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] sm:hidden w-auto max-w-[95vw]">
        <div className="liquid-glass-dock px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300">
          <Link
            href="/"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Projects"
          >
            <Folder className="w-4 h-4" />
          </Link>
          <Link
            href="/skills"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Skills"
          >
            <Wrench className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="About"
          >
            <BookOpen className="w-4 h-4" />
          </Link>
          <Link
            href="/thoughts"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Thoughts"
          >
            <Newspaper className="w-4 h-4" />
          </Link>
          <Link
            href="/experience"
            className="p-2 rounded-full bg-[#F05335] text-white shadow-md shadow-[#F05335]/30 transition-all"
            title="Experience"
          >
            <Briefcase className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Edit3"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Experience Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left Sticky Profile Card */}
          <aside className="w-full lg:w-[340px] xl:w-[360px] lg:sticky lg:top-28 shrink-0">

            <div className="bg-[#f7f5f2] rounded-3xl p-6 sm:p-8 text-zinc-900 shadow-2xl relative overflow-hidden border border-zinc-200">

              {/* Status Badge Top Right */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </div>

              {/* Profile Image */}
              <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/aman.jpg"
                  alt="Aman Kumar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Profile Details */}
              <div className="text-center relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-black font-sans mb-3">
                  Aman Kumar
                </h1>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm font-semibold text-zinc-500 leading-relaxed max-w-[260px] mx-auto mb-6">
                  A Full Stack Engineer building production SaaS products.
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
                2+ years of professional experience in full stack engineering — from a self-taught
                intern to a Full Stack Engineer shipping production applications.
              </p>
            </div>

            {/* Career Metrics Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#F05335]">2+</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Years Experience</div>
              </div>
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#C4F135]">11+</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Projects Shipped</div>
              </div>
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-cyan-400">2</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Companies</div>
              </div>
              <div className="bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-purple-400">15+</div>
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Technologies</div>
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
                    <div className="flex items-start gap-3">
                      {"logo" in item && item.logo && (
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0 relative mt-0.5">
                          <Image src={item.logo} alt={`${item.company} logo`} fill sizes="40px" className="object-contain p-1" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-[#F05335] tracking-widest uppercase block mb-1">
                          {item.period}{"duration" in item && item.duration ? ` · ${item.duration}` : ""}
                        </span>
                        <h3 className="text-2xl font-black text-white">{item.role}</h3>
                        <div className="text-sm font-semibold text-zinc-400 mt-0.5">
                          {item.company} • <span className="text-zinc-500">{item.location}</span>
                        </div>
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

            {/* Explore More */}
            <div className="pt-4">
              <Link
                href="/thoughts"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F05335] hover:border-[#F05335] transition-all"
              >
                <span>Read Notes on Building This Career</span>
              </Link>
            </div>

          </main>

        </div>
      </div>

    </div>
  );
}
