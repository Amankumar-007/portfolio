"use client";

import { memo, useCallback, useState } from "react";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProjectClientProps {
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    year: string;
    client: string;
    role: string;
    challenge: string;
    solution: string;
    results: string;
    gallery: string[];
    technologies?: string[];
    demoUrl?: string;
    githubUrl?: string;
  };
}

function ProjectClientComponent({ project }: ProjectClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDemoClick = useCallback(() => {
    if (project.demoUrl) {
      window.open(project.demoUrl, "_blank", "noopener,noreferrer");
    }
  }, [project.demoUrl]);

  const handleGithubClick = useCallback(() => {
    if (project.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
  }, [project.githubUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-6xl py-12"
    >
      <Button asChild variant="ghost" className="mb-8 group">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-8 lg:grid-cols-2"
      >
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-playfair font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{project.description}</p>

          {/* Project Metadata */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              <strong>Category:</strong> {project.category}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Year:</strong> {project.year}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Client:</strong> {project.client}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Role:</strong> {project.role}
            </p>
          </div>

          {/* Challenge */}
          <h2 className="text-2xl font-semibold mb-2">Challenge</h2>
          <p className="text-lg mb-6">{project.challenge}</p>

          {/* Solution */}
          <h2 className="text-2xl font-semibold mb-2">Solution</h2>
          <p className="text-lg mb-6">{project.solution}</p>

          {/* Results */}
          <h2 className="text-2xl font-semibold mb-2">Results</h2>
          <p className="text-lg mb-6">{project.results}</p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {project.demoUrl && (
              <Button onClick={handleDemoClick} size="lg">
                View Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button onClick={handleGithubClick} variant="outline" size="lg">
                View Code
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative h-[200px] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${project.title} gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Full Screen Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-[90vh] rounded-lg overflow-hidden"
            >
              <Image
                src={selectedImage}
                alt="Full screen view"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export const ProjectClient = memo(ProjectClientComponent);