// src/AdminUpcomingBookings.js
import React from "react";

export default function AdminUpcomingBookings({
  lang,
  copy,
  labelText,
  mutedText,
  upcomingBookings,
}) {
  return (
    <div className="rounded-2xl bg-black/10 border border-white/10 px-4 py-3 md:px-5 md:py-4">
      <p className={"text-xs font-semibold mb-2 " + labelText}>
        {copy.upcomingTitle}
      </p>
      {upcomingBookings.length === 0 ? (
        <p className={"text-xs " + mutedText}>{copy.upcomingEmpty}</p>
      ) : (
        <ul className="space-y-1.5 text-xs md:text-sm">
          {upcomingBookings.map((item, idx) => (
            <li
              key={`${item.key}-${item.time}-${idx}`}
              className="flex items-start justify-between gap-2"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[11px]">{item.time}</span>
                <span className={"text-[11px] " + mutedText}>
                  {item.date.toLocaleDateString(
                    lang === "fr" ? "fr-CA" : "en-CA",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs font-medium">{item.name}</p>
                <p className={"text-[11px] " + mutedText}>{item.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
