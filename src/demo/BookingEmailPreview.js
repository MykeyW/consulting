// src/demo/BookingEmailPreview.js
import React from "react";
import { IconEnvelope } from "../icons";
import { useLangTheme } from "../landing/LangThemeProvider";

export default function BookingEmailPreview({
  palette,
  selectedDate,
  infoForSelected,
  slotTimes = [],
}) {
  const { lang, t } = useLangTheme();

  const mutedText = palette?.mutedText || "text-slate-600";
  const labelText = palette?.labelText || "text-slate-800";

  // reuse the theme’s “card” look for the email preview
  const cardBg = palette?.formPanelBg || "bg-white border border-slate-200";
  // use primary button style as email header accent
  const headerBg = palette?.saveBtnEnabled || "bg-sky-600 text-white";

  const hasDate = !!selectedDate && !!infoForSelected;
  const totalSlots = infoForSelected?.totalSlots ?? (slotTimes?.length || 0);
  const bookedCount = infoForSelected?.takenSlots?.length ?? 0;
  const remaining =
    infoForSelected?.remainingSlots ?? Math.max(totalSlots - bookedCount, 0);

  const dateLabel = hasDate
    ? selectedDate.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className={"rounded-2xl overflow-hidden text-xs md:text-sm " + cardBg}>
      {/* “Email” header bar */}
      <div
        className={
          "flex items-center justify-between gap-2 px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-xs font-semibold " +
          headerBg
        }
      >
        <div className="flex items-center gap-2">
          <IconEnvelope className="h-4 w-4" />
          <span>
            {hasDate ? t.booking_email_title : t.booking_email_empty_title}
          </span>
        </div>
        <span className="opacity-80">demo@your-business.com</span>
      </div>

      {/* Body */}
      <div className="px-3 py-3 md:px-4 md:py-4 space-y-3">
        {/* Subject line */}
        <p className={"text-[11px] " + mutedText}>
          <span className="font-semibold">
            {t.booking_email_subject_prefix}
          </span>{" "}
          {t.booking_email_subject}
        </p>

        {/* Intro */}
        <p className={mutedText}>
          {hasDate ? t.booking_email_intro : t.booking_email_no_date_intro}
        </p>

        {/* Only show real content if we have a date + info */}
        {hasDate && (
          <>
            {/* Date + stats */}
            <div className="rounded-xl border border-white/20 bg-white/40 dark:bg-black/20 px-3 py-2.5 md:px-3.5 md:py-3 flex flex-col gap-2">
              <div className="flex justify-between items-center gap-2">
                <span className={"text-[11px] font-semibold " + labelText}>
                  {t.booking_email_date_label}
                </span>
                <span className="font-medium">{dateLabel}</span>
              </div>

              <div className="flex flex-wrap gap-3 text-[11px] md:text-xs">
                <div className="flex flex-col">
                  <span className={mutedText}>
                    {t.booking_email_total_slots}
                  </span>
                  <span className="font-semibold">{totalSlots}</span>
                </div>
                <div className="flex flex-col">
                  <span className={mutedText}>
                    {t.booking_email_booked_slots}
                  </span>
                  <span className="font-semibold">{bookedCount}</span>
                </div>
                <div className="flex flex-col">
                  <span className={mutedText}>
                    {t.booking_email_remaining_slots}
                  </span>
                  <span className="font-semibold">{remaining}</span>
                </div>
              </div>
            </div>

            {/* Booked slots */}
            <div>
              <p
                className={
                  "text-[11px] md:text-xs font-semibold mb-1 " + labelText
                }
              >
                {t.booking_email_booked_section_title}
              </p>

              {bookedCount === 0 ? (
                <p className={"text-[11px] " + mutedText}>
                  {t.booking_email_none_booked}
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {slotTimes.map((time) => {
                    const booking = infoForSelected.bookings?.[time];
                    if (!booking) return null;

                    const displayName = booking.name?.trim() || "(Demo guest)";
                    const displayEmail =
                      booking.email?.trim() || "demo@example.com";

                    return (
                      <li
                        key={time}
                        className="flex items-start justify-between gap-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-mono text-[11px]">{time}</span>
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-[11px] md:text-xs font-medium">
                            {displayName}
                          </p>
                          <p className={"text-[11px] " + mutedText}>
                            {displayEmail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Open slots */}
            <div>
              <p
                className={
                  "text-[11px] md:text-xs font-semibold mb-1 " + labelText
                }
              >
                {t.booking_email_open_slots_title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {slotTimes.map((time) => {
                  const booking = infoForSelected.bookings?.[time];
                  const isOpen = !booking;
                  if (!isOpen) return null;

                  return (
                    <span
                      key={time}
                      className="inline-flex items-center rounded-full border border-dashed px-2 py-0.5 font-mono text-[10px]"
                    >
                      {time}
                      <span className={"ml-1 " + mutedText}>
                        · {t.booking_email_open_badge}
                      </span>
                    </span>
                  );
                })}

                {remaining === 0 && (
                  <span className={"text-[11px] " + mutedText}>
                    {t.booking_email_none_booked}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Footer note */}
        <p className={"text-[10px] mt-1 " + mutedText}>
          {t.booking_email_footer_note}
        </p>
      </div>
    </div>
  );
}
