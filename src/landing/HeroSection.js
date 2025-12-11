// src/landing/HeroSection.js
import React from "react";
import { IconPhone, IconBolt, IconCheck } from "../icons";
import { IconClock, WorkflowStep } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function HeroSection() {
  const { lang, t, isDark } = useLangTheme();

  const areas =
    lang === "en"
      ? [
          { label: "Admin & paperwork" },
          { label: "Sales & follow-ups" },
          { label: "Ops & scheduling" },
          { label: "IT & tools" },
        ]
      : [
          { label: "Admin & paperasse" },
          { label: "Ventes & suivis" },
          { label: "Opérations & horaire" },
          { label: "TI & outils" },
        ];

  const outcomes =
    lang === "en"
      ? [
          { label: "Hours saved", sub: "Less manual admin" },
          { label: "Fewer mistakes", sub: "Same steps every time" },
          { label: "More visibility", sub: "See what’s stuck" },
        ]
      : [
          { label: "Heures gagnées", sub: "Moins d’admin manuel" },
          { label: "Moins d’erreurs", sub: "Même processus à chaque fois" },
          { label: "Plus de visibilité", sub: "Voir ce qui bloque" },
        ];

  const beforeBullets =
    lang === "en"
      ? [
          "Copy-paste between emails & sheets",
          "Chasing people for updates",
          "Things fall through the cracks",
        ]
      : [
          "Copier-coller entre courriels et fichiers",
          "Relancer constamment pour avoir des nouvelles",
          "Des dossiers se perdent entre deux étapes",
        ];

  const afterBullets =
    lang === "en"
      ? [
          "Info flows automatically",
          "Tasks & reminders created for you",
          "Owner sees a clear view of status",
        ]
      : [
          "L’information circule automatiquement",
          "Tâches et rappels générés pour vous",
          "Le ou la propriétaire voit l’état en un coup d’œil",
        ];

  return (
    <section className="py-16 md:py-20 border-b border-slate-200/70 dark:border-slate-800">
      <div className="grid md:grid-cols-[3fr,2fr] gap-12 items-center">
        {/* Left: core pitch */}
        <div className="space-y-8">
          <div
            className={
              "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[13px] " +
              (isDark
                ? "border-slate-700 bg-slate-900/80 text-sky-200"
                : "border-slate-200 bg-sky-50 text-sky-700")
            }
          >
            <span
              className={
                "w-2 h-2 rounded-full " +
                (isDark ? "bg-emerald-400" : "bg-emerald-500")
              }
            />
            <span>{t.hero_badge}</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1
              className={
                "text-4xl md:text-5xl font-semibold tracking-tight " +
                (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {t.hero_title}
            </h1>
            <p
              className={
                "text-base md:text-xl " +
                (isDark ? "text-slate-200" : "text-slate-700")
              }
            >
              {t.hero_sub}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className={
                "inline-flex items-center gap-3 px-7 py-3 rounded-full font-semibold text-base shadow-sm transition " +
                (isDark
                  ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                  : "bg-sky-600 hover:bg-sky-500 text-white")
              }
            >
              <IconPhone className="h-6 w-6" />
              <span>{t.hero_primary_cta}</span>
            </a>
            <a
              href="#services"
              className={
                "px-7 py-3 rounded-full border text-base transition " +
                (isDark
                  ? "border-slate-700 text-slate-100 hover:border-sky-300 hover:text-sky-100"
                  : "border-slate-300 text-slate-800 hover:border-sky-500 hover:text-sky-700")
              }
            >
              {t.hero_secondary_cta}
            </a>
          </div>

          {/* Areas we help */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {areas.map((a, i) => (
              <div
                key={i}
                className={
                  "flex items-center gap-2 rounded-2xl px-3.5 py-2 text-[13px] " +
                  (isDark
                    ? "bg-slate-900 border border-slate-800 text-slate-200"
                    : "bg-white border border-slate-200 text-slate-700")
                }
              >
                <span
                  className={
                    "inline-block h-2 w-2 rounded-full " +
                    (isDark ? "bg-sky-300" : "bg-sky-600")
                  }
                />
                <span>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: big visual summary / icons */}
        <div
          className={
            "rounded-2xl border p-6 md:p-7 space-y-6 " +
            (isDark
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-200 bg-white")
          }
        >
          {/* headline row */}
          <div className="flex items-center gap-3">
            <div
              className={
                "h-12 w-12 rounded-2xl flex items-center justify-center border " +
                (isDark
                  ? "border-slate-700 bg-slate-950"
                  : "border-slate-300 bg-slate-50")
              }
            >
              <IconBolt
                className={
                  "h-7 w-7 " + (isDark ? "text-sky-300" : "text-sky-600")
                }
              />
            </div>
            <div>
              <p
                className={
                  "text-[11px] uppercase tracking-[0.18em] " +
                  (isDark ? "text-slate-400" : "text-slate-500")
                }
              >
                {lang === "en" ? "In one line" : "En une phrase"}
              </p>
              <p
                className={
                  "text-base md:text-lg font-semibold " +
                  (isDark ? "text-slate-50" : "text-slate-900")
                }
              >
                {lang === "en"
                  ? "Indigo Nord automates the boring steps between your tools."
                  : "Indigo Nord automatise les étapes plates entre vos outils."}
              </p>
            </div>
          </div>

          {/* Before / After */}
          <div className="grid grid-cols-2 gap-3 text-[13px] md:text-sm">
            <div
              className={
                "rounded-xl p-4 flex flex-col gap-3 border " +
                (isDark
                  ? "border-slate-800 bg-slate-950/60"
                  : "border-slate-200 bg-slate-50")
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    "inline-flex items-center justify-center h-8 w-8 rounded-full " +
                    (isDark ? "bg-rose-900/60" : "bg-rose-100")
                  }
                >
                  <IconClock className="h-4 w-4" />
                </span>
                <span
                  className={
                    "font-semibold " +
                    (isDark ? "text-slate-50" : "text-slate-900")
                  }
                >
                  {lang === "en" ? "Before" : "Avant"}
                </span>
              </div>
              <ul
                className={
                  "space-y-1.5 " +
                  (isDark ? "text-slate-300" : "text-slate-700")
                }
              >
                {beforeBullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>

            <div
              className={
                "rounded-xl p-4 flex flex-col gap-3 border " +
                (isDark
                  ? "border-emerald-600/60 bg-emerald-900/20"
                  : "border-emerald-300 bg-emerald-50")
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    "inline-flex items-center justify-center h-8 w-8 rounded-full " +
                    (isDark ? "bg-emerald-800" : "bg-emerald-200")
                  }
                >
                  <IconCheck
                    className={
                      "h-4 w-4 " +
                      (isDark ? "text-emerald-300" : "text-emerald-700")
                    }
                  />
                </span>
                <span
                  className={
                    "font-semibold " +
                    (isDark ? "text-slate-50" : "text-slate-900")
                  }
                >
                  {lang === "en" ? "After" : "Après"}
                </span>
              </div>
              <ul
                className={
                  "space-y-1.5 " +
                  (isDark ? "text-slate-200" : "text-slate-700")
                }
              >
                {afterBullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outcomes icons */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
            {outcomes.map((o, i) => (
              <div key={i} className="pt-3 flex flex-col items-start gap-1">
                <span
                  className={
                    "inline-flex items-center justify-center h-8 w-8 rounded-full " +
                    (isDark ? "bg-slate-900" : "bg-slate-100")
                  }
                >
                  <IconClock className="h-4 w-4" />
                </span>
                <p
                  className={
                    "text-sm font-semibold " +
                    (isDark ? "text-slate-50" : "text-slate-900")
                  }
                >
                  {o.label}
                </p>
                <p
                  className={
                    "text-xs " + (isDark ? "text-slate-400" : "text-slate-600")
                  }
                >
                  {o.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
