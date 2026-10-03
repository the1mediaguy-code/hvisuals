import { createFileRoute } from "@tanstack/react-router";
import { Publications, Resources } from "@/components/CommunitySections";

export const Route = createFileRoute("/journal")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Journal & Resources | H-Visuals" }, { name: "description", content: "Writing, ideas and free resources for creatives from H-Visuals." },
  { property: "og:title", content: "Journal & Resources | H-Visuals" }, { property: "og:description", content: "Explore publications and free creative resources from H-Visuals." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/journal" }] }), component: JournalPage });
function JournalPage() { return <main className="pt-24 bg-ink"><header className="studio-shell pt-20 pb-10 text-cream"><p className="editorial-label text-sunshine">Journal</p><h1 className="community-heading text-cream">Ideas worth sharing.</h1></header><Publications /><Resources /></main>; }