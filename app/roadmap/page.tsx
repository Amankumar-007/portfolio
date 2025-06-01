"use client";

import { motion } from "framer-motion";
import { VisualRoadmap } from "@/components/visual-roadmap";
import { PageTransition } from "@/components/page-transition";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function RoadmapPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition>
      {/* Hero section with parallax effect */}
      <div className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/code-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
        
        <div className="container relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6">
              My Learning Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Explore the timeline of my technical growth, learning approach, and the tools that shaped my development path.
            </p>
            
            <motion.div
              className="cursor-pointer"
              onClick={scrollToContent}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }}
            >
              <ArrowDown className="h-10 w-10 mx-auto text-primary" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating tech icons */}
        {["⚛️", "🚀", "📱", "🌐", "📊", "🔧", "🗄️"].map((icon, i) => {
          // Set initial and target positions for animation
          const baseX = Math.random() * 100 - 50 + i * 100;
          const baseY = Math.random() * 100 - 50 + i * 50;
          const deltaX = Math.random() * 20 - 10;
          const deltaY = Math.random() * 20 - 10;
          return (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-30"
              initial={{
                x: baseX,
                y: baseY,
                opacity: 0
              }}
              animate={{
                x: [baseX, baseX + deltaX, baseX],
                y: [baseY, baseY + deltaY, baseY],
                opacity: 0.3
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2
              }}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>
      
      <div ref={contentRef} className="container max-w-7xl py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            From Beginner to Professional
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through web development has been a continuous process of learning and growth.
            Here&apos;s how it all unfolded.
          </p>
        </motion.div>
        
        <VisualRoadmap />
        
        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-32 mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center">
            Journey in Numbers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1000+", label: "Hours Coding" },
              { value: "5+", label: "Projects Completed" },
              { value: "20+", label: "Technologies Learned" },
              { value: "∞", label: "Cups of Coffee" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg border bg-card"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-primary mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Quote section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative py-16 px-4 md:px-12 my-20 rounded-xl bg-primary/5 border overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/10"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl mb-6"
            >
              💡
            </motion.div>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium italic mb-6"
            >
              &quot;The beautiful thing about learning is that nobody can take it away from you.&quot;
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground"
            >
              — B.B. King
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}