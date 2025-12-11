// src/landing/AboutSection.js
import React from "react";
import { IconUsers } from "../icons";
import { useLangTheme } from "./LangThemeProvider";

export default function AboutSection() {
  const { t, isDark } = useLangTheme();

  return (
    <section
      id="about"
      className="py-16 md:py-20 border-slate-200/70 border-b dark:border-slate-800"
    >
      <div
        className={
          "rounded-2xl border p-8 md:p-9 flex flex-col md:flex-row gap-8 " +
          (isDark
            ? "border-slate-800 bg-slate-900/80"
            : "border-slate-200 bg-white")
        }
      >
        <div className="md:w-1/4 flex items-start justify-center md:justify-start">
          <div
            className={
              "h-20 w-20 rounded-2xl flex items-center justify-center border " +
              (isDark
                ? "bg-slate-950 border-slate-700"
                : "bg-slate-100 border-slate-300")
            }
          >
            <IconUsers
              className={
                "h-10 w-10 " + (isDark ? "text-sky-300" : "text-sky-600")
              }
            />
          </div>
        </div>

        <div className="md:w-3/4 space-y-3 text-base md:text-xl max-w-3xl">
          <p
            className={
              "text-[12px] uppercase tracking-[0.16em] " +
              (isDark ? "text-slate-400" : "text-slate-500")
            }
          >
            {t.nav_about}
          </p>

          <h2
            className={
              "text-2xl md:text-3xl font-semibold " +
              (isDark ? "text-slate-50" : "text-slate-900")
            }
          >
            {t.section_about_title}
          </h2>

          <p className={isDark ? "text-slate-200" : "text-slate-700"}>
            {t.about_text}
          </p>
        </div>
      </div>
    </section>
  );
}
