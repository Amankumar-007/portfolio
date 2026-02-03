"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Search, X, Zap, Terminal, Cpu, Layout, Database, Settings, ArrowUpRight } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

// --- Data ---
const categories = [
  { name: "All", icon: <Terminal size={14}/> },
  { name: "Frontend", icon: <Layout size={14}/> },
  { name: "Backend", icon: <Cpu size={14}/> },
  { name: "Database", icon: <Database size={14}/> },
  { name: "Tools", icon: <Settings size={14}/> },
];

const technologies = [
  { id: "tech-1", name: "React.js", category: "Frontend", description: "Building modern user interfaces with React's component-based architecture.", experience: "Advanced", icon: "📱", projects: 15, details: ["Components", "Hooks", "Context", "Redux", "Performance"] },
  { id: "tech-2", name: "Next.js", category: "Frontend", description: "Creating fast, SEO-friendly applications with server-side rendering.", experience: "Advanced", icon: "⚡", projects: 10, details: ["App Router", "Server Components", "API Routes", "ISR"] },
  { id: "tech-3", name: "Node.js", category: "Backend", description: "Developing scalable backend services and REST APIs.", experience: "Advanced", icon: "🚀", projects: 12, details: ["Express.js", "REST APIs", "Authentication", "Middleware"] },
  { id: "tech-4", name: "MongoDB", category: "Database", description: "Building flexible and scalable database solutions.", experience: "Advanced", icon: "🗄️", projects: 8, details: ["Schemas", "Aggregation", "Indexing", "Atlas"] },
  { id: "tech-5", name: "TypeScript", category: "Frontend", description: "Writing type-safe code for better maintainability.", experience: "Intermediate", icon: "📘", projects: 7, details: ["Types", "Interfaces", "Generics", "Decorators"] },
  { id: "tech-6", name: "Tailwind CSS", category: "Frontend", description: "Creating beautiful, responsive designs with utility-first CSS.", experience: "Advanced", icon: "🎨", projects: 10, details: ["Responsive Design", "Themes", "Components", "Animations"] },
  { id: "tech-7", name: "Git & GitHub", category: "Tools", description: "Version control and collaborative development.", experience: "Advanced", icon: "📊", projects: 20, details: ["Version Control", "Branching", "PRs", "CI/CD"] },
  { id: "tech-8", name: "Express.js", category: "Backend", description: "Building robust backend APIs and web applications.", experience: "Advanced", icon: "🔧", projects: 10, details: ["Routing", "Middleware", "Error Handling", "Auth"] },
  { id: "tech-9", name: "Docker", category: "DevOps", description: "Containerizing applications for consistent deployment.", experience: "Intermediate", icon: "🐳", projects: 5, details: ["Containers", "Docker Compose", "Multi-stage Builds"] }
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<any | null>(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Locomotive Scroll implementation
  useEffect(() => {
    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll({
          el: containerRef.current as unknown as HTMLElement,
          smooth: true,
          multiplier: 1,
          lerp: 0.1,
        });

        // Hide default scrollbar
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        setIsLoading(false);

        setTimeout(() => {
          locomotiveScroll.update();
        }, 2000);

        return () => {
          if (locomotiveScroll) {
            locomotiveScroll.destroy();
          }
          // Restore default scrollbar
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        };
      } catch (error) {
        console.error('Error loading LocomotiveScroll:', error);
        setIsLoading(false);
        
        // Fallback to regular scroll reset
        const body = document.body;
        const html = document.documentElement;
        
        body.classList.remove('has-scroll-smooth', 'case-study-page', 'scrolled', 'overflow-hidden', 'no-scroll');
        html.classList.remove('has-scroll-smooth', 'overflow-hidden');
        
        body.style.overflow = '';
        body.style.position = '';
        body.style.height = '';
        body.style.top = '';
        html.style.overflow = '';
        html.style.position = '';
        html.style.height = '';
        
        body.style.overflowY = 'auto';
        html.style.overflowY = 'auto';
        
        window.scrollTo(0, 0);
      }
    })();
  }, []);

  // Filter Logic
  const filteredTechnologies = technologies
    .filter(tech => activeCategory === "All" || tech.category === activeCategory)
    .filter(tech =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div ref={containerRef} data-scroll-container className="relative min-h-screen bg-[#fffcf9] text-[#1a1a1a] selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* --- ROUGH GRAIN ENGINE --- */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.25] contrast-150 mix-blend-multiply">
        <filter id="roughNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#roughNoise)" />
      </svg>
      
      {/* BACKGROUND BLOBS */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/30 rounded-full blur-[100px] z-0 pointer-events-none" />

      <PageTransition>
        <div className="relative z-10 container max-w-7xl px-6 pt-32 pb-24 mx-auto">
          
          {/* HEADER SECTION */}
          <header className="mb-16">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              <Terminal size={14} /> <span>Arsenal.Index_v2.6</span>
            </div>
            <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] uppercase mb-4">
              Technical <br /> <span className="text-orange-500 italic font-serif lowercase pr-4">Expertise.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-tight">
              A detailed map of my technical capabilities and development standards.
            </p>
          </header>

          {/* CONTROLS AREA - Fixed Mobile Wrap */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border-2 font-bold uppercase tracking-tighter transition-all text-xs md:text-sm ${
                    activeCategory === cat.name 
                      ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(251,146,60,1)]" 
                      : "bg-white border-black/10 hover:border-black"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-[350px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="FIND_TECH.EXE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black rounded-none outline-none font-bold uppercase text-[10px] tracking-widest focus:shadow-[4px_4px_0px_0px_rgba(251,146,60,1)] transition-all"
              />
            </div>
          </div>

          {/* SKILLS GRID - Brutalist Border-Collapse */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black">
            <AnimatePresence mode="popLayout">
              {filteredTechnologies.map((tech) => (
                <motion.div
                  layoutId={`card-${tech.id}`}
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative border-r border-b border-black p-8 md:p-10 cursor-pointer bg-white overflow-hidden transition-colors hover:bg-orange-50"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <motion.div layoutId={`icon-${tech.id}`} className="text-5xl group-hover:scale-110 transition-transform">
                        {tech.icon}
                      </motion.div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                        {tech.experience}
                      </span>
                    </div>
                    <motion.h3 layoutId={`title-${tech.id}`} className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">
                      {tech.name}
                    </motion.h3>
                    <motion.p layoutId={`desc-${tech.id}`} className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
                      {tech.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* --- MODAL (Full Implementation) --- */}
        <AnimatePresence>
          {selectedTech && (
            <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTech(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              
              <motion.div
                layoutId={`card-${selectedTech.id}`}
                className="relative w-full max-w-xl bg-[#fffcf9] border-4 border-black shadow-[15px_15px_0px_0px_rgba(251,146,60,1)] overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10">
                  <div className="bg-white border-b-2 border-black p-6 md:p-8 flex justify-between items-center">
                    <div className="flex items-center gap-4 md:gap-6">
                      <motion.div layoutId={`icon-${selectedTech.id}`} className="text-4xl md:text-6xl">
                        {selectedTech.icon}
                      </motion.div>
                      <div>
                        <Badge className="bg-orange-500 text-white rounded-none border-none px-2 mb-1 uppercase font-black tracking-widest text-[8px]">
                          {selectedTech.category}
                        </Badge>
                        <motion.h2 layoutId={`title-${selectedTech.id}`} className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
                          {selectedTech.name}
                        </motion.h2>
                      </div>
                    </div>
                    <button onClick={() => setSelectedTech(null)} className="hover:rotate-90 transition-transform p-2 border-2 border-black">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                    <motion.p layoutId={`desc-${selectedTech.id}`} className="text-lg md:text-xl font-bold tracking-tight text-slate-800 italic">
                      &quot;{selectedTech.description}&quot;
                    </motion.p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Skill_Level</h4>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-3 bg-slate-200 border border-black">
                             <div className={`h-full bg-orange-500 border-r border-black ${selectedTech.experience === 'Advanced' ? 'w-[90%]' : 'w-[65%]'}`} />
                          </div>
                          <span className="font-black text-xs uppercase">{selectedTech.experience}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Stack_Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTech.details.map((detail: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-white border-2 border-black font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white p-4 md:p-6 flex justify-between items-center font-mono text-[9px] tracking-widest uppercase">
                    <span>Usage: {selectedTech.projects} Active_Builds</span>
                    <button className="flex items-center gap-1 text-orange-400 font-bold hover:underline group">
                      Review_Work <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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