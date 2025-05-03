"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-7 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20 backdrop-blur-sm"></div>
      </div>
      
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-0.5 bg-primary"></div>
            <span className="text-lg font-medium">Aman Kumar</span>
          </div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Hello</span>
            <span className="block text-muted-foreground text-3xl md:text-4xl lg:text-5xl mt-2">
              I'm a Mern stack developer
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-x-8 gap-y-4 text-xl mb-8"
          >
            <div>
              <span className="text-4xl font-bold">+6</span>
              <p className="text-muted-foreground">Technologies I'm learning</p>
            </div>
            <div>
              <span className="text-4xl font-bold">+5</span>
              <p className="text-muted-foreground">Project in Progress</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
        >
          <Image 
            src="/image.png" 
            alt="Aman Kumar" 
            fill
            className="object-cover object-center"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}