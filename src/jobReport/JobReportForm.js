// src/jobReport/JobReportForm.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

export default function JobReportForm({ job, onChange }) {
  const { t } = useLangTheme();

  const safeJob = job || {
    clientName: "",
    clientEmail: "",
    jobAddress: "",
    jobDate: new Date().toISOString().slice(0, 10),
    description: "",
    beforePhotos: [],
    afterPhotos: [],
  };

  const updateJob = (patch) => {
    const next = { ...safeJob, ...patch };
    onChange?.(next);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    updateJob({ [name]: value });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const existing = safeJob[type] || [];

    const mapped = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      id: `${type}-${file.name}-${file.lastModified}-${Math.random()}`,
    }));

    // APPEND instead of replace
    updateJob({ [type]: [...existing, ...mapped] });

    // optional: allow selecting same file again
    e.target.value = "";
  };

  return (
    <form
      className="space-y-3 text-sm"
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t.jobReport_form_clientName}
        </label>
        <input
          name="clientName"
          value={safeJob.clientName}
          onChange={handleTextChange}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t.jobReport_form_clientName_placeholder}
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t.jobReport_form_clientEmail}
        </label>
        <input
          name="clientEmail"
          type="email"
          value={safeJob.clientEmail}
          onChange={handleTextChange}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t.jobReport_form_clientEmail_placeholder}
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t.jobReport_form_address}
        </label>
        <input
          name="jobAddress"
          value={safeJob.jobAddress}
          onChange={handleTextChange}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t.jobReport_form_address_placeholder}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs text-slate-400 mb-1">
            {t.jobReport_form_date}
          </label>
          <input
            type="date"
            name="jobDate"
            value={safeJob.jobDate}
            onChange={handleTextChange}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t.jobReport_form_description}
        </label>
        <textarea
          name="description"
          value={safeJob.description}
          onChange={handleTextChange}
          rows={3}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t.jobReport_form_description_placeholder}
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t.jobReport_form_before}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, "beforePhotos")}
          className="w-full text-xs text-slate-300"
        />
        {safeJob.beforePhotos?.length > 0 && (
          <p className="text-[11px] text-slate-500 mt-1">
            {safeJob.beforePhotos.length} {t.jobReport_form_filesSelected}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t.jobReport_form_after}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, "afterPhotos")}
          className="w-full text-xs text-slate-300"
        />
        {safeJob.afterPhotos?.length > 0 && (
          <p className="text-[11px] text-slate-500 mt-1">
            {safeJob.afterPhotos.length} {t.jobReport_form_filesSelected}
          </p>
        )}
      </div>
    </form>
  );
}
