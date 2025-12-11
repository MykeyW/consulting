// src/DailyEmailDemo.js
import React from "react";

const slotTimes = ["09:00", "10:00", "13:00", "14:00", "15:30"];

const demoBookings = [
  {
    time: "09:00",
    name: "Julie Tremblay",
    email: "julie.tremblay@example.com",
    noteEn: "Website revamp – discovery call",
    noteFr: "Refonte du site – appel découverte",
  },
  {
    time: "13:00",
    name: "Boulangerie Gourmandise Épic",
    email: "info@gourmandise-epic.ca",
    noteEn: "Automation demo – online orders",
    noteFr: "Démo d’automatisation – commandes en ligne",
  },
  {
    time: "14:00",
    name: "Clinique du Centre",
    email: "admin@cliniquecentre.ca",
    noteEn: "Calendar / forms integration",
    noteFr: "Intégration calendrier / formulaires",
  },
];

export default function DailyEmailDemo({ lang = "en", palette }) {
  const t = {
    en: {
      title: "Daily booking summary",
      subtitle:
        "Here’s a sample of the email your business could receive every morning.",
      sentTo: "To:",
      subject: "Subject:",
      subjectLine: "Today’s bookings and remaining slots",
      introLine:
        "Good morning! Here’s a snapshot of today’s schedule for Indigo Nord’s booking system.",
      todayLabel: "Today",
      totalBookings: "Bookings",
      remainingSlots: "Remaining slots",
      tableTime: "Time",
      tableName: "Name",
      tableEmail: "Email",
      tableNote: "Details",
      noNotes: "–",
      availableSlotsTitle: "Available slots",
      footerLine:
        "In a real system, this email would be generated automatically every morning based on your live calendar.",
    },
    fr: {
      title: "Résumé quotidien des réservations",
      subtitle:
        "Voici un exemple de courriel que votre entreprise pourrait recevoir chaque matin.",
      sentTo: "À :",
      subject: "Objet :",
      subjectLine: "Rendez-vous du jour et plages restantes",
      introLine:
        "Bonjour! Voici un aperçu de l’horaire d’aujourd’hui dans le système de réservation Indigo Nord.",
      todayLabel: "Aujourd’hui",
      totalBookings: "Rendez-vous",
      remainingSlots: "Plages restantes",
      tableTime: "Heure",
      tableName: "Nom",
      tableEmail: "Courriel",
      tableNote: "Détails",
      noNotes: "–",
      availableSlotsTitle: "Plages encore disponibles",
      footerLine:
        "Dans un vrai système, ce courriel serait généré automatiquement chaque matin à partir de votre calendrier réel.",
    },
  }[lang || "en"];

  const bookedTimes = demoBookings.map((b) => b.time);
  const remaining = slotTimes.filter((t) => !bookedTimes.includes(t));

  // If the theme is dark (indigo/dairy/etc.) we keep the outer panel from palette,
  // and show a white "email card" inside to mimic a real inbox/email.
  const panelBg = palette?.panelBg ?? "bg-white text-slate-900";

  return (
    <div
      className={
        "rounded-3xl p-4 md:p-6 lg:p-8 min-h-[540px] md:min-h-[620px] " +
        panelBg
      }
    >
      <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Fake email header bar */}
        <div className="px-4 md:px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
              {t.title}
            </span>
            <span className="text-sm text-slate-600">{t.subtitle}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>{t.todayLabel}</span>
          </div>
        </div>

        {/* “Email” content */}
        <div className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base">
          {/* To / Subject */}
          <div className="space-y-1 mb-4 text-xs md:text-sm">
            <p>
              <span className="font-semibold">{t.sentTo}</span>{" "}
              <span className="text-slate-600">bookings@yourbusiness.com</span>
            </p>
            <p>
              <span className="font-semibold">{t.subject}</span>{" "}
              <span className="text-slate-700">{t.subjectLine}</span>
            </p>
          </div>

          {/* Intro + quick stats */}
          <p className="mb-4 text-slate-700">{t.introLine}</p>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 text-xs md:text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-slate-500">{t.totalBookings}</p>
              <p className="text-lg md:text-xl font-semibold">
                {demoBookings.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-slate-500">{t.remainingSlots}</p>
              <p className="text-lg md:text-xl font-semibold">
                {remaining.length}
              </p>
            </div>
          </div>

          {/* Bookings table */}
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-2">
              {t.totalBookings}
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-xs md:text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-3 py-2">{t.tableTime}</th>
                    <th className="text-left px-3 py-2">{t.tableName}</th>
                    <th className="text-left px-3 py-2">{t.tableEmail}</th>
                    <th className="text-left px-3 py-2">{t.tableNote}</th>
                  </tr>
                </thead>
                <tbody>
                  {demoBookings.map((b) => (
                    <tr
                      key={b.time}
                      className="odd:bg-white even:bg-slate-50/60"
                    >
                      <td className="px-3 py-2 font-mono text-[11px] md:text-xs text-slate-700">
                        {b.time}
                      </td>
                      <td className="px-3 py-2 font-medium text-slate-800">
                        {b.name}
                      </td>
                      <td className="px-3 py-2 text-slate-700">{b.email}</td>
                      <td className="px-3 py-2 text-slate-700">
                        {lang === "en"
                          ? b.noteEn || t.noNotes
                          : b.noteFr || t.noNotes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Remaining slots */}
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-1.5">
              {t.availableSlotsTitle}
            </p>
            {remaining.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {remaining.map((time) => (
                  <span
                    key={time}
                    className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] md:text-xs text-emerald-700 font-medium"
                  >
                    {time}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600">{t.noSlots}</p>
            )}
          </div>

          {/* Footer note */}
          <p className="text-[11px] md:text-xs text-slate-500 border-t border-slate-200 pt-3">
            {t.footerLine}
          </p>
        </div>
      </div>
    </div>
  );
}
