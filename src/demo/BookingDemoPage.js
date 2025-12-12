// src/demo/BookingDemoPage.js
import React from "react";
import { IconMap } from "../icons";
import { useLangTheme } from "../landing/LangThemeProvider";
import { palettes, slotTimes } from "./demoPalettes";
import BookingDemoHeader from "./BookingDemoHeader";
import BookingBookingView from "./BookingBookingView";
import AdminBookingPanel from "./AdminBookingPanel";
import DailyEmailDemo from "./DailyEmailDemo";
import NoShowRecoveryDrawer from "./NoShowRecoveryDrawer";

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildMonthAvailability(baseDate) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

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
        bookings: {},
      };
    } else {
      availability[key] = {
        totalSlots: slotTimes.length,
        remainingSlots: slotTimes.length,
        takenSlots: [],
        bookings: {},
      };
    }
  }

  return availability;
}

function makeNoShowMessage({ lang, dateLabel, time }) {
  if (lang === "fr") {
    return (
      `Salut! 👋\n\n` +
      `On dirait qu’on s’est manqué pour votre rendez-vous (${dateLabel} à ${time}).\n\n` +
      `Si vous voulez, répondez à ce message et je vous propose un autre créneau.\n\n` +
      `— (Démo Indigo Nord)`
    );
  }

  return (
    `Hi! 👋\n\n` +
    `Looks like we missed each other for your appointment (${dateLabel} at ${time}).\n\n` +
    `If you’d like, reply here and I can offer a new time.\n\n` +
    `— (Indigo Nord demo)`
  );
}

export default function BookingDemoPage() {
  const { lang, t, setLang } = useLangTheme();

  const [styleId, setStyleId] = React.useState("indigo");
  const styleIds = React.useMemo(() => Object.keys(palettes), []);
  const palette = palettes[styleId] || palettes[styleIds[0]];

  const [mode, setMode] = React.useState("booking"); // booking | admin | email
  const [view, setView] = React.useState("calendar"); // calendar | times

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

  // Drawer state (ONLY no-show)
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMeta, setDrawerMeta] = React.useState(null); // { dayKey, time, dateLabel }
  const [drawerBooking, setDrawerBooking] = React.useState(null);

  const today = startOfDay(new Date());

  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  // calendar helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekday = firstDayOfMonth.getDay();

  const monthName = currentMonth.toLocaleString(
    lang === "en" ? "en-CA" : "fr-CA",
    { month: "long", year: "numeric" }
  );

  const dayNames =
    lang === "en"
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

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
      if (existing.takenSlots.includes(selectedSlot)) return prev;

      const bookingRecord = {
        name,
        email,
        createdAt: new Date().toISOString(),
        status: "booked",
        noShow: {
          autoMessageSent: false,
          autoMessage: null,
        },
      };

      const updated = {
        ...existing,
        remainingSlots: Math.max(existing.remainingSlots - 1, 0),
        takenSlots: [...existing.takenSlots, selectedSlot],
        bookings: {
          ...existing.bookings,
          [selectedSlot]: bookingRecord,
        },
      };

      return { ...prev, [key]: updated };
    });

    setToast(t.booking_saved_toast);
    setView("calendar");
    setSelectedSlot(null);
    setSelectedDate(null);
    setName("");
    setEmail("");
  }

  function handleAdminCancelBooking(dayKey, time) {
    setAvailability((prev) => {
      const existing = prev[dayKey];
      if (!existing || !existing.bookings || !existing.bookings[time])
        return prev;

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

      return { ...prev, [dayKey]: updated };
    });
  }

  function isSlotInPast(date, timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(h, m, 0, 0);
    return slotDateTime < new Date();
  }

  // ✅ This is the one handler your AdminBookingsTable should use
  function openNoShow(dayKey, time) {
    const dateLabel = new Date(dayKey + "T00:00:00").toLocaleDateString(
      lang === "fr" ? "fr-CA" : "en-CA",
      { weekday: "long", month: "short", day: "numeric" }
    );

    const msg = makeNoShowMessage({ lang, dateLabel, time });

    // optimistic booking for instant drawer render
    const current = availability?.[dayKey]?.bookings?.[time] || null;
    const optimistic = current
      ? {
          ...current,
          status: "no_show",
          noShow: {
            ...(current.noShow || {}),
            autoMessageSent: false,
            autoMessage: {
              channel: "sms",
              to: current.email || "demo@example.com",
              message: msg,
              sentTs: Date.now(),
            },
          },
        }
      : null;

    setDrawerMeta({ dayKey, time, dateLabel });
    setDrawerBooking(optimistic);
    setDrawerOpen(true);

    // persist to availability
    setAvailability((prev) => {
      const day = prev[dayKey];
      if (!day) return prev;

      const existing = day.bookings?.[time];
      if (!existing) return prev;

      const nextBooking = {
        ...existing,
        status: "no_show",
        noShow: {
          ...(existing.noShow || {}),
          autoMessageSent: false,
          autoMessage: {
            channel: "sms",
            to: existing.email || "demo@example.com",
            message: msg,
            sentTs: Date.now(),
          },
        },
      };

      return {
        ...prev,
        [dayKey]: {
          ...day,
          bookings: { ...day.bookings, [time]: nextBooking },
        },
      };
    });
  }

  // Optional wrapper if any component still calls onSetBookingStatus(dayKey,time,"no_show")
  function setBookingStatus(dayKey, time, status) {
    if (status !== "no_show") return;
    openNoShow(dayKey, time);
  }

  function sendAutoMessageNow() {
    const meta = drawerMeta;
    if (!meta?.dayKey || !meta?.time) return;

    setAvailability((prev) => {
      const day = prev[meta.dayKey];
      if (!day) return prev;

      const existing = day.bookings?.[meta.time];
      if (!existing) return prev;

      const updated = {
        ...existing,
        noShow: {
          ...(existing.noShow || {}),
          autoMessageSent: true,
          sentAt: Date.now(),
        },
      };

      return {
        ...prev,
        [meta.dayKey]: {
          ...day,
          bookings: { ...day.bookings, [meta.time]: updated },
        },
      };
    });

    // update drawer immediately
    setDrawerBooking((b) =>
      b ? { ...b, noShow: { ...(b.noShow || {}), autoMessageSent: true } } : b
    );

    setToast(
      lang === "fr" ? "SMS envoyé (simulation)." : "SMS sent (simulated)."
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <BookingDemoHeader
        lang={lang}
        setLang={setLang}
        t={t}
        styleId={styleId}
        setStyleId={setStyleId}
        mode={mode}
        setMode={setMode}
        styleIds={styleIds}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {mode === "booking" && (
          <BookingBookingView
            lang={lang}
            t={t}
            palette={palette}
            monthName={monthName}
            dayNames={dayNames}
            cells={cells}
            today={today}
            availability={availability}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            setSelectedDate={setSelectedDate}
            setSelectedSlot={setSelectedSlot}
            view={view}
            setView={setView}
            handleDateClick={handleDateClick}
            handleSaveDemo={handleSaveDemo}
            isSlotInPast={isSlotInPast}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            toast={toast}
            IconMap={IconMap}
          />
        )}

        {mode === "admin" && (
          <AdminBookingPanel
            palette={palette}
            availability={availability}
            onCancelBooking={handleAdminCancelBooking}
            onOpenNoShow={openNoShow}
            onSetBookingStatus={setBookingStatus}
          />
        )}

        {mode === "email" && (
          <DailyEmailDemo palette={palette} availability={availability} />
        )}

        {toast && (
          <div className="mt-4 text-xs md:text-sm text-emerald-300 bg-emerald-900/30 border border-emerald-700 rounded-xl px-3 py-2 inline-flex items-center gap-2">
            <span>✔</span>
            <span>{toast}</span>
          </div>
        )}
      </main>

      <NoShowRecoveryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        palette={palette}
        bookingMeta={drawerMeta}
        booking={drawerBooking}
        onSendAutoMessage={sendAutoMessageNow}
      />
    </div>
  );
}
