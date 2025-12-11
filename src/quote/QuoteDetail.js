// src/quote/QuoteDetail.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";
import {
  useQuoteDemo,
  formatDate,
  calcAgeDays,
  computeNextStep,
} from "./QuoteContext";

export default function QuoteDetail({ quote, palette }) {
  const { t, isDark, lang } = useLangTheme();
  const {
    sendInitialEmail,
    markReminderSent,
    markAccepted,
    markLost,
    moveToManual,
  } = useQuoteDemo();

  const baseCard =
    (palette && (palette.timesPanelBg || palette.formPanelBg)) ||
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const cardClass = "rounded-2xl border p-4 md:p-5 " + baseCard;

  const mutedText =
    (palette && palette.mutedText) ||
    (isDark ? "text-slate-400" : "text-slate-600");
  const labelText =
    (palette && palette.labelText) ||
    (isDark ? "text-slate-200" : "text-slate-800");

  if (!quote) {
    return (
      <div className={cardClass}>
        <p className={"text-sm " + mutedText}>
          {t.quote_detail_empty ||
            "Select a quote from the list to see details."}
        </p>
      </div>
    );
  }

  const ageDays = calcAgeDays(quote);
  const step = computeNextStep(quote);
  const createdLabel = formatDate(quote.createdAt, lang);
  const emailSentLabel = quote.emailSentAt
    ? formatDate(quote.emailSentAt, lang)
    : "—";
  const reminderSentLabel = quote.reminderSentAt
    ? formatDate(quote.reminderSentAt, lang)
    : "—";

  const statusTextMap = {
    draft: t.quote_status_draft || "Draft – not sent",
    sent: t.quote_status_sent || "Sent – waiting reply",
    followup_sent:
      t.quote_status_followup_sent || "Reminder email sent – waiting reply",
    needs_manual:
      t.quote_status_needs_manual ||
      "Needs manual follow-up (phone call / decision)",
    accepted: t.quote_status_accepted || "Accepted",
    lost: t.quote_status_lost || "Lost / denied",
  };

  const statusLabel =
    statusTextMap[quote.status] ||
    quote.status ||
    t.quote_status_unknown ||
    "Status";

  const canSendInitial =
    !quote.emailSentAt &&
    quote.status !== "accepted" &&
    quote.status !== "lost";
  const canSendReminder =
    quote.emailSentAt &&
    !quote.reminderSentAt &&
    quote.status !== "accepted" &&
    quote.status !== "lost";
  const canMoveManual =
    quote.status !== "accepted" &&
    quote.status !== "lost" &&
    quote.status !== "needs_manual";
  const canAccept = quote.status !== "accepted" && quote.status !== "lost";
  const canLose = quote.status !== "lost" && quote.status !== "accepted";

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            {t.quote_detail_badge || "Quote details"}
          </p>
          <h2
            className={"text-sm md:text-base font-semibold mt-1 " + labelText}
          >
            {quote.customer}
          </h2>
          <div className={"text-[11px] mt-0.5 " + mutedText}>{quote.site}</div>
        </div>
        <div className="text-right text-xs md:text-sm font-mono">
          <div className={labelText}>{quote.id}</div>
          <div className={mutedText}>
            {t.quote_detail_created || "Created:"} {createdLabel}
          </div>
          <div className={mutedText}>
            {ageDays} {t.quote_detail_aging_suffix || "days in pipeline"}
          </div>
        </div>
      </div>

      <div className="grid gap-3 text-xs md:text-sm">
        <div>
          <div className={"text-[11px] font-medium " + labelText}>
            {t.quote_detail_status || "Status"}
          </div>
          <div className="mt-0.5">
            <span className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5 text-[11px] bg-slate-950/30">
              {statusLabel}
            </span>
          </div>
        </div>

        <div>
          <div className={"text-[11px] font-medium " + labelText}>
            {t.quote_detail_desc || "Work description"}
          </div>
          <div className={"mt-0.5 " + mutedText}>
            {quote.description || t.quote_detail_desc_empty || "No description"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className={"text-[11px] font-medium " + labelText}>
              {t.quote_detail_value || "Estimated value"}
            </div>
            <div className="mt-0.5 font-semibold">
              {quote.amount != null
                ? quote.amount.toLocaleString("en-CA", {
                    style: "currency",
                    currency: "CAD",
                    maximumFractionDigits: 0,
                  })
                : "—"}
            </div>
          </div>
          <div>
            <div className={"text-[11px] font-medium " + labelText}>
              {t.quote_detail_email_dates || "Emails"}
            </div>
            <div className={"mt-0.5 text-[11px] " + mutedText}>
              {t.quote_detail_email_sent || "Sent:"} {emailSentLabel}
            </div>
            <div className={"text-[11px] " + mutedText}>
              {t.quote_detail_reminder_sent || "Reminder:"} {reminderSentLabel}
            </div>
          </div>
        </div>

        {quote.notes && (
          <div>
            <div className={"text-[11px] font-medium " + labelText}>
              {t.quote_detail_notes || "Internal notes"}
            </div>
            <div className={"mt-0.5 " + mutedText}>{quote.notes}</div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-2 flex flex-wrap gap-2">
          {canSendInitial && (
            <button
              type="button"
              onClick={function () {
                sendInitialEmail(quote.id);
              }}
              className="inline-flex items-center rounded-full border border-sky-400 px-3 py-1 text-[11px] text-sky-100 bg-sky-500/20 hover:bg-sky-500/40 transition"
            >
              {t.quote_action_send || "Send quote email"}
            </button>
          )}

          {canSendReminder && (
            <button
              type="button"
              onClick={function () {
                markReminderSent(quote.id);
              }}
              className="inline-flex items-center rounded-full border border-amber-400 px-3 py-1 text-[11px] text-amber-100 bg-amber-500/20 hover:bg-amber-500/40 transition"
            >
              {t.quote_action_reminder || "Mark reminder email sent"}
            </button>
          )}

          {canMoveManual && (
            <button
              type="button"
              onClick={function () {
                moveToManual(quote.id);
              }}
              className="inline-flex items-center rounded-full border border-slate-500 px-3 py-1 text-[11px] text-slate-100 bg-slate-700/40 hover:bg-slate-600/60 transition"
            >
              {t.quote_action_manual ||
                "Move to call list (needs manual follow-up)"}
            </button>
          )}

          {canAccept && (
            <button
              type="button"
              onClick={function () {
                markAccepted(quote.id);
              }}
              className="inline-flex items-center rounded-full border border-emerald-400 px-3 py-1 text-[11px] text-emerald-100 bg-emerald-500/20 hover:bg-emerald-500/40 transition"
            >
              {t.quote_action_accept || "Mark accepted"}
            </button>
          )}

          {canLose && (
            <button
              type="button"
              onClick={function () {
                markLost(quote.id, "denied");
              }}
              className="inline-flex items-center rounded-full border border-rose-400 px-3 py-1 text-[11px] text-rose-100 bg-rose-500/20 hover:bg-rose-500/40 transition"
            >
              {t.quote_action_lost || "Mark lost / denied"}
            </button>
          )}
        </div>

        <p className={"mt-3 text-[11px] " + mutedText}>
          {t.quote_detail_demo_note ||
            "In a real system, these buttons would send actual emails and move this quote into your job scheduler or archive."}
        </p>
      </div>
    </div>
  );
}
