"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/page-transition";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools"
] as const;

const technologies = [
  {
    id: "tech-1",
    name: "React.js",
    category: "Frontend",
    description: "Building modern user interfaces with React's component-based architecture",
    experience: "Advanced",
    icon: "📱",
    projects: 15,
    details: ["Components", "Hooks", "Context", "Redux", "Performance Optimization"]
  },
  {
    id: "tech-2",
    name: "Next.js",
    category: "Frontend",
    description: "Creating fast, SEO-friendly applications with server-side rendering",
    experience: "Advanced",
    icon: "⚡",
    projects: 10,
    details: ["App Router", "Server Components", "API Routes", "Static Generation"]
  },
  {
    id: "tech-3",
    name: "Node.js",
    category: "Backend",
    description: "Developing scalable backend services and REST APIs",
    experience: "Advanced",
    icon: "🚀",
    projects: 12,
    details: ["Express.js", "REST APIs", "Authentication", "Middleware"]
  },
  {
    id: "tech-4",
    name: "MongoDB",
    category: "Database",
    description: "Building flexible and scalable database solutions",
    experience: "Advanced",
    icon: "🗄️",
    projects: 8,
    details: ["Schemas", "Aggregation", "Indexing", "Atlas"]
  },
  {
    id: "tech-5",
    name: "TypeScript",
    category: "Frontend",
    description: "Writing type-safe code for better maintainability",
    experience: "Intermediate",
    icon: "📘",
    projects: 7,
    details: ["Types", "Interfaces", "Generics", "Decorators"]
  },
  {
    id: "tech-6",
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Creating beautiful, responsive designs with utility-first CSS",
    experience: "Advanced",
    icon: "🎨",
    projects: 10,
    details: ["Responsive Design", "Custom Themes", "Components", "Animations"]
  },
  {
    id: "tech-7",
    name: "Git & GitHub",
    category: "Tools",
    description: "Version control and collaborative development",
    experience: "Advanced",
    icon: "📊",
    projects: 20,
    details: ["Version Control", "Branching", "PRs", "CI/CD"]
  },
  {
    id: "tech-8",
    name: "Express.js",
    category: "Backend",
    description: "Building robust backend APIs and web applications",
    experience: "Advanced",
    icon: "🔧",
    projects: 10,
    details: ["Routing", "Middleware", "Error Handling", "Authentication"]
  },
  {
    id: "tech-9",
    name: "Docker",
    category: "DevOps",
    description: "Containerizing applications for consistent deployment",
    experience: "Intermediate",
    icon: "🐳",
    projects: 5,
    details: ["Containers", "Docker Compose", "Multi-stage Builds"]
  }
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechnologies = technologies
    .filter(tech => 
      activeCategory === "All" || tech.category === activeCategory
    )
    .filter(tech =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <PageTransition>
      <div className="container max-w-7xl py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6">
            Skills & Technologies
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore my technical expertise and the tools I use to build modern web applications.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative w-full md:w-[320px]"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search technologies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTechnologies.length > 0 ? (
            filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {tech.category}
                    </Badge>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="text-2xl">{tech.icon}</span>
                      {tech.name}
                    </h3>
                  </div>
                  <Badge variant="secondary">{tech.experience}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{tech.description}</p>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Projects completed: {tech.projects}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.details.map((detail, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {detail}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-xl text-muted-foreground">No technologies found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
