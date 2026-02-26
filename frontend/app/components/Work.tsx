"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoBriefcase,
  IoCodeSlash,
  IoGlobe,
  IoMegaphone,
  IoServer,
} from "react-icons/io5";

/* ─── Accent — consistent with LandingPage + About + Project ─── */
const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74,144,226,${a})`;

/* ─── Experience data ─── */
interface Experience {
  icon: React.ElementType;
  role: string;
  type: "Full-time" | "Internship" | "Part-time" | "Remote" | "Volunteer";
  company: string;
  location: string;
  period: string;
  duration?: string;
  current?: boolean;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    icon: IoServer,
    role: "Full Stack Developer",
    type: "Internship",
    company: "Maha Mumbai Metro Operation Corporation Limited",
    location: "Mumbai, IN",
    period: "Jan 2026 – Present",
    current: true,
    bullets: [
      "Developed a web application for calculating electric bills across various metro stations on a line using the MERN stack.",
      "Implemented a role-based login system with **3** distinct roles — bills are scanned, verified, and approved through the workflow.",
      "Generated PDF reports of electric bills using jsPDF for record-keeping and audit trails.",
      "Built responsive frontend components with React and server-side APIs using Node.js and Express.",
    ],
  },
  {
    icon: IoCodeSlash,
    role: "Senior Tech Team Member",
    type: "Volunteer",
    company: "GDG on Campus TSEC",
    location: "Mumbai, IN · Hybrid",
    period: "Apr 2025 – Present",
    current: true,
    bullets: [
      "Built the GDG-TSEC community website and HackSync 2.0 event website using Next.js, Shadcn UI, and Framer Motion, supporting **400+** active users.",
      "Led organizing MockUp — a **5-hour** frontend hackathon with **150+** participants; brought Made Over Donuts as the snacks sponsor.",
      "Mentored **50+** students during the hackathon on designing and development best practices.",
      "Drove **700+** registrations through PR campaigns and secured Devfolio & InterviewBuddy as official sponsors.",
      "Earned **19** Google Cloud skill badges and mentored **30+** students to complete their GCP learning paths.",
    ],
  },
  {
    icon: IoServer,
    role: "Full Stack Developer",
    type: "Internship",
    company: "Ignito Corporation",
    location: "Indore, IN · Remote",
    period: "Jul 2025 – Aug 2025",
    duration: "1 month",
    bullets: [
      "Built an inventory & analytics system for a sweetshop using Next.js, Chart.js, and Shadcn — used Supabase for real-time database updates; led a team of **three**.",
      "Developed a single-page responsive website using Next.js, Motion, and Shadcn.",
      "Managed client-related queries to ensure smooth communication and support.",
    ],
  },
  {
    icon: IoBriefcase,
    role: "Counselling Consultant",
    type: "Internship",
    company: "Rising Education",
    location: "Mumbai, IN · Remote",
    period: "Jun 2025 – Sep 2025",
    duration: "4 months",
    bullets: [
      "Guided **200+** students through the post-MHT-CET counselling process, advising them on college selection, branch preferences, and career pathways.",
      "Conducted **10+** online sessions delivering personalized mentorship, resolving queries, and simplifying the admission workflow.",
      "Managed and coordinated with a team of **10+** members to streamline outreach and ensure consistent student support.",
      "Helped students secure admissions in top Mumbai and Pune engineering colleges including VJTI, SPIT, and DJSCE.",
    ],
  },
  {
    icon: IoGlobe,
    role: "Frontend Developer",
    type: "Internship",
    company: "Avriti International Pvt Ltd",
    location: "Remote",
    period: "Nov 2024 – Feb 2025",
    duration: "3 months",
    bullets: [
      "Improved UI/UX and responsiveness, enhancing overall user experience.",
      "Optimized performance, leading to **100+** new visitors per month.",
      "Developed dynamic React.js components for better engagement.",
      "Collaborated with teams for seamless UI integration.",
    ],
  },
  {
    icon: IoMegaphone,
    role: "Marketing JCOM – Computer Society of India",
    type: "Volunteer",
    company: "CSI TSEC",
    location: "Mumbai, IN",
    period: "Apr 2024 – Mar 2025",
    duration: "1 yr",
    bullets: [
      "Secured Piknik as the snacks sponsor for TechNext 2024 (**500+** attendees), bringing sponsorship chips worth **₹43,000**.",
      "Brought GeeksforGeeks as the technical sponsor for Rubix 2025, a hackathon with **800+** participants.",
      "Conducted offline publicity across **2+** colleges to drive registrations and awareness for CSI-TSEC events.",
      "Managed sponsorship outreach and built relationships with potential partners.",
      "Contributed to marketing strategies to promote CSI-TSEC events effectively.",
    ],
  },
];

/* ─── Type badge colors ─── */
const typeBadge: Record<string, { bg: string; text: string; bgLight: string }> = {
  "Full-time": { bg: accentRgba(0.12), text: ACCENT, bgLight: accentRgba(0.12) },
  Internship: { bg: "rgba(63,185,80,0.12)", text: "#3fb950", bgLight: "rgba(34,140,54,0.12)" },
  "Part-time": { bg: "rgba(136,111,191,0.12)", text: "#886FBF", bgLight: "rgba(106,81,161,0.12)" },
  Remote: { bg: "rgba(0,166,214,0.12)", text: "#00A6D6", bgLight: "rgba(0,130,170,0.12)" },
  Volunteer: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B", bgLight: "rgba(200,120,0,0.14)" },
};

/* ─── Viewport & Variants — same pattern as About.tsx ─── */
const vp = { once: false, amount: 0.25 };

const fadeUp = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.4, ease: "easeIn" as const } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const cardSlide = {
  hidden: { opacity: 0, x: -18, transition: { duration: 0.3, ease: "easeIn" as const } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ═══════════════════════════════════════════════ */

const Work = () => {
  return (
    <section
      id="experience"
      className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section header — matches About.tsx ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mb-10 sm:mb-14 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full
                       font-spaceGrotesk mb-4"
            style={{ backgroundColor: accentRgba(0.12), color: ACCENT }}
          >
            Where I&apos;ve Worked
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Work{" "}
            <span
              style={{
                color: ACCENT,
                textShadow: "0 0 28px rgba(74,144,226,0.22)",
              }}
            >
              Experience
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative pl-0 sm:pl-6">

          {/* Vertical rail — desktop / tablet only */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(74,144,226,0.55), rgba(74,144,226,0.05))",
            }}
          />

          <div className="space-y-5 sm:space-y-6">
            {experiences.map((exp, i) => {
              const Icon = exp.icon as any;
              const badge = typeBadge[exp.type] || typeBadge["Full-time"];

              return (
                <motion.div
                  key={i}
                  variants={cardSlide}
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex gap-4 sm:gap-5 group"
                >
                  {/* ── Timeline dot — hidden on mobile ── */}
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <div
                      className="relative z-10 w-[38px] h-[38px] rounded-full
                                 flex items-center justify-center
                                 ring-2 ring-transparent group-hover:ring-[#4A90E2]/25
                                 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT}, #357abd)`,
                        boxShadow: exp.current
                          ? `0 4px 16px ${accentRgba(0.35)}`
                          : `0 3px 12px ${accentRgba(0.2)}`,
                      }}
                    >
                      <Icon size={17} className="text-white" />
                      {exp.current && (
                        <span
                          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full
                                     border-2 border-[#F4F4F4] dark:border-[#121212]
                                     bg-[#3fb950] animate-pulse"
                        />
                      )}
                    </div>
                  </div>

                  {/* ── Card ── */}
                  <div
                    className="flex-1 p-4 sm:p-5 rounded-xl sm:rounded-2xl border
                               transition-all duration-300
                               group-hover:-translate-y-0.5
                               bg-white dark:bg-transparent"
                    suppressHydrationWarning
                    style={{
                      borderColor: accentRgba(0.12),
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        accentRgba(0.3);
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 8px 32px ${accentRgba(0.07)}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        accentRgba(0.12);
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="space-y-1 min-w-0">
                        {/* Mobile: show icon inline */}
                        <div className="flex items-center gap-2">
                          <div
                            className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${ACCENT}, #357abd)`,
                            }}
                          >
                            <Icon size={14} className="text-white" />
                          </div>
                          <h3 className="font-bold text-base sm:text-lg font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-[15px] font-spaceGrotesk text-[#3a3a3a] dark:text-[#b0b0b0]">
                          {exp.company}
                          <span className="text-[#6b6b6b] dark:text-[#777]"> · {exp.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap">
                        {/* Type badge */}
                        <span
                          className="text-[11px] sm:text-xs font-bold font-spaceGrotesk
                                     px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg"
                          style={{
                            backgroundColor: badge.bg,
                            color: badge.text,
                          }}
                        >
                          {exp.type}
                        </span>
                        {/* Period */}
                        <span
                          className="text-[11px] sm:text-xs font-bold font-spaceGrotesk
                                     px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg"
                          style={{
                            backgroundColor: accentRgba(0.08),
                            color: ACCENT,
                          }}
                        >
                          {exp.period}
                        </span>
                        {exp.duration && (
                          <span
                            className="text-[11px] sm:text-xs font-spaceGrotesk
                                       text-[#6b6b6b] dark:text-[#666]"
                          >
                            · {exp.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px w-full mb-3"
                      style={{ backgroundColor: accentRgba(0.08) }}
                    />

                    {/* Bullets */}
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.bullets.map((bullet, j) => {
                        // Bold **text** patterns
                        const parts = bullet.split(/(\*\*[^*]+\*\*)/);
                        return (
                          <li key={j} className="flex gap-2 sm:gap-2.5 items-start">
                            <span
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-[8px] flex-shrink-0"
                              style={{ backgroundColor: accentRgba(0.4) }}
                            />
                            <span className="text-sm sm:text-[15px] font-spaceGrotesk text-[#3a3a3a] dark:text-[#b0b0b0] leading-relaxed">
                              {parts.map((part, k) =>
                                part.startsWith("**") && part.endsWith("**")
                                  ? <strong key={k} className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">{part.slice(2, -2)}</strong>
                                  : <span key={k}>{part}</span>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;