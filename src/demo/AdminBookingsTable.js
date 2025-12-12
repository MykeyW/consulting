// src/demo/AdminBookingsTable.js
import React from "react";
import { IconEnvelope } from "../icons";

export default function AdminBookingsTable({
  copy,
  labelText,
  mutedText,
  selectedDate,
  infoForSelected,
  slotTimes,
  selectedDayKey,
  onOpenNoShow,
  onSetBookingStatus, // optional fallback
}) {
  const wrap =
    "rounded-2xl px-4 py-3 md:px-5 md:py-4 border " +
    "border-slate-200/70 bg-slate-50/80 " +
    "dark:border-white/10 dark:bg-black/10";

  const cardBase =
    "rounded-2xl border px-3 py-3 md:px-4 md:py-3.5 transition " +
    "border-slate-200/70 bg-white/85 " +
    "dark:border-white/10 dark:bg-black/20";

  const cardNoShow =
    "border-rose-300/60 bg-rose-50/70 " +
    "dark:border-rose-400/25 dark:bg-rose-500/10";

  const timeText = "font-mono text-[11px] md:text-xs";
  const nameText = "text-sm font-semibold truncate";
  const subText = "text-[11px] truncate";

  const badge =
    "inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-[11px] font-semibold";

  const badgeNoShow =
    badge +
    " border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-100";

  const badgeBooked =
    badge +
    " border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-100";

  const btn =
    "inline-flex items-center justify-center rounded-full px-3 py-1.5 " +
    "text-[11px] md:text-xs font-semibold border transition whitespace-nowrap";

  const btnNoShow =
    btn +
    " border-rose-500 bg-rose-600 text-white hover:bg-rose-500 " +
    "dark:border-rose-400 dark:bg-rose-500 dark:text-slate-950 dark:hover:bg-rose-400";

  function fireNoShow(dayKey, time) {
    // Prefer onOpenNoShow (directly opens drawer and prepares message)
    if (onOpenNoShow && dayKey) return onOpenNoShow(dayKey, time);

    // Fallback if something is wired to onSetBookingStatus instead
    if (onSetBookingStatus && dayKey)
      return onSetBookingStatus(dayKey, time, "no_show");
  }

  return (
    <div className={wrap}>
      <p
        className={
          "text-xs font-semibold mb-2 flex items-center gap-2 " + labelText
        }
      >
        <IconEnvelope className="h-4 w-4" />
        <span>{copy.bookingsTitle}</span>
      </p>

      {!selectedDate || !infoForSelected ? (
        <p className={"text-xs " + mutedText}>{copy.noDateSelected}</p>
      ) : (
        <div className="space-y-2">
          {slotTimes.map((time) => {
            const booking = infoForSelected.bookings?.[time];
            const isBooked = !!booking;

            if (!isBooked) {
              return (
                <div key={time} className={cardBase}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={
                            timeText + " text-slate-600 dark:text-slate-300"
                          }
                        >
                          {time}
                        </div>
                        <div className="text-sm text-slate-400 dark:text-slate-500">
                          —
                        </div>
                      </div>
                    </div>

                    <span
                      className={
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold " +
                        "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-100"
                      }
                    >
                      {copy.statusAvailable}
                    </span>
                  </div>
                </div>
              );
            }

            const status = booking?.status || "booked";
            const isNoShow = status === "no_show";

            const name = booking?.name?.trim() || "(Demo guest)";
            const email = booking?.email?.trim() || "demo@example.com";

            return (
              <div
                key={time}
                className={[cardBase, isNoShow ? cardNoShow : ""].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={
                          timeText +
                          " " +
                          (isNoShow
                            ? "text-rose-700 dark:text-rose-200"
                            : "text-slate-600 dark:text-slate-300")
                        }
                      >
                        {time}
                      </div>

                      <div className="min-w-0">
                        <div
                          className={
                            nameText + " text-slate-900 dark:text-slate-50"
                          }
                        >
                          {name}
                        </div>
                        <div
                          className={
                            subText + " text-slate-600 dark:text-slate-300"
                          }
                        >
                          {email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className={isNoShow ? badgeNoShow : badgeBooked}>
                    <span
                      className={
                        "inline-flex h-2 w-2 rounded-full " +
                        (isNoShow ? "bg-rose-500" : "bg-amber-500")
                      }
                    />
                    {isNoShow ? copy.statusNoShow : copy.statusBooked}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-end">
                  <button
                    type="button"
                    className={btnNoShow}
                    onClick={() => fireNoShow(selectedDayKey, time)}
                    disabled={
                      !selectedDayKey || (!onOpenNoShow && !onSetBookingStatus)
                    }
                    style={
                      !selectedDayKey || (!onOpenNoShow && !onSetBookingStatus)
                        ? { opacity: 0.5, cursor: "not-allowed" }
                        : undefined
                    }
                  >
                    {copy.markNoShow}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
