import { CONTACT } from "@/lib/site-data";
import hvLogo from "@/assets/hv-logo-white.png.asset.json";
import mediaGuy from "@/assets/the-media-guy.jpg.asset.json";
import outlook from "@/assets/outlook-podcast.jpg.asset.json";

const brands = [
  { name: "H-Visuals", src: hvLogo.url, contain: true },
  { name: "The Media Guy", src: mediaGuy.url, contain: false },
  { name: "The Outlook Podcast", src: outlook.url, contain: false },
];

/** Strip: personal brand logos, continuous left-to-right scroll, pause on hover. */
export function BrandLogos() {
  const row = [...brands, ...brands, ...brands, ...brands];

  return (
    <div>
      <p className="shell mono-label text-ash">Our Brands</p>
      <div className="group relative mt-5 overflow-hidden py-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
          style={{ background: "linear-gradient(to right, var(--ink), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
          style={{ background: "linear-gradient(to left, var(--ink), transparent)" }}
        />
        <div
          className="flex w-max items-center gap-14 group-hover:[animation-play-state:paused]"
          style={{ animation: "hv-marquee-right 34s linear infinite" }}
        >
          {row.map((b, i) => (
            <a
              key={`${b.name}-${i}`}
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label={b.name}
              className="group/logo flex shrink-0 flex-col items-center gap-2"
            >
              <span className="block h-[80px] w-[140px]">
                <img
                  src={b.src}
                  alt=""
                  aria-hidden
                  className={`h-full w-full rounded-[8px] object-contain transition-transform duration-300 group-hover/logo:scale-105 ${
                    b.contain ? "" : "object-cover"
                  }`}
                />
              </span>
              <span className="whitespace-nowrap text-[14px] text-ash transition-colors group-hover/logo:text-headline-dark">
                {b.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
