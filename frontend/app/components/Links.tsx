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

export const CodolioIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    {...props}
  >
    <path d="M12 2C9.5 2 7.5 3 6 4.5L4 3L3 5L5 6C4.4 7 4 8.2 4 9.5C4 10.8 4.3 12 4.9 13C3.7 13.5 3 14.6 3 16C3 17.7 4.1 19.1 5.7 19.6C6.4 21 7.8 22 9.5 22H14.5C16.2 22 17.6 21 18.3 19.6C19.9 19.1 21 17.7 21 16C21 14.6 20.3 13.5 19.1 13C19.7 12 20 10.8 20 9.5C20 8.2 19.6 7 19 6L21 5L20 3L18 4.5C16.5 3 14.5 2 12 2ZM12 4C14.8 4 17 6.2 17 9C17 10.3 16.5 11.5 15.7 12.4C15.6 12.1 15.4 11.9 15.1 11.7C14.5 11.3 13.8 11 13 11H11C10.2 11 9.5 11.3 8.9 11.7C8.6 11.9 8.4 12.2 8.3 12.5C7.5 11.5 7 10.3 7 9C7 6.2 9.2 4 12 4ZM10 7C9.4 7 9 7.4 9 8C9 8.6 9.4 9 10 9C10.6 9 11 8.6 11 8C11 7.4 10.6 7 10 7ZM14 7C13.4 7 13 7.4 13 8C13 8.6 13.4 9 14 9C14.6 9 15 8.6 15 8C15 7.4 14.6 7 14 7ZM11 13H13C14.1 13 15 13.9 15 15V16C15 17.7 13.7 19 12 19C10.3 19 9 17.7 9 16V15C9 13.9 9.9 13 11 13ZM5 16C5 15.1 5.6 14.4 6.4 14.1C6.2 14.7 6.1 15.3 6.1 16C6.1 16.7 6.2 17.4 6.5 18C5.6 17.7 5 17 5 16ZM17.5 18C17.8 17.4 17.9 16.7 17.9 16C17.9 15.3 17.8 14.7 17.6 14.1C18.4 14.4 19 15.1 19 16C19 17 18.4 17.7 17.5 18Z" />
  </svg>
);

const links = [
  {
    name: "Resume",
    icon: IoDocument,
    href: "https://drive.google.com/file/d/1DV-irLeae0jWaRLNNyeMvwzPm8aqvXoB/view",
  },
  {
    name: "GitHub",
    icon: IoLogoGithub,
    href: "https://github.com/Rishabhjain610",
  },
  {
    name: "LinkedIn",
    icon: IoLogoLinkedin,
    href: "https://www.linkedin.com/in/rishabhjain610/",
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    href: "https://leetcode.com/u/8R0zDy20qw/",
  },
  {
    name: "Codolio",
    icon: CodolioIcon,
    href: "https://codolio.com/profile/rishabhjain610",
  },
  {
    name: "Instagram",
    icon: IoLogoInstagram,
    href: "https://instagram.com/rishabh_jain610",
  },
  {
    name: "Email",
    icon: IoMailOutline,
    href: "mailto:rishabhjainwork1@gmail.com",
  },
];

const menuV = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.18, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: { duration: 0.14, ease: "easeIn" as const },
  },
};

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
};

const rowV = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
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
          background: open
            ? panelBg
            : `linear-gradient(135deg, ${ACCENT}, #2f78c5)`,
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
                    onClick={() => {
                      window.open(link.href, "_blank");
                      setOpen(false);
                    }}
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 w-full text-left transition-all duration-150"
                    suppressHydrationWarning
                    style={{ color: textMain }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = dark ? A(0.11) : A(0.08);
                      el.style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
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
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      className="shrink-0 opacity-0 group-hover:opacity-50 transition-opacity duration-150"
                    >
                      <path
                        d="M1 7L7 1M7 1H3.5M7 1V4.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                ))}
              </motion.div>

              {/* bottom accent line */}
              <div
                className="h-px mx-3 mb-2"
                style={{
                  background: `linear-gradient(90deg, transparent, ${A(0.2)}, transparent)`,
                }}
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
