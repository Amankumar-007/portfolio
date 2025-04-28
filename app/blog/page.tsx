"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

const categories = [
  "All", "Design", "Development", "Branding", "UI/UX", "Career"
];

const blogPosts = [
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
  },
  {
    id: "post-3",
    title: "Building a Design System: From Scratch to Implementation",
    excerpt: "A step-by-step guide to creating and implementing a design system for your organization.",
    date: "March 10, 2023",
    category: "Development",
    image: "https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg",
    readTime: "10 min read"
  },
  {
    id: "post-4",
    title: "The Psychology of Color in Branding",
    excerpt: "Understanding how colors influence perception and how to leverage them in brand design.",
    date: "February 15, 2023",
    category: "Branding",
    image: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg",
    readTime: "7 min read"
  },
  {
    id: "post-5",
    title: "Responsive Web Design: Best Practices for 2023",
    excerpt: "Learn the latest techniques and best practices for creating responsive websites.",
    date: "January 28, 2023",
    category: "Development",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    readTime: "9 min read"
  },
  {
    id: "post-6",
    title: "From Designer to Design Leader: Growing Your Career",
    excerpt: "Tips and strategies for designers looking to advance into leadership roles.",
    date: "December 12, 2022",
    category: "Career",
    image: "https://images.pexels.com/photos/3182756/pexels-photo-3182756.jpeg",
    readTime: "11 min read"
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = blogPosts
    .filter(post => 
      activeCategory === "All" || post.category === activeCategory
    )
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <PageTransition>
      <div className="container max-w-6xl py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Thoughts, ideas, and insights on design, development, and creative process.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative w-full md:w-[300px]"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-[200px] rounded-xl overflow-hidden mb-4">
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
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}