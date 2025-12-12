// src/jobReport/JobReportDemoPage.js
import React from "react";
import JobReportForm from "./JobReportForm";
import JobReportPreview from "./JobReportPreview";
import JobReportList from "./JobReportList";
import { generateJobReportPdf } from "./jobReportUtils";
import { useLangTheme } from "../landing/LangThemeProvider";

const emptyJob = {
  clientName: "",
  clientEmail: "",
  jobAddress: "",
  jobDate: new Date().toISOString().slice(0, 10),
  description: "",
  beforePhotos: [],
  afterPhotos: [],
};

export default function JobReportDemoPage() {
  const { t } = useLangTheme();

  const [currentJob, setCurrentJob] = React.useState(emptyJob);
  const [reports, setReports] = React.useState([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [logs, setLogs] = React.useState([]);

  const pushLog = (msg) => {
    setLogs((prev) => [
      { id: Date.now() + Math.random(), message: msg, ts: new Date() },
      ...prev,
    ]);
  };

  const handleGenerateReport = async () => {
    if (!currentJob) return;
    setIsGenerating(true);
    pushLog(t.jobReport_log_processing);
    try {
      const pdfBlob = await generateJobReportPdf(currentJob, pushLog);
      const url = URL.createObjectURL(pdfBlob);

      const newReport = {
        id: Date.now(),
        ...currentJob,
        status: "Draft",
        pdfUrl: url,
      };

      setReports((prev) => [newReport, ...prev]);
      pushLog(t.jobReport_log_generated);
    } catch (e) {
      console.error(e);
      pushLog(t.jobReport_log_error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendReport = (reportId) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, status: "Sent to client" } : r
      )
    );

    const report = reports.find((r) => r.id === reportId);
    const email = report?.clientEmail || "client@example.com";

    pushLog(`${t.jobReport_log_emailQueued} ${email}…`);
    setTimeout(() => {
      pushLog(`${t.jobReport_log_emailDelivered} ${email}.`);
    }, 800);
  };

  const handleSendCurrentReport = () => {
    if (!reports.length) return;
    const latest = reports[0];
    handleSendReport(latest.id);
  };

  const handleReorderPhotos = (type, newPhotos) => {
    setCurrentJob((prev) => ({
      ...prev,
      [type]: newPhotos,
    }));
  };

  const handleDeletePhoto = (type, photoId) => {
    setCurrentJob((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((p) => p.id !== photoId),
    }));
  };

  const hasPhotos =
    (currentJob.beforePhotos && currentJob.beforePhotos.length > 0) ||
    (currentJob.afterPhotos && currentJob.afterPhotos.length > 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t.jobReport_title}</h1>
          <p className="text-sm text-slate-400">{t.jobReport_subtitle}</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 grid gap-6 lg:grid-cols-3">
        {/* Left column: form */}
        <section className="lg:col-span-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
          <h2 className="text-lg font-semibold mb-2">
            {t.jobReport_leftTitle}
          </h2>
          <p className="text-xs text-slate-400 mb-4">{t.jobReport_leftText}</p>
          <JobReportForm job={currentJob} onChange={setCurrentJob} />
          <button
            onClick={handleGenerateReport}
            disabled={!hasPhotos || isGenerating}
            className={`mt-4 w-full py-2 rounded-md text-sm font-semibold transition
              ${
                !hasPhotos || isGenerating
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
              }`}
          >
            {isGenerating ? t.jobReport_generatingBtn : t.jobReport_generateBtn}
          </button>

          <button
            onClick={handleSendCurrentReport}
            disabled={!reports.length}
            className={`mt-2 w-full py-2 rounded-md text-sm font-semibold transition
              ${
                !reports.length
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-400 text-slate-950"
              }`}
          >
            {t.jobReport_sendBtn}
          </button>
        </section>

        {/* Middle column: preview */}
        <section className="lg:col-span-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
          <h2 className="text-lg font-semibold mb-2">
            {t.jobReport_preview_live}
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            {t.jobReport_preview_hint}
          </p>
          <JobReportPreview
            job={currentJob}
            onReorderPhotos={handleReorderPhotos}
            onDeletePhoto={handleDeletePhoto}
          />
        </section>

        {/* Right column: logs + report history */}
        <section className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex-1">
            <h2 className="text-lg font-semibold mb-2">
              {t.jobReport_logTitle}
            </h2>
            <p className="text-xs text-slate-400 mb-2">{t.jobReport_logText}</p>
            <div className="mt-2 max-h-60 overflow-y-auto text-xs space-y-2">
              {logs.length === 0 && (
                <p className="text-slate-500">{t.jobReport_logs_empty}</p>
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

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex-1">
            <h2 className="text-lg font-semibold mb-2">
              {t.jobReport_reportsTitle}
            </h2>
            <JobReportList reports={reports} onSend={handleSendReport} />
          </div>
        </section>
      </main>
    </div>
  );
}
