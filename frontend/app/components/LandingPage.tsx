
"use client";
import React, { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  IoArrowForward,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
} from "react-icons/io5";

const bootLines = [
  { text: "$ npm run dev", color: "#6e7681", delay: 0 },
  { text: "> rishabh-portfolio@1.0.0 dev", color: "#c9d1d9", delay: 400 },
  { text: "> next dev --turbo", color: "#c9d1d9", delay: 700 },
  { text: "", color: "", delay: 900 },
  { text: "▲ Next.js 16.1.6 (Turbopack)", color: "#4A90E2", delay: 1100 },
  { text: "  - Local: http://localhost:3000", color: "#c9d1d9", delay: 1400 },
  { text: "", color: "", delay: 1600 },
  { text: "✓ Starting...", color: "#3fb950", delay: 1800 },
  { text: "✓ Ready in 823ms", color: "#3fb950", delay: 2200 },
  { text: "", color: "", delay: 2400 },
  { text: "  Compiling pages...", color: "#6e7681", delay: 2600 },
  { text: "    ✓ / (LandingPage)", color: "#3fb950", delay: 2900 },
  { text: "    ✓ /about", color: "#3fb950", delay: 3100 },
  { text: "    ✓ /skills", color: "#3fb950", delay: 3300 },
  { text: "    ✓ /projects", color: "#3fb950", delay: 3500 },
  { text: "    ✓ /work", color: "#3fb950", delay: 3700 },
  { text: "    ✓ /contact", color: "#3fb950", delay: 3900 },
  { text: "", color: "", delay: 4100 },
  { text: "✔ All systems go 🚀", color: "#4A90E2", delay: 4300 },
  { text: "", color: "", delay: 4500 },
  { text: "Type 'help' for available commands.", color: "#6e7681", delay: 4700 },
];

const commands: Record<string, { output: string[]; navigate?: string }> = {
  help: {
    output: [
      "Available commands:",
      "",
      "  about        → jump to About section",
      "  skills       → jump to Skills section",
      "  projects     → jump to Projects section",
      "  work         → jump to Work section",
      "  stats        → jump to Stats section",
      "  achievements → jump to Achievements section",
      "  contact      → jump to Contact section",
      "  resume       → open resume (PDF)",
      "  github       → open GitHub profile",
      "  linkedin     → open LinkedIn profile",
      "  clear        → clear terminal",
      "  help         → show this message",
    ],
  },
  about: { output: ["Navigating to About..."], navigate: "#about" },
  skills: { output: ["Navigating to Skills..."], navigate: "#skills" },
  projects: { output: ["Navigating to Projects..."], navigate: "#projects" },
  work: { output: ["Navigating to Work..."], navigate: "#work" },
  stats: { output: ["Navigating to Stats..."], navigate: "#stats" },
  achievements: { output: ["Navigating to Achievements..."], navigate: "#achievements" },
  contact: { output: ["Navigating to Contact..."], navigate: "#contact" },
  resume: { output: ["Opening resume..."], navigate: "/resume.pdf" },
  github: { output: ["Opening GitHub..."], navigate: "https://github.com/Rishabhjain610" },
  linkedin: { output: ["Opening LinkedIn..."], navigate: "https://linkedin.com/in/rishabhjain610" },
};

interface TermLine {
  text: string;
  color: string;
  isInput?: boolean;
}

const LandingPage = () => {
  const [visibleBoot, setVisibleBoot] = useState<number[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [history, setHistory] = useState<TermLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleBoot((prev) => [...prev, i]);
        if (i === bootLines.length - 1) setTimeout(() => setBootDone(true), 300);
      }, line.delay);
    });
  }, []);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [visibleBoot, history]);

  const focusInput = () => inputRef.current?.focus();

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const echo: TermLine = { text: `$ ${raw}`, color: "#6e7681", isInput: true };
    if (cmd === "clear") { setHistory([]); setInput(""); return; }
    const match = commands[cmd];
    if (match) {
      const out: TermLine[] = match.output.map((t) => ({
        text: t,
        color: cmd === "help" ? "#c9d1d9" : "#3fb950",
      }));
      setHistory((prev) => [...prev, echo, ...out]);
      if (match.navigate) {
        setTimeout(() => {
          if (match.navigate!.startsWith("http")) window.open(match.navigate!, "_blank");
          else document.querySelector(match.navigate!)?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        echo,
        { text: `command not found: ${cmd}. Type 'help' for available commands.`, color: "#f85149" },
      ]);
    }
    setInput("");
  };

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 py-36 bg-[#F4F4F4] dark:bg-[#121212] relative overflow-hidden"
    >
      {/* bg glows */}
    
      {/* <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(74,144,226,0.07)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(74,144,226,0.04)" }} /> */}

      {/* ═══ LEFT ═══ */}
      <div className="flex-1 max-w-lg w-full space-y-4 relative z-10 text-center lg:text-left">

        {/* greeting */}
        <div>
          <span
            className="inline-block text-md font-bold px-3 py-1.5 rounded-full font-spaceGrotesk "
            style={{ backgroundColor: "rgba(74,144,226,0.12)", color: "#4A90E2" }}
          >
            👋 Hello, I'm
          </span>
        </div>

        {/* name */}
        <h1 className="text-5xl lg:text-6xl font-bold  text-[#2E2E2E] dark:text-[#E0E0E0]">
          Rishabh{" "}
          <span style={{ color: "#4A90E2", textShadow: "0 0 30px rgba(74,144,226,0.3)" }}>
            Jain
          </span>
        </h1>

        {/* typewriter */}
        <div className="h-8 flex items-center justify-center lg:justify-start">
          <span className="text-2xl md:text-4xl font-semibold font-spaceGrotesk" style={{ color: "#4A90E2" }}>
            <TypeAnimation
              sequence={[
                "Full Stack Developer", 2000,
                "Frontend Developer", 2000,
                "Backend Developer", 2000,
                "Software Engineer", 2000,
              ]}
              speed={50}
              repeat={Infinity}
              cursor
            />
          </span>
        </div>

        {/* thin accent line */}
        <div className="flex justify-center lg:justify-start">
          <div className="h-[2px] w-14 rounded-full" style={{ backgroundColor: "#4A90E2", opacity: 0.45 }} />
        </div>

        {/* bio */}
        <p className="mx-auto lg:mx-0 max-w-md text-[0.95rem] lg:text-lg  font-spaceGrotesk text-[#2E2E2E] dark:text-[#E0E0E0] opacity-80">
          I'm a Tech enthusiast who builds websites and web applications that offer great user experiences. I enjoy writing clean code and solving problems creatively.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white font-spaceGrotesk overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #4A90E2 0%, #357abd 100%)",
              boxShadow: "0 6px 20px rgba(74,144,226,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(74,144,226,0.5)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(74,144,226,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Contact Me
            <IoArrowForward size={15} />
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm font-spaceGrotesk border-2 border-[#4A90E2] text-[#4A90E2] transition-all duration-300"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(74,144,226,0.08)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(74,144,226,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View Projects
          </a>
        </div>

        {/* socials */}
        <div className="flex gap-3 justify-center lg:justify-start pt-1">
          {[
            { icon: IoLogoGithub, href: "https://github.com/Rishabhjain610", label: "GitHub" },
            { icon: IoLogoLinkedin, href: "https://linkedin.com/in/rishabhjain610", label: "LinkedIn" },
            { icon: IoLogoInstagram, href: "https://instagram.com/rishabh_jain610", label: "Instagram" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="p-2.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: "rgba(74,144,226,0.08)", border: "1px solid rgba(74,144,226,0.2)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "rgba(74,144,226,0.18)";
                el.style.borderColor = "#4A90E2";
                el.style.transform = "translateY(-2px) scale(1.1)";
                el.style.boxShadow = "0 6px 16px rgba(74,144,226,0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "rgba(74,144,226,0.08)";
                el.style.borderColor = "rgba(74,144,226,0.2)";
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "none";
              }}
            >
              <s.icon size={18} className="text-[#2E2E2E] dark:text-[#E0E0E0]" />
            </a>
          ))}
        </div>
      </div>

      {/* ═══ RIGHT – TERMINAL ═══ */}
      <div
        className="w-full max-w-xl lg:flex-1 relative z-10 mt-8 lg:mt-0 rounded-2xl overflow-hidden font-mono text-sm select-text"
        style={{
          backgroundColor: "#0d1117",
          border: "1px solid rgba(74,144,226,0.25)",
         
          /* fix: pre-allocate full height so terminal never grows */
          height: "460px",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={focusInput}
      >
        {/* title bar */}
        <div
          className="flex items-center gap-2 px-5 py-3.5 border-b select-none flex-shrink-0"
          style={{ backgroundColor: "#161b22", borderColor: "rgba(74,144,226,0.15)" }}
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="mx-auto text-xs font-spaceGrotesk tracking-wide" style={{ color: "#6e7681" }}>
            rishabh@portfolio ~ zsh
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "#3fb950" }}>
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            live
          </span>
        </div>

        {/* body — flex-1 so it fills the allocated height, never grows parent */}
        <div
          ref={bodyRef}
          className="p-5 space-y-0.5 overflow-y-auto no-scrollbar flex-1"
        >
          {bootLines.map((line, i) =>
            visibleBoot.includes(i) ? (
              <p key={`boot-${i}`} className="text-[13px] leading-relaxed whitespace-pre" style={{ color: line.color || "transparent" }}>
                {line.text || "\u00A0"}
              </p>
            ) : null
          )}
          {history.map((line, i) => (
            <p key={`hist-${i}`} className="text-[13px] leading-relaxed whitespace-pre" style={{ color: line.color }}>
              {line.text || "\u00A0"}
            </p>
          ))}
          {bootDone && (
            <div className="flex items-center gap-2 pt-1">
              <span style={{ color: "#4A90E2" }} className="text-[13px]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") run(input); }}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none caret-[#4A90E2] text-[13px]"
                style={{ color: "#c9d1d9" }}
                placeholder="type a command..."
              />
            </div>
          )}
        </div>

        {/* status bar */}
        <div
          className="flex items-center justify-between px-5 py-2.5 border-t text-[11px] select-none flex-shrink-0"
          style={{ backgroundColor: "#161b22", borderColor: "rgba(74,144,226,0.15)", color: "#6e7681" }}
        >
          <span><span style={{ color: "#3fb950" }}>●</span> interactive</span>
          <span className="font-spaceGrotesk">type <span style={{ color: "#4A90E2" }}>help</span> to get started</span>
          <span>zsh</span>
        </div>

        <style>{`
          .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 flex justify-center" style={{ borderColor: "#4A90E2" }}>
          <span className="w-1 h-3 rounded-full mt-2 animate-bounce" style={{ backgroundColor: "#4A90E2" }} />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
