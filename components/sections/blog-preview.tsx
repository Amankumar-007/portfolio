"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const BlogCard = memo(function BlogCard({
  title,
  description,
  image,
  date,
  slug,
}: {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${slug}`}>
        <Card className="group overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <time className="text-sm text-muted-foreground">{date}</time>
            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-muted-foreground">
              {description}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
});

function BlogPreviewComponent() {
  const posts = [
    {
      title: "Building a Modern Web Application",
      description: "Learn how to build a modern web application using Next.js 13 and TypeScript",
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
      date: "2023-12-01",
      slug: "building-modern-web-application"
    },
    {
      title: "Mastering React Server Components",
      description: "A deep dive into React Server Components and how they improve performance",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
      date: "2023-11-15",
      slug: "mastering-react-server-components"
    },
    {
      title: "The Future of Web Development",
      description: "Exploring upcoming trends and technologies in web development",
      image: "https://images.pexels.com/photos/11035482/pexels-photo-11035482.jpeg",
      date: "2023-11-01",
      slug: "future-of-web-development"
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold">Latest Posts</h2>
            <p className="mt-2 text-muted-foreground">
              Thoughts, insights, and perspectives on web development
            </p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const BlogPreview = memo(BlogPreviewComponent);