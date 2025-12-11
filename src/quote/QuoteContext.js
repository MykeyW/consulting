// src/quote/QuoteContext.js
import React from "react";

const QuoteContext = React.createContext(null);

// --- helpers ---
const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgoISO(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function seedQuotes() {
  return [
    {
      id: "Q-1026",
      customer: "Acme Retail",
      email: "contact@acmeretail.com",
      site: "Downtown location",
      description: "Service contract for POS and network upgrades.",
      amount: 15400,
      createdAt: daysAgoISO(12),
      // lifecycle fields
      status: "needs_manual", // in your “call list”
      emailSentAt: daysAgoISO(11),
      reminderSentAt: daysAgoISO(7),
      autoFollowUp: true,
      followUpDays: 3,
      notes: "Left one voicemail and a reminder email went out last week.",
    },
    {
      id: "Q-1025",
      customer: "Greenview Property Mgmt",
      email: "office@greenviewpm.com",
      site: "12 Oakridge Court",
      description: "Wi-Fi and access control improvements for 3 buildings.",
      amount: 3200,
      createdAt: daysAgoISO(6),
      status: "accepted",
      emailSentAt: daysAgoISO(6),
      reminderSentAt: null,
      autoFollowUp: false,
      followUpDays: 0,
      notes: "They accepted by email. Waiting to schedule the job.",
    },
    {
      id: "Q-1024",
      customer: "Smith Renovations",
      email: "hello@smithreno.ca",
      site: "42 Maple Street",
      description: "Network + backup solution for home office and workshop.",
      amount: 8750,
      createdAt: daysAgoISO(3),
      status: "sent",
      emailSentAt: daysAgoISO(3),
      reminderSentAt: null,
      autoFollowUp: true,
      followUpDays: 3,
      notes: "Asked to review with accountant. Reminder due soon.",
    },
  ];
}

function nextQuoteId(existing) {
  const base = 1024;
  const max = existing.reduce((acc, q) => {
    const num = parseInt(String(q.id).split("-")[1], 10);
    return Number.isNaN(num) ? acc : Math.max(acc, num);
  }, base);
  return `Q-${max + 1}`;
}

export function QuoteProvider({ children }) {
  const [quotes, setQuotes] = React.useState(() => seedQuotes());
  const [selectedId, setSelectedId] = React.useState("Q-1024");
  const [paletteId, setPaletteId] = React.useState("indigo"); // reuse booking palettes

  const createQuote = ({
    customer,
    email,
    site,
    description,
    amount,
    notes,
  }) => {
    const id = nextQuoteId(quotes);
    const createdAt = new Date().toISOString();

    const newQuote = {
      id,
      customer: customer || "New customer",
      email: email || "demo@example.com",
      site: site || "Job site not set",
      description: description || "",
      amount: amount ? Number(amount) || 0 : 0,
      createdAt,
      // lifecycle: start in draft
      status: "draft",
      emailSentAt: null,
      reminderSentAt: null,
      autoFollowUp: true,
      followUpDays: 3,
      notes: notes || "",
    };

    setQuotes(function (prev) {
      return [newQuote, ...prev];
    });
    setSelectedId(id);
  };

  const updateQuote = (id, updater) => {
    setQuotes(function (prev) {
      return prev.map(function (q) {
        if (q.id !== id) return q;
        const patch =
          typeof updater === "function" ? updater(q) : updater || {};
        return {
          ...q,
          ...patch,
        };
      });
    });
  };

  const setStatus = (id, status) => {
    updateQuote(id, {
      status: status,
      statusChangedAt: new Date().toISOString(),
    });
  };

  const setAutoFollowUp = (id, enabled, days) => {
    updateQuote(id, function (q) {
      const fallbackDays =
        days != null && days !== undefined ? days : q.followUpDays || 3;

      return {
        autoFollowUp: enabled,
        followUpDays: enabled ? fallbackDays : 0,
      };
    });
  };

  // lifecycle actions
  const sendInitialEmail = (id) => {
    const nowISO = new Date().toISOString();
    updateQuote(id, {
      emailSentAt: nowISO,
      status: "sent",
    });
  };

  const markReminderSent = (id) => {
    const nowISO = new Date().toISOString();
    updateQuote(id, function (q) {
      return {
        reminderSentAt: nowISO,
        status: "followup_sent",
        // keep autoFollowUp/followUpDays as-is
      };
    });
  };

  const moveToManual = (id) => {
    setStatus(id, "needs_manual");
  };

  const markAccepted = (id) => {
    setStatus(id, "accepted");
  };

  const markLost = (id, reason) => {
    updateQuote(id, {
      status: "lost",
      lostReason: reason || "lost",
    });
  };

  const selectedQuote =
    quotes.find(function (q) {
      return q.id === selectedId;
    }) ||
    quotes[0] ||
    null;

  const value = {
    quotes,
    selectedQuote,
    selectedId,
    setSelectedId,
    createQuote,
    setStatus,
    setAutoFollowUp,
    sendInitialEmail,
    markReminderSent,
    moveToManual,
    markAccepted,
    markLost,
    paletteId,
    setPaletteId,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}

export function useQuoteDemo() {
  const ctx = React.useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuoteDemo must be used inside <QuoteProvider>");
  }
  return ctx;
}

// small helpers other components can use
export function calcAgeDays(quote) {
  if (!quote || !quote.createdAt) return 0;
  const created = new Date(quote.createdAt);
  const now = new Date();
  return Math.max(0, Math.round((now.getTime() - created.getTime()) / DAY_MS));
}

export function formatDate(iso, lang) {
  if (!iso) return "—";
  const locale = lang === "fr" ? "fr-CA" : "en-CA";
  const d = new Date(iso);
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatCurrency(amount) {
  const n = Number(amount);
  if (Number.isNaN(n)) return amount || "—";
  return n.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

// figure out what the NEXT step is, and when it’s due
export function computeNextStep(quote) {
  if (!quote) {
    return { stage: null, nextAction: null, dueDate: null };
  }

  if (quote.status === "accepted" || quote.status === "lost") {
    return { stage: "closed", nextAction: null, dueDate: null };
  }

  const followDays = quote.followUpDays || 3;
  const created = quote.createdAt ? new Date(quote.createdAt) : null;

  // draft → need to send the first email
  if (!quote.emailSentAt) {
    return {
      stage: "draft",
      nextAction: "send_quote",
      dueDate: created,
    };
  }

  const emailDate = new Date(quote.emailSentAt);

  // sent but no reminder yet
  if (quote.autoFollowUp && !quote.reminderSentAt) {
    const due = new Date(emailDate);
    due.setDate(due.getDate() + followDays);
    return {
      stage: "sent",
      nextAction: "send_reminder",
      dueDate: due,
    };
  }

  // reminder sent → now it’s time to call or close if still nothing
  if (quote.autoFollowUp && quote.reminderSentAt) {
    const rem = new Date(quote.reminderSentAt);
    const due = new Date(rem);
    due.setDate(due.getDate() + followDays);
    return {
      stage: "followup_sent",
      nextAction: "call_or_close",
      dueDate: due,
    };
  }

  // no auto follow-up: still "sent", but no further automated actions
  return {
    stage: "sent",
    nextAction: null,
    dueDate: null,
  };
}
