"use client";

import { memo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

// Magnetic Button with Touch Support fallbacks
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
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
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative w-fit md:w-auto px-8 py-4 bg-neutral-900 rounded-full overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-orange-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="flex justify-center relative z-10">{children}</div>
    </motion.button>
  );
};

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
    <section className="py-24 px-0 md:px-4">
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
          <MagneticButton>
            <Link href="/skills" className="flex items-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
              View All Skills
              <ArrowRight size={18} />
            </Link>
          </MagneticButton>
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
