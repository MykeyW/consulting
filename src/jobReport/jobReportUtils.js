// src/jobReport/jobReportUtils.js
import jsPDF from "jspdf";
import * as exifr from "exifr";

// rough conversion assuming 96 dpi screens
const MM_PER_PX = 25.4 / 96;

// Indigo / sky-ish brand colors (tweak if you want)
const BRAND_R = 56; // sky-500-ish
const BRAND_G = 189;
const BRAND_B = 248;

// ---------- IMAGE NORMALIZATION (fix EXIF orientation) ----------
async function fileToNormalizedDataUrl(file, quality = 0.92) {
  const orientation = (await exifr.orientation(file).catch(() => 1)) || 1;

  const bitmap = await createImageBitmap(file);

  // orientations 5-8 swap width/height
  const swapWH = orientation >= 5 && orientation <= 8;
  const cw = swapWH ? bitmap.height : bitmap.width;
  const ch = swapWH ? bitmap.width : bitmap.height;

  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Apply EXIF orientation transform
  switch (orientation) {
    case 2: // mirror horizontal
      ctx.translate(cw, 0);
      ctx.scale(-1, 1);
      break;
    case 3: // rotate 180
      ctx.translate(cw, ch);
      ctx.rotate(Math.PI);
      break;
    case 4: // mirror vertical
      ctx.translate(0, ch);
      ctx.scale(1, -1);
      break;
    case 5: // mirror horizontal + rotate 90 CW
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(1, -1);
      break;
    case 6: // rotate 90 CW
      ctx.translate(cw, 0);
      ctx.rotate(0.5 * Math.PI);
      break;
    case 7: // mirror horizontal + rotate 90 CW
      ctx.translate(cw, ch);
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(-1, 1);
      break;
    case 8: // rotate 90 CCW
      ctx.translate(0, ch);
      ctx.rotate(-0.5 * Math.PI);
      break;
    default:
      break; // 1 = normal
  }

  ctx.drawImage(bitmap, 0, 0);

  const wantsPng = file.type === "image/png";
  if (wantsPng) return canvas.toDataURL("image/png");
  return canvas.toDataURL("image/jpeg", quality);
}

async function loadImageMetaFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ widthPx: img.width, heightPx: img.height });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Add an image to the PDF, keeping aspect ratio and avoiding upscaling.
 * (and fixes EXIF orientation by normalizing first)
 */
async function addImageFitted(doc, file, x, y, maxWidthMm, maxHeightMm, log) {
  const dataUrl = await fileToNormalizedDataUrl(file);

  const { widthPx, heightPx } = await loadImageMetaFromDataUrl(dataUrl);

  const imgWidthMm = widthPx * MM_PER_PX;
  const imgHeightMm = heightPx * MM_PER_PX;

  // scale so it fits within maxWidth/maxHeight, but never bigger than original
  const scale = Math.min(maxWidthMm / imgWidthMm, maxHeightMm / imgHeightMm, 1);

  const drawWidth = imgWidthMm * scale;
  const drawHeight = imgHeightMm * scale;

  const format = dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";

  log?.(`Embedding ${format} image: ${file.name}`);
  try {
    // compression arg keeps PDF smaller
    doc.addImage(
      dataUrl,
      format,
      x,
      y,
      drawWidth,
      drawHeight,
      undefined,
      "FAST"
    );
  } catch (e) {
    console.warn("Error adding image", e);
  }
}

// ---------- SMALL DESIGN HELPERS ----------
function drawSectionAccent(doc, x, y, w) {
  doc.setDrawColor(BRAND_R, BRAND_G, BRAND_B);
  doc.setLineWidth(0.7);
  doc.line(x, y, x + w, y);
}

function drawPhotoFrame(doc, x, y, w, h) {
  // shadow-ish border
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(x, y, w, h, 2.2, 2.2, "FD");

  // top accent strip
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(x, y, w, 2.2, 2.2, 2.2, "F");
}

function addPageNumberFooter(doc, pageWidth, pageHeight, margin) {
  const total = doc.getNumberOfPages();

  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);

    doc.text(`Page ${p} / ${total}`, pageWidth - margin, pageHeight - 8, {
      align: "right",
    });
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
  const headerHeight = 26;
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

  // subtle diagonal watermark-ish block (cooler look, still clean)
  doc.setFillColor(255, 255, 255);
  doc.setGState?.(new doc.GState({ opacity: 0.06 })); // optional (if supported)
  doc.rect(pageWidth - 90, -10, 140, 40, "F");
  doc.setGState?.(new doc.GState({ opacity: 1 }));

  // reset text color for body
  doc.setTextColor(0, 0, 0);

  let y = headerHeight + 10;

  // -------- CLIENT INFO CARD --------
  const cardPadding = 5;
  const cardWidth = pageWidth - margin * 2;
  const cardHeight = 34;

  doc.setFillColor(248, 250, 252); // light slate-ish
  doc.setDrawColor(226, 232, 240); // border
  doc.roundedRect(margin, y, cardWidth, cardHeight, 3, 3, "FD");

  let textX = margin + cardPadding;
  let textY = y + cardPadding + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text("Client details", textX, textY);
  textY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59); // slate-800

  const lines = [
    `Client: ${clientName || "-"}`,
    `Email: ${clientEmail || "-"}`,
    `Address: ${jobAddress || "-"}`,
    `Job date: ${jobDate || "-"}`,
  ];

  lines.forEach((line) => {
    doc.text(line, textX, textY);
    textY += 4.3;
  });

  y += cardHeight + 10;

  // -------- SECTION: JOB SUMMARY --------
  const addSectionTitle = (title) => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, y);
    drawSectionAccent(doc, margin, y + 2, 48);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
  };

  addSectionTitle("Job summary");

  const desc = description || "Short description of the work performed.";
  const descLines = doc.splitTextToSize(desc, pageWidth - margin * 2);
  doc.text(descLines, margin, y);
  y += descLines.length * 4.2 + 10;

  // -------- SECTION: PHOTOS --------
  addSectionTitle("Before / After photos");

  const columnWidth = (pageWidth - margin * 2 - 8) / 2;
  let currentY = y + 2;

  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text("Before", margin, currentY);
  doc.text("After", margin + columnWidth + 8, currentY);
  currentY += 4;

  const maxPhotos = Math.max(beforePhotos.length, afterPhotos.length);
  const maxPerPage = 3;
  const maxBoxHeight = 44;
  const footerReserve = 28; // keep bottom clear for footer/page numbers

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
      doc.addPage();
      y = margin;

      addSectionTitle("Before / After photos (continued)");
      currentY = y + 2;

      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105);
      doc.text("Before", margin, currentY);
      doc.text("After", margin + columnWidth + 8, currentY);
      currentY += 4;
    }

    for (let i = 0; i < maxPerPage; i++) {
      const nextRowBottom = currentY + maxBoxHeight;
      const safeBottom = pageHeight - footerReserve;

      if (nextRowBottom > safeBottom) {
        doc.addPage();
        y = margin;
        addSectionTitle("Before / After photos (continued)");
        currentY = y + 2;

        doc.setFontSize(9.5);
        doc.setTextColor(71, 85, 105);
        doc.text("Before", margin, currentY);
        doc.text("After", margin + columnWidth + 8, currentY);
        currentY += 4;
      }

      const before = chunk.before[i];
      const after = chunk.after[i];

      const beforeX = margin;
      const afterX = margin + columnWidth + 8;

      // frames always (looks premium even if photo missing)
      drawPhotoFrame(doc, beforeX, currentY, columnWidth, maxBoxHeight);
      drawPhotoFrame(doc, afterX, currentY, columnWidth, maxBoxHeight);

      if (before?.file) {
        await addImageFitted(
          doc,
          before.file,
          beforeX + 1.2,
          currentY + 2.6,
          columnWidth - 2.4,
          maxBoxHeight - 3.8,
          log
        );
      } else {
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184);
        doc.text("No photo", beforeX + 4, currentY + 18);
      }

      if (after?.file) {
        await addImageFitted(
          doc,
          after.file,
          afterX + 1.2,
          currentY + 2.6,
          columnWidth - 2.4,
          maxBoxHeight - 3.8,
          log
        );
      } else {
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184);
        doc.text("No photo", afterX + 4, currentY + 18);
      }

      currentY += maxBoxHeight + 6;
    }
  }

  // -------- FOOTER (message on last page) --------
  const lastPage = doc.getNumberOfPages();
  doc.setPage(lastPage);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.setDrawColor(226, 232, 240);

  doc.line(margin, pageHeight - 22, pageWidth - margin, pageHeight - 22);

  doc.text(
    "Thank you for your business. For future projects or maintenance reminders, contact us anytime.",
    margin,
    pageHeight - 14
  );

  doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
  doc.text("indigonord.ca", pageWidth - margin, pageHeight - 14, {
    align: "right",
  });

  // page numbers on all pages
  addPageNumberFooter(doc, pageWidth, pageHeight, margin);

  log("Finalizing PDF…");
  return doc.output("blob");
}
