import { SignupForm } from "@/components/CommunityForms";

export const publications = [
  { name: "Oil & Fire", description: "Faith, identity and spiritual reflection.", url: "https://oilandfire.substack.com", cta: "Read on Substack →" },
  { name: "CTRL+CREATE", description: "Creativity, content and digital storytelling.", url: "https://ctrlcreate2.substack.com", cta: "Read on Substack →" },
  { name: "In Progress", description: "Leadership, growth and life.", url: "https://inprogress0.substack.com", cta: "Read on Substack →" },
  { name: "Primary Characters", description: "Stories and tributes to the people who have shaped my journey.", url: "https://primarycharacters.substack.com", cta: "Read on Substack →" },
  { name: "Events", description: "Recaps, highlights and stories from events worth remembering.", url: "https://events502.substack.com", cta: "Read on Substack →" },
  { name: "Infovibes", description: "A community and media platform for creatives.", url: null, cta: "Coming Soon" },
  { name: "Emmanuel Haruna", description: "All writings in one place.", url: "https://substack.com/@emmanuelharuna/posts", cta: "Read on Substack →" },
] as const;

export function Publications({ prominent = false }: { prominent?: boolean }) {
  return <section className="community-section bg-ink text-cream"><div className="studio-shell"><p className="editorial-label text-sunshine">Publications / 01</p><h2 className="community-heading text-cream">Writing &amp; Ideas</h2><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{publications.map((item, index) => <article key={item.name} className="publication-card flex min-h-64 flex-col border-l-4 border-sunshine bg-publication p-7"><span className="font-mono text-xs text-sunshine">0{index + 1} / PUBLICATION</span><h3 className="mt-8 font-display text-2xl text-cream">{item.name}</h3><p className="mt-3 text-base text-cream/75">{item.description}</p>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-8 font-mono text-xs uppercase text-sunshine hover:underline focus-visible:underline">{item.cta}</a> : <span className="mt-auto cursor-not-allowed pt-8 font-mono text-xs uppercase text-cream/45" aria-disabled="true">{item.cta}</span>}</article>)}</div></div></section>;
}

export function Resources() { return <section className="community-section border-t border-cream/20 bg-ink text-cream"><div className="studio-shell grid gap-12 lg:grid-cols-[1fr_1fr]"><div><p className="editorial-label text-sunshine">Resources / 02</p><h2 className="community-heading text-cream">Free Resources<br />for Creatives</h2><p className="mt-7 max-w-lg text-lg text-cream/70">Guides, templates and tools — free for any creative who needs them.</p><div className="mt-12 border-t border-cream/30 py-8 font-serif text-2xl italic text-cream/70">More resources coming soon.</div></div><div className="border-l-2 border-sunshine bg-ink-surface p-7 md:p-10"><h3 className="font-display text-2xl text-cream">Get notified when new resources drop</h3><div className="mt-8"><SignupForm source="creative_resources" label="Keep Me Posted" /></div></div></div></section>; }