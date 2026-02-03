"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What technologies do you work with?",
    answer: "We work with modern web technologies including React, Next.js, TypeScript, Node.js, and various cloud platforms. Our tech stack is chosen based on project requirements to ensure optimal performance and scalability."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. We provide detailed timelines during the planning phase."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer ongoing maintenance and support services. This includes bug fixes, updates, performance optimization, and feature enhancements as your business needs evolve."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development process with clear phases: discovery, planning, design, development, testing, and deployment. We maintain regular communication and provide progress updates throughout the project."
  },
  {
    question: "Can you work with existing projects?",
    answer: "Absolutely! We can take over existing projects, perform code audits, implement new features, or improve performance. We'll assess your current setup and provide recommendations for improvement."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions about our work? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
