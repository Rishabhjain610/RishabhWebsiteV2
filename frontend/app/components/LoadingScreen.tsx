"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Faster progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300); // Faster exit timing
          return 100;
        }
        return prev + 4; // Quicker progress steps
      });
    }, 25); // Faster interval timing

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          {/* Custom Coder Font Import */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap');
            .font-jetbrains { font-family: 'JetBrains Mono', monospace; }
          `}</style>

          {/* 3D Parallax Grid */}
          <motion.div 
            initial={{ rotateX: 60, y: 100 }}
            animate={{ y: [0, -100] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 opacity-[0.07]"
            style={{ 
              backgroundImage: 'linear-gradient(#4A90E2 1px, transparent 1px), linear-gradient(90deg, #4A90E2 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'rotateX(60deg)',
              transformOrigin: 'center center'
            }}
          />

          <div className="relative z-10 flex flex-col items-center w-full px-6 text-center">
            {/* 3D Typography - Responsive Sizes */}
            <motion.div
              initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
              animate={{ rotateY: 3, rotateX: -3, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <h1 
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-jetbrains tracking-tighter text-white leading-[0.9] select-none"
                style={{
                  textShadow: `
                    0 1px 0 #ccc,
                    0 2px 0 #c9c9c9,
                    0 3px 0 #bbb,
                    0 4px 0 #aaa,
                    0 10px 10px rgba(0,0,0,.4),
                    0 0 40px rgba(74,144,226,0.2)
                  `
                }}
              >
                RISHABH 
                <br />
                <span className="text-[#4A90E2]">JAIN</span>
              </h1>
            </motion.div>

            {/* Coder Console State */}
            <div className="mt-10 sm:mt-16 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-xs">
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest text-[#4A90E2]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2] animate-pulse" />
                <span>LOAD_RESOURCES</span>
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                >
                  _
                </motion.span>
              </div>

              {/* Minimalistic Progress Bar */}
              <div className="w-full h-1 bg-white/5 rounded-full relative overflow-hidden ring-1 ring-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4A90E2] to-cyan-400"
                />
              </div>

              <div className="font-mono text-[9px] text-gray-500 font-bold tracking-[0.2em]">
                {progress}%
              </div>
            </div>
          </div>

          {/* Depth Vignette */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
