"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoDocument,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoMailOutline,
  IoAdd,
} from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "next-themes";

const ACCENT = "#4A90E2";
const A = (o: number) => `rgba(74,144,226,${o})`;

const links = [
  { name: "Resume", icon: IoDocument, href: "https://drive.google.com/file/d/1DV-irLeae0jWaRLNNyeMvwzPm8aqvXoB/view" },
  { name: "GitHub", icon: IoLogoGithub, href: "https://github.com/Rishabhjain610" },
  { name: "LinkedIn", icon: IoLogoLinkedin, href: "https://www.linkedin.com/in/rishabhjain610/" },
  { name: "LeetCode", icon: SiLeetcode, href: "https://leetcode.com/Rishabhjain610/" },
  { name: "Instagram", icon: IoLogoInstagram, href: "https://instagram.com/rishabh_jain610" },
  { name: "Email", icon: IoMailOutline, href: "mailto:rishabhjainwork1@gmail.com" },
];

const menuV = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.14, ease: "easeIn" as const } },
};

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
};

const rowV = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
};

export default function Links() {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const dark = resolvedTheme === "dark";

  /* 
    Enhanced glassmorphism — lower opacity for more transparency,
    combined with a strong blur for a premium frosted glass effect.
  */
  const panelBg = dark ? "rgba(18,18,18,0.72)" : "rgba(244,244,244,0.73)";
  const panelBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const divider = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const textMain = dark ? "#E0E0E0" : "#2E2E2E";
  const textMuted = dark ? "rgba(224,224,224,0.35)" : "rgba(46,46,46,0.35)";
  const iconTile = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <>
      {/* ══ FAB ══ */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick links"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full"
        suppressHydrationWarning
        style={{
          width: 48,
          height: 48,
          background: open ? panelBg : `linear-gradient(135deg, ${ACCENT}, #2f78c5)`,
          border: `1px solid ${open ? panelBorder : "transparent"}`,
          boxShadow: open
            ? `0 6px 24px rgba(0,0,0,${dark ? 0.4 : 0.1})`
            : `0 6px 20px ${A(0.38)}`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "background 0.22s, box-shadow 0.22s, border 0.22s",
        }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={{ display: "flex", color: open ? textMain : "#fff" }}
        >
          <IoAdd size={20} />
        </motion.span>
      </motion.button>

      {/* ══ Panel ══ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-[66px] right-6 z-30 origin-bottom-right"
            variants={menuV}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: panelBg,
                border: `1px solid ${panelBorder}`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: dark
                  ? "0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)"
                  : "0 16px 48px rgba(0,0,0,0.1),  inset 0 1px 0 rgba(255,255,255,1)",
                minWidth: 168,
              }}
            >
              {/* header */}


              {/* rows */}
              <motion.div
                className="flex flex-col p-1.5 gap-px"
                variants={listV}
                initial="hidden"
                animate="visible"
              >
                {links.map((link) => (
                  <motion.button
                    key={link.name}
                    variants={rowV}
                    onClick={() => { window.open(link.href, "_blank"); setOpen(false); }}
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 w-full text-left transition-all duration-150"
                    suppressHydrationWarning
                    style={{ color: textMain }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = dark ? A(0.11) : A(0.08);
                      el.style.color = ACCENT;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "transparent";
                      el.style.color = textMain;
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* icon */}
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                      style={{ background: iconTile }}
                    >
                      <link.icon size={13} />
                    </span>

                    {/* label */}
                    <span className="flex-1 text-[12.5px] font-medium tracking-tight font-spaceGrotesk">
                      {link.name}
                    </span>

                    {/* arrow */}
                    <svg
                      width="8" height="8" viewBox="0 0 8 8" fill="none"
                      className="shrink-0 opacity-0 group-hover:opacity-50 transition-opacity duration-150"
                    >
                      <path d="M1 7L7 1M7 1H3.5M7 1V4.5"
                        stroke="currentColor" strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                ))}
              </motion.div>

              {/* bottom accent line */}
              <div
                className="h-px mx-3 mb-2"
                style={{ background: `linear-gradient(90deg, transparent, ${A(0.2)}, transparent)` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ click-away ══ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}