import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/FaqSection";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Training, Tools & Payments | Haruna Visuals" },
      {
        name: "description",
        content:
          "Answers on experience needed, tools, programme length, certificates, upgrade pricing and how payments work.",
      },
      { property: "og:title", content: "FAQ | Haruna Visuals Creative Training" },
      {
        property: "og:description",
        content: "Seven honest answers about the Haruna Visuals design and video training.",
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
            <p className="eyebrow">Questions</p>
            <h1 className="display-xl mt-2 !text-headline-dark">Before you enrol.</h1>
          </Reveal>
        </div>
      </section>
      <FaqSection />
    </main>
  );
}
