import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/motion";
import { CONTACT } from "@/lib/site-data";
import instructor from "@/assets/instructor.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Emmanuel Haruna | Haruna Visuals Creative Training" },
      {
        name: "description",
        content:
          "Emmanuel Haruna trains creators in Lagos: graphic design, video editing, honest feedback and real client-ready work.",
      },
      { property: "og:title", content: "About Emmanuel Haruna | Haruna Visuals" },
      {
        property: "og:description",
        content: "Lagos-based designer and editor training creators to build real skills.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background pt-[68px]">
      <section className="section-y bg-ink">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[20px] border border-border-dark">
              <img
                src={instructor}
                alt="Emmanuel Haruna, founder of Haruna Visuals Creative Training"
                width={1200}
                height={1400}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow">Meet Your Instructor</p>
            <h1 className="display-lg mt-2 !text-headline-dark">Emmanuel Haruna</h1>
            <p className="mt-6 text-[18px] leading-[1.85] text-ash">
              "I have worked with brands both locally and internationally. I've built two creative
              brands from the ground up. This programme is everything I wish I had when starting
              out: honest, practical, and built to get you real results."
            </p>


            <div className="mt-8 flex flex-wrap gap-3">
              {["Haruna Visuals ↗", "The Media Guy ↗", "The Outlook Podcast ↗"].map((b) => (
                <a
                  key={b}
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mono-label rounded-md border border-border-dark px-4 py-2.5 text-ash transition-colors hover:border-lime hover:text-lime"
                >
                  {b}
                </a>
              ))}
            </div>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-lime"
            >
              View my portfolio
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="shell grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Trained creators",
              d: "30+ students taken from zero to paid work across design and video.",
            },
            {
              t: "Client delivery",
              d: "Brand and content work delivered for Lagos and UK-based clients.",
            },
            {
              t: "Teaching style",
              d: "Hands-on from session one. Every assignment gets written feedback.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.12}>
              <div className="lift-card h-full rounded-2xl border border-border bg-background p-7">
                <h2 className="font-display text-xl font-bold">{c.t}</h2>
                <p className="mt-3 text-[16px] text-body">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
