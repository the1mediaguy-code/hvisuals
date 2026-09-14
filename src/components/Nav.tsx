import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? "border-cream/20 bg-forest" : "border-transparent bg-forest/95"}`}>
      <nav className="studio-shell flex h-24 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="group leading-none text-cream" onClick={() => setOpen(false)}>
          <span className="block font-display text-2xl md:text-3xl">H-VISUALS<span className="text-sunshine">.</span></span>
          <span className="mt-1 hidden font-mono text-[9px] uppercase text-cream/60 sm:block">Visual Strategy & Creative Direction</span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => <Link key={link.to} to={link.to} activeProps={{ className: "text-sunshine" }} className="studio-nav-link">{link.label}</Link>)}
          <Link to="/training" className="studio-nav-link border-l border-cream/25 pl-7">Training</Link>
          <Link to="/contact" className="studio-button-sun !min-h-11 !px-5">Let&apos;s Talk</Link>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} className="grid h-11 w-11 place-items-center border border-cream/30 text-cream lg:hidden">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {open && <div id="mobile-navigation" className="min-h-[calc(100svh-6rem)] border-t border-cream/20 bg-forest px-5 py-10 text-cream lg:hidden"><div className="flex flex-col">{links.map((link, index) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-cream/20 py-4 font-display text-3xl"><span>{link.label}</span><span className="font-mono text-xs text-sunshine">0{index + 1}</span></Link>)}<Link to="/training" onClick={() => setOpen(false)} className="mt-8 font-mono text-sm text-cream/70">Enter Creative Training →</Link><Link to="/contact" onClick={() => setOpen(false)} className="studio-button-sun mt-8 w-full">Let&apos;s Talk</Link></div></div>}
    </header>
  );
}
