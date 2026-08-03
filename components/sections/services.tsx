"use client";

import { motion } from "framer-motion";
import { Palette, Code, LineChart, Layout, Monitor, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Full Stack Development",
    description: "Building end-to-end web applications using modern stacks like Next.js, React, Node.js, and MongoDB with a focus on performance."
  },
  {
    icon: <Monitor className="h-10 w-10" />,
    title: "SaaS Solutions",
    description: "Developing scalable Software as a Service (SaaS) platforms with subscription models, multi-tenancy, and cloud integration."
  },
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Frontend Excellence",
    description: "Creating premium, interactive user interfaces using Framer Motion, GSAP, and Tailwind CSS for a world-class UX."
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Enterprise Dashboards",
    description: "Developing complex admin panels and data-driven dashboards with real-time analytics and role-based access control."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Custom Web Applications",
    description: "Building tailored digital products like E-commerce, LMS, and CRM systems with seamless API integrations."
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "Modern UI/UX Design",
    description: "Crafting visually stunning and responsive designs that align with current web aesthetics and brand identity."
  }
];


export function Services() {
  return (
    <section className="py-24 px-0 md:px-4 bg-muted/30">
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
          <h2 className="text-3xl font-playfair font-bold mb-6">
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