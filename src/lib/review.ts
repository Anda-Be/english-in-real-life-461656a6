// Client-only spaced-review store for vocabulary match pairs.
// Tracks per-pair stats in localStorage and surfaces a weighted queue
// based on past mistakes + a tiny Leitner-style schedule.

export type PairStat = {
  lessonSlug: string;
  en: string;
  ro: string;
  misses: number;
  hints: number;
  reveals: number;
  correct: number;
  box: number; // 0..4, higher = better known, longer interval
  lastSeenAt: number;
  nextDueAt: number;
};

const KEY = "review_stats_v1";
const EVT = "review-stats-changed";

// Leitner-ish intervals per box (ms): 1h, 1d, 3d, 7d, 21d
const INTERVALS = [
  60 * 60_000,
  24 * 60 * 60_000,
  3 * 24 * 60 * 60_000,
  7 * 24 * 60 * 60_000,
  21 * 24 * 60 * 60_000,
];

function load(): Record<string, PairStat> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function save(s: Record<string, PairStat>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event(EVT));
}

const pairKey = (slug: string, en: string) => `${slug}::${en}`;

export type PairOutcome = {
  misses: number;
  hintUsed: boolean;
  revealed: boolean;
};

export function recordPairResult(
  lessonSlug: string,
  en: string,
  ro: string,
  outcome: PairOutcome,
) {
  const all = load();
  const k = pairKey(lessonSlug, en);
  const prev: PairStat =
    all[k] ?? {
      lessonSlug,
      en,
      ro,
      misses: 0,
      hints: 0,
      reveals: 0,
      correct: 0,
      box: 0,
      lastSeenAt: 0,
      nextDueAt: 0,
    };

  prev.misses += outcome.misses;
  if (outcome.hintUsed) prev.hints += 1;
  if (outcome.revealed) prev.reveals += 1;

  if (outcome.revealed) {
    prev.box = 0;
  } else if (outcome.misses === 0 && !outcome.hintUsed) {
    prev.correct += 1;
    prev.box = Math.min(INTERVALS.length - 1, prev.box + 1);
  } else if (outcome.misses > 0) {
    prev.box = Math.max(0, prev.box - 1);
  }
  // hint-only with no misses → keep box

  prev.ro = ro;
  prev.lessonSlug = lessonSlug;
  prev.lastSeenAt = Date.now();
  prev.nextDueAt = Date.now() + INTERVALS[prev.box];
  all[k] = prev;
  save(all);
}

export function getAllStats(): PairStat[] {
  return Object.values(load());
}

export type QueueItem = { en: string; ro: string; lessonSlug: string; score: number };

export function getReviewQueue(
  limit = 12,
  opts: { lessonSlug?: string } = {},
): QueueItem[] {
  const stats = getAllStats();
  const now = Date.now();
  return stats
    .filter((s) => !opts.lessonSlug || s.lessonSlug === opts.lessonSlug)
    .map((s) => {
      const due = s.nextDueAt <= now;
      const score =
        s.misses * 3 +
        s.reveals * 5 +
        s.hints +
        (due ? 2 : 0) -
        s.box;
      return { stat: s, score, due };
    })
    .filter((x) => x.stat.misses > 0 || x.stat.reveals > 0 || x.stat.hints > 0 || x.due)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ stat, score }) => ({
      en: stat.en,
      ro: stat.ro,
      lessonSlug: stat.lessonSlug,
      score,
    }));
}


export function getReviewSummary() {
  const stats = getAllStats();
  const now = Date.now();
  return {
    tracked: stats.length,
    withMistakes: stats.filter((s) => s.misses > 0 || s.reveals > 0).length,
    due: stats.filter((s) => s.nextDueAt <= now).length,
    totalMisses: stats.reduce((a, s) => a + s.misses, 0),
    totalReveals: stats.reduce((a, s) => a + s.reveals, 0),
  };
}

export function clearReviewStats() {
  save({});
}

export function onReviewStatsChanged(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}
