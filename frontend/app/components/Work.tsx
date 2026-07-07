"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IoBriefcase,
  IoCodeSlash,
  IoGlobe,
  IoMegaphone,
  IoServer,
  IoRibbonOutline,
  IoCloseOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

/* ─── Accent — consistent with LandingPage + About + Project ─── */
const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74,144,226,${a})`;

/* ─── Custom Icon Component ─── */
interface CustomIconProps {
  src: string;
  alt: string;
  size?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({ src, alt, size = 17 }) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    className="object-contain"
  />
);

/* ─── Experience data ─── */
interface Experience {
  icon: React.ElementType;
  iconType: "react-icon" | "image";
  iconSrc?: string;
  role: string;
  type: "Full-time" | "Internship" | "Part-time" | "Remote" | "Volunteer";
  company: string;
  location: string;
  period: string;
  duration?: string;
  current?: boolean;
  bullets: string[];
  certificates?: string[];
}

const experiences: Experience[] = [
  {
    icon: IoServer,
    iconType: "image",
    iconSrc: "/mumbaimetro1.png",
    role: "SDE Intern",
    type: "Internship",
    company: "Maha Mumbai Metro Operations Corporation Limited",
    location: "Mumbai, IN",
    period: "Jan 2026 – Present",
    current: true,
    bullets: [
      "Engineered an enterprise app and web platform for **Vendor Compliance and Billing** across **34** metro stations and **159** vendor stalls using **Next.js**, **Express.js**, and **MongoDB Atlas**, developing **139 APIs** and **22 MongoDB models**.",
      "Reduced electric bill generation time from **4 days to 3 hours** by replacing manual processes with a custom software utility; automated vendor compliance using **cron jobs**, **Google Drive API**, **Nodemailer**, secure **OTP-based password reset**, and **ExcelJS** invoice generation.",
      "Optimized database performance with **15+ indexes**, **offset pagination**, and **query projections** for rapid retrieval, slashing query response times on high-volume operational reads.",
      "Designed hierarchical **MongoDB** schemas representing Metro Lines, Stations, Vendor Stalls, Bills, and Controllers; built analytical dashboards using aggregation pipelines and interactive visualizations to support utility reporting and operational decision-making.",
      "Implemented secure **5-role Role-Based Access Control (RBAC)** with **JWT** authentication, audit logging, and duplicate-billing safeguards to ensure reliable, traceable, and secure billing operations.",
      "Benchmarked enterprise APIs using **Autocannon**, achieving **~52 ms** average authentication latency and **~192 req/sec** throughput under simulated workloads, establishing quantified performance baselines.",
      "Led stakeholder management and coordinated requirement gathering, testing, and production rollout with **30+ Station Controllers** across metro stations, ensuring smooth adoption and deployment.",
    ],
    certificates: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459079/Apreciation_e62ady.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459079/offerletter_r45dzc.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459943/file_00000000d88871faa794df40d609f4a1_yuof5e.png",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459941/153835_rpdccu.jpg",
    ],
  },
  {
    icon: IoCodeSlash,
    iconType: "image",
    iconSrc: "/gdg.png",
    role: "Joint Tech Head",
    type: "Volunteer",
    company: "GDG on Campus TSEC",
    location: "Mumbai, IN · Hybrid",
    period: "Apr 2025 – April 2026",
    current: false,
    bullets: [
      "Engineered the **GDG-TSEC** community platform and **HackSync 2.0** website using **Next.js**, **Shadcn UI**, and **Framer Motion**, serving **400+** active users.",
      "Spearheaded **MockUp**, a 5-hour frontend hackathon for **150+** participants, securing snack sponsorships and managing end-to-end event logistics.",
      "Mentored **50+** participants during **MockUp** hackathon across domains of **AR**, **Frontend**, and **Backend** development, guiding teams on UI/UX best practices, API integration, and implementation strategies.",
      "Scaled event registrations to **700+** via strategic PR campaigns and secured technical sponsorships from **Devfolio** and **InterviewBuddy**.",
      "Earned **19 Google Cloud** skill badges and coached **30+** students through GCP learning paths and cloud infrastructure fundamental.",
    ],
    certificates: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459357/LOA_Mentoring_c25op9.jpg",
    ],
  },
  {
    icon: IoServer,
    iconType: "image",
    iconSrc: "/ignito.png",
    role: "Full Stack Developer",
    type: "Internship",
    company: "Ignito Corporation",
    location: "Indore, IN · Remote",
    period: "Jul 2025 – Aug 2025",
    duration: "1 month",
    bullets: [
      "Engineered an automated inventory and **sales analytics** system for a sweetshop using **Next.js**, **Supabase**, and **Chart.js**, leading a team of three.",
      "Developed a real-time database architecture with **Supabase** for live inventory tracking and responsive UI using **Tailwind CSS**.",
      "Managed client-facing requirements to translate business needs into technical specifications and seamless support.",
    ],
    certificates: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459153/Completion_Certificate_jlskwp.png",
    ],
  },
  {
    icon: IoBriefcase,
    iconType: "image",
    iconSrc: "/Risingeducation.jpg",
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
    certificates: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459128/RishabhCertificateof_completion_zrzevc.jpg",
    ],
  },
  {
    icon: IoGlobe,
    iconType: "image",
    iconSrc: "/Avriti.png",
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
    certificates: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459299/Screenshot_2026-07-08_025126_gkyffh.png",
    ],
  },
  {
    icon: IoMegaphone,
    iconType: "image",
    iconSrc: "/csi.jpg",
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
const typeBadge: Record<string, { bg: string; text: string; bgLight: string }> =
  {
    "Full-time": {
      bg: accentRgba(0.12),
      text: ACCENT,
      bgLight: accentRgba(0.12),
    },
    Internship: {
      bg: "rgba(63,185,80,0.12)",
      text: "#3fb950",
      bgLight: "rgba(34,140,54,0.12)",
    },
    "Part-time": {
      bg: "rgba(136,111,191,0.12)",
      text: "#886FBF",
      bgLight: "rgba(106,81,161,0.12)",
    },
    Remote: {
      bg: "rgba(0,166,214,0.12)",
      text: "#00A6D6",
      bgLight: "rgba(0,130,170,0.12)",
    },
    Volunteer: {
      bg: "rgba(245,158,11,0.12)",
      text: "#F59E0B",
      bgLight: "rgba(200,120,0,0.14)",
    },
  };

/* ─── Viewport & Variants — same pattern as About.tsx ─── */
const vp = { once: false, amount: 0.25 };

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

const cardSlide = {
  hidden: {
    opacity: 0,
    x: -18,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ═══════════════════════════════════════════════ */

const Work = () => {
  const [selectedCert, setSelectedCert] = useState<{ images: string[]; index: number } | null>(null);
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
                    <div className="relative z-10 flex items-center justify-center rounded-lg p-1.5 bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#333]">
                      {exp.iconType === "image" && exp.iconSrc ? (
                        <Image
                          src={exp.iconSrc}
                          alt={exp.company}
                          width={36}
                          height={36}
                          className="object-contain grayscale-0 dark:grayscale-0"
                          priority={i < 2}
                        />
                      ) : (
                        <Icon size={36} className="text-[#4A90E2]" />
                      )}
                      {exp.current && (
                        <span
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full
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
                        <div className="flex items-center gap-3">
                          <div className="sm:hidden flex items-center justify-center flex-shrink-0 rounded-lg p-1 bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#333]">
                            {exp.iconType === "image" && exp.iconSrc ? (
                              <Image
                                src={exp.iconSrc}
                                alt={exp.company}
                                width={24}
                                height={24}
                                className="object-contain grayscale-0 dark:grayscale-0"
                                priority={i < 2}
                              />
                            ) : (
                              <Icon size={24} className="text-[#4A90E2]" />
                            )}
                          </div>
                          <h3 className="font-bold text-base sm:text-lg font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-[15px] font-spaceGrotesk text-[#3a3a3a] dark:text-[#b0b0b0]">
                          {exp.company}
                          <span className="text-[#6b6b6b] dark:text-[#777]">
                            {" "}
                            · {exp.location}
                          </span>
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
                          <li
                            key={j}
                            className="flex gap-2 sm:gap-2.5 items-start"
                          >
                            <span
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-[8px] flex-shrink-0"
                              style={{ backgroundColor: accentRgba(0.4) }}
                            />
                            <span className="text-sm sm:text-[15px] font-spaceGrotesk text-[#3a3a3a] dark:text-[#b0b0b0] leading-relaxed">
                              {parts.map((part, k) =>
                                part.startsWith("**") && part.endsWith("**") ? (
                                  <strong
                                    key={k}
                                    className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0]"
                                  >
                                    {part.slice(2, -2)}
                                  </strong>
                                ) : (
                                  <span key={k}>{part}</span>
                                ),
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Certificates */}
                    {exp.certificates && exp.certificates.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/[0.04] dark:border-white/[0.06]">
                        <button
                          onClick={() => setSelectedCert({ images: exp.certificates!, index: 0 })}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                                     font-spaceGrotesk transition-all duration-300 border cursor-pointer"
                          style={{
                            background: "rgba(74,144,226,0.06)",
                            color: "#4A90E2",
                            borderColor: "rgba(74,144,226,0.15)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(74,144,226,0.12)";
                            e.currentTarget.style.borderColor = "rgba(74,144,226,0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(74,144,226,0.06)";
                            e.currentTarget.style.borderColor = "rgba(74,144,226,0.15)";
                          }}
                        >
                          <IoRibbonOutline size={13} />
                          <span>
                            {exp.certificates!.length > 1
                              ? "View Certificates"
                              : "View Certificate"}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-4 sm:p-6"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center gap-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 rounded-full text-white/70 hover:text-white transition-colors duration-200 cursor-pointer bg-black/40 border-0"
              >
                <IoCloseOutline size={24} />
              </button>

              {/* Certificate Image */}
              <div className="relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden max-h-[80vh] w-full flex items-center justify-center shadow-2xl">
                <img
                  src={selectedCert.images[selectedCert.index]}
                  alt={`Certificate page ${selectedCert.index + 1}`}
                  className="max-w-full max-h-[75vh] object-contain block"
                />

                {/* Navigation for multiple pages */}
                {selectedCert.images.length > 1 && (
                  <>
                    {/* Prev Button */}
                    <button
                      onClick={() =>
                        setSelectedCert((prev) =>
                          prev
                            ? {
                                ...prev,
                                index:
                                  (prev.index - 1 + prev.images.length) %
                                  prev.images.length,
                              }
                            : null
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-all duration-200 cursor-pointer border-0"
                    >
                      <IoChevronBack size={20} />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setSelectedCert((prev) =>
                          prev
                            ? {
                                ...prev,
                                index: (prev.index + 1) % prev.images.length,
                              }
                            : null
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-all duration-200 cursor-pointer border-0"
                    >
                      <IoChevronForward size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Page indicator */}
              {selectedCert.images.length > 1 && (
                <div className="text-white/60 font-spaceGrotesk text-xs">
                  Page {selectedCert.index + 1} of {selectedCert.images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
