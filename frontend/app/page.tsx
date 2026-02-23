import React from "react";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import About from "./components/About";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Work from "./components/Work";
import Stats from "./components/Stats";
import Achievements from "./components/Achievements";
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
