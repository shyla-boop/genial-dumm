import { CHALLENGES, type Challenge } from "@/data/challenges";

/**
 * Stabiler "Daily Pick": gleiche Challenge pro Tag (pro Nutzer optional).
 * Für MVP: globaler Pick pro Tag.
 */
export function pickDailyChallenge(date = new Date()): Challenge {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const seed = (y * 10000 + m * 100 + d) >>> 0;
  const idx = seed % CHALLENGES.length;
  return CHALLENGES[idx];
}

export function pickNChallenges(n: number, date = new Date()): Challenge[] {
  // simple deterministic shuffle based on date
  const seed = (date.getFullYear() * 10000 + (date.getMonth()+1) * 100 + date.getDate()) >>> 0;
  const arr = [...CHALLENGES];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed + i * 2654435761) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(n, arr.length));
}
