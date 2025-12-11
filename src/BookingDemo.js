// src/BookingDemo.js
import React from "react";
import { Link } from "react-router-dom";
import { IconMap, IconEnvelope, IconBolt } from "./icons";
import AdminBookingPanel from "./AdminBookingPanel";
import DailyEmailDemo from "./DailyEmailDemo";

const slotTimes = ["09:00", "10:00", "13:00", "14:00", "15:30"];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// For keying dates like "2025-12-09"
function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildMonthAvailability(baseDate) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth(); // 0–11

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();

  const today = startOfDay(new Date());
  const availability = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const key = dateKey(d);

    if (startOfDay(d) < today) {
      availability[key] = {
        totalSlots: 0,
        remainingSlots: 0,
        takenSlots: [],
        bookings: {}, // 👈 NEW
      };
    } else {
      availability[key] = {
        totalSlots: slotTimes.length,
        remainingSlots: slotTimes.length,
        takenSlots: [],
        bookings: {}, // 👈 NEW
      };
    }
  }

  return availability;
}

/** ---- Style palettes for the demo ---- */
const palettes = {
  indigo: {
    label: { en: "Indigo Nord", fr: "Indigo Nord" },
    panelBg: "bg-slate-900 text-slate-50 border border-slate-800 shadow-2xl",
    calendarPast:
      "bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed",
    calendarSelected: "bg-sky-500 border-sky-300 text-slate-950 shadow-lg",
    calendarAvailable:
      "bg-slate-900 border-slate-700 text-slate-50 hover:bg-slate-800",
    timesPanelBg: "bg-slate-900/90 border border-slate-700",
    formPanelBg: "bg-slate-900 border border-slate-700",
    timeDisabled:
      "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed line-through",
    timeSelected: "bg-sky-500 border-sky-300 text-slate-950 shadow-lg",
    timeAvailable:
      "bg-slate-900 border-slate-700 text-slate-50 hover:bg-slate-800 cursor-pointer",
    saveBtnDisabled: "bg-slate-700 text-slate-400 cursor-not-allowed",
    saveBtnEnabled: "bg-sky-500 hover:bg-sky-400 text-slate-950",

    // NEW
    labelText: "text-slate-100",
    inputField: "border-slate-600 bg-slate-950 text-slate-50",
    selectedTimeBox: "border-slate-600 bg-slate-950 text-slate-300",
    mutedText: "text-slate-300",
    backToCalendarBtn:
      "border-slate-400/70 bg-slate-100/10 hover:bg-slate-200/20 text-slate-100",
  },

  light: {
    label: { en: "Light cards", fr: "Cartes claires" },
    panelBg: "bg-white text-slate-900 border border-slate-200 shadow-xl",
    calendarPast:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed",
    calendarSelected: "bg-sky-600 border-sky-500 text-white shadow-lg",
    calendarAvailable:
      "bg-slate-50 border-slate-200 text-slate-900 hover:bg-sky-50",
    timesPanelBg: "bg-slate-50 border border-slate-200",
    formPanelBg: "bg-slate-50 border border-slate-200",
    timeDisabled:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through",
    timeSelected: "bg-sky-600 border-sky-500 text-white shadow-lg",
    timeAvailable:
      "bg-slate-50 border-slate-200 text-slate-900 hover:bg-sky-50 cursor-pointer",
    saveBtnDisabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
    saveBtnEnabled: "bg-sky-600 hover:bg-sky-500 text-white",

    // NEW – white boxes, black text, better contrast
    labelText: "text-slate-800",
    inputField: "border-slate-300 bg-white text-slate-900",
    selectedTimeBox: "border-slate-300 bg-white text-slate-700",
    mutedText: "text-slate-600",
    backToCalendarBtn:
      "border-slate-500 bg-white hover:bg-slate-100 text-slate-800",
  },

  mcd: {
    label: { en: "Fast food", fr: "Restauration" },
    panelBg: "bg-red-600 text-white border border-red-700 shadow-2xl",
    calendarPast: "bg-red-400 border-red-500 text-red-200 cursor-not-allowed",
    calendarSelected: "bg-yellow-400 border-yellow-300 text-red-900 shadow-lg",
    calendarAvailable:
      "bg-white border-yellow-400 text-red-700 hover:bg-yellow-50",
    timesPanelBg: "bg-white border border-yellow-400",
    formPanelBg: "bg-white border border-yellow-400",
    timeDisabled:
      "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through",
    timeSelected: "bg-yellow-400 border-yellow-300 text-red-900 shadow-lg",
    timeAvailable:
      "bg-white border-yellow-400 text-red-700 hover:bg-yellow-50 cursor-pointer",
    saveBtnDisabled: "bg-red-300 text-red-100 cursor-not-allowed",
    saveBtnEnabled: "bg-yellow-400 hover:bg-yellow-300 text-red-900",

    // NEW – white boxes, red text for the theme
    labelText: "text-red-900",
    inputField: "border-yellow-400 bg-white text-red-900",
    selectedTimeBox: "border-yellow-400 bg-white text-red-800",
    mutedText: "text-red-900",
    backToCalendarBtn:
      "border-yellow-400 bg-white hover:bg-yellow-50 text-red-800",
  },

  facebook: {
    label: { en: "Social / SaaS", fr: "Réseaux sociaux" },
    panelBg: "bg-white text-slate-900 border border-slate-200 shadow-xl",
    calendarPast:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed",
    calendarSelected: "bg-blue-600 border-blue-500 text-white shadow-lg",
    calendarAvailable:
      "bg-white border-slate-200 text-slate-900 hover:bg-blue-50",
    timesPanelBg: "bg-slate-50 border border-slate-200",
    formPanelBg: "bg-slate-50 border border-slate-200",
    timeDisabled:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through",
    timeSelected: "bg-blue-600 border-blue-500 text-white shadow-lg",
    timeAvailable:
      "bg-white border-slate-200 text-slate-900 hover:bg-blue-50 cursor-pointer",
    saveBtnDisabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
    saveBtnEnabled: "bg-blue-600 hover:bg-blue-500 text-white",

    // NEW – white boxes, dark text, stronger button
    labelText: "text-slate-800",
    inputField: "border-slate-300 bg-white text-slate-900",
    selectedTimeBox: "border-slate-300 bg-white text-slate-700",
    mutedText: "text-slate-600",
    backToCalendarBtn:
      "border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700",
  },

  dairy: {
    label: { en: "Ice cream", fr: "Crèmerie" },
    panelBg: "bg-blue-600 text-white border border-blue-700 shadow-2xl",
    calendarPast:
      "bg-blue-400 border-blue-500 text-blue-200 cursor-not-allowed",
    calendarSelected: "bg-red-500 border-red-400 text-white shadow-lg",
    calendarAvailable: "bg-white border-red-500 text-blue-700 hover:bg-red-50",
    timesPanelBg: "bg-white border border-red-500",
    formPanelBg: "bg-white border border-red-500",
    timeDisabled:
      "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through",
    timeSelected: "bg-red-500 border-red-400 text-white shadow-lg",
    timeAvailable:
      "bg-white border-red-500 text-blue-700 hover:bg-red-50 cursor-pointer",
    saveBtnDisabled: "bg-blue-300 text-blue-100 cursor-not-allowed",
    saveBtnEnabled: "bg-red-500 hover:bg-red-400 text-white",

    // NEW – white boxes with that blue text you wanted
    labelText: "text-blue-800",
    inputField: "border-red-500 bg-white text-blue-700",
    selectedTimeBox: "border-red-500 bg-white text-blue-700",
    mutedText: "text-blue-700",
    backToCalendarBtn: "border-red-500 bg-white hover:bg-red-50 text-blue-700",
  },
};

export default function BookingDemo() {
  const [lang, setLang] = React.useState("en");
  const [styleId, setStyleId] = React.useState("indigo"); // palette toggle
  const palette = palettes[styleId];
  const [mode, setMode] = React.useState("booking"); // "booking" | "admin"
  const copy = {
    en: {
      pageTitle: "Booking demo – see it in action",
      pageSub:
        "This is a fake booking page to show how Indigo Nord could automate scheduling for your business.",
      pickDateLabel: "Pick a date",
      monthLabelPrefix: "",
      backToSite: "Back to site",
      availableTimesTitle: "Available times",
      chooseSlotHelp:
        "Choose a time slot to hold it while you fill out the form.",
      realSystemNote:
        "In a real system, this would sync with your tools (calendar, CRM, reminders).",
      contactPanelTitle: "Contact details (demo only)",
      nameLabel: "Name",
      emailLabel: "Email",
      selectedTimeLabel: "Selected time",
      selectedTimePlaceholder: "Choose a time slot above",
      saveDemo: "Save (demo)",
      fullLabel: "Full",
      slotsLabel: "slots",
      oneSlotLabel: "slot",
      calendarTitle: "Calendar",
      todayLabel: "Today",
      backToCalendar: "← Calendar",
      noSlotsToday: "No remaining time slots for this date.",
      savedToast:
        "Saved in the demo. The slot disappears from the calendar on this device only.",
      styleLabel: "Style",
    },
    fr: {
      pageTitle: "Démo de réservation – en action",
      pageSub:
        "Voici une fausse page de réservation pour montrer comment Indigo Nord pourrait automatiser votre horaire.",
      pickDateLabel: "Choisissez une date",
      monthLabelPrefix: "",
      backToSite: "Retour au site",
      availableTimesTitle: "Heures disponibles",
      chooseSlotHelp:
        "Choisissez une heure pour la réserver pendant que vous remplissez le formulaire.",
      realSystemNote:
        "Dans un vrai système, ceci serait synchronisé avec vos outils (calendrier, CRM, rappels).",
      contactPanelTitle: "Coordonnées (démo seulement)",
      nameLabel: "Nom",
      emailLabel: "Courriel",
      selectedTimeLabel: "Heure choisie",
      selectedTimePlaceholder: "Choisissez une heure ci-dessus",
      saveDemo: "Enregistrer (démo)",
      fullLabel: "Complet",
      slotsLabel: "plages",
      oneSlotLabel: "plage",
      calendarTitle: "Calendrier",
      todayLabel: "Aujourd’hui",
      backToCalendar: "← Calendrier",
      noSlotsToday: "Aucune plage restante pour cette date.",
      savedToast:
        "Enregistré dans la démo. La plage disparaît du calendrier sur cet appareil seulement.",
      styleLabel: "Style",
    },
  };

  const c = copy[lang];

  const [view, setView] = React.useState("calendar"); // "calendar" | "times"

  const [currentMonth] = React.useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [availability, setAvailability] = React.useState(() =>
    buildMonthAvailability(new Date())
  );

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [toast, setToast] = React.useState("");

  const today = startOfDay(new Date());

  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Build month grid (Sun–Sat, 6 rows max)
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekday = firstDayOfMonth.getDay(); // 0–6 (Sun–Sat)

  const monthName = currentMonth.toLocaleString(
    lang === "en" ? "en-CA" : "fr-CA",
    { month: "long", year: "numeric" }
  );

  const dayNames =
    lang === "en"
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const cells = [];
  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  function handleDateClick(date) {
    if (!date) return;
    const dayKey = dateKey(date);
    const info = availability[dayKey];
    if (!info || info.remainingSlots === 0) return;
    if (startOfDay(date) < today) return;

    setSelectedDate(date);
    setSelectedSlot(null);
    setView("times");
  }

  function handleSaveDemo(e) {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    const key = dateKey(selectedDate);
    setAvailability((prev) => {
      const existing = prev[key];
      if (!existing) return prev;

      // already taken? do nothing
      if (existing.takenSlots.includes(selectedSlot)) return prev;

      const updated = {
        ...existing,
        remainingSlots: Math.max(existing.remainingSlots - 1, 0),
        takenSlots: [...existing.takenSlots, selectedSlot],
        bookings: {
          ...existing.bookings,
          [selectedSlot]: {
            name,
            email,
            createdAt: new Date().toISOString(),
          },
        },
      };

      return {
        ...prev,
        [key]: updated,
      };
    });

    setToast(c.savedToast);
    setView("calendar");
    setSelectedSlot(null);
    setSelectedDate(null);
    setName("");
    setEmail("");
  }
  function handleAdminCancelBooking(dayKey, time) {
    setAvailability((prev) => {
      const existing = prev[dayKey];
      if (!existing || !existing.bookings || !existing.bookings[time]) {
        return prev;
      }

      const newBookings = { ...existing.bookings };
      delete newBookings[time];

      const newTakenSlots = existing.takenSlots.filter((t) => t !== time);

      const updated = {
        ...existing,
        bookings: newBookings,
        takenSlots: newTakenSlots,
        remainingSlots: Math.min(
          (existing.remainingSlots || 0) + 1,
          existing.totalSlots || slotTimes.length
        ),
      };

      return {
        ...prev,
        [dayKey]: updated,
      };
    });
  }

  // Helper to know if a specific slot time is in the past (for today)
  function isSlotInPast(date, timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(h, m, 0, 0);
    return slotDateTime < new Date();
  }

  const panelBg = palette.panelBg;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Page header */}
      <header className="border-b border-slate-200/70 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
              <IconMap className="h-6 w-6 text-sky-600 dark:text-sky-300" />
              <span>{c.pageTitle}</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
              {c.pageSub}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center gap-1 text-[11px] rounded-full px-1 py-0.5 border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90">
              <button
                onClick={() => setLang("en")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (lang === "en"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                }
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (lang === "fr"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                }
              >
                FR
              </button>
            </div>

            {/* Style / palette toggle */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] rounded-full px-2 py-0.5 border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90">
              <span className="text-slate-500 mr-1">{c.styleLabel}</span>
              <button
                onClick={() => setStyleId("indigo")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (styleId === "indigo"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                }
              >
                {palettes.indigo.label[lang]}
              </button>
              <button
                onClick={() => setStyleId("light")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (styleId === "light"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                }
              >
                {palettes.light.label[lang]}
              </button>
              <button
                onClick={() => setStyleId("mcd")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (styleId === "mcd"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600")
                }
              >
                {palettes.mcd.label[lang]}
              </button>

              <button
                onClick={() => setStyleId("facebook")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (styleId === "facebook"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600")
                }
              >
                {palettes.facebook.label[lang]}
              </button>

              <button
                onClick={() => setStyleId("dairy")}
                className={
                  "px-2 py-0.5 rounded-full transition " +
                  (styleId === "dairy"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-600")
                }
              >
                {palettes.dairy.label[lang]}
              </button>
              <div className="hidden sm:flex items-center gap-1 text-[11px] rounded-full px-2 py-0.5 border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900/90">
                <span className="text-slate-500 mr-1">
                  {lang === "en" ? "View" : "Vue"}
                </span>
                <button
                  onClick={() => setMode("booking")}
                  className={
                    "px-2 py-0.5 rounded-full transition " +
                    (mode === "booking"
                      ? "bg-sky-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                  }
                >
                  {lang === "en" ? "Booking" : "Réservation"}
                </button>
                <button
                  onClick={() => setMode("admin")}
                  className={
                    "px-2 py-0.5 rounded-full transition " +
                    (mode === "admin"
                      ? "bg-sky-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                  }
                >
                  {lang === "en" ? "Admin" : "Admin"}
                </button>
                <button
                  onClick={() => setMode("email")}
                  className={
                    "px-2 py-0.5 rounded-full transition " +
                    (mode === "email"
                      ? "bg-sky-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-200")
                  }
                >
                  {lang === "en" ? "Daily email" : "Courriel quotidien"}
                </button>
              </div>
            </div>

            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <span>←</span>
              <span>{c.backToSite}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main panel */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {mode === "booking" && (
          <div
            className={
              "rounded-3xl p-4 md:p-6 lg:p-8 min-h-[540px] md:min-h-[620px] " +
              panelBg
            }
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  {c.pickDateLabel}
                </p>
                <p className="text-lg md:text-xl font-semibold mt-1">
                  {c.monthLabelPrefix} {monthName}
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
                  {c.backToCalendar}
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
                {/* CALENDAR PANEL */}
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
                        return (
                          <div key={idx} className="h-[68px] md:h-[88px]" />
                        );
                      }

                      const key = dateKey(date);
                      const info = availability[key];
                      const isPastDay = startOfDay(date) < today;
                      const isToday = isSameDay(date, today);
                      const remaining = info ? info.remainingSlots : 0;
                      const isFull = remaining === 0;

                      const baseClasses =
                        "flex flex-col items-center justify-center rounded-2xl h-[72px] md:h-[96px] lg:h-[110px] px-1 md:px-2 cursor-pointer transition-all select-none border";

                      let colorClasses = "";
                      if (isPastDay || isFull) {
                        colorClasses = palette.calendarPast;
                      } else if (
                        selectedDate &&
                        isSameDay(date, selectedDate)
                      ) {
                        colorClasses = palette.calendarSelected;
                      } else {
                        colorClasses = palette.calendarAvailable;
                      }

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleDateClick(date)}
                          disabled={isPastDay || isFull}
                          className={baseClasses + " " + colorClasses}
                        >
                          <span className="text-lg md:text-2xl font-semibold leading-none">
                            {date.getDate()}
                          </span>
                          <span className="mt-1 text-[11px] md:text-xs">
                            {isPastDay || isFull
                              ? c.fullLabel
                              : remaining === 1
                              ? `1 ${c.oneSlotLabel}`
                              : `${remaining} ${c.slotsLabel}`}
                          </span>
                          {isToday && (
                            <span className="mt-0.5 text-[10px] text-emerald-400 font-medium uppercase tracking-wide">
                              {c.todayLabel}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TIMES PANEL */}
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
                        <span>{c.availableTimesTitle}</span>
                      </p>
                      {selectedDate ? (
                        <>
                          <p
                            className={
                              "text-xs md:text-sm mb-4 " + palette.mutedText
                            }
                          >
                            {c.chooseSlotHelp}
                          </p>

                          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                            {slotTimes.map((time) => {
                              if (!selectedDate) return null;
                              const key = dateKey(selectedDate);
                              const info = availability[key];
                              const isTaken =
                                info && info.takenSlots.includes(time);
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

                          {selectedDate && (
                            <p className={"text-xs " + palette.mutedText}>
                              {c.realSystemNote}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className={"text-sm " + palette.mutedText}>
                          {lang === "en"
                            ? "Choose a date on the left to see available times."
                            : "Choisissez une date à gauche pour voir les heures disponibles."}
                        </p>
                      )}

                      {selectedDate &&
                        availability[dateKey(selectedDate)] &&
                        availability[dateKey(selectedDate)].remainingSlots ===
                          0 && (
                          <p className="mt-3 text-xs text-rose-300">
                            {c.noSlotsToday}
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
                        <span>{c.contactPanelTitle}</span>
                      </p>

                      <form
                        onSubmit={handleSaveDemo}
                        className="flex flex-col gap-3 md:gap-4 text-sm md:text-base"
                      >
                        <div className="flex flex-col gap-1 text-left">
                          <label
                            className={
                              palette.labelText + " text-xs md:text-sm"
                            }
                          >
                            {c.nameLabel}
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
                            className={
                              palette.labelText + " text-xs md:text-sm"
                            }
                          >
                            {c.emailLabel}
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
                            className={
                              palette.labelText + " text-xs md:text-sm"
                            }
                          >
                            {c.selectedTimeLabel}
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
                              : c.selectedTimePlaceholder}
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
                          {c.saveDemo}
                        </button>

                        <p
                          className={
                            "text-[10px] md:text-[11px] text-left mt-1 " +
                            palette.mutedText
                          }
                        >
                          {lang === "en"
                            ? "This is only a visual demo. Nothing is actually booked or sent."
                            : "Ceci est seulement une démo visuelle. Aucun rendez-vous réel n’est créé."}
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
        )}
        {mode === "admin" && (
          <AdminBookingPanel
            lang={lang}
            palette={palette}
            availability={availability}
            onCancelBooking={handleAdminCancelBooking} //
          />
        )}

        {mode === "email" && <DailyEmailDemo lang={lang} palette={palette} />}
      </main>
    </div>
  );
}
