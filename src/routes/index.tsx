import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero, StatsBar, RotatingRing, HowItWorks } from "@/components/home-sections";
import { Marquee } from "@/components/Marquee";
import { ToolLogos } from "@/components/ToolLogos";

import { TrackCards } from "@/components/TrackCards";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { EnrolmentForm } from "@/components/EnrolmentForm";
import { Reveal } from "@/components/motion";
import { CONTACT, NAIRA, selfPacedPrices, testimonials } from "@/lib/site-data";
import instructor from "@/assets/instructor.jpg";
import designImg from "@/assets/track-design.jpg";
import videoImg from "@/assets/track-video.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haruna Visuals Creative Training: Design & Video Classes, Lagos" },
      {
        name: "description",
        content:
          "Hands-on graphic design and video editing training in Lagos. Two tracks, three levels, live sessions, personal feedback and a certificate.",
      },
      { property: "og:title", content: "Haruna Visuals Creative Training" },
      {
        property: "og:description",
        content:
          "Graphic design and video editing training that starts with hands-on experience. Two tracks, three levels.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <RotatingRing />

      <section className="bg-ink py-10">
        <ToolLogos />
        <div className="mt-10">
          <Marquee
            items={[
              "● 30+ Creators Trained",
              "● Lagos & UK Clients",
              "● Certificate Included",
              "● 3+ Years Experience",
            ]}
            direction="right"
            speed={46}
          />
        </div>
      </section>


      <TrackCards />
      <HowItWorks />
      <InstructorSection />
      <Testimonials />
      <PricingSection />
      <ComparisonTable />
      <SelfPaced />
      <VideoShowcase />
      <PortalPreview />
      <NotifyCapture />
      <FaqSection />
      <EnrolmentForm />
    </main>
  );
}

function InstructorSection() {
  return (
    <section className="section-y bg-background">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-[72px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px]">
            <img
              src={instructor}
              alt="Emmanuel Haruna, creative instructor"
              loading="lazy"
              width={900}
              height={1125}
              className="aspect-[4/5] w-full object-cover grayscale-[20%] transition-all duration-500 hover:grayscale-0"
            />
            <span className="mono-label absolute bottom-4 left-4 rounded-md bg-ink/80 px-3 py-2 text-headline-dark">
              Your Instructor
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="eyebrow">Meet Your Instructor</p>
          <h2 className="display-lg mt-2">Emmanuel Haruna</h2>
          <p className="mt-6 text-[18px] leading-[1.85] text-body">
            "Lagos-based graphic designer, video editor, content creator, and media personality with
            3+ years of hands-on experience. I've delivered for international brands in Manchester
            UK, hosted bootcamps for young creators here in Lagos, won the YABATECH Interdepartmental
            Oratory Competition, and built two creative brands from the ground up. This programme is
            everything I wish I had when I was starting out, honest, practical, and built to get you
            real results."
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Haruna Visuals ↗", "The Media Guy ↗", "The Outlook Podcast ↗"].map((b) => (
              <a
                key={b}
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mono-label rounded-md border border-border px-4 py-2.5 text-body transition-colors hover:border-lime hover:text-headline"
              >
                {b}
              </a>
            ))}
          </div>
          <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-semibold text-headline lime-underline">
            View my portfolio
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-y bg-ink">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What Students Say</p>
          <h2 className="display-lg mt-2 !text-headline-dark">Proof from the people.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <article className="lift-card h-full rounded-2xl border border-border-dark bg-ink-surface p-7">
                <p className="text-lime">★★★★★</p>
                <p className="mt-4 text-[16px] leading-[1.7] text-ash">"{t.quote}"</p>
                <p className="mono-label mt-5 text-headline-dark">
                  {t.name} · <span className="text-ash">{t.role}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <Marquee
          items={[
            '⭐ "He\'s the best at what he does"· Ajikhe Essentials',
            '⭐ "You made design easy for me"· Willie',
            '⭐ "One of the best decisions I\'ve made"· Ayo',
            '⭐ "You are indeed a creative"· Hosanna',
          ]}
          direction="left"
          speed={50}
        />
      </div>
    </section>
  );
}

const comparison: [string, string, string][] = [
  ["Format", "Live sessions (3×/week)", "Pre-recorded videos"],
  ["Feedback", "Personal written feedback", "None"],
  ["Certificate", "✓ Included", "✗ Not included"],
  ["Pace", "Structured schedule", "Learn anytime"],
  ["Access", "Monthly", "Lifetime"],
  ["Instructor", "Direct WhatsApp access", "None"],
  ["Price", "From ₦50,000/month", "From ₦15,000"],
  ["Best for", "Serious skill building", "Self-motivated learners"],
];

function ComparisonTable() {
  return (
    <section className="section-y bg-background">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Compare Your Options</p>
          <h2 className="display-lg mt-2">Which path is right for you?</h2>
        </Reveal>

        <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-[16px]">
            <thead>
              <tr>
                <th className="mono-label p-4 text-left text-muted-foreground">Feature</th>
                <th className="mono-label bg-lime p-4 text-left text-lime-ink">Live Training</th>
                <th className="mono-label bg-ink p-4 text-left text-headline-dark">
                  Self-Paced Course
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([f, a, b], i) => (
                <tr key={f} className={i % 2 === 0 ? "bg-alt" : "bg-background"}>
                  <td className="p-4 font-semibold text-headline">{f}</td>
                  <td className="p-4 text-body">
                    {a.startsWith("✓") ? <span className="text-lime">{a}</span> : a}
                  </td>
                  <td className="p-4 text-muted-foreground">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/pricing" hash="enrol" className="btn-lime">
            Enrol in Live Training →
          </Link>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost-dark !border-border !text-headline">
            Pre-Order Self-Paced →
          </a>
        </div>
      </div>
    </section>
  );
}

function SelfPaced() {
  const cards = [
    { emoji: "🎨", name: "Graphic Design Self-Paced Course", img: designImg },
    { emoji: "🎬", name: "Video Editing Self-Paced Course", img: videoImg },
  ];

  return (
    <section className="section-y bg-alt">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Self-Paced Courses</p>
          <h2 className="display-lg mt-2">Learn at your own pace.</h2>
          <p className="lead mt-3 text-body">
            Pre-recorded courses for graphic design and video editing. Watch. Practice. Build.
          </p>
          <span className="mono-label animate-pulse-lime mt-6 inline-block rounded-md bg-lime px-3 py-1.5 text-lime-ink">
            Coming Soon
          </span>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.12}>
              <article className="lift-card group h-full overflow-hidden rounded-2xl border border-border bg-background">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-[200px] w-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="p-7">
                  <h3 className="font-display text-xl font-bold">
                    {c.emoji} {c.name}
                  </h3>
                  <p className="mono-label mt-4 text-muted-foreground">
                    {selfPacedPrices
                      .map((p) => `${p.level}: ${NAIRA(p.price)}`)
                      .join("  |  ")}
                  </p>
                  <ul className="mt-5 space-y-2 text-[16px]">
                    {["Lifetime access", "Watch at your own pace", "Downloadable resources"].map(
                      (f) => (
                        <li key={f} className="flex gap-2.5 text-body">
                          <span className="text-lime">✓</span>
                          {f}
                        </li>
                      ),
                    )}
                    {["No certificate included", "No live sessions", "No personal feedback"].map(
                      (f) => (
                        <li key={f} className="flex gap-2.5 text-muted-foreground">
                          <span>✗</span>
                          {f}
                        </li>
                      ),
                    )}
                  </ul>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-lime mt-7"
                  >
                    Pre-Order Now: 30% OFF
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoShowcase() {
  const [open, setOpen] = useState<string | null>(null);
  const videos = [
    { img: designImg, caption: "Brand identity build: student capstone" },
    { img: videoImg, caption: "Event highlight reel: intermediate edit" },
    { img: hero3, caption: "Workshop session: Lagos cohort" },
  ];

  return (
    <section className="section-y bg-ink">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">See It In Action</p>
          <h2 className="display-lg mt-2 !text-headline-dark">Watch our students grow.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.caption} delay={i * 0.12}>
              <button
                type="button"
                onClick={() => setOpen(v.caption)}
                className="lift-card block w-full overflow-hidden rounded-2xl border border-border-dark bg-ink-surface text-left"
              >
                <span className="relative block">
                  <img
                    src={v.img}
                    alt={v.caption}
                    loading="lazy"
                    className="h-[200px] w-full object-cover grayscale-[30%] transition-all duration-500 hover:grayscale-0"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-lime-ink">
                      ▶
                    </span>
                  </span>
                </span>
                <span className="block p-5 text-[16px] text-ash">{v.caption}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center p-6"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpen(null)}
        >
          <div className="w-full max-w-3xl rounded-2xl border border-border-dark bg-ink-surface p-10 text-center">
            <p className="text-headline-dark">{open}</p>
            <p className="mono-label mt-3 text-ash">Video placeholder: real footage coming soon.</p>
            <button type="button" onClick={() => setOpen(null)} className="btn-lime mt-6">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function PortalPreview() {
  return (
    <section className="section-y bg-background">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Student Portal</p>
          <h2 className="display-lg mt-2">Inside your student portal</h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="grid gap-0 overflow-hidden rounded-2xl border border-border-dark bg-ink md:grid-cols-[240px_1fr]">
            <div className="border-border-dark bg-ink-surface p-6 md:border-r">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lime font-display font-extrabold text-lime-ink">
                  AY
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-headline-dark">Ayo A.</p>
                  <p className="mono-label text-lime">Design · Beginner</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-[16px] text-ash">
                <li>📚 Class Materials</li>
                <li>📝 Assignments</li>
                <li>📊 My Progress</li>
                <li>🎓 Certificate</li>
              </ul>
            </div>
            <div className="p-7">
              <div
                className="rounded-xl p-5 text-[16px] text-headline-dark"
                style={{ background: "var(--lime-highlight)", border: "1px solid var(--lime)" }}
              >
                Hey: you made it. Your notes, assignments and progress all live here.
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ["Week 1: Design Thinking", "Download PDF"],
                  ["Week 2: Canva Fundamentals", "🔒 Locked"],
                  ["Certificate: Beginner", "🔒 Locked"],
                ].map(([t, s]) => (
                  <div
                    key={t}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border-dark bg-ink-surface p-4"
                  >
                    <span className="text-[16px] text-headline-dark">{t}</span>
                    <span className="mono-label text-ash">{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="mono-label text-ash">Progress · 35%</p>
                <div className="mt-2 h-2 w-full rounded-full bg-ink-raised">
                  <div className="h-2 w-[35%] rounded-full bg-lime" />
                </div>
              </div>
              <Link to="/pricing" hash="enrol" className="btn-lime mt-7">
                Join to get access →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NotifyCapture() {
  const [done, setDone] = useState(false);
  return (
    <section className="section-y bg-ink-surface">
      <div className="shell max-w-2xl text-center">
        <Reveal>
          <span className="mono-label animate-pulse-lime inline-block rounded-md bg-lime px-3 py-1.5 text-lime-ink">
            Coming Soon
          </span>
          <h2 className="display-lg mt-6 !text-headline-dark">Self-Paced Video Courses</h2>
          <p className="lead mt-3 text-ash">
            Structured graphic design and video editing courses at your own pace are in production.
            Be first to know when they drop.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <input
              required
              type="email"
              placeholder="your@email.com"
              className="field-dark flex-1"
              aria-label="Email address"
            />
            <button type="submit" className="btn-lime justify-center">
              {done ? "✓ You're on the list" : "Notify Me"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
