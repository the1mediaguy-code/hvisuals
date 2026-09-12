import { createFileRoute } from "@tanstack/react-router";
import { TrackCards } from "@/components/TrackCards";
import { Reveal } from "@/components/motion";
import { NAIRA, tracks } from "@/lib/site-data";

export const Route = createFileRoute("/courses")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Courses: Graphic Design & Video Editing | H-Visuals" },
      {
        name: "description",
        content:
          "Full curricula for six track/level combinations: graphic design and video editing at Beginner, Intermediate and Advanced.",
      },
      { property: "og:title", content: "Courses | H-Visuals Creative Training" },
      {
        property: "og:description",
        content:
          "Two tracks, three levels, 12 live sessions per level with personal feedback and a certificate.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <main className="pt-[68px]">
      <section className="section-y bg-ink">
        <div className="shell">
          <Reveal>
            <h1 className="display-xl !text-headline-dark">Two tracks. Three levels.</h1>
            <p className="mt-6 max-w-xl text-ash">
              Every level is 12 live sessions across 4 weeks, with weekly assignments and written
              feedback on every submission.
            </p>
          </Reveal>
        </div>
      </section>

      <TrackCards />

      <section className="section-y bg-alt">
        <div className="shell">
          <Reveal>
            <h2 className="display-lg">Every module, every level.</h2>
          </Reveal>

          <div className="mt-12 space-y-14">
            {tracks.map((track) => (
              <div key={track.id}>
                <h3 className="font-display text-3xl font-bold">
                  {track.emoji} {track.name}
                </h3>
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  {track.levels.map((plan, i) => (
                    <Reveal key={plan.level} delay={i * 0.12}>
                      <article className="lift-card h-full rounded-2xl border border-border bg-background p-7">
                        <span className="mono-label rounded-md bg-lime px-2.5 py-1 text-lime-ink">
                          {plan.level}
                        </span>
                        <p className="mt-5 font-display text-2xl font-extrabold text-headline">
                          {NAIRA(plan.price)}
                          <span className="ml-1 text-base font-medium text-muted-foreground">
                            /month
                          </span>
                        </p>
                        <h4 className="mono-label mt-6 text-headline">Modules</h4>
                        <ul className="mt-3 space-y-2">
                          {plan.curriculum.map((c) => (
                            <li key={c} className="flex gap-2.5 text-[16px] text-body">
                              <span className="text-lime">●</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                        <h4 className="mono-label mt-6 text-headline">Deliverables</h4>
                        <ul className="mt-3 space-y-2">
                          {plan.includes.map((c) => (
                            <li key={c} className="flex gap-2.5 text-[16px] text-body">
                              <span className="text-lime">✓</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
