"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { ArrowRight } from "lucide-react";

const categories = [
  "All", "UI/UX Design", "Web Development", "Branding"
];

const featuredProjects = [
  {
    id: "project-1",
    title: "E-commerce Website Redesign",
    description: "Complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
    category: "UI/UX Design",
    image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg",
    year: "2023"
  },
  {
    id: "project-2",
    title: "Financial App Design",
    description: "Designed a modern finance tracking application with focus on data visualization and user engagement.",
    category: "UI/UX Design",
    image: "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg",
    year: "2023"
  },
  {
    id: "project-3",
    title: "Restaurant Branding",
    description: "Complete brand identity for a high-end restaurant, including logo, menu design, and website.",
    category: "Branding",
    image: "https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg",
    year: "2022"
  }
];

export function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All"
    ? featuredProjects
    : featuredProjects.filter(project => project.category === activeCategory);

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
              <Button
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                size="sm"
                className="transition-all duration-300"
              >
                {category}
              </Button>
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
          <Button asChild size="lg" variant="outline" className="group">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}