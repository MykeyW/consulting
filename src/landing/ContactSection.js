// src/landing/ContactSection.js
import React from "react";
import { IconEnvelope } from "../icons";
import { FormField } from "./components";
import { useLangTheme } from "./LangThemeProvider";

function ContactSection() {
  const { lang, t, isDark } = useLangTheme();

  return (
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
            className={isDark ? "h-7 w-7 text-sky-300" : "h-7 w-7 text-sky-600"}
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
          <FormField label={t.contact_label_name} type="text" />
          <FormField label={t.contact_label_email} type="email" />
          <FormField label={t.contact_label_company} type="text" />

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
  );
}

export default ContactSection;
