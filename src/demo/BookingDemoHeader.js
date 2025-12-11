// src/demo/BookingDemoHeader.js
import React from "react";
import { IconMap } from "../icons";
import { BRAND_LOGO, BRAND_NAME } from "../brand";
import { Link } from "react-router-dom"; // ⬅ ADD THIS
const viewOptions = [
  { id: "booking", labelKey: "booking_mode_booking" },
  { id: "admin", labelKey: "booking_mode_admin" },
  { id: "email", labelKey: "booking_mode_email" },
];

function niceLabelFromId(id) {
  // turn "icecream" or "ice-cream" into "Icecream" / "Ice cream"
  return id
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BookingDemoHeader({
  lang,
  setLang,
  t,
  styleId,
  setStyleId,
  mode,
  setMode,
  styleIds, // comes from BookingDemoPage, derived from palettes
}) {
  return (
    <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">
        {/* Top row: brand + title + subtitle + language switch */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            {/* Brand chunk */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0">
                <img
                  src={BRAND_LOGO}
                  alt={BRAND_NAME}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight text-slate-50">
                  {BRAND_NAME}
                </span>
                <span className="text-[11px] text-slate-400">{t.tagline}</span>
              </div>
            </div>

            {/* Booking demo title */}
            <div className="pl-4 border-l border-slate-800">
              <div className="flex items-center gap-2">
                <IconMap className="w-4 h-4 text-sky-400" />
                <h1 className="text-sm md:text-base uppercase tracking-[0.18em] text-slate-400">
                  {t.booking_page_title}
                </h1>
              </div>
              <p className="mt-1 text-sm md:text-base text-slate-400 max-w-xl">
                {t.booking_page_sub}
              </p>
            </div>
          </div>

          {/* Language toggle */}
          <div className="flex sm:justify-end">
            <div className="inline-flex rounded-full bg-slate-900 border border-slate-700 overflow-hidden text-xs">
              {["en", "fr"].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={[
                    "px-3 py-1.5 font-medium transition",
                    lang === code
                      ? "bg-sky-500 text-white"
                      : "text-slate-300 hover:bg-slate-800",
                  ].join(" ")}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: style pills, view pills, back button */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Style presets */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <span className="text-xs uppercase tracking-wide text-slate-400">
              {t.booking_style_label}
            </span>
            <div className="flex flex-wrap gap-2">
              {styleIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStyleId(id)}
                  className={[
                    "px-3 py-1 rounded-full border text-xs md:text-sm transition",
                    styleId === id
                      ? "bg-sky-500 text-white border-sky-500"
                      : "bg-slate-900/70 text-slate-100 border-slate-700 hover:border-slate-500",
                  ].join(" ")}
                >
                  {niceLabelFromId(id)}
                </button>
              ))}
            </div>
          </div>

          {/* View + back button */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {t.booking_view_label}
              </span>
              <div className="flex flex-wrap gap-2">
                {viewOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMode(opt.id)}
                    className={[
                      "px-3 py-1 rounded-full border text-xs md:text-sm transition",
                      mode === opt.id
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-slate-900/70 text-slate-100 border-slate-700 hover:border-slate-500",
                    ].join(" ")}
                  >
                    {t[opt.labelKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Back to site button */}
            <div className="md:ml-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 text-xs md:text-sm text-slate-100 hover:border-sky-500 hover:text-white transition"
              >
                <span className="text-base">←</span>
                <span>{t.booking_back_to_site}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
