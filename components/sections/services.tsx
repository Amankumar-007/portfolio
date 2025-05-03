"use client";

import { motion } from "framer-motion";
import { Palette, Code, LineChart, Layout, Monitor, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "MERN Stack Development",
    description: "Building full-stack web applications using MongoDB, Express.js, React, and Node.js with responsive UI and secure backend."
  },
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Frontend with React",
    description: "Creating modern, interactive user interfaces using React, Redux Toolkit, Tailwind CSS, and component libraries."
  },
  {
    icon: <Monitor className="h-10 w-10" />,
    title: "Backend with Node.js",
    description: "Designing and developing RESTful APIs with Express.js and MongoDB, focusing on performance and scalability."
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Admin & Role-Based Dashboards",
    description: "Developing admin panels and role-based dashboards with real-time features like user control, content management, and messaging."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Real Projects Development",
    description: "Creating real-world apps like e-commerce, LMS, and real estate platforms with complete frontend-backend integration."
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "Clean UI & Tailwind Design",
    description: "Building responsive, fast-loading designs using Tailwind CSS with focus on usability, speed, and mobile-friendliness."
  }
];


export function Services() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-12 h-0.5 bg-primary"></div>
            <span className="text-sm font-medium uppercase tracking-wider">Services</span>
            <div className="w-12 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            What I Offer
          </h2>
          <p className="text-lg text-muted-foreground">
            I provide a range of creative services to help businesses and individuals achieve their digital goals, from initial concept to final implementation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors duration-300"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}