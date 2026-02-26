"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const dark = mounted && resolvedTheme === "dark";
  const currentYear = new Date().getFullYear();
  const ACCENT = "#4A90E2";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const vp = { once: false, amount: 0.3 };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <footer className="w-full py-12 px-6 md:px-12 lg:px-20 bg-[#F4F4F4] dark:bg-[#121212] transition-colors duration-300 border-t border-[#E0E0E0] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          .font-spaceGrotesk { font-family: 'Space Grotesk', system-ui, sans-serif !important; }
        `}</style>

        {/* Social Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="flex items-center gap-6 mb-8"
        >
          {[
            {
              Icon: IoLogoGithub,
              href: "https://github.com/Rishabhjain610",
              label: "GitHub",
            },
            {
              Icon: IoLogoLinkedin,
              href: "https://www.linkedin.com/in/rishabhjain610/",
              label: "LinkedIn",
            },
            {
              Icon: IoLogoInstagram,
              href: "https://instagram.com/rishabh_jain610",
              label: "Instagram",
            },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#555] dark:text-[#E0E0E0]/60 hover:text-[#4A90E2] dark:hover:text-[#4A90E2] transition-all duration-300"
              style={{
                color: dark ? "#E0E0E0" : "#888"
              }}
            >
              <s.Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Separator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="w-full h-[1px] mb-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}20, transparent)`,
          }}
        />

        {/* Bottom Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="flex flex-col md:flex-row items-center justify-between w-full gap-4 text-center md:text-left"
        >
          <p className="text-xs font-spaceGrotesk text-[#888] dark:text-[#E0E0E0]/40 font-medium"
            style={{ color: dark ? "rgba(224, 224, 224, 0.4)" : "#666" }}>
            © {mounted ? currentYear : "2026"} Rishabh Jain. All rights
            reserved.
          </p>

          <div className="text-sm font-spaceGrotesk font-medium text-[#555] dark:text-[#E0E0E0]/60 flex items-center gap-1.5 justify-center md:justify-end"
            style={{ color: dark ? "rgba(224, 224, 224, 0.6)" : "#666" }}>
            Designed & Built with{" "}
            <span className="text-red-500 animate-pulse inline-block">❤️</span>{" "}
            by{" "}
            <span className="text-[#4A90E2] font-semibold">Rishabh Jain</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
