import React from "react";
import JobReportForm from "./JobReportForm";
import JobReportPreview from "./JobReportPreview";
import JobReportList from "./JobReportList";
import { generateJobReportPdf } from "./jobReportUtils";
import { useLangTheme } from "../landing/LangThemeProvider";

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

function makePlaceholderPhoto(type, i) {
  const label = `${type.toUpperCase()} ${i}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0f172a"/>
          <stop offset="1" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <rect x="40" y="40" width="1200" height="640" rx="28"
        fill="none" stroke="#38bdf8" stroke-width="8" opacity="0.75"/>
      <text x="50%" y="46%" font-size="80" fill="#e2e8f0"
        font-family="Arial" text-anchor="middle">${label}</text>
      <text x="50%" y="58%" font-size="36" fill="#94a3b8"
        font-family="Arial" text-anchor="middle">Placeholder photo (demo)</text>
    </svg>
  `.trim();

  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return {
    id: `${type}-placeholder-${i}-${Math.random()}`,
    previewUrl: dataUrl,
    // NOTE: no "file" => shows in preview, PDF will show "No photo" for these
  };
}

function makeEmptyJob() {
  const now = Date.now();
  return {
    id: now + Math.random(),
    clientName: "",
    clientEmail: "",
    jobAddress: "",
    jobDate: new Date().toISOString().slice(0, 10),
    description: "",
    beforePhotos: [],
    afterPhotos: [],
    status: "Draft", // Draft | Sent
    pdfUrl: null,
    createdAt: now,
    updatedAt: now,

    // reminder fields (demo)
    reminderState: "",
    lastReminderAt: null,
    reminderEmailTo: "",
  };
}

function makeStaleDraftSeed() {
  const now = Date.now();
  return {
    id: now - 999,
    clientName: "Demo Client (Stale Draft)",
    clientEmail: "owner@democompany.com",
    jobAddress: "42 Maple St, Edmundston",
    jobDate: new Date(now - THREE_DAYS_MS).toISOString().slice(0, 10),
    description:
      "Before photos were taken earlier. After photos still missing. This draft demonstrates inactivity reminder logic.",
    beforePhotos: [
      makePlaceholderPhoto("before", 1),
      makePlaceholderPhoto("before", 2),
      makePlaceholderPhoto("before", 3),
    ],
    afterPhotos: [],
    status: "Draft",
    pdfUrl: null,

    createdAt: now - 6 * 24 * 60 * 60 * 1000,
    updatedAt: now - 3 * 24 * 60 * 60 * 1000,

    reminderState: "Reminder sent",
    lastReminderAt: now - 2 * 60 * 60 * 1000,
    reminderEmailTo: "owner@democompany.com",
  };
}

export default function JobReportDemoPage() {
  const { t } = useLangTheme();

  const [currentJob, setCurrentJob] = React.useState(null);
  const [reports, setReports] = React.useState([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [logs, setLogs] = React.useState([]);

  // “Open from reminder” notification banner
  const [reminderNotif, setReminderNotif] = React.useState(null);
  // { draftId, clientName, jobAddress, email }

  const pushLog = (msg) => {
    setLogs((prev) => [
      { id: Date.now() + Math.random(), message: msg, ts: new Date() },
      ...prev,
    ]);
  };

  // Seed one “stale draft” for demo
  React.useEffect(() => {
    setReports((prev) => {
      if (prev.length) return prev;

      const now = Date.now();

      const draftA = {
        ...makeEmptyJob(),
        id: now - 300,
        clientName: "Acme Roofing",
        clientEmail: "crew@acmeroofing.com",
        jobAddress: "12 Pine Rd",
        beforePhotos: [makePlaceholderPhoto("before", 1)],
        createdAt: now - 1 * 24 * 60 * 60 * 1000, // 1 day old
        updatedAt: now - 1 * 24 * 60 * 60 * 1000,
      };

      const draftB = {
        ...makeEmptyJob(),
        id: now - 200,
        clientName: "Nordic Plumbing",
        clientEmail: "boss@nordicplumbing.com",
        jobAddress: "89 River St",
        beforePhotos: [
          makePlaceholderPhoto("before", 1),
          makePlaceholderPhoto("before", 2),
        ],
        createdAt: now - 2 * 24 * 60 * 60 * 1000, // 2 days old
        updatedAt: now - 2 * 24 * 60 * 60 * 1000,
      };

      // 👇 THIS is the reminder draft
      const draftC = {
        ...makeEmptyJob(),
        id: now - 100,
        clientName: "Demo Client (Needs Follow-up)",
        clientEmail: "owner@democompany.com",
        jobAddress: "42 Maple St",
        description:
          "Before photos were taken earlier. After photos still missing.",
        beforePhotos: [
          makePlaceholderPhoto("before", 1),
          makePlaceholderPhoto("before", 2),
          makePlaceholderPhoto("before", 3),
        ],
        createdAt: now - 6 * 24 * 60 * 60 * 1000, // 6 days old
        updatedAt: now - 3 * 24 * 60 * 60 * 1000, // inactive 3 days
        reminderState: "Reminder sent",
        lastReminderAt: now - 2 * 60 * 60 * 1000, // 2 hours ago
        reminderEmailTo: "owner@democompany.com",
      };

      return [draftC, draftB, draftA];
    });
  }, []);

  const handleNewJob = () => {
    const newJob = makeEmptyJob();
    setReports((prev) => [newJob, ...prev]);
    setCurrentJob(newJob);
    pushLog("New draft created");
  };

  const handleOpen = (id) => {
    const found = reports.find((r) => r.id === id);
    if (!found) return;
    setCurrentJob(found);
    pushLog(`Opened draft: ${found.clientName || "Unnamed client"}`);
  };

  const openAndFocusDraft = (draftId) => {
    handleOpen(draftId);
    requestAnimationFrame(() => {
      const el = document.getElementById(`draft-${draftId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  // Update BOTH currentJob + the matching item in reports
  const updateCurrentJob = (patchOrFn) => {
    setCurrentJob((prev) => {
      if (!prev) return prev;

      const next =
        typeof patchOrFn === "function"
          ? patchOrFn(prev)
          : { ...prev, ...patchOrFn };

      const updated = { ...next, updatedAt: Date.now() };

      setReports((list) =>
        list.map((r) => (r.id === updated.id ? updated : r))
      );

      return updated;
    });
  };

  const handleReorderPhotos = (type, newPhotos) => {
    updateCurrentJob({ [type]: newPhotos });
  };

  const handleDeletePhoto = (type, photoId) => {
    updateCurrentJob((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((p) => p.id !== photoId),
    }));
  };

  const handleDeleteDraft = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setCurrentJob((prev) => (prev?.id === id ? null : prev));
    pushLog("Draft deleted");
  };

  const handleGeneratePdf = async () => {
    if (!currentJob) return;

    setIsGenerating(true);
    pushLog(t?.jobReport_log_processing || "Generating PDF…");

    try {
      const blob = await generateJobReportPdf(currentJob, pushLog);
      const url = URL.createObjectURL(blob);
      updateCurrentJob({ pdfUrl: url });
      pushLog(t?.jobReport_log_generated || "PDF generated");
    } catch (e) {
      console.error(e);
      pushLog(t?.jobReport_log_error || "PDF error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Sent", updatedAt: Date.now() } : r
      )
    );
    setCurrentJob((prev) =>
      prev?.id === id
        ? { ...prev, status: "Sent", updatedAt: Date.now() }
        : prev
    );

    const report = reports.find((r) => r.id === id);
    const email = report?.clientEmail || "client@example.com";

    pushLog(`${t?.jobReport_log_emailQueued || "Email queued"} ${email}…`);
    setTimeout(() => {
      pushLog(
        `${t?.jobReport_log_emailDelivered || "Email delivered"} ${email}.`
      );
    }, 800);
  };

  // “Open from reminder” simulation
  const simulateReminder = () => {
    // Pick the ONE draft that is stale & missing after photos
    const target = reports.find(
      (r) =>
        r.status === "Draft" &&
        (r.beforePhotos?.length || 0) > 0 &&
        (r.afterPhotos?.length || 0) === 0 &&
        Date.now() - (r.updatedAt || r.createdAt) >= THREE_DAYS_MS
    );

    if (!target) {
      pushLog("No draft qualifies for reminder.");
      return;
    }

    setReports((prev) =>
      prev.map((r) =>
        r.id === target.id
          ? {
              ...r,
              reminderState: "Reminder sent",
              lastReminderAt: Date.now(),
              reminderEmailTo: r.clientEmail || "owner@demo.com",
            }
          : r
      )
    );

    pushLog(
      `Reminder emailed to ${target.clientEmail || "owner@demo.com"} for ${
        target.clientName
      }`
    );

    setReminderNotif({
      draftId: target.id,
      clientName: target.clientName,
      jobAddress: target.jobAddress,
      email: target.clientEmail || "owner@demo.com",
    });
  };

  const drafts = reports.filter((r) => r.status === "Draft");
  const sent = reports.filter((r) => r.status === "Sent");

  const hasBefore = (currentJob?.beforePhotos?.length || 0) > 0;
  const hasAfter = (currentJob?.afterPhotos?.length || 0) > 0;
  const canGenerate = hasBefore && hasAfter;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {t?.jobReport_title || "Job Report Demo"}
          </h1>
          <p className="text-sm text-slate-400">
            {t?.jobReport_subtitle ||
              "Drafts + Before/After photos + PDF + reminders"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateReminder}
            className="px-3 py-2 rounded-md border border-slate-700 hover:border-amber-400 hover:text-amber-300 text-sm"
          >
            Simulate reminder
          </button>

          <button
            onClick={handleNewJob}
            className="px-3 py-2 rounded-md bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold"
          >
            + New job report
          </button>
        </div>
      </header>

      {reminderNotif && (
        <div className="mx-6 mt-4 mb-2 rounded-xl border border-amber-400/50 bg-amber-400/10 px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-sm">
            <div className="font-semibold text-amber-200">
              📧 Reminder sent to {reminderNotif.email}
            </div>
            <div className="text-xs text-slate-300">
              Draft needs completion: {reminderNotif.clientName} —{" "}
              {reminderNotif.jobAddress}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAndFocusDraft(reminderNotif.draftId)}
              className="px-3 py-2 rounded-md bg-amber-300 hover:bg-amber-200 text-slate-950 text-sm font-semibold"
            >
              Open draft
            </button>
            <button
              onClick={() => setReminderNotif(null)}
              className="px-3 py-2 rounded-md border border-slate-700 hover:border-slate-500 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 px-6 py-4 grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <section className="lg:col-span-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
          <h2 className="text-lg font-semibold mb-2">
            {t?.jobReport_leftTitle || "Job details"}
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            {t?.jobReport_leftText ||
              "Open a draft to continue. Add after photos to unlock PDF + send."}
          </p>

          {!currentJob ? (
            <div className="text-sm text-slate-400 border border-slate-800 rounded-md p-3 bg-slate-950">
              Click{" "}
              <span className="text-sky-300 font-semibold">
                + New job report
              </span>{" "}
              or open a draft on the right.
            </div>
          ) : (
            <>
              <JobReportForm job={currentJob} onChange={updateCurrentJob} />

              <button
                onClick={handleGeneratePdf}
                disabled={!canGenerate || isGenerating}
                className={`mt-4 w-full py-2 rounded-md text-sm font-semibold transition
                  ${
                    !canGenerate || isGenerating
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  }`}
                title={
                  canGenerate
                    ? "Generate PDF"
                    : "Add at least 1 before + 1 after photo to generate PDF"
                }
              >
                {isGenerating
                  ? t?.jobReport_generatingBtn || "Generating…"
                  : t?.jobReport_generateBtn || "Generate PDF"}
              </button>

              {hasBefore && !hasAfter && (
                <p className="mt-2 text-[11px] text-amber-300">
                  After photos required to generate PDF
                </p>
              )}
            </>
          )}
        </section>

        {/* Middle column */}
        <section className="lg:col-span-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
          <h2 className="text-lg font-semibold mb-2">
            {t?.jobReport_preview_live || "Live preview"}
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            {t?.jobReport_preview_hint ||
              "Drag to reorder. Delete photos. Preview shows 5 images per side."}
          </p>

          <JobReportPreview
            job={currentJob}
            onReorderPhotos={handleReorderPhotos}
            onDeletePhoto={handleDeletePhoto}
          />
        </section>

        {/* Right column */}
        <section className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <h2 className="text-lg font-semibold mb-2">
              {t?.jobReport_logTitle || "Activity log"}
            </h2>
            <div className="mt-2 max-h-60 overflow-y-auto text-xs space-y-2">
              {logs.length === 0 && (
                <p className="text-slate-500">
                  {t?.jobReport_logs_empty || "No activity yet."}
                </p>
              )}
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="border border-slate-800 rounded-md px-2 py-1"
                >
                  <span className="text-slate-500 mr-2">
                    {log.ts.toLocaleTimeString()}
                  </span>
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          <JobReportList
            title="Draft job reports"
            reports={drafts}
            activeId={currentJob?.id}
            onOpen={handleOpen}
            onSend={handleSend}
            onDelete={handleDeleteDraft}
            showNeedsAfter
          />

          <JobReportList
            title="Sent reports"
            reports={sent}
            activeId={currentJob?.id}
            onOpen={handleOpen}
            onSend={handleSend}
          />
        </section>
      </main>
    </div>
  );
}
