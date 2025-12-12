// src/smartNumber/components/SmsPreviewDrawer.js
import React from "react";

export default function SmsPreviewDrawer({ t, isDark, open, onClose, sms }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={
          "absolute right-0 top-0 h-full w-full sm:w-[480px] border-l shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45)] " +
          (isDark
            ? "bg-slate-950 border-slate-800"
            : "bg-white border-slate-200")
        }
      >
        <div className="p-4 border-b border-slate-200/10 flex items-center justify-between">
          <div>
            <div
              className={
                "font-semibold " + (isDark ? "text-slate-50" : "text-slate-900")
              }
            >
              {t.smartNumber_smsTitle}
            </div>
            <div
              className={
                "text-xs " + (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {t.smartNumber_smsDelivered}
            </div>
          </div>

          <button
            onClick={onClose}
            className={
              "rounded-full px-3 py-1.5 text-sm border transition " +
              (isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-400"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500")
            }
          >
            {t.smartNumber_btn_close}
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <div
              className={
                "text-[12px] mb-1 " +
                (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {t.smartNumber_smsTo}
            </div>
            <div className={isDark ? "text-slate-50" : "text-slate-900"}>
              {sms?.to || "—"}
            </div>
          </div>

          <div>
            <div
              className={
                "text-[12px] mb-1 " +
                (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {t.smartNumber_smsMessage}
            </div>
            <div
              className={
                "rounded-2xl border p-3 text-sm leading-relaxed " +
                (isDark
                  ? "bg-slate-900 border-slate-800 text-slate-100"
                  : "bg-white border-slate-200 text-slate-800")
              }
            >
              {sms?.message || "—"}
            </div>
          </div>

          <div>
            <div
              className={
                "text-[12px] mb-1 " +
                (isDark ? "text-slate-400" : "text-slate-500")
              }
            >
              {t.smartNumber_smsStatus}
            </div>
            <div className={isDark ? "text-slate-50" : "text-slate-900"}>
              {sms?.status || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
