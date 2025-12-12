// src/smartNumber/components/CallLogTable.js
import React from "react";
import {
  formatTime,
  formatDuration,
  statusLabel,
  isMissedStatus,
} from "./smartNumberUtils";

function FollowUpBadge({ t, isDark, call }) {
  const badge =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ";

  if (call.followUpState === "text_sent") {
    return (
      <span
        className={
          badge +
          (isDark
            ? "bg-sky-500/10 text-sky-200 border-sky-500/30"
            : "bg-sky-50 text-sky-700 border-sky-200")
        }
      >
        {t.smartNumber_badge_autoTextSent}
      </span>
    );
  }

  if (call.followUpState === "text_skipped") {
    return (
      <span
        className={
          badge +
          (isDark
            ? "bg-amber-500/10 text-amber-200 border-amber-500/30"
            : "bg-amber-50 text-amber-700 border-amber-200")
        }
      >
        {t.smartNumber_badge_autoTextSkipped}
      </span>
    );
  }

  if (call.followUpState === "needs_human") {
    return (
      <span
        className={
          badge +
          (isDark
            ? "bg-rose-500/10 text-rose-200 border-rose-500/30"
            : "bg-rose-50 text-rose-700 border-rose-200")
        }
      >
        {t.smartNumber_badge_needsHuman}
      </span>
    );
  }

  if (call.followUpState === "done") {
    return (
      <span
        className={
          badge +
          (isDark
            ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/30"
            : "bg-emerald-50 text-emerald-700 border-emerald-200")
        }
      >
        ✓
      </span>
    );
  }

  return null;
}

function FlagsInline({ flags }) {
  const parts = [];
  if (flags?.isVip) parts.push("⭐ VIP");
  if (flags?.isNewCaller) parts.push("🆕");
  if (flags?.isRepeat) parts.push("🔁");
  if (!parts.length) return null;
  return <span className="text-[11px] opacity-80">{parts.join(" ")}</span>;
}

export default function CallLogTable({
  t,
  isDark,
  calls,
  notesByNumber, // NEW: pass your state.notesByNumber so search can include notes
  onOpenProfile,
  onOpenSms,
  onMarkDone,
}) {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState("all"); // all | missed | followups | autotext | new

  const panel =
    "rounded-2xl border overflow-hidden " +
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const header =
    "px-4 py-3 border-b flex flex-col gap-3 " +
    (isDark
      ? "border-slate-800 bg-slate-950/40"
      : "border-slate-200 bg-slate-50");

  const label = "text-[12px] " + (isDark ? "text-slate-400" : "text-slate-500");

  const input =
    "w-full rounded-full border px-4 py-2 text-sm outline-none " +
    (isDark
      ? "bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-400"
      : "bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-sky-500");

  const select =
    "w-full rounded-full border px-4 py-2 text-sm outline-none " +
    (isDark
      ? "bg-slate-950 border-slate-700 text-slate-100 focus:border-sky-400"
      : "bg-white border-slate-300 text-slate-800 focus:border-sky-500");

  const row =
    "px-4 py-3 border-t flex items-start justify-between gap-3 " +
    (isDark
      ? "border-slate-800 hover:bg-slate-950/40"
      : "border-slate-200 hover:bg-slate-50");

  const btn =
    "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[12px] border transition whitespace-nowrap ";

  const btnGhost =
    btn +
    (isDark
      ? "border-slate-700 bg-slate-950 text-slate-200 hover:border-sky-400"
      : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500");

  const btnPrimary =
    btn +
    (isDark
      ? "bg-sky-500 hover:bg-sky-400 text-slate-950 border-sky-500"
      : "bg-sky-600 hover:bg-sky-500 text-white border-sky-600");

  const statusClass = (call) => {
    if (call.status === "ringing")
      return isDark ? "text-sky-200" : "text-sky-700";
    if (call.status === "answered")
      return isDark ? "text-emerald-200" : "text-emerald-700";
    if (isMissedStatus(call.status))
      return isDark ? "text-rose-200" : "text-rose-700";
    return isDark ? "text-slate-100" : "text-slate-900";
  };

  const passesFilter = (call) => {
    if (filter === "missed") return isMissedStatus(call.status);
    if (filter === "followups") return call.followUpState === "needs_human";
    if (filter === "autotext") return call.followUpState === "text_sent";
    if (filter === "new") return !!call.flags?.isNewCaller;
    return true;
  };

  const visible = (calls || []).filter(passesFilter).filter((c) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;

    const notes = (notesByNumber?.[c.from] || [])
      .map((n) => String(n.text || "").toLowerCase())
      .join(" ");

    return (
      String(c.from || "")
        .toLowerCase()
        .includes(s) ||
      String(c.to || "")
        .toLowerCase()
        .includes(s) ||
      notes.includes(s)
    );
  });

  return (
    <div className={panel}>
      {/* Controls inside component */}
      <div className={header}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <div className={label}>{t.smartNumber_search}</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={input}
              placeholder={t.smartNumber_search}
            />
          </div>

          <div>
            <div className={label}>{t.smartNumber_filters}</div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={select}
            >
              <option value="all">{t.smartNumber_filter_all}</option>
              <option value="missed">{t.smartNumber_filter_missed}</option>
              <option value="followups">
                {t.smartNumber_filter_followups}
              </option>
              <option value="autotext">{t.smartNumber_filter_autotext}</option>
              <option value="new">{t.smartNumber_filter_new}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compact list rows */}
      <div>
        {visible.map((c) => {
          const canPreviewText = !!c.autoText;
          const canMarkDone = !(
            c.followUpState === "done" || c.followUpState === "none"
          );

          return (
            <div key={c.id} className={row}>
              {/* Left: 2–3 lines of info */}
              <div className="min-w-0 flex-1">
                {/* Line 1 */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className={"text-sm font-semibold " + statusClass(c)}>
                    {statusLabel(t, c.status)}
                  </span>
                  <span
                    className={
                      "text-xs " +
                      (isDark ? "text-slate-400" : "text-slate-500")
                    }
                  >
                    {formatTime(c.startTs)}
                  </span>
                  <span
                    className={
                      "text-xs " +
                      (isDark ? "text-slate-500" : "text-slate-500")
                    }
                  >
                    • {formatDuration(c.durationSec)}
                  </span>
                </div>

                {/* Line 2 */}
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <button
                    className={
                      "text-sm font-semibold hover:underline underline-offset-2 truncate " +
                      (isDark ? "text-slate-100" : "text-slate-900")
                    }
                    onClick={() => onOpenProfile(c.from)}
                    title={c.from}
                  >
                    {c.from}
                  </button>

                  <span
                    className={
                      "text-[11px] " +
                      (isDark ? "text-slate-500" : "text-slate-500")
                    }
                  >
                    → {c.to}
                  </span>

                  <FlagsInline flags={c.flags} />

                  <FollowUpBadge t={t} isDark={isDark} call={c} />
                </div>

                {/* Optional Line 3 (mobile readability) */}
                <div
                  className={
                    "mt-2 sm:hidden text-[11px] " +
                    (isDark ? "text-slate-400" : "text-slate-500")
                  }
                >
                  {t.smartNumber_table_followup}:{" "}
                  {c.followUpState === "text_sent"
                    ? t.smartNumber_badge_autoTextSent
                    : c.followUpState === "needs_human"
                    ? t.smartNumber_badge_needsHuman
                    : c.followUpState === "text_skipped"
                    ? t.smartNumber_badge_autoTextSkipped
                    : c.followUpState === "done"
                    ? "✓"
                    : "—"}
                </div>
              </div>

              {/* Right: actions (kept small) */}
              <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center shrink-0">
                <button
                  className={btnGhost}
                  onClick={() => onOpenProfile(c.from)}
                >
                  {t.smartNumber_btn_view}
                </button>

                <button
                  className={btnGhost}
                  onClick={() => onOpenSms(c.autoText)}
                  disabled={!canPreviewText}
                  title={!canPreviewText ? "No auto-text for this call" : ""}
                  style={
                    !canPreviewText
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : undefined
                  }
                >
                  {t.smartNumber_btn_textPreview}
                </button>

                <button
                  className={btnPrimary}
                  onClick={() => onMarkDone(c.id)}
                  disabled={!canMarkDone}
                  style={
                    !canMarkDone
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : undefined
                  }
                >
                  {t.smartNumber_btn_markDone}
                </button>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div
            className={
              "px-4 py-8 text-sm " +
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
