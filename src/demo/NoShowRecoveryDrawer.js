// src/demo/NoShowRecoveryDrawer.js
import React from "react";

function cls(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function NoShowRecoveryDrawer({
  open,
  onClose,
  palette,
  bookingMeta, // { dayKey, time, dateLabel }
  booking, // booking record (includes noShow.autoMessage.message)
  onSendAutoMessage,
}) {
  if (!open) return null;

  const isSent = !!booking?.noShow?.autoMessageSent;
  const msg = booking?.noShow?.autoMessage?.message || "";
  const channel = booking?.noShow?.autoMessage?.channel || "sms";

  const titleDate = bookingMeta?.dateLabel || "—";
  const titleTime = bookingMeta?.time || "—";

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-slate-950 text-slate-50 border-l border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                No-show message
              </div>
              <div className="mt-2 text-xl font-semibold">
                {titleDate} · {titleTime}
              </div>

              <div className="mt-3 inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-200 px-2.5 py-1 text-xs font-semibold">
                  no show
                </span>

                {isSent && (
                  <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 px-2.5 py-1 text-xs font-semibold">
                    Sent (simulated)
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4 overflow-auto h-[calc(100%-92px)]">
          {/* Customer */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Customer
            </div>
            <div className="mt-2 text-sm font-semibold">
              {booking?.name || "(Demo guest)"}
            </div>
            <div className="text-sm text-slate-300">
              {booking?.email || "demo@example.com"}
            </div>
          </div>

          {/* Message */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Message (ready to send)
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                {channel}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
              {msg ? (
                <pre className="whitespace-pre-wrap text-sm text-slate-100 font-sans">
                  {msg}
                </pre>
              ) : (
                <div className="text-sm text-slate-400">
                  Message preview unavailable.
                </div>
              )}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={onSendAutoMessage}
                disabled={!msg || isSent}
                className={cls(
                  "w-full rounded-full py-3 font-semibold text-sm transition",
                  !msg || isSent
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-400 text-slate-950"
                )}
              >
                {isSent ? "Sent" : "Send now"}
              </button>

              <div className="mt-2 text-[11px] text-slate-400">
                Demo: in a real system this would send automatically.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
