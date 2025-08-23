"use client";

import { ReactNode, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Animations ---
const expand = {
  initial: { top: 0 },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i: number) => ({
    height: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const opacity = {
  initial: { opacity: 0.5 },
  enter: { opacity: 0 },
  exit: { opacity: 0.5 },
};

interface PageTransitionProps {
  children: ReactNode;
  theme?: "light" | "dark"; // optional prop to control theme
}

function PageTransitionComponent({ children, theme = "light" }: PageTransitionProps) {
  const nbOfColumns = 5;

  // Invert transition colors based on theme
  const transitionColor = theme === "dark" ? "white" : "black";

  const anim = (variants: any, custom: number | null = null) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  });

  return (
    <>
      <AnimatePresence mode="wait">
        <div className="page stairs">
          {/* Background fade */}
          <motion.div
            {...anim(opacity)}
            className="transition-background"
            style={{ backgroundColor: transitionColor }}
          />

          {/* Stairs expand */}
          <div className="transition-container">
            {[...Array(nbOfColumns)].map((_, i) => (
              <motion.div
                key={i}
                {...anim(expand, nbOfColumns - i)}
                style={{ backgroundColor: transitionColor }}
              />
            ))}
          </div>

          {/* Page content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </div>
      </AnimatePresence>

      {/* CSS inside same file */}
      <style jsx global>{`
        .stairs .transition-container {
          position: fixed;
          width: 100vw;
          height: 100vh;
          display: flex;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 2;
        }

        .stairs .transition-container div {
          position: relative;
          height: 100%;
          width: 100%;
        }

        .stairs .transition-background {
          position: fixed;
          width: 100%;
          height: 100vh;
          z-index: 1;
          pointer-events: none;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  );
}

export const PageTransition = memo(PageTransitionComponent);
