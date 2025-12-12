// src/demo/AdminNoShowFollowUps.js
import React from "react";

export default function AdminNoShowFollowUps({
  t,
  palette,
  followUps = [], // ✅ prevents "length of undefined"
  onOpenRecovery,
}) {
  const box =
    "rounded-2xl border px-4 py-3 md:px-5 md:py-4 " +
    "border-slate-200/70 bg-slate-50/80 " +
    "dark:border-white/10 dark:bg-black/10";

  const title =
    "text-xs font-semibold mb-2 flex items-center gap-2 " +
    (palette?.labelText || "text-slate-800");

  const muted = palette?.mutedText || "text-slate-600";

  return (
    <div className={box}>
      <div className="flex items-center justify-between gap-3">
        <p className={title}>
          <span>⚡</span>
          <span>{t.booking_noshow_followups_title}</span>
        </p>

        <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-300 dark:border-white/15">
          {followUps.length}
        </span>
      </div>

      {followUps.length === 0 ? (
        <p className={"text-xs " + muted}>{t.booking_noshow_followups_empty}</p>
      ) : (
        <ul className="space-y-2">
          {followUps.slice(0, 8).map((fu) => (
            <li
              key={fu.id}
              className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-black/20 px-3 py-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">
                    {fu.name || "(Demo guest)"}
                  </div>
                  <div className={"text-[11px] truncate " + muted}>
                    {fu.email || "demo@example.com"}
                  </div>
                  <div className={"text-[11px] mt-1 " + muted}>
                    {fu.dayKey} · {fu.time}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenRecovery?.(fu.dayKey, fu.time)}
                  className="text-[11px] px-3 py-1 rounded-full border border-slate-300 dark:border-white/15 hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-200"
                >
                  {t.booking_noshow_followups_open}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {followUps.length > 8 && (
        <p className={"text-[11px] mt-2 " + muted}>
          {t.booking_noshow_followups_more}
        </p>
      )}
    </div>
  );
}
