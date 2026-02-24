"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoLogoHtml5,
  IoLogoCss3,
  IoLogoJavascript,
  IoLogoReact,
  IoLogoNodejs,
  IoLogoPython,
  IoLogoGithub,
  IoEyeOutline,
  IoLogoFirebase,
  IoGitBranch,
  IoCodeSlash,
} from "react-icons/io5";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiRedux,
  SiGreensock,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiGooglecloud,
  SiGooglegemini,
  SiOllama,
  SiVercel,
  SiShadcnui,
  SiSocketdotio,
  SiCloudinary,
  SiAmazonwebservices,
  SiRender,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

/* ─── Skill type ─── */
interface Skill {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;       // brand color for icon bg
  darkColor?: string;  // optional override for dark mode
  glowColor?: string;  // optional glow color override
}

/* ─── Data with brand colors ─── */
const categories: { label: string; skills: Skill[] }[] = [
  {
    label: "Languages",
    skills: [
      { name: "HTML", icon: IoLogoHtml5, color: "#E34C26" },
      { name: "CSS", icon: IoLogoCss3, color: "#1572B6" },
      { name: "JavaScript", icon: IoLogoJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: IoLogoPython, color: "#3776AB" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "C", icon: IoCodeSlash, color: "#5C6BC0" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "React JS", icon: IoLogoReact, color: "#61DAFB" },
      { name: "Next JS", icon: SiNextdotjs, color: "#000000", glowColor: "#9CA3AF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Shadcn UI", icon: SiShadcnui, color: "#000000", glowColor: "#9CA3AF" },
      { name: "Redux JS", icon: SiRedux, color: "#764ABC" },
      { name: "GSAP", icon: SiGreensock, color: "#3AAA64" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    label: "Databases & Backend",
    skills: [
      { name: "Node JS", icon: IoLogoNodejs, color: "#339933" },
      { name: "Express JS", icon: SiExpress, color: "#000000", glowColor: "#9CA3AF" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#010101", glowColor: "#9CA3AF" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#00758F" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Firebase", icon: IoLogoFirebase, color: "#FFCA28" },
    ],
  },
  {
    label: "AI/ML",
    skills: [
      { name: "Gemini API", icon: SiGooglegemini, color: "#886FBF" },
      { name: "OCR", icon: IoEyeOutline, color: "#00A6D6" },
      { name: "Ollama", icon: SiOllama, color: "#000000", glowColor: "#9CA3AF" },
      { name: "Vercel AI SDK", icon: SiVercel, color: "#000000", glowColor: "#9CA3AF" },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "AWS (Learning)", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "GitHub", icon: IoLogoGithub, color: "#181717", glowColor: "#9CA3AF" },
      { name: "Git", icon: IoGitBranch, color: "#F05032" },
      { name: "Postman", icon: SiPostman, color: "#FF6C00" },
      { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
    ],
  },
];

/* ─── Viewport config ─── */
const vp = { once: false, amount: 0.3 };

/* ─── Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.4, ease: "easeIn" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const skillCard = {
  hidden: { opacity: 0, scale: 0.8, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.15 },
  },
};

/* ─── Helper: hex to rgba ─── */
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* ─── Helper: detect if a hex color is light ─── */
const isLightColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.65;
};

/* ═══════════════════════════════════════════════ */

const Skills = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="skills"
      className="w-full px-6 md:px-12 lg:px-20 py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileNotInView="hidden"
          viewport={vp}
          className="mb-16 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full font-spaceGrotesk mb-4"
            style={{ backgroundColor: "rgba(74,144,226,0.12)", color: "#4A90E2" }}
          >
            What I work with
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Tech{" "}
            <span style={{ color: "#4A90E2", textShadow: "0 0 28px rgba(74,144,226,0.22)" }}>
              Stack
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div className="h-[2px] w-14 rounded-full" style={{ backgroundColor: "#4A90E2", opacity: 0.45 }} />
          </div>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileNotInView="hidden"
          viewport={vp}
          className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.label}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.93 }}
              role="tab"
              aria-selected={active === i}
              aria-controls={`tabpanel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((active + 1) % categories.length);
                if (e.key === "ArrowLeft") setActive((active - 1 + categories.length) % categories.length);
              }}
              className="relative px-5 py-2.5 rounded-xl text-sm font-spaceGrotesk
                         transition-all duration-300 cursor-pointer overflow-hidden outline-none
                         focus-visible:ring-2 focus-visible:ring-[#4A90E2] focus-visible:ring-offset-2"
              style={{
                backgroundColor:
                  active === i ? "#4A90E2" : "rgba(74,144,226,0.08)",
                color: active === i ? "#FFFFFF" : "#4A90E2",
                fontWeight: active === i ? 800 : 600,
                letterSpacing: active === i ? "0.02em" : "0",
                boxShadow:
                  active === i
                    ? "0 4px 18px rgba(74,144,226,0.4)"
                    : "none",
                transform: active === i ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {cat.label}

              {/* Active indicator dot */}
              <AnimatePresence>
                {active === i && (
                  <motion.span
                    layoutId="activeTabDot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* ── Skills Grid ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileNotInView="hidden"
          viewport={vp}
          role="tabpanel"
          id={`tabpanel-${active}`}
          aria-labelledby={categories[active].label}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={gridContainer}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              whileNotInView="hidden"
              viewport={vp}
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {categories[active].skills.map((skill) => {
                const IconComp = skill.icon;
                const light = isLightColor(skill.color);
                const isDarkIcon = !!skill.glowColor;

                return (
                  <motion.div
                    key={skill.name}
                    variants={skillCard}
                    whileHover={{
                      y: -6,
                      scale: 1.04,
                      borderColor: hexToRgba(skill.color, 0.5),
                      boxShadow: `0 12px 32px ${hexToRgba(skill.color, 0.22)},
                                  0 0 0 1px ${hexToRgba(skill.color, 0.08)}`,
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative p-5 rounded-2xl border
                               flex flex-col items-center gap-3
                               cursor-default transition-colors duration-300
                               outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]"
                    style={{
                      backgroundColor: hexToRgba(skill.glowColor || skill.color, 0.06),
                      borderColor: isDarkIcon
                        ? "rgba(160,160,180,0.25)"
                        : hexToRgba(skill.color, 0.15),
                    }}
                    tabIndex={0}
                    title={skill.name}
                    aria-label={skill.name}
                  >
                    {/* Glow behind icon on hover */}
                    <div
                      className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{ backgroundColor: hexToRgba(skill.glowColor || skill.color, 0.4) }}
                    />

                    {/* Icon with brand-colored bg */}
                    <motion.div
                      className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center
                                  `}
                      whileHover={{ scale: 1.15, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{ backgroundColor: skill.color }}
                    >
                      <IconComp
                        size={24}
                        className="relative z-10"
                        style={{ color: light ? "#1A1A1A" : "#FFFFFF" }}
                      />
                    </motion.div>

                    {/* Name */}
                    <span className="relative z-10 text-sm font-semibold font-spaceGrotesk
                                     text-[#1A1A1A] dark:text-[#E0E0E0] text-center
                                     transition-colors duration-300">
                      {skill.name}
                    </span>

                    {/* Subtle shimmer on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                                 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, transparent 30%, ${hexToRgba(skill.color, 0.06)} 50%, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Total count ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileNotInView="hidden"
          viewport={vp}
          className="mt-12 text-center lg:text-left"
        >
          <p className="text-sm font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] opacity-60">
            Proficient in{" "}
            <span className="font-bold" style={{ color: "#4A90E2" }}>
              {categories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
            </span>{" "}
            technologies across {categories.length} categories
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;