// src/AdminDayOverviewCard.js
import React from "react";

export default function AdminDayOverviewCard({
  lang,
  copy,
  mutedText,
  labelText,
  selectedDate,
  totalSlots,
  bookedCount,
  remaining,
}) {
  return (
    <div className="rounded-2xl bg-black/10 border border-white/10 px-4 py-3 md:px-5 md:py-4">
      <p className={"text-xs font-semibold mb-1 " + labelText}>
        {copy.statsTitle}
      </p>
      {selectedDate ? (
        <>
          <p className={"text-xs mb-3 " + mutedText}>
            {selectedDate.toLocaleDateString(
              lang === "fr" ? "fr-CA" : "en-CA",
              {
                weekday: "long",
                month: "short",
                day: "numeric",
              }
            )}
          </p>
          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            <div className="flex flex-col">
              <span className={mutedText}>{copy.totalSlots}</span>
              <span className="font-semibold">{totalSlots}</span>
            </div>
            <div className="flex flex-col">
              <span className={mutedText}>{copy.bookedSlots}</span>
              <span className="font-semibold">{bookedCount}</span>
            </div>
            <div className="flex flex-col">
              <span className={mutedText}>{copy.remainingSlots}</span>
              <span className="font-semibold">{remaining}</span>
            </div>
          </div>
        </>
      ) : (
        <p className={"text-xs " + mutedText}>{copy.noDateSelected}</p>
      )}
    </div>
  );
}
