// src/jobReport/JobReportPreview.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

export default function JobReportPreview({ job, onReorderPhotos }) {
  const { t } = useLangTheme();

  if (!job) {
    return (
      <div className="text-sm text-slate-500">{t.jobReport_preview_noJob}</div>
    );
  }

  const {
    clientName,
    clientEmail,
    jobAddress,
    jobDate,
    description,
    beforePhotos,
    afterPhotos,
  } = job;

  return (
    <div className="text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 max-h-[28rem] overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-semibold">
            {t.jobReport_preview_title}
          </h3>
          <p className="text-[11px] text-slate-400">
            {t.jobReport_preview_subtitle}
          </p>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Your Logo</div>
          <div className="text-slate-500">Indigo Nord Consulting</div>
        </div>
      </div>

      <hr className="border-slate-800 my-2" />

      <div className="space-y-1 mb-3">
        <div>
          <span className="font-semibold">{t.jobReport_form_clientName}:</span>{" "}
          {clientName || "—"}
        </div>
        <div>
          <span className="font-semibold">{t.jobReport_form_clientEmail}:</span>{" "}
          {clientEmail || "—"}
        </div>
        <div>
          <span className="font-semibold">{t.jobReport_form_address}:</span>{" "}
          {jobAddress || "—"}
        </div>
        <div>
          <span className="font-semibold">{t.jobReport_form_date}:</span>{" "}
          {jobDate || "—"}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold mb-1 text-sm">
          {t.jobReport_preview_jobSummaryTitle}
        </h4>
        <p className="text-[11px] text-slate-200 whitespace-pre-line">
          {description || t.jobReport_preview_defaultDescription}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <h4 className="font-semibold text-sm mb-1">
            {t.jobReport_form_before}
          </h4>
          <PhotoGrid
            photos={beforePhotos}
            emptyLabel={t.jobReport_preview_noPhotos}
            moreLabel={t.jobReport_preview_morePhotos}
            onReorder={(newArr) => onReorderPhotos?.("beforePhotos", newArr)}
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">
            {t.jobReport_form_after}
          </h4>
          <PhotoGrid
            photos={afterPhotos}
            emptyLabel={t.jobReport_preview_noPhotos}
            moreLabel={t.jobReport_preview_morePhotos}
            onReorder={(newArr) => onReorderPhotos?.("afterPhotos", newArr)}
          />
        </div>
      </div>

      <hr className="border-slate-800 my-3" />

      <div className="text-[11px] text-slate-400">
        {t.jobReport_footer_text}
      </div>
    </div>
  );
}

function PhotoGrid({ photos, emptyLabel, moreLabel, onReorder }) {
  const [dragIndex, setDragIndex] = React.useState(null);

  if (!photos || photos.length === 0) {
    return <div className="text-[11px] text-slate-500">{emptyLabel}</div>;
  }

  const handleDropOn = (targetIndex) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const newArr = [...photos];
    const [moved] = newArr.splice(dragIndex, 1);
    newArr.splice(targetIndex, 0, moved);
    onReorder?.(newArr);
    setDragIndex(null);
  };

  return (
    <div className="grid grid-cols-2 gap-1">
      {photos.slice(0, 4).map((p, index) => (
        <div
          key={p.id}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDropOn(index)}
          className={
            "aspect-video overflow-hidden rounded-md border border-slate-800 hover:border-sky-400 transition cursor-move"
          }
          title="Drag to reorder, click to open"
        >
          <a
            href={p.previewUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full h-full"
          >
            <img
              src={p.previewUrl}
              alt=""
              className="w-full h-full object-cover pointer-events-none"
            />
          </a>
        </div>
      ))}
      {photos.length > 4 && (
        <div className="col-span-2 text-[10px] text-slate-500 mt-1">
          {moreLabel}
        </div>
      )}
    </div>
  );
}
