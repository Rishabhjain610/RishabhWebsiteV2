"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1; 
      });
    }, 40); 

    return () => clearInterval(interval);
  }, []);

  const getStatus = () => {
    if (progress < 20) return "RISHABH_JAIN.exe --init";
    if (progress < 40) return "FETCHING 600+ GITHUB COMMITS";
    if (progress < 60) return "LOADING 30+ HACKATHONS";
    if (progress < 80) return "INJECTING 7X PODIUM WINS";
    if (progress < 100) return "COMPILING ENVIRONMENT";
    return "SYSTEM.READY";
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
           className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono selection:bg-[#4A90E2]"
           style={{ backgroundColor: "#121212" }}
        >
          {/* Subtle tech grid background */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
          
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
            .font-jetbrains { font-family: 'JetBrains Mono', monospace; }
          `}</style>

          <div className="flex flex-col items-center justify-center font-jetbrains overflow-hidden relative z-10 px-4 w-full">
            
            {/* Techie Bracket Status */}
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 10 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="flex items-center justify-center gap-3 sm:gap-5 text-sm sm:text-base md:text-xl font-bold tracking-widest text-[#ffffff] whitespace-nowrap"
            >
               <span style={{ color: "#4A90E2" }} className="text-2xl sm:text-3xl md:text-5xl">[</span>
               
               <div className="w-[30ch] text-center uppercase relative flex justify-center">
                  <motion.span
                     key={getStatus()}
                     initial={{ opacity: 0, filter: "brightness(2) blur(2px)" }}
                     animate={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
                     transition={{ duration: 0.2 }}
                     className="inline-block"
                  >
                     {getStatus()}
                  </motion.span>
               </div>

               <span style={{ color: "#4A90E2" }} className="text-2xl sm:text-3xl md:text-5xl">]</span>
            </motion.div>

            {/* Sharp Progress Bar */}
            <div className="flex flex-col w-full max-w-sm sm:max-w-xl items-center mt-6 sm:mt-10">
               <div className="w-full flex justify-between text-[10px] sm:text-xs mb-2 opacity-50 tracking-widest text-white">
                 <span>SYS.LOAD</span>
                 <span>{Math.min(100, Math.floor(progress))}%</span>
               </div>
               
               <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  className="w-full h-[2px] md:h-[3px] bg-white/10 relative overflow-hidden"
               >
                  <motion.div 
                     className="absolute left-0 top-0 bottom-0"
                     style={{ 
                        backgroundColor: "#4A90E2", 
                        width: `${Math.min(100, progress)}%`,
                        boxShadow: "0 0 10px rgba(74,144,226,0.8)"
                     }}
                  />
               </motion.div>
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
