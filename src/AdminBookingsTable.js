// src/AdminBookingsTable.js
import React from "react";
import { IconEnvelope } from "./icons";

export default function AdminBookingsTable({
  copy,
  labelText,
  mutedText,
  selectedDate,
  infoForSelected,
  slotTimes,
  selectedDayKey,
  onCancelBooking,
}) {
  return (
    <div className="rounded-2xl bg-black/10 border border-white/10 px-4 py-3 md:px-5 md:py-4">
      <p
        className={
          "text-xs font-semibold mb-2 flex items-center gap-2 " + labelText
        }
      >
        <IconEnvelope className="h-4 w-4" />
        <span>{copy.bookingsTitle}</span>
      </p>

      {selectedDate && infoForSelected ? (
        <div className="max-h-48 overflow-auto rounded-xl border border-white/10 bg-black/10 text-xs md:text-sm">
          <table className="w-full border-collapse">
            <thead className="bg-black/20 text-[11px] uppercase tracking-wide">
              <tr>
                <th className="px-2 py-1 text-left font-medium">
                  {copy.timeCol}
                </th>
                <th className="px-2 py-1 text-left font-medium">
                  {copy.nameCol}
                </th>
                <th className="px-2 py-1 text-left font-medium hidden md:table-cell">
                  {copy.emailCol}
                </th>
                <th className="px-2 py-1 text-left font-medium">
                  {copy.statusCol}
                </th>
              </tr>
            </thead>
            <tbody>
              {slotTimes.map((time) => {
                const booking = infoForSelected.bookings?.[time];
                const isBooked = !!booking;

                return (
                  <tr
                    key={time}
                    className="border-t border-white/5 odd:bg-black/10"
                  >
                    <td className="px-2 py-1 font-mono text-[11px] md:text-xs">
                      {time}
                    </td>
                    <td className="px-2 py-1 text-xs">
                      {isBooked ? booking.name || "(Demo guest)" : "—"}
                    </td>
                    <td className="px-2 py-1 text-[11px] hidden md:table-cell">
                      {isBooked ? booking.email || "demo@example.com" : "—"}
                    </td>
                    <td className="px-2 py-1 text-[11px] md:text-xs">
                      {isBooked ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-emerald-500/20 text-emerald-100 px-2 py-0.5">
                            {copy.statusBooked}
                          </span>
                          {onCancelBooking && selectedDayKey && (
                            <button
                              type="button"
                              onClick={() =>
                                onCancelBooking(selectedDayKey, time)
                              }
                              className="text-[10px] text-rose-200 hover:text-rose-100 underline"
                            >
                              {copy.cancelLabel}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-500/20 text-slate-100 px-2 py-0.5">
                          {copy.statusAvailable}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={"text-xs " + mutedText}>{copy.noDateSelected}</p>
      )}
    </div>
  );
}
