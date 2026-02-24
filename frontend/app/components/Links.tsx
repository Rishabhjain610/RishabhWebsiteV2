"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import {
  IoDocument,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoMailOutline,

  IoClose,
  IoAdd,
} from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "next-themes";

const Links = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      name: "Resume",
      icon: <IoDocument size={18} />,
      href: "https://drive.google.com/file/d/1DV-irLeae0jWaRLNNyeMvwzPm8aqvXoB/view",
    },
    {
      name: "GitHub",
      icon: <IoLogoGithub size={18} />,
      href: "https://github.com/Rishabhjain610",
    },
    {
      name: "LinkedIn",
      icon: <IoLogoLinkedin size={18} />,
      href: "https://www.linkedin.com/in/rishabhjain610/",
    },

    {
      name: "LeetCode",
      icon: <SiLeetcode size={18} />,
      href: "https://leetcode.com/Rishabhjain610/",
    },
    {
      name: "Instagram",
      icon: <IoLogoInstagram size={18} />,
      href: "https://instagram.com/rishabh_jain610",
    },
    {
      name: "Email",
      icon: <IoMailOutline size={18} />,
      href: "mailto:rishabhjainwork1@gmail.com",
    },
  ];

  if (!mounted) return null;

  const isDark = theme === "dark";
  const accentColor = "#4A90E2";
  const borderColorValue = isDark ? "rgba(224, 224, 224, 0.1)" : "rgba(46, 46, 46, 0.1)";
  const hoverBgColor = isDark ? "rgba(74, 144, 226, 0.2)" : "rgba(74, 144, 226, 0.1)";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
      },
    },
  };

  const handleLinkClick = (href) => {
    window.open(href, "_blank");
  };

  return (
    <>
      {/* Main Round Button - Bottom Right */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: accentColor,
          boxShadow: `0 4px 20px ${accentColor}40`,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          <IoAdd size={24} />
        </motion.div>
      </motion.button>

      {/* Menu Items - Vertical Stack - Minimalist */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-30 rounded-2xl p-4 backdrop-blur-xl"
            style={{
              backgroundColor: isDark
                ? "rgba(18, 18, 18, 0.4)"
                : "rgba(244, 244, 244, 0.4)",
              border: `1px solid ${borderColorValue}`,
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.05)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex flex-col gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {links.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  variants={itemVariants}
                  className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: hoverBgColor,
                    color: accentColor,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  title={link.name}
                >
                  {link.icon}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Links;