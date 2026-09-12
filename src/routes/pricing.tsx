import { createFileRoute } from "@tanstack/react-router";
import { PricingSection } from "@/components/PricingSection";
import { EnrolmentForm } from "@/components/EnrolmentForm";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/pricing")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Pricing & Payment Plans | H-Visuals Creative Training" },
      {
        name: "description",
        content:
          "Graphic design and video editing training from ₦50,000/month in Lagos. Level upgrades, student pricing and split payment plans.",
      },
      { property: "og:title", content: "Pricing | H-Visuals Creative Training" },
      {
        property: "og:description",
        content:
          "Three levels per track, upgrade top-ups, student special and flexible payment plans.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="bg-background pt-[68px]">
      <section className="section-y bg-ink">
        <div className="shell">
          <Reveal>
            <h1 className="display-xl !text-headline-dark">Clear rates. No surprises.</h1>
            <p className="mt-6 max-w-xl text-ash">
              Pay per month, per level. Continuing students pay only a top-up to move up.
            </p>
          </Reveal>
        </div>
      </section>
      <PricingSection />
      <EnrolmentForm />
    </main>
  );
}
