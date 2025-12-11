// src/quote/QuoteList.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";
import {
  useQuoteDemo,
  calcAgeDays,
  formatCurrency,
  formatDate,
} from "./QuoteContext";

function todayISODateOnly() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function getStatusMeta(quote, t, isDark, todayStr) {
  const status = quote.status;
  const hasReminderToday =
    quote.followup && quote.followup.lastReminderSentAt === todayStr;

  const baseChip =
    (isDark
      ? "border-slate-600 bg-slate-100 text-slate-900"
      : "border-slate-300 bg-slate-100 text-slate-800") + " text-[11px]";

  let meta;

  switch (status) {
    case "needs_followup":
      meta = {
        label: t.quote_status_needs_followup || "Needs follow-up",
        chipClass:
          "bg-amber-100/90 text-amber-900 border-amber-300 text-[11px]",
      };
      break;
    case "waiting_reply":
      meta = {
        label: t.quote_status_waiting || "Sent – waiting reply",
        chipClass: "bg-sky-100/90 text-sky-900 border-sky-300 text-[11px]",
      };
      break;
    case "accepted":
      meta = {
        label: t.quote_status_accepted || "Accepted – schedule job",
        chipClass:
          "bg-emerald-100/90 text-emerald-900 border-emerald-300 text-[11px]",
      };
      break;
    case "lost":
      meta = {
        label: t.quote_status_lost || "Lost",
        chipClass: "bg-rose-100/90 text-rose-900 border-rose-300 text-[11px]",
      };
      break;
    case "draft":
      return {
        label: t.quote_status_draft || "Draft – not sent",
        chipClass:
          "bg-slate-100/90 text-slate-800 border-slate-300 text-[11px]",
      };
    case "sent":
      return {
        label: t.quote_status_sent || "Sent – waiting reply",
        chipClass: "bg-sky-100/90 text-sky-900 border-sky-300 text-[11px]",
      };
    case "followup_sent":
      return {
        label:
          t.quote_status_followup_sent || "Reminder email sent – waiting reply",
        chipClass:
          "bg-amber-100/90 text-amber-900 border-amber-300 text-[11px]",
      };
    case "needs_manual":
      return {
        label:
          t.quote_status_needs_manual || "Needs manual follow-up (call list)",
        chipClass:
          "bg-violet-100/90 text-violet-900 border-violet-300 text-[11px]",
      };
    default:
      meta = {
        label: status || t.quote_status_unknown || "Status",
        chipClass: baseChip,
      };
  }

  // If a reminder email was marked as sent today and this quote is still active,
  // decorate the label so you can see that follow-up was done.
  if (
    hasReminderToday &&
    (status === "needs_followup" || status === "waiting_reply")
  ) {
    const suffix =
      t.quote_status_followup_sent ||
      "Reminder sent today"; /* you can localize this */

    meta = {
      label: `${meta.label} · ${suffix}`,
      chipClass:
        "bg-emerald-100/90 text-emerald-900 border-emerald-300 text-[11px]",
    };
  }

  return meta;
}

export default function QuoteList({ palette }) {
  const { t, isDark, lang } = useLangTheme();
  const { quotes, selectedId, setSelectedId } = useQuoteDemo();

  const baseCard =
    palette?.panelBg ||
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");
  const mutedText =
    palette?.mutedText || (isDark ? "text-slate-400" : "text-slate-600");
  const labelText =
    palette?.labelText || (isDark ? "text-slate-200" : "text-slate-800");

  const todayStr = todayISODateOnly();

  if (!quotes.length) {
    return (
      <div className={"rounded-2xl border p-4 md:p-5 " + baseCard}>
        <p className={"text-sm " + mutedText}>
          {t.quote_list_empty || "No quotes yet. Create one to see it here."}
        </p>
      </div>
    );
  }

  const needFollow =
    quotes.filter(
      (q) => q.status === "needs_followup" || q.status === "waiting_reply"
    ) || [];

  return (
    <div className={"rounded-2xl border p-4 md:p-5 " + baseCard}>
      <div className="mb-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
          {t.quote_list_badge || "Quotes (demo data)"}
        </p>
        <p className={"text-xs md:text-sm mt-1 " + mutedText}>
          {t.quote_list_sub ||
            "Pipeline of open quotes – click a card to see details."}
        </p>
      </div>

      {/* mini “needs follow-up” strip */}
      {needFollow.length > 0 && (
        <div className="mb-3 rounded-2xl bg-slate-950/40 border border-slate-700/80 px-3 py-2">
          <p
            className={
              "text-[11px] uppercase tracking-[0.16em] mb-1 " + mutedText
            }
          >
            {t.quote_list_followup_title || "Quotes that need a follow-up"}
          </p>
          <div className="flex flex-col gap-1">
            {needFollow.slice(0, 3).map((q) => {
              const age = calcAgeDays(q);
              const statusMeta = getStatusMeta(q, t, isDark, todayStr);
              return (
                <button
                  key={q.id + "-follow"}
                  type="button"
                  onClick={() => setSelectedId(q.id)}
                  className="flex items-center justify-between rounded-xl px-3 py-1.5 text-xs md:text-[13px] bg-slate-900/70 hover:bg-slate-800/90 transition"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{q.customer}</span>
                    <span className={"text-[11px] " + mutedText}>
                      {q.site} · {age} {t.quote_age_days || "days in pipeline"}
                    </span>
                  </div>
                  <span
                    className={
                      "inline-flex items-center rounded-full border px-2 py-0.5 " +
                      statusMeta.chipClass
                    }
                  >
                    {statusMeta.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* main list of cards */}
      <div className="flex flex-col gap-2">
        {quotes.map((q) => {
          const age = calcAgeDays(q);
          const statusMeta = getStatusMeta(q, t, isDark, todayStr);
          const isSelected = q.id === selectedId;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setSelectedId(q.id)}
              className={[
                "w-full text-left rounded-2xl px-3 md:px-4 py-3 md:py-3.5 border transition flex flex-col gap-2",
                isSelected
                  ? "border-sky-400 bg-sky-500/10"
                  : "border-slate-600/60 bg-slate-950/40 hover:border-sky-400/70",
              ].join(" ")}
            >
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{q.customer}</div>
                  <div className={"text-[11px] mt-0.5 truncate " + mutedText}>
                    {q.site}
                  </div>
                </div>
                <div className="text-right text-xs md:text-[13px] font-mono">
                  <div className={labelText}>{q.id}</div>
                  <div className={mutedText}>
                    {formatDate(q.createdAt, lang)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-[13px]">
                <div className={mutedText}>
                  {formatCurrency(q.amount)} · {age}{" "}
                  {t.quote_age_days || "days in pipeline"}
                </div>
                <span
                  className={
                    "inline-flex items-center rounded-full border px-2 py-0.5 " +
                    statusMeta.chipClass
                  }
                >
                  {statusMeta.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
