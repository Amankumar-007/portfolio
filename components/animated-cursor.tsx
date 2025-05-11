"use client";

import { useEffect, useRef, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function AnimatedCursorComponent() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updateMousePosition, { passive: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-8 w-8 rounded-full border-2 border-primary mix-blend-difference lg:block"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

export const AnimatedCursor = memo(AnimatedCursorComponent);