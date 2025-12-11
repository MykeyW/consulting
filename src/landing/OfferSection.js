// src/landing/OfferSection.js
import React from "react";
import { IconPhone } from "../icons";
import { StatCard } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function OfferSection() {
  const { lang, isDark } = useLangTheme();

  const teamTypes =
    lang === "en"
      ? [
          "Clinics & health",
          "Agencies",
          "Trades & field service",
          "Local shops",
        ]
      : [
          "Cliniques & santé",
          "Agences",
          "Métiers & services terrain",
          "Commerces locaux",
        ];

  return (
    <section className="py-10 md:py-12 border-b border-slate-200/70 dark:border-slate-800">
      <div className="grid md:grid-cols-[1.2fr,1.5fr] gap-10 items-center">
        {/* Left: Offer */}
        <div
          className={
            "rounded-2xl border p-6 md:p-7 flex flex-col gap-4 " +
            (isDark
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-200 bg-white")
          }
        >
          <p
            className={
              "text-[12px] uppercase tracking-[0.18em] " +
              (isDark ? "text-slate-400" : "text-slate-500")
            }
          >
            {lang === "en" ? "Start here" : "Par où commencer"}
          </p>
          <h2
            className={
              "text-xl md:text-2xl font-semibold " +
              (isDark ? "text-slate-50" : "text-slate-900")
            }
          >
            {lang === "en"
              ? "Indigo Nord 60-minute Automation Scan"
              : "Diagnostic Indigo Nord – 60 minutes"}
          </h2>
          <p
            className={
              "text-sm md:text-base " +
              (isDark ? "text-slate-200" : "text-slate-700")
            }
          >
            {lang === "en"
              ? "A short, practical session to find 2–3 automations that would actually make a difference this quarter."
              : "Une rencontre courte et concrète pour trouver 2–3 automatisations qui auront un impact réel dès ce trimestre."}
          </p>
          <ul
            className={
              "space-y-1.5 text-sm " +
              (isDark ? "text-slate-200" : "text-slate-700")
            }
          >
            <li>
              •{" "}
              {lang === "en"
                ? "Map one painful workflow end-to-end"
                : "Cartographier un flux de travail pénible de A à Z"}
            </li>
            <li>
              •{" "}
              {lang === "en"
                ? "Identify the best 2–3 automations to start with"
                : "Identifier les 2–3 automatisations prioritaires"}
            </li>
            <li>
              •{" "}
              {lang === "en"
                ? "Rough estimate of time saved & effort to build"
                : "Estimation du temps gagné et de l’effort nécessaire"}
            </li>
          </ul>
          <a
            href="#contact"
            className={
              "mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm md:text-base shadow-sm transition " +
              (isDark
                ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                : "bg-sky-600 hover:bg-sky-500 text-white")
            }
          >
            <IconPhone className="h-5 w-5" />
            <span>
              {lang === "en" ? "Book your scan" : "Planifier votre diagnostic"}
            </span>
          </a>
          <p
            className={
              "text-[11px] mt-1 " +
              (isDark ? "text-slate-500" : "text-slate-500")
            }
          >
            {lang === "en"
              ? "No commitment. You can take the plan and DIY, or ask us to build it."
              : "Sans engagement. Vous pouvez réaliser le plan à l’interne ou nous confier la mise en place."}
          </p>
        </div>

        {/* Right: Social proof / teams / simple stats */}
        <div className="space-y-5">
          <div className="space-y-2">
            <p
              className={
                "text-[12px] uppercase tracking-[0.18em] " +
                (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {lang === "en" ? "Teams we help" : "Les équipes que nous aidons"}
            </p>
            <div className="flex flex-wrap gap-2">
              {teamTypes.map((label, i) => (
                <span
                  key={i}
                  className={
                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] " +
                    (isDark
                      ? "bg-slate-900 border border-slate-800 text-slate-200"
                      : "bg-white border border-slate-200 text-slate-700")
                  }
                >
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (isDark ? "bg-sky-300" : "bg-sky-600")
                    }
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-[13px]">
            <StatCard
              title={
                lang === "en" ? "Goal: 5–10h/week" : "Objectif : 5–10 h/sem."
              }
              body={
                lang === "en"
                  ? "Typical target for owners and managers."
                  : "Cible typique pour dirigeants et gestionnaires."
              }
              isDark={isDark}
            />
            <StatCard
              title={
                lang === "en" ? "Start small" : "Commencer par un petit projet"
              }
              body={
                lang === "en"
                  ? "We usually begin with a single pilot workflow."
                  : "On commence généralement avec un seul flux pilote."
              }
              isDark={isDark}
            />
            <StatCard
              title={lang === "en" ? "Keep control" : "Vous gardez le contrôle"}
              body={
                lang === "en"
                  ? "Clear docs so you’re not locked into us."
                  : "Documentation claire pour éviter la dépendance."
              }
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferSection;
