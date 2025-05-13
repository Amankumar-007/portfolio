"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HeroImage = memo(function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.5,
        ease: "easeOut" // Changed to standard easing
      }}
      whileHover={{ scale: 1.02 }}
      className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Image 
          src="/image.png" 
          alt="Aman Kumar" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover object-center"
        />
      </motion.div>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 left-0 h-1 bg-primary"
      />
    </motion.div>
  );
});

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-7 px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20 backdrop-blur-sm"></div>
      </motion.div>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="max-w-xl">
          <motion.div 
            variants={fadeInItem}
            className="flex items-center space-x-4 mb-6"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-primary"
            />
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-medium"
            >
              Aman Kumar
            </motion.span>
          </motion.div>
          
          <motion.div variants={fadeInItem}>
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.6, 0, 0.1, 1] // Fixed cubic-bezier values (must be between 0-1)
              }}
            >
              <motion.span 
                className="block"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hello
              </motion.span>
              <motion.span 
                className="block text-muted-foreground text-3xl md:text-4xl lg:text-5xl mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I&apos;m a Mern stack developer
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-x-8 gap-y-4 text-xl mb-8"
          >
            <motion.div variants={fadeInItem}>
              <motion.span 
                className="text-4xl font-bold inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  delay: 0.6
                }}
              >
                +6
              </motion.span>
              <p className="text-muted-foreground">Technologies I&apos;m learning</p>
            </motion.div>
            <motion.div variants={fadeInItem}>
              <motion.span 
                className="text-4xl font-bold inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  delay: 0.7
                }}
              >
                +5
              </motion.span>
              <p className="text-muted-foreground">Project in Progress</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-4"
          >
            <motion.div variants={fadeInItem}>
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeInItem}>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <HeroImage />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
      >
        <motion.span 
          className="text-sm text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>

      {/* Decorative animated elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/10 blur-xl"
      />
    </section>
  );
}