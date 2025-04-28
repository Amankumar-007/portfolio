"use client";

import { motion } from "framer-motion";
import { Palette, Code, LineChart, Layout, Monitor, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Palette className="h-10 w-10" />,
    title: "UI/UX Design",
    description: "Creating intuitive, engaging user interfaces and experiences that delight users and achieve business goals."
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Web Development",
    description: "Building responsive, performant websites and web applications using modern frameworks and best practices."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Branding & Identity",
    description: "Developing cohesive brand identities that communicate the essence of your business and connect with your audience."
  },
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Mobile App Design",
    description: "Designing user-friendly mobile interfaces that provide exceptional experiences across iOS and Android platforms."
  },
  {
    icon: <Monitor className="h-10 w-10" />,
    title: "Web App Interfaces",
    description: "Creating complex web application interfaces that balance functionality with usability and aesthetic appeal."
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Interactive Prototyping",
    description: "Building interactive prototypes that simulate real-world usage and gather valuable feedback before development."
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