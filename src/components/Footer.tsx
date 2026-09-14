import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { CONTACT, SOCIALS } from "@/lib/site-data";

const studioLinks = [{ to: "/work", label: "Work" }, { to: "/about", label: "About" }, { to: "/services", label: "Services" }, { to: "/journal", label: "Journal" }, { to: "/contact", label: "Contact" }] as const;
const trainingLinks = [{ to: "/training", label: "Training" }, { to: "/courses", label: "Courses" }, { to: "/pricing", label: "Pricing" }, { to: "/portal", label: "Student portal" }, { to: "/faq", label: "FAQ" }] as const;

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="studio-shell border-t border-cream/25 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6"><p className="font-display text-5xl md:text-7xl">H-VISUALS<span className="text-sunshine">.</span></p><p className="mt-5 font-serif text-2xl italic text-cream/80">Ideas, made visible.</p><p className="mt-2 text-sm text-cream/60">Visual Strategy & Creative Direction</p></div>
          <div className="md:col-span-2"><p className="font-mono text-xs uppercase text-sunshine">Studio</p><ul className="mt-5 space-y-2">{studioLinks.map((link) => <li key={link.to}><Link to={link.to} className="footer-link">{link.label}</Link></li>)}</ul></div>
          <div className="md:col-span-2"><p className="font-mono text-xs uppercase text-sunshine">Training</p><ul className="mt-5 space-y-2">{trainingLinks.map((link) => <li key={link.to}><Link to={link.to} className="footer-link">{link.label}</Link></li>)}</ul></div>
          <div className="md:col-span-2"><p className="font-mono text-xs uppercase text-sunshine">Connect</p><div className="mt-5 flex gap-4"><a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-icon"><Instagram size={19} /></a><a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-icon"><Linkedin size={19} /></a><a href={SOCIALS.twitter} target="_blank" rel="noreferrer" aria-label="X" className="footer-icon"><Twitter size={19} /></a><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-icon"><MessageCircle size={19} /></a></div><a href={`mailto:${CONTACT.email}`} className="mt-6 block break-all text-sm text-cream/65 hover:text-sunshine">{CONTACT.email}</a></div>
        </div>
      </div>
      <div className="border-t border-cream/20"><div className="studio-shell flex flex-col justify-between gap-2 py-5 font-mono text-[11px] text-cream/55 sm:flex-row"><span>© 2026 H-Visuals. All rights reserved.</span><span>Lagos, Nigeria · Working locally and internationally</span></div></div>
    </footer>
  );
}
