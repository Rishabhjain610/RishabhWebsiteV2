"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoMailOutline,
  IoCheckmarkCircle,
  IoSend,
  IoClose,
} from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "next-themes";
import emailjs from "@emailjs/browser";
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe";

const ACCENT = "#4A90E2";
const A = (o: number) => `rgba(74,144,226,${o})`;

const GLOBE_MARKERS = (): GlobeMarker[] => [
  { lat: 19.033, lng: 73.0297, src: "/LogoDark.png", label: "Navi Mumbai", size: 0.1, color: ACCENT },
];

const socials = [
  {
    name: "Email",
    icon: IoMailOutline,
    href: "mailto:rishabhjainwork1@gmail.com",
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
    name: "Instagram",
    icon: IoLogoInstagram,
    href: "https://instagram.com/rishabh_jain610",
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    href: "https://leetcode.com/u/8R0zDy20qw/",
  },
];

/* ─── Animation Variants ─── */
const viewport = { once: false, amount: 0.06 };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const scaleFade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

/* ─── Professional Input Styles ─── */
const inputClasses = `
  w-full rounded-xl px-5 py-3 text-[13px] outline-none font-spaceGrotesk transition-all duration-300
  bg-white dark:bg-white/[0.04]
  border border-[#E0E0E0] dark:border-transparent
  text-[#1A1A1A] dark:text-[#E0E0E0]
  placeholder:text-[#999] dark:placeholder:text-[#444]
  focus:border-[#4A90E2] dark:focus:border-[#4A90E2]/40 focus:bg-white dark:focus:bg-white/[0.07]
  focus:shadow-[0_0_0_4px_rgba(74,144,226,0.08)]
`
  .replace(/\s+/g, " ")
  .trim();

const labelClasses =
  "block text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] dark:text-[#555] mb-2 ml-1 font-spaceGrotesk";

export default function Contact() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [fs, setFs] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle",
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFs("submitting");
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(() => {
        setFs("sent");
        setTimeout(() => setFs("idle"), 6000);
        formRef.current?.reset();
      })
      .catch(() => {
        setFs("error");
        setTimeout(() => setFs("idle"), 5000);
      });
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden transition-colors duration-300
                 bg-[#F4F4F4] dark:bg-[#121212]
                 px-4 sm:px-8 md:px-14 lg:px-20 py-20 sm:py-28"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .font-spaceGrotesk { font-family: 'Space Grotesk', system-ui, sans-serif !important; }
      `}</style>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── HEADER ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-14 text-center lg:text-left"
        >
          <span
            className="inline-block text-sm font-bold px-3 py-1.5 rounded-full font-spaceGrotesk mb-4"
            style={{ backgroundColor: A(0.12), color: ACCENT }}
          >
            👋 Say Hello
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#1A1A1A] dark:text-[#E8E8E8]">
            Get In{" "}
            <span style={{ color: ACCENT, textShadow: `0 0 30px ${A(0.2)}` }}>
              Touch
            </span>
          </h2>

          <div className="flex justify-center lg:justify-start mt-4">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.3 }}
            />
          </div>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#555] dark:text-[#888] font-spaceGrotesk mx-auto lg:mx-0">
            I&apos;m currently open to new opportunities and collaborations.
            Whether you have a question or just want to chat, I&apos;ll do my
            best to get back to you!
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* ════ LEFT — Social Card ════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-6"
          >
            <div
              className="relative flex flex-col flex-1 overflow-hidden rounded-3xl"
              style={{
                background: "#0D0D0D",
                border: "1px solid rgba(255,255,255,0.06)",
                minHeight: 520,
                boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Thin top accent */}
              <div
                className="absolute inset-x-0 top-0 h-px z-20"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                }}
              />

              {/* Globe Section */}
              <div className="relative flex-1 w-full cursor-pointer" style={{ minHeight: 400 }}>
                <Globe3D
                  markers={GLOBE_MARKERS()}
                  config={{
                    radius: 4.1,
                    atmosphereIntensity: 0,
                    showAtmosphere: false,
                    bumpScale: 3,
                    autoRotateSpeed: 0.4,
                    markerSize: 0.1,
                  }}
                  className="absolute inset-0"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, #0D0D0D 35%, rgba(13,13,13,0.7) 60%, transparent 80%)",
                  }}
                />
              </div>

              {/* Social Links Footer */}
              <div className="relative z-[2] mt-auto p-8">
                <p
                  className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] font-spaceGrotesk"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Connect
                </p>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="flex flex-wrap gap-2.5"
                >
                  {socials.map((s) => (
                    <motion.a
                      key={s.name}
                      variants={scaleFade}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center p-3 rounded-xl transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = A(0.12);
                        (e.currentTarget as HTMLElement).style.borderColor = A(0.3);
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.08)";
                      }}
                    >
                      <s.icon size={18} style={{ color: ACCENT }} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ════ RIGHT — Form ════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative flex flex-col overflow-hidden rounded-3xl"
            style={{
              background: dark ? "rgba(255,255,255,0.02)" : "#ffffff",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#E8E8E8"}`,
              padding: "2.5rem",
              boxShadow: dark
                ? "0 25px 60px rgba(0,0,0,0.4)"
                : "0 15px 45px rgba(0,0,0,0.06)",
            }}
          >
            {/* Accent decorative background bleed */}
            <div
              className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full blur-[120px] pointer-events-none opacity-[0.05]"
              style={{ background: ACCENT }}
            />

            {/* top accent bar */}
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, ${A(0.1)})`,
              }}
            />

            <AnimatePresence mode="wait">
              {/* ── FORM ── */}
              {fs !== "sent" && fs !== "error" && (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  onSubmit={submit}
                  className="flex flex-col gap-4 flex-1 h-full"
                >
                  <input type="hidden" name="title" value="Portfolio Inquiry" />
                  <input
                    type="hidden"
                    name="time"
                    value={new Date().toLocaleString()}
                  />

                  {/* heading */}
                  <div className="mb-1">
                    <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-[#E8E8E8] font-spaceGrotesk">
                      Send a Message
                    </h3>
                    <p className="mt-0.5 text-[12px] text-[#666] dark:text-[#555] font-spaceGrotesk">
                      Looking forward to hearing from you.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div>
                    <label className={labelClasses}>Full Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className={inputClasses}
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className={inputClasses}
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className={labelClasses}>Subject</label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      className={inputClasses}
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col flex-1 min-h-[160px]">
                    <label className={labelClasses}>Your Message</label>
                    <textarea
                      required
                      name="message"
                      placeholder="Tell me more about your project or inquiry..."
                      className={`${inputClasses} resize-none flex-1 h-full`}
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={fs === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden rounded-xl py-4
                               text-sm font-bold tracking-widest text-white font-spaceGrotesk uppercase
                               transition-all duration-300 disabled:opacity-50"
                    suppressHydrationWarning
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT} 0%, #357abd 100%)`,
                      boxShadow: `0 8px 25px ${A(0.25)}`,
                    }}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/20
                                 group-hover:translate-x-[200%] transition-transform duration-700"
                    />
                    <span className="relative flex items-center justify-center gap-2.5">
                      {fs === "submitting" ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          Send Message
                          <IoSend
                            size={14}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                          />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}

              {/* ── SUCCESS ── */}
              {fs === "sent" && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col items-center justify-center gap-4 text-center min-h-[380px]"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "rgba(34,197,94,0.1)" }}
                  >
                    <IoCheckmarkCircle size={36} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#E8E8E8] font-spaceGrotesk">
                      Message Sent!
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#666] dark:text-[#555] font-spaceGrotesk">
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setFs("idle")}
                    className="rounded-full border border-green-500/30 px-6 py-1.5 text-[11px] font-semibold text-green-500 font-spaceGrotesk hover:bg-green-500/5 transition-colors duration-150"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}

              {/* ── ERROR ── */}
              {fs === "error" && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col items-center justify-center gap-4 text-center min-h-[380px]"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "rgba(239,68,68,0.1)" }}
                  >
                    <IoClose size={36} className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#E8E8E8] font-spaceGrotesk">
                      Sending Failed
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#666] dark:text-[#555] font-spaceGrotesk">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                  <button
                    onClick={() => setFs("idle")}
                    className="rounded-full border border-red-500/30 px-6 py-1.5 text-[11px] font-semibold text-red-500 font-spaceGrotesk hover:bg-red-500/5 transition-colors duration-150"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
