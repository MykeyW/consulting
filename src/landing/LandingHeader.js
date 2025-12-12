// src/landing/LandingHeader.js
import React from "react";
import { Link } from "react-router-dom";
import { IconPhone } from "../icons";
import { useLangTheme } from "./LangThemeProvider";
import indigoLogo from "../assets/inlogo.png"; // <-- your logo file

function LandingHeader() {
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
    <header
      className={
        "sticky top-0 z-30 backdrop-blur border-b " +
        (isDark
          ? "bg-slate-950/95 border-slate-800"
          : "bg-white/90 border-slate-200")
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 flex-shrink-0">
            <img
              src={indigoLogo}
              alt="Indigo Nord logo"
              className={
                "h-11 w-11 rounded-full object-cover shadow-sm border " +
                (isDark ? "border-slate-700" : "border-slate-300")
              }
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={
                "font-semibold tracking-tight text-lg " +
                (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {/* Hard-code brand so it’s always Indigo Nord */}
              Indigo Nord
            </span>
            <span
              className={
                "text-[12px] " + (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav
          className={
            "hidden xl:flex items-center justify-center gap-7 text-[13px] font-medium flex-1 px-6 " +
            (isDark ? "text-slate-200" : "text-slate-700")
          }
        >
          <Link
            to="/booking"
            className="hover:text-sky-500 transition-colors whitespace-nowrap"
          >
            {lang === "en" ? "Booking demo" : "Démo rendez-vous"}
          </Link>
          <Link
            to="/quotes"
            className="hover:text-sky-500 transition-colors whitespace-nowrap"
          >
            {lang === "en" ? "Quote demo" : "Démo soumissions"}
          </Link>
          {/* NEW: Job report demo link */}
          <Link
            to="/job-reports"
            className="hover:text-sky-500 transition-colors whitespace-nowrap"
          >
            {lang === "en" ? "Job report demo" : "Démo rapport avant/après"}
          </Link>
          <Link
            to="/smart-number"
            className="hover:text-sky-500 transition-colors whitespace-nowrap"
          >
            {lang === "en" ? "Smart number demo" : "Démo numéro intelligent"}
          </Link>
          <a
            href="#contact"
            className={
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-sm transition whitespace-nowrap " +
              (isDark
                ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                : "bg-sky-600 hover:bg-sky-500 text-white")
            }
          >
            <IconPhone className="h-5 w-5" />
            <span>{t.nav_contact}</span>
          </a>

          {/* Language toggle – desktop */}
          <div
            className={
              "flex items-center gap-1 ml-2 text-[11px] rounded-full px-1 py-0.5 border whitespace-nowrap " +
              (isDark
                ? "border-slate-700 bg-slate-900/90"
                : "border-slate-300 bg-slate-100")
            }
          >
            <button
              onClick={() => setLang("en")}
              className={
                "px-2 py-0.5 rounded-full transition " +
                (lang === "en"
                  ? isDark
                    ? "bg-sky-500 text-slate-950"
                    : "bg-sky-600 text-white"
                  : isDark
                  ? "text-slate-300 hover:text-sky-200"
                  : "text-slate-600 hover:text-sky-600")
              }
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={
                "px-2 py-0.5 rounded-full transition " +
                (lang === "fr"
                  ? isDark
                    ? "bg-sky-500 text-slate-950"
                    : "bg-sky-600 text-white"
                  : isDark
                  ? "text-slate-300 hover:text-sky-200"
                  : "text-slate-600 hover:text-sky-600")
              }
            >
              FR
            </button>
          </div>
        </nav>

        {/* Desktop: theme toggle */}
        <div className="hidden xl:flex items-center gap-2 ml-auto">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={
              "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] transition-colors " +
              (isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-400"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500")
            }
          >
            <span>{isDark ? "☀️" : "🌙"}</span>
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>

        {/* Mobile / tablet */}
        <div className="relative flex items-center gap-2 ml-auto xl:hidden">
          <button
            className={
              "inline-flex items-center justify-center rounded-full p-2 border " +
              (isDark
                ? "border-slate-700 text-slate-100"
                : "border-slate-300 text-slate-700")
            }
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <span className="text-xl leading-none">&times;</span>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {mobileOpen && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[300px]">
              <div
                className={
                  "rounded-2xl border shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] " +
                  (isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200")
                }
              >
                <nav className="px-4 py-4 flex flex-col gap-2 text-sm">
                  <Link
                    to="/booking"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 border-b border-slate-200/40 dark:border-slate-800/60"
                  >
                    {lang === "en" ? "Booking demo" : "Démo rendez-vous"}
                  </Link>
                  <Link
                    to="/quotes"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 border-b border-slate-200/40 dark:border-slate-800/60 hover:text-sky-500 transition-colors whitespace-nowrap"
                  >
                    {lang === "en" ? "Quote demo" : "Démo soumissions"}
                  </Link>
                  {/* NEW: Job report demo – mobile */}
                  <Link
                    to="/job-reports"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 border-b border-slate-200/40 dark:border-slate-800/60 hover:text-sky-500 transition-colors whitespace-nowrap"
                  >
                    {lang === "en"
                      ? "Job report demo"
                      : "Démo rapport avant/après"}
                  </Link>
                  <Link
                    to="/smart-number"
                    className="hover:text-sky-500 transition-colors whitespace-nowrap"
                  >
                    {lang === "en"
                      ? "Smart number demo"
                      : "Démo numéro intelligent"}
                  </Link>
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className={
                      "mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm " +
                      (isDark
                        ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                        : "bg-sky-600 hover:bg-sky-500 text-white")
                    }
                  >
                    <IconPhone className="h-5 w-5" />
                    <span>{t.nav_contact}</span>
                  </a>

                  {/* Language toggle – mobile */}
                  <div
                    className={
                      "mt-4 inline-flex self-start items-center gap-1 text-[11px] rounded-full px-1 py-0.5 border " +
                      (isDark
                        ? "border-slate-700 bg-slate-900/90"
                        : "border-slate-300 bg-slate-100")
                    }
                  >
                    <button
                      onClick={() => setLang("en")}
                      className={
                        "px-2 py-0.5 rounded-full transition " +
                        (lang === "en"
                          ? isDark
                            ? "bg-sky-500 text-slate-950"
                            : "bg-sky-600 text-white"
                          : isDark
                          ? "text-slate-300 hover:text-sky-200"
                          : "text-slate-600 hover:text-sky-600")
                      }
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLang("fr")}
                      className={
                        "px-2 py-0.5 rounded-full transition " +
                        (lang === "fr"
                          ? isDark
                            ? "bg-sky-500 text-slate-950"
                            : "bg-sky-600 text-white"
                          : isDark
                          ? "text-slate-300 hover:text-sky-200"
                          : "text-slate-600 hover:text-sky-600")
                      }
                    >
                      FR
                    </button>
                  </div>

                  {/* Theme toggle – mobile */}
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className={
                      "mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] transition-colors " +
                      (isDark
                        ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-400"
                        : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500")
                    }
                  >
                    <span>{isDark ? "☀️" : "🌙"}</span>
                    <span>{isDark ? "Light mode" : "Dark mode"}</span>
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default LandingHeader;
