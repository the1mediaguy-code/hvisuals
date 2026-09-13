import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Asterisk, Sprout } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { services, studioProjects, studioVideos } from "@/lib/studio-data";
import portrait from "@/assets/instructor.png.asset.json";

export function StudioHero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-forest pt-32 text-cream">
      <div className="studio-shell flex min-h-[calc(92svh-8rem)] flex-col justify-between py-10 md:py-16">
        <div className="flex items-center justify-between border-t border-cream/30 pt-4 font-mono text-xs uppercase text-cream/70">
          <span>Visual Strategy & Creative Direction</span>
          <span className="hidden md:inline">Lagos, Nigeria</span>
        </div>
        <div className="grid items-end gap-10 py-16 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
          <h1 className="studio-display text-cream">
            We make ideas <span className="text-sunshine">visible.</span>
          </h1>
          <div className="border-l border-sunshine pl-6">
            <p className="text-lg leading-relaxed text-cream/80">
              Strategic creativity for brands, people and ideas that deserve to be seen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/work" className="studio-button-sun">Explore Our Work <ArrowRight size={18} /></Link>
              <Link to="/contact" className="studio-button-outline">Let&apos;s Talk</Link>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between border-b border-cream/30 pb-4 font-mono text-xs uppercase text-cream/70">
          <span>Ideas, made visible.</span>
          <ArrowDownRight className="text-sunshine" size={28} />
        </div>
      </div>
      <span aria-hidden className="absolute -right-10 top-32 font-serif text-[18rem] leading-none text-cream/5">H</span>
    </section>
  );
}

export function SelectedWork({ all = false }: { all?: boolean }) {
  const items = all ? studioProjects : studioProjects.slice(0, 4);
  return (
    <section className="studio-section bg-cream">
      <div className="studio-shell">
        <div className="section-heading">
          <div><p className="editorial-label">Selected work</p><h2 className="studio-h2">Work with roots.</h2></div>
          {!all && <Link to="/work" className="studio-text-link">View all work <ArrowRight size={17} /></Link>}
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-12">
          {items.map((project, index) => (
            <Reveal key={project.name} className={index % 3 === 0 ? "md:col-span-7" : index % 3 === 1 ? "md:col-span-5 md:pt-24" : "md:col-span-6"}>
              <article className="project-card group">
                <div className="overflow-hidden bg-cream-deep">
                  <img src={project.src} alt={`${project.name}, ${project.category}`} loading={index > 1 ? "lazy" : undefined} width={1000} height={1200} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                </div>
                <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-forest pt-3">
                  <span className="font-mono text-xs">{project.number}</span>
                  <h3 className="font-display text-2xl text-forest">{project.name}</h3>
                  <span className="text-sm text-forest/65">{project.category}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesBand({ compact = false }: { compact?: boolean }) {
  return (
    <section className="studio-section bg-sunshine text-forest">
      <div className="studio-shell grid gap-12 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <p className="editorial-label">What we do</p>
          <h2 className="studio-h2 max-w-[720px]">From strategy to execution, we bring ideas to life.</h2>
          <p className="mt-8 max-w-lg text-lg">Creative work grows when every decision has a reason. We build the thinking and the visual expression together.</p>
          {compact && <Link to="/services" className="studio-text-link mt-8">Explore services <ArrowRight size={17} /></Link>}
        </Reveal>
        <div className="border-t border-forest">
          {services.map((service) => (
            <div key={service.name} className="grid grid-cols-[42px_1fr_auto] items-start gap-3 border-b border-forest py-5">
              <span className="font-mono text-xs">{service.number}</span>
              <div><h3 className="font-display text-xl md:text-2xl">{service.name}</h3>{!compact && <p className="mt-2 max-w-md text-base text-forest/75">{service.detail}</p>}</div>
              <Asterisk size={18} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudioAbout({ full = false }: { full?: boolean }) {
  return (
    <section className="studio-section bg-forest text-cream">
      <div className="studio-shell grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative">
          <img src={portrait.url} alt="Emmanuel Haruna, founder and creative director of H-Visuals" loading="lazy" width={900} height={1125} className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-5 -right-4 bg-sunshine p-5 text-forest"><Sprout size={34} /><span className="mt-3 block font-mono text-xs uppercase">Purpose before polish</span></div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="editorial-label text-sunshine">About H-Visuals</p>
          <h2 className="studio-h2 text-cream">A creative studio built on purpose.</h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">H-Visuals is led by Emmanuel Haruna, a designer and editor creating visual work for clients both locally and internationally. The studio brings strategy, direction, design and motion into one considered process.</p>
          {full && <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/75">Alongside client work, H-Visuals trains creators through practical graphic design and video editing programmes built around feedback and real output.</p>}
          <Link to={full ? "/contact" : "/about"} className="studio-text-link mt-8 text-sunshine">{full ? "Start a conversation" : "Meet the studio"} <ArrowRight size={17} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function CreativeApproach() {
  const steps = [
    ["01", "Root", "Understand the idea, audience and reason for making."],
    ["02", "Shape", "Turn strategy into a clear creative direction."],
    ["03", "Grow", "Build and refine the visual system across every touchpoint."],
  ];
  return (
    <section className="studio-section bg-cream text-forest">
      <div className="studio-shell">
        <div className="section-heading"><div><p className="editorial-label">Creative approach</p><h2 className="studio-h2">Good work grows deliberately.</h2></div><span className="font-serif text-5xl italic">The creative garden</span></div>
        <div className="mt-14 grid border-t border-forest md:grid-cols-3">
          {steps.map(([number, title, copy], index) => <Reveal key={title} delay={index * 0.08} className="border-b border-forest p-7 md:border-r"><span className="font-mono text-xs">{number}</span><h3 className="mt-12 font-display text-4xl">{title}</h3><p className="mt-4 max-w-sm text-base text-forest/70">{copy}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function MediaGrid() {
  const [filter, setFilter] = useState<"all" | "design" | "video">("all");
  const design = studioProjects.map((item) => ({ ...item, type: "design" as const }));
  const video = studioVideos.map((item) => ({ ...item, type: "video" as const }));
  const items = [...design, ...video].filter((item) => filter === "all" || item.type === filter);
  return (
    <section className="studio-section bg-cream-deep text-forest">
      <div className="studio-shell">
        <div className="section-heading"><div><p className="editorial-label">Media garden</p><h2 className="studio-h2">Design in many forms.</h2></div><div className="flex gap-2" aria-label="Filter work">{(["all", "design", "video"] as const).map((value) => <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} className={`filter-button ${filter === value ? "filter-button-active" : ""}`}>{value}</button>)}</div></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => <article key={item.name} className="group overflow-hidden">{item.type === "design" ? <img src={item.src} alt={`${item.name}, ${item.category}`} loading="lazy" width={800} height={800} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /> : <video src={item.src} controls playsInline preload="metadata" aria-label={`${item.name}, ${item.category}`} className="aspect-square w-full bg-forest object-cover" />}<div className="flex justify-between border-t border-forest py-3 text-sm"><span className="font-display">{item.name}</span><span>{item.category}</span></div></article>)}
        </div>
      </div>
    </section>
  );
}

export function StudioCta() {
  return <section className="bg-tomato py-20 text-cream md:py-28"><div className="studio-shell"><p className="editorial-label text-cream">Have an idea?</p><div className="mt-4 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><h2 className="studio-h2 max-w-4xl text-cream">Let&apos;s make it visible.</h2><Link to="/contact" className="studio-button-sun shrink-0">Let&apos;s Talk <ArrowRight size={18} /></Link></div></div></section>;
}