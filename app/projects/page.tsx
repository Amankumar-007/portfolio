"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { PageTransition } from "@/components/page-transition";

const categories = [
  "All", "UI/UX Design", "Web Development", "Branding", "Mobile App"
];

const projects = [
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
    category: "Mobile App",
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
  },
  {
    id: "project-4",
    title: "Corporate Website",
    description: "Designed and developed a responsive website for a corporate client with focus on clarity and brand messaging.",
    category: "Web Development",
    image: "https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg",
    year: "2022"
  },
  {
    id: "project-5",
    title: "Travel App UI Design",
    description: "Created a UI design for a travel planning application with focus on intuitive navigation and visual appeal.",
    category: "Mobile App",
    image: "https://images.pexels.com/photos/6956503/pexels-photo-6956503.jpeg",
    year: "2021"
  },
  {
    id: "project-6",
    title: "Health & Fitness Platform",
    description: "Web platform for tracking fitness goals, nutrition, and workout plans with personalized recommendations.",
    category: "Web Development",
    image: "https://images.pexels.com/photos/5082581/pexels-photo-5082581.jpeg",
    year: "2021"
  }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <PageTransition>
      <div className="container max-w-6xl py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A curated selection of my recent work across various disciplines and industries.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}