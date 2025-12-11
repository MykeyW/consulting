// src/demo/DailyEmailDemo.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

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

export default function DailyEmailDemo({ palette, availability }) {
  const { lang, t } = useLangTheme();

  const bookedTimes = demoBookings.map((b) => b.time);
  const remaining = slotTimes.filter((time) => !bookedTimes.includes(time));

  const panelBg = palette?.panelBg ?? "bg-white text-slate-900";

  return (
    <div
      className={
        "rounded-3xl p-4 md:p-6 lg:p-8 min-h-[540px] md:min_h-[620px] " +
        panelBg
      }
    >
      <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Fake email header bar */}
        <div className="px-4 md:px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
              {t.booking_daily_title}
            </span>
            <span className="text-sm text-slate-600">
              {t.booking_daily_subtitle}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>{t.booking_daily_today_label}</span>
          </div>
        </div>

        {/* Email content */}
        <div className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base">
          {/* To / Subject */}
          <div className="space-y-1 mb-4 text-xs md:text-sm">
            <p>
              <span className="font-semibold">{t.booking_daily_to_label}</span>{" "}
              <span className="text-slate-600">bookings@yourbusiness.com</span>
            </p>
            <p>
              <span className="font-semibold">
                {t.booking_daily_subject_label}
              </span>{" "}
              <span className="text-slate-700">
                {t.booking_daily_subject_line}
              </span>
            </p>
          </div>

          {/* Intro + quick stats */}
          <p className="mb-4 text-slate-700">{t.booking_daily_intro_line}</p>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 text-xs md:text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-slate-500">{t.booking_daily_total_bookings}</p>
              <p className="text-lg md:text-xl font-semibold">
                {demoBookings.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-slate-500">
                {t.booking_daily_remaining_slots}
              </p>
              <p className="text-lg md:text-xl font-semibold">
                {remaining.length}
              </p>
            </div>
          </div>

          {/* Bookings table */}
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-2">
              {t.booking_daily_total_bookings}
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-xs md:text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-3 py-2">
                      {t.booking_daily_table_time}
                    </th>
                    <th className="text-left px-3 py-2">
                      {t.booking_daily_table_name}
                    </th>
                    <th className="text-left px-3 py-2">
                      {t.booking_daily_table_email}
                    </th>
                    <th className="text-left px-3 py-2">
                      {t.booking_daily_table_note}
                    </th>
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
                          ? b.noteEn || t.booking_daily_no_notes
                          : b.noteFr || t.booking_daily_no_notes}
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
              {t.booking_daily_available_slots_title}
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
              <p className="text-xs text-slate-600">
                {t.booking_daily_no_slots}
              </p>
            )}
          </div>

          {/* Footer */}
          <p className="text-[11px] md:text-xs text-slate-500 border-t border-slate-200 pt-3">
            {t.booking_daily_footer_line}
          </p>
        </div>
      </div>
    </div>
  );
}
