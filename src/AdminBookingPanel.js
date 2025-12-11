// src/AdminBookingPanel.js
import React from "react";
import { IconMap } from "./icons";
import BookingEmailPreview from "./BookingEmailPreview";

// PDF libs
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// NEW child components
import AdminCalendar from "./AdminCalendar";
import AdminDayOverviewCard from "./AdminDayOverviewCard";
import AdminBookingsTable from "./AdminBookingsTable";
import AdminUpcomingBookings from "./AdminUpcomingBookings";

const slotTimes = ["09:00", "10:00", "13:00", "14:00", "15:30"];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export { dateKey, startOfDay, slotTimes }; // handy if you ever want to reuse

export default function AdminBookingPanel({
  lang,
  palette,
  availability,
  onCancelBooking, // 👈 NEW – callback from BookingDemo
}) {
  const copy = {
    en: {
      adminTitle: "Admin view – bookings overview",
      adminSub:
        "Click a date to see who booked, which times are still open, and a sample email summary.",
      pickDateLabel: "Pick a date",
      monthLabelPrefix: "",
      todayLabel: "Today",
      fullLabel: "Full",
      slotsLabel: "slots",
      oneSlotLabel: "slot",
      noDateSelected:
        "Choose a date on the left to inspect its bookings and availability.",
      statsTitle: "Day overview",
      totalSlots: "Total slots",
      bookedSlots: "Booked",
      remainingSlots: "Remaining",
      bookingsTitle: "Bookings for this date",
      timeCol: "Time",
      nameCol: "Name",
      emailCol: "Email",
      statusCol: "Status",
      statusBooked: "Booked",
      statusAvailable: "Available",
      cancelLabel: "Cancel booking",
      upcomingTitle: "Next 7 days – upcoming bookings",
      upcomingEmpty:
        "No demo bookings yet. In production you’d see all upcoming appointments here.",
      exportPdf: "Export PDF (demo)",
      pdfTitlePrefix: "Bookings –",
      pdfSectionDay: "Day overview",
      pdfSectionBookings: "Bookings for this date",
      pdfSectionUpcoming: "Next 7 days – upcoming bookings",
      pdfNoDate: "No date selected – nothing to export.",
    },
    fr: {
      adminTitle: "Vue admin – aperçu des réservations",
      adminSub:
        "Cliquez sur une date pour voir qui a réservé, les heures encore libres et un exemple de courriel.",
      pickDateLabel: "Choisissez une date",
      monthLabelPrefix: "",
      todayLabel: "Aujourd’hui",
      fullLabel: "Complet",
      slotsLabel: "plages",
      oneSlotLabel: "plage",
      noDateSelected:
        "Choisissez une date à gauche pour voir ses réservations et disponibilités.",
      statsTitle: "Aperçu de la journée",
      totalSlots: "Plages totales",
      bookedSlots: "Réservées",
      remainingSlots: "Restantes",
      bookingsTitle: "Réservations pour cette date",
      timeCol: "Heure",
      nameCol: "Nom",
      emailCol: "Courriel",
      statusCol: "Statut",
      statusBooked: "Réservé",
      statusAvailable: "Disponible",
      cancelLabel: "Annuler",
      upcomingTitle: "7 prochains jours – réservations à venir",
      upcomingEmpty:
        "Aucune réservation de démo pour l’instant. En production, vous verriez vos rendez-vous ici.",
      exportPdf: "Exporter en PDF (démo)",
      pdfTitlePrefix: "Réservations –",
      pdfSectionDay: "Aperçu de la journée",
      pdfSectionBookings: "Réservations pour cette date",
      pdfSectionUpcoming: "7 prochains jours – réservations à venir",
      pdfNoDate: "Aucune date sélectionnée – rien à exporter.",
    },
  }[lang || "en"];

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
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Build a 7-day list of upcoming bookings from availability
  const upcomingBookings = React.useMemo(() => {
    if (!availability) return [];
    const now = startOfDay(new Date());
    const sevenDays = new Date(now);
    sevenDays.setDate(sevenDays.getDate() + 7);

    const items = [];

    Object.entries(availability).forEach(([key, info]) => {
      if (!info || !info.takenSlots || info.takenSlots.length === 0) return;
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
      if (a.date.getTime() !== b.date.getTime()) {
        return a.date.getTime() - b.date.getTime();
      }
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

  // ---------------- PDF EXPORT HANDLER ----------------
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

    // Title
    doc.setFontSize(16);
    doc.text(`${copy.pdfTitlePrefix} ${dateLabel}`, 14, 18);

    // Day overview
    doc.setFontSize(12);
    doc.text(copy.pdfSectionDay, 14, 28);

    autoTable(doc, {
      startY: 32,
      head: [[copy.totalSlots, copy.bookedSlots, copy.remainingSlots]],
      body: [[totalSlots, bookedCount, remaining]],
      styles: { fontSize: 10 },
    });

    let nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 50;

    // Bookings table
    doc.setFontSize(12);
    doc.text(copy.pdfSectionBookings, 14, nextY);
    nextY += 4;

    autoTable(doc, {
      startY: nextY,
      head: [[copy.timeCol, copy.nameCol, copy.emailCol, copy.statusCol]],
      body: slotTimes.map((time) => {
        const booking = infoForSelected?.bookings?.[time];
        const isBooked = !!booking;
        return [
          time,
          isBooked ? booking.name || "(Demo guest)" : "—",
          isBooked ? booking.email || "demo@example.com" : "—",
          isBooked ? copy.statusBooked : copy.statusAvailable,
        ];
      }),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [33, 150, 243] },
    });

    nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : nextY + 20;

    // Upcoming bookings (if any)
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
  // ---------------- END PDF EXPORT HANDLER ----------------

  const header = (
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

      {/* Export PDF button */}
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
  );

  return (
    <div
      className={
        "rounded-3xl p-4 md:p-6 lg:p-8 min-h-[540px] md:min-h-[620px] " +
        panelBg
      }
    >
      {header}

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar column */}
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

        {/* Details + email column */}
        <div className="lg:w-1/2 flex flex-col gap-4">
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
            onCancelBooking={onCancelBooking} // 👈 where cancel logic is hooked
          />

          <div className="grid grid-cols-1 gap-4">
            <AdminUpcomingBookings
              lang={lang}
              copy={copy}
              labelText={labelText}
              mutedText={mutedText}
              upcomingBookings={upcomingBookings}
            />

            {/* Morning email preview using REAL data + palette */}
            <BookingEmailPreview
              lang={lang}
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
