import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS } from "@/lib/lessons";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import heroImg from "@/assets/hero-collage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "English in Real Life — Learn the English you actually use" },
      {
        name: "description",
        content:
          "Learn English the way you actually use it: at the restaurant, the airport, the job interview, with friends or online. Dialogues, exercises and mini-games at C1.",
      },
      { property: "og:title", content: "English in Real Life — Learn the English you actually use" },
      {
        property: "og:description",
        content:
          "The English you actually use — real situations, not abstract word lists.",
      },
      { property: "og:url", content: "https://french-verb-bloom.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://french-verb-bloom.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="paper-texture absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="grid items-end gap-10 md:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-primary">
                English in real life
              </p>
              <h1 className="font-serif text-5xl leading-[1.05] text-foreground sm:text-7xl">
                Speak English
                <span className="block italic text-primary">the way it's actually spoken.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Every lesson is one real situation. Order at a restaurant, get through check-in,
                answer an interview question, chat with friends or write an email. No abstract
                lists.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#lectii"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  Start learning →
                </a>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                <img
                  src={heroImg}
                  alt="Illustration: everyday scenes where you speak English"
                  width={1536}
                  height={1024}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
              <div className="absolute -right-3 -top-3 rounded-full bg-or px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow">
                6 situations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          {[
            { n: LESSONS.length, l: "Real situations" },
            { n: "C1", l: "Target level" },
            { n: "5+", l: "Exercise types" },
            { n: "🎮", l: "Mini-game in every lesson" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-4xl text-primary">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lessons */}
      <section id="lectii" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h2 className="font-serif text-4xl text-foreground">The situations</h2>
          <p className="mt-2 text-muted-foreground">
            Pick a situation. Read the dialogue, learn the rules, practise, play.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map((l) => (
            <Link
              key={l.slug}
              to="/lesson/$slug"
              params={{ slug: l.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
                <img
                  src={l.image}
                  alt={`Illustration: ${l.title}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-2xl">{l.emoji}</div>
                    <div className="mt-2 font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                      {l.title}
                    </div>
                    <div className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                      {l.tagline}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {l.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{l.summary}</p>
                <div className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open lesson →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
