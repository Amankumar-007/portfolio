"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-32">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background track ring */}
        <motion.div
          className="absolute inset-0 border-[1px] border-black/10 dark:border-white/10 rounded-full"
        />
        {/* Spinning accent ring */}
        <motion.div
          className="absolute inset-0 border-[1px] border-transparent border-t-orange-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulsing dot */}
        <motion.div
          className="w-1.5 h-1.5 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* Minimal text */}
      <motion.span 
        className="text-[10px] tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase font-light ml-1"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading
      </motion.span>
    </div>
  );
}

export default Loader;