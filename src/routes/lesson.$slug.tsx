import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { LESSONS_BY_SLUG, type Exercise } from "@/lib/lessons";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { MatchGame } from "@/components/MatchGame";



export const Route = createFileRoute("/lesson/$slug")({
  head: ({ params }) => {
    const l = LESSONS_BY_SLUG[params.slug];
    const title = l ? `${l.title} — English in Real Life` : "Lesson — English in Real Life";
    const desc = l?.summary ?? "A real-life English lesson.";
    const url = `https://french-verb-bloom.lovable.app/lesson/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: l
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LearningResource",
                name: `${l.title} — ${l.tagline}`,
                description: l.summary,
                inLanguage: "en",
                educationalLevel: l.level,
                learningResourceType: "Lesson",
                teaches: l.cefr,
                url,
              }),
            },
          ]
        : undefined,
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Lesson not found</h1>
        <p className="mt-3 text-muted-foreground">This situation doesn't exist (yet).</p>
        <Link to="/" className="mt-6 inline-block text-primary underline">
          ← Back to all lessons
        </Link>
      </div>
    </div>
  ),
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = LESSONS_BY_SLUG[slug];
  if (!lesson) {
    throw notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
          ← All lessons
        </Link>

        <header className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <img
              src={lesson.image}
              alt={`Illustration: ${lesson.title}`}
              width={1024}
              height={1024}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-4xl">{lesson.emoji}</span>
            <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              {lesson.level}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-5xl text-foreground">{lesson.title}</h1>
          <p className="mt-1 text-muted-foreground">{lesson.tagline}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-primary">{lesson.cefr}</p>
          <p className="mt-4 text-lg text-muted-foreground">{lesson.summary}</p>
        </header>

        {/* Dialog */}
        <Section number="1" title="Real-life dialogue" subtitle="Read it out loud.">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            {lesson.dialog.map((line, i) => (
              <div key={i}>
                <div className="text-[11px] uppercase tracking-widest text-primary">
                  {line.speaker}
                </div>
                <div className="mt-1 font-serif text-xl text-foreground whitespace-pre-line">
                  {line.en}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Explanations */}
        <Section number="2" title="Explanations" subtitle="What's actually going on.">
          <div className="space-y-3">
            {lesson.explanations.map((e, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="font-serif text-lg text-primary">{e.title}</div>
                <p className="mt-1 text-sm text-foreground/90">{e.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Vocabulary */}
        <Section number="3" title="C1 vocabulary" subtitle="Idioms, phrasal verbs, collocations · meanings in Romanian.">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {lesson.vocabulary.map((v, i) => (
                <li key={i} className="grid gap-1 p-4 sm:grid-cols-[1fr_2fr] sm:gap-4">
                  <div>
                    <div className="font-serif text-lg text-foreground">{v.term}</div>
                    <span className="mt-1 inline-block rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {v.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/90">{v.meaning}</p>
                    <p className="mt-1 text-sm italic text-muted-foreground">“{v.example}”</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Exercises */}
        <Section number="4" title="Exercises" subtitle="Fill in, choose, transform.">
          <div className="space-y-4">
            {lesson.exercises.map((ex, i) => (
              <ExerciseCard key={i} index={i + 1} ex={ex} />
            ))}
          </div>
        </Section>

        {/* Free response */}
        <Section number="5" title="Free response" subtitle="Now you produce the language.">
          <FreeResponse prompt={lesson.freePrompt.prompt} hint={lesson.freePrompt.hint} />
        </Section>

        {/* Mini-game */}
        <Section number="6" title="Mini-game: Match" subtitle="Match each English expression with its Romanian meaning.">
          <MatchGame pairs={lesson.match} origins={lesson.slug} />
        </Section>


        <div className="mt-16 flex justify-between text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            ← Back to lessons
          </Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}

function Section({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-serif text-3xl text-primary">{number}</span>
        <div>
          <h2 className="font-serif text-2xl text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?;:'"]/g, "").replace(/\s+/g, " ");
}

function ExerciseCard({ ex, index }: { ex: Exercise; index: number }) {
  const [value, setValue] = useState("");
  const [picked, setPicked] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "ok" | "no">("idle");

  if (ex.kind === "fill") {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Exercise {index} · Fill in
        </div>
        <p className="mt-2 font-serif text-lg text-foreground">{ex.prompt}</p>
        {ex.hint && <p className="mt-1 text-xs text-muted-foreground italic">{ex.hint}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setStatus("idle");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setStatus(ex.answers.includes(normalize(value)) ? "ok" : "no");
              }
            }}
            placeholder="Your answer…"
            aria-label={`Your answer to exercise ${index}: ${ex.prompt}`}
            className="flex-1 min-w-[160px] rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => setStatus(ex.answers.includes(normalize(value)) ? "ok" : "no")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Check
          </button>
        </div>
        {status === "ok" && (
          <p className="mt-2 text-sm text-success">✓ Correct!</p>
        )}
        {status === "no" && (
          <p className="mt-2 text-sm text-destructive">
            ✗ Try again. (Accepted answers: {ex.answers.join(", ")})
          </p>
        )}
      </div>
    );
  }

  if (ex.kind === "transform") {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Exercise {index} · Transform
        </div>
        <p className="mt-2 font-serif text-lg text-foreground">{ex.prompt}</p>
        <p className="mt-2 rounded-md border border-border bg-background px-3 py-2 font-serif italic text-foreground">
          “{ex.sentence}”
        </p>
        {ex.hint && <p className="mt-1 text-xs text-muted-foreground italic">{ex.hint}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setStatus("idle");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setStatus(ex.answers.includes(normalize(value)) ? "ok" : "no");
              }
            }}
            placeholder="Your rewrite in English…"
            aria-label={`Your English rewrite for exercise ${index}`}
            className="flex-1 min-w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => setStatus(ex.answers.includes(normalize(value)) ? "ok" : "no")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Check
          </button>
        </div>
        {status === "ok" && <p className="mt-2 text-sm text-success">✓ Excellent!</p>}
        {status === "no" && (
          <p className="mt-2 text-sm text-destructive">
            ✗ Try again. Accepted examples:
            <span className="mt-1 block italic text-muted-foreground">{ex.answers.join(" · ")}</span>
          </p>
        )}
      </div>
    );
  }

  // choice
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
        Exercise {index} · Choose
      </div>
      <p className="mt-2 font-serif text-lg text-foreground">{ex.prompt}</p>
      <div className="mt-3 grid gap-2">
        {ex.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === ex.correct;
          const showState = picked !== null;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={[
                "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                showState && isCorrect
                  ? "border-success bg-success/10 text-foreground"
                  : showState && isPicked && !isCorrect
                  ? "border-destructive bg-destructive/10 text-foreground"
                  : "border-border bg-background hover:border-primary/60",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && ex.explain && (
        <p className="mt-2 text-xs text-muted-foreground italic">{ex.explain}</p>
      )}
    </div>
  );
}

function FreeResponse({ prompt, hint }: { prompt: string; hint: string }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="font-serif text-lg text-foreground">{prompt}</p>
      <p className="mt-1 text-xs text-muted-foreground italic">Tip: {hint}</p>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSent(false);
        }}
        rows={4}
        placeholder="Write your answer here in English…"
        aria-label={`Free response in English: ${prompt}`}
        className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{words} words</span>
        <button
          onClick={() => setSent(true)}
          disabled={words < 3}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
        >
          Save
        </button>
      </div>
      {sent && (
        <p className="mt-2 text-sm text-success">
          ✓ Nicely done. Producing your own language is the best practice — now read it out loud.
        </p>
      )}
    </div>
  );
}


