"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ExternalLink } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'project' | 'milestone' | 'achievement';
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2025",
    title: "AI Tools Platform Launch",
    description: "Deployed comprehensive AI platform with advanced automation capabilities and machine learning integration.",
    type: "project"
  },
  {
    year: "2025",
    title: "Restaurant Management Suite",
    description: "Completed dual restaurant applications with reservation systems and online ordering capabilities.",
    type: "project"
  },
  {
    year: "2024",
    title: "SaaS Platform Development",
    description: "Built multi-tenant platform with subscription billing, analytics dashboard, and real-time collaboration features.",
    type: "milestone"
  },
  {
    year: "2023",
    title: "Educational Platform Expansion",
    description: "Enhanced LMS with interactive learning modules, video conferencing, and comprehensive assessment tools.",
    type: "project"
  },
  {
    year: "2023",
    title: "Real Estate Innovation",
    description: "Launched advanced property management platform with virtual tours and AI-powered recommendations.",
    type: "project"
  },
  {
    year: "2022",
    title: "Mobile Development Excellence",
    description: "Expanded into mobile applications with cross-platform solutions for iOS and Android.",
    type: "achievement"
  }
];

export default function ProjectTimeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A timeline of our key projects and milestones that showcase our growth and expertise.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 origin-top"
          />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 
                    ? 'flex-col md:flex-row' 
                    : 'flex-col md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10">
                  <motion.div
                    animate={inView ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-full h-full bg-blue-500 rounded-full"
                  />
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-3 md:justify-end">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500">
                        {item.year}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {item.link && (
                      <a
                        href={item.link}
                        className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <div className={`mt-4 ${index % 2 === 0 ? 'md:justify-end' : ''} flex`}>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.type === 'project' 
                          ? 'bg-blue-100 text-blue-700'
                          : item.type === 'milestone'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
