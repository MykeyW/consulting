// src/landing/components.js
import React from "react";
import {
  IconEnvelope,
  IconMap,
  IconCog,
  IconCheck,
  IconPhone,
  IconBolt,
} from "../icons";
import { useLangTheme } from "./LangThemeProvider";

export function ServiceCard({ title, text, Icon }) {
  const { isDark } = useLangTheme();

  return (
    <div
      className={
        "rounded-2xl border p-6 flex flex-col gap-3 " +
        (isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white")
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={
            "font-semibold text-lg md:text-xl " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {title}
        </h3>
        <div
          className={
            "h-10 w-10 rounded-full flex items-center justify-center border " +
            (isDark ? "border-slate-700" : "border-slate-300")
          }
        >
          <Icon
            className={"h-6 w-6 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
        </div>
      </div>
      <p
        className={isDark ? "text-slate-300 text-sm" : "text-slate-700 text-sm"}
      >
        {text}
      </p>
    </div>
  );
}

export function ResultCard({ title, text, Icon }) {
  const { isDark } = useLangTheme();

  return (
    <div
      className={
        "rounded-2xl border p-6 " +
        (isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white")
      }
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={
            "h-9 w-9 rounded-full flex items-center justify-center border " +
            (isDark
              ? "bg-slate-950 border-slate-700"
              : "bg-slate-100 border-slate-300")
          }
        >
          <Icon
            className={"h-5 w-5 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
        </div>
        <p
          className={
            "font-semibold text-base md:text-lg " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {title}
        </p>
      </div>
      <p
        className={isDark ? "text-slate-300 text-sm" : "text-slate-700 text-sm"}
      >
        {text}
      </p>
    </div>
  );
}

export function StepCard({ step, title, desc }) {
  const { isDark } = useLangTheme();
  const StepIcon = step === 1 ? IconPhone : step === 2 ? IconCog : IconBolt;

  return (
    <div
      className={
        "rounded-2xl border p-6 flex flex-col gap-4 " +
        (isDark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white")
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            "h-10 w-10 rounded-full flex items-center justify-center border text-sm font-semibold " +
            (isDark
              ? "border-slate-700 text-sky-300"
              : "border-slate-300 text-sky-700")
          }
        >
          {step}
        </div>
        <div className="flex items-center gap-2">
          <StepIcon
            className={"h-6 w-6 " + (isDark ? "text-sky-300" : "text-sky-600")}
          />
          <h3
            className={
              "font-semibold text-lg " +
              (isDark ? "text-slate-50" : "text-slate-900")
            }
          >
            {title}
          </h3>
        </div>
      </div>
      <p
        className={isDark ? "text-slate-300 text-sm" : "text-slate-700 text-sm"}
      >
        {desc}
      </p>
    </div>
  );
}

export function IconClock({ className }) {
  // isDark is not needed here; color comes from className
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  );
}

export function FormField({ label, type }) {
  const { isDark } = useLangTheme();

  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label className={isDark ? "text-slate-100" : "text-slate-800"}>
        {label}
      </label>
      <input
        type={type}
        className={
          "rounded-xl border px-3.5 py-2.5 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 " +
          (isDark
            ? "bg-slate-950 border-slate-700 text-slate-100"
            : "bg-slate-50 border-slate-300 text-slate-900")
        }
      />
    </div>
  );
}

export function StatCard({ title, body }) {
  const { isDark } = useLangTheme();

  return (
    <div
      className={
        "rounded-xl border p-3 " +
        (isDark
          ? "border-slate-800 bg-slate-950/60 text-slate-200"
          : "border-slate-200 bg-white text-slate-700")
      }
    >
      <p
        className={
          "font-semibold text-[13px] mb-1 " +
          (isDark ? "text-slate-50" : "text-slate-900")
        }
      >
        {title}
      </p>
      <p className="text-[12px] leading-snug">{body}</p>
    </div>
  );
}

export function WorkflowStep({ index, label, sub }) {
  const { isDark } = useLangTheme();
  const icons = [IconEnvelope, IconMap, IconCog, IconCheck];
  const StepIcon = icons[index % icons.length];

  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px]">
      <div
        className={
          "h-10 w-10 rounded-full flex items-center justify-center border " +
          (isDark
            ? "border-slate-700 bg-slate-950"
            : "border-slate-300 bg-slate-50")
        }
      >
        <StepIcon
          className={"h-5 w-5 " + (isDark ? "text-sky-300" : "text-sky-600")}
        />
      </div>
      <div className="text-center">
        <p
          className={
            "text-[12px] font-semibold " +
            (isDark ? "text-slate-50" : "text-slate-900")
          }
        >
          {label}
        </p>
        <p
          className={
            "text-[11px] " + (isDark ? "text-slate-400" : "text-slate-600")
          }
        >
          {sub}
        </p>
      </div>
    </div>
  );
}
