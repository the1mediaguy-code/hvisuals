import { useState } from "react";
import { faqs, CONTACT } from "@/lib/site-data";
import { Reveal } from "@/components/motion";

export function FaqSection({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={`section-y ${dark ? "bg-ink" : "bg-background"}`}>
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">— FAQ</p>
          <h2 className={`display-lg mt-4 ${dark ? "!text-headline-dark" : ""}`}>
            Answered honestly.
          </h2>
          <p className={`mt-5 ${dark ? "text-ash" : "text-body"}`}>
            Still have questions? Reach out directly on WhatsApp.
          </p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-lime"
          >
            Chat on WhatsApp →
          </a>
        </Reveal>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={dark ? "border-border-dark" : "border-border"}
                style={{ borderTop: i === 0 ? "none" : undefined }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`text-[18px] font-semibold ${
                      dark ? "text-headline-dark" : "text-headline"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span className="text-lime">{isOpen ? "−" : "+"}</span>
                </button>
                <div
                  className="grid transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className={`pb-6 text-[16px] ${dark ? "text-ash" : "text-body"}`}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
