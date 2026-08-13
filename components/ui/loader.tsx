"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full min-h-[200px]">
      <div className="relative flex items-center justify-center w-14 h-14">
        {/* Outer subtle ring */}
        <div className="absolute inset-0 rounded-full border border-zinc-800/80 shadow-[0_0_15px_rgba(240,83,53,0.05)]" />
        
        {/* Animated stroke ring */}
        <svg className="w-full h-full absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#F05335"
            strokeWidth="2"
            strokeDasharray="302"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 302 }}
            animate={{ strokeDashoffset: [302, 0, -302] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Center pulsing core */}
        <motion.div
          className="w-1.5 h-1.5 bg-[#F05335] rounded-full shadow-[0_0_10px_rgba(240,83,53,0.8)]"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Minimal staggered text */}
      <div className="flex gap-[0.3em] ml-1">
        {["L", "O", "A", "D", "I", "N", "G"].map((letter, i) => (
          <motion.span
            key={i}
            className="text-[10px] tracking-widest font-bold text-zinc-500 font-poppins uppercase"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default Loader;