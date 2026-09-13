import { createFileRoute } from "@tanstack/react-router";
import { CreativeApproach, ServicesBand, StudioCta } from "@/components/StudioSections";

export const Route = createFileRoute("/services")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Creative Services | H-Visuals Studio" },
    { name: "description", content: "Brand identity, creative direction, campaigns, social media design, motion, video and digital experiences from H-Visuals." },
    { property: "og:title", content: "Creative Services | H-Visuals Studio" },
    { property: "og:description", content: "From strategy to execution, H-Visuals brings ideas to life." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/services" }] }),
  component: ServicesPage,
});

function ServicesPage() { return <main className="pt-24"><section className="studio-page-intro"><div className="studio-shell"><p className="editorial-label">Services / 02</p><h1 className="studio-display max-w-6xl">Strategy gives creativity <span className="text-sunshine">direction.</span></h1><p className="studio-intro-copy">We shape ideas into clear, connected visual experiences across design and motion.</p></div></section><ServicesBand /><CreativeApproach /><StudioCta /></main>; }
