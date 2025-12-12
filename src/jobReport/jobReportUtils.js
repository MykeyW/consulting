// src/jobReport/jobReportUtils.js
import jsPDF from "jspdf";

// rough conversion assuming 96 dpi screens
const MM_PER_PX = 25.4 / 96;

// Indigo / sky-ish brand colors (tweak if you want)
const BRAND_R = 56; // sky-500-ish
const BRAND_G = 189;
const BRAND_B = 248;

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (e) => reject(e);
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function loadImageMeta(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        widthPx: img.width,
        heightPx: img.height,
      });
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Add an image to the PDF, keeping aspect ratio and avoiding upscaling.
 */
async function addImageFitted(doc, file, x, y, maxWidthMm, maxHeightMm, log) {
  const dataUrl = await fileToDataUrl(file);
  const { widthPx, heightPx } = await loadImageMeta(dataUrl);

  const imgWidthMm = widthPx * MM_PER_PX;
  const imgHeightMm = heightPx * MM_PER_PX;

  // scale so it fits within maxWidth/maxHeight, but never bigger than original
  const scale = Math.min(maxWidthMm / imgWidthMm, maxHeightMm / imgHeightMm, 1);

  const drawWidth = imgWidthMm * scale;
  const drawHeight = imgHeightMm * scale;

  const format = file.type === "image/png" ? "PNG" : "JPEG";

  log?.(`Embedding ${format} image: ${file.name}`);
  try {
    doc.addImage(dataUrl, format, x, y, drawWidth, drawHeight);
  } catch (e) {
    console.warn("Error adding image", e);
  }
}

/**
 * Generate a styled PDF Blob for the given job.
 * pushLog is optional: (msg: string) => void
 */
export async function generateJobReportPdf(job, pushLog) {
  const log = (msg) => pushLog && pushLog(msg);

  const {
    clientName,
    clientEmail,
    jobAddress,
    jobDate,
    description,
    beforePhotos = [],
    afterPhotos = [],
  } = job;

  log("Preparing PDF document…");
  const doc = new jsPDF("p", "mm", "a4"); // portrait, mm, A4

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;

  // -------- HEADER STRIP --------
  const headerHeight = 24;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 0, pageWidth, headerHeight, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Job Report", margin, headerHeight / 2 + 4);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Indigo Nord Consulting", pageWidth - margin, headerHeight / 2 + 4, {
    align: "right",
  });

  // reset text color for body
  doc.setTextColor(0, 0, 0);

  let y = headerHeight + 8;

  // -------- CLIENT INFO CARD --------
  const cardPadding = 4;
  const cardWidth = pageWidth - margin * 2;
  const cardHeight = 32;

  doc.setFillColor(248, 250, 252); // light slate-ish
  doc.setDrawColor(226, 232, 240); // border
  doc.roundedRect(
    margin,
    y,
    cardWidth,
    cardHeight,
    2,
    2,
    "FD" // fill + stroke
  );

  let textX = margin + cardPadding;
  let textY = y + cardPadding + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Client details", textX, textY);
  textY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = [
    `Client: ${clientName || "-"}`,
    `Email: ${clientEmail || "-"}`,
    `Address: ${jobAddress || "-"}`,
    `Job date: ${jobDate || "-"}`,
  ];
  lines.forEach((line) => {
    doc.text(line, textX, textY);
    textY += 4;
  });

  y += cardHeight + 10;

  // -------- SECTION: JOB SUMMARY --------
  const addSectionTitle = (title) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y);
    doc.setDrawColor(BRAND_R, BRAND_G, BRAND_B);
    doc.setLineWidth(0.6);
    doc.line(margin, y + 1.5, margin + 40, y + 1.5);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59); // slate-800-ish
  };

  addSectionTitle("Job summary");

  const desc = description || "Short description of the work performed.";
  const descLines = doc.splitTextToSize(desc, pageWidth - margin * 2);
  doc.text(descLines, margin, y);
  y += descLines.length * 4 + 8;

  // -------- SECTION: PHOTOS --------
  addSectionTitle("Before / After photos");

  const columnWidth = (pageWidth - margin * 2 - 6) / 2;
  let currentY = y + 2;

  doc.setFontSize(9);
  doc.text("Before", margin, currentY);
  doc.text("After", margin + columnWidth + 6, currentY);
  currentY += 3;

  // light grid background for photo area
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  const gridHeight = pageHeight - currentY - 25;
  doc.roundedRect(
    margin,
    currentY,
    pageWidth - margin * 2,
    gridHeight,
    2,
    2,
    "S"
  );

  currentY += 4;

  const maxPhotos = Math.max(beforePhotos.length, afterPhotos.length);
  const maxPerPage = 4;
  const maxBoxHeight = 40;

  const chunks = [];
  for (let i = 0; i < maxPhotos; i += maxPerPage) {
    chunks.push({
      before: beforePhotos.slice(i, i + maxPerPage),
      after: afterPhotos.slice(i, i + maxPerPage),
    });
  }

  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];

    if (chunkIndex > 0) {
      // new page for extra photos
      doc.addPage();
      y = margin;
      addSectionTitle("Before / After photos (continued)");
      currentY = y + 2;

      doc.setFontSize(9);
      doc.text("Before", margin, currentY);
      doc.text("After", margin + columnWidth + 6, currentY);
      currentY += 3;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      const gridHeight2 = pageHeight - currentY - 25;
      doc.roundedRect(
        margin,
        currentY,
        pageWidth - margin * 2,
        gridHeight2,
        2,
        2,
        "S"
      );
      currentY += 4;
    }

    for (let i = 0; i < maxPerPage; i++) {
      const before = chunk.before[i];
      const after = chunk.after[i];

      if (before && before.file) {
        await addImageFitted(
          doc,
          before.file,
          margin + 2,
          currentY,
          columnWidth - 4,
          maxBoxHeight,
          log
        );
      }

      if (after && after.file) {
        await addImageFitted(
          doc,
          after.file,
          margin + columnWidth + 6 + 2,
          currentY,
          columnWidth - 4,
          maxBoxHeight,
          log
        );
      }

      currentY += maxBoxHeight + 4;
    }
  }

  // -------- FOOTER --------
  const lastPage = doc.getNumberOfPages();
  doc.setPage(lastPage);
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
  doc.text(
    "Thank you for your business. For future projects or maintenance reminders, contact us anytime.",
    margin,
    pageHeight - 12
  );
  doc.text("indigonord.ca", pageWidth - margin, pageHeight - 6, {
    align: "right",
  });

  log("Finalizing PDF…");
  const blob = doc.output("blob");
  return blob;
}
