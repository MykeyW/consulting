// src/i18n/index.js

import { landingEn } from "./landing.en";
import { landingFr } from "./landing.fr";
import { bookingEn } from "./booking.en";
import { bookingFr } from "./booking.fr";

export const translations = {
  en: {
    ...landingEn,
    ...bookingEn,
  },
  fr: {
    ...landingFr,
    ...bookingFr,
  },
};

export default translations;
