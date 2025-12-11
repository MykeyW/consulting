// src/demo/demoPalettes.js

export const slotTimes = ["09:00", "10:00", "13:00", "14:00", "15:30"];

export const palettes = {
  indigo: {
    label: { en: "Indigo Nord", fr: "Indigo Nord" },
    panelBg: "bg-slate-900 text-slate-50 border border-slate-800 shadow-2xl",
    calendarPast:
      "bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed",
    calendarSelected: "bg-sky-500 border-sky-300 text-slate-950 shadow-lg",
    calendarAvailable:
      "bg-slate-900 border-slate-700 text-slate-50 hover:bg-slate-800",
    timesPanelBg: "bg-slate-900/90 border border-slate-700",
    formPanelBg: "bg-slate-900 border border-slate-700",
    timeDisabled:
      "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed line-through",
    timeSelected: "bg-sky-500 border-sky-300 text-slate-950 shadow-lg",
    timeAvailable:
      "bg-slate-900 border-slate-700 text-slate-50 hover:bg-slate-800 cursor-pointer",
    saveBtnDisabled: "bg-slate-700 text-slate-400 cursor-not-allowed",
    saveBtnEnabled: "bg-sky-500 hover:bg-sky-400 text-slate-950",

    labelText: "text-slate-100",
    inputField: "border-slate-600 bg-slate-950 text-slate-50",
    selectedTimeBox: "border-slate-600 bg-slate-950 text-slate-300",
    mutedText: "text-slate-300",
    backToCalendarBtn:
      "border-slate-400/70 bg-slate-100/10 hover:bg-slate-200/20 text-slate-100",
  },

  light: {
    label: { en: "Light cards", fr: "Cartes claires" },
    panelBg: "bg-white text-slate-900 border border-slate-200 shadow-xl",
    calendarPast:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed",
    calendarSelected: "bg-sky-600 border-sky-500 text-white shadow-lg",
    calendarAvailable:
      "bg-slate-50 border-slate-200 text-slate-900 hover:bg-sky-50",
    timesPanelBg: "bg-slate-50 border border-slate-200",
    formPanelBg: "bg-slate-50 border border-slate-200",
    timeDisabled:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through",
    timeSelected: "bg-sky-600 border-sky-500 text-white shadow-lg",
    timeAvailable:
      "bg-slate-50 border-slate-200 text-slate-900 hover:bg-sky-50 cursor-pointer",
    saveBtnDisabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
    saveBtnEnabled: "bg-sky-600 hover:bg-sky-500 text-white",

    labelText: "text-slate-800",
    inputField: "border-slate-300 bg-white text-slate-900",
    selectedTimeBox: "border-slate-300 bg-white text-slate-700",
    mutedText: "text-slate-600",
    backToCalendarBtn:
      "border-slate-500 bg-white hover:bg-slate-100 text-slate-800",
  },

  // --- Fast food / McD style ---
  mcd: {
    label: { en: "Fast food", fr: "Restauration" },

    // Panels are now LIGHT with red accents so long text is readable
    panelBg:
      "bg-gradient-to-br from-red-50 via-red-100 to-amber-50 text-red-900 border border-red-200 shadow-2xl",

    calendarPast: "bg-red-100 border-red-200 text-red-300 cursor-not-allowed",
    calendarSelected: "bg-yellow-400 border-yellow-300 text-red-900 shadow-lg",
    calendarAvailable:
      "bg-white border-yellow-400 text-red-700 hover:bg-yellow-50",

    timesPanelBg: "bg-white border border-yellow-300",
    formPanelBg: "bg-white border border-yellow-300",

    timeDisabled:
      "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through",
    timeSelected: "bg-yellow-400 border-yellow-300 text-red-900 shadow-lg",
    timeAvailable:
      "bg-white border-yellow-300 text-red-700 hover:bg-yellow-50 cursor-pointer",

    saveBtnDisabled: "bg-red-200 text-red-100 cursor-not-allowed",
    saveBtnEnabled: "bg-yellow-400 hover:bg-yellow-300 text-red-900",

    labelText: "text-red-900",
    inputField: "border-yellow-300 bg-white text-red-900",
    selectedTimeBox: "border-yellow-300 bg-white text-red-800",
    mutedText: "text-red-800",
    backToCalendarBtn:
      "border-yellow-400 bg-white hover:bg-yellow-50 text-red-800",
  },

  facebook: {
    label: { en: "Social / SaaS", fr: "Réseaux sociaux" },
    panelBg: "bg-white text-slate-900 border border-slate-200 shadow-xl",
    calendarPast:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed",
    calendarSelected: "bg-blue-600 border-blue-500 text-white shadow-lg",
    calendarAvailable:
      "bg-white border-slate-200 text-slate-900 hover:bg-blue-50",
    timesPanelBg: "bg-slate-50 border border-slate-200",
    formPanelBg: "bg-slate-50 border border-slate-200",
    timeDisabled:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through",
    timeSelected: "bg-blue-600 border-blue-500 text-white shadow-lg",
    timeAvailable:
      "bg-white border-slate-200 text-slate-900 hover:bg-blue-50 cursor-pointer",
    saveBtnDisabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
    saveBtnEnabled: "bg-blue-600 hover:bg-blue-500 text-white",

    labelText: "text-slate-800",
    inputField: "border-slate-300 bg-white text-slate-900",
    selectedTimeBox: "border-slate-300 bg-white text-slate-700",
    mutedText: "text-slate-600",
    backToCalendarBtn:
      "border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700",
  },

  // --- Ice cream / Dairy style ---
  dairy: {
    label: { en: "Ice cream", fr: "Crèmerie" },

    // Light creamy background with blue text so content is readable
    panelBg:
      "bg-gradient-to-br from-blue-50 via-blue-100 to-rose-50 text-blue-900 border border-blue-200 shadow-2xl",

    calendarPast:
      "bg-blue-100 border-blue-200 text-blue-300 cursor-not-allowed",
    calendarSelected: "bg-rose-500 border-rose-400 text-white shadow-lg",
    calendarAvailable:
      "bg-white border-rose-300 text-blue-700 hover:bg-rose-50",

    timesPanelBg: "bg-white border border-rose-300",
    formPanelBg: "bg-white border border-rose-300",

    timeDisabled:
      "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through",
    timeSelected: "bg-rose-500 border-rose-400 text-white shadow-lg",
    timeAvailable:
      "bg-white border-rose-300 text-blue-700 hover:bg-rose-50 cursor-pointer",

    saveBtnDisabled: "bg-blue-200 text-blue-100 cursor-not-allowed",
    saveBtnEnabled: "bg-rose-500 hover:bg-rose-400 text-white",

    labelText: "text-blue-900",
    inputField: "border-rose-300 bg-white text-blue-800",
    selectedTimeBox: "border-rose-300 bg-white text-blue-800",
    mutedText: "text-blue-700",
    backToCalendarBtn:
      "border-rose-400 bg-white hover:bg-rose-50 text-blue-800",
  },
};
