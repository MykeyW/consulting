// src/landing/LandingPage.js
import React from "react";
import { useLangTheme } from "./LangThemeProvider";

import LandingHeader from "./LandingHeader";
import HeroSection from "./HeroSection";
import OfferSection from "./OfferSection";
import ServicesSection from "./ServicesSection";
import WorkflowSection from "./WorkflowSection";
import ProcessSection from "./ProcessSection";
import ResultsSection from "./ResultsSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import LandingFooter from "./LandingFooter";

export default function LandingPage() {
  const {
    lang,
    setLang,
    theme,
    setTheme,
    isDark,
    t,
    mobileOpen,
    setMobileOpen,
  } = useLangTheme();

  return (
    <div
      className={
        "min-h-screen text-base md:text-xl leading-relaxed " +
        (isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900")
      }
    >
      <div className="absolute right-0 top-full w-full h-px bg-black/5 dark:bg-white/5" />

      <LandingHeader />

      <main className="max-w-6xl mx-auto px-6">
        <HeroSection />
        <OfferSection />
        <ServicesSection />
        <WorkflowSection />
        <ProcessSection />
        <ResultsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <LandingFooter />
    </div>
  );
}
