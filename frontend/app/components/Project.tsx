"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoLogoGithub,
  IoPlayOutline,
  IoCloseOutline,
  IoChevronForward,
} from "react-icons/io5";

/* ─── Accent — same global accent as LandingPage + About ─── */
const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74,144,226,${a})`;

/* ─── Project type ─── */
interface Project {
  title: string;
  titleParts: [string, string];
  accent: string;
  description: string;
  tags: string[];
  features: string[];
  videoUrl: string;
  githubUrl: string;
  liveUrl?: string;
}

/* ─── Project data ─── */
const projects: Project[] = [
  {
    title: "EduWorld",
    titleParts: ["Edu", "World"],
    accent: "#886FBF",
    description:
      "AI-first digital campus platform unifying academic workflows — notes, AI tools, smart chat, code editor, canteen, video classes, analytics, attendance, resume builder, e-library, and more. Evolved across 3 hackathon versions.",
    tags: [
      "React", "Vite", "Tailwind CSS", "Material UI", "GSAP",
      "Node.js", "Express.js", "MongoDB", "Socket.IO",
      "Gemini API", "Qwen480", "Razorpay", "ZegoCloud",
      "jsPDF", "Multer", "Cloudinary", "Twilio",
      "Google Books API", "Google Translate",
      "YouTube Data API", "Google Custom Search API",
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
      "Video Lectures Module with subject filtering",
      "Smart Chat Room with AI Summarizer (Qwen480)",
      "AI Resume Builder (ATS-friendly PDF)",
      "AI Marks Analyzer — Excel upload + charts + insights",
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
    accent: "#E53E3E",
    description:
      "AI-powered disaster management platform with multi-modal incident reporting, deepfake detection, smart trust scoring, real-time resource tracking, and crisis dashboards.",
    tags: [
      "React 19", "Vite", "Redux Toolkit", "Tailwind CSS", "Leaflet",
      "Recharts", "Firebase", "Node.js", "Express.js", "MongoDB",
      "Mongoose", "Gemini AI", "Ollama Gemma3:4B", "Tesseract.js",
      "Sharp", "Cloudinary", "Twilio", "Tavily", "JWT", "Bcrypt",
    ],
    features: [
      "Multi-Modal Incident Reporting — Voice (SOS), image/text, accelerometer",
      "AI-Powered Verification — Vision analysis & voice sentiment detection",
      "Deepfake Detection — EXIF analysis with 95%+ accuracy",
      "Smart Trust Scoring — 0-100 credibility from multiple sources",

      "Real-Time Resource Tracking — GPS with proximity matching",
      "Multi-Role Dashboards — Citizens, agencies, coordinators",
      "Crisis News Feed — AI-summarized with sentiment analysis",
      "Interactive Heatmaps — Geographic incident density clustering",
      "Request Management — Formal resource request & approval workflow",
    ],
    videoUrl: "/assets/CrisesConnect.mp4",
    githubUrl: "https://github.com/Atharva1318-dev/CrisisConnect",
  },
  {
    title: "VibeShare",
    titleParts: ["Vibe", "Share"],
    accent: "#4A90E2",
    description:
      "Dynamic MERN stack social media platform with real-time messaging, reels, stories, and AI chat summarization for a modern community experience.",
    tags: [
      "React JS", "Node JS", "Express JS", "MongoDB", "Socket.IO",
      "Tailwind CSS", "GPT-OSS 120B",
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
      "AI Chat Summarizer (GPT-OSS 120B) — summarize discussions",
      "JWT Auth with OTP-based password recovery",
    ],
    videoUrl: "/assets/Vibeshare.mp4",
    githubUrl: "https://github.com/Rishabhjain610/VibeShare",
  },
  {
    title: "ShopNest",
    titleParts: ["Shop", "Nest"],
    accent: "#3AAA64",
    description:
      "MERN-based multilingual clothing e-commerce with Gemini AI, Twilio notifications, and admin dashboard for product, order, and analytics management.",
    tags: [
      "MongoDB", "Node JS", "Express JS", "React JS", "Firebase OAuth",
      "Gemini API", "Tailwind CSS", "Twilio", "Google Translate API",
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
      "Analytics Dashboard — Geography, Demographics, Category trends",
      "Responsive design across all devices",
    ],
    videoUrl: "/assets/ShopNestdemo.mp4",
    githubUrl: "https://github.com/Rishabhjain610/ShopNest",
  },
  {
    title: "ClearChat",
    titleParts: ["Clear", "Chat"],
    accent: "#764ABC",
    description:
      "Full-stack MERN real-time chat app using Redux, JWT auth, Socket.IO messaging, Cloudinary media uploads, emoji support, and responsive Tailwind UI.",
    tags: [
      "React JS", "Node JS", "Express JS", "MongoDB", "CORS", "Multer",
      "Tailwind CSS", "JWT", "Bcrypt", "Redux JS", "Socket.IO",
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
      "Lucide Icons for clean lightweight UI",
    ],
    videoUrl: "/assets/clearchat.mp4",
    githubUrl: "https://github.com/Rishabhjain610/ClearChat",
  },
  {
    title: "Taskflow",
    titleParts: ["Task", "flow"],
    accent: "#00A6D6",
    description:
      "Minimalistic full-stack To-Do app for managing daily tasks with a clean, responsive design. Secured with JWT authentication and bcrypt hashing.",
    tags: [
      "React JS", "Node JS", "Express JS", "MongoDB", "CORS",
      "React-tsparticle", "Tailwind CSS", "JWT",
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
    accent: "#F05032",
    description:
      "Full-stack blog application for creating, reading, updating and deleting blog posts with secure authentication and image uploads.",
    tags: [
      "React JS", "Node JS", "Express JS", "MongoDB", "CORS", "Multer",
      "Tailwind CSS", "JWT", "Bcrypt",
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
    accent: "#FF5A5F",
    description:
      "Full-stack Airbnb clone with listings, bookings, ratings, and search. Built with MERN stack, Cloudinary for media, and JWT authentication.",
    tags: [
      "React JS", "Node JS", "Express JS", "MongoDB", "CORS",
      "Cloudinary", "Tailwind CSS", "JWT", "Cookie-parser",
      "React-Toast", "Multer",
    ],
    features: [
      "User Auth — Signup, Login, Logout with JWT cookies",
      "Listing Management — Create, update, view, delete properties",
      "Booking System — Book, view, and cancel bookings",
      "Search Listings by name, location, or description",
      "Place Ratings & Reviews for discoverability",
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
    accent: "#FF9900",
    description:
      "AI-powered platform with chatbot for interview prep, ATS-friendly resume builder, and real-time job search portal.",
    tags: [
      "React JS", "Firebase", "Gemini API", "Rapid API", "Tailwind CSS",
    ],
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
    accent: "#E31937",
    description:
      "A reimagined Tesla website with stunning animations using React Three Fiber, Framer Motion, GSAP, and Tailwind CSS.",
    tags: [
      "React JS", "Three JS", "GSAP", "Tailwind CSS", "Framer Motion",
    ],
    features: [
      "Tesla-like UI — Stunning homepage design",
      "Framer Motion — Smooth transitions & motion effects",
      "React Three Fiber — Immersive 3D models (Three.js)",
      "GSAP Scroll Effects — Parallax, car movement, fade-ins",
      "Next-Level Frontend — Focused on breathtaking visuals",
      "Desktop-first — High-end immersive experience",
    ],
    videoUrl: "/assets/tesla.mp4",
    githubUrl: "https://github.com/Rishabhjain610/tesla",
  },
  {
    title: "Shiksha",
    titleParts: ["Shi", "ksha"],
    accent: "#3178C6",
    description:
      "Secure online exam platform with real-time video proctoring, auto-timer, and strict integrity measures.",
    tags: [
      "HTML", "CSS", "JavaScript", "Tailwind CSS", "Font Awesome",
    ],
    features: [
      "Tab Switching Detection — Auto-closes test",
      "Minimization Restriction — Ends test on minimize",
      "Copy Protection — Disables text copying",
      "Screenshot Detection — Terminates on screenshot",
      "Right-Click & Console Block — Prevents inspection",
      "Auto Timer — Test ends when time runs out",
      "Live Video Monitoring — Camera-based activity monitor",
    ],
    videoUrl: "/assets/shiksha.mp4",
    githubUrl: "https://github.com/Rishabhjain610/shiksha",
  },
];

/* ─── Card CLI commands ─── */
const cardCommands: Record<string, string> = {
  demo: "demo", show: "demo", s: "demo", play: "demo", watch: "demo",
  github: "github", git: "github", repo: "github", source: "github",
  help: "help",
};

/* ─── Viewport configs ─── */
const vpHeader = { once: false, amount: 0.5 };
const vpCard = { once: false, amount: 0.2 };

/* ─── Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

/* ─── Helper ─── */
const hexToRgba = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/* ═══════════════════════════════════════════════
   ── CardCLI — Mini terminal input per card ──
   Matches LandingPage terminal input pattern
   ═══════════════════════════════════════════════ */
interface CardCLIProps {
  project: Project;
  accent: string;
  onDemo: () => void;
}

const CardCLI = ({ project, accent, onDemo }: CardCLIProps) => {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ text: string; color: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const echo = { text: `$ ${raw}`, color: "#6e7681" };

    if (cmd === "clear") { setHistory([]); setInput(""); return; }

    const action = cardCommands[cmd];

    if (action === "demo") {
      setHistory((prev) => [...prev, echo,
      { text: `▶ Loading ${project.title} demo...`, color: "#3fb950" },
      ]);
      setInput("");
      setTimeout(() => onDemo(), 350);
      return;
    }
    if (action === "github") {
      setHistory((prev) => [...prev, echo,
      { text: `↗ Opening ${project.title} repo...`, color: "#3fb950" },
      ]);
      setInput("");
      setTimeout(() => window.open(project.githubUrl, "_blank"), 350);
      return;
    }
    if (action === "help") {
      setHistory((prev) => [...prev, echo,
      { text: "Available commands:", color: "#c9d1d9" },
      { text: "  demo / s    → watch project demo", color: "#c9d1d9" },
      { text: "  github      → open source code", color: "#c9d1d9" },
      { text: "  clear       → clear terminal", color: "#c9d1d9" },
      { text: "  help        → show this message", color: "#c9d1d9" },
      ]);
      setInput("");
      return;
    }
    setHistory((prev) => [...prev, echo,
    { text: `command not found: ${cmd}. Type 'help'.`, color: "#f85149" },
    ]);
    setInput("");
  };

  return (
    <div
      className="border-t flex flex-col"
      style={{ borderColor: accentRgba(0.1) }}
    >
      {history.length > 0 && (
        <div
          ref={scrollRef}
          className="px-4 pt-2 max-h-[80px] overflow-y-auto no-scrollbar"
        >
          {history.map((line, i) => (
            <p
              key={i}
              className="text-[10px] font-mono leading-relaxed whitespace-pre"
              style={{ color: line.color }}
            >
              {line.text}
            </p>
          ))}
        </div>
      )}

      <div
        className="flex items-center gap-1.5 px-4 py-2.5 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-[10px] font-mono" style={{ color: accent }}>
          $
        </span>
        {mounted ? (
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") run(input); }}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-[10px] font-mono"
            style={{ color: "#c9d1d9", caretColor: accent }}
            placeholder="type 'demo' or 'help'..."
          />
        ) : (
          <span
            className="flex-1 text-[10px] font-mono"
            style={{ color: "#6e7681" }}
          >
            type &apos;demo&apos; or &apos;help&apos;...
          </span>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ── Main Project Component ──
   ═══════════════════════════════════════════════ */

const Project = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (activeVideo && videoRef.current) videoRef.current.play();
  }, [activeVideo]);

  const activeProject = activeVideo
    ? projects.find((p) => p.title === activeVideo)
    : null;

  return (
    <section
      id="projects"
      className="w-full px-6 md:px-12 lg:px-20 py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      {/* ─ max-w-6xl matches About ─ */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ══ Section Header — matches About.tsx exactly ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" as const }}
          viewport={vpHeader}
          className="mb-14 text-center lg:text-left"
        >
          {/* Badge — font-spaceGrotesk + font-bold like About + Landing */}
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full
                       font-spaceGrotesk mb-4"
            style={{ backgroundColor: accentRgba(0.12), color: ACCENT }}
          >
            🚀 What I Build
          </span>

          {/* Heading — textShadow like About */}
          <h2 className="text-5xl lg:text-6xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Featured{" "}
            <span
              style={{
                color: ACCENT,
                textShadow: "0 0 28px rgba(74,144,226,0.22)",
              }}
            >
              Projects
            </span>
          </h2>

          {/* Accent line — w-14, opacity 0.45 like About + Landing */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ══ Project Grid ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              variants={cardFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vpCard}
              transition={{ delay: i % 3 * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group rounded-2xl overflow-hidden flex flex-col
                         transition-all duration-300 cursor-default"
              style={{
                backgroundColor: "#0d1117",
                border: `1px solid ${accentRgba(0.14)}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentRgba(0.32);
                e.currentTarget.style.boxShadow = `0 12px 40px ${accentRgba(0.08)}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = accentRgba(0.14);
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* ── Terminal title bar ── */}
              <div
                className="flex items-center gap-1.5 px-4 py-2 border-b select-none flex-shrink-0"
                style={{
                  backgroundColor: "#161b22",
                  borderColor: accentRgba(0.1),
                }}
              >
                <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
                <span
                  className="ml-auto text-[9px] font-mono tracking-wider"
                  style={{ color: "#6e7681" }}
                >
                  ~/{p.title.toLowerCase().replace(/\s+/g, "-")}
                </span>
              </div>

              {/* ── Card body ── */}
              <div className="p-5 flex flex-col flex-1">
                {/* Project title */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "#6e7681" }}
                  >
                    $
                  </span>
                  <h3 className="font-bold font-spaceGrotesk text-base tracking-tight text-[#c9d1d9]">
                    {p.titleParts[0]}
                    <span style={{ color: p.accent }}>{p.titleParts[1]}</span>
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <span
                    className="text-[9px] font-mono block mb-1.5 tracking-wide"
                    style={{ color: "#3fb950", opacity: 0.7 }}
                  >
                    <IoChevronForward className="inline" size={9} /> README.md
                  </span>
                  <p className="text-[11.5px] leading-[1.6] font-mono text-[#8b949e] line-clamp-3">
                    {p.description}
                  </p>
                </div>

                {/* ── Full tech stack ── */}
                <div className="mb-4">
                  <span
                    className="text-[9px] font-mono block mb-2 tracking-wide"
                    style={{ color: "#6e7681" }}
                  >
                    <IoChevronForward className="inline" size={9} /> stack
                  </span>
                  <div className="flex flex-wrap gap-[5px]">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-[7px] py-[3px] text-[9px] font-mono rounded-md leading-tight"
                        style={{
                          backgroundColor: accentRgba(0.06),
                          color: accentRgba(0.7),
                          border: `1px solid ${accentRgba(0.1)}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* ── Action bar ── */}
                <div
                  className="flex items-center gap-2 pt-3 mt-1 border-t mb-2"
                  style={{ borderColor: accentRgba(0.06) }}
                >
                  <button
                    onClick={() => setActiveVideo(p.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[10px]
                               font-mono font-semibold transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: accentRgba(0.1),
                      color: ACCENT,
                      border: `1px solid ${accentRgba(0.15)}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentRgba(0.18);
                      e.currentTarget.style.borderColor = accentRgba(0.3);
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = accentRgba(0.1);
                      e.currentTarget.style.borderColor = accentRgba(0.15);
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <IoPlayOutline size={11} />
                    demo
                  </button>

                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[10px]
                               font-mono font-semibold text-[#8b949e] transition-all duration-300
                               hover:text-[#c9d1d9]"
                    style={{ border: `1px solid ${accentRgba(0.08)}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentRgba(0.06);
                      e.currentTarget.style.borderColor = accentRgba(0.2);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = accentRgba(0.08);
                    }}
                  >
                    <IoLogoGithub size={12} />
                    source
                  </a>

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-[6px] rounded-lg text-[10px]
                                 font-mono font-semibold text-[#3fb950] transition-all duration-300
                                 hover:bg-[#3fb950]/10"
                      style={{ border: "1px solid rgba(63,185,80,0.12)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                      live
                    </a>
                  )}
                </div>
              </div>

              {/* ── CLI Input ── */}
              <CardCLI
                project={p}
                accent={p.accent}
                onDemo={() => setActiveVideo(p.title)}
              />
            </motion.article>
          ))}
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          viewport={vpHeader}
          className="mt-12 text-center lg:text-left"
        >
          <p className="text-[11px] font-mono" style={{ color: "#6e7681" }}>
            <span style={{ color: "#3fb950" }}>$</span> ls projects/ | wc -l →{" "}
            <span className="font-bold" style={{ color: ACCENT }}>
              {projects.length}
            </span>{" "}
            · View all on{" "}
            <a
              href="https://github.com/Rishabhjain610"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
              style={{ color: ACCENT }}
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          ── VIDEO + FEATURES MODAL ──
          Terminal-styled, matching LandingPage terminal
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {activeVideo && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md
                       flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl
                         overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#0d1117",
                border: `1px solid ${accentRgba(0.25)}`,
                boxShadow: `0 24px 80px ${accentRgba(0.12)}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Modal title bar — matches LandingPage terminal ── */}
              <div
                className="flex items-center gap-2 px-5 py-3.5 border-b select-none flex-shrink-0"
                style={{
                  backgroundColor: "#161b22",
                  borderColor: accentRgba(0.15),
                }}
              >
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span
                  className="mx-auto text-xs font-spaceGrotesk tracking-wide"
                  style={{ color: "#6e7681" }}
                >
                  {activeProject.titleParts[0]}
                  <span style={{ color: activeProject.accent }}>
                    {activeProject.titleParts[1]}
                  </span>{" "}
                  — demo + features
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-[#6e7681] hover:text-white transition-colors duration-300
                             cursor-pointer p-1 rounded-md hover:bg-white/[0.06]"
                >
                  <IoCloseOutline size={16} />
                </button>
              </div>

              {/* ── Content: video + features side-by-side ── */}
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left — Video */}
                <div className="lg:w-[60%] w-full flex-shrink-0 bg-black flex items-center">
                  <video
                    ref={videoRef}
                    src={activeProject.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    style={{ maxHeight: "70vh" }}
                  />
                </div>

                {/* Right — Features panel */}
                <div
                  className="lg:w-[40%] w-full overflow-y-auto border-t lg:border-t-0
                             lg:border-l p-5 no-scrollbar"
                  style={{
                    borderColor: accentRgba(0.1),
                    backgroundColor: "#0d1117",
                  }}
                >
                  {/* Project title */}
                  <h3 className="font-bold font-spaceGrotesk text-xl text-[#c9d1d9] mb-1">
                    {activeProject.titleParts[0]}
                    <span style={{ color: activeProject.accent }}>
                      {activeProject.titleParts[1]}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] font-mono text-[#8b949e] leading-relaxed mb-4">
                    {activeProject.description}
                  </p>

                  {/* Features heading */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[9px] font-mono tracking-wide"
                      style={{ color: "#3fb950", opacity: 0.8 }}
                    >
                      <IoChevronForward className="inline" size={9} />{" "}
                      features.md
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 mb-5">
                    {activeProject.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span
                          className="mt-[5px] w-[5px] h-[5px] rounded-full flex-shrink-0"
                          style={{ backgroundColor: ACCENT, opacity: 0.6 }}
                        />
                        <span className="text-[11px] font-mono text-[#8b949e] leading-[1.5]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack in modal */}
                  <div className="mb-4">
                    <span
                      className="text-[9px] font-mono block mb-2 tracking-wide"
                      style={{ color: "#6e7681" }}
                    >
                      <IoChevronForward className="inline" size={9} /> stack
                    </span>
                    <div className="flex flex-wrap gap-[4px]">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-[6px] py-[2px] text-[8px] font-mono rounded-md"
                          style={{
                            backgroundColor: accentRgba(0.06),
                            color: accentRgba(0.65),
                            border: `1px solid ${accentRgba(0.1)}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action links */}
                  <div
                    className="flex items-center gap-2 pt-3 border-t"
                    style={{ borderColor: accentRgba(0.06) }}
                  >
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[10px]
                                 font-mono font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: accentRgba(0.1),
                        color: ACCENT,
                        border: `1px solid ${accentRgba(0.15)}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = accentRgba(0.18);
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = accentRgba(0.1);
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <IoLogoGithub size={12} />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* ── Status bar — matches LandingPage terminal ── */}
              <div
                className="flex items-center justify-between px-5 py-2.5 border-t text-[11px]
                           select-none flex-shrink-0"
                style={{
                  backgroundColor: "#161b22",
                  borderColor: accentRgba(0.15),
                  color: "#6e7681",
                }}
              >
                <span>
                  <span style={{ color: "#3fb950" }}>●</span> playing
                </span>
                <span className="font-spaceGrotesk">
                  press{" "}
                  <span style={{ color: ACCENT }}>esc</span> to close
                </span>
                <span>demo</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Project;