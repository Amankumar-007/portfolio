"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const SkillCard = memo(function SkillCard({
  name,
  category,
  icon,
  experience,
  details,
}: {
  name: string;
  category: string;
  icon: string;
  experience: string;
  details: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            {name}
          </h3>
        </div>
        <Badge variant="secondary">{experience}</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {details.map((detail, i) => (
          <Badge key={i} variant="secondary" className="text-xs">
            {detail}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
});

export function SkillsPreview() {
  const featuredSkills = [
    {
      name: "React.js",
      category: "Frontend",
      icon: "📱",
      experience: "Advanced",
      details: ["Components", "Hooks", "Context", "Redux"]
    },
    {
      name: "Node.js",
      category: "Backend",
      icon: "🚀",
      experience: "Advanced",
      details: ["Express.js", "REST APIs", "Authentication"]
    },
    {
      name: "TypeScript",
      category: "Frontend",
      icon: "📘",
      experience: "Advanced",
      details: ["Types", "Interfaces", "Generics"]
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl font-playfair font-bold">Skills & Technologies</h2>
            <p className="mt-2 text-muted-foreground">
              Key technologies and tools I use to bring ideas to life
            </p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/skills">
              View All Skills
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
