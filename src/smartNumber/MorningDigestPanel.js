// src/smartNumber/components/MorningDigestPanel.js
import React from "react";

export default function MorningDigestPanel({
  t,
  isDark,
  digest,
  onMarkAllDone,
}) {
  const card =
    "rounded-2xl border p-4 " +
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const label = "text-[12px] " + (isDark ? "text-slate-400" : "text-slate-500");

  return (
    <div className={card}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div
          className={
            "font-semibold " + (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {t.smartNumber_morningDigest}
        </div>

        <button
          onClick={onMarkAllDone}
          disabled={!digest || !digest.items?.length}
          className={
            "rounded-full px-3 py-1.5 text-[12px] font-semibold border transition " +
            (!digest || !digest.items?.length
              ? isDark
                ? "border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed"
                : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
              : isDark
              ? "border-sky-500/30 bg-sky-500/10 text-sky-200 hover:border-sky-400"
              : "border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300")
          }
        >
          {t.smartNumber_digestMarkAllDone}
        </button>
      </div>

      {!digest ? (
        <div
          className={
            "text-sm " + (isDark ? "text-slate-400" : "text-slate-500")
          }
        >
          {t.smartNumber_digestEmpty}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className={label}>{t.smartNumber_digestTo}</div>
              <div className={isDark ? "text-slate-100" : "text-slate-900"}>
                {digest.to}
              </div>
            </div>
            <div>
              <div className={label}>{t.smartNumber_digestSubject}</div>
              <div className={isDark ? "text-slate-100" : "text-slate-900"}>
                {digest.subject}
              </div>
            </div>
          </div>

          <div>
            <div className={label}>{t.smartNumber_digestPreview}</div>
            <div
              className={
                "rounded-2xl border p-3 text-sm leading-relaxed whitespace-pre-wrap " +
                (isDark
                  ? "bg-slate-950 border-slate-800 text-slate-100"
                  : "bg-white border-slate-200 text-slate-800")
              }
            >
              {digest.preview}
            </div>
          </div>

          <div className="space-y-2">
            {digest.items.map((it) => (
              <div
                key={it.id}
                className={
                  "rounded-2xl border p-3 " +
                  (isDark
                    ? "bg-slate-950/40 border-slate-800"
                    : "bg-slate-50 border-slate-200")
                }
              >
                <div
                  className={
                    "text-sm font-semibold " +
                    (isDark ? "text-slate-100" : "text-slate-900")
                  }
                >
                  {it.phone}
                </div>
                <div
                  className={
                    "text-xs " + (isDark ? "text-slate-400" : "text-slate-500")
                  }
                >
                  {it.reasonLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
