"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoMailOutline,
  IoLocationOutline,
  IoArrowForward,
  IoCheckmarkCircle,
  IoSend,
  IoClose,
} from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "next-themes";
import emailjs from "@emailjs/browser";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

/* ─── Accent ─── */
const ACCENT = "#4A90E2";
const accentRgba = (a: number) => `rgba(74,144,226,${a})`;

/* ─── Variants ─── */
const vp = { once: false, amount: 0.1 };

const fadeUp = {
  hidden: { opacity: 0, y: 30, transition: { duration: 0.4, ease: "easeIn" as const } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/* ─── Social links ─── */
const socials = [
  {
    name: "Email",
    label: "rishabhjainwork1@gmail.com",
    icon: IoMailOutline,
    href: "mailto:rishabhjainwork1@gmail.com",
    color: "#EA4335",
  },
  {
    name: "GitHub",
    label: "Rishabhjain610",
    icon: IoLogoGithub,
    href: "https://github.com/Rishabhjain610",
    color: "#f0f0f0",
    darkColor: "#c9d1d9",
  },
  {
    name: "LinkedIn",
    label: "rishabhjain610",
    icon: IoLogoLinkedin,
    href: "https://www.linkedin.com/in/rishabhjain610/",
    color: "#0A66C2",
  },
  {
    name: "Instagram",
    label: "@rishabh_jain610",
    icon: IoLogoInstagram,
    href: "https://instagram.com/rishabh_jain610",
    color: "#E4405F",
  },
  {
    name: "LeetCode",
    label: "Rishabhjain610",
    icon: SiLeetcode,
    href: "https://leetcode.com/u/8R0zDy20qw/",
    color: "#FFA116",
  },
];

const NAVI_MUMBAI_MARKER = (theme: string | undefined): GlobeMarker[] => [
  {
    lat: 19.0330,
    lng: 73.0297,
    src: theme === "dark" ? "/LogoDark.png" : "/LogoLight.png",
    label: "Navi Mumbai, India",
    size: 0.12,
    color: ACCENT, // Matches our professional primary color
  },
];

const Contact = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormState("submitting");

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
      .then(() => {
        setFormState("sent");
        setTimeout(() => setFormState("idle"), 6000);
        formRef.current?.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setFormState("error");
        setTimeout(() => setFormState("idle"), 5000);
      });
  };

  return (
    <section
      id="contact"
      className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16
                 bg-[#F4F4F4] dark:bg-[#121212]
                 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none opacity-[0.03] dark:opacity-[0.07]"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section header ── */}
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
            Say Hello
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
            Get In{" "}
            <span
              className="font-spaceGrotesk"
              style={{
                color: ACCENT,
                textShadow: "0 0 30px rgba(74,144,226,0.3)"
              }}
            >
              Touch
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.45 }}
            />
          </div>

          <p className="max-w-xl mt-4 text-[#555] dark:text-[#E0E0E0]/60 font-spaceGrotesk text-sm sm:text-base leading-relaxed mx-auto lg:mx-0">
            I&apos;m currently open to new opportunities and collaborations.
            Whether you have a question or just want to chat, I&apos;ll do my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* ── Left Column: Globe & Connections ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* ── 3D Globe Card ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              // Forced dark styling
              className="relative overflow-hidden group p-1 rounded-3xl bg-[#1A1A1A] border border-white/[0.05] shadow-sm h-[400px]"
            >
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <Globe3D
                  className="h-full w-full pointer-events-none"
                  markers={NAVI_MUMBAI_MARKER("dark")} // Forced dark marker
                  config={{
                    radius: 2.8,
                    atmosphereColor: ACCENT,
                    atmosphereIntensity: 20,
                    bumpScale: 3,
                    autoRotateSpeed: 0.5,
                    markerSize: 0.08,
                    showAtmosphere: false,
                  }}
                />
              </div>

              {/* Minimalist Floating Badge (Forced Dark) */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121212]/80 backdrop-blur-md border border-white/10 shadow-sm">
                  <IoLocationOutline size={14} style={{ color: ACCENT }} />
                  <span className="text-[10px] font-bold text-white font-spaceGrotesk">
                    Navi Mumbai, India
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Social Connections ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#888] mb-3 font-spaceGrotesk ml-1">
                Connections
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {socials.map((s) => (
                  <motion.a
                    key={s.name}
                    variants={cardVariant}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl border
                               bg-white dark:bg-white/[0.03] 
                               hover:bg-white dark:hover:bg-white/[0.06]
                               transition-all duration-300 group shadow-sm dark:shadow-none"
                    style={{ borderColor: accentRgba(0.12) }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.3);
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = accentRgba(0.12);
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shrink-0"
                      style={{
                        backgroundColor: (mounted && resolvedTheme === "dark")
                          ? "rgba(74, 144, 226, 0.2)"
                          : "rgba(74, 144, 226, 0.1)"
                      }}
                    >
                      <s.icon
                        size={20}
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-spaceGrotesk leading-tight truncate">
                        {s.name}
                      </p>
                      <p className="text-[10px] text-[#777] dark:text-[#999] font-spaceGrotesk truncate">
                        {s.label.length > 18 ? s.label.substring(0, 15) + '...' : s.label}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="lg:col-span-6 lg:col-start-7 p-6 sm:p-10 rounded-3xl border 
                       bg-white dark:bg-white/[0.02] backdrop-blur-xl transition-all duration-500 relative"
            style={{
              borderColor: accentRgba(0.12),
              boxShadow: `0 20px 50px rgba(0,0,0,${(!mounted || resolvedTheme !== 'dark') ? 0.05 : 0.3})`
            }}
          >
            <AnimatePresence mode="wait">
              {formState !== "sent" && formState !== "error" ? (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Hidden fields for EmailJS template */}
                  <input type="hidden" name="title" value="Portfolio Inquiry" />
                  <input type="hidden" name="time" value={new Date().toLocaleString()} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#888] ml-1 font-spaceGrotesk">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-white dark:bg-white/[0.05] border border-[#eee] dark:border-white/10 rounded-xl px-5 py-3
                                   text-sm font-spaceGrotesk text-[#1A1A1A] dark:text-white outline-none
                                   focus:ring-2 focus:ring-[#4A90E2]/40 focus:border-[#4A90E2]/50 transition-all duration-300 shadow-sm dark:shadow-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#888] ml-1 font-spaceGrotesk">Email Address</label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-white dark:bg-white/[0.05] border border-[#eee] dark:border-white/10 rounded-xl px-5 py-3
                                   text-sm font-spaceGrotesk text-[#1A1A1A] dark:text-white outline-none
                                   focus:ring-2 focus:ring-[#4A90E2]/40 focus:border-[#4A90E2]/50 transition-all duration-300 shadow-sm dark:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#888] ml-1 font-spaceGrotesk">Your Message</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="How can I help you?"
                      className="w-full bg-white dark:bg-white/[0.05] border border-[#eee] dark:border-white/10 rounded-xl px-5 py-4
                                 text-sm font-spaceGrotesk text-[#1A1A1A] dark:text-white outline-none resize-none
                                 focus:ring-2 focus:ring-[#4A90E2]/40 focus:border-[#4A90E2]/50 transition-all duration-300 shadow-sm dark:shadow-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full py-4 rounded-xl flex items-center justify-center gap-3
                               text-white font-bold font-spaceGrotesk text-sm tracking-wider
                               transition-all duration-300 overflow-hidden relative"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT} 0%, #357abd 100%)`,
                      boxShadow: `0 10px 30px ${accentRgba(0.2)}`
                    }}
                  >
                    {formState === "submitting" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <IoSend size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : formState === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                    <IoCheckmarkCircle size={48} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] mb-2">Message Sent!</h3>
                    <p className="text-sm text-[#777] dark:text-[#999] font-spaceGrotesk">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setFormState("idle")}
                    className="px-8 py-2 rounded-full border border-green-500/30 text-green-500 text-xs font-bold font-spaceGrotesk"
                    whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.05)' }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                    <IoClose size={48} className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-spaceGrotesk text-[#1A1A1A] dark:text-[#E0E0E0] mb-2">Sending Failed</h3>
                    <p className="text-sm text-[#777] dark:text-[#999] font-spaceGrotesk">
                      Something went wrong. Please try again later.
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setFormState("idle")}
                    className="px-8 py-2 rounded-full border border-red-500/30 text-red-500 text-xs font-bold font-spaceGrotesk"
                    whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div >
    </section >
  );
};

export default Contact;