// src/landing/WorkflowSection.js
import React from "react";
import { WorkflowStep } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function WorkflowSection() {
  const { lang, isDark } = useLangTheme();

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

  return (
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
                "space-y-1.5 " + (isDark ? "text-slate-300" : "text-slate-700")
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
  );
}

export default WorkflowSection;
