// src/landing/ProcessSection.js
import React from "react";
import { StepCard } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function ProcessSection() {
  const { lang, t, isDark } = useLangTheme();

  const steps =
    lang === "en"
      ? [
          { title: "Talk", desc: "Show us where time is wasted." },
          { title: "Pilot", desc: "We automate one clear workflow." },
          { title: "Scale", desc: "If it works, we add more." },
        ]
      : [
          { title: "Discuter", desc: "On regarde où le temps se perd." },
          { title: "Pilote", desc: "On automatise un flux précis." },
          { title: "Étendre", desc: "Si ça fonctionne, on en ajoute." },
        ];

  return (
    <section
      id="process"
      className="py-16 md:py-20 border-b border-slate-200/70 dark:border-slate-800"
    >
      <div className="mb-8 max-w-3xl flex flex-col gap-3">
        <p
          className={
            "text-[12px] uppercase tracking-[0.16em] " +
            (isDark ? "text-slate-400" : "text-slate-500")
          }
        >
          {t.nav_process}
        </p>
        <h2
          className={
            "text-3xl md:text-4xl font-semibold " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {t.section_process_title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <StepCard
            key={i}
            step={i + 1}
            title={s.title}
            desc={s.desc}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;
