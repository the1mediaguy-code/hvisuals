import { createFileRoute } from "@tanstack/react-router";
import { CreativeApproach, StudioAbout, StudioCta } from "@/components/StudioSections";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "About H-Visuals | A Creative Studio Built on Purpose" },
    { name: "description", content: "Meet H-Visuals, the Lagos creative studio led by Emmanuel Haruna and built around strategy, direction, design and motion." },
    { property: "og:title", content: "About H-Visuals | Creative Studio" },
    { property: "og:description", content: "A creative studio built on purpose, making ideas visible through strategy, design and motion." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/about" }] }),
  component: AboutPage,
});

function AboutPage() { return <main className="pt-24"><section className="studio-page-intro"><div className="studio-shell"><p className="editorial-label">About / Studio</p><h1 className="studio-display max-w-6xl">A creative studio built on <span className="text-sunshine">purpose.</span></h1><p className="studio-intro-copy">Clear thinking, intentional craft and human stories shape the way H-Visuals works.</p></div></section><StudioAbout full /><CreativeApproach /><StudioCta /></main>; }
