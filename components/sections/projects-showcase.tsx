"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ArrowRight } from "lucide-react";

const categories = [
  "All", "Full Stack", "Web Development", "Mobile App"
];

const featuredProjects = [
  {
    id: "project-1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce platform with features like real-time inventory, payment processing, and admin dashboard.",
    category: "Full Stack",
    image:"/ss-1.png",
    year: "2023",
    tags: ["Next.js", "MongoDB", "Stripe", "Redux"]
  },
  
  {
    id: "project-2",
    title: "Real Estate Platform",
    description: "Real estate platform with advanced search filters, virtual tours, and agent dashboard.",
    category: "Web Development",
    image: "/ss-3.png",
    year: "2023",
    tags: ["React", "Node.js", "MapBox", "AWS"]
  },
  {
    id: "project-3",
    title: "Learning Management",
    description: "Comprehensive LMS with video courses, quizzes, and progress tracking for students and instructors.",
    category: "Full Stack",
    image: "/lms/Screenshot 2025-05-27 131624.png",
    year: "2022",
    tags: ["MERN Stack", "WebRTC", "Socket.io"]
  }
];

// Magnetic Button with Touch Support fallbacks
const MagneticButton = ({ children, size = "default", onClick }: { children: React.ReactNode; size?: "default" | "sm"; onClick?: () => void }) => {
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
  const sizeClasses = size === "sm" ? "px-4 py-2 text-sm" : "w-full md:w-auto px-8 py-4";
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`group relative ${sizeClasses} bg-neutral-900 rounded-full overflow-hidden shadow-xl`}
    >
      <div className="absolute inset-0 bg-orange-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="flex justify-center items-center relative z-10">{children}</div>
    </motion.button>
  );
};

export function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? featuredProjects
      : featuredProjects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-0.5 bg-primary"></div>
              <span className="text-sm font-medium uppercase tracking-wider">My Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Featured Projects
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category, index) => (
              <MagneticButton key={index} size="sm" onClick={() => setActiveCategory(category)}>
                <span className="text-white font-bold tracking-wide text-sm">
                  {category}
                </span>
              </MagneticButton>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center"
        >
          <MagneticButton>
            <Link href="/projects" className="flex items-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
