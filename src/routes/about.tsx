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
          "I have worked with brands both locally and internationally. I've built two creative brands from the ground up. This programme is everything I wish I had when starting out: honest, practical, and built to get you real results."
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
