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
  IoLogoFirebase,
  IoGitBranch,
  IoCodeSlash,
} from "react-icons/io5";
import { LuScanText, LuFileSearch } from "react-icons/lu";
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
  SiLangchain,
  SiRedis,
  SiDocker,
  SiNginx,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

/* ─── Skill type ─── */
interface Skill {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string; // brand color for icon bg
  darkColor?: string; // optional override for dark mode
  glowColor?: string; // optional glow color override
}

/* ─── Custom Skill Icons ─── */
const LangGraphIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    className={className}
    style={style}
  >
    <path
      clipRule="evenodd"
      d="M6.099 6H17.9C21.264 6 24 8.692 24 12s-2.736 6-6.099 6H6.1C2.736 18 0 15.308 0 12s2.736-6 6.099-6zm5.419 9.3c.148.154.367.146.561.106l.002.001c.09-.072-.038-.163-.16-.25-.074-.052-.145-.102-.166-.147.068-.08-.133-.265-.289-.408a1.52 1.52 0 01-.15-.148c-.11-.119-.155-.268-.2-.418-.03-.1-.06-.2-.11-.292-.304-.694-.653-1.383-1.143-1.97-.315-.39-.674-.74-1.033-1.09a19.384 19.384 0 01-.683-.688c-.226-.229-.362-.511-.499-.794-.114-.236-.228-.473-.396-.68-.507-.735-2.107-.936-2.342.104 0 .032-.01.052-.039.073-.13.094-.245.2-.342.327-.238.326-.274.877.022 1.17l.001-.019c.01-.147.02-.286.139-.391.228.193.576.262.841.117.32.45.422.995.525 1.54.085.456.17.912.382 1.316l.014.022c.124.203.25.41.41.587.059.089.178.184.297.279.157.125.314.25.329.359v.143c-.001.285-.002.58.184.813.103.205-.15.41-.352.385-.112.015-.233-.014-.354-.042-.165-.04-.329-.078-.462-.003-.038.04-.091.04-.145.042-.064.002-.129.004-.167.07-.008.019-.026.04-.045.063-.042.05-.087.105-.033.146l.015-.01c.082-.062.16-.12.27-.084-.014.08.039.102.092.123l.027.012a.344.344 0 01-.008.056c-.009.045-.017.088.018.127a.598.598 0 00.046-.054c.037-.046.073-.092.139-.11.144.19.289.111.471.013.206-.111.459-.248.81-.055-.135-.006-.255.01-.345.12-.023.024-.042.052-.002.084.207-.132.294-.085.375-.04.06.032.115.063.212.024l.07-.036c.155-.083.314-.166.499-.137-.139.039-.188.125-.242.218-.026.047-.054.095-.094.14-.021.021-.03.046-.007.08.29-.023.4-.095.548-.192.07-.046.15-.099.261-.154.124-.075.248-.027.368.02.13.05.255.098.371-.014.037-.033.083-.034.129-.034.016 0 .033 0 .05-.002-.037-.19-.24-.188-.448-.186-.24.003-.483.006-.475-.289.222-.149.224-.407.226-.651 0-.06 0-.117.005-.173.163.09.336.16.508.229.162.065.323.13.474.21.158.25.404.58.732.558.008-.026.016-.047.026-.073.019.004.039.008.059.014.086.02.178.044.223-.056zm6.429-2.829c.19.186.447.29.716.29.269 0 .526-.104.716-.29a.98.98 0 00.297-.7.98.98 0 00-.297-.7 1.024 1.024 0 00-1.08-.224l-.58-.831-.405.272.583.835a.978.978 0 00.05 1.348zm-1.817-2.69a1.03 1.03 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.028 1.028 0 00-1.298.14.987.987 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm0 5.752a1.032 1.032 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.027 1.027 0 00-1.298.14.986.986 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm.93-3.516v-.492h-1.55a.977.977 0 00-.217-.404l.584-.847-.425-.276-.583.847a1.023 1.023 0 00-1.047.23.973.973 0 00-.296.696c0 .261.107.512.296.696a1.023 1.023 0 001.047.23l.583.847.42-.276-.579-.847a.977.977 0 00.217-.404h1.55z"
    />
  </svg>
);

const QdrantIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12 2L2.5 7v10L12 22l9.5-5V7L12 2zm0 2.4l7 3.68-3 1.58-4-2.1-4 2.1-3-1.58 7-3.68zM4.5 9.12l6.5 3.42v7.16L4.5 16.3V9.12zm8.5 10.58v-7.16l6.5-3.42v7.18l-6.5 3.4z" />
  </svg>
);

const VectorDBIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    <circle cx="8" cy="12" r="1.2" fill="currentColor" />
    <circle cx="12" cy="10.5" r="1.2" fill="currentColor" />
    <circle cx="16" cy="13" r="1.2" fill="currentColor" />
    <path d="M8 12l4-1.5l4 2.5" strokeWidth="1.2" strokeDasharray="2 2" />
  </svg>
);

const RAGIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="8" cy="15" r="4" />
    <path d="m11 18 3 3" />
    <path d="M7 13v4" />
    <path d="M9 14v2" />
  </svg>
);

const GroqIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12.036 2c-3.853-.035-7 3-7.036 6.781-.035 3.782 3.055 6.872 6.908 6.907h2.42v-2.566h-2.292c-2.407.028-4.38-1.866-4.408-4.23-.029-2.362 1.901-4.298 4.308-4.326h.1c2.407 0 4.358 1.915 4.365 4.278v6.305c0 2.342-1.944 4.25-4.323 4.279a4.375 4.375 0 01-3.033-1.252l-1.851 1.818A7 7 0 0012.029 22h.092c3.803-.056 6.858-3.083 6.879-6.816v-6.5C18.907 4.963 15.817 2 12.036 2z" />
  </svg>
);

const CICDIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const MicroservicesIcon = ({
  size = 28,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="16" y="2" width="6" height="6" rx="1" />
    <rect x="9" y="16" width="6" height="6" rx="1" />
    <path d="M5 8v4h14V8" />
    <path d="M12 12v4" />
  </svg>
);

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
      {
        name: "Next JS",
        icon: SiNextdotjs,
        color: "#000000",
        glowColor: "#9CA3AF",
      },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      {
        name: "Shadcn UI",
        icon: SiShadcnui,
        color: "#000000",
        glowColor: "#9CA3AF",
      },
      { name: "Redux JS", icon: SiRedux, color: "#764ABC" },
      { name: "GSAP", icon: SiGreensock, color: "#3AAA64" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    label: "Databases & Backend",
    skills: [
      { name: "Node JS", icon: IoLogoNodejs, color: "#339933" },
      {
        name: "Express JS",
        icon: SiExpress,
        color: "#000000",
        glowColor: "#9CA3AF",
      },
      {
        name: "Socket.IO",
        icon: SiSocketdotio,
        color: "#010101",
        glowColor: "#9CA3AF",
      },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#00758F" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Firebase", icon: IoLogoFirebase, color: "#FFCA28" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Qdrant", icon: QdrantIcon, color: "#DC2626" },
    ],
  },
  {
    label: "AI/ML",
    skills: [
      { name: "Gemini API", icon: SiGooglegemini, color: "#886FBF" },
      { name: "Groq", icon: GroqIcon, color: "#F55036" },
      { name: "RAG", icon: LuFileSearch, color: "#2563EB" },
      { name: "OCR", icon: LuScanText, color: "#00A6D6" },
      {
        name: "Ollama",
        icon: SiOllama,
        color: "#000000",
        glowColor: "#9CA3AF",
      },
      {
        name: "Vercel AI SDK",
        icon: SiVercel,
        color: "#000000",
        glowColor: "#9CA3AF",
      },
      {
        name: "LangChain",
        icon: SiLangchain,
        color: "#1C3C3C", // LangChain color
        glowColor: "#9CA3AF",
      },
      {
        name: "LangGraph",
        icon: LangGraphIcon,
        color: "#1C3C3C",
        glowColor: "#9CA3AF",
      },
      {
        name: "Vector DB",
        icon: VectorDBIcon,
        color: "#7C3AED",
      },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "CI/CD", icon: CICDIcon, color: "#10B981" },
      { name: "Microservices", icon: MicroservicesIcon, color: "#6366F1" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
    ],
  },
  {
    label: "Tools",
    skills: [
      {
        name: "GitHub",
        icon: IoLogoGithub,
        color: "#181717",
        glowColor: "#9CA3AF",
      },
      { name: "Git", icon: IoGitBranch, color: "#F05032" },
      { name: "Postman", icon: SiPostman, color: "#FF6C00" },
      { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
    ],
  },
];

/* ─── Viewport config ─── */
const vp = { once: false, amount: 0.2 };

/* ─── Variants ─── */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
    transition: { duration: 0.4, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration:
        typeof window !== "undefined" && window.innerWidth < 768 ? 0.25 : 0.55,
      ease: "easeOut" as const,
    },
  },
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
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const skillCard = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
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
          viewport={vp}
          className="mb-16 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full font-spaceGrotesk mb-4"
            style={{
              backgroundColor: "rgba(74,144,226,0.12)",
              color: "#4A90E2",
            }}
          >
            What I work with
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Tech{" "}
            <span
              style={{
                color: "#4A90E2",
                textShadow: "0 0 28px rgba(74,144,226,0.22)",
              }}
            >
              Stack
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: "#4A90E2", opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
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
              suppressHydrationWarning
              onKeyDown={(e) => {
                if (e.key === "ArrowRight")
                  setActive((active + 1) % categories.length);
                if (e.key === "ArrowLeft")
                  setActive(
                    (active - 1 + categories.length) % categories.length,
                  );
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
                  active === i ? "0 4px 18px rgba(74,144,226,0.4)" : "none",
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
                      backgroundColor: hexToRgba(
                        skill.glowColor || skill.color,
                        0.06,
                      ),
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
                      style={{
                        backgroundColor: hexToRgba(
                          skill.glowColor || skill.color,
                          0.4,
                        ),
                      }}
                    />

                    {/* Icon with brand-colored bg */}
                    <motion.div
                      className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center
                                  `}
                      whileHover={{ scale: 1.15, rotate: 3 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      style={{ backgroundColor: skill.color }}
                    >
                      <IconComp
                        size={24}
                        className="relative z-10"
                        style={{ color: light ? "#1A1A1A" : "#FFFFFF" }}
                      />
                    </motion.div>

                    {/* Name */}
                    <span
                      className="relative z-10 text-sm font-semibold font-spaceGrotesk
                                     text-[#1A1A1A] dark:text-[#E0E0E0] text-center
                                     transition-colors duration-300"
                    >
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
