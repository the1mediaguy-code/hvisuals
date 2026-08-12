import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Student Portal | Haruna Visuals Creative Training" },
      {
        name: "description",
        content:
          "Class notes, assignments, progress tracking and certificates for enrolled Haruna Visuals students.",
      },
      { property: "og:title", content: "Student Portal | Haruna Visuals" },
      {
        property: "og:description",
        content: "Materials, assignments and certificates for enrolled students.",
      },
    ],
  }),
  component: PortalPage,
});

function PortalPage() {
  return (
    <main className="min-h-screen bg-ink pt-[68px]">
      <div className="shell section-y">
        <Reveal>
          <p className="eyebrow">Student Portal</p>
          <h1 className="display-lg mt-2 !text-headline-dark">Your learning home.</h1>
          <p className="mt-6 max-w-xl text-ash">
            Class notes, weekly assignments, progress tracking and your certificate all live here.
            Student accounts are activated by Emmanuel once your payment is confirmed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-[260px_1fr]">
          <Reveal>
            <aside className="rounded-2xl border border-border-dark bg-ink-surface p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lime font-display font-extrabold text-lime-ink">
                  HV
                </span>
                <div>
                  <p className="font-semibold text-headline-dark">Your name</p>
                  <p className="mono-label text-lime">Track · Level</p>
                </div>
              </div>
              <ul className="mt-7 space-y-3 text-[16px] text-ash">
                <li>📚 Class Materials</li>
                <li>📝 Assignments</li>
                <li>📊 My Progress</li>
                <li>🎓 Certificate</li>
                <li>💬 Contact Instructor</li>
              </ul>
            </aside>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-border-dark bg-ink-surface p-8">
              <div
                className="rounded-xl p-6"
                style={{ background: "var(--lime-highlight)", border: "1px solid var(--lime)" }}
              >
                <p className="text-[16px] text-headline-dark">
                  "Hey: you made it. Your class notes, assignments, and progress all live here. Show
                  up for every session, submit your assignments, and the growth will follow." 
                  Emmanuel
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {[
                  { t: "Week 1: Introduction to Design Thinking", s: "Download PDF" },
                  { t: "Week 2: Canva Fundamentals", s: "🔒 Releases after Week 1 session" },
                  {
                    t: "Assignment 01: The Reverse Engineer",
                    s: "🔒 Due before Week 2 · 10 points",
                  },
                  { t: "Certificate: Beginner Level", s: "🔒 Complete course to unlock" },
                ].map((m) => (
                  <li
                    key={m.t}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-dark bg-ink p-5"
                  >
                    <span className="text-[16px] text-headline-dark">{m.t}</span>
                    <span className="mono-label text-ash">{m.s}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[16px] text-ash">
                Portal accounts, logins and downloads go live with the backend build.
              </p>
              <Link to="/pricing" hash="enrol" className="btn-lime mt-5">
                Enrol to get access →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
