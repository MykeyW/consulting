// src/demo/BookingBookingView.js
import React from "react";
import { IconBolt, IconEnvelope } from "../icons";
import { slotTimes } from "./demoPalettes";

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function BookingBookingView({
  lang,
  t,
  palette,
  monthName,
  dayNames,
  cells,
  today,
  availability,
  selectedDate,
  selectedSlot,
  setSelectedDate,
  setSelectedSlot,
  view,
  setView,
  handleDateClick,
  handleSaveDemo,
  isSlotInPast,
  name,
  setName,
  email,
  setEmail,
  toast,
}) {
  const panelBg = palette.panelBg;

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div
      className={
        "rounded-3xl p-4 md:p-6 lg:p-8 min-h-[540px] md:min-h-[620px] " +
        panelBg
      }
    >
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            {t.booking_pick_date_label}
          </p>
          <p className="text-lg md:text-xl font-semibold mt-1">
            {t.booking_month_label_prefix} {monthName}
          </p>
        </div>
        {selectedDate && view === "times" && (
          <button
            onClick={() => setView("calendar")}
            className={
              "inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full border transition-colors " +
              palette.backToCalendarBtn
            }
          >
            {t.booking_back_to_calendar}
          </button>
        )}
      </div>

      {/* sliding panels */}
      <div className="relative overflow-hidden">
        <div
          className={
            "flex w-[200%] transition-transform duration-500 ease-out " +
            (view === "calendar"
              ? "translate-x-0"
              : "-translate-x-1/2 md:-translate-x-1/2")
          }
          style={{ willChange: "transform" }}
        >
          {/* CALENDAR */}
          <div className="w-1/2 md:w-1/2 pr-3 md:pr-6">
            <div className="grid grid-cols-7 gap-2 mb-2 text-[11px] md:text-xs text-slate-400">
              {dayNames.map((d) => (
                <div
                  key={d}
                  className="text-center font-medium uppercase tracking-wide"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {cells.map((date, idx) => {
                if (!date) {
                  return <div key={idx} className="h-[68px] md:h-[88px]" />;
                }

                const key = dateKey(date);
                const info = availability[key];
                const isPastDay = date < today;
                const isToday = isSameDay(date, today);

                // NEW: compute how many *selectable* slots remain
                let displayRemaining = 0;
                if (info && !isPastDay) {
                  const taken = new Set(info.takenSlots || []);
                  displayRemaining = slotTimes.filter((time) => {
                    const [h, m] = time.split(":").map(Number);
                    const slotDateTime = new Date(date);
                    slotDateTime.setHours(h, m, 0, 0);
                    // if this slot is already in the past, don't count it
                    if (slotDateTime < new Date()) return false;
                    // if it's taken, don't count it
                    return !taken.has(time);
                  }).length;
                }

                const isFull = isPastDay || displayRemaining === 0;

                const baseClasses =
                  "flex flex-col items-center justify-center rounded-2xl h-[72px] md:h-[96px] lg:h-[110px] px-1 md:px-2 cursor-pointer transition-all select-none border";

                let colorClasses = "";
                if (isFull) {
                  colorClasses = palette.calendarPast;
                } else if (selectedDate && isSameDay(date, selectedDate)) {
                  colorClasses = palette.calendarSelected;
                } else {
                  colorClasses = palette.calendarAvailable;
                }

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleDateClick(date)}
                    disabled={isFull}
                    className={baseClasses + " " + colorClasses}
                  >
                    <span className="text-lg md:text-2xl font-semibold leading-none">
                      {date.getDate()}
                    </span>
                    <span className="mt-1 text-[11px] md:text-xs">
                      {isFull
                        ? t.booking_full_label
                        : displayRemaining === 1
                        ? `1 ${t.booking_one_slot_label}`
                        : `${displayRemaining} ${t.booking_slots_label}`}
                    </span>
                    {isToday && (
                      <span className="mt-0.5 text-[10px] text-emerald-400 font-medium uppercase tracking-wide">
                        {t.booking_today_label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TIMES + FORM */}
          <div className="w-1/2 md:w-1/2 pl-3 md:pl-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full">
              {/* Times list */}
              <div
                className={
                  "flex-1 rounded-2xl px-4 py-4 md:px-5 md:py-5 min-h-[260px] md:min-h-[360px] " +
                  palette.timesPanelBg
                }
              >
                <p className="text-sm md:text-base font-semibold mb-2 flex items-center gap-2">
                  <IconBolt className="h-5 w-5 text-sky-300" />
                  <span>{t.booking_available_times_title}</span>
                </p>
                {selectedDate ? (
                  <>
                    <p
                      className={"text-xs md:text-sm mb-4 " + palette.mutedText}
                    >
                      {t.booking_choose_slot_help}
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                      {slotTimes.map((time) => {
                        const key = dateKey(selectedDate);
                        const info = availability[key];
                        const isTaken = info && info.takenSlots.includes(time);
                        const isPast = isSlotInPast(selectedDate, time);
                        const disabled = isTaken || isPast;

                        const selected = selectedSlot === time;

                        let classes =
                          "w-full rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold border transition-all text-center ";

                        if (disabled) {
                          classes += palette.timeDisabled;
                        } else if (selected) {
                          classes += palette.timeSelected;
                        } else {
                          classes += palette.timeAvailable;
                        }

                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={disabled}
                            onClick={() => setSelectedSlot(time)}
                            className={classes}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>

                    <p className={"text-xs " + palette.mutedText}>
                      {t.booking_real_system_note}
                    </p>
                  </>
                ) : (
                  <p className={"text-sm " + palette.mutedText}>
                    {t.booking_empty_times_help}
                  </p>
                )}

                {selectedDate &&
                  availability[dateKey(selectedDate)] &&
                  availability[dateKey(selectedDate)].remainingSlots === 0 && (
                    <p className="mt-3 text-xs text-rose-300">
                      {t.booking_no_slots_today}
                    </p>
                  )}
              </div>

              {/* Form */}
              <div
                className={
                  "flex-1 rounded-2xl px-4 py-4 md:px-5 md:py-5 min-h-[260px] md:min-h-[360px] " +
                  palette.formPanelBg
                }
              >
                <p className="text-sm md:text-base font-semibold mb-3 flex items-center gap-2">
                  <IconEnvelope className="h-5 w-5 text-sky-300" />
                  <span>{t.booking_contact_panel_title}</span>
                </p>

                <form
                  onSubmit={handleSaveDemo}
                  className="flex flex-col gap-3 md:gap-4 text-sm md:text-base"
                >
                  <div className="flex flex-col gap-1 text-left">
                    <label
                      className={palette.labelText + " text-xs md:text-sm"}
                    >
                      {t.booking_name_label}
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={
                        "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                        palette.inputField
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-left">
                    <label
                      className={palette.labelText + " text-xs md:text-sm"}
                    >
                      {t.booking_email_label}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                        palette.inputField
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-left">
                    <label
                      className={palette.labelText + " text-xs md:text-sm"}
                    >
                      {t.booking_selected_time_label}
                    </label>
                    <div
                      className={
                        "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 text-sm md:text-base " +
                        palette.selectedTimeBox
                      }
                    >
                      {selectedDate && selectedSlot
                        ? `${selectedDate.toLocaleDateString(
                            lang === "en" ? "en-CA" : "fr-CA",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )} – ${selectedSlot}`
                        : t.booking_selected_time_placeholder}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedSlot}
                    className={
                      "mt-2 w-full rounded-full py-2.5 md:py-3 font-semibold text-sm md:text-base inline-flex items-center justify-center gap-2 transition-colors " +
                      (!selectedDate || !selectedSlot
                        ? palette.saveBtnDisabled
                        : palette.saveBtnEnabled)
                    }
                  >
                    {t.booking_save_demo}
                  </button>

                  <p
                    className={
                      "text-[10px] md:text-[11px] text-left mt-1 " +
                      palette.mutedText
                    }
                  >
                    {t.booking_visual_demo_note}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="mt-4 text-xs md:text-sm text-emerald-300 bg-emerald-900/30 border border-emerald-700 rounded-xl px-3 py-2 inline-flex items-center gap-2">
          <span>✔</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
