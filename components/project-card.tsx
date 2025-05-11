"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  year: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-lg bg-card hover:bg-card/50">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-sm bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                View Project
              </motion.div>
            </div>
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/80">
                {project.category}
              </Badge>
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/80">
                {project.year}
              </Badge>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 mb-4">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}