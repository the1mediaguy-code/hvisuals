import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, SOCIALS } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Contact H-Visuals | Start a Project" },
    { name: "description", content: "Start a conversation with H-Visuals about visual strategy, creative direction, design, campaigns, motion or video." },
    { property: "og:title", content: "Contact H-Visuals | Start a Project" },
    { property: "og:description", content: "Have an idea? Let’s make it visible with H-Visuals." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://hvisuals.lovable.app/contact" }] }),
  component: ContactPage,
});

function ContactPage() {
  const options = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: Mail },
    { label: "WhatsApp", value: "Start a conversation", href: CONTACT.whatsapp, Icon: MessageCircle },
    { label: "Phone", value: CONTACT.phone, href: `tel:+234${CONTACT.phone.slice(1)}`, Icon: Phone },
    { label: "Instagram", value: "@harunavisuals", href: SOCIALS.instagram, Icon: Instagram },
  ];
  return <main className="min-h-screen bg-forest pt-24 text-cream"><section className="studio-page-intro"><div className="studio-shell"><p className="editorial-label text-sunshine">Contact / 04</p><h1 className="studio-display max-w-5xl text-cream">Let&apos;s grow the <span className="text-sunshine">idea.</span></h1><p className="studio-intro-copy text-cream/75">Tell us what you are building, where you are now and what needs to become visible.</p><div className="mt-16 grid border-t border-cream/30 md:grid-cols-2">{options.map(({ label, value, href, Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group flex min-h-40 items-end justify-between border-b border-cream/30 p-6 transition-colors hover:bg-sunshine hover:text-forest md:border-r"><div><span className="font-mono text-xs uppercase">{label}</span><p className="mt-3 font-display text-xl md:text-2xl">{value}</p></div><Icon className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>)}</div></div></section></main>;
}