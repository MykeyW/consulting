// src/demo/demoTimeUtils.js
export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function dateKey(date) {
  return date.toISOString().slice(0, 10);
}
