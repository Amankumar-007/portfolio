"use client";

import { memo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
          <MagneticButton>
            <Link href="/blog" className="flex items-center gap-2 text-white font-bold tracking-wide text-sm md:text-base">
              View All Posts
              <ArrowRight size={18} />
            </Link>
          </MagneticButton>
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

// Magnetic Button with Touch Support fallbacks
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative w-full md:w-auto px-8 py-4 bg-neutral-900 rounded-full overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-orange-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="flex justify-center relative z-10">{children}</div>
    </motion.button>
  );
};

export const BlogPreview = memo(BlogPreviewComponent);