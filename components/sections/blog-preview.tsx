"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredPosts = [
  {
    id: "post-1",
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt: "Learn how to create designs that are accessible to everyone, including people with disabilities.",
    date: "May 15, 2023",
    category: "Design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    readTime: "8 min read"
  },
  {
    id: "post-2",
    title: "The Future of UI Design: Trends to Watch in 2023",
    excerpt: "Explore the emerging UI design trends that are shaping the future of digital products.",
    date: "April 22, 2023",
    category: "UI/UX",
    image: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg",
    readTime: "6 min read"
  }
];

export function BlogPreview() {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-0.5 bg-primary"></div>
            <span className="text-sm font-medium uppercase tracking-wider">Blog & Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            Latest Articles
          </h2>
          <p className="text-lg text-muted-foreground">
            Thoughts, ideas, and insights on design, development, and the creative process. 
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-[250px] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white text-black hover:bg-white/90">{post.category}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button asChild size="lg" variant="outline" className="group">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}