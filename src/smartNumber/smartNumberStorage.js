// src/smartNumber/smartNumberStorage.js
import { makeSeedData } from "./smartNumberSeed";

const KEY = "indigoNord.smartNumberDemo.v1";

export function loadSmartNumberState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return makeSeedData();
    const parsed = JSON.parse(raw);
    // Basic guard
    if (!parsed || !parsed.calls || !parsed.followUps || !parsed.meta) {
      return makeSeedData();
    }
    return parsed;
  } catch {
    return makeSeedData();
  }
}

export function saveSmartNumberState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function resetSmartNumberState() {
  const seed = makeSeedData();
  saveSmartNumberState(seed);
  return seed;
}
