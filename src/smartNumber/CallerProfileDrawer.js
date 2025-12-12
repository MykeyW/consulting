// src/smartNumber/components/CallerProfileDrawer.js
import React from "react";
import {
  formatDateTime,
  formatDuration,
  outcomeLabel,
  statusLabel,
} from "./smartNumberUtils";

export default function CallerProfileDrawer({
  t,
  isDark,
  open,
  onClose,
  number,
  callsForNumber,
  notes,
  onAddNote,
  onSetOutcome,
}) {
  const [draft, setDraft] = React.useState("");

  React.useEffect(() => {
    if (open) setDraft("");
  }, [open]);

  if (!open) return null;

  const lastCall = callsForNumber?.[0];

  const pill =
    "inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-[11px] border " +
    (isDark
      ? "border-slate-700 bg-slate-900 text-slate-200"
      : "border-slate-300 bg-slate-100 text-slate-700");

  const card =
    "rounded-2xl border p-3 " +
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={
          "absolute right-0 top-0 h-full w-full sm:w-[520px] border-l shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45)] " +
          (isDark
            ? "bg-slate-950 border-slate-800"
            : "bg-white border-slate-200")
        }
      >
        <div className="p-4 border-b border-slate-200/10 flex items-center justify-between">
          <div>
            <div
              className={
                "font-semibold " + (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {t.smartNumber_profileTitle}
            </div>
            <div
              className={
                "text-xs " + (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {t.smartNumber_profileCaller}: {number}
            </div>
          </div>

          <button
            onClick={onClose}
            className={
              "rounded-full px-3 py-1.5 text-sm border transition " +
              (isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-400"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500")
            }
          >
            {t.smartNumber_btn_close}
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-64px)]">
          <div className="flex flex-wrap gap-2">
            <span className={pill}>
              {t.smartNumber_profileTotalCalls}:{" "}
              <b>{callsForNumber?.length || 0}</b>
            </span>
            <span className={pill}>
              {t.smartNumber_profileLastOutcome}:{" "}
              <b>{outcomeLabel(t, lastCall?.outcome || "none")}</b>
            </span>
          </div>

          {lastCall && (
            <div className={card}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    className={
                      "text-sm font-semibold " +
                      (isDark ? "text-slate-50" : "text-slate-900")
                    }
                  >
                    {statusLabel(t, lastCall.status)}
                  </div>
                  <div
                    className={
                      "text-xs " +
                      (isDark ? "text-slate-400" : "text-slate-500")
                    }
                  >
                    {formatDateTime(lastCall.startTs)} •{" "}
                    {formatDuration(lastCall.durationSec)}
                  </div>
                </div>

                <select
                  value={lastCall.outcome || "none"}
                  onChange={(e) => onSetOutcome(lastCall.id, e.target.value)}
                  className={
                    "text-sm rounded-xl border px-2 py-1.5 " +
                    (isDark
                      ? "bg-slate-950 border-slate-700 text-slate-100"
                      : "bg-white border-slate-300 text-slate-800")
                  }
                >
                  <option value="none">{t.smartNumber_outcome_none}</option>
                  <option value="booked">{t.smartNumber_outcome_booked}</option>
                  <option value="quote">{t.smartNumber_outcome_quote}</option>
                  <option value="callback">
                    {t.smartNumber_outcome_callback}
                  </option>
                  <option value="notfit">{t.smartNumber_outcome_notfit}</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <div
              className={
                "font-semibold mb-2 " +
                (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {t.smartNumber_profileTimeline}
            </div>

            <div className="space-y-2">
              {(callsForNumber || []).map((c) => (
                <div key={c.id} className={card}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div
                        className={
                          "text-sm font-semibold " +
                          (isDark ? "text-slate-50" : "text-slate-900")
                        }
                      >
                        {statusLabel(t, c.status)}
                      </div>
                      <div
                        className={
                          "text-xs " +
                          (isDark ? "text-slate-400" : "text-slate-500")
                        }
                      >
                        {formatDateTime(c.startTs)} •{" "}
                        {formatDuration(c.durationSec)}
                      </div>
                    </div>
                    <div
                      className={
                        "text-xs " +
                        (isDark ? "text-slate-300" : "text-slate-600")
                      }
                    >
                      {outcomeLabel(t, c.outcome || "none")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              className={
                "font-semibold mb-2 " +
                (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {t.smartNumber_profileNotes}
            </div>

            {notes && notes.length > 0 ? (
              <div className="space-y-2 mb-3">
                {notes.map((n) => (
                  <div key={n.id} className={card}>
                    <div
                      className={
                        "text-xs mb-1 " +
                        (isDark ? "text-slate-400" : "text-slate-500")
                      }
                    >
                      {formatDateTime(n.ts)}
                    </div>
                    <div
                      className={isDark ? "text-slate-100" : "text-slate-800"}
                    >
                      {n.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={
                  "text-sm mb-3 " +
                  (isDark ? "text-slate-400" : "text-slate-500")
                }
              >
                {t.smartNumber_profileNoNotes}
              </div>
            )}

            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.smartNumber_notePlaceholder}
                className={
                  "flex-1 rounded-full border px-4 py-2 text-sm outline-none " +
                  (isDark
                    ? "bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-400"
                    : "bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-sky-500")
                }
              />
              <button
                onClick={() => {
                  if (!draft.trim()) return;
                  onAddNote(number, draft.trim());
                  setDraft("");
                }}
                className={
                  "rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition " +
                  (isDark
                    ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                    : "bg-sky-600 hover:bg-sky-500 text-white")
                }
              >
                {t.smartNumber_saveNote}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
