// src/smartNumber/smartNumberSeed.js
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function nowMinusMinutes(m) {
  return Date.now() - m * 60 * 1000;
}

export const CALL_STATUS = {
  RINGING: "ringing",
  ANSWERED: "answered",
  NO_ANSWER: "no_answer",
  BUSY: "busy",
  FAILED: "failed",
  VOICEMAIL: "voicemail",
};

export const OUTCOME = {
  NONE: "none",
  BOOKED: "booked",
  QUOTE: "quote",
  CALLBACK: "callback",
  NOTFIT: "notfit",
};

const areaCodes = ["506", "902", "418", "613", "705"];
function genPhone() {
  const ac = pick(areaCodes);
  const mid = randInt(200, 999);
  const last = randInt(1000, 9999);
  return `(${ac}) ${mid}-${last}`;
}

export function makeSeedData() {
  const smartNumber = "(506) 555-0100";
  const businessEmail = "owner@indigonord.ca";

  // Seed call history: last ~18 calls
  const calls = [];
  const followUps = [];
  const notesByNumber = {};

  const baseMinutes = 12 * 60; // 12 hours back
  const count = 18;

  for (let i = 0; i < count; i++) {
    const minsAgo = randInt(5, baseMinutes);
    const from = genPhone();
    const status = pick([
      CALL_STATUS.ANSWERED,
      CALL_STATUS.NO_ANSWER,
      CALL_STATUS.BUSY,
      CALL_STATUS.FAILED,
      CALL_STATUS.VOICEMAIL,
      CALL_STATUS.ANSWERED,
      CALL_STATUS.ANSWERED,
    ]);

    const startTs = nowMinusMinutes(minsAgo);
    const durationSec =
      status === CALL_STATUS.ANSWERED ? randInt(20, 6 * 60) : 0;

    const flags = {
      isNewCaller: Math.random() < 0.25,
      isRepeat: Math.random() < 0.2,
      isVip: Math.random() < 0.08,
    };

    const id = `call_${startTs}_${i}`;
    const outcome =
      status === CALL_STATUS.ANSWERED
        ? pick([OUTCOME.NONE, OUTCOME.BOOKED, OUTCOME.QUOTE, OUTCOME.CALLBACK])
        : OUTCOME.NONE;

    const followUpState =
      status === CALL_STATUS.ANSWERED
        ? "none"
        : pick(["text_sent", "needs_human"]);

    const call = {
      id,
      startTs,
      from,
      to: smartNumber,
      status,
      durationSec,
      flags,
      outcome,
      followUpState, // none | text_sent | text_skipped | needs_human | done
      autoText: null, // {to, message, sentTs, status}
    };

    // For missed calls: seed an auto-text or needs-human follow-up
    if (status !== CALL_STATUS.ANSWERED) {
      const sentTs = startTs + randInt(20, 90) * 1000;
      const msg = `Sorry we missed your call! Book here: https://indigonord.demo/booking`;

      const didSendText = followUpState === "text_sent";
      if (didSendText) {
        call.autoText = {
          to: from,
          message: msg,
          sentTs,
          status: "delivered",
        };
      }

      const needsHuman = followUpState === "needs_human" || !didSendText;
      if (needsHuman) {
        followUps.push({
          id: `fu_${id}`,
          callId: id,
          createdAt: sentTs,
          dueAt: sentTs + 60 * 60 * 1000, // 1h
          channel: didSendText ? "call" : "text",
          reason: status,
          phone: from,
          state: "open", // open | done
          completedAt: null,
          note: "",
        });
      }
    }

    calls.push(call);

    // Seed a small note sometimes
    if (Math.random() < 0.18) {
      notesByNumber[from] = [
        {
          id: `note_${id}`,
          ts: startTs + 2 * 60 * 1000,
          text: pick([
            "Asked about pricing.",
            "Wants a callback after 5pm.",
            "Looking for availability next week.",
            "Mentioned they found us on Google.",
          ]),
        },
      ];
    }
  }

  // Sort newest first
  calls.sort((a, b) => b.startTs - a.startTs);
  followUps.sort((a, b) => b.createdAt - a.createdAt);

  return {
    meta: { smartNumber, businessEmail },
    calls,
    followUps,
    notesByNumber,
    recoveredBookings: randInt(3, 9),
  };
}
