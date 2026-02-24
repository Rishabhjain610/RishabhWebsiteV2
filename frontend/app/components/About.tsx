"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoRocket,
  IoTrophy,
  IoCodeSlash as IoTechStack,
  IoHome,
  IoSchool,
  IoCodeSlash,
  IoGlobeOutline,
} from "react-icons/io5";

/* ─── Education ─── */
const education = [
  {
    icon: IoHome,
    title: "Class 10th ICSE",
    school: "Goldcrest High School, Vashi",
    year: "2021",
  },
  {
    icon: IoSchool,
    title: "Class 12th HSC",
    school: "Shiravane Vidyalaya & Junior College, Nerul",
    year: "2021–23",
  },
  {
    icon: IoCodeSlash,
    title: "B.E in Computer Engineering",
    school: "Thadomal Shahani Engineering College, Mumbai",
    year: "2023–2027",
  },
];

/* ─── Stats ─── */
const stats = [
  { label: "Projects Built", value: "20+", icon: IoRocket },
  { label: "Hackathon Wins", value: "2×", icon: IoTrophy },
  { label: "Hackathon Finalist", value: "12+", icon: IoGlobeOutline },
];

/* ─── Viewport config — once: false so animations replay ─── */
const vp = { once: false, amount: 0.3 };

/* ─── Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.4, ease: "easeIn" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0.3, ease: "easeIn" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 22, transition: { duration: 0.3, ease: "easeIn" } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ═══════════════════════════════════════════════ */

const About = () => {
  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 lg:px-20 py-24
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileNotInView="hidden"
          viewport={vp}
          className="mb-14 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full
                       font-spaceGrotesk mb-4"
            style={{ backgroundColor: "rgba(74,144,226,0.12)", color: "#4A90E2" }}
          >
            👋 Who I am
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            About{" "}
            <span style={{ color: "#4A90E2", textShadow: "0 0 28px rgba(74,144,226,0.22)" }}>
              Me
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: "#4A90E2", opacity: 0.45 }}
            />
          </div>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

          {/* ── LEFT 3/5 ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Bio */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileNotInView="hidden"
              viewport={vp}
              className="space-y-4"
            >
              <p className="text-lg lg:text-xl font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] opacity-90 dark:opacity-80 leading-relaxed">
                Hey there! I&apos;m{" "}
                <span className="font-bold" style={{ color: "#4A90E2" }}>
                  Rishabh Jain
                </span>
                , a Full Stack Developer who loves turning ideas into powerful,
                user-friendly digital experiences. With a strong background in
                computer engineering and a curious mind, I&apos;m always exploring
                new technologies and better ways to build.
              </p>
              <p className="text-lg lg:text-xl font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] opacity-90 dark:opacity-80 leading-relaxed">
                I enjoy collaborating with others, thinking critically, and
                writing clean, efficient code. When I&apos;m not coding, you&apos;ll find
                me either on the{" "}
                <span className="font-medium">cricket field</span> or deep in
                thought over the latest in{" "}
                <span className="font-medium">world affairs</span>.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              whileNotInView="hidden"
              viewport={vp}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map(({ label, value, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={statItem}
                  className="p-4 rounded-2xl border flex flex-col gap-2
                             transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "rgba(74,144,226,0.05)",
                    borderColor: "rgba(74,144,226,0.14)",
                  }}
                >
                  <div
                    className="p-2 rounded-full w-fit"
                    style={{ backgroundColor: "rgba(74,144,226,0.12)" }}
                  >
                    <Icon size={17} style={{ color: "#4A90E2" }} />
                  </div>
                  <p className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk">
                    {value}
                  </p>
                  <p className="text-[10px] font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] opacity-90 dark:opacity-55 uppercase tracking-widest">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileNotInView="hidden"
              viewport={vp}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://drive.google.com/file/d/1DV-irLeae0jWaRLNNyeMvwzPm8aqvXoB/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5
                           rounded-xl font-bold text-sm text-white font-spaceGrotesk
                           transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #4A90E2 0%, #357abd 100%)",
                  boxShadow: "0 6px 20px rgba(74,144,226,0.32)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(74,144,226,0.45)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(74,144,226,0.32)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                View Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5
                           rounded-xl font-bold text-sm font-spaceGrotesk
                           border-2 border-[#4A90E2] text-[#4A90E2]
                           transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(74,144,226,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT 2/5 – Education timeline ── */}
          <div className="lg:col-span-2">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileNotInView="hidden"
              viewport={vp}
              className="text-xs font-bold tracking-[0.25em] uppercase mb-8 font-spaceGrotesk"
              style={{ color: "#4A90E2" }}
            >
              Education
            </motion.p>

            <div className="relative pl-1">
              {/* Vertical rail */}
              <div
                className="absolute left-[18px] top-4 bottom-4 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(74,144,226,0.65), rgba(74,144,226,0.05))",
                }}
              />

              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    whileNotInView="hidden"
                    viewport={vp}
                    transition={{ delay: i * 0.12 }}
                    className="relative flex gap-5 group"
                  >
                    {/* Icon dot */}
                    <div
                      className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full
                                 flex items-center justify-center
                                 ring-2 ring-transparent group-hover:ring-[#4A90E2]/25
                                 transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #4A90E2, #357abd)",
                        boxShadow: "0 4px 14px rgba(74,144,226,0.28)",
                      }}
                    >
                      <edu.icon size={14} className="text-white" />
                    </div>

                    {/* Card */}
                    <div
                      className="flex-1 p-4 rounded-xl border
                                 transition-all duration-300
                                 group-hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "rgba(74,144,226,0.04)",
                        borderColor: "rgba(74,144,226,0.14)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(74,144,226,0.32)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(74,144,226,0.14)";
                      }}
                    >
                      <h3 className="font-semibold text-sm font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0]">
                        {edu.title}
                      </h3>
                      <p className="text-xs text-[#1A1A1A] dark:text-[#E0E0E0] opacity-90 dark:opacity-50 mt-1 font-spaceGrotesk leading-snug">
                        {edu.school}
                      </p>
                      <span
                        className="mt-2 inline-block text-[11px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: "rgba(74,144,226,0.10)",
                          color: "#4A90E2",
                        }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;