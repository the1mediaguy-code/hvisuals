const tools = [
  { name: "Canva", src: "https://cdn.simpleicons.org/canva/ffffff", href: "https://www.canva.com" },
  {
    name: "Adobe Photoshop",
    src: "https://cdn.simpleicons.org/adobephotoshop/ffffff",
    href: "https://www.adobe.com/products/photoshop.html",
  },
  { name: "CapCut", src: "https://cdn.simpleicons.org/capcut/ffffff", href: "https://www.capcut.com" },
  {
    name: "Align Motion",
    src: "https://cdn.simpleicons.org/adobeaftereffects/ffffff",
    href: "https://www.create.video/",
  },
];

export function ToolLogos() {
  return (
    <div className="shell">
      <h2 className="mono-label text-ash">Tools We Use</h2>
      <div className="mt-6 flex snap-x gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
        {tools.map((t) => (
          <a
            key={t.name}
            href={t.href}
            target="_blank"
            rel="noreferrer"
            className="group flex shrink-0 snap-start flex-col items-center gap-3 rounded-xl border border-border-dark bg-ink-surface px-6 py-6 transition-colors hover:border-lime"
          >
            <img
              src={t.src}
              alt={`${t.name} logo`}
              loading="lazy"
              width={72}
              height={72}
              className="h-[60px] w-[60px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-[72px] md:w-[72px]"
            />
            <span className="whitespace-nowrap text-[16px] text-ash transition-colors group-hover:text-headline-dark">
              {t.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
