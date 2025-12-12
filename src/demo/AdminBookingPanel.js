// src/demo/AdminBookingPanel.js
import React from "react";
import { IconMap } from "../icons";
import BookingEmailPreview from "./BookingEmailPreview";

// PDF libs
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Child components
import AdminCalendar from "./AdminCalendar";
import AdminDayOverviewCard from "./AdminDayOverviewCard";
import AdminBookingsTable from "./AdminBookingsTable";
import AdminUpcomingBookings from "./AdminUpcomingBookings";

import { useLangTheme } from "../landing/LangThemeProvider";
import { slotTimes } from "./demoPalettes";
import { startOfDay, dateKey } from "./demoTimeUtils";

export default function AdminBookingPanel({
  palette,
  availability,
  onCancelBooking,
  onOpenNoShow,
  onSetBookingStatus,
}) {
  const { lang, t } = useLangTheme();

  const copy = {
    adminTitle: t.booking_admin_title,
    adminSub: t.booking_admin_sub,

    pickDateLabel: t.booking_pick_date_label,
    monthLabelPrefix: t.booking_month_label_prefix,
    fullLabel: t.booking_full_label,
    oneSlotLabel: t.booking_one_slot_label,
    slotsLabel: t.booking_slots_label,
    todayLabel: t.booking_today_label,

    noDateSelected: t.booking_admin_no_date_selected,
    totalSlots: t.booking_admin_total_slots,
    bookedSlots: t.booking_admin_booked_slots,
    remainingSlots: t.booking_admin_remaining_slots,
    bookingsTitle: t.booking_admin_bookings_title,

    statusBooked: t.booking_admin_status_booked,
    statusNoShow: t.booking_admin_status_noshow,
    statusAvailable: t.booking_admin_status_available,

    markNoShow: t.booking_admin_mark_noshow,

    upcomingTitle: t.booking_admin_upcoming_title,
    upcomingEmpty: t.booking_admin_upcoming_empty,

    exportPdf: t.booking_admin_export_pdf,
    pdfTitlePrefix: t.booking_admin_pdf_title_prefix,
    pdfSectionDay: t.booking_admin_pdf_section_day,
    pdfSectionBookings: t.booking_admin_pdf_section_bookings,
    pdfSectionUpcoming: t.booking_admin_pdf_section_upcoming,
    pdfNoDate: t.booking_admin_pdf_no_date,

    timeCol: t.booking_admin_time_col,
    nameCol: t.booking_admin_name_col,
    emailCol: t.booking_admin_email_col,
    statusCol: t.booking_admin_status_col,
  };

  const [currentMonth] = React.useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = React.useState(() =>
    startOfDay(new Date())
  );

  const today = startOfDay(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekday = firstDayOfMonth.getDay();

  const monthName = currentMonth.toLocaleString(
    lang === "fr" ? "fr-CA" : "en-CA",
    { month: "long", year: "numeric" }
  );

  const dayNames =
    lang === "fr"
      ? ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const upcomingBookings = React.useMemo(() => {
    if (!availability) return [];
    const now = startOfDay(new Date());
    const sevenDays = new Date(now);
    sevenDays.setDate(sevenDays.getDate() + 7);

    const items = [];

    Object.entries(availability).forEach(([key, info]) => {
      if (!info?.takenSlots?.length) return;
      const date = new Date(key + "T00:00:00");
      if (date < now || date > sevenDays) return;

      info.takenSlots.forEach((time) => {
        const booking = info.bookings?.[time];
        items.push({
          date,
          key,
          time,
          name: booking?.name || "(Demo guest)",
          email: booking?.email || "demo@example.com",
        });
      });
    });

    items.sort((a, b) => {
      if (a.date.getTime() !== b.date.getTime())
        return a.date.getTime() - b.date.getTime();
      return a.time.localeCompare(b.time);
    });

    return items.slice(0, 8);
  }, [availability]);

  const infoForSelected =
    selectedDate && availability ? availability[dateKey(selectedDate)] : null;

  const totalSlots = infoForSelected?.totalSlots ?? slotTimes.length;
  const bookedCount = infoForSelected?.takenSlots?.length ?? 0;
  const remaining = infoForSelected?.remainingSlots ?? totalSlots - bookedCount;

  const panelBg = palette.panelBg;
  const mutedText = palette.mutedText || "text-slate-500";
  const labelText = palette.labelText || "text-slate-800";

  const handleExportPdf = () => {
    if (!selectedDate) {
      alert(copy.pdfNoDate);
      return;
    }

    const doc = new jsPDF();
    const dateLabel = selectedDate.toLocaleDateString(
      lang === "fr" ? "fr-CA" : "en-CA",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    doc.setFontSize(16);
    doc.text(`${copy.pdfTitlePrefix} ${dateLabel}`, 14, 18);

    doc.setFontSize(12);
    doc.text(copy.pdfSectionDay, 14, 28);

    autoTable(doc, {
      startY: 32,
      head: [[copy.totalSlots, copy.bookedSlots, copy.remainingSlots]],
      body: [[totalSlots, bookedCount, remaining]],
      styles: { fontSize: 10 },
    });

    let nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 50;

    doc.setFontSize(12);
    doc.text(copy.pdfSectionBookings, 14, nextY);
    nextY += 4;

    autoTable(doc, {
      startY: nextY,
      head: [[copy.timeCol, copy.nameCol, copy.emailCol, copy.statusCol]],
      body: slotTimes.map((time) => {
        const booking = infoForSelected?.bookings?.[time];
        const isBooked = !!booking;
        const st = booking?.status || (isBooked ? "booked" : "available");
        const stLabel =
          st === "no_show"
            ? copy.statusNoShow
            : st === "booked"
            ? copy.statusBooked
            : copy.statusAvailable;

        return [
          time,
          isBooked ? booking.name || "(Demo guest)" : "—",
          isBooked ? booking.email || "demo@example.com" : "—",
          stLabel,
        ];
      }),
      styles: { fontSize: 9 },
    });

    nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : nextY + 20;

    doc.setFontSize(12);
    doc.text(copy.pdfSectionUpcoming, 14, nextY);
    nextY += 4;

    if (upcomingBookings.length === 0) {
      doc.setFontSize(10);
      doc.text(copy.upcomingEmpty, 14, nextY + 4);
    } else {
      autoTable(doc, {
        startY: nextY,
        head: [[copy.timeCol, "Date", copy.nameCol, copy.emailCol]],
        body: upcomingBookings.map((item) => [
          item.time,
          item.date.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          item.name,
          item.email,
        ]),
        styles: { fontSize: 9 },
      });
    }

    const fileNameSafe = dateKey(selectedDate);
    doc.save(`bookings-${fileNameSafe}.pdf`);
  };

  return (
    <div
      className={
        "rounded-3xl p-4 md:p-6 lg:p-8 min-h-[540px] md:min-h-[620px] " +
        panelBg
      }
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400 flex items-center gap-2">
            <IconMap className="h-4 w-4" />
            <span>{copy.adminTitle}</span>
          </p>
          <p className={"text-xs md:text-sm mt-2 max-w-2xl " + mutedText}>
            {copy.adminSub}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportPdf}
            className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full border border-slate-300 bg-white/90 text-slate-800 hover:border-sky-500 hover:text-sky-700 hover:bg-sky-50"
          >
            <span>⬇</span>
            <span>{copy.exportPdf}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <AdminCalendar
            lang={lang}
            palette={palette}
            copy={copy}
            monthName={monthName}
            dayNames={dayNames}
            cells={cells}
            today={today}
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(startOfDay(d))}
            availability={availability}
            slotTimes={slotTimes}
            isSameDay={isSameDay}
          />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-24 self-start">
          <AdminDayOverviewCard
            lang={lang}
            copy={copy}
            mutedText={mutedText}
            labelText={labelText}
            selectedDate={selectedDate}
            totalSlots={totalSlots}
            bookedCount={bookedCount}
            remaining={remaining}
          />

          <AdminBookingsTable
            copy={copy}
            labelText={labelText}
            mutedText={mutedText}
            selectedDate={selectedDate}
            infoForSelected={infoForSelected}
            slotTimes={slotTimes}
            selectedDayKey={selectedDate ? dateKey(selectedDate) : null}
            onOpenNoShow={onOpenNoShow}
            onSetBookingStatus={onSetBookingStatus}
          />

          <div className="grid grid-cols-1 gap-4">
            <AdminUpcomingBookings
              lang={lang}
              copy={copy}
              labelText={labelText}
              mutedText={mutedText}
              upcomingBookings={upcomingBookings}
            />

            <BookingEmailPreview
              palette={palette}
              selectedDate={selectedDate}
              infoForSelected={infoForSelected}
              slotTimes={slotTimes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
