// src/landing/ResultsSection.js
import React from "react";
import { IconCheck, IconMap, IconBolt } from "../icons";
import { ResultCard } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function ResultsSection() {
  const { lang, t, isDark } = useLangTheme();

  return (
    <section className="py-16 md:py-20 border-b border-slate-200/70 dark:border-slate-800">
      <div className="mb-8 max-w-3xl flex flex-col gap-3">
        <p
          className={
            "text-[12px] uppercase tracking-[0.16em] " +
            (isDark ? "text-slate-400" : "text-slate-500")
          }
        >
          {lang === "en" ? "Outcomes" : "Résultats"}
        </p>
        <h3
          className={
            "text-2xl md:text-3xl font-semibold " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {t.results_title}
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-base">
        <ResultCard
          title={t.results_1_title}
          text={t.results_1_text}
          Icon={IconCheck}
          isDark={isDark}
        />
        <ResultCard
          title={t.results_2_title}
          text={t.results_2_text}
          Icon={IconMap}
          isDark={isDark}
        />
        <ResultCard
          title={t.results_3_title}
          text={t.results_3_text}
          Icon={IconBolt}
          isDark={isDark}
        />
      </div>
    </section>
  );
}

export default ResultsSection;
