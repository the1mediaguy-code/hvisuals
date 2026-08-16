import { Reveal } from "@/components/motion";
import fybEdits from "@/assets/FYB_EDITS.mp4.asset.json";
import fashion from "@/assets/fashion_content_creation.mp4.asset.json";
import bts from "@/assets/bts_shoot.mp4.asset.json";
import reel from "@/assets/reel.mp4.asset.json";
import eventReel from "@/assets/event_highlight_reel.mp4.asset.json";

type Clip = { src: string; title: string; caption: string };

const showcase: Clip[] = [
  { src: fybEdits.url, title: "FYB Edits", caption: "Final year brand edit" },
  { src: fashion.url, title: "Fashion Content", caption: "Fashion content creation" },
  { src: bts.url, title: "Behind The Scenes", caption: "On set, shoot day" },
  { src: reel.url, title: "Social Reel", caption: "Short-form social reel" },
  { src: eventReel.url, title: "Event Highlights", caption: "Event highlight reel" },
];

const videoTestimonials: Clip[] = [
  { src: reel.url, title: "Ayo", caption: "Video Editing, Intermediate" },
  { src: fashion.url, title: "Hosanna", caption: "Graphic Design, Advanced" },
  { src: eventReel.url, title: "Willie", caption: "Video Editing, Beginner" },
];

function VideoCard({ clip }: { clip: Clip }) {
  return (
    <article className="lift-card overflow-hidden rounded-2xl border border-border-dark bg-ink-surface">
      <video
        src={clip.src}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full bg-ink object-cover"
      />
      <div className="p-5">
        <p className="clash-600 text-[18px] text-headline-dark">{clip.title}</p>
        <p className="mono-label mt-2 text-ash">{clip.caption}</p>
      </div>
    </article>
  );
}

export function VideoShowcase() {
  return (
    <section className="section-y bg-ink">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <h2 className="display-lg !text-headline-dark">Watch our students grow.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcase.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <VideoCard clip={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoTestimonials() {
  return (
    <section className="section-y bg-ink-surface">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <h2 className="display-lg !text-headline-dark">Hear it from the students.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {videoTestimonials.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <VideoCard clip={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
