// src/smartNumber/components/SmartNumberKpis.js
import React from "react";

export default function SmartNumberKpis({ t, isDark, kpis }) {
  const card =
    "rounded-2xl border p-4 shadow-sm " +
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const label = "text-[12px] " + (isDark ? "text-slate-400" : "text-slate-500");
  const value =
    "text-2xl font-semibold " + (isDark ? "text-slate-50" : "text-slate-900");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className={card}>
        <div className={label}>{t.smartNumber_kpi_callsToday}</div>
        <div className={value}>{kpis.callsToday}</div>
      </div>
      <div className={card}>
        <div className={label}>{t.smartNumber_kpi_missedToday}</div>
        <div className={value}>{kpis.missedToday}</div>
      </div>
      <div className={card}>
        <div className={label}>{t.smartNumber_kpi_recovered}</div>
        <div className={value}>{kpis.recoveredBookings}</div>
      </div>
      <div className={card}>
        <div className={label}>{t.smartNumber_kpi_followupsDue}</div>
        <div className={value}>{kpis.followUpsDue}</div>
      </div>
    </div>
  );
}
