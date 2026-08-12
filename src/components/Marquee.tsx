export function Marquee({
  items,
  direction = "left",
  speed = 40,
  bold = false,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  bold?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden bg-ink-surface py-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, var(--ink-surface), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, var(--ink-surface), transparent)" }}
      />
      <div
        className="flex w-max gap-10 group-hover:[animation-play-state:paused]"
        style={{
          animation: `hv-marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={
              bold
                ? "clash-600 whitespace-nowrap text-[18px] text-lime"
                : "whitespace-nowrap font-mono text-[13px] tracking-[0.06em] text-ash"
            }
          >
            {item}
            <span className="ml-10 text-lime">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
