// src/quote/QuoteTasksPanel.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";
import {
  useQuoteDemo,
  calcAgeDays,
  formatCurrency,
  formatDate,
  computeNextStep,
} from "./QuoteContext";

export default function QuoteTasksPanel({ palette }) {
  const { t, isDark, lang } = useLangTheme();
  const { quotes, setSelectedId, markReminderSent } = useQuoteDemo();

  const baseCard =
    (palette && (palette.timesPanelBg || palette.formPanelBg)) ||
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const mutedText =
    (palette && palette.mutedText) ||
    (isDark ? "text-slate-400" : "text-slate-600");
  const labelText =
    (palette && palette.labelText) ||
    (isDark ? "text-slate-200" : "text-slate-800");

  const today = new Date();

  const tasks = quotes
    .map(function (q) {
      const step = computeNextStep(q);
      return {
        quote: q,
        step: step,
      };
    })
    .filter(function (item) {
      return (
        item.step &&
        item.step.nextAction === "send_reminder" &&
        item.step.dueDate &&
        item.step.dueDate <= today
      );
    })
    .sort(function (a, b) {
      return a.step.dueDate - b.step.dueDate;
    })
    .slice(0, 5);

  return (
    <div className={"rounded-2xl border p-4 md:p-5 " + baseCard}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            {t.quote_tasks_badge || "Today’s follow-ups"}
          </p>
          <p className={"text-xs md:text-sm mt-1 " + mutedText}>
            {t.quote_tasks_sub ||
              "Quotes that need a reminder email based on your follow-up rules."}
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className={"text-sm mt-1 " + mutedText}>
          {t.quote_tasks_empty ||
            "No reminder emails due today. New quotes with auto follow-up turned on will show up here when they need attention."}
        </p>
      ) : (
        <div className="mt-2 flex flex-col gap-2 text-xs md:text-[13px]">
          {tasks.map(function (item) {
            const quote = item.quote;
            const age = calcAgeDays(quote);
            const dueDate = item.step.dueDate;

            return (
              <div
                key={quote.id}
                className="w-full rounded-xl border border-slate-600/60 bg-slate-950/40 px-3 py-2 text-left"
              >
                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={function () {
                      setSelectedId(quote.id);
                    }}
                    className="min-w-0 text-left"
                  >
                    <div className={"font-semibold " + labelText}>
                      {quote.customer}
                    </div>
                    <div className={"text-[11px] mt-0.5 " + mutedText}>
                      {quote.site} · {formatCurrency(quote.amount)}
                    </div>
                    <div className={"text-[11px] mt-0.5 " + mutedText}>
                      {age} {t.quote_age_days || "days in pipeline"}
                    </div>
                  </button>

                  <div className="flex flex-col items-end justify-between text-[11px]">
                    <div className={mutedText}>
                      {t.quote_tasks_due || "Due"}:{" "}
                      {formatDate(dueDate.toISOString(), lang)}
                    </div>
                    <button
                      type="button"
                      onClick={function () {
                        markReminderSent(quote.id);
                      }}
                      className="mt-1 inline-flex items-center rounded-full border border-sky-400 px-2 py-0.5 text-[11px] text-sky-100 bg-sky-500/20 hover:bg-sky-500/40 transition"
                    >
                      {t.quote_tasks_mark_reminder ||
                        "Mark reminder email sent"}
                    </button>
                  </div>
                </div>
                <div className={"mt-1 text-[11px] " + mutedText}>
                  {t.quote_tasks_action ||
                    "After this reminder, the quote will move into your call list if there’s still no response."}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
