// src/smartNumber/SmartNumberDemoPage.js
import React from "react";
import { useLangTheme } from "../landing/LangThemeProvider";

import SmartNumberKpis from "./SmartNumberKpis";
import CallLogTable from "./CallLogTable";
import FollowUpPanel from "./FollowUpPanel";
import MorningDigestPanel from "./MorningDigestPanel";
import SmsPreviewDrawer from "./SmsPreviewDrawer";
import CallerProfileDrawer from "./CallerProfileDrawer";

import {
  loadSmartNumberState,
  saveSmartNumberState,
  resetSmartNumberState,
} from "./smartNumberStorage";

import { CALL_STATUS, OUTCOME } from "./smartNumberSeed";

import {
  isMissedStatus,
  isAfterHoursLocal,
  makeAutoTextMessage,
  withinMinutes,
  statusLabel,
} from "./smartNumberUtils";
import { Link } from "react-router-dom";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickWeighted(items) {
  const total = items.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const it of items) {
    r -= it.w;
    if (r <= 0) return it.value;
  }
  return items[items.length - 1].value;
}

function genPhone() {
  const areaCodes = ["506", "902", "418", "613", "705"];
  const ac = areaCodes[Math.floor(Math.random() * areaCodes.length)];
  const mid = randInt(200, 999);
  const last = randInt(1000, 9999);
  return `(${ac}) ${mid}-${last}`;
}

export default function SmartNumberDemoPage() {
  const { isDark, t } = useLangTheme();

  const [state, setState] = React.useState(() => loadSmartNumberState());
  const [smsOpen, setSmsOpen] = React.useState(false);
  const [sms, setSms] = React.useState(null);

  const [profileOpen, setProfileOpen] = React.useState(false);
  const [profileNumber, setProfileNumber] = React.useState(null);

  const [digest, setDigest] = React.useState(state.digest || null);

  // Sim timers
  const timeoutsRef = React.useRef([]);

  // Persist to localStorage on change
  React.useEffect(() => {
    const next = { ...state, digest };
    saveSmartNumberState(next);
  }, [state, digest]);

  React.useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  const baseWrap =
    "min-h-screen " +
    (isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900");

  const panel =
    "rounded-2xl border p-4 " +
    (isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200");

  const soft = "text-sm " + (isDark ? "text-slate-300" : "text-slate-700");

  function openSmsPreview(autoText) {
    setSms(autoText || null);
    setSmsOpen(true);
  }

  function openProfile(number) {
    setProfileNumber(number);
    setProfileOpen(true);
  }

  function setOutcome(callId, outcome) {
    setState((prev) => ({
      ...prev,
      calls: prev.calls.map((c) => (c.id === callId ? { ...c, outcome } : c)),
    }));
  }

  function addNote(number, text) {
    const note = { id: `note_${Date.now()}`, ts: Date.now(), text };
    setState((prev) => ({
      ...prev,
      notesByNumber: {
        ...prev.notesByNumber,
        [number]: [...(prev.notesByNumber[number] || []), note],
      },
    }));
  }

  function markCallDone(callId) {
    setState((prev) => {
      const followUps = prev.followUps.map((f) =>
        f.callId === callId && f.state === "open"
          ? { ...f, state: "done", completedAt: Date.now() }
          : f
      );
      const calls = prev.calls.map((c) =>
        c.id === callId ? { ...c, followUpState: "done" } : c
      );
      return { ...prev, followUps, calls };
    });
  }

  function markFollowUpDone(fuId) {
    setState((prev) => ({
      ...prev,
      followUps: prev.followUps.map((f) =>
        f.id === fuId && f.state === "open"
          ? { ...f, state: "done", completedAt: Date.now() }
          : f
      ),
    }));
  }

  function markAllDigestDone() {
    if (!digest?.items?.length) return;
    const ids = new Set(digest.items.map((x) => x.followUpId).filter(Boolean));

    setState((prev) => ({
      ...prev,
      followUps: prev.followUps.map((f) =>
        ids.has(f.id) ? { ...f, state: "done", completedAt: Date.now() } : f
      ),
      calls: prev.calls.map((c) => {
        const had = prev.followUps.find(
          (f) => ids.has(f.id) && f.callId === c.id
        );
        return had ? { ...c, followUpState: "done" } : c;
      }),
    }));
  }

  function resetDemo() {
    const seed = resetSmartNumberState();
    setState(seed);
    setDigest(seed.digest || null);
  }

  function computeKpis() {
    const todayKey = new Date().toISOString().slice(0, 10);
    const callsToday = state.calls.filter(
      (c) => new Date(c.startTs).toISOString().slice(0, 10) === todayKey
    );
    const missedToday = callsToday.filter((c) => isMissedStatus(c.status));
    const followUpsDue = state.followUps.filter(
      (f) => f.state === "open"
    ).length;

    return {
      callsToday: callsToday.length,
      missedToday: missedToday.length,
      recoveredBookings: state.recoveredBookings || 0,
      followUpsDue,
    };
  }

  const kpis = computeKpis();

  const openFollowUps = state.followUps.filter((f) => f.state === "open");

  const callsForProfile = profileNumber
    ? state.calls
        .filter((c) => c.from === profileNumber)
        .sort((a, b) => b.startTs - a.startTs)
    : [];

  const notesForProfile = profileNumber
    ? (state.notesByNumber[profileNumber] || [])
        .slice()
        .sort((a, b) => b.ts - a.ts)
    : [];

  function simulateIncomingCall() {
    const startTs = Date.now();
    const from = genPhone();

    const callId = `call_live_${startTs}`;
    const call = {
      id: callId,
      startTs,
      from,
      to: state.meta.smartNumber,
      status: CALL_STATUS.RINGING,
      durationSec: 0,
      flags: {
        isNewCaller: Math.random() < 0.45,
        isRepeat: Math.random() < 0.2,
        isVip: Math.random() < 0.08,
      },
      outcome: OUTCOME.NONE,
      followUpState: "none",
      autoText: null,
    };

    setState((prev) => ({ ...prev, calls: [call, ...prev.calls] }));

    const finalizeId = setTimeout(() => {
      const finalStatus = pickWeighted([
        { value: CALL_STATUS.ANSWERED, w: 55 },
        { value: CALL_STATUS.NO_ANSWER, w: 20 },
        { value: CALL_STATUS.BUSY, w: 15 },
        { value: CALL_STATUS.FAILED, w: 7 },
        { value: CALL_STATUS.VOICEMAIL, w: 3 },
      ]);

      const durationSec =
        finalStatus === CALL_STATUS.ANSWERED ? randInt(22, 6 * 60) : 0;

      setState((prev) => ({
        ...prev,
        calls: prev.calls.map((c) =>
          c.id !== callId ? c : { ...c, status: finalStatus, durationSec }
        ),
      }));

      if (isMissedStatus(finalStatus)) {
        applyFollowUpAutomation({ callId, from, status: finalStatus, startTs });
      }
    }, 5000);

    timeoutsRef.current.push(finalizeId);
  }

  function applyFollowUpAutomation({ callId, from, status, startTs }) {
    const now = Date.now();
    const afterHours = isAfterHoursLocal(now);
    const msg = makeAutoTextMessage({
      isAfterHours: afterHours,
      reasonStatus: status,
    });

    // Anti-spam: if already texted in last 24h => skip
    const alreadyTextedToday = state.calls.some((c) => {
      if (c.from !== from) return false;
      if (!c.autoText?.sentTs) return false;
      return now - c.autoText.sentTs <= 24 * 60 * 60 * 1000;
    });

    // “Callback detected”: another call from same number within 2 min
    const callbackDetected = state.calls.some(
      (c) =>
        c.from === from &&
        c.id !== callId &&
        withinMinutes(c.startTs, startTs, 2)
    );

    let followUpState = "text_sent";
    let autoText = {
      to: from,
      message: msg,
      sentTs: now + 30 * 1000,
      status: "delivered",
    };

    if (alreadyTextedToday || callbackDetected) {
      followUpState = "text_skipped";
      autoText = null;
    }

    // Create human follow-up for busy/failed OR skipped
    const shouldCreateFollowUp =
      followUpState === "text_skipped" ||
      status === CALL_STATUS.BUSY ||
      status === CALL_STATUS.FAILED;

    const needsHuman = shouldCreateFollowUp;

    setState((prev) => {
      const calls = prev.calls.map((c) =>
        c.id !== callId
          ? c
          : {
              ...c,
              followUpState: needsHuman ? "needs_human" : followUpState,
              autoText,
            }
      );

      let followUps = prev.followUps;
      if (needsHuman) {
        const createdAt = now + 35 * 1000;
        followUps = [
          {
            id: `fu_${callId}`,
            callId,
            createdAt,
            dueAt: createdAt + 2 * 60 * 60 * 1000,
            channel: "call",
            reason: status,
            phone: from,
            state: "open",
            completedAt: null,
            note: "",
          },
          ...followUps,
        ];
      }

      return { ...prev, calls, followUps };
    });

    // Auto-open SMS preview if sent
    if (followUpState === "text_sent") {
      const openId = setTimeout(() => {
        setSms({
          to: from,
          message: msg,
          sentTs: now + 30 * 1000,
          status: "Delivered (simulated)",
        });
        setSmsOpen(true);
      }, 900);
      timeoutsRef.current.push(openId);
    }
  }

  function generateMorningDigest() {
    const open = state.followUps.filter((f) => f.state === "open");
    const items = open.slice(0, 8).map((f) => ({
      id: `d_${f.id}`,
      followUpId: f.id,
      phone: f.phone,
      reasonLabel: statusLabel(t, f.reason),
    }));

    const previewLines = items
      .map((x, idx) => `${idx + 1}. ${x.phone} — ${x.reasonLabel}`)
      .join("\n");

    const d = {
      to: state.meta.businessEmail,
      subject: "Morning follow-ups – Indigo Nord (Demo)",
      preview:
        `Here are your top follow-ups for today (demo):\n\n` +
        (previewLines || "No pending items."),
      items,
      createdAt: Date.now(),
    };

    setDigest(d);
  }

  return (
    <div className={baseWrap}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div>
          <Link
            to="/"
            className={
              "inline-flex items-center gap-2 text-sm font-medium transition " +
              (isDark
                ? "text-slate-400 hover:text-sky-300"
                : "text-slate-500 hover:text-sky-600")
            }
          >
            <span className="text-lg leading-none">←</span>
            <span>{t.smartNumber_back}</span>
          </Link>
        </div>
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1
                className={
                  "text-2xl sm:text-3xl font-semibold tracking-tight " +
                  (isDark ? "text-slate-50" : "text-slate-900")
                }
              >
                {t.smartNumber_title}
              </h1>
              <p
                className={
                  "mt-1 " + (isDark ? "text-slate-300" : "text-slate-600")
                }
              >
                {t.smartNumber_subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={simulateIncomingCall}
                className={
                  "rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition " +
                  (isDark
                    ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                    : "bg-sky-600 hover:bg-sky-500 text-white")
                }
              >
                {t.smartNumber_simulateCall}
              </button>

              <button
                onClick={generateMorningDigest}
                className={
                  "rounded-full px-4 py-2 text-sm font-semibold border transition " +
                  (isDark
                    ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-400"
                    : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500")
                }
              >
                {t.smartNumber_generateDigest}
              </button>

              <button
                onClick={resetDemo}
                className={
                  "rounded-full px-4 py-2 text-sm font-semibold border transition " +
                  (isDark
                    ? "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-rose-400"
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-rose-300")
                }
              >
                {t.smartNumber_resetDemo}
              </button>
            </div>
          </div>

          <SmartNumberKpis t={t} isDark={isDark} kpis={kpis} />
        </div>

        {/* Setup + rules */}
        <div className={panel}>
          <div
            className={
              "font-semibold " + (isDark ? "text-slate-50" : "text-slate-900")
            }
          >
            {t.smartNumber_setupTitle}
          </div>
          <p className={"mt-1 " + soft}>{t.smartNumber_setupBody}</p>

          <div
            className="mt-4 rounded-2xl border p-3"
            style={{
              borderColor: isDark
                ? "rgba(148,163,184,0.18)"
                : "rgba(148,163,184,0.35)",
            }}
          >
            <div
              className={
                "font-semibold " +
                (isDark ? "text-slate-100" : "text-slate-900")
              }
            >
              {t.smartNumber_rulesTitle}
            </div>
            <div
              className={
                "text-sm mt-1 " + (isDark ? "text-slate-300" : "text-slate-700")
              }
            >
              {t.smartNumber_rulesBody}
            </div>
          </div>
        </div>

        {/* Call log + followups + digest */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left: Call log (big) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div
                className={
                  "font-semibold " +
                  (isDark ? "text-slate-50" : "text-slate-900")
                }
              >
                {t.smartNumber_callLog}
              </div>
            </div>

            <CallLogTable
              t={t}
              isDark={isDark}
              calls={state.calls}
              notesByNumber={state.notesByNumber}
              onOpenProfile={openProfile}
              onOpenSms={(autoText) => openSmsPreview(autoText || null)}
              onMarkDone={markCallDone}
            />
          </div>

          {/* Right: Followups + Digest (important + sticky) */}
          <div className="space-y-3 lg:sticky lg:top-24 self-start">
            <FollowUpPanel
              t={t}
              isDark={isDark}
              followUps={openFollowUps}
              onMarkFollowUpDone={markFollowUpDone}
              onOpenProfile={openProfile}
            />

            <MorningDigestPanel
              t={t}
              isDark={isDark}
              digest={digest}
              onMarkAllDone={markAllDigestDone}
            />
          </div>
        </div>
      </div>

      <SmsPreviewDrawer
        t={t}
        isDark={isDark}
        open={smsOpen}
        onClose={() => setSmsOpen(false)}
        sms={sms}
      />

      <CallerProfileDrawer
        t={t}
        isDark={isDark}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        number={profileNumber}
        callsForNumber={callsForProfile}
        notes={notesForProfile}
        onAddNote={addNote}
        onSetOutcome={setOutcome}
      />
    </div>
  );
}
