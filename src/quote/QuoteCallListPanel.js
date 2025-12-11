// src/quote/QuoteCallListPanel.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";
import {
  useQuoteDemo,
  calcAgeDays,
  formatCurrency,
  formatDate,
  computeNextStep,
} from "./QuoteContext";

export default function QuoteCallListPanel({ palette }) {
  const { t, isDark, lang } = useLangTheme();
  const { quotes, setSelectedId, moveToManual, markAccepted, markLost } =
    useQuoteDemo();

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

  const items = quotes
    .map(function (q) {
      const step = computeNextStep(q);
      return { quote: q, step: step };
    })
    .filter(function (item) {
      return (
        item.step &&
        item.step.nextAction === "call_or_close" &&
        item.step.dueDate &&
        item.step.dueDate <= today
      );
    })
    .sort(function (a, b) {
      return a.step.dueDate - b.step.dueDate;
    })
    .slice(0, 6);

  return (
    <div className={"rounded-2xl border p-4 md:p-5 " + baseCard}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            {t.quote_call_badge || "Call or close"}
          </p>
          <p className={"text-xs md:text-sm mt-1 " + mutedText}>
            {t.quote_call_sub ||
              "Quotes that had a reminder and now need a phone call or final decision."}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className={"text-sm mt-1 " + mutedText}>
          {t.quote_call_empty ||
            "Nothing in the call list yet. Quotes will appear here a few days after a reminder is sent."}
        </p>
      ) : (
        <div className="mt-2 flex flex-col gap-2 text-xs md:text-[13px]">
          {items.map(function (item) {
            const quote = item.quote;
            const age = calcAgeDays(quote);
            const dueDate = item.step.dueDate;
            const dueLabel = dueDate
              ? formatDate(dueDate.toISOString(), lang)
              : "—";

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
                  <div className="text-right text-[11px]">
                    <div className={mutedText}>
                      {t.quote_call_due || "Since reminder:"} {dueLabel}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={function () {
                      markAccepted(quote.id);
                    }}
                    className="inline-flex items-center rounded-full border border-emerald-400 px-2.5 py-0.5 text-[11px] text-emerald-100 bg-emerald-500/20 hover:bg-emerald-500/40 transition"
                  >
                    {t.quote_call_accept || "Mark accepted"}
                  </button>
                  <button
                    type="button"
                    onClick={function () {
                      markLost(quote.id, "denied");
                    }}
                    className="inline-flex items-center rounded-full border border-rose-400 px-2.5 py-0.5 text-[11px] text-rose-100 bg-rose-500/20 hover:bg-rose-500/40 transition"
                  >
                    {t.quote_call_lost || "Mark lost / denied"}
                  </button>
                  <button
                    type="button"
                    onClick={function () {
                      // keep status but mark it explicitly as manual follow-up list
                      moveToManual(quote.id);
                    }}
                    className="inline-flex items-center rounded-full border border-slate-500 px-2.5 py-0.5 text-[11px] text-slate-100 bg-slate-700/40 hover:bg-slate-600/60 transition"
                  >
                    {t.quote_call_keep || "Keep in call list"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
