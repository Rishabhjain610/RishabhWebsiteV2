"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  IoTrophy,
  IoMedal,
  IoFlame,
  IoChevronDown,
  IoChevronUp,
  IoClose,
} from "react-icons/io5";

const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74,144,226,${a})`;

const medalColor = (p: string) => {
  if (p.includes("1st")) return "#FFD700";
  if (p.includes("2nd")) return "#C0C0C0";
  if (p.includes("3rd")) return "#CD7F32";
  return ACCENT;
};

interface Achievement {
  placement: string;
  hackathon: string;
  organizer: string;
  date: string;
  images: string[];
}

const podium: Achievement[] = [
  {
    placement: "🥇 1st Place",
    hackathon: "Hack & Verse — GDG SAIT",
    organizer: "Google Developer Groups – SAIT",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135110/GDGSAIT1ST_qz7fdz.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135336/Screenshot_2026-02-27_011829_bgdlxn.png",
    ],
  },
  {
    placement: "🥇 1st Prize",
    hackathon: "GDG DCE Techsprit-Lofi edition",
    organizer: "GDG — DCE",
    date: "2026",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135116/LOFI_EDITION1st_xvdogh.jpg"],
  },
  {
    placement: "🥈 2nd Place",
    hackathon: "DevSprint NEHU Hackathon",
    organizer: "GDG – NEHU",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135106/DevSpirint_NEHU2ND_rdlt6b.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135105/DevSprint_Winners_iqcgbc.png",
    ],
  },
  {
    placement: "🥉 3rd Place",
    hackathon: "Tech Sprint SRM Delhi — GDG SRMUH",
    organizer: "Google Developer Groups – SRMUH",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135112/GDGSRMUH3RD_qesk3d.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135120/Tech_Spirint_SRM_Delhi_lahvgn.png",
    ],
  },
];

const finalist: Achievement[] = [
  {
    placement: "🏅 Top 6",
    hackathon: "CodeByte 2.0",
    organizer: "CodeByte",
    date: "2025",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135104/codebyte_2.0_TOP6_tpdpjw.jpg"],
  },
  {
    placement: "🏅 Top 8",
    hackathon: "Codeathon 2.0",
    organizer: "Codeathon",
    date: "2025",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135104/CodeAthonTOP8_kzu9h3.jpg"],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "TechSpirint 2025-26 — GDG RGIPT",
    organizer: "Google Developer Groups – RGIPT",
    date: "2025",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135109/GDGRGIPTTOP10_aekzxe.png"],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "ArticX Hackathon",
    organizer: "ArticX",
    date: "2025",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135104/ArticXTOP10_su85it.jpg"],
  },
  {
    placement: "🏅 Top 12",
    hackathon: "Minithon 2025",
    organizer: "Minithon",
    date: "2025",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135118/Minithon_2025TOP12_zzipdz.png"],
  },
  {
    placement: "🏅 Top 15",
    hackathon: "HackVerse",
    organizer: "HackVerse",
    date: "2025",
    images: ["https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135115/HackVerseTOP15_pgjdgt.jpg"],
  },
];

const vp = { once: false, amount: 0.3 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const AchievementCard = ({
  a,
  expanded,
  onToggle,
  onImageClick,
  dark,
}: {
  a: Achievement;
  expanded: boolean;
  onToggle: () => void;
  onImageClick: (src: string) => void;
  dark: boolean;
}) => {
  const color = medalColor(a.placement);

  return (
    <motion.div
      variants={itemVariant}
      suppressHydrationWarning
      className="rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: dark ? "rgba(255,255,255,0.02)" : "rgba(74,144,226,0.04)",
        borderColor: dark ? accentRgba(0.12) : "rgba(74,144,226,0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = dark
          ? accentRgba(0.28)
          : "rgba(74,144,226,0.25)";
        (e.currentTarget as HTMLElement).style.backgroundColor = dark
          ? "rgba(255,255,255,0.04)"
          : "rgba(74,144,226,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = dark
          ? accentRgba(0.12)
          : "rgba(74,144,226,0.15)";
        (e.currentTarget as HTMLElement).style.backgroundColor = dark
          ? "rgba(255,255,255,0.02)"
          : "rgba(74,144,226,0.04)";
      }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 p-4">
        <div
          className="p-2 rounded-lg flex-shrink-0"
          style={{ background: `${color}15` }}
        >
          <IoTrophy size={16} style={{ color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold font-spaceGrotesk text-[#c9d1d9] dark:text-[#c9d1d9] truncate"
              style={{ color: dark ? "#c9d1d9" : "#1A1A1A" }}>
              {a.hackathon}
            </h3>
            <span
              className="text-[10px] font-bold font-spaceGrotesk px-2 py-0.5 rounded-md flex-shrink-0"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {a.placement}
            </span>
          </div>
          <p className="text-xs font-spaceGrotesk text-[#8b949e]"
            style={{ color: dark ? "#8b949e" : "#666" }}>
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

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 border-t"
              style={{ borderColor: dark ? accentRgba(0.08) : "rgba(74,144,226,0.12)" }}
            >
              <div
                className={`grid gap-2.5 mt-3 ${a.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {a.images.map((src, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border bg-black/30 flex items-center justify-center"
                    style={{ borderColor: dark ? accentRgba(0.12) : "rgba(74,144,226,0.15)" }}
                  >
                    <img
                      src={src}
                      alt={`${a.hackathon} certificate ${i + 1}`}
                      className="w-full h-auto object-contain rounded-lg cursor-zoom-in hover:opacity-75 transition-opacity duration-200"
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

const Achievements = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const dark = mounted && resolvedTheme === "dark";

  React.useEffect(() => setMounted(true), []);

  const toggle = (key: string) =>
    setExpandedKey((p) => (p === key ? null : key));

  const stats = [
    { icon: IoFlame, label: "Hackathons", value: "30+" },
    { icon: IoTrophy, label: "Wins", value: "2" },
    { icon: IoMedal, label: "Podium", value: "4" },
    { icon: IoMedal, label: "Finalist", value: String(finalist.length) },
  ];

  return (
    <section
      id="achievements"
      className="w-full px-6 md:px-12 lg:px-20 py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .font-spaceGrotesk { font-family: 'Space Grotesk', system-ui, sans-serif !important; }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mb-14 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full
                       font-spaceGrotesk mb-4"
            style={{ backgroundColor: accentRgba(0.12), color: ACCENT }}
          >
            Hackathons & Wins
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Achieve
            <span
              style={{
                color: ACCENT,
                textShadow: "0 0 28px rgba(74,144,226,0.22)",
              }}
            >
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

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={itemVariant}
              suppressHydrationWarning
              className="p-4 rounded-xl border text-center transition-all duration-300"
              style={{
                backgroundColor: dark ? "rgba(74,144,226,0.05)" : "rgba(74,144,226,0.08)",
                borderColor: dark ? accentRgba(0.14) : "rgba(74,144,226,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = dark
                  ? accentRgba(0.28)
                  : "rgba(74,144,226,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = dark
                  ? accentRgba(0.14)
                  : "rgba(74,144,226,0.2)";
              }}
            >
              <div
                className="p-2 rounded-lg w-fit mx-auto mb-2"
                style={{ backgroundColor: dark ? accentRgba(0.1) : "rgba(74,144,226,0.12)" }}
              >
                <Icon size={16} style={{ color: ACCENT }} />
              </div>
              <p className="text-xl font-bold text-[#E0E0E0] font-spaceGrotesk"
                style={{ color: dark ? "#E0E0E0" : "#1A1A1A" }}>
                {value}
              </p>
              <p className="text-xs font-spaceGrotesk text-[#8b949e] uppercase tracking-widest mt-1"
                style={{ color: dark ? "#8b949e" : "#666" }}>
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Podium */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="flex items-center gap-2 mb-4"
            >
              <IoTrophy size={16} style={{ color: "#FFD700" }} />
              <h3 className="text-lg font-bold font-spaceGrotesk text-[#E0E0E0]"
                style={{ color: dark ? "#E0E0E0" : "#1A1A1A" }}>
                Podium Finish
              </h3>
              <span
                className="text-xs font-bold font-spaceGrotesk px-2 py-0.5 rounded-md"
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
              className="space-y-2.5"
            >
              {podium.map((a) => (
                <AchievementCard
                  key={a.hackathon}
                  a={a}
                  expanded={expandedKey === a.hackathon}
                  onToggle={() => toggle(a.hackathon)}
                  onImageClick={setLightbox}
                  dark={dark}
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
              <IoMedal size={16} style={{ color: ACCENT }} />
              <h3 className="text-lg font-bold font-spaceGrotesk text-[#E0E0E0]"
                style={{ color: dark ? "#E0E0E0" : "#1A1A1A" }}>
                Finalist
              </h3>
              <span
                className="text-xs font-bold font-spaceGrotesk px-2 py-0.5 rounded-md"
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
              className="space-y-2.5"
            >
              {finalist.map((a) => (
                <AchievementCard
                  key={a.hackathon}
                  a={a}
                  expanded={expandedKey === a.hackathon}
                  onToggle={() => toggle(a.hackathon)}
                  onImageClick={setLightbox}
                  dark={dark}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-xl cursor-zoom-out p-4 sm:p-8"
              onClick={() => setLightbox(null)}
            >
              {/* Definitive Close Button - Positioned to stay clear of top-center floating navbars */}
              <button
                className="fixed top-28 right-6 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-200 z-[1000] border border-white/20 shadow-2xl backdrop-blur-2xl group active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(null);
                }}
              >
                <IoClose size={32} className="text-white group-hover:scale-110 transition-transform" />
              </button>

              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                src={lightbox}
                alt="Certificate"
                className="max-w-[95%] max-h-[75vh] object-contain rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 mt-12"
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
