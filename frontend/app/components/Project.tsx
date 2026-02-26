
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  IoLogoGithub,
  IoPlayOutline,
  IoCloseOutline,
  IoChevronForward,
} from "react-icons/io5";

/* ─── Types ─── */
interface Project {
  title: string;
  titleParts: [string, string];
  description: string;
  tags: string[];
  features: string[];
  videoUrl: string;
  githubUrl: string;
  liveUrl?: string;
}

/* ─── Data ─── */
const projects: Project[] = [
  {
    title: "EduWorld",
    titleParts: ["Edu", "World"],
    description:
      "AI-first digital campus platform unifying academic workflows — notes, AI tools, smart chat, code editor, canteen, video classes, analytics, attendance, resume builder, e-library, and more.",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Material UI",
      "GSAP",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Gemini API",
      "Qwen480",
      "Razorpay",
      "ZegoCloud",
      "jsPDF",
      "Multer",
      "Cloudinary",
      "Twilio",
      "Google Books API",
      "Google Translate",
      "YouTube Data API",
      "Google Custom Search API",
    ],
    features: [
      "Railway Concession PDF Generator (jsPDF + Razorpay)",
      "Notes Uploader & Viewer for teachers and students",
      "AI PDF Summarizer & Chat with PDF (Gemini)",
      "Smart Academic Calendar with full CRUD",
      "Multi-language UI via Google Translate",
      "AI-Powered Code Editor (C, C++, Java, Python, JS)",
      "Digital Canteen with Razorpay + WhatsApp confirmation",
      "AI Chatbot Study Assistant (Gemini)",
      "AI Image Generation & Recognition (ZB Tech)",
      "Video Lectures with subject filtering",
      "Smart Chat Room with AI Summarizer (Qwen480)",
      "AI Resume Builder (ATS-friendly PDF)",
      "AI Marks Analyzer — Excel upload + charts",
      "Live Classes via ZegoCloud (screen share, chat)",
      "ML-based Face Recognition Attendance",
      "YouTube Educational Search with embedded previews",
      "E-Library — Google Books API search & previews",
      "AI Search Agent — Google Search + Qwen480 summarizer",
    ],
    videoUrl: "/assets/EduWorld.mp4",
    githubUrl: "https://github.com/Rishabhjain610/EduworldFinal",
  },
  {
    title: "CrisisConnect",
    titleParts: ["Crisis", "Connect"],
    description:
      "AI-powered disaster management platform with multi-modal incident reporting, deepfake detection, smart trust scoring, real-time resource tracking, and crisis dashboards.",
    tags: [
      "React 19",
      "Vite",
      "Redux Toolkit",
      "Tailwind CSS",
      "Leaflet",
      "Recharts",
      "Firebase",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Gemini AI",
      "Ollama Gemma3:4B",
      "Tesseract.js",
      "Sharp",
      "Cloudinary",
      "Twilio",
      "Tavily",
      "JWT",
      "Bcrypt",
    ],
    features: [
      "Multi-Modal Incident Reporting — Voice, image/text, accelerometer",
      "AI-Powered Verification — Vision analysis & voice sentiment",
      "Deepfake Detection — EXIF analysis with 95%+ accuracy",
      "Smart Trust Scoring — 0–100 credibility from multiple sources",
      "Real-Time Resource Tracking — GPS with proximity matching",
      "Multi-Role Dashboards — Citizens, agencies, coordinators",
      "Crisis News Feed — AI-summarized with sentiment analysis",
      "Interactive Heatmaps — Geographic incident density clustering",
      "Request Management — Formal resource request & approval",
    ],
    videoUrl: "/assets/CrisesConnect.mp4",
    githubUrl: "https://github.com/Atharva1318-dev/CrisisConnect",
  },
  {
    title: "VibeShare",
    titleParts: ["Vibe", "Share"],
    description:
      "Dynamic MERN stack social media platform with real-time messaging, reels, stories, and AI chat summarization.",
    tags: [
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
      "Socket.IO",
      "Tailwind CSS",
      "GPT-OSS 120B",
    ],
    features: [
      "Create text posts, upload reels, and share stories",
      "Story Analytics — See who viewed your story",
      "Like, comment, save posts with real-time notifications",
      "Customizable user profiles with media gallery",
      "Follow/Unfollow system to curate your feed",
      "One-to-one & Group chats with zero latency",
      "Typing indicators & Online/Offline status",
      "Group management with admin privileges",
      "AI Chat Summarizer (GPT-OSS 120B)",
      "JWT Auth with OTP-based password recovery",
    ],
    videoUrl: "/assets/Vibeshare.mp4",
    githubUrl: "https://github.com/Rishabhjain610/VibeShare",
  },
  {
    title: "ShopNest",
    titleParts: ["Shop", "Nest"],
    description:
      "MERN-based multilingual clothing e-commerce with Gemini AI, Twilio notifications, and admin dashboard for product, order, and analytics management.",
    tags: [
      "MongoDB",
      "Node JS",
      "Express JS",
      "React JS",
      "Firebase OAuth",
      "Gemini API",
      "Tailwind CSS",
      "Twilio",
      "Google Translate API",
      "Chart JS",
    ],
    features: [
      "Browse products with filtering & search",
      "Multilingual Support via Google Translate API",
      "OAuth with Firebase + normal login/signup",
      "Cart & Checkout with Razorpay / COD",
      "Real-time Order Tracking updated by admin",
      "Gemini AI Chatbot — answers in user's language",
      "WhatsApp notifications via Twilio",
      "Admin Panel — Product & Order Management",
      "Analytics Dashboard — Geography, Demographics, Category",
      "Responsive design across all devices",
    ],
    videoUrl: "/assets/ShopNestdemo.mp4",
    githubUrl: "https://github.com/Rishabhjain610/ShopNest",
  },
  {
    title: "ClearChat",
    titleParts: ["Clear", "Chat"],
    description:
      "Full-stack MERN real-time chat app — Redux, JWT auth, Socket.IO messaging, Cloudinary media uploads, and emoji support.",
    tags: [
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
      "CORS",
      "Multer",
      "Tailwind CSS",
      "JWT",
      "Bcrypt",
      "Redux JS",
      "Socket.IO",
    ],
    features: [
      "User Auth — Signup, Login, Logout with JWT cookies",
      "Real-Time Chat via Socket.IO with typing indicators",
      "Read receipts for sent messages",
      "Media Sharing — Images/videos via Multer + Cloudinary",
      "Emoji Picker — Integrated emoji search tool",
      "Chat History — Scrollable conversation threads",
      "Secure Auth — bcrypt hashing + secure cookies",
      "Toast Notifications for actions & errors",
      "Responsive UI built with Tailwind CSS",
    ],
    videoUrl: "/assets/clearchat.mp4",
    githubUrl: "https://github.com/Rishabhjain610/ClearChat",
  },
  {
    title: "Taskflow",
    titleParts: ["Task", "flow"],
    description:
      "Minimalistic full-stack To-Do app for managing daily tasks. Secured with JWT authentication and bcrypt hashing.",
    tags: [
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
      "CORS",
      "React-tsparticle",
      "Tailwind CSS",
      "JWT",
    ],
    features: [
      "Task Management — Add, edit, and delete tasks",
      "JWT Authentication — Secure login & registration",
      "Password Hashing with bcrypt",
      "CORS enabled for smooth communication",
      "Fully Responsive — Optimized for all screen sizes",
    ],
    videoUrl: "/assets/taskify.mp4",
    githubUrl: "https://github.com/Rishabhjain610/Taskflow",
  },
  {
    title: "Blogify",
    titleParts: ["Blog", "ify"],
    description:
      "Full-stack blog application for creating, reading, updating and deleting posts with secure auth and image uploads.",
    tags: [
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
      "CORS",
      "Multer",
      "Tailwind CSS",
      "JWT",
      "Bcrypt",
    ],
    features: [
      "Create & Publish Blog Posts",
      "Image Uploads via Multer",
      "JWT Authentication — Secure login & registration",
      "Password Hashing with bcrypt",
      "CORS enabled for frontend-backend integration",
      "Fully Responsive across all devices",
    ],
    videoUrl: "/assets/blogify.mp4",
    githubUrl: "https://github.com/Rishabhjain610/Blogify",
  },
  {
    title: "AirBnb",
    titleParts: ["Air", "Bnb"],
    description:
      "Full-stack Airbnb clone with listings, bookings, ratings, and search. MERN stack, Cloudinary media, JWT auth.",
    tags: [
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
      "CORS",
      "Cloudinary",
      "Tailwind CSS",
      "JWT",
      "Cookie-parser",
      "React-Toast",
      "Multer",
    ],
    features: [
      "User Auth — Signup, Login, Logout with JWT cookies",
      "Listing Management — Create, update, view, delete properties",
      "Booking System — Book, view, and cancel bookings",
      "Search Listings by name, location, or description",
      "Place Ratings & Reviews",
      "Image Uploads via Multer + Cloudinary",
      "Toast Notifications for user feedback",
      "Responsive Design with Tailwind CSS",
    ],
    videoUrl: "/assets/AirBnb.mp4",
    githubUrl: "https://github.com/Rishabhjain610/airBnb",
  },
  {
    title: "JobPrep",
    titleParts: ["Job", "Prep"],
    description:
      "AI-powered platform with chatbot for interview prep, ATS-friendly resume builder, and real-time job search portal.",
    tags: ["React JS", "Firebase", "Gemini API", "Rapid API", "Tailwind CSS"],
    features: [
      "AI Chatbot — Real-time DSA, coding & interview prep",
      "AI Resume Builder — ATS-friendly PDF generation",
      "Job Search Portal — Listings tailored to your skills",
    ],
    videoUrl: "/assets/JobPrep.mp4",
    githubUrl: "https://github.com/Rishabhjain610/Jobprepfinal",
  },
  {
    title: "Tesla",
    titleParts: ["Te", "sla"],
    description:
      "A reimagined Tesla website with stunning animations using React Three Fiber, Framer Motion, GSAP, and Tailwind CSS.",
    tags: ["React JS", "Three JS", "GSAP", "Tailwind CSS", "Framer Motion"],
    features: [
      "Tesla-like UI — Stunning homepage design",
      "Framer Motion — Smooth transitions & motion effects",
      "React Three Fiber — Immersive 3D models (Three.js)",
      "GSAP Scroll Effects — Parallax, car movement, fade-ins",
      "Desktop-first — High-end immersive experience",
    ],
    videoUrl: "/assets/tesla.mp4",
    githubUrl: "https://github.com/Rishabhjain610/tesla",
  },
  {
    title: "Shiksha",
    titleParts: ["Shi", "ksha"],
    description:
      "Secure online exam platform with real-time video proctoring, auto-timer, and strict integrity measures.",
    tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Font Awesome"],
    features: [
      "Tab Switching Detection — Auto-closes test",
      "Minimization Restriction — Ends test on minimize",
      "Copy Protection — Disables text copying",
      "Screenshot Detection — Terminates on screenshot",
      "Right-Click & Console Block",
      "Auto Timer — Test ends when time runs out",
      "Live Video Monitoring — Camera-based activity monitor",
    ],
    videoUrl: "/assets/shiksha.mp4",
    githubUrl: "https://github.com/Rishabhjain610/shiksha",
  },
];

/* ─── CLI map ─── */
const CLI_CMDS: Record<string, string> = {
  demo: "demo",
  show: "demo",
  s: "demo",
  play: "demo",
  watch: "demo",
  github: "github",
  git: "github",
  repo: "github",
  source: "github",
  help: "help",
};

/* ─── Motion variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

/* ════════════════════════════
   Tag pill
════════════════════════════ */
const Tag = ({
  label,
  accent = false,
  dark = false,
}: {
  label: string;
  accent?: boolean;
  dark?: boolean;
}) => (
  <span
    className="text-xs font-mono px-2.5 py-1 rounded-md border font-spaceGrotesk"
    style={
      accent
        ? {
            color: "#4A90E2",
            background: "rgba(74,144,226,0.12)",
            borderColor: "rgba(74,144,226,0.25)",
          }
        : dark
        ? {
            color: "#8b949e",
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.1)",
          }
        : {
            color: "#4A90E2",
            background: "rgba(74,144,226,0.1)",
            borderColor: "rgba(74,144,226,0.2)",
          }
    }
  >
    {label}
  </span>
);

/* ════════════════════════════
   CardCLI
════════════════════════════ */
interface CardCLIProps {
  project: Project;
  onDemo: () => void;
}

const CardCLI = ({ project, onDemo }: CardCLIProps) => {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    { text: string; type: "cmd" | "ok" | "err" | "info" }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    const echo = { text: `$ ${raw}`, type: "cmd" as const };
    const action = CLI_CMDS[cmd];
    if (action === "demo") {
      setHistory((p) => [
        ...p,
        echo,
        { text: `▶  Loading ${project.title} demo…`, type: "ok" },
      ]);
      setInput("");
      setTimeout(() => onDemo(), 300);
      return;
    }
    if (action === "github") {
      setHistory((p) => [...p, echo, { text: "↗  Opening repo…", type: "ok" }]);
      setInput("");
      setTimeout(() => window.open(project.githubUrl, "_blank"), 300);
      return;
    }
    if (action === "help") {
      setHistory((p) => [
        ...p,
        echo,
        { text: "  demo    →  watch project demo", type: "info" },
        { text: "  github  →  open source code", type: "info" },
        { text: "  clear   →  clear terminal", type: "info" },
      ]);
      setInput("");
      return;
    }
    setHistory((p) => [
      ...p,
      echo,
      { text: `not found: ${cmd}  (try 'help')`, type: "err" },
    ]);
    setInput("");
  };

  const lineColors = {
    cmd: "#444",
    ok: "#4A90E2",
    err: "#e05252",
    info: "#555",
  };

  return (
    <div
      className="rounded-lg overflow-hidden border border-white/[0.06]"
      style={{ background: "#0d0d0d" }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]"
        style={{ background: "#111" }}
      >
        <span
          className="w-2 h-2 rounded-full block"
          style={{ background: "#ff5f57" }}
        />
        <span
          className="w-2 h-2 rounded-full block"
          style={{ background: "#febc2e" }}
        />
        <span
          className="w-2 h-2 rounded-full block"
          style={{ background: "#28c840" }}
        />
        <span
          className="ml-2 font-mono tracking-widest"
          style={{ fontSize: 9, color: "#3a3a3a" }}
        >
          terminal
        </span>
      </div>

      {/* history */}
      {history.length > 0 && (
        <div
          ref={scrollRef}
          className="px-3 pt-2 overflow-y-auto"
          style={{ maxHeight: 64 }}
        >
          {history.map((line, i) => (
            <p
              key={i}
              className="font-mono leading-relaxed"
              style={{ fontSize: 10, color: lineColors[line.type] }}
            >
              {line.text}
            </p>
          ))}
        </div>
      )}

      {/* input */}
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span
          className="font-mono select-none"
          style={{ fontSize: 10, color: "#4A90E2" }}
        >
          $
        </span>
        {mounted ? (
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run(input);
            }}
            spellCheck={false}
            autoComplete="off"
            placeholder="type 'demo' or 'help'…"
            className="flex-1 bg-transparent border-none outline-none font-mono"
            style={{ fontSize: 10, color: "#c0c0c0", caretColor: "#4A90E2" }}
          />
        ) : (
          <span className="font-mono" style={{ fontSize: 10, color: "#333" }}>
            type 'demo' or 'help'…
          </span>
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════
   Main
════════════════════════════ */
const Project = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const dark = mounted && resolvedTheme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (activeVideo && videoRef.current) videoRef.current.play();
  }, [activeVideo]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const active = activeVideo
    ? projects.find((p) => p.title === activeVideo)
    : null;

  return (
    <section
      id="projects"
      className="w-full px-6 md:px-12 lg:px-20 py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
        .font-spaceGrotesk { font-family: 'Space Grotesk', system-ui, sans-serif !important; }
        .dm-mono { font-family: 'DM Mono', monospace !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #4A90E2; }
      `}</style>

      <div className="max-w-6xl mx-auto px-auto relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeUp}
          className="mb-14 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full
                       font-spaceGrotesk mb-4"
            style={{
              backgroundColor: "rgba(74,144,226,0.12)",
              color: "#4A90E2",
            }}
          >
            What I Build
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Featured{" "}
            <span
              style={{
                color: "#4A90E2",
                textShadow: "0 0 28px rgba(74,144,226,0.22)",
              }}
            >
              Projects
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: "#4A90E2", opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.12 }}
              variants={cardVariant}
              transition={{ delay: Math.min(i * 0.05, 0.25) }}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: dark ? "#0d1117" : "#FFFFFF",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#E0E0E0"}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(74,144,226,0.35)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(74,144,226,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = dark
                  ? "rgba(255,255,255,0.08)"
                  : "#E0E0E0";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* window chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08]"
                style={{ background: dark ? "#161b22" : "#F5F5F5" }}
              >
                <span className="w-3 h-3 rounded-full block" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full block" style={{ background: "#febc2e" }} />
                <span className="w-3 h-3 rounded-full block" style={{ background: "#28c840" }} />
                <span
                  className="dm-mono ml-auto tracking-wider"
                  style={{ fontSize: 11, color: dark ? "#6e7681" : "#999" }}
                >
                  ~/{p.title.toLowerCase()}
                </span>
              </div>

              {/* card body */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                {/* title */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="dm-mono select-none font-spaceGrotesk"
                    style={{ fontSize: 11, color: dark ? "#6e7681" : "#999" }}
                  >
                    $
                  </span>
                  <h3
                    className="font-bold font-spaceGrotesk tracking-tight leading-none"
                    style={{ fontSize: 26, letterSpacing: "-0.02em", color: dark ? "#c9d1d9" : "#1A1A1A" }}
                  >
                    <span style={{ color: "#4A90E2" }}>{p.titleParts[0]}</span>
                    <span>{p.titleParts[1]}</span>
                  </h3>
                </div>

                {/* description */}
                <div>
                  <p
                    className="dm-mono uppercase tracking-[0.15em] mb-2"
                    style={{ fontSize: 11, color: dark ? "#3fb950" : "#4A90E2", opacity: 0.7 }}
                  >
                    <IoChevronForward className="inline" size={11} /> README.md
                  </p>
                  <p
                    className="leading-relaxed font-spaceGrotesk"
                    style={{ fontSize: 15, color: dark ? "#8b949e" : "#555", lineHeight: "1.6" }}
                  >
                    {p.description}
                  </p>
                </div>

                {/* stack tags */}
                <div>
                  <p
                    className="dm-mono uppercase tracking-[0.15em] mb-2.5"
                    style={{ fontSize: 11, color: dark ? "#6e7681" : "#999" }}
                  >
                    <IoChevronForward className="inline" size={11} /> stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 10).map((t) => (
                      <Tag key={t} label={t} dark={dark} />
                    ))}
                    {p.tags.length > 10 && (
                      <Tag label={`+${p.tags.length - 10}`} accent />
                    )}
                  </div>
                </div>

                {/* spacer */}
                <div className="flex-1" />

                {/* action buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t" style={{ borderColor: dark ? "rgba(74,144,226,0.1)" : "rgba(74,144,226,0.15)" }}>
                  <button
                    onClick={() => setActiveVideo(p.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-spaceGrotesk
                               font-semibold transition-all duration-300 cursor-pointer border text-sm"
                    style={{
                      background: "rgba(74,144,226,0.15)",
                      color: "#4A90E2",
                      border: "1px solid rgba(74,144,226,0.25)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget.style.background = "rgba(74,144,226,0.25)");
                      (e.currentTarget.style.borderColor = "rgba(74,144,226,0.35)");
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget.style.background = "rgba(74,144,226,0.15)");
                      (e.currentTarget.style.borderColor = "rgba(74,144,226,0.25)");
                    }}
                  >
                    <IoPlayOutline size={14} /> Demo
                  </button>

                  <a
                    href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-spaceGrotesk
                               font-semibold no-underline transition-all duration-300 text-sm border"
                    style={{
                      color: "#8b949e",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,144,226,0.35)";
                      (e.currentTarget as HTMLElement).style.color = "#4A90E2";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "#8b949e";
                    }}
                  >
                    <IoLogoGithub size={14} /> Source
                  </a>

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-spaceGrotesk
                                 font-semibold no-underline transition-all duration-200 text-sm border"
                      style={{
                        border: "1px solid rgba(63,185,80,0.25)",
                        background: "rgba(63,185,80,0.12)",
                        color: "#3fb950",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(63,185,80,0.2)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(63,185,80,0.12)"}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                      Live
                    </a>
                  )}
                </div>

                {/* CLI */}
                <CardCLI project={p} onDemo={() => setActiveVideo(p.title)} />
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Footer ── */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeUp}
          className="dm-mono mt-16 text-center font-spaceGrotesk"
          style={{ fontSize: 13, color: "#6e7681" }}
        >
          <span style={{ color: "#3fb950" }}>$</span> ls projects/ | wc -l →{" "}
          <span style={{ color: "#4A90E2", fontWeight: "bold" }}>
            {projects.length}
          </span>
          {" · View all on "}
          <a
            href="https://github.com/Rishabhjain610"
            target="_blank" rel="noopener noreferrer"
            className="no-underline transition-colors duration-200 font-bold hover:underline"
            style={{ color: "#4A90E2" }}
          >
            GitHub
          </a>
        </motion.p>
      </div>

      {/* ════════════════════════════════
          VIDEO MODAL
      ════════════════════════════════ */}
      <AnimatePresence>
        {activeVideo && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                maxHeight: "90vh",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {/* modal title bar */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] flex-shrink-0"
                style={{ background: "#222" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full block"
                      style={{ background: "#e05252" }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full block"
                      style={{ background: "#e0a952" }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full block"
                      style={{ background: "#52c452" }}
                    />
                  </div>
                  <span className="dm-mono ml-2" style={{ fontSize: 11 }}>
                    <span style={{ color: "#4A90E2" }}>
                      {active.titleParts[0]}
                    </span>
                    <span style={{ color: "#555" }}>
                      {active.titleParts[1]}
                    </span>
                    <span style={{ color: "#3a3a3a" }}> — demo</span>
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex items-center justify-center p-1 rounded transition-colors duration-200 cursor-pointer border-0 bg-transparent"
                  style={{ color: "#555" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#E0E0E0")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                >
                  <IoCloseOutline size={18} />
                </button>
              </div>

              {/* video + details */}
              <div
                className="flex flex-1 overflow-hidden"
                style={{ minHeight: 0 }}
              >
                {/* video pane */}
                <div
                  className="flex items-center justify-center border-r border-white/[0.07]"
                  style={{ flex: "0 0 58%", background: "#000" }}
                >
                  <video
                    ref={videoRef}
                    src={active.videoUrl}
                    controls
                    loop
                    muted
                    className="w-full h-full object-contain block"
                  />
                </div>

                {/* details pane */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                  <div>
                    <h3
                      className="font-bold tracking-tight leading-none mb-2"
                      style={{ fontSize: 24, letterSpacing: "-0.02em" }}
                    >
                      <span style={{ color: "#4A90E2" }}>
                        {active.titleParts[0]}
                      </span>
                      <span style={{ color: "#E0E0E0" }}>
                        {active.titleParts[1]}
                      </span>
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ fontSize: 13, color: "#777" }}
                    >
                      {active.description}
                    </p>
                  </div>

                  {/* features */}
                  <div>
                    <p
                      className="dm-mono uppercase tracking-[0.1em] mb-3"
                      style={{ fontSize: 9, color: "#3a3a3a" }}
                    >
                      features.md
                    </p>
                    <ul className="flex flex-col gap-2 list-none m-0 p-0">
                      {active.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <IoChevronForward
                            size={10}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: "#4A90E2" }}
                          />
                          <span
                            className="leading-snug"
                            style={{ fontSize: 12, color: "#999" }}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* stack */}
                  <div>
                    <p
                      className="dm-mono uppercase tracking-[0.1em] mb-2"
                      style={{ fontSize: 9, color: "#3a3a3a" }}
                    >
                      stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tags.map((t) => (
                        <Tag key={t} label={t} dark={true} />
                      ))}
                    </div>
                  </div>

                  {/* github cta */}
                  <a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg
                               font-semibold no-underline transition-colors duration-200"
                    style={{
                      fontSize: 12,
                      color: "#4A90E2",
                      border: "1px solid rgba(74,144,226,0.25)",
                      background: "rgba(74,144,226,0.08)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(74,144,226,0.18)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(74,144,226,0.08)")
                    }
                  >
                    <IoLogoGithub size={14} /> View on GitHub
                  </a>
                </div>
              </div>

              {/* status bar */}
              <div
                className="flex items-center gap-2 px-4 py-2 border-t border-white/[0.07] flex-shrink-0"
                style={{ background: "#222" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full block"
                  style={{ background: "#52c452" }}
                />
                <span
                  className="dm-mono tracking-wider"
                  style={{ fontSize: 9, color: "#3a3a3a" }}
                >
                  ● playing — press{" "}
                  <kbd
                    className="rounded px-1.5 py-px dm-mono"
                    style={{
                      fontSize: 9,
                      color: "#555",
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    esc
                  </kbd>{" "}
                  to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
