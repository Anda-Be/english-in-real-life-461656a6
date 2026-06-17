import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { MatchGame } from "@/components/MatchGame";
import { LESSONS, LESSONS_BY_SLUG } from "@/lib/lessons";
import {
  clearReviewStats,
  getAllStats,
  getReviewQueue,
  getReviewSummary,
  onReviewStatsChanged,
  type PairStat,
  type QueueItem,
} from "@/lib/review";


type ReviewSearch = { lesson?: string };

export const Route = createFileRoute("/review")({
  validateSearch: (raw: Record<string, unknown>): ReviewSearch => {
    const lesson = typeof raw.lesson === "string" && raw.lesson.length > 0 ? raw.lesson : undefined;
    return { lesson };
  },
  head: () => ({
    meta: [
      { title: "Spaced Review — English in Real Life" },
      {
        name: "description",
        content:
          "A personalised review session of the vocabulary pairs you keep missing, scheduled to come back at the right time.",
      },
      { property: "og:title", content: "Spaced Review — English in Real Life" },
      {
        property: "og:description",
        content: "Resurface the vocabulary you keep missing, on a smart schedule.",
      },
    ],
    links: [{ rel: "canonical", href: "https://french-verb-bloom.lovable.app/review" }],
  }),
  component: ReviewPage,
});

const LIMIT = 12;

function ReviewPage() {
  const { lesson } = Route.useSearch();
  const navigate = useNavigate({ from: "/review" });
  const [tick, setTick] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => onReviewStatsChanged(() => setTick((n) => n + 1)), []);

  // Snapshot the queue when the session starts (or the filter changes) so it
  // doesn't reshuffle mid-game every time a result is recorded.
  const queue = useMemo<QueueItem[]>(
    () => getReviewQueue(LIMIT, { lessonSlug: lesson }),
    [sessionKey, lesson],
  );
  const summary = useMemo(() => getReviewSummary(), [tick]);
  const allStats = useMemo<PairStat[]>(() => getAllStats(), [tick]);

  const pairs = queue.map((q) => ({ en: q.en, ro: q.ro }));
  const origins = queue.map((q) => q.lessonSlug);

  // Lessons the user actually has stats for — only show those in the filter.
  const lessonsWithStats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of allStats) {
      if (s.misses > 0 || s.reveals > 0 || s.hints > 0) {
        counts.set(s.lessonSlug, (counts.get(s.lessonSlug) ?? 0) + 1);
      }
    }
    return LESSONS.filter((l) => counts.has(l.slug)).map((l) => ({
      slug: l.slug,
      title: l.title,
      emoji: l.emoji,
      count: counts.get(l.slug) ?? 0,
    }));
  }, [allStats]);

  const topMistakes = [...allStats]
    .filter((s) => s.misses > 0 || s.reveals > 0)
    .filter((s) => !lesson || s.lessonSlug === lesson)
    .sort((a, b) => b.misses + b.reveals * 2 - (a.misses + a.reveals * 2))
    .slice(0, 8);

  function setLesson(next: string | undefined) {
    navigate({ search: { lesson: next } });
    setSessionKey((n) => n + 1);
  }

  const activeLesson = lesson ? LESSONS_BY_SLUG[lesson] : undefined;


  return (
    <div className="min-h-screen">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
          ← All lessons
        </Link>

        <header className="mt-4">
          <p className="text-xs uppercase tracking-widest text-primary">Personalised practice</p>
          <h1 className="mt-2 font-serif text-5xl text-foreground">Spaced review</h1>
          <p className="mt-3 text-muted-foreground">
            The vocabulary pairs you've missed (or had revealed) come back here on a smart
            schedule — sooner if you struggled, later once they stick. Everything stays on this
            device.
          </p>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-4">
          <Stat label="Tracked" value={summary.tracked} />
          <Stat label="With misses" value={summary.withMistakes} />
          <Stat label="Due now" value={summary.due} accent />
          <Stat label="Total misses" value={summary.totalMisses} />
        </section>

        {lessonsWithStats.length > 0 && (
          <section className="mt-8">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-lg text-foreground">Filter by lesson</h2>
              {activeLesson && (
                <button
                  onClick={() => setLesson(undefined)}
                  className="text-xs text-primary hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterChip
                label="All lessons"
                count={summary.withMistakes}
                active={!lesson}
                onClick={() => setLesson(undefined)}
              />
              {lessonsWithStats.map((l) => (
                <FilterChip
                  key={l.slug}
                  label={`${l.emoji} ${l.title}`}
                  count={l.count}
                  active={lesson === l.slug}
                  onClick={() => setLesson(l.slug)}
                />
              ))}
            </div>
            {activeLesson && (
              <p className="mt-2 text-xs text-muted-foreground">
                Showing only pairs from <span className="text-foreground">{activeLesson.title}</span>.
              </p>
            )}
          </section>
        )}

        <section className="mt-10">

          {pairs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="font-serif text-2xl text-foreground">
                {activeLesson
                  ? `Nothing to review from ${activeLesson.title}.`
                  : "Nothing to review yet."}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {activeLesson
                  ? "You haven't missed any pairs from this lesson — or you've already mastered them. Try another filter."
                  : "Play the match game in any lesson — the pairs you miss will show up here."}
              </p>
              {activeLesson ? (
                <button
                  onClick={() => setLesson(undefined)}
                  className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Show all lessons
                </button>
              ) : (
                <Link
                  to="/"
                  className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Browse lessons
                </Link>
              )}
            </div>

          ) : (
            <>
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">
                    Today's session · {pairs.length} pair{pairs.length === 1 ? "" : "s"}
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Weighted by how often you missed each one
                  </p>
                </div>
                <button
                  key={sessionKey}
                  onClick={() => setSessionKey((n) => n + 1)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs text-primary hover:border-primary/60"
                >
                  ↻ New session
                </button>
              </div>
              <MatchGame
                key={sessionKey}
                pairs={pairs}
                origins={origins}
                instructions="These are the pairs you've struggled with. Match them again — get them right with no misses to graduate them to a longer interval."
              />
              <p className="mt-3 text-xs text-muted-foreground">
                From lessons:{" "}
                {Array.from(new Set(queue.map((q) => q.lessonSlug)))
                  .map((slug) => LESSONS_BY_SLUG[slug]?.title ?? slug)
                  .join(" · ")}
              </p>
            </>
          )}
        </section>

        {topMistakes.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-foreground">Your weakest pairs</h2>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {activeLesson
                ? `Highest miss + reveal count in ${activeLesson.title}`
                : "Highest miss + reveal count across all lessons"}
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
              <ul className="divide-y divide-border">
                {topMistakes.map((s) => {
                  const srcLesson = LESSONS_BY_SLUG[s.lessonSlug];
                  return (
                    <li key={`${s.lessonSlug}::${s.en}`} className="grid gap-1 p-4 sm:grid-cols-[1.2fr_1.5fr_auto] sm:items-center sm:gap-4">
                      <div>
                        <div className="font-serif text-base text-foreground">{s.en}</div>
                        {srcLesson && (
                          <Link
                            to="/lesson/$slug"
                            params={{ slug: s.lessonSlug }}
                            className="text-[11px] uppercase tracking-widest text-primary hover:underline"
                          >
                            {srcLesson.title}
                          </Link>
                        )}
                      </div>

                      <p className="text-sm text-foreground/90">{s.ro}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        {s.misses > 0 && (
                          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">
                            {s.misses} miss{s.misses === 1 ? "" : "es"}
                          </span>
                        )}
                        {s.reveals > 0 && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-700 dark:text-amber-400">
                            {s.reveals} reveal{s.reveals === 1 ? "" : "s"}
                          </span>
                        )}
                        {s.hints > 0 && (
                          <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                            {s.hints} hint{s.hints === 1 ? "" : "s"}
                          </span>
                        )}
                        <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                          box {s.box}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {summary.tracked > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                if (confirm("Clear all review progress? This cannot be undone.")) {
                  clearReviewStats();
                  setSessionKey((n) => n + 1);
                }
              }}
              className="text-xs text-muted-foreground underline hover:text-destructive"
            >
              Reset review history
            </button>
          </div>
        )}
      </article>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={[
        "rounded-xl border bg-card p-4",
        accent ? "border-primary/40" : "border-border",
      ].join(" ")}
    >
      <div className={["font-serif text-3xl", accent ? "text-primary" : "text-foreground"].join(" ")}>
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={[
          "rounded-full px-1.5 text-[10px]",
          active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

