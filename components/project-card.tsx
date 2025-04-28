"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tilt } from 'react-tilt';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
    >
      <Tilt options={defaultTiltOptions}>
        <Link href={`/projects/${project.id}`} className="group block">
          <div className="relative h-[300px] rounded-xl overflow-hidden mb-4">
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4"
            >
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/80">{project.category}</Badge>
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">{project.description}</p>
        </Link>
      </Tilt>
    </motion.div>
  );
}