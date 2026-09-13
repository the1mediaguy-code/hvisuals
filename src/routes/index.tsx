import { createFileRoute } from "@tanstack/react-router";
import { CreativeApproach, MediaGrid, SelectedWork, ServicesBand, StudioAbout, StudioCta, StudioHero } from "@/components/StudioSections";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "H-Visuals | Visual Strategy & Creative Direction" },
      { name: "description", content: "H-Visuals makes ideas visible through visual strategy, creative direction, design, campaigns, motion and video." },
      { property: "og:title", content: "H-Visuals | Ideas, made visible." },
      { property: "og:description", content: "Visual strategy and creative direction for brands, people and ideas that deserve to be seen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/" }],
  }),
  component: StudioHome,
});

function StudioHome() {
  return <main><StudioHero /><SelectedWork /><ServicesBand compact /><StudioAbout /><CreativeApproach /><MediaGrid /><StudioCta /></main>;
}
