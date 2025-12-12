import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

export default function JobReportForm({ job, onChange }) {
  const { t } = useLangTheme();

  if (!job) {
    return (
      <div className="text-sm text-slate-400 border border-slate-800 rounded-md p-3 bg-slate-950">
        Open a draft or create a new job to edit details.
      </div>
    );
  }

  const updateJob = (patch) => {
    onChange?.({ ...job, ...patch });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    updateJob({ [name]: value });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const existing = job[type] || [];

    const mapped = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      id: `${type}-${file.name}-${file.lastModified}-${Math.random()}`,
    }));

    updateJob({ [type]: [...existing, ...mapped] });

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
          {t?.jobReport_form_clientName || "Client name"}
        </label>
        <input
          name="clientName"
          value={job.clientName}
          onChange={handleTextChange}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t?.jobReport_form_clientName_placeholder || "John Doe"}
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t?.jobReport_form_clientEmail || "Client email"}
        </label>
        <input
          name="clientEmail"
          type="email"
          value={job.clientEmail}
          onChange={handleTextChange}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={
            t?.jobReport_form_clientEmail_placeholder || "client@email.com"
          }
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t?.jobReport_form_address || "Address"}
        </label>
        <input
          name="jobAddress"
          value={job.jobAddress}
          onChange={handleTextChange}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t?.jobReport_form_address_placeholder || "123 Main St"}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs text-slate-400 mb-1">
            {t?.jobReport_form_date || "Job date"}
          </label>
          <input
            type="date"
            name="jobDate"
            value={job.jobDate}
            onChange={handleTextChange}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t?.jobReport_form_description || "Description"}
        </label>
        <textarea
          name="description"
          value={job.description}
          onChange={handleTextChange}
          rows={3}
          className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={
            t?.jobReport_form_description_placeholder || "Work performed…"
          }
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t?.jobReport_form_before || "Before photos"}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, "beforePhotos")}
          className="w-full text-xs text-slate-300"
        />
        {!!job.beforePhotos?.length && (
          <p className="text-[11px] text-slate-500 mt-1">
            {job.beforePhotos.length} files selected
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">
          {t?.jobReport_form_after || "After photos"}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, "afterPhotos")}
          className="w-full text-xs text-slate-300"
        />
        {!!job.afterPhotos?.length && (
          <p className="text-[11px] text-slate-500 mt-1">
            {job.afterPhotos.length} files selected
          </p>
        )}
      </div>
    </form>
  );
}
