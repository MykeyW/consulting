// src/icons.js
import React from "react";

export function IconPhone({ className }) {
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
      <path d="M6.5 4.5 9 3l3 3-2 2c.5 1.5 1.5 3 3 4.5 1.5 1.5 3 2.5 4.5 3l2-2 3 3-1.5 2.5c-.4.7-1.1 1.1-1.9 1.1C13 20.5 7.5 15 4.6 8.9c-.3-.8-.2-1.6.3-2.3l1.6-2.1z" />
    </svg>
  );
}

export function IconBolt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 3 5 14h5l-1 7 7-11h-5l1-7z" />
    </svg>
  );
}

export function IconCog({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path d="M4.8 12a7.2 7.2 0 0 1 .1-1l-2-1.6 1.6-2 2.2.7a7 7 0 0 1 1.6-1l.2-2.3h2.5l.2 2.3a7 7 0 0 1 1.6 1l2.2-.7 1.6 2-2 1.6a7.2 7.2 0 0 1 0 2l2 1.6-1.6 2-2.2-.7a7 7 0 0 1-1.6 1l-.2 2.3h-2.5l-.2-2.3a7 7 0 0 1-1.6-1l-2.2.7-1.6-2 2-1.6a7.2 7.2 0 0 1-.1-1z" />
    </svg>
  );
}

export function IconArrows({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h11l-3-3m3 3-3 3" />
      <path d="M17 17H6l3 3m-3-3 3-3" />
    </svg>
  );
}

export function IconMap({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 4 9 6.5z" />
      <path d="M9 6.5v10.5M15 4v11.5" />
    </svg>
  );
}

export function IconCheck({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13 9.5 17.5 19 6" />
    </svg>
  );
}

export function IconUsers({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9.5" r="2.5" />
      <path d="M4 18.5a5 5 0 0 1 10 0" />
      <path d="M14.5 18.5a4 4 0 0 1 6.5 0" />
    </svg>
  );
}

export function IconEnvelope({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="5" width="17" height="14" rx="1.8" />
      <path d="M5 7.5 12 12l7-4.5" />
    </svg>
  );
}

// add this with your other exports
export function IconClock({ className }) {
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
