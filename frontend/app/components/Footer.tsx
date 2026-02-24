"use client";
import React from "react";
import { motion } from "framer-motion";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  const [mounted, setMounted] = React.useState(false);
  const currentYear = new Date().getFullYear();
  const ACCENT = "#4A90E2";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="w-full py-12 px-6 md:px-12 lg:px-20 bg-[#F4F4F4] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Social Row */}
        <div className="flex items-center gap-6 mb-8">
          {[
            { Icon: IoLogoGithub, href: "https://github.com/Rishabhjain610", label: "GitHub" },
            { Icon: IoLogoLinkedin, href: "https://www.linkedin.com/in/rishabhjain610/", label: "LinkedIn" },
            { Icon: IoLogoInstagram, href: "https://instagram.com/rishabh_jain610", label: "Instagram" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#555] dark:text-[#E0E0E0]/60 hover:text-[#4A90E2] dark:hover:text-[#4A90E2] transition-all duration-300"
            >
              <s.Icon size={24} />
            </motion.a>
          ))}
        </div>

        {/* Separator */}
        <div
          className="w-full h-[1px] mb-8"
          style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}20, transparent)` }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <p className="text-xs font-spaceGrotesk text-[#888] dark:text-[#E0E0E0]/40">
            © {mounted ? currentYear : "2026"} Rishabh Jain. All rights reserved.
          </p>

          <div className="text-sm font-spaceGrotesk font-medium text-[#555] dark:text-[#E0E0E0]/60 flex items-center gap-1.5">
            Designed & Built with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
            <span className="text-[#4A90E2]">Rishabh Jain</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;