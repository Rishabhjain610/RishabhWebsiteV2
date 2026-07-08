
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
  IoImageOutline,
  IoChevronBack,
  IoChevronForward,
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
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135116/LOFI_EDITION1st_xvdogh.jpg",
    ],
  },
  {
    placement: "🥇 1st Place",
    hackathon: "Google Techspirint Hackathon — GDG FET JU",
    organizer: "GDG — FET JU",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1781606941/FETJU_lgyvlb.png",
    ],
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
    placement: "🥈 2nd Place",
    hackathon: "Collab Coders Challenge",
    organizer: "GDG-RGMCET",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1775486570/CodeCollab_beu5cp.png",
    ],
  },
  
    
  {
    placement: "🥈 2nd Place",
    hackathon: "TechSpirint Hackathon",
    organizer: "GDG – SOE CUSAT",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1773213374/RISHABH_JAIN_GDG_SOE_CUSAT_1_odcoas.png",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1774387017/techspirint_kwmogl.jpg",
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
    organizer: "Student Council LTCE",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135104/codebyte_2.0_TOP6_tpdpjw.jpg",
    ],
  },
  {
    placement: "🏅 Top 8",
    hackathon: "Codeathon 2.0",
    organizer: "CSI DMCE",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135104/CodeAthonTOP8_kzu9h3.jpg",
    ],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "TechSpirint 2025-26 — GDG RGIPT",
    organizer: "Google Developer Groups – RGIPT",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135109/GDGRGIPTTOP10_aekzxe.png",
    ],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "SyncUp Hackathon",
    organizer: "GDG SAGE University Indore",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1774388708/Screenshot_2026-03-25_031401_yqazve.png",
    ],
  },
  {
    placement: "🏅 Top 10",
    hackathon: "ArticX Hackathon",
    organizer: "GDG-Dr.AITD",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135104/ArticXTOP10_su85it.jpg",
    ],
  },
  {
    placement: "🏅 Top 12",
    hackathon: "Minithon 2025",
    organizer: "CSI TSEC",
    date: "2025",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135118/Minithon_2025TOP12_zzipdz.png",
    ],
  },
  {
    placement: "🏅 Top 15",
    hackathon: "HackVerse",
    organizer: "GDG-JIMS",
    date: "2026",
    images: [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1772135115/HackVerseTOP15_pgjdgt.jpg",
    ],
  },
];

const vp = { once: false, amount: 0.3 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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
  onImageClick,
  dark,
}: {
  a: Achievement;
  onImageClick: (images: string[], index: number) => void;
  dark: boolean;
}) => {
  const color = medalColor(a.placement);

  return (
    <motion.div
      variants={itemVariant}
      suppressHydrationWarning
      className="group rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: dark
          ? "rgba(255,255,255,0.02)"
          : "rgba(74,144,226,0.04)",
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
      onClick={() => onImageClick(a.images, 0)}
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
            <h3
              className="text-sm font-bold font-spaceGrotesk truncate"
              style={{ color: dark ? "#c9d1d9" : "#1A1A1A" }}
            >
              {a.hackathon}
            </h3>
            <span
              className="text-[10px] font-bold font-spaceGrotesk px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {a.placement}
            </span>
          </div>
          <p
            className="text-xs font-spaceGrotesk truncate"
            style={{ color: dark ? "#8b949e" : "#666" }}
          >
            {a.organizer} · {a.date}
          </p>
        </div>

        <div
          className="p-1.5 rounded-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: accentRgba(0.08) }}
        >
          <IoImageOutline size={14} style={{ color: ACCENT }} />
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const dark = mounted && resolvedTheme === "dark";

  const [isLoading, setIsLoading] = useState(true);

  const handleOpenLightbox = (images: string[], index: number = 0) => {
    setLightbox({ images, index });
  };

  const handleOpenMoments = (startIndex: number = 0) => {
    const moments = [
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459406/HackathonGroup_zd08dc.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783459406/HackathonSolo_e47r5y.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783461670/Screenshot_20260708_032425_LinkedIn_jtkzoh.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783461668/Screenshot_20260708_032421_LinkedIn_ujruoj.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783461666/Screenshot_20260708_032401_LinkedIn_suurzz.jpg",
      "https://res.cloudinary.com/dlmzjcc0o/image/upload/v1783461580/Screenshot_20260708_032322_LinkedIn_ondm3n.jpg"
    ];
    setLightbox({ images: moments, index: startIndex });
  };

  React.useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: IoFlame, label: "Hackathons", value: "30+" },
    { icon: IoTrophy, label: "Wins", value: "7" },
    { icon: IoMedal, label: "Finalist", value: "12+" },
  ];

  const finalistGroup1 = finalist.slice(0, 6);
  const finalistGroup2 = finalist.slice(6);

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

      <div className="max-w-7xl mx-auto relative z-10">
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
              className="group p-5 rounded-2xl border
                         transition-all duration-300 hover:-translate-y-1
                         bg-white dark:bg-transparent backdrop-blur-md cursor-default text-center"
              style={{ borderColor: accentRgba(0.12) }}
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
              <div
                className="p-2 rounded-xl w-fit mx-auto mb-3 relative z-10 
                           bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                <Icon size={18} style={{ color: ACCENT }} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk h-8 sm:h-9 flex items-center justify-center">
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-[#4A90E2]/30 border-t-[#4A90E2] rounded-full animate-spin" />
                ) : (
                  value
                )}
              </p>
              <div className="flex flex-col mt-2 gap-0.5">
                <p className="text-[10px] sm:text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest font-bold">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Hackathon Moments Toggle Card */}
          <motion.div
            variants={itemVariant}
            suppressHydrationWarning
            className="group p-5 rounded-2xl border
                       transition-all duration-300 hover:-translate-y-1
                       bg-white dark:bg-transparent backdrop-blur-md cursor-pointer text-center"
            style={{ borderColor: accentRgba(0.12) }}
            onClick={() => handleOpenMoments(0)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = ACCENT;
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 8px 32px ${accentRgba(0.07)}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.12);
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              className="p-2 rounded-xl w-fit mx-auto mb-3 relative z-10 
                         bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
            >
              <IoImageOutline size={18} style={{ color: ACCENT }} />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk h-8 sm:h-9 flex items-center justify-center">
              Gallery
            </p>
            <div className="flex flex-col mt-2 gap-0.5">
              <p className="text-[10px] sm:text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest font-bold">
                6 Moments
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <h3
                className="text-lg font-bold font-spaceGrotesk"
                style={{ color: dark ? "#E0E0E0" : "#1A1A1A" }}
              >
                Podium Finish
              </h3>
              <span
                className="text-xs font-bold font-spaceGrotesk px-2 py-0.5 rounded-md whitespace-nowrap"
                style={{ backgroundColor: accentRgba(0.1), color: ACCENT }}
              >
                7 wins
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
                  onImageClick={handleOpenLightbox}
                  dark={dark}
                />
              ))}
            </motion.div>
          </div>

          {/* Finalist Column Container */}
          <div className="lg:col-span-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="flex items-center gap-2 mb-4"
            >
              <IoMedal size={16} style={{ color: ACCENT }} />
              <h3
                className="text-lg font-bold font-spaceGrotesk"
                style={{ color: dark ? "#E0E0E0" : "#1A1A1A" }}
              >
                Finalist
              </h3>
              <span
                className="text-xs font-bold font-spaceGrotesk px-2 py-0.5 rounded-md whitespace-nowrap"
                style={{ backgroundColor: accentRgba(0.1), color: ACCENT }}
              >
                {finalist.length}+ events
              </span>
            </motion.div>

            {/* Two Sub-Columns for Finalist */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Finalist Group 1 */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="space-y-2.5"
              >
                {finalistGroup1.map((a) => (
                  <AchievementCard
                    key={a.hackathon}
                    a={a}
                    onImageClick={handleOpenLightbox}
                    dark={dark}
                  />
                ))}
              </motion.div>

              {/* Finalist Group 2 */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="space-y-2.5"
              >
                {finalistGroup2.map((a) => (
                  <AchievementCard
                    key={a.hackathon}
                    a={a}
                    onImageClick={handleOpenLightbox}
                    dark={dark}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-4 sm:p-6"
            style={{
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center gap-4 mt-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 p-2.5 rounded-full text-white/70 hover:text-white transition-colors duration-200 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md"
              >
                <IoClose size={22} />
              </button>

              {/* Main Content Container */}
              <div className="relative bg-neutral-950/40 border border-white/10 rounded-2xl overflow-hidden max-h-[75vh] w-full flex items-center justify-center shadow-2xl">
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={`Moment page ${lightbox.index + 1}`}
                  className="max-w-full max-h-[70vh] object-contain block select-none"
                />

                {/* Navigation controls */}
                {lightbox.images.length > 1 && (
                  <>
                    {/* Prev Button */}
                    <button
                      onClick={() =>
                        setLightbox((prev) =>
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 border border-white/10 transition-all duration-200 cursor-pointer active:scale-95 z-20"
                    >
                      <IoChevronBack size={20} />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setLightbox((prev) =>
                          prev
                            ? {
                                ...prev,
                                index: (prev.index + 1) % prev.images.length,
                              }
                            : null
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 border border-white/10 transition-all duration-200 cursor-pointer active:scale-95 z-20"
                    >
                      <IoChevronForward size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Carousel page indicator */}
              {lightbox.images.length > 1 && (
                <div className="text-white/60 font-spaceGrotesk text-xs bg-black/40 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
                  Moment {lightbox.index + 1} of {lightbox.images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;