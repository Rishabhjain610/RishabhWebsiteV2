"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoGitBranch,
  IoStar,
  IoCodeSlash,
  IoFlame,
  IoLogoGithub,
  IoPeople,
  IoEye,
  IoChevronDown,
} from "react-icons/io5";

/* ─── Design Tokens — synchronized with Achievements / Work ─── */
const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74, 144, 226, ${a})`;

const GITHUB_USERNAME = "Rishabhjain610";
const CACHE_KEY = "gh-stats-v4-cache";
const CACHE_TTL = 3600 * 1000 * 24; // 24 hours

/* ─── Types ─── */
interface GitHubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  from: string;
  to: string;
  loading: boolean;
  lastUpdated?: number;
  topLanguages: { name: string; percentage: number }[];
}

/* ─── Animation variants — matches Achievements / Work ─── */
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

/* ─── Language colors ─── */
const langColors: Record<string, string> = {
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Python: "#3572A5",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  Shell: "#89E051",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  EJS: "#A91E50",
  Vue: "#41B883",
  React: "#61DAFB",
  Svelte: "#FF3E00",
  SCSS: "#C6538C",
  Less: "#1D365D",
  Jupyter: "#DA5B0B",
  Markdown: "#083FA1",
  Csharp: "#178600",
  Dockerfile: "#384D54",
  CMake: "#DA3434",
  CoffeeScript: "#244776",
  Haskell: "#5E5086",
  Lua: "#000080",
  Matlab: "#E16737",
  ObjectiveC: "#438EFF",
  Perl: "#0298C3",
  R: "#198CE7",
  Scala: "#C22D40",
  Vim: "#199F4B",
  Arduino: "#BD7923",
};

/* ─── Custom Dropdown ─── */
const CustomDropdown = ({
  value,
  onChange,
  options,
  disabled
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 px-5 py-2.5 rounded-xl text-xs font-spaceGrotesk font-bold
                   bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 
                   text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#4A90E2]/40 
                   transition-all duration-300 min-w-[170px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{selectedOption?.label}</span>
        <IoChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 w-full z-50 py-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-black/5 dark:border-white/10 shadow-2xl backdrop-blur-xl"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-2.5 text-xs font-spaceGrotesk font-medium transition-colors
                           ${value === opt.value ? "text-[#4A90E2] bg-black/[0.03] dark:bg-white/[0.03]" : "text-gray-600 dark:text-gray-300 hover:text-[#4A90E2] hover:bg-black/[0.02] dark:hover:bg-white/[0.05]"}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Stats = () => {
  const [stats, setStats] = useState<GitHubStats>({
    username: GITHUB_USERNAME,
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    totalForks: 0,
    totalContributions: 0,
    from: "",
    to: "",
    loading: true,
    topLanguages: [],
  });

  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const fetchStatsData = async (filterYear?: string, forceRefresh = false) => {
    const yearToFetch = filterYear || selectedYear;
    if (forceRefresh || (filterYear && filterYear !== selectedYear)) {
      setStats((prev) => ({ ...prev, loading: true }));
    }

    try {
      let url = "/api/github-stats";
      url += `?from=${yearToFetch}-01-01T00:00:00Z&to=${yearToFetch}-12-31T23:59:59Z`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const newState = {
        ...data,
        loading: false,
        lastUpdated: Date.now(),
      };

      setStats(newState);

      // Cache the latest year view
      if (yearToFetch === "2025") {
        localStorage.setItem(CACHE_KEY, JSON.stringify(newState));
      }
    } catch (e) {
      console.error("[Stats] Fetch Error:", e);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const age = Date.now() - (parsed.lastUpdated || 0);
        if (age < CACHE_TTL) {
          setStats({ ...parsed, loading: false });
          fetchStatsData("2025");
          return;
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    fetchStatsData("2025");
  }, []);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    fetchStatsData(year, true);
  };

  const statItems = [
    { icon: IoCodeSlash, label: "Repositories", value: stats.publicRepos },
    { icon: IoStar, label: "Total Stars", value: stats.totalStars },
    { icon: IoGitBranch, label: "Total Forks", value: stats.totalForks },
    { icon: IoPeople, label: "Followers", value: stats.followers },
    { icon: IoEye, label: "Following", value: stats.following },
  ];

  return (
    <section
      id="stats"
      className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24
                 bg-[#F4F4F4] dark:bg-[#121212] transition-colors duration-300 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
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
            Open Source
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            <span className="font-spaceGrotesk" style={{ color: ACCENT }}>
              Stats
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ── Metric Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10"
        >
          {statItems.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={statCard}
              className="group p-4 sm:p-5 rounded-2xl border
                         transition-all duration-300 hover:-translate-y-1
                         bg-white dark:bg-transparent backdrop-blur-md cursor-default"
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
                className="p-2 rounded-xl w-fit mb-3 relative z-10 
                           bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                <Icon size={18} style={{ color: ACCENT }} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk">
                {stats.loading && value === 0 ? "—" : (value ?? 0).toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest mt-1.5">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Main Activity Chart */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border
                       bg-white dark:bg-transparent backdrop-blur-xl transition-all duration-300"
            style={{ borderColor: accentRgba(0.12) }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] mb-1">
                  Contribution Activity
                </h3>
                <p className="text-xs text-gray-500 font-spaceGrotesk">System level production commits.</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#4A90E2]/5 border border-[#4A90E2]/10 transition-colors">
                <IoFlame size={20} className="text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold leading-none font-spaceGrotesk text-[#4A90E2]">
                    {stats.loading ? "..." : (stats.totalContributions ?? 0).toLocaleString()}
                  </span>
                  <span className="text-[9px] uppercase tracking-tighter text-[#666] dark:text-[#888] font-bold">
                    {`${selectedYear} Selected Cycle`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <CustomDropdown
                  value={selectedYear}
                  onChange={handleYearChange}
                  disabled={stats.loading}
                  options={[
                    { value: '2025', label: '2025 activity' },
                    { value: '2024', label: '2024 activity' },
                    { value: '2023', label: '2023 activity' },
                  ]}
                />
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5 overflow-hidden relative group min-h-[140px] flex items-center justify-center">
                {stats.loading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/5 dark:bg-black/10 backdrop-blur-[2px]">
                    <div className="w-8 h-8 border-3 border-[#4A90E2]/40 border-t-[#4A90E2] rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={`https://ghchart.rshah.org/4A90E2/${GITHUB_USERNAME}`}
                  alt="GitHub Contributions"
                  className={`w-full h-auto transition-all duration-1000 ${stats.loading ? 'blur-sm opacity-20' : 'opacity-90 dark:opacity-80'}`}
                />
              </div>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold font-spaceGrotesk
                         bg-[#4A90E2] text-white hover:shadow-lg hover:shadow-[#4A90E2]/30 transition-all active:scale-95"
            >
              <IoLogoGithub size={18} />
              Verify on GitHub
            </a>
          </motion.div>

          {/* Code Analytics Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="p-6 sm:p-8 rounded-3xl border
                       bg-white dark:bg-transparent backdrop-blur-xl transition-all duration-300 flex flex-col"
            style={{ borderColor: accentRgba(0.12) }}
          >
            <h3 className="text-xl font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] mb-8">
              Code Analytics
            </h3>

            <div className="flex-1 space-y-6">
              {stats.topLanguages?.map((lang) => {
                const color = langColors[lang.name] || ACCENT;
                return (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0]">{lang.name}</span>
                      <span className="text-[10px] font-bold text-gray-400">{lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
