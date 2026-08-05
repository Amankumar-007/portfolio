"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What technologies does Aman Kumar work with?",
    answer: "I build full-stack web applications using React, Node.js, Express.js, and MongoDB — along with Next.js, TypeScript, Redux, and Tailwind CSS. I've used this stack in production at Ninepages Techsolutions and StartupCoaching, and to build SnippetsX, TomatoAI, and Awasdhara."
  },
  {
    question: "How much experience does Aman Kumar have as a Full Stack Engineer?",
    answer: "2+ years of professional experience as a Full Stack Engineer — 1 year 5 months at Ninepages Techsolutions followed by an ongoing role at StartupCoaching — built on a self-taught foundation and a full-stack developer training program with Learn2Earn."
  },
  {
    question: "Is Aman Kumar available for freelance or collaboration?",
    answer: "Yes — I'm open to freelance projects and collaboration alongside my current full-time role. Reach out through the contact page and I typically respond within 24 hours."
  },
  {
    question: "What projects has Aman Kumar built?",
    answer: "Production SaaS and client platforms including SnippetsX (a real-time collaborative code editor), TomatoAI (an all-in-one AI tools platform), Awasdhara (a real estate & land investment platform), and TwoFloww, alongside e-commerce, LMS, and real estate apps."
  },
  {
    question: "Where is Aman Kumar based?",
    answer: "India — currently working on-site in Delhi as a Full Stack Engineer at StartupCoaching, after 1 year 5 months on-site in Agra, Uttar Pradesh at Ninepages Techsolutions."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 my-8 rounded-3xl sm:rounded-[2.5rem] lg:rounded-[3rem] bg-white border border-gray-200/80 shadow-2xl overflow-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-[#F05335] text-xs font-bold uppercase tracking-widest mb-4 border border-[#F05335]/20">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal">
            Common questions about my stack, experience, and availability.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-orange-50/30 border-[#F05335]/40 shadow-md"
                    : "bg-white border-gray-200/90 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#F05335] text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
