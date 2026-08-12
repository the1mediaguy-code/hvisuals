import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, MessageCircle, Mail, Phone } from "lucide-react";
import { CONTACT, SOCIALS } from "@/lib/site-data";

function TikTokIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.85-2.48v-3.2a5.79 5.79 0 1 0 4.94 5.72V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.27 4.27 0 0 1-3.24-1.48z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: SOCIALS.instagram, Icon: Instagram },
  { label: "TikTok", href: SOCIALS.tiktok, Icon: TikTokIcon },
  { label: "LinkedIn", href: SOCIALS.linkedin, Icon: Linkedin },
  { label: "Twitter / X", href: SOCIALS.twitter, Icon: Twitter },
  { label: "WhatsApp", href: CONTACT.whatsapp, Icon: MessageCircle },
];

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
      <div className="shell relative grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-[24px] font-bold text-headline-dark">
              Haruna Visuals
            </span>
            <span className="h-2 w-2 rounded-full bg-lime" />
          </div>
          <p className="mt-4 max-w-xs text-[16px] text-ash">
            Helping Brands Stand Out. Training Creators to Build.
          </p>
          <div className="mt-6 flex items-center gap-5">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-ash transition-all duration-300 hover:-translate-y-1 hover:text-lime"
              >
                <Icon size={26} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mono-label text-headline-dark">Programme</h3>
          <ul className="mt-4 space-y-2 text-[16px]">
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
          <ul className="mt-4 space-y-3 text-[16px]">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-ash transition-colors hover:text-lime"
              >
                <Mail size={20} />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:+234${CONTACT.phone.slice(1)}`}
                className="flex items-center gap-3 text-ash transition-colors hover:text-lime"
              >
                <Phone size={20} />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-ash transition-colors hover:text-lime"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border-dark py-6">
        <p className="shell clash-600 text-[16px] text-ash">© 2026 Haruna Visuals. All rights reserved.</p>
      </div>
    </footer>
  );
}
