import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Counter, Reveal } from "@/components/motion";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import designImg from "@/assets/track-design.jpg";
import videoImg from "@/assets/track-video.jpg";
import instructor from "@/assets/instructor.jpg";

const slides = [hero1, hero2, hero3];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink">
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(12,12,12,0.93) 40%, rgba(12,12,12,0.4) 100%)",
        }}
      />

      <div className="shell relative w-full py-28">
        <div className="max-w-[640px]">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime"
            style={{ animation: "hv-fade-up 0.6s ease both" }}
          >
            Haruna Visuals Creative Training
          </p>

          <h1 className="display-xl mt-6 !text-headline-dark">
            {["Training", "Creators", "to BUILD."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="relative block"
                  style={{ animation: `hv-slide-up 0.8s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.15}s both` }}
                >
                  {line === "Creators" ? (
                    <span className="relative inline-block text-lime">
                      Creators
                      <span
                        className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
                        style={{ animation: "hv-draw 0.7s ease 1.1s both" }}
                      />
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-[500px] text-[18px] text-ash"
            style={{ animation: "hv-fade-up 0.7s ease 0.9s both" }}
          >
            Graphic design and video editing training that starts with hands-on experience. Two
            tracks, three levels.
          </p>

          <div
            className="mt-9 flex flex-wrap gap-3"
            style={{ animation: "hv-fade-up 0.7s ease 1.05s both" }}
          >
            <Link to="/pricing" hash="enrol" className="btn-lime animate-pulse-lime">
              Enrol Now →
            </Link>
            <Link to="/courses" className="btn-ghost-dark">
              See Courses
            </Link>
          </div>

          <p
            className="mt-8 font-mono text-xs text-ash"
            style={{ animation: "hv-fade-up 0.7s ease 1.2s both" }}
          >
            3 sessions/week · Personal feedback · Certificate included
          </p>

          <div className="mt-10 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-lime" : "w-2 bg-border-dark"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBar() {
  const stats = [
    { n: 30, s: "+", l: "Students Trained" },
    { n: 3, s: "+", l: "Years Experience" },
    { n: 2, s: "", l: "Tracks Available" },
    { n: 6, s: "", l: "Certificates Issued" },
  ];
  return (
    <section className="border-y border-border-dark bg-ink-surface py-10">
      <div className="shell grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((st, i) => (
          <Reveal
            key={st.l}
            delay={i * 0.12}
            className={i > 0 ? "md:border-l md:border-border-dark md:pl-8" : ""}
          >
            <p className="font-display text-[42px] font-extrabold leading-none text-lime md:text-[52px]">
              <Counter target={st.n} suffix={st.s} />
            </p>
            <p className="mono-label mt-3 text-ash">{st.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const ringImages = [designImg, videoImg, hero1, hero2, hero3, instructor, designImg, videoImg];

export function RotatingRing() {
  const wrap = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const drag = useRef<{ x: number; start: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (!drag.current) setAngle((a) => a + dt * 0.006);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="section-y overflow-hidden bg-ink">
      <div className="shell text-center">
        <Reveal>
          <p className="eyebrow">Student Work & Projects</p>
          <h2 className="display-lg mt-4 !text-headline-dark">Real work. Real results.</h2>
        </Reveal>
      </div>

      <div
        ref={wrap}
        className="relative mx-auto mt-16 h-[420px] w-full max-w-[900px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, start: angle };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setAngle(drag.current.start + (e.clientX - drag.current.x) * 0.3);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerLeave={() => {
          drag.current = null;
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
        >
          {ringImages.map((src, i) => {
            const step = 360 / ringImages.length;
            return (
              <div
                key={`${src}-${i}`}
                className="absolute left-0 top-0 h-[170px] w-[130px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border-dark transition-transform duration-300 hover:z-10 hover:scale-110"
                style={{ transform: `rotate(${i * step}deg) translateY(-190px) rotate(2deg)` }}
              >
                <img
                  src={src}
                  alt="Student project placeholder"
                  loading="lazy"
                  className="h-full w-full object-cover brightness-[0.8] transition-all duration-300 hover:brightness-110"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Choose Your Track",
      d: "Pick Graphic Design or Video Editing. Tell us your level. We place you at the right starting point — no wasted time, no repeating what you know.",
    },
    {
      n: "02",
      t: "Show Up & Build",
      d: "3 sessions per week. Weekly assignments. Personal feedback on every submission. Show up consistently and progress is inevitable.",
    },
    {
      n: "03",
      t: "Leave With Proof",
      d: "A portfolio of real work. A Certificate. The confidence to charge for your craft. Month 1 is just the beginning.",
    },
  ];

  return (
    <section className="section-y bg-alt">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">The Process</p>
          <h2 className="display-lg mt-4">Simple. Clear. Effective.</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.12}
              className={i > 0 ? "md:border-l md:border-border md:pl-10" : ""}
            >
              <p
                className="font-display text-[60px] font-extrabold leading-none text-lime"
                style={{ opacity: 0.2 }}
              >
                {s.n}
              </p>
              <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-3 text-[16px] text-body">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
