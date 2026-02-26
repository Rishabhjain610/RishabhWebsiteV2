"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoTrophy,
  IoMedal,
  IoRibbon,
  IoFlame,
  IoChevronDown,
  IoChevronUp,
  IoClose,
} from "react-icons/io5";

/* ─── Accent — consistent with LandingPage + About + Stats ─── */
const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74,144,226,${a})`;

/* ─── Medal colours ─── */
const medalColor = (p: string) => {
  if (p.includes("1st")) return "#FFD700";
  if (p.includes("2nd")) return "#C0C0C0";
  if (p.includes("3rd")) return "#CD7F32";
  return ACCENT;
};

/* ─── Types ─── */
interface Achievement {
  placement: string;
  hackathon: string;
  organizer: string;
  date: string;
  images: string[];
}

/* ── Podium (Top 3) ── */
const podium: Achievement[] = [
  {
    placement: "🥇 1st Place",
    hackathon: "Hack & Verse — GDG SAIT",
    organizer: "Google Developer Groups – SAIT",
    date: "2026",
    images: ["/wins/GDGSAIT1ST.jpg", "/wins/Hack & verse1ST.png"],
  },
  {
    placement: "🥇 1st Prize",
    hackathon: "GDG DCE Techsprit-Lofi edition",
    organizer: "GDG — DCE",
    date: "2026",
    images: ["/wins/LOFI EDITION1st.jpg"],
  },
  {
    placement: "🥈 2nd Place",
    hackathon: "DevSprint NEHU Hackathon",
    organizer: "GDG – NEHU",
    date: "2026",
    images: ["/wins/DevSpirint NEHU2ND.jpeg", "/wins/DevSprint_Winners.png"],
  },
  {
    placement: "🥉 3rd Place",
    hackathon: "Tech Sprint SRM Delhi — GDG SRMUH",
    organizer: "Google Developer Groups – SRMUH",
    date: "2026",
    images: ["/wins/GDGSRMUH3RD.jpg", "/wins/Tech Spirint SRM Delhi.png"],
  },
];

/* ── Finalist ── */
const finalist: Achievement[] = [
  {
    placement: "🏅 Top 6",
    hackathon: "CodeByte 2.0",
    organizer: "CodeByte",
    date: "2025",
    images: ["/wins/codebyte_2.0_TOP6.jpeg"],
  },
  {
    placement: "🏅 Top 8",
    hackathon: "Codeathon 2.0",
    organizer: "Codeathon",
    date: "2025",
    images: ["/wins/CodeAthonTOP8.jpg"],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "TechSpirint 2025-26 — GDG RGIPT",
    organizer: "Google Developer Groups – RGIPT",
    date: "2025",
    images: ["/wins/GDGRGIPTTOP10.png"],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "ArticX Hackathon",
    organizer: "ArticX",
    date: "2025",
    images: ["/wins/ArticXTOP10.jpg"],
  },
  {
    placement: "🏅 Top 12",
    hackathon: "Minithon 2025",
    organizer: "Minithon",
    date: "2025",
    images: ["/wins/Minithon 2025TOP12.png"],
  },
  {
    placement: "🏅 Top 15",
    hackathon: "HackVerse",
    organizer: "HackVerse",
    date: "2025",
    images: ["/wins/HackVerseTOP15.jpg"],
  },
];

/* ─── Animation variants — matches Stats / Work ─── */
const vp = { once: false, amount: 0.15 as const };

const fadeUp = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.35, ease: "easeIn" as const } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const statCard = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/* ─── Card component ─── */
const AchievementCard = ({
  a,
  expanded,
  onToggle,
  onImageClick,
}: {
  a: Achievement;
  expanded: boolean;
  onToggle: () => void;
  onImageClick: (src: string) => void;
}) => {
  const color = medalColor(a.placement);
  const Icon =
    a.placement.includes("1st") || a.placement.includes("2nd") || a.placement.includes("3rd")
      ? IoTrophy
      : IoMedal;

  return (
    <motion.div
      variants={statCard}
      className="rounded-xl sm:rounded-2xl border overflow-hidden
                 bg-white dark:bg-transparent transition-all duration-300 cursor-pointer"
      style={{ borderColor: accentRgba(0.12) }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.3);
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${accentRgba(0.07)}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.12);
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
      onClick={onToggle}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <div
          className="p-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon size={18} style={{ color }} />
        </div>

        <div className="flex-1 min-w-0">
          <span
            className="text-[10px] sm:text-[11px] font-bold font-spaceGrotesk px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {a.placement}
          </span>
          <h3 className="text-sm sm:text-base font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] truncate mt-1">
            {a.hackathon}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-spaceGrotesk text-[#3a3a3a] dark:text-[#999]">
            {a.organizer} · {a.date}
          </p>
        </div>

        <div
          className="p-1.5 rounded-lg flex-shrink-0"
          style={{ backgroundColor: accentRgba(0.08) }}
        >
          {expanded ? (
            <IoChevronUp size={14} style={{ color: ACCENT }} />
          ) : (
            <IoChevronDown size={14} style={{ color: ACCENT }} />
          )}
        </div>
      </div>

      {/* Expanded — certificate images */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <div className="h-px w-full mb-3" style={{ backgroundColor: accentRgba(0.08) }} />
              <div className={`grid gap-3 ${a.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {a.images.map((src, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border bg-[#fafafa] dark:bg-[#1a1a1a] flex items-center justify-center"
                    style={{ borderColor: accentRgba(0.08) }}
                  >
                    <img
                      src={src}
                      alt={`${a.hackathon} certificate ${i + 1}`}
                      className="w-full h-auto object-contain rounded-lg cursor-zoom-in
                                 hover:opacity-80 transition-opacity duration-200"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageClick(src);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════ */

const Achievements = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const toggle = (key: string) => setExpandedKey((p) => (p === key ? null : key));

  return (
    <section
      id="achievements"
      className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section header — matches About / Work / Stats ── */}
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
            Hackathons &amp; Wins
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Achieve
            <span className="font-spaceGrotesk" style={{ color: ACCENT }}>
              ments
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ── Summary stats — matches Stats section layout ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {[
            { icon: IoFlame, label: "Hackathons", value: "30+", color: "#F59E0B" },
            { icon: IoTrophy, label: "Wins", value: "2", color: "#FFD700" },
            { icon: IoMedal, label: "Podium", value: "4", color: "#CD7F32" },
            { icon: IoRibbon, label: "Finalist", value: String(finalist.length), color: ACCENT },
          ].map(({ icon: Icon, label, value, color }) => (
            <motion.div
              key={label}
              variants={statCard}
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border text-center
                         bg-white dark:bg-transparent transition-all duration-300"
              style={{ borderColor: accentRgba(0.12) }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.3);
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${accentRgba(0.07)}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.12);
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="p-2 rounded-full w-fit mx-auto mb-3"
                style={{ backgroundColor: accentRgba(0.1) }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk">
                {value}
              </p>
              <p className="text-[10px] sm:text-[11px] font-spaceGrotesk text-[#3a3a3a] dark:text-[#999] uppercase tracking-widest mt-1">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Two columns: Podium | Finalist ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

          {/* Podium Finish */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="flex items-center gap-2 mb-4"
            >
              <IoTrophy size={18} style={{ color: "#FFD700" }} />
              <h3 className="text-base sm:text-lg font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0]">
                Podium Finish
              </h3>
              <span
                className="text-[10px] font-bold font-spaceGrotesk px-2 py-0.5 rounded-full"
                style={{ backgroundColor: accentRgba(0.1), color: ACCENT }}
              >
                Top 3
              </span>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="space-y-3"
            >
              {podium.map((a) => (
                <AchievementCard
                  key={a.hackathon}
                  a={a}
                  expanded={expandedKey === a.hackathon}
                  onToggle={() => toggle(a.hackathon)}
                  onImageClick={setLightbox}
                />
              ))}
            </motion.div>
          </div>

          {/* Finalist */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="flex items-center gap-2 mb-4"
            >
              <IoRibbon size={18} style={{ color: ACCENT }} />
              <h3 className="text-base sm:text-lg font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0]">
                Finalist
              </h3>
              <span
                className="text-[10px] font-bold font-spaceGrotesk px-2 py-0.5 rounded-full"
                style={{ backgroundColor: accentRgba(0.1), color: ACCENT }}
              >
                {finalist.length} events
              </span>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="space-y-3"
            >
              {finalist.map((a) => (
                <AchievementCard
                  key={a.hackathon}
                  a={a}
                  expanded={expandedKey === a.hackathon}
                  onToggle={() => toggle(a.hackathon)}
                  onImageClick={setLightbox}
                />
              ))}
            </motion.div>
          </div>

        </div>

        {/* ── Lightbox modal ── */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out p-4 sm:p-8"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-24 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-[60]"
                onClick={() => setLightbox(null)}
              >
                <IoClose size={24} className="text-white" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                src={lightbox}
                alt="Certificate"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Achievements;