"use client";

import { ReactNode, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Animations ---
const expand = {
  initial: { top: 0 },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: 0.45,
      delay: 0.04 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i: number) => ({
    height: "100vh",
    transition: {
      duration: 0.45,
      delay: 0.04 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const opacity = {
  initial: { opacity: 0.15 },
  enter: { opacity: 0 },
  exit: { opacity: 0.15 },
};

interface PageTransitionProps {
  children: ReactNode;
}

// Solid light white transition tone
const transitionColor = "#ffffff";

function PageTransitionComponent({ children }: PageTransitionProps) {
  const nbOfColumns = 5;

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
          {/* Light subtle backdrop overlay */}
          <motion.div
            {...anim(opacity)}
            className="transition-background"
            style={{ backgroundColor: transitionColor }}
          />

          {/* Solid Light White Stairs */}
          <div className="transition-container">
            {[...Array(nbOfColumns)].map((_, i) => (
              <motion.div
                key={i}
                {...anim(expand, nbOfColumns - i)}
                style={{
                  backgroundColor: transitionColor,
                }}
              />
            ))}
          </div>

          {/* Page content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </AnimatePresence>

      <style jsx global>{`
        .stairs .transition-container {
          position: fixed;
          width: 100vw;
          height: 100vh;
          display: flex;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 9999;
        }

        .stairs .transition-container div {
          position: relative;
          height: 100%;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .stairs .transition-background {
          position: fixed;
          width: 100%;
          height: 100vh;
          z-index: 9998;
          pointer-events: none;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  );
}

export const PageTransition = memo(PageTransitionComponent);
