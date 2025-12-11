// src/quote/QuoteTable.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

function statusBadgeClasses(status) {
  switch (status) {
    case "followup":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "accepted":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "sent":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "draft":
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function QuoteTable({ quotes, selectedId, onSelect, palette }) {
  const { t, isDark } = useLangTheme();

  const basePanel =
    palette?.panelBg ||
    (isDark
      ? "bg-slate-900 text-slate-50 border border-slate-800 shadow-xl"
      : "bg-white text-slate-900 border border-slate-200 shadow-xl");

  const panelClass = "rounded-2xl p-4 md:p-5 " + basePanel;
  const mutedText =
    palette?.mutedText || (isDark ? "text-slate-400" : "text-slate-600");

  const sorted = [...quotes].sort((a, b) => {
    const na = parseInt(a.id.replace(/\D/g, ""), 10) || 0;
    const nb = parseInt(b.id.replace(/\D/g, ""), 10) || 0;
    return nb - na;
  });

  const followup = sorted.filter((q) => q.status === "followup");

  return (
    <div className={panelClass}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            {t.quote_table_badge || "Quotes (demo data)"}
          </p>
          <h2 className="text-sm md:text-base font-semibold mt-1">
            {t.quote_table_title || "Pipeline of open quotes"}
          </h2>
        </div>
      </div>

      {/* Needs follow-up strip */}
      <div className="mb-4">
        <p className={"text-xs mb-1 " + mutedText}>
          {t.quote_table_needs_followup_title ||
            "Quotes that need a follow-up:"}
        </p>
        {followup.length === 0 ? (
          <p className={"text-xs " + mutedText}>
            {t.quote_table_needs_followup_empty ||
              "No quotes flagged for follow-up in this demo."}
          </p>
        ) : (
          <div className="space-y-1">
            {followup.map((q) => (
              <button
                key={q.id + "-follow"}
                type="button"
                onClick={() => onSelect && onSelect(q.id)}
                className={[
                  "w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs border transition",
                  selectedId === q.id
                    ? "bg-amber-50 border-amber-300"
                    : isDark
                    ? "bg-slate-950/40 border-slate-700 hover:border-amber-400"
                    : "bg-slate-50 border-slate-200 hover:border-amber-400",
                ].join(" ")}
              >
                <div className="flex flex-col text-left">
                  <span className="font-semibold truncate">{q.customer}</span>
                  <span className={"mt-0.5 truncate " + mutedText}>
                    {q.site} • {q.createdDate}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-semibold">{q.value}</span>
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                      statusBadgeClasses(q.status),
                    ].join(" ")}
                  >
                    {q.statusLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main list – card per quote, multiple lines */}
      <div className="mt-4 space-y-2">
        {sorted.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => onSelect && onSelect(q.id)}
            className={[
              "w-full text-left rounded-xl border px-3 py-2.5 md:px-4 md:py-3 transition",
              selectedId === q.id
                ? "border-sky-400 bg-sky-50/70"
                : isDark
                ? "border-slate-700 bg-slate-950/40 hover:border-sky-500"
                : "border-slate-200 bg-white hover:border-sky-400",
            ].join(" ")}
          >
            {/* Row 1: ID + customer + value + status */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-slate-500">
                    {q.id}
                  </span>
                  <span className={"text-[10px] " + mutedText}>
                    {t.quote_table_aging_label || "Days:"} {q.agingDays}
                  </span>
                </div>
                <div className="font-semibold text-xs md:text-sm truncate">
                  {q.customer}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-semibold">
                  {q.value}
                </span>
                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] md:text-[11px] font-medium",
                    statusBadgeClasses(q.status),
                  ].join(" ")}
                >
                  {q.statusLabel}
                </span>
              </div>
            </div>

            {/* Row 2: site + created + days */}
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className={"truncate max-w-[60%] " + mutedText}>
                {q.site}
              </span>
              <span className={mutedText}>{q.createdDate}</span>
            </div>
          </button>
        ))}

        {sorted.length === 0 && (
          <p className={"text-xs text-center mt-4 " + mutedText}>
            {t.quote_table_empty || "No quotes in this demo yet."}
          </p>
        )}
      </div>
    </div>
  );
}
