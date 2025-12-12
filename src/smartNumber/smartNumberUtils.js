// src/smartNumber/smartNumberUtils.js
import { CALL_STATUS, OUTCOME } from "./smartNumberSeed";

export function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDateTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(sec) {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m <= 0) return `${s}s`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function isMissedStatus(status) {
  return (
    status === CALL_STATUS.NO_ANSWER ||
    status === CALL_STATUS.BUSY ||
    status === CALL_STATUS.FAILED ||
    status === CALL_STATUS.VOICEMAIL
  );
}

export function outcomeLabel(t, outcome) {
  switch (outcome) {
    case OUTCOME.BOOKED:
      return t.smartNumber_outcome_booked;
    case OUTCOME.QUOTE:
      return t.smartNumber_outcome_quote;
    case OUTCOME.CALLBACK:
      return t.smartNumber_outcome_callback;
    case OUTCOME.NOTFIT:
      return t.smartNumber_outcome_notfit;
    default:
      return t.smartNumber_outcome_none;
  }
}

export function statusLabel(t, status) {
  switch (status) {
    case CALL_STATUS.RINGING:
      return t.smartNumber_status_ringing;
    case CALL_STATUS.ANSWERED:
      return t.smartNumber_status_answered;
    case CALL_STATUS.NO_ANSWER:
      return t.smartNumber_status_noAnswer;
    case CALL_STATUS.BUSY:
      return t.smartNumber_status_busy;
    case CALL_STATUS.FAILED:
      return t.smartNumber_status_failed;
    case CALL_STATUS.VOICEMAIL:
      return t.smartNumber_status_voicemail;
    default:
      return status;
  }
}

export function makeAutoTextMessage({ isAfterHours, reasonStatus }) {
  const base = isAfterHours
    ? "We’re currently closed. You can book here: "
    : "Sorry we missed your call! Book here: ";

  const link = "https://indigonord.demo/booking";

  if (reasonStatus === CALL_STATUS.BUSY) {
    return (
      (isAfterHours ? "We’re closed. " : "We’re currently on another call. ") +
      `Book here or reply with a good time: ${link}`
    );
  }

  if (reasonStatus === CALL_STATUS.FAILED) {
    return `${base}${link}`;
  }

  return `${base}${link}`;
}

export function withinMinutes(tsA, tsB, minutes) {
  return Math.abs(tsA - tsB) <= minutes * 60 * 1000;
}

export function isAfterHoursLocal(ts) {
  const d = new Date(ts);
  const day = d.getDay(); // 0 Sun
  const hour = d.getHours();
  // Simple demo rule: Mon-Fri 8am-6pm
  const isWeekend = day === 0 || day === 6;
  if (isWeekend) return true;
  return hour < 8 || hour >= 18;
}
