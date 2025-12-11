// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { translations } from "./translations";
import {
  IconPhone,
  IconCheck,
  IconMap,
  IconUsers,
  IconBolt,
  IconArrows,
  IconCog,
  IconEnvelope,
} from "./icons";
import BookingDemo from "./BookingDemo"; // ⬅️ new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<BookingDemo />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const [lang, setLang] = React.useState("en");
  const [theme, setTheme] = React.useState("light"); // default light
  const t = translations[lang];
  const isDark = theme === "dark";

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // quick, visual “areas we touch”
  const areas =
    lang === "en"
      ? [
          { label: "Admin & paperwork", Icon: IconCog },
          { label: "Sales & follow-ups", Icon: IconArrows },
          { label: "Ops & scheduling", Icon: IconMap },
          { label: "IT & tools", Icon: IconBolt },
        ]
      : [
          { label: "Admin & paperasse", Icon: IconCog },
          { label: "Ventes & suivis", Icon: IconArrows },
          { label: "Opérations & horaire", Icon: IconMap },
          { label: "TI & outils", Icon: IconBolt },
        ];

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

  // Social proof / “teams we help” pills
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

  // Example workflow steps for the visual panel
  const workflowSteps =
    lang === "en"
      ? [
          { label: "New inquiry form", sub: "Website or email" },
          { label: "CRM updated", sub: "Contact + deal created" },
          { label: "Tasks & reminders", sub: "Owner / team assigned" },
          { label: "Invoice & follow-up", sub: "Client gets next step" },
        ]
      : [
          { label: "Nouveau formulaire", sub: "Site web ou courriel" },
          { label: "CRM mis à jour", sub: "Contact + opportunité" },
          { label: "Tâches & rappels", sub: "Assignées à l’équipe" },
          { label: "Facture & suivi", sub: "Client sait quoi faire" },
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
    <div
      className={
        "min-h-screen text-base md:text-xl leading-relaxed " +
        (isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900")
      }
    >
      {/* NAV */}
      <header
        className={
          "sticky top-0 z-30 backdrop-blur border-b " +
          (isDark
            ? "bg-slate-950/95 border-slate-800"
            : "bg-white/90 border-slate-200")
        }
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={
                "h-12 w-12 rounded-xl flex items-center justify-center text-base font-semibold " +
                (isDark
                  ? "bg-slate-900 border border-slate-700 text-sky-300"
                  : "bg-slate-100 border border-slate-300 text-sky-700")
              }
            >
              IN
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={
                  "font-semibold tracking-tight text-xl " +
                  (isDark ? "text-slate-50" : "text-slate-900")
                }
              >
                {t.brand}
              </span>
              <span
                className={
                  "text-[13px] " +
                  (isDark ? "text-slate-400" : "text-slate-500")
                }
              >
                {t.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav
              className={
                "hidden md:flex items-center gap-7 text-sm font-medium " +
                (isDark ? "text-slate-200" : "text-slate-700")
              }
            >
              <a
                href="#services"
                className="hover:text-sky-500 transition-colors"
              >
                {t.nav_services}
              </a>
              <a
                href="#process"
                className="hover:text-sky-500 transition-colors"
              >
                {t.nav_process}
              </a>
              <a href="#about" className="hover:text-sky-500 transition-colors">
                {t.nav_about}
              </a>

              {/* NEW – link to booking demo */}
              <Link
                to="/booking"
                className="hover:text-sky-500 transition-colors"
              >
                {lang === "en" ? "Booking demo" : "Démo rendez-vous"}
              </Link>

              <a
                href="#contact"
                className={
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-sm transition " +
                  (isDark
                    ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                    : "bg-sky-600 hover:bg-sky-500 text-white")
                }
              >
                <IconPhone className="h-5 w-5" />
                <span>{t.nav_contact}</span>
              </a>

              {/* Language toggle */}
              <div
                className={
                  "flex items-center gap-1 ml-3 text-[11px] rounded-full px-1 py-0.5 border " +
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

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* HERO */}
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

              {/* Areas we help – icon chips */}
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
                    <a.Icon
                      className={
                        "h-5 w-5 " + (isDark ? "text-sky-300" : "text-sky-600")
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

              {/* Before / After with big icons */}
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
                      <IconEnvelope className="h-4 w-4 text-rose-400" />
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
                      {i === 0 && (
                        <IconClock isDark={isDark} className="h-4 w-4" />
                      )}
                      {i === 1 && (
                        <IconCheck
                          className={
                            "h-4 w-4 " +
                            (isDark ? "text-emerald-300" : "text-emerald-600")
                          }
                        />
                      )}
                      {i === 2 && (
                        <IconMap
                          className={
                            "h-4 w-4 " +
                            (isDark ? "text-sky-300" : "text-sky-600")
                          }
                        />
                      )}
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
                        "text-xs " +
                        (isDark ? "text-slate-400" : "text-slate-600")
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

        {/* SOCIAL PROOF + FLAGSHIP OFFER BAND */}
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
                  {lang === "en"
                    ? "Book your scan"
                    : "Planifier votre diagnostic"}
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
                  {lang === "en"
                    ? "Teams we help"
                    : "Les équipes que nous aidons"}
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
                    lang === "en"
                      ? "Goal: 5–10h/week"
                      : "Objectif : 5–10 h/sem."
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
                    lang === "en"
                      ? "Start small"
                      : "Commencer par un petit projet"
                  }
                  body={
                    lang === "en"
                      ? "We usually begin with a single pilot workflow."
                      : "On commence généralement avec un seul flux pilote."
                  }
                  isDark={isDark}
                />
                <StatCard
                  title={
                    lang === "en" ? "Keep control" : "Vous gardez le contrôle"
                  }
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

        {/* WHAT WE AUTOMATE */}
        <section
          id="services"
          className="py-16 md:py-20 border-b border-slate-200/70 dark:border-slate-800"
        >
          <div className="mb-8 max-w-3xl flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <IconCog
                className={
                  "h-8 w-8 " + (isDark ? "text-sky-300" : "text-sky-600")
                }
              />
              <h2
                className={
                  "text-3xl md:text-4xl font-semibold " +
                  (isDark ? "text-slate-50" : "text-slate-900")
                }
              >
                {t.section_services_title}
              </h2>
            </div>
            <p
              className={
                "text-base md:text-xl " +
                (isDark ? "text-slate-200" : "text-slate-700")
              }
            >
              {t.section_services_sub}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              title={t.service_1_title}
              text={t.service_1_text}
              Icon={IconCheck}
              isDark={isDark}
            />
            <ServiceCard
              title={t.service_2_title}
              text={t.service_2_text}
              Icon={IconArrows}
              isDark={isDark}
            />
            <ServiceCard
              title={t.service_3_title}
              text={t.service_3_text}
              Icon={IconMap}
              isDark={isDark}
            />
          </div>
        </section>

        {/* EXAMPLE WORKFLOW VISUAL */}
        <section className="py-14 md:py-18 border-b border-slate-200/70 dark:border-slate-800">
          <div className="mb-6 max-w-3xl flex flex-col gap-2">
            <p
              className={
                "text-[12px] uppercase tracking-[0.16em] " +
                (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {lang === "en"
                ? "What an automation looks like"
                : "À quoi ressemble une automatisation"}
            </p>
            <h2
              className={
                "text-2xl md:text-3xl font-semibold " +
                (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {lang === "en"
                ? "From new inquiry to invoice — without copy-paste."
                : "De la demande au paiement — sans copier-coller."}
            </h2>
          </div>

          <div
            className={
              "rounded-2xl border p-6 md:p-7 " +
              (isDark
                ? "border-slate-800 bg-slate-900/80"
                : "border-slate-200 bg-white")
            }
          >
            <div className="grid md:grid-cols-[1.6fr,1fr] gap-8 items-center">
              {/* Flow */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  {workflowSteps.map((step, i) => (
                    <React.Fragment key={i}>
                      <WorkflowStep
                        index={i}
                        total={workflowSteps.length}
                        label={step.label}
                        sub={step.sub}
                        isDark={isDark}
                      />
                      {i < workflowSteps.length - 1 && (
                        <div
                          className={
                            "flex-1 mx-1 h-[1px] " +
                            (isDark ? "bg-slate-700" : "bg-slate-300")
                          }
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p
                  className={
                    "text-[13px] md:text-sm " +
                    (isDark ? "text-slate-300" : "text-slate-700")
                  }
                >
                  {lang === "en"
                    ? "We hook into the tools you already use (email, CRM, billing) and make the handoffs automatic instead of manual."
                    : "On se branche sur les outils que vous utilisez déjà (courriel, CRM, facturation) pour automatiser les passages d’une étape à l’autre."}
                </p>
              </div>

              {/* Right: quick bullets */}
              <div className="space-y-3 text-[13px] md:text-sm">
                <h3
                  className={
                    "font-semibold text-base md:text-lg " +
                    (isDark ? "text-slate-50" : "text-slate-900")
                  }
                >
                  {lang === "en"
                    ? "You still see everything — you just don’t have to push it."
                    : "Vous gardez la visibilité — sans devoir tout pousser vous-même."}
                </h3>
                <ul
                  className={
                    "space-y-1.5 " +
                    (isDark ? "text-slate-300" : "text-slate-700")
                  }
                >
                  <li>
                    •{" "}
                    {lang === "en"
                      ? "No hunting through inboxes to know what’s next."
                      : "Plus besoin de fouiller les courriels pour savoir la prochaine étape."}
                  </li>
                  <li>
                    •{" "}
                    {lang === "en"
                      ? "Tasks and reminders created automatically."
                      : "Tâches et rappels générés automatiquement."}
                  </li>
                  <li>
                    •{" "}
                    {lang === "en"
                      ? "Clear timeline of where each client stands."
                      : "Chronologie claire de l’avancement de chaque client."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
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

        {/* RESULTS */}
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

        {/* ABOUT */}
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

        {/* CONTACT */}
        <section id="contact" className="py-18 md:py-24">
          <div className="max-w-xl mx-auto text-center mb-8">
            <p
              className={
                "text-[12px] uppercase tracking-[0.16em] mb-2 " +
                (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {lang === "en" ? "Next step" : "Prochaine étape"}
            </p>
            <h2
              className={
                "text-2xl md:text-3xl font-semibold mb-3 flex items-center justify-center gap-2 " +
                (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              <IconEnvelope
                className={
                  isDark ? "h-7 w-7 text-sky-300" : "h-7 w-7 text-sky-600"
                }
              />
              <span>{t.section_contact_title}</span>
            </h2>
            <p
              className={
                "text-base md:text-xl " +
                (isDark ? "text-slate-200" : "text-slate-700")
              }
            >
              {t.contact_text}
            </p>
          </div>

          <div
            className={
              "rounded-2xl max-w-xl mx-auto p-7 md:p-8 border " +
              (isDark
                ? "bg-slate-900/80 border-slate-800"
                : "bg-white border-slate-200")
            }
          >
            <form className="space-y-4 text-base md:text-lg">
              <FormField
                label={t.contact_label_name}
                isDark={isDark}
                type="text"
              />
              <FormField
                label={t.contact_label_email}
                isDark={isDark}
                type="email"
              />
              <FormField
                label={t.contact_label_company}
                isDark={isDark}
                type="text"
              />
              <div className="flex flex-col gap-1.5 text-left">
                <label className={isDark ? "text-slate-100" : "text-slate-800"}>
                  {t.contact_label_message}
                </label>
                <textarea
                  rows={3}
                  placeholder={t.contact_placeholder_message}
                  className={
                    "rounded-xl border px-3.5 py-2.5 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                    (isDark
                      ? "bg-slate-950 border-slate-700 text-slate-100"
                      : "bg-slate-50 border-slate-300 text-slate-900")
                  }
                />
              </div>
              <button
                type="button"
                className={
                  "w-full px-6 py-3 rounded-full font-semibold text-base md:text-lg shadow-sm transition inline-flex items-center justify-center gap-2 " +
                  (isDark
                    ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                    : "bg-sky-600 hover:bg-sky-500 text-white")
                }
              >
                <IconEnvelope className="h-5 w-5" />
                <span>{t.contact_cta}</span>
              </button>
              <p
                className={
                  "text-[11px] md:text-xs text-center mt-1 " +
                  (isDark ? "text-slate-500" : "text-slate-500")
                }
              >
                {lang === "en"
                  ? "This form is a visual placeholder. We can later connect it to email or a backend endpoint."
                  : "Ce formulaire est un exemple visuel. On pourra plus tard le connecter à un courriel ou à une API."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer
        className={
          "border-t py-5 text-[11px] md:text-xs " +
          (isDark
            ? "border-slate-800 text-slate-500"
            : "border-slate-200 text-slate-500")
        }
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {t.brand}. {t.footer_rights}
          </span>
          <span>{t.footer_location}</span>
        </div>
      </footer>
    </div>
  );
}

/* Presentational components (unchanged) */

function ServiceCard({ title, text, Icon, isDark }) {
  return (
    <div
      className={
        "rounded-2xl border p-6 flex flex-col gap-3 " +
        (isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white")
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={
            "font-semibold text-lg md:text-xl " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {title}
        </h3>
        <div
          className={
            "h-10 w-10 rounded-full flex items-center justify-center border " +
            (isDark ? "border-slate-700" : "border-slate-300")
          }
        >
          <Icon
            className={"h-6 w-6 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
        </div>
      </div>
      <p
        className={isDark ? "text-slate-300 text-sm" : "text-slate-700 text-sm"}
      >
        {text}
      </p>
    </div>
  );
}

function ResultCard({ title, text, Icon, isDark }) {
  return (
    <div
      className={
        "rounded-2xl border p-6 " +
        (isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white")
      }
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={
            "h-9 w-9 rounded-full flex items-center justify-center border " +
            (isDark
              ? "bg-slate-950 border-slate-700"
              : "bg-slate-100 border-slate-300")
          }
        >
          <Icon
            className={"h-5 w-5 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
        </div>
        <p
          className={
            "font-semibold text-base md:text-lg " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {title}
        </p>
      </div>
      <p
        className={isDark ? "text-slate-300 text-sm" : "text-slate-700 text-sm"}
      >
        {text}
      </p>
    </div>
  );
}

function StepCard({ step, title, desc, isDark }) {
  // pick an icon per step
  const StepIcon = step === 1 ? IconPhone : step === 2 ? IconCog : IconBolt;

  return (
    <div
      className={
        "rounded-2xl border p-6 flex flex-col gap-4 " +
        (isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white")
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            "h-10 w-10 rounded-full flex items-center justify-center border text-sm font-semibold " +
            (isDark
              ? "border-slate-700 text-sky-300"
              : "border-slate-300 text-sky-700")
          }
        >
          {step}
        </div>
        <div className="flex items-center gap-2">
          <StepIcon
            className={"h-6 w-6 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
          <h3
            className={
              "font-semibold text-lg " +
              (isDark ? "text-slate-50" : "text-slate-900")
            }
          >
            {title}
          </h3>
        </div>
      </div>
      <p
        className={isDark ? "text-slate-300 text-sm" : "text-slate-700 text-sm"}
      >
        {desc}
      </p>
    </div>
  );
}

function IconClock({ className, isDark }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  );
}

function FormField({ label, type, isDark }) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label className={isDark ? "text-slate-100" : "text-slate-800"}>
        {label}
      </label>
      <input
        type={type}
        className={
          "rounded-xl border px-3.5 py-2.5 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 " +
          (isDark
            ? "bg-slate-950 border-slate-700 text-slate-100"
            : "bg-slate-50 border-slate-300 text-slate-900")
        }
      />
    </div>
  );
}

function StatCard({ title, body, isDark }) {
  return (
    <div
      className={
        "rounded-xl border p-3 " +
        (isDark
          ? "border-slate-800 bg-slate-950/60 text-slate-200"
          : "border-slate-200 bg-white text-slate-700")
      }
    >
      <p
        className={
          "font-semibold text-[13px] mb-1 " +
          (isDark ? "text-slate-50" : "text-slate-900")
        }
      >
        {title}
      </p>
      <p className="text-[12px] leading-snug">{body}</p>
    </div>
  );
}

function WorkflowStep({ index, total, label, sub, isDark }) {
  // Choose icon by index for variety
  const icons = [IconEnvelope, IconMap, IconCog, IconCheck];
  const StepIcon = icons[index % icons.length];

  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px]">
      <div
        className={
          "h-10 w-10 rounded-full flex items-center justify-center border " +
          (isDark
            ? "border-slate-700 bg-slate-950"
            : "border-slate-300 bg-slate-50")
        }
      >
        <StepIcon
          className={"h-5 w-5 " + (isDark ? "text-sky-300" : "text-sky-600")}
        />
      </div>
      <div className="text-center">
        <p
          className={
            "text-[12px] font-semibold " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {label}
        </p>
        <p
          className={
            "text-[11px] " + (isDark ? "text-slate-400" : "text-slate-600")
          }
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

export default App;
