import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion";
import { NAIRA, levels, tracks, type TrackId } from "@/lib/site-data";

export function PricingSection({ dark = false }: { dark?: boolean }) {
  const [track, setTrack] = useState<TrackId>("design");
  const active = tracks.find((t) => t.id === track)!;

  return (
    <section id="pricing" className={`section-y ${dark ? "bg-ink" : "bg-alt"}`}>
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h2 className={`display-lg mt-4 ${dark ? "!text-headline-dark" : ""}`}>
            Invest in your craft.
          </h2>
          <p className={`mt-5 ${dark ? "text-ash" : "text-body"}`}>
            Start at the level that's right for you. Continuing students pay only a top-up to
            advance.
          </p>
        </Reveal>

        <div className="mt-10 flex gap-3">
          {tracks.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTrack(t.id)}
              className={`mono-label rounded-full border px-5 py-2.5 transition-colors ${
                track === t.id
                  ? "border-lime bg-lime text-lime-ink"
                  : dark
                    ? "border-border-dark bg-ink-raised text-ash hover:border-lime"
                    : "border-border bg-background text-body hover:border-lime"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {active.levels.map((plan, i) => {
            const featured = plan.level === "Intermediate";
            return (
              <Reveal key={plan.level} delay={i * 0.12}>
                <article
                  className={`lift-card flex h-full flex-col rounded-2xl border p-8 ${
                    dark ? "border-border-dark bg-ink-surface" : "border-border bg-background"
                  }`}
                  style={featured ? { borderTop: "3px solid var(--lime)" } : undefined}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label rounded-md bg-lime px-2.5 py-1 text-lime-ink">
                      {plan.level}
                    </span>
                    <span
                      className={`mono-label ${dark ? "text-ash" : "text-muted-foreground"}`}
                    >
                      {active.name}
                    </span>
                  </div>

                  <p
                    className={`mt-6 font-display text-[42px] font-extrabold leading-none ${
                      dark ? "text-headline-dark" : "text-headline"
                    }`}
                  >
                    {NAIRA(plan.price)}
                  </p>
                  <p className={`mono-label mt-2 ${dark ? "text-ash" : "text-muted-foreground"}`}>
                    per month
                  </p>

                  <hr className={`my-6 ${dark ? "border-border-dark" : "border-border"}`} />

                  <ul className="space-y-2.5">
                    {plan.includes.map((f) => (
                      <li
                        key={f}
                        className={`flex gap-2.5 text-[15px] leading-relaxed ${
                          dark ? "text-ash" : "text-body"
                        }`}
                      >
                        <span className="text-lime">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    {plan.upgradeFrom && (
                      <div className="upgrade-box mb-5">
                        <p className={dark ? "text-headline-dark" : "text-headline"}>
                          Already completed {plan.upgradeFrom.level}?
                        </p>
                        <p className="font-bold text-lime">
                          Upgrade for {NAIRA(plan.upgradeFrom.price)}
                        </p>
                      </div>
                    )}
                    <Link to="/pricing" hash="enrol" className="btn-lime w-full justify-center">
                      Enrol Now →
                    </Link>
                    <p
                      className={`mono-label mt-3 text-center ${
                        dark ? "text-ash" : "text-muted-foreground"
                      }`}
                    >
                      50% deposit: {NAIRA(plan.deposit)}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Student special */}
        <Reveal className="mt-8">
          <div
            className={`rounded-2xl border p-8 md:p-10 ${
              dark ? "border-border-dark bg-ink-surface" : "border-border bg-background"
            }`}
          >
            <span className="mono-label rounded-md bg-lime px-2.5 py-1 text-lime-ink">
              Student Special
            </span>
            <h3
              className={`mt-5 font-display text-3xl font-bold ${
                dark ? "text-headline-dark" : "text-headline"
              }`}
            >
              You're a student. We see you.
            </h3>
            <p className={`mt-4 max-w-3xl ${dark ? "text-ash" : "text-body"}`}>
              Currently enrolled in school? You qualify for our student pricing — ₦30,000 for 2
              months + 1 month free coaching. Same materials, same feedback, same certificate. Just
              a rate built for your pocket.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Beginner to Pro — full 3-level journey at student pricing",
                "₦30,000 for 2 months + 1 month free",
                "Same access — full materials, feedback, and certificate",
              ].map((p) => (
                <div
                  key={p}
                  className={`rounded-xl border p-5 text-[15px] ${
                    dark
                      ? "border-border-dark bg-ink text-ash"
                      : "border-border bg-alt text-body"
                  }`}
                >
                  {p}
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/2348160695213"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-dark mt-8 !border-lime !text-lime"
            >
              📎 Upload Student ID to Unlock Student Pricing
            </a>
          </div>
        </Reveal>

        {/* Payment plans */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Full Payment",
              body: "Pay your full monthly fee upfront. Full unrestricted portal access from day one. No interruptions.",
              note: "✓ Full portal access · No restrictions",
            },
            {
              title: "Split Payment (50% now)",
              body: "Pay 50% to start. Balance by Week 2. Portal access is full from the start but automatically pauses if balance is overdue.",
              note: "⚠ Portal pauses if balance is overdue",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <div
                className={`h-full rounded-xl border p-8 ${
                  dark ? "border-border-dark bg-ink-surface" : "border-border bg-background"
                }`}
              >
                <h4
                  className={`font-display text-[22px] font-bold ${
                    dark ? "text-headline-dark" : "text-headline"
                  }`}
                >
                  {c.title}
                </h4>
                <p className={`mt-3 text-[16px] ${dark ? "text-ash" : "text-body"}`}>{c.body}</p>
                <p className="mono-label mt-5 text-lime">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mono-label mt-6 text-ash">
          Payment methods: Bank transfer (Access Bank · 1491527289) · Card via Paystack
        </p>

        <p className="mono-label mt-2 text-muted-foreground">
          Levels available: {levels.join(" · ")}
        </p>
      </div>
    </section>
  );
}
