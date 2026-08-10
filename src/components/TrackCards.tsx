import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion";
import { NAIRA, levels, tracks, type Level } from "@/lib/site-data";
import designImg from "@/assets/track-design.jpg";
import videoImg from "@/assets/track-video.jpg";

const images: Record<string, string> = { design: designImg, video: videoImg };

export function TrackCards() {
  return (
    <section id="courses" className="section-y bg-ink">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <h2 className="display-lg !text-headline-dark">Pick Your Craft.</h2>
          <p className="mt-5 text-ash">
            Choose your path. Enter at your level. Build skills that put you to work.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {tracks.map((track, i) => (
            <Reveal key={track.id} delay={i * 0.12}>
              <TrackCard trackId={track.id} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackCard({ trackId }: { trackId: "design" | "video" }) {
  const track = tracks.find((t) => t.id === trackId)!;
  const [level, setLevel] = useState<Level>("Beginner");
  const plan = track.levels.find((l) => l.level === level)!;

  return (
    <article className="lift-card group h-full overflow-hidden rounded-[20px] border border-border-dark bg-ink-surface">
      <div className="h-[240px] overflow-hidden">
        <img
          src={images[trackId]}
          alt={`${track.name} training`}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover grayscale-[30%] transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      </div>

      <div className="p-7 md:p-9">
        <h3 className="font-display text-[26px] font-bold text-headline-dark">
          {track.emoji} {track.name}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.7] text-ash">{track.blurb}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`mono-label rounded-full border px-4 py-2 transition-colors ${
                level === l
                  ? "border-lime bg-lime text-lime-ink"
                  : "border-border-dark bg-ink-raised text-ash hover:border-lime"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div key={level} className="mt-7" style={{ animation: "hv-fade-up 0.4s ease both" }}>
          <p className="font-display text-2xl font-extrabold text-lime">
            {NAIRA(plan.price)}
            <span className="ml-1 text-base font-medium text-ash">/month</span>
          </p>
          <p className="mono-label mt-2 text-ash">{plan.note}</p>

          <h4 className="mono-label mt-7 text-headline-dark">Curriculum</h4>
          <ul className="mt-3 space-y-2">
            {plan.curriculum.map((c) => (
              <li key={c} className="flex gap-2.5 text-[16px] leading-[1.7] text-ash">
                <span className="text-lime">—</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <h4 className="mono-label mt-7 text-headline-dark">What you get</h4>
          <ul className="mt-3 space-y-2">
            {plan.includes.map((c) => (
              <li key={c} className="flex gap-2.5 text-[16px] leading-[1.7] text-ash">
                <span className="text-lime">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <Link to="/pricing" hash="enrol" className="btn-lime mt-8">
            Enrol Now →
          </Link>
        </div>
      </div>
    </article>
  );
}
