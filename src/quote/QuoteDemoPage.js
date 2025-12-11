// src/quote/QuoteDemoPage.js
import React from "react";
import { Link } from "react-router-dom";
import { useLangTheme } from "../landing/LangThemeProvider";
import { useQuoteDemo } from "./QuoteContext";

import QuoteForm from "./QuoteForm";
import QuoteList from "./QuoteList";
import QuoteDetail from "./QuoteDetail";
import QuoteTasksPanel from "./QuoteTasksPanel";
import QuoteCallListPanel from "./QuoteCallListPanel";

// 👇 reuse booking palettes
import { palettes as bookingPalettes } from "../demo/demoPalettes";

export default function QuoteDemoPage() {
  const { t, isDark } = useLangTheme();
  const { selectedQuote, paletteId, setPaletteId } = useQuoteDemo();

  const palette = bookingPalettes[paletteId] || bookingPalettes.indigo;
  const paletteKeys = Object.keys(bookingPalettes);

  return (
    <div
      className={
        "min-h-screen " +
        (isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900")
      }
    >
      {/* Header */}
      <header
        className={
          "border-b backdrop-blur " +
          (isDark
            ? "bg-slate-950/90 border-slate-800"
            : "bg-white/90 border-slate-200")
        }
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
              {t.quote_page_badge}
            </p>
            <h1 className="text-xl md:text-2xl font-semibold">
              {t.quote_page_title}
            </h1>
            <p className="text-sm md:text-base text-slate-400 mt-1">
              {t.quote_page_sub}
            </p>
          </div>

          {/* Palette selector + back */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wide text-slate-400">
              {t.booking_style_label}
            </span>
            {paletteKeys.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setPaletteId(id)}
                className={[
                  "px-3 py-1 rounded-full border text-xs transition",
                  paletteId === id
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-slate-900/60 text-slate-200 border-slate-700 hover:border-sky-400",
                ].join(" ")}
              >
                {bookingPalettes[id].label?.en || id}
              </button>
            ))}

            <Link
              to="/"
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 text-xs md:text-sm hover:border-sky-400 transition"
            >
              <span className="text-base">←</span>
              {t.quote_back_to_site}
            </Link>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* Left: form + list */}
          <div className="space-y-4">
            <QuoteForm palette={palette} />
            <QuoteList palette={palette} />
          </div>

          {/* Right: detail + tasks + call list */}
          <div className="space-y-4">
            <QuoteDetail quote={selectedQuote} palette={palette} />
            <QuoteTasksPanel palette={palette} />
            <QuoteCallListPanel palette={palette} />
          </div>
        </div>
      </main>
    </div>
  );
}
