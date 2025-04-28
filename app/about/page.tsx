"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageTransition } from "@/components/page-transition";

const skills = [
  "UI/UX Design", "Web Development", "Branding", 
  "Mobile App Design", "Product Design", "Illustration"
];

const experiences = [
  {
    period: "2020 - Present",
    role: "Senior UX Designer",
    company: "Design Studio Co.",
    description: "Leading design initiatives for major clients and managing a team of junior designers.",
  },
  {
    period: "2018 - 2020",
    role: "UI Designer",
    company: "Creative Agency Inc.",
    description: "Created user interfaces for web and mobile applications, collaborating closely with development teams.",
  },
  {
    period: "2016 - 2018",
    role: "Graphic Designer",
    company: "Media Group Ltd.",
    description: "Designed marketing materials, brand identities, and social media assets for various clients.",
  }
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container max-w-5xl py-20 px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              I'm Aman Kumar, a designer with a passion for creating beautiful, functional digital experiences.
            </p>
            
            <div className="space-y-6">
              <p className="text-lg">
                With over 6 years of experience in UI/UX design and web development, I've worked with clients ranging from startups to large corporations, helping them build products that users love.
              </p>
              <p className="text-lg">
                My approach combines aesthetic sensibility with a deep understanding of user behavior, resulting in designs that are not only visually appealing but also intuitive and effective.
              </p>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <Image 
              src="https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg" 
              alt="Aman Kumar" 
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        
        <Separator className="my-16" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-10">Work Experience</h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="grid md:grid-cols-[200px_1fr] gap-4"
              >
                <div className="text-muted-foreground">{exp.period}</div>
                <div>
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-primary mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}