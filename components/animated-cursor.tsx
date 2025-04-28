"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    text: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5
    }
  };

  useEffect(() => {
    const textElements = document.querySelectorAll("p, h1, h2, h3, a, button");
    
    const mouseEnter = () => setCursorVariant("text");
    const mouseLeave = () => setCursorVariant("default");

    textElements.forEach(element => {
      element.addEventListener("mouseenter", mouseEnter);
      element.addEventListener("mouseleave", mouseLeave);
    });

    return () => {
      textElements.forEach(element => {
        element.removeEventListener("mouseenter", mouseEnter);
        element.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-primary/20 rounded-full pointer-events-none z-50 backdrop-blur-sm hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}