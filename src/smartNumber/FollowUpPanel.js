// src/smartNumber/components/FollowUpPanel.js
import React from "react";
import { formatDateTime, statusLabel } from "./smartNumberUtils";

export default function FollowUpPanel({
  t,
  isDark,
  followUps,
  onMarkFollowUpDone,
  onOpenProfile,
}) {
  const card =
    "rounded-2xl border p-4 " +
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const pill =
    "inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-[11px] border " +
    (isDark
      ? "border-slate-700 bg-slate-950 text-slate-200"
      : "border-slate-300 bg-slate-100 text-slate-700");

  return (
    <div className={card}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div
          className={
            "font-semibold " + (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {t.smartNumber_followUps}
        </div>
        <span className={pill}>
          Open: <b>{followUps.filter((f) => f.state === "open").length}</b>
        </span>
      </div>

      <div className="space-y-2">
        {followUps.slice(0, 10).map((f) => (
          <div
            key={f.id}
            className={
              "rounded-2xl border p-3 flex items-start justify-between gap-3 " +
              (isDark
                ? "border-slate-800 bg-slate-950/40"
                : "border-slate-200 bg-slate-50")
            }
          >
            <div className="min-w-0">
              <button
                onClick={() => onOpenProfile(f.phone)}
                className={
                  "text-sm font-semibold hover:underline underline-offset-2 " +
                  (isDark ? "text-slate-100" : "text-slate-900")
                }
              >
                {f.phone}
              </button>

              <div
                className={
                  "text-xs mt-1 " +
                  (isDark ? "text-slate-400" : "text-slate-500")
                }
              >
                {statusLabel(t, f.reason)} • {formatDateTime(f.createdAt)}
              </div>

              <div
                className={
                  "text-[11px] mt-1 " +
                  (isDark ? "text-slate-500" : "text-slate-500")
                }
              >
                Due: {formatDateTime(f.dueAt)}
              </div>
            </div>

            <button
              onClick={() => onMarkFollowUpDone(f.id)}
              className={
                "rounded-full px-3 py-1.5 text-[12px] font-semibold border transition " +
                (f.state === "done"
                  ? isDark
                    ? "border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed"
                    : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
                  : isDark
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300")
              }
              disabled={f.state === "done"}
            >
              {f.state === "done" ? "✓" : t.smartNumber_btn_markDone}
            </button>
          </div>
        ))}

        {followUps.length === 0 && (
          <div
            className={
              "text-sm opacity-70 " +
              (isDark ? "text-slate-400" : "text-slate-500")
            }
          >
            —
          </div>
        )}
      </div>
    </div>
  );
}
