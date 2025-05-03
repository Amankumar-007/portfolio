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
    period: "2023 - Present",
    role: "Frontend Developer (MERN Stack)",
    company: "Freelancer / Personal Projects",
    description: "Building web applications using React, Node.js, Express, MongoDB, and integrating frontend with backend systems. Continuously learning and improving skills in full-stack development.",
  },
  {
    period: "2022 - 2023",
    role: "Junior Developer",
    company: "Freelance Web Developer",
    description: "Developed and maintained responsive websites for small businesses, improving their digital presence. Focused on frontend technologies like HTML, CSS, JavaScript, and React.",
  },
  {
    period: "2021 - 2022",
    role: "Intern Developer",
    company: "Self-learning and Open Source Projects",
    description: "Worked on personal projects, contributed to open-source, and participated in coding challenges to enhance development skills. Gained hands-on experience in web development and backend technologies.",
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
  I'm Aman Kumar, a passionate developer focused on creating seamless and dynamic web applications.
</p>

<div className="space-y-6">
  <p className="text-lg">
    With hands-on experience in full-stack development, I specialize in building responsive and efficient web applications using the MERN stack. I continuously enhance my skills through personal projects, learning, and contributing to open-source.
  </p>
  <p className="text-lg">
    My approach is user-centric, combining the power of modern web technologies with a focus on clean, maintainable code. Whether it's frontend or backend, I aim to create applications that provide a smooth user experience and are easy to scale.
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