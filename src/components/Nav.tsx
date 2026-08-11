import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/courses", label: "Courses" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/portal", label: "Portal" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[68px] transition-all duration-[400ms]"
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--ink) 95%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-dark)" : "1px solid transparent",
      }}
    >
      <nav className="shell flex h-[68px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-[24px] font-bold text-headline-dark">
            Haruna Visuals
          </span>
          <span className="h-2 w-2 rounded-full bg-lime" />
        </Link>


        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/pricing" hash="enrol" className="btn-lime hidden !min-h-[44px] !px-6 md:inline-flex">
            Enrol Now
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border-dark text-headline-dark md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="text-lg">
              ☰
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-[17px] font-extrabold text-headline-dark">
              Haruna Visuals
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-md border border-border-dark text-headline-dark"
            >
              ✕
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold text-headline-dark"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/pricing"
              hash="enrol"
              onClick={() => setOpen(false)}
              className="btn-lime mt-4 w-fit"
            >
              Enrol Now →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
