import React from "react";
import dynamic from "next/dynamic";
import LandingPage from "./components/LandingPage";

// Lazy load below-fold sections for better initial page load
const Contact = dynamic(() => import("./components/Contact"));
const About = dynamic(() => import("./components/About"));
const Skills = dynamic(() => import("./components/Skills"));
const Project = dynamic(() => import("./components/Project"));
const Work = dynamic(() => import("./components/Work"));
const Stats = dynamic(() => import("./components/Stats"));
const Achievements = dynamic(() => import("./components/Achievements"));
const page = () => {
  return (
    <div>
      <div id="home" className="min-h-screen w-full">
        <LandingPage />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Project />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="achievements">
        <Achievements />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default page;
