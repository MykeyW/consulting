// src/i18n/index.js

import { landingEn } from "./landing.en";
import { landingFr } from "./landing.fr";
import { bookingEn } from "./booking.en";
import { bookingFr } from "./booking.fr";
import { quote_en } from "./quote.en";
import { quote_fr } from "./quote.fr";

// ⬇️ NEW
import { jobReportEn } from "./jobReport.en";
import { jobReportFr } from "./jobReport.fr";

export const translations = {
  en: {
    ...landingEn,
    ...bookingEn,
    ...quote_en,
    ...jobReportEn, // ⬅️ NEW
  },
  fr: {
    ...landingFr,
    ...bookingFr,
    ...quote_fr,
    ...jobReportFr, // ⬅️ NEW
  },
};

export default translations;
