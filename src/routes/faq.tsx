import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/FaqSection";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ: Training, Tools & Payments | H-Visuals" },
      {
        name: "description",
        content:
          "Answers on experience needed, tools, programme length, certificates, upgrade pricing and how payments work.",
      },
      { property: "og:title", content: "FAQ | H-Visuals Creative Training" },
      {
        property: "og:description",
        content: "Seven honest answers about the H-Visuals design and video training.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="pt-[68px]">
      <section className="section-y bg-ink">
        <div className="shell">
          <Reveal>
            <h1 className="display-xl !text-headline-dark">Before you enrol.</h1>
          </Reveal>
        </div>
      </section>
      <FaqSection />
    </main>
  );
}
