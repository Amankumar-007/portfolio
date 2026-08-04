"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Search, X, Zap, Terminal, Cpu, Layout, Database, Settings, ArrowUpRight, Code, GitBranch, Globe, Shield, Brain, BookOpen } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useLenis } from '@/hooks/useLenis';

// --- Data ---
const getFavicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const categories = [
  { name: "All", icon: <Terminal size={14} /> },
  { name: "Frontend", icon: <Globe size={14} /> },
  { name: "Backend", icon: <Cpu size={14} /> },
  { name: "Database", icon: <Database size={14} /> },
  { name: "DevOps", icon: <Settings size={14} /> },
  { name: "Design", icon: <Layout size={14} /> },
  { name: "Tools", icon: <Zap size={14} /> },
  { name: "AI Tools", icon: <Brain size={14} /> },
];

const technologies = [
  // --- CORE STACK ---
  { id: "tech-python", name: "Python", category: "Backend", description: "High-performance backend API services, data engineering, AI/ML integrations, and automation.", experience: "Expert", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", projects: 15, details: ["FastAPI", "Django", "AI & PyTorch", "Pandas", "Scraping"] },
  { id: "tech-aws", name: "AWS", category: "DevOps", description: "Cloud computing infrastructure, serverless architecture, S3 storage, and global CDN.", experience: "Advanced", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", projects: 12, details: ["EC2 & S3", "Lambda", "CloudFront", "IAM", "ECS"] },
  { id: "tech-2", name: "Next.js", category: "Frontend", description: "Creating fast, SEO-friendly applications with server-side rendering and App Router.", experience: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", projects: 20, details: ["App Router", "Server Components", "API Routes", "ISR"] },
  { id: "tech-1", name: "React.js", category: "Frontend", description: "Building modern user interfaces with React's component-based architecture.", experience: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", projects: 30, details: ["Components", "Hooks", "Context", "Redux", "Performance"] },
  { id: "tech-3", name: "Node.js", category: "Backend", description: "Developing scalable backend services and REST APIs.", experience: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", projects: 25, details: ["Express.js", "REST APIs", "Authentication", "Middleware"] },
  { id: "tech-5", name: "TypeScript", category: "Frontend", description: "Writing type-safe code for better maintainability.", experience: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", projects: 25, details: ["Types", "Interfaces", "Generics", "Decorators"] },
  { id: "tech-6", name: "Tailwind CSS", category: "Frontend", description: "Creating beautiful, responsive designs with utility-first CSS.", experience: "Advanced", icon: "🎨", projects: 20, details: ["Responsive Design", "Themes", "Components", "Animations"] },
  { id: "tech-8", name: "Express.js", category: "Backend", description: "Building robust backend APIs and web applications.", experience: "Advanced", icon: "🔧", projects: 20, details: ["Routing", "Middleware", "Error Handling", "Auth"] },

  // --- DATABASES ---
  { id: "tech-mongodb", name: "MongoDB", category: "Database", description: "Flexible NoSQL database for modern applications.", experience: "Advanced", icon: getFavicon("mongodb.com"), projects: 15, details: ["Mongoose", "Aggregation", "Indexing", "Atlas"] },
  { id: "tech-mysql", name: "MySQL", category: "Database", description: "Relational database management system.", experience: "Advanced", icon: getFavicon("mysql.com"), projects: 12, details: ["SQL Queries", "Table Design", "Joins", "Optimization"] },
  { id: "tech-postgresql", name: "PostgreSQL", category: "Database", description: "Advanced open-source relational database.", experience: "Intermediate", icon: getFavicon("postgresql.org"), projects: 8, details: ["Prisma", "Complex Queries", "JSONB", "Transactions"] },
  { id: "tech-firebase", name: "Firebase", category: "Database", description: "Google's mobile and web application development platform.", experience: "Advanced", icon: getFavicon("firebase.google.com"), projects: 20, details: ["Firestore", "Authentication", "Cloud Functions", "Hosting"] },
  { id: "tech-supabase", name: "Supabase", category: "Database", description: "The open source Firebase alternative.", experience: "Intermediate", icon: getFavicon("supabase.com"), projects: 6, details: ["PostgreSQL", "Realtime", "Auth", "Storage"] },

  // --- CODE EDITORS ---
  { id: "tech-vscode", name: "VS Code", category: "Tools", description: "Versatile code editor with a massive ecosystem.", experience: "Advanced", icon: getFavicon("code.visualstudio.com"), projects: 50, details: ["Extensions", "Debugging", "Shortcuts", "Themes"] },
  { id: "tech-webstorm", name: "WebStorm", category: "Tools", description: "Professional IDE for JavaScript/TypeScript.", experience: "Intermediate", icon: getFavicon("jetbrains.com/webstorm"), projects: 10, details: ["Intelligent Coding", "Refactoring", "Testing"] },
  { id: "tech-sublime", name: "Sublime Text", category: "Tools", description: "Sophisticated text editor for code, markup and prose.", experience: "Advanced", icon: getFavicon("sublimetext.com"), projects: 15, details: ["Performance", "Package Control", "Customization"] },
  { id: "tech-intellij", name: "IntelliJ IDEA", category: "Tools", description: "Capable and ergonomic IDE for JVM development.", experience: "Intermediate", icon: getFavicon("jetbrains.com/idea"), projects: 8, details: ["Java", "Framework Support", "Productivity"] },

  // --- VERSION CONTROL ---
  { id: "tech-git", name: "Git", category: "Tools", description: "Distributed version control system.", experience: "Advanced", icon: getFavicon("git-scm.com"), projects: 60, details: ["Branching", "Merging", "Rebasing", "Stashing"] },
  { id: "tech-github", name: "GitHub", category: "Tools", description: "Platform for code hosting and collaboration.", experience: "Advanced", icon: getFavicon("github.com"), projects: 100, details: ["Actions", "PRs", "Projects", "Packages"] },
  { id: "tech-gitlab", name: "GitLab", category: "Tools", description: "Complete DevOps platform.", experience: "Intermediate", icon: getFavicon("gitlab.com"), projects: 15, details: ["CI/CD Pipelines", "Wiki", "Issue Tracking"] },
  { id: "tech-bitbucket", name: "Bitbucket", category: "Tools", description: "Git repository management solution.", experience: "Intermediate", icon: getFavicon("bitbucket.org"), projects: 10, details: ["Pipelines", "Jira Integration", "Code Search"] },
  { id: "tech-sourcetree", name: "SourceTree", category: "Tools", description: "Graphical Git client for Windows and Mac.", experience: "Advanced", icon: getFavicon("sourcetreeapp.com"), projects: 20, details: ["Visual History", "Conflict Resolution", "Submodules"] },

  // --- API TOOLS ---
  { id: "tech-postman", name: "Postman", category: "Tools", description: "The collaboration platform for API development.", experience: "Advanced", icon: getFavicon("postman.com"), projects: 40, details: ["Collections", "Environments", "Mock Servers", "Testing"] },
  { id: "tech-insomnia", name: "Insomnia", category: "Tools", description: "The open-source API client for GraphQL and REST.", experience: "Intermediate", icon: getFavicon("insomnia.rest"), projects: 15, details: ["Design", "Debug", "Test"] },
  { id: "tech-swagger", name: "Swagger", category: "Tools", description: "API documentation and design tools.", experience: "Advanced", icon: getFavicon("swagger.io"), projects: 25, details: ["OpenAPI", "UI", "Codegen"] },
  { id: "tech-hoppscotch", name: "Hoppscotch", category: "Tools", description: "Open source API development ecosystem.", experience: "Intermediate", icon: getFavicon("hoppscotch.io"), projects: 8, details: ["Web-based", "Real-time", "Collections"] },
  { id: "tech-jmeter", name: "JMeter", category: "Tools", description: "Load testing and performance measurement.", experience: "Intermediate", icon: getFavicon("jmeter.apache.org"), projects: 5, details: ["Load Test", "Stress Test", "Reporting"] },
  { id: "tech-chrome", name: "Chrome DevTools", category: "Tools", description: "Web authoring and debugging tools built into Google Chrome.", experience: "Advanced", icon: getFavicon("developer.chrome.com"), projects: 100, details: ["Console", "Network", "Performance", "Elements"] },

  // --- DESIGN ---
  { id: "tech-figma", name: "Figma", category: "Design", description: "Collaborative interface design tool.", experience: "Advanced", icon: getFavicon("figma.com"), projects: 30, details: ["Auto Layout", "Prototyping", "Design Systems"] },
  { id: "tech-xd", name: "Adobe XD", category: "Design", description: "Vector-based UI/UX design tool.", experience: "Intermediate", icon: getFavicon("adobe.com"), projects: 12, details: ["Artboards", "Assets", "Interactivity"] },
  { id: "tech-canva", name: "Canva", category: "Design", description: "Online graphic design tool.", experience: "Advanced", icon: getFavicon("canva.com"), projects: 45, details: ["Templates", "Branding", "Social Media"] },
  { id: "tech-dribbble", name: "Dribbble", category: "Design", description: "Platform to showcase and explore design.", experience: "Intermediate", icon: getFavicon("dribbble.com"), projects: 10, details: ["Portfolio", "Community", "Trends"] },
  { id: "tech-behance", name: "Behance", category: "Design", description: "Social media platform to discover creative work.", experience: "Intermediate", icon: getFavicon("behance.net"), projects: 10, details: ["Showcase", "Inspiration", "Case Studies"] },

  // --- DEPLOYMENT & DEVOPS ---
  { id: "tech-vercel", name: "Vercel", category: "DevOps", description: "Frontend cloud platform for frameworks.", experience: "Advanced", icon: getFavicon("vercel.com"), projects: 40, details: ["Deployments", "Analytics", "Edge Functions"] },
  { id: "tech-netlify", name: "Netlify", category: "DevOps", description: "Development platform for modern web projects.", experience: "Advanced", icon: getFavicon("netlify.com"), projects: 25, details: ["Auto Deployment", "Forms", "Identity"] },
  { id: "tech-heroku", name: "Heroku", category: "DevOps", description: "Platform as a service (PaaS) for app deployment.", experience: "Intermediate", icon: getFavicon("heroku.com"), projects: 15, details: ["Dynos", "Add-ons", "CLI"] },
  { id: "tech-render", name: "Render", category: "DevOps", description: "Unified cloud to build and run all your apps and websites.", experience: "Intermediate", icon: getFavicon("render.com"), projects: 10, details: ["Web Services", "Databases", "Statics"] },
  { id: "tech-aws-dup", name: "AWS Services", category: "DevOps", description: "Comprehensive cloud computing platform.", experience: "Intermediate", icon: getFavicon("aws.amazon.com"), projects: 12, details: ["S3", "EC2", "Lambda", "IAM"] },
  { id: "tech-docker", name: "Docker", category: "DevOps", description: "OS-level virtualization for software delivery.", experience: "Advanced", icon: getFavicon("docker.com"), projects: 20, details: ["Images", "Containers", "Compose", "Registry"] },
  { id: "tech-kubernetes", name: "Kubernetes", category: "DevOps", description: "Container orchestration system.", experience: "Intermediate", icon: getFavicon("kubernetes.io"), projects: 5, details: ["Pods", "Nodes", "Deployments"] },
  { id: "tech-npm", name: "npm", category: "DevOps", description: "Default package manager for Node.js.", experience: "Advanced", icon: getFavicon("npmjs.com"), projects: 100, details: ["Scripts", "Dependency Management", "Publishing"] },
  { id: "tech-yarn", name: "Yarn", category: "DevOps", description: "Fast, reliable, and secure dependency management.", experience: "Advanced", icon: getFavicon("yarnpkg.com"), projects: 80, details: ["Workspaces", "Plug'n'Play", "Speed"] },
  { id: "tech-webpack", name: "Webpack", category: "DevOps", description: "Static module bundler for modern JS apps.", experience: "Advanced", icon: getFavicon("webpack.js.org"), projects: 35, details: ["Loaders", "Plugins", "Optimization"] },

  // --- MONITORING ---
  { id: "tech-sentry", name: "Sentry", category: "Tools", description: "Application monitoring and error tracking.", experience: "Advanced", icon: getFavicon("sentry.io"), projects: 15, details: ["Alerts", "Releases", "Source Maps"] },
  { id: "tech-logrocket", name: "LogRocket", category: "Tools", description: "Frontend monitoring and session replay.", experience: "Intermediate", icon: getFavicon("logrocket.com"), projects: 8, details: ["Session Replay", "Network Logs", "UX Monitoring"] },
  { id: "tech-datadog", name: "Datadog", category: "Tools", description: "Monitoring service for cloud-scale applications.", experience: "Intermediate", icon: getFavicon("datadoghq.com"), projects: 5, details: ["APM", "Logs", "Dashboards"] },
  { id: "tech-newrelic", name: "New Relic", category: "Tools", description: "Observability platform for the whole stack.", experience: "Intermediate", icon: getFavicon("newrelic.com"), projects: 5, details: ["Performance", "Error Rates", "Infrastructure"] },

  // --- AI TOOLS ---
  { id: "tech-chatgpt", name: "ChatGPT", category: "AI Tools", description: "Large language model for conversational AI.", experience: "Advanced", icon: getFavicon("openai.com"), projects: 50, details: ["Prompts", "GPT-4", "Coding Assistance"] },
  { id: "tech-copilot", name: "GitHub Copilot", category: "AI Tools", description: "AI-powered code completion tool.", experience: "Advanced", icon: getFavicon("github.com"), projects: 100, details: ["Pair Programming", "Efficiency", "Contextual Suggestions"] },
  { id: "tech-n8n", name: "n8n", category: "AI Tools", description: "Extendable workflow automation tool.", experience: "Intermediate", icon: getFavicon("n8n.io"), projects: 10, details: ["Nodes", "Workflows", "Self-hosted"] },
  { id: "tech-zapier", name: "Zapier", category: "AI Tools", description: "Easy automation for busy people.", experience: "Advanced", icon: getFavicon("zapier.com"), projects: 30, details: ["Zaps", "Integrations", "Automation"] },
  { id: "tech-make", name: "Make", category: "AI Tools", description: "Visual automation platform.", experience: "Intermediate", icon: getFavicon("make.com"), projects: 15, details: ["Scenarios", "Modules", "Data Flow"] },

  // --- LEARNING ---
  { id: "tech-leetcode", name: "LeetCode", category: "Tools", description: "Platform for improving coding skills.", experience: "Advanced", icon: getFavicon("leetcode.com"), projects: 300, details: ["Algorithms", "Data Structures", "Preparation"] },
  { id: "tech-hackerrank", name: "HackerRank", category: "Tools", description: "Skills-based platform for developers.", experience: "Advanced", icon: getFavicon("hackerrank.com"), projects: 50, details: ["Practice", "Challenges", "Ranking"] },
  { id: "tech-fcc", name: "freeCodeCamp", category: "Tools", description: "Learn to code for free.", experience: "Advanced", icon: getFavicon("freecodecamp.org"), projects: 10, details: ["Certifications", "Full Stack", "Community"] },
  { id: "tech-codepen", name: "CodePen", category: "Tools", description: "Social development environment for designers.", experience: "Advanced", icon: getFavicon("codepen.io"), projects: 100, details: ["Pens", "Projects", "Demos"] },
  { id: "tech-stackoverflow", name: "Stack Overflow", category: "Tools", description: "Knowledge-sharing platform for developers.", experience: "Advanced", icon: getFavicon("stackoverflow.com"), projects: 1000, details: ["Q&A", "Debugging", "Contributions"] },
];

export default function SkillsPageClient() {
  const { isLoading } = useLenis();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<any | null>(null);

  // Filter Logic
  const filteredTechnologies = technologies
    .filter(tech => activeCategory === "All" || tech.category === activeCategory)
    .filter(tech =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div data-scroll-container className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#F05335] selection:text-white font-sans overflow-x-hidden pt-28 pb-24">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#F05335]/15 via-transparent to-transparent pointer-events-none z-0 blur-3xl" />

      {/* --- ROUGH GRAIN ENGINE --- */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.18] contrast-150 mix-blend-overlay">
        <filter id="roughNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>

      <PageTransition>
        <div className="relative z-10 container max-w-7xl px-6 pt-12 pb-24 mx-auto">
          
          {/* HEADER SECTION */}
          <header className="mb-16">
            <div className="flex items-center gap-2 text-[#F05335] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              <Terminal size={14} /> <span>Arsenal.Index_v2.6</span>
            </div>
            <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] uppercase mb-4 text-white">
              Technical <br /> <span className="text-[#F05335] italic font-serif lowercase pr-4">Expertise.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl leading-tight">
              A detailed map of my technical capabilities and development standards.
            </p>
          </header>

          {/* CONTROLS AREA - Brutalist Sharp Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border-2 rounded-none font-bold uppercase tracking-tighter transition-all text-xs md:text-sm cursor-pointer ${
                    activeCategory === cat.name
                      ? "bg-white text-black border-white shadow-[4px_4px_0px_0px_rgba(240,83,53,1)]"
                      : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-[350px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="FIND_TECH.EXE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-zinc-950 border-2 border-zinc-800 rounded-none outline-none font-bold uppercase text-[10px] text-white placeholder-zinc-500 tracking-widest focus:border-[#F05335] focus:shadow-[4px_4px_0px_0px_rgba(240,83,53,1)] transition-all"
              />
            </div>
          </div>

          {/* SKILLS GRID - Brutalist Sharp Border-Collapse */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-zinc-800">
            <AnimatePresence mode="popLayout">
              {filteredTechnologies.map((tech) => (
                <motion.div
                  layoutId={`card-${tech.id}`}
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative border-r border-b border-zinc-800 p-8 md:p-10 cursor-pointer bg-zinc-950/90 overflow-hidden transition-colors hover:bg-zinc-900"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <motion.div layoutId={`icon-${tech.id}`} className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {tech.icon.startsWith("http") ? (
                          <Image src={tech.icon} alt={tech.name} width={48} height={48} unoptimized className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-5xl">{tech.icon}</span>
                        )}
                      </motion.div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F05335] font-bold">
                        {tech.experience}
                      </span>
                    </div>
                    <motion.h3 layoutId={`title-${tech.id}`} className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#F05335] transition-colors mb-4">
                      {tech.name}
                    </motion.h3>
                    <motion.p layoutId={`desc-${tech.id}`} className="text-sm font-medium text-zinc-400 leading-relaxed line-clamp-2">
                      {tech.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* --- MODAL DIALOG --- */}
        <AnimatePresence>
          {selectedTech && (
            <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTech(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              <motion.div
                layoutId={`card-${selectedTech.id}`}
                className="relative w-full max-w-xl bg-[#0d0d0f] border-4 border-zinc-700 shadow-[15px_15px_0px_0px_rgba(240,83,53,1)] rounded-none overflow-hidden text-white"
              >
                <div className="relative z-10">
                  <div className="bg-zinc-950 border-b-2 border-zinc-800 p-6 md:p-8 flex justify-between items-center">
                    <div className="flex items-center gap-4 md:gap-6">
                      <motion.div layoutId={`icon-${selectedTech.id}`} className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        {selectedTech.icon.startsWith("http") ? (
                          <Image src={selectedTech.icon} alt={selectedTech.name} width={80} height={80} unoptimized className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-4xl md:text-6xl">{selectedTech.icon}</span>
                        )}
                      </motion.div>
                      <div>
                        <Badge className="bg-[#F05335] text-white rounded-none border-none px-2 mb-1 uppercase font-black tracking-widest text-[8px]">
                          {selectedTech.category}
                        </Badge>
                        <motion.h2 layoutId={`title-${selectedTech.id}`} className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">
                          {selectedTech.name}
                        </motion.h2>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedTech(null)} 
                      className="hover:rotate-90 transition-transform p-2 border-2 border-zinc-700 text-white bg-zinc-900 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-6 md:p-8 space-y-6 md:space-y-8 bg-[#0d0d0f]">
                    <motion.p layoutId={`desc-${selectedTech.id}`} className="text-lg md:text-xl font-bold tracking-tight text-zinc-300 italic">
                      &quot;{selectedTech.description}&quot;
                    </motion.p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 mb-3">Skill_Level</h4>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-3 bg-zinc-900 border border-zinc-700">
                             <div className={`h-full bg-[#F05335] border-r border-zinc-700 ${selectedTech.experience === 'Advanced' ? 'w-[90%]' : 'w-[65%]'}`} />
                          </div>
                          <span className="font-black text-xs uppercase text-[#F05335]">{selectedTech.experience}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 mb-3">Stack_Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTech.details.map((detail: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-zinc-950 border-2 border-zinc-800 text-zinc-300 font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white p-4 md:p-6 flex justify-between items-center font-mono text-[9px] tracking-widest uppercase border-t border-zinc-800">
                    <span className="text-zinc-400">Usage: {selectedTech.projects} Active_Builds</span>
                    <button 
                      onClick={() => setSelectedTech(null)} 
                      className="flex items-center gap-1 text-[#F05335] font-bold hover:underline group cursor-pointer"
                    >
                      Close_Window <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageTransition>
    </div>
  );
}