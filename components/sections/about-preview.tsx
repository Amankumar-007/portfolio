"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <Image 
              src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg" 
              alt="Aman Kumar working" 
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-0.5 bg-primary"></div>
              <span className="text-sm font-medium uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Designing digital experiences with passion and purpose
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm Aman Kumar, a designer and developer with over 6 years of experience creating beautiful, functional digital products. I combine aesthetic sensibility with technical expertise to deliver solutions that not only look great but also solve real problems.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              My approach is collaborative and user-centered, focusing on creating experiences that are intuitive, accessible, and delightful to use.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}