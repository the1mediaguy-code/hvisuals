import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/journal")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Journal | H-Visuals Studio" },
    { name: "description", content: "The H-Visuals journal is being prepared as a place for notes on visual strategy, direction and making." },
    { property: "og:title", content: "Journal | H-Visuals Studio" },
    { property: "og:description", content: "Notes on visual strategy, creative direction and making, coming soon from H-Visuals." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/journal" }] }),
  component: JournalPage,
});

function JournalPage() { return <main className="min-h-[80svh] bg-cream pt-24 text-forest"><section className="studio-page-intro"><div className="studio-shell"><p className="editorial-label">Journal / 03</p><h1 className="studio-display max-w-5xl">Field notes are <span className="font-serif italic">growing.</span></h1><div className="mt-14 grid gap-8 border-t border-forest pt-8 md:grid-cols-2"><p className="studio-intro-copy mt-0">A considered journal on visual strategy, creative direction and the process behind making ideas visible is coming soon.</p><div className="md:text-right"><Link to="/work" className="studio-text-link md:justify-end">Explore the work meanwhile <ArrowRight size={17} /></Link></div></div></div></section></main>; }
