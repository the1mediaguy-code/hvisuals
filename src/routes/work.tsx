import { createFileRoute } from "@tanstack/react-router";
import { MediaGrid, SelectedWork, StudioCta } from "@/components/StudioSections";

export const Route = createFileRoute("/work")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Selected Work | H-Visuals Studio" },
    { name: "description", content: "Explore selected campaign design, social content, fashion creative, motion and video work by H-Visuals." },
    { property: "og:title", content: "Selected Work | H-Visuals Studio" },
    { property: "og:description", content: "A considered selection of design, campaign, motion and video work by H-Visuals." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/work" }] }),
  component: WorkPage,
});

function WorkPage() { return <main className="pt-24"><section className="studio-page-intro"><div className="studio-shell"><p className="editorial-label">Work / 01</p><h1 className="studio-display max-w-5xl">Ideas, made <span className="font-serif italic">visible.</span></h1><p className="studio-intro-copy">A growing body of campaign design, social content, fashion creative, motion and video.</p></div></section><SelectedWork all /><MediaGrid /><StudioCta /></main>; }
