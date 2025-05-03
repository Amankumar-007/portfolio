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
  "All", "Tech", "Design", "Marketing", "UI/UX", "Career Growth"
];

const blogPosts = [
  {
    id: "post-1",
    title: "Mastering Web Accessibility: Best Practices and Tools",
    excerpt: "Understand how to design and build websites that are accessible to everyone, regardless of ability.",
    date: "May 20, 2023",
    category: "Tech",
    image: "https://images.pexels.com/photos/2896705/pexels-photo-2896705.jpeg",
    readTime: "7 min read"
  },
  {
    id: "post-2",
    title: "Navigating the Future of Web Design in 2023",
    excerpt: "A look into the most promising web design trends that will define digital experiences in the upcoming years.",
    date: "April 15, 2023",
    category: "Design",
    image: "https://images.pexels.com/photos/3727455/pexels-photo-3727455.jpeg",
    readTime: "5 min read"
  },
  {
    id: "post-3",
    title: "Building a Solid Foundation for Your Web Projects",
    excerpt: "Essential steps for laying a strong foundation for your next web development project.",
    date: "March 25, 2023",
    category: "Tech",
    image: "https://images.pexels.com/photos/1181266/pexels-photo-1181266.jpeg",
    readTime: "9 min read"
  },
  {
    id: "post-4",
    title: "Understanding the Role of Psychology in Branding",
    excerpt: "Explore how psychological principles can help create effective brand identities and connect with consumers.",
    date: "February 10, 2023",
    category: "Marketing",
    image: "https://images.pexels.com/photos/1544008/pexels-photo-1544008.jpeg",
    readTime: "8 min read"
  },
  {
    id: "post-5",
    title: "The Essentials of Building Responsive Web Interfaces",
    excerpt: "Tips and techniques for creating responsive websites that deliver great user experiences across devices.",
    date: "January 10, 2023",
    category: "Tech",
    image: "https://images.pexels.com/photos/2289494/pexels-photo-2289494.jpeg",
    readTime: "6 min read"
  },
  {
    id: "post-6",
    title: "How to Transition from Designer to Design Leader",
    excerpt: "Strategies for designers who aspire to grow into leadership positions within the design industry.",
    date: "December 1, 2022",
    category: "Career Growth",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    readTime: "10 min read"
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
      <div className="container max-w-7xl py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-gray-900">
            Blog & Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore articles on tech, design, marketing, and career growth. Stay updated with the latest industry trends.
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
            className="relative w-full md:w-[320px]"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
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
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
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
