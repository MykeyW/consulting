// src/quote/QuoteForm.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";
import { useQuoteDemo } from "./QuoteContext";

export default function QuoteForm({ palette }) {
  const { t, isDark } = useLangTheme();
  const { createQuote } = useQuoteDemo();

  const [customer, setCustomer] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [site, setSite] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const labelText =
    palette?.labelText || (isDark ? "text-slate-200" : "text-slate-800");
  const inputField =
    palette?.inputField ||
    (isDark
      ? "border-slate-700 bg-slate-950 text-slate-50"
      : "border-slate-300 bg-white text-slate-900");
  const mutedText =
    palette?.mutedText || (isDark ? "text-slate-400" : "text-slate-600");

  const baseCard =
    palette?.formPanelBg ||
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const buttonEnabled =
    palette?.saveBtnEnabled ||
    (isDark
      ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
      : "bg-sky-600 hover:bg-sky-500 text-white");

  function handleSubmit(e) {
    e.preventDefault();
    if (!customer && !email && !site && !amount) return;

    createQuote({ customer, email, site, description, amount, notes });

    setCustomer("");
    setEmail("");
    setSite("");
    setDescription("");
    setAmount("");
    setNotes("");
  }

  return (
    <div className={"rounded-2xl border p-4 md:p-5 " + baseCard}>
      <div className="mb-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
          {t.quote_form_badge || "New quote (demo only)"}
        </p>
        <p className={"text-xs md:text-sm mt-1 " + mutedText}>
          {t.quote_form_sub ||
            "Fill this out like a contractor sending a quote to a client."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:gap-4 text-sm md:text-base"
      >
        <div className="flex flex-col gap-1 text-left">
          <label className={labelText}>
            {t.quote_form_client_label || "Client / company name"}
          </label>
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className={
              "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              inputField
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className={labelText}>
            {t.quote_form_email_label || "Client email"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              inputField
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className={labelText}>
            {t.quote_form_site_label || "Job site / location"}
          </label>
          <input
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className={
              "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              inputField
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className={labelText}>
            {t.quote_form_description_label || "Project description"}
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={
              "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              inputField
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className={labelText}>
            {t.quote_form_amount_label || "Quote amount"}
          </label>
          <input
            type="number"
            min="0"
            step="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Example: 12500"
            className={
              "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              inputField
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className={labelText}>
            {t.quote_form_notes_label || "Internal notes (optional)"}
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={
              "rounded-xl border px-3 py-2 md:px-3.5 md:py-2.5 resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              inputField
            }
          />
        </div>

        <button
          type="submit"
          className={
            "mt-2 w-full rounded-full py-2.5 md:py-3 font-semibold text-sm md:text-base inline-flex items-center justify-center gap-2 transition-colors " +
            buttonEnabled
          }
        >
          {t.quote_form_submit || "Create quote (demo)"}
        </button>
      </form>
    </div>
  );
}
