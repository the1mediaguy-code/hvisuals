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
import { VideoShowcase, VideoTestimonials } from "@/components/VideoSections";
import mediaGuy from "@/assets/the-media-guy.jpg.asset.json";
import outlookLogo from "@/assets/outlook-podcast.jpg.asset.json";
import hvLogoWhite from "@/assets/hv-logo-white.png.asset.json";
import { BrandLogos } from "@/components/BrandLogos";
import { CONTACT, NAIRA, selfPacedPrices, testimonials } from "@/lib/site-data";
import instructorAsset from "@/assets/instructor.png.asset.json";
import designImg from "@/assets/training-track-design.jpg";
import videoImg from "@/assets/training-track-video.jpg";

const brandChips = [
  { label: "H-Visuals", logo: hvLogoWhite.url, invert: true },
  { label: "The Media Guy", logo: mediaGuy.url, invert: false },
  { label: "The Outlook Podcast", logo: outlookLogo.url, invert: false },
];



export const Route = createFileRoute("/training")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Creative Training | H-Visuals" },
      {
        name: "description",
        content:
          "Hands-on graphic design and video editing training in Lagos. Two tracks, three levels, live sessions, personal feedback and a certificate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "H-Visuals Creative Training: Design & Video Classes, Lagos" },
      {
        property: "og:description",
        content:
          "Hands-on graphic design and video editing training in Lagos. Two tracks, three levels, live sessions, personal feedback and a certificate.",
      },
    ],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <main className="training-page">
      <Hero />
      <StatsBar />
      <RotatingRing />

      <section className="bg-ink py-10">
        <ToolLogos />
        <div className="mt-12">
          <BrandLogos />
        </div>
        <div className="mt-10">
          <Marquee
            items={[
              "● 30+ Creators Trained",
              "● Local & International Clients",
              "● Certificate Included",
              "● 3+ Years Experience",
            ]}
            direction="right"
            speed={46}
            bold
          />
        </div>
      </section>


      <TrackCards />
      <HowItWorks />
      <InstructorSection />
      <Testimonials />
      <VideoTestimonials />
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
          <div className="editorial-media portrait-glow relative overflow-hidden rounded-lg">
            <img
              src={instructorAsset.url}
              alt="Emmanuel Haruna, creative instructor"
              loading="lazy"
              width={900}
              height={1125}
              className="aspect-[4/5] w-full object-cover grayscale-[15%] transition-all duration-500 hover:-translate-y-1 hover:grayscale-0"
            />
            <span className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-sm bg-ink/90 px-3 py-2 font-mono text-[11px] text-headline-dark">
              <span className="h-2 w-2 rounded-full bg-sunshine" /> Visual Director · Lagos
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="display-lg">Emmanuel Haruna</h2>
          <p className="mt-6 text-[18px] leading-[1.85] text-body">
            "I have worked with brands both locally and internationally. I've built two creative brands from the ground up. This programme is everything I wish I had when starting out: honest, practical, and built to get you real results."
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {brandChips.map((b) => (
              <a
                key={b.label}
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mono-label flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-body transition-colors hover:border-lime hover:text-headline"
              >
                <img
                  src={b.logo}
                  alt=""
                  aria-hidden
                  className={`h-6 w-auto max-w-[90px] object-contain ${b.invert ? "invert" : "rounded-[4px]"}`}
                />
                {b.label} ↗
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
          <h2 className="display-lg !text-headline-dark">Proof from the people.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <article className="lift-card h-full rounded-2xl border border-border-dark bg-ink-surface p-7">
                <p className="text-lime">★★★★★</p>
                <p className="clash-600 mt-4 text-[18px] leading-[1.6] text-ash">"{t.quote}"</p>
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
          <h2 className="display-lg">Which path is right for you?</h2>
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
          <h2 className="display-lg">Learn at your own pace.</h2>
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
              <article className="lift-card group h-full overflow-hidden rounded-lg border border-border bg-background">
                <div className="editorial-media h-[200px] overflow-hidden"><img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover grayscale-[15%] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                /></div>
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

function PortalPreview() {
  return (
    <section className="section-y bg-background">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <h2 className="display-lg">Inside your student portal</h2>
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
