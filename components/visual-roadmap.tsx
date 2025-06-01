"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface RoadmapItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  tools: string[];
  color: string;
}

const roadmapData: RoadmapItem[] = [
  {
    year: "2021",
    title: "HTML & CSS",
    description: "Started my journey with web fundamentals, building static websites and learning responsive design principles.",
    icon: "🌐",
    tools: ["VS Code", "CodePen", "Chrome DevTools"],
    color: "#e34c26"
  },
  {
    year: "2022",
    title: "JavaScript",
    description: "Learned core JavaScript concepts, DOM manipulation, and built interactive web applications.",
    icon: "📜",
    tools: ["VS Code", "GitHub", "npm", "ESLint"],
    color: "#f7df1e"
  },
  {
    year: "2023",
    title: "React.js",
    description: "Mastered component-based architecture and state management with React.",
    icon: "⚛️",
    tools: ["Create React App", "Redux", "React Router", "Styled Components"],
    color: "#61dafb"
  },
  {
    year: "2024",
    title: "Node.js",
    description: "Expanded to backend development with Node.js, creating RESTful APIs and server applications.",
    icon: "🚀",
    tools: ["Express.js", "Postman", "MongoDB Atlas", "JWT"],
    color: "#68a063"
  },
  {
    year: "2024",
    title: "MongoDB",
    description: "Learned NoSQL database design, CRUD operations, and data modeling.",
    icon: "🗄️",
    tools: ["MongoDB Compass", "Mongoose", "MongoDB Atlas", "Aggregation Framework"],
    color: "#4db33d"
  },
  {
    year: "2025",
    title: "TypeScript",
    description: "Adopted TypeScript for type-safe development and improved code quality.",
    icon: "📘",
    tools: ["TSLint", "TypeScript Compiler", "Type Definitions", "Interfaces"],
    color: "#007acc"
  },
  {
    year: "2025",
    title: "Next.js",
    description: "Built production-ready applications with server-side rendering and static site generation.",
    icon: "⚡",
    tools: ["Vercel", "Next API Routes", "ISR", "Next Auth"],
    color: "#000000"
  }
];

export function VisualRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate which item should be active based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const newIndex = Math.min(
        Math.floor(value * roadmapData.length),
        roadmapData.length - 1
      );
      if (newIndex >= 0 && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <div className="py-20" ref={containerRef}>
      <div className="container max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            My Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the timeline of my technical growth and the tools that shaped my development path.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <div className="relative mb-20">
          <div className="absolute top-0 left-1/2 w-1 h-full bg-muted transform -translate-x-1/2 rounded-full" />
          
          {/* Progress overlay */}
          <motion.div 
            className="absolute top-0 left-1/2 w-1 bg-primary transform -translate-x-1/2 rounded-full origin-top"
            style={{ 
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
            }}
          />

          {/* Timeline items */}
          {roadmapData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-24 ${index % 2 === 0 ? "md:ml-[50%] md:pl-12" : "md:mr-[50%] md:pr-12 md:text-right"}`}
            >
              {/* Year marker */}
              <div 
                className={`absolute top-0 ${index % 2 === 0 ? "md:-left-6" : "md:-right-6"} md:top-1/2 md:transform md:-translate-y-1/2 flex md:flex-col items-center`}
              >
                <motion.div 
                  className="w-8 h-8 rounded-full flex items-center justify-center z-10"
                  initial={false}
                  animate={{ 
                    scale: activeIndex === index ? 1.2 : 1,
                    backgroundColor: activeIndex >= index ? item.color : "#ccc"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white text-xs font-bold">{item.year}</span>
                </motion.div>
                <div className={`hidden md:block h-0.5 w-6 ${index % 2 === 0 ? "md:w-0 md:h-6" : "md:w-0 md:h-6"}`} 
                  style={{ backgroundColor: activeIndex >= index ? item.color : "#ccc" }}
                />
              </div>

              {/* Content card */}
              <Card 
                className={`p-6 md:max-w-[90%] ${activeIndex >= index ? "border-primary/50 shadow-lg" : ""}`}
                style={{ 
                  borderLeftColor: activeIndex >= index ? item.color : "",
                  borderLeftWidth: activeIndex >= index ? "4px" : ""
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="mb-2">
                      <span className="text-sm font-medium">Tools & Technologies:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tools.map((tool, i) => (
                        <Badge key={i} variant="outline" className="bg-background/80">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learning approach visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-32"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center">
            My Learning Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Learn by Building",
                description: "I believe in hands-on learning through real projects, applying concepts immediately to solve practical problems.",
                icon: "🛠️",
                color: "#f97316"
              },
              {
                title: "Documentation & Courses",
                description: "I combine official documentation with structured courses to build a solid theoretical foundation.",
                icon: "📚",
                color: "#8b5cf6"
              },
              {
                title: "Community & Open Source",
                description: "I learn from the community by contributing to open source and participating in developer forums.",
                icon: "👥",
                color: "#06b6d4"
              }
            ].map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="p-6 h-full border-t-4" style={{ borderTopColor: approach.color }}>
                  <div className="text-5xl mb-4">{approach.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{approach.title}</h3>
                  <p className="text-muted-foreground">{approach.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}