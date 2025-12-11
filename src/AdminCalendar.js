// src/AdminCalendar.js
import React from "react";

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function AdminCalendar({
  lang,
  palette,
  copy,
  monthName,
  dayNames,
  cells,
  today,
  selectedDate,
  onSelectDate,
  availability,
  slotTimes,
  isSameDay,
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            {copy.pickDateLabel}
          </p>
          <p className="text-lg md:text-xl font-semibold mt-1">
            {copy.monthLabelPrefix} {monthName}
          </p>
        </div>
      </div>

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
          const info = availability ? availability[key] : null;
          const isPastDay = startOfDay(date) < today;
          const isToday = isSameDay(date, today);
          const remainingSlots = info ? info.remainingSlots : slotTimes.length;
          const isFull = remainingSlots === 0;

          const baseClasses =
            "flex flex-col items-center justify-center rounded-2xl h-[72px] md:h-[96px] lg:h-[110px] px-1 md:px-2 transition-all select-none border";

          let colorClasses = "";
          if (isFull) {
            colorClasses = palette.calendarPast;
          } else if (selectedDate && isSameDay(date, selectedDate)) {
            colorClasses = palette.calendarSelected;
          } else if (isPastDay) {
            colorClasses = palette.calendarPast;
          } else {
            colorClasses = palette.calendarAvailable;
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(date)}
              className={colorClasses + " " + baseClasses}
            >
              <span className="text-lg md:text-2xl font-semibold leading-none">
                {date.getDate()}
              </span>
              <span className="mt-1 text-[11px] md:text-xs">
                {isFull
                  ? copy.fullLabel
                  : remainingSlots === 1
                  ? `1 ${copy.oneSlotLabel}`
                  : `${remainingSlots} ${copy.slotsLabel}`}
              </span>
              {isToday && (
                <span className="mt-0.5 text-[10px] text-emerald-300 font-medium uppercase tracking-wide">
                  {copy.todayLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
