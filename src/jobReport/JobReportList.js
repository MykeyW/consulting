import React from "react";

function formatAge(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function JobReportList({
  title,
  reports,
  activeId,
  onOpen,
  onSend,
  onDelete,
  showNeedsAfter,
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {!reports || reports.length === 0 ? (
        <p className="text-xs text-slate-500">No reports yet.</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
          {reports.map((r) => {
            const isActive = activeId === r.id;

            const beforeCount = r.beforePhotos?.length || 0;
            const afterCount = r.afterPhotos?.length || 0;

            const needsAfter = beforeCount > 0 && afterCount === 0;
            const hasAfter = afterCount > 0;

            const inactiveMs =
              Date.now() - (r.updatedAt || r.createdAt || Date.now());
            const inactiveDays = Math.floor(inactiveMs / (24 * 60 * 60 * 1000));
            const stale = inactiveDays >= 3;

            const reminded = !!r.lastReminderAt;

            return (
              <div
                id={`draft-${r.id}`}
                key={r.id}
                onClick={() => onOpen?.(r.id)}
                className={`border rounded-md px-2 py-2 flex items-center justify-between gap-2 cursor-pointer transition
                  ${
                    isActive
                      ? "border-sky-400 bg-slate-950"
                      : reminded
                      ? "border-amber-400 bg-amber-400/5 hover:border-amber-300"
                      : "border-slate-800 hover:border-sky-500"
                  }`}
              >
                <div className="flex-1">
                  <div className="font-semibold text-slate-100">
                    {r.clientName || "Unnamed client"}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {r.jobDate} – {r.jobAddress || "No address"}
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1">
                    Updated{" "}
                    {formatAge(r.updatedAt || r.createdAt || Date.now())}
                    {" · "}
                    Before {beforeCount}
                    {" · "}
                    After {afterCount}
                  </div>

                  {reminded && (
                    <div className="text-[11px] text-amber-300 mt-1 font-semibold">
                      📧 Reminder sent — action needed
                    </div>
                  )}

                  {stale && (
                    <div className="text-[11px] text-amber-300 mt-1">
                      ⏳ Inactive {inactiveDays} days
                      {r.reminderState ? ` • ${r.reminderState}` : ""}
                    </div>
                  )}

                  {r.lastReminderAt && r.reminderEmailTo && (
                    <div className="text-[11px] text-slate-500 mt-1">
                      Emailed: {r.reminderEmailTo}
                    </div>
                  )}

                  {showNeedsAfter && needsAfter && (
                    <div className="text-[11px] text-amber-300 mt-1">
                      ⚠ Needs after photos
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1">
                  {r.pdfUrl && (
                    <a
                      href={r.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] underline text-sky-400 hover:text-sky-300"
                    >
                      View PDF
                    </a>
                  )}

                  {onSend && (
                    <button
                      disabled={!hasAfter}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!hasAfter) return;
                        onSend(r.id);
                      }}
                      className={`text-[11px] px-2 py-1 rounded-md border transition
                        ${
                          !hasAfter
                            ? "border-slate-700 text-slate-500 cursor-not-allowed"
                            : "border-slate-700 hover:border-sky-400 hover:text-sky-300"
                        }`}
                      title={
                        hasAfter
                          ? "Send report (simulated)"
                          : "Add after photos to enable sending"
                      }
                    >
                      Send (sim)
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(r.id);
                      }}
                      className="text-[11px] px-2 py-1 rounded-md border border-slate-700 hover:border-rose-400 hover:text-rose-300 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
