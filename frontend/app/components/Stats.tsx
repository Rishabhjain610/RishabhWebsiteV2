"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  IoGitBranch,
  IoStar,
  IoCodeSlash,
  IoFlame,
  IoLogoGithub,
  IoPeople,
  IoEye,
  IoChevronDown,
  IoStarSharp,
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
  totalPRs?: number;
  totalIssues?: number;
  totalContributions: number;
  dailyContributions?: { date: string; count: number }[];
  topLanguagesByCommit?: { name: string; percentage: number }[];
  commitsByHour?: { hour: number; count: number }[];
  commitsByDay?: { name: string; count: number }[];
  contributionTypes?: { name: string; value: number }[];
  from: string;
  to: string;
  loading: boolean;
  lastUpdated?: number;
  topLanguages: { name: string; percentage: number }[];
  streaks?: {
    current: number;
    longest: number;
    longestPeriod: string;
    currentPeriod: string;
    totalContributions: number;
    grade: string;
  };
}

/* ─── Animation variants — matches Achievements / Work ─── */
const vp = { once: false, amount: 0.15 as const };

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
    transition: { duration: 0.35, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const statCard = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
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
  Jupyter: "#FF5722",
  "Jupyter Notebook": "#FF5722",
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
  disabled,
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        className="flex items-center justify-between gap-3 px-5 py-2.5 rounded-xl text-xs font-spaceGrotesk font-bold
                   bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 
                   text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#4A90E2]/40 
                   transition-all duration-300 min-w-[170px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{selectedOption?.label}</span>
        <IoChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
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

const GitHubHeatmap = ({
  year,
  loading,
  contributions,
}: {
  year: string;
  loading: boolean;
  contributions: { date: string; count: number }[];
}) => {
  if (!contributions || contributions.length === 0) return null;

  // GitHub contribution levels colors (more visible & uniform)
  const getLevel = (count: number) => {
    if (count === 0) return "bg-gray-200 dark:bg-white/10";
    if (count <= 3) return "bg-[#4A90E2]/30 dark:bg-[#4A90E2]/20";
    if (count <= 6) return "bg-[#4A90E2]/50 dark:bg-[#4A90E2]/40";
    if (count <= 9) return "bg-[#4A90E2]/80 dark:bg-[#4A90E2]/70";
    return "bg-[#4A90E2] dark:bg-[#4A90E2]";
  };

  // Build the grid
  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];
  const monthLabels: { name: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  contributions.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === contributions.length - 1) {
      const date = new Date(day.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          name: date.toLocaleString("default", { month: "short" }),
          weekIndex: weeks.length,
        });
        lastMonth = month;
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="w-full mt-4 bg-black/5 dark:bg-white/5 rounded-2xl p-6 border border-black/5 dark:border-white/5">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-bold font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest">
          {year} Activity Timeline
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] text-gray-400">Less</span>
          {[0, 2, 5, 8, 12].map((c, i) => (
            <div
              key={c}
              className={`w-2.5 h-2.5 rounded-full ${getLevel(c)} border border-white/5`}
            />
          ))}
          <span className="text-[8px] text-gray-400">More</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide pb-2 relative">
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="absolute pointer-events-none z-[60] px-3 py-2 rounded-xl bg-black dark:bg-[#111111] border border-white/10 shadow-2xl backdrop-blur-xl whitespace-nowrap overflow-visible"
              style={{
                left: hoveredDay.x,
                top: hoveredDay.y,
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-spaceGrotesk font-black text-white tracking-tight">
                  {hoveredDay.count}{" "}
                  {hoveredDay.count === 1 ? "contribution" : "contributions"}
                </span>
                <span className="text-[9px] font-spaceGrotesk text-gray-400 font-bold uppercase tracking-widest opacity-80">
                  {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black dark:bg-[#1A1A1A] border-b border-r border-white/10 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-2 min-w-max">
          {/* Month Labels */}
          <div className="flex gap-1 ml-4 relative h-4">
            {monthLabels.map((ml, i) => (
              <span
                key={i}
                className="absolute text-[9px] font-spaceGrotesk text-gray-400 font-medium"
                style={{ left: `${ml.weekIndex * 15}px`, opacity: 0.8 }}
              >
                {ml.name}
              </span>
            ))}
          </div>

          <div className="flex gap-2 items-start mt-2">
            {/* Day Labels */}
            <div className="flex flex-col gap-1.5 mt-[2px]">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                <span
                  key={i}
                  className="text-[8px] h-2.5 flex items-center font-spaceGrotesk text-gray-400 w-6 font-medium"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-1.5 ml-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1.5">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const parentRect =
                          e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
                        if (parentRect) {
                          setHoveredDay({
                            date: day.date,
                            count: day.count,
                            x: rect.left - parentRect.left + rect.width / 2,
                            y: rect.top - parentRect.top,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${getLevel(day.count)} ${loading ? "opacity-20 blur-[1px]" : "opacity-90 hover:opacity-100 hover:scale-110"} border border-white/5 cursor-pointer shadow-sm relative`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
    dailyContributions: [],
    from: "",
    to: "",
    loading: true,
    topLanguages: [],
  });

  const [selectedYear, setSelectedYear] = useState<string>("2026");

  const chartData = useMemo(() => {
    if (!stats.dailyContributions || stats.dailyContributions.length === 0)
      return [];

    // All months of the year
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const months: Record<string, number> = {};
    monthNames.forEach((m) => (months[m] = 0));

    stats.dailyContributions.forEach((day) => {
      const date = new Date(day.date);
      const monthStr = date.toLocaleString("default", { month: "short" });
      if (months[monthStr] !== undefined) {
        months[monthStr] += day.count;
      }
    });

    return monthNames.map((name) => ({
      name,
      contributions: months[name],
    }));
  }, [stats.dailyContributions]);

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
      if (yearToFetch === "2026") {
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
          fetchStatsData("2026");
          return;
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    fetchStatsData("2026");
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
              suppressHydrationWarning
              className="group p-4 sm:p-5 rounded-2xl border
                         transition-all duration-300 hover:-translate-y-1
                         bg-white dark:bg-transparent backdrop-blur-md cursor-default"
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
                className="p-2 rounded-xl w-fit mb-3 relative z-10 
                           bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                <Icon size={18} style={{ color: ACCENT }} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk">
                {stats.loading && value === 0
                  ? "—"
                  : (value ?? 0).toLocaleString()}
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
                <p className="text-xs text-gray-500 font-spaceGrotesk">
                  System level production commits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Ranking Circle */}
                {!stats.loading && stats.streaks && (
                  <div className="relative group/rank flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#4A90E2]/20 blur-xl rounded-full opacity-0 group-hover/rank:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 rounded-full border-4 border-[#4A90E2]/20 border-t-[#4A90E2] flex items-center justify-center bg-black/5 dark:bg-white/5 relative z-10 overflow-hidden">
                      <span className="text-2xl font-black font-spaceGrotesk text-[#4A90E2]">
                        {stats.streaks.grade}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#4A90E2]/5 border border-[#4A90E2]/10 transition-colors">
                  <IoFlame
                    size={20}
                    className="animate-pulse text-orange-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold leading-none font-spaceGrotesk text-[#4A90E2]">
                      {stats.loading
                        ? "..."
                        : (stats.totalContributions ?? 0).toLocaleString()}
                    </span>
                    <span className="text-[9px] uppercase tracking-tighter text-[#666] dark:text-[#888] font-bold">
                      {`${selectedYear} Selected Cycle`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Added Streak Stats */}
              {!stats.loading && stats.streaks && (
                <div className="flex gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-500/5 border border-orange-500/10 transition-colors">
                    <IoFlame size={20} className="text-orange-600" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold leading-none font-spaceGrotesk text-orange-600">
                        {stats.streaks.current}
                      </span>
                      <div className="flex flex-col mt-0.5">
                        <span className="text-[9px] uppercase tracking-tighter text-[#666] dark:text-[#888] font-bold">
                          Current Streak
                        </span>
                        <span className="text-[7px] text-gray-500 font-medium">
                          {stats.streaks.currentPeriod}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 transition-colors">
                    <IoStarSharp size={20} className="text-indigo-600" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold leading-none font-spaceGrotesk text-indigo-600">
                        {stats.streaks.longest}
                      </span>
                      <div className="flex flex-col mt-0.5">
                        <span className="text-[9px] uppercase tracking-tighter text-[#666] dark:text-[#888] font-bold">
                          Longest Streak
                        </span>
                        <span className="text-[7px] text-gray-500 font-medium whitespace-nowrap">
                          {stats.streaks.longestPeriod}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <CustomDropdown
                  value={selectedYear}
                  onChange={handleYearChange}
                  disabled={stats.loading}
                  options={[
                    { value: "2026", label: "2026 activity" },
                    { value: "2025", label: "2025 activity" },
                    { value: "2024", label: "2024 activity" },
                    { value: "2023", label: "2023 activity" },
                  ]}
                />
              </div>

              <div className="p-4 sm:p-6 rounded-3xl bg-black/5 dark:bg-[#0d1117] border border-black/5 dark:border-white/5 overflow-hidden relative group min-h-[300px] flex flex-col items-center justify-center">
                {stats.loading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/5 dark:bg-black/10 backdrop-blur-[2px]">
                    <div className="w-8 h-8 border-3 border-[#4A90E2]/40 border-t-[#4A90E2] rounded-full animate-spin" />
                  </div>
                )}

                <div className="w-full h-[240px] mb-6">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={240}
                  >
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#4A90E2"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="95%"
                            stopColor="#4A90E2"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(255,255,255,0.05)"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#666", fontWeight: 500 }}
                        minTickGap={30}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#666" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0d1117",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          color: "#fff",
                        }}
                        itemStyle={{ color: "#4A90E2" }}
                        cursor={{
                          stroke: "rgba(74,144,226,0.2)",
                          strokeWidth: 2,
                        }}
                        formatter={(value) => [
                          `${value} Commits`,
                          "Monthly Total",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="contributions"
                        stroke="#4A90E2"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorPv)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <GitHubHeatmap
                  year={selectedYear}
                  loading={stats.loading}
                  contributions={stats.dailyContributions ?? []}
                />
              </div>

              {/* Language Breakdown Row */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#4A90E2]/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest">
                      Language by Repository
                    </p>
                    <div className="flex gap-2">
                      {stats.topLanguages.slice(0, 3).map((l) => (
                        <div
                          key={l.name}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: langColors[l.name] || ACCENT,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-[120px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.topLanguages}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={4}
                          dataKey="percentage"
                          stroke="none"
                        >
                          {stats.topLanguages.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={langColors[entry.name] || ACCENT}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#000",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "10px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 justify-center">
                    {stats.topLanguages.slice(0, 4).map((lang) => (
                      <div
                        key={lang.name}
                        className="flex items-center gap-1.5"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: langColors[lang.name] || ACCENT,
                          }}
                        />
                        <span className="text-[9px] font-medium font-spaceGrotesk text-gray-500">
                          {lang.name} {lang.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#4A90E2]/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest">
                      Language by Commits
                    </p>
                    <div className="flex gap-2">
                      {(stats.topLanguagesByCommit || stats.topLanguages)
                        .slice(0, 3)
                        .map((l) => (
                          <div
                            key={l.name}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: langColors[l.name] || ACCENT,
                            }}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="h-[120px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={
                            stats.topLanguagesByCommit || stats.topLanguages
                          }
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={4}
                          dataKey="percentage"
                          stroke="none"
                        >
                          {(
                            stats.topLanguagesByCommit || stats.topLanguages
                          ).map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={langColors[entry.name] || ACCENT}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#000",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "10px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 justify-center">
                    {(stats.topLanguagesByCommit || stats.topLanguages)
                      .slice(0, 4)
                      .map((lang) => (
                        <div
                          key={lang.name}
                          className="flex items-center gap-1.5"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: langColors[lang.name] || ACCENT,
                            }}
                          />
                          <span className="text-[9px] font-medium font-spaceGrotesk text-gray-500">
                            {lang.name} {lang.percentage}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
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
            </div>
          </motion.div>

          {/* Code Analytics Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="p-6 sm:p-8 rounded-3xl border
                       bg-white dark:bg-transparent backdrop-blur-xl transition-all duration-300 flex flex-col h-full"
            style={{ borderColor: accentRgba(0.12) }}
          >
            <h3 className="text-xl font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] mb-8">
              Code Analytics
            </h3>

            <div className="flex-1 flex flex-col gap-8">
              {/* Activity Trend - Restored Area Chart */}
              <div>
                <p className="text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest mb-4">
                  Activity Trend
                </p>
                <div className="h-[120px] w-full bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-[#4A90E2]/10 backdrop-blur-3xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorPvSide"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#4A90E2"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#4A90E2"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(128,128,128,0.15)"
                      />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#000",
                          border: "none",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "11px",
                          padding: "8px 12px",
                        }}
                        itemStyle={{ color: "#4A90E2" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="contributions"
                        stroke="#4A90E2"
                        strokeWidth={3}
                        fill="url(#colorPvSide)"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Commits (UTC) - Bar Chart */}
              <div>
                <p className="text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest mb-4">
                  Commit Hours (UTC)
                </p>
                <div className="h-[120px] w-full bg-black/5 dark:bg-white/5 rounded-2xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.commitsByHour || []}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(128,128,128,0.1)"
                      />
                      <XAxis
                        dataKey="hour"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 8, fill: "#888" }}
                        interval={3}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "10px",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill={ACCENT}
                        radius={[2, 2, 0, 0]}
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Contribution Breakdown - Radar Chart */}
              <div className="flex-1 min-h-[220px] flex flex-col">
                <p className="text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest mb-4">
                  Activity Breakdown
                </p>
                <div className="flex-1 w-full bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-[#4A90E2]/10 backdrop-blur-3xl flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={stats.contributionTypes || []}
                    >
                      <PolarGrid stroke="rgba(128,128,128,0.25)" />
                      <PolarAngleAxis
                        dataKey="name"
                        tick={{ fontSize: 9, fill: "#888", fontWeight: 700 }}
                      />
                      <Radar
                        name="Activity"
                        dataKey="value"
                        stroke={ACCENT}
                        fill={ACCENT}
                        fillOpacity={0.5}
                        strokeWidth={2}
                        isAnimationActive={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#000",
                          border: "none",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "11px",
                          padding: "8px 12px",
                        }}
                        formatter={(value) => [value, "Intensity"]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Activity - Bar Chart */}
              <div className="mt-auto">
                <p className="text-[11px] font-spaceGrotesk text-[#555] dark:text-[#999] uppercase tracking-widest mb-4">
                  Weekly Momentum
                </p>
                <div className="h-[140px] w-full bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-[#4A90E2]/10 backdrop-blur-3xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.commitsByDay || []}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 9, fill: "#888", fontWeight: 600 }}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#000",
                          border: "none",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "11px",
                          padding: "8px 12px",
                        }}
                        itemStyle={{ color: "#4A90E2" }}
                        formatter={(value) => [`${value} Points`, "Activity"]}
                      />
                      <Bar
                        dataKey="count"
                        fill={ACCENT}
                        radius={[4, 4, 4, 4]}
                        isAnimationActive={false}
                        barSize={12}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
