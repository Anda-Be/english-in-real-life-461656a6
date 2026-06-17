import { useMemo, useState } from "react";
import type { MatchPair } from "@/lib/lessons";
import { SpeakButton } from "@/components/SpeakButton";
import { recordPairResult } from "@/lib/review";

const MAX_WRONG = 3;

function buildHint(translation: string): string {
  return translation
    .split(/(\s+)/)
    .map((chunk) => {
      if (/^\s+$/.test(chunk)) return chunk;
      if (chunk.length <= 2) return chunk;
      const first = chunk[0];
      const rest = chunk.slice(1).replace(/[A-Za-zĂÂÎȘȚăâîșț]/g, "·");
      return first + rest;
    })
    .join("");
}

export type MatchGameProps = {
  pairs: MatchPair[];
  /** Lesson slug used to record per-pair outcomes for the spaced-review queue.
   *  Either a single slug for the whole set, or one slug per pair (same length as pairs). */
  origins: string | string[];
  /** Optional copy override for the header instructions. */
  instructions?: string;
};

export function MatchGame({ pairs, origins, instructions }: MatchGameProps) {
  const left = pairs.map((p, i) => ({ id: i, text: p.en }));
  const right = useMemo(() => {
    const arr = pairs.map((p, i) => ({ id: i, text: p.ro }));
    return [...arr].sort((a, b) => (a.text.length % 3) - (b.text.length % 3)).reverse();
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [wrongRightId, setWrongRightId] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [hintsFor, setHintsFor] = useState<Set<number>>(new Set());
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [lastReveal, setLastReveal] = useState<number | null>(null);

  const allDone = matched.size === pairs.length;
  const wrongAttempts = Object.values(attempts).reduce((a, b) => a + b, 0);
  const perfect = allDone && wrongAttempts === 0 && hintsUsedCount === 0 && revealed.size === 0;

  function originFor(pairId: number) {
    return Array.isArray(origins) ? origins[pairId] : origins;
  }

  function reset() {
    setSelectedLeft(null);
    setMatched(new Set());
    setRevealed(new Set());
    setWrongRightId(null);
    setAttempts({});
    setHintsFor(new Set());
    setHintsUsedCount(0);
    setTotalAttempts(0);
    setLastReveal(null);
  }

  function pickLeft(id: number) {
    if (matched.has(id)) return;
    setSelectedLeft(id);
    setWrongRightId(null);
    setLastReveal(null);
  }

  function revealAnswer(pairId: number) {
    setMatched((m) => new Set(m).add(pairId));
    setRevealed((r) => new Set(r).add(pairId));
    setSelectedLeft(null);
    setWrongRightId(null);
    setLastReveal(pairId);
    const p = pairs[pairId];
    recordPairResult(originFor(pairId), p.en, p.ro, {
      misses: attempts[pairId] ?? MAX_WRONG,
      hintUsed: hintsFor.has(pairId),
      revealed: true,
    });
  }

  function pickRight(id: number) {
    if (selectedLeft === null || matched.has(id)) return;
    setTotalAttempts((n) => n + 1);
    if (selectedLeft === id) {
      const currentLeft = selectedLeft;
      const next = new Set(matched);
      next.add(id);
      setMatched(next);
      setSelectedLeft(null);
      setWrongRightId(null);
      setLastReveal(null);
      const p = pairs[currentLeft];
      recordPairResult(originFor(currentLeft), p.en, p.ro, {
        misses: attempts[currentLeft] ?? 0,
        hintUsed: hintsFor.has(currentLeft),
        revealed: false,
      });
    } else {
      const currentLeft = selectedLeft;
      setWrongRightId(id);
      const nextCount = (attempts[currentLeft] ?? 0) + 1;
      setAttempts((a) => ({ ...a, [currentLeft]: nextCount }));

      if (nextCount >= MAX_WRONG) {
        setTimeout(() => revealAnswer(currentLeft), 500);
      } else if (nextCount >= 2 && !hintsFor.has(currentLeft)) {
        setHintsFor((h) => new Set(h).add(currentLeft));
        setHintsUsedCount((n) => n + 1);
      }
      setTimeout(() => setWrongRightId((cur) => (cur === id ? null : cur)), 600);
    }
  }

  function revealHint() {
    if (selectedLeft === null || hintsFor.has(selectedLeft)) return;
    setHintsFor((h) => new Set(h).add(selectedLeft));
    setHintsUsedCount((n) => n + 1);
  }

  const selectedHint =
    selectedLeft !== null && hintsFor.has(selectedLeft)
      ? buildHint(pairs[selectedLeft].ro)
      : null;

  const attemptsLeft =
    selectedLeft !== null ? MAX_WRONG - (attempts[selectedLeft] ?? 0) : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {instructions ??
            `Click an English expression, then its Romanian meaning. You have ${MAX_WRONG} tries per pair.`}
        </p>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground">
            {matched.size}/{pairs.length} · {wrongAttempts} miss{wrongAttempts === 1 ? "" : "es"}
            {hintsUsedCount > 0 && ` · ${hintsUsedCount} hint${hintsUsedCount === 1 ? "" : "s"}`}
            {revealed.size > 0 && ` · ${revealed.size} revealed`}
          </span>
          <button
            onClick={revealHint}
            disabled={selectedLeft === null || (selectedLeft !== null && hintsFor.has(selectedLeft))}
            className="rounded-md border border-border px-2 py-1 text-primary hover:border-primary/60 disabled:cursor-not-allowed disabled:opacity-40"
          >
            💡 Hint
          </button>
          <button onClick={reset} className="text-primary hover:underline">
            Reset
          </button>
        </div>
      </div>

      {selectedLeft !== null && !matched.has(selectedLeft) && (
        <div className="mt-3 rounded-md border border-dashed border-border bg-background/60 px-3 py-2 text-xs text-muted-foreground">
          Selected: <span className="font-serif text-foreground">{pairs[selectedLeft].en}</span>
          {selectedHint && (
            <span className="ml-2">
              · hint: <span className="font-mono text-primary">{selectedHint}</span>
            </span>
          )}
          {(attempts[selectedLeft] ?? 0) > 0 && (
            <span className="ml-2 text-destructive">
              · {attempts[selectedLeft]}/{MAX_WRONG} wrong
              {attemptsLeft > 0 && ` · ${attemptsLeft} tr${attemptsLeft === 1 ? "y" : "ies"} left`}
            </span>
          )}
        </div>
      )}

      {lastReveal !== null && (
        <div className="mt-3 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs">
          <span className="font-semibold text-amber-700 dark:text-amber-400">Answer revealed:</span>{" "}
          <span className="font-serif text-foreground">{pairs[lastReveal].en}</span>
          {" = "}
          <span className="font-serif text-foreground">{pairs[lastReveal].ro}</span>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          {left.map((item) => {
            const done = matched.has(item.id);
            const wasRevealed = revealed.has(item.id);
            const sel = selectedLeft === item.id;
            const wrongs = attempts[item.id] ?? 0;
            return (
              <div key={item.id} className="flex items-center gap-2">
                <button
                  disabled={done}
                  onClick={() => pickLeft(item.id)}
                  className={[
                    "flex-1 rounded-md border px-3 py-2 text-left text-sm transition-all flex items-center justify-between gap-2",
                    wasRevealed
                      ? "border-amber-500/50 bg-amber-500/10 text-muted-foreground line-through"
                      : done
                      ? "border-success bg-success/10 text-muted-foreground line-through"
                      : sel
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background hover:border-primary/60",
                  ].join(" ")}
                >
                  <span>{item.text}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    {!done && wrongs > 0 && (
                      <span className="rounded-full bg-destructive/10 px-1.5 text-[10px] text-destructive">
                        ×{wrongs}
                      </span>
                    )}
                    {!done && hintsFor.has(item.id) && (
                      <span className="text-[10px]" aria-label="hint used">
                        💡
                      </span>
                    )}
                    {wasRevealed && (
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                        revealed
                      </span>
                    )}
                  </span>
                </button>
                <SpeakButton text={item.text} lang="en-US" />
              </div>
            );
          })}
        </div>
        <div className="space-y-2">
          {right.map((item) => {
            const done = matched.has(item.id);
            const wasRevealed = revealed.has(item.id);
            const isWrong = wrongRightId === item.id;
            return (
              <div key={item.id} className="flex items-center gap-2">
                <button
                  disabled={done}
                  onClick={() => pickRight(item.id)}
                  className={[
                    "flex-1 rounded-md border px-3 py-2 text-left text-sm transition-all",
                    wasRevealed
                      ? "border-amber-500/50 bg-amber-500/10 text-muted-foreground line-through"
                      : done
                      ? "border-success bg-success/10 text-muted-foreground line-through"
                      : isWrong
                      ? "border-destructive bg-destructive/10 text-foreground animate-pulse"
                      : "border-border bg-background hover:border-primary/60",
                  ].join(" ")}
                >
                  {item.text}
                </button>
                <SpeakButton text={item.text} lang="ro-RO" />
              </div>
            );
          })}
        </div>
      </div>

      {allDone && (
        <div className="mt-4 rounded-xl border border-success/40 bg-success/5 p-4 text-center">
          <p className="font-serif text-lg text-success">
            {perfect
              ? "🏆 Flawless run — you matched them all on the first try."
              : revealed.size > 0
              ? "🎉 Round complete — review the revealed pairs above."
              : "🎉 All matched!"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {totalAttempts} total attempt{totalAttempts === 1 ? "" : "s"} · {wrongAttempts} miss
            {wrongAttempts === 1 ? "" : "es"} · {hintsUsedCount} hint{hintsUsedCount === 1 ? "" : "s"} ·{" "}
            {revealed.size} revealed
          </p>
          <button
            onClick={reset}
            className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs text-primary hover:border-primary/60"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
