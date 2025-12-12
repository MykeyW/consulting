import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

export default function JobReportList({ reports, onSend }) {
  const { t } = useLangTheme();

  if (!reports || reports.length === 0) {
    return <p className="text-xs text-slate-500">{t.jobReport_list_empty}</p>;
  }

  const mapStatus = (status) => {
    if (status === "Sent to client") {
      return {
        label: t.jobReport_status_sent,
        className: "text-emerald-400",
      };
    }
    return {
      label: t.jobReport_status_draft,
      className: "text-amber-300",
    };
  };

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
      {reports.map((r) => {
        const statusMeta = mapStatus(r.status);
        return (
          <div
            key={r.id}
            className="border border-slate-800 rounded-md px-2 py-2 flex items-center justify-between gap-2"
          >
            <div className="flex-1">
              <div className="font-semibold text-slate-100">
                {r.clientName || t.jobReport_list_unnamedClient}
              </div>
              <div className="text-[11px] text-slate-400">
                {r.jobDate} – {r.jobAddress || t.jobReport_list_noAddress}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {t.jobReport_list_status}:{" "}
                <span className={statusMeta.className}>{statusMeta.label}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              {r.pdfUrl && (
                <a
                  href={r.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] underline text-sky-400 hover:text-sky-300"
                >
                  {t.jobReport_list_viewPdf}
                </a>
              )}
              <button
                onClick={() => onSend?.(r.id)}
                className="text-[11px] px-2 py-1 rounded-md border border-slate-700 hover:border-sky-400 hover:text-sky-300 transition"
              >
                {t.jobReport_list_sendSim}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
