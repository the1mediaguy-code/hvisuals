import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-dark bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="shell relative grid gap-12 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-extrabold text-headline-dark">
              Haruna Visuals
            </span>
            <span className="h-2 w-2 rounded-full bg-lime" />
          </div>
          <p className="mt-4 max-w-xs text-[15px] text-ash">
            Helping Brands Stand Out. Training Creators to Build.
          </p>
          <div className="mt-6 flex gap-3">
            {["Instagram", "TikTok", "LinkedIn"].map((s) => (
              <a
                key={s}
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mono-label rounded-md border border-border-dark px-3 py-2 text-ash transition-all hover:-translate-y-[3px] hover:border-lime hover:text-lime"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mono-label text-headline-dark">Programme</h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <Link to="/courses" className="text-ash transition-colors hover:text-lime">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-ash transition-colors hover:text-lime">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/portal" className="text-ash transition-colors hover:text-lime">
                Student Portal
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-ash transition-colors hover:text-lime">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mono-label text-headline-dark">Connect</h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-ash transition-colors hover:text-lime"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-ash transition-colors hover:text-lime"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-ash transition-colors hover:text-lime"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-ash transition-colors hover:text-lime"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border-dark py-6">
        <p className="shell text-sm text-ash">© 2026 Haruna Visuals. All rights reserved.</p>
      </div>
    </footer>
  );
}
