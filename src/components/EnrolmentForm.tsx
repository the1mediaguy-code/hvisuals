import { useState, type FormEvent } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion";
import { CONTACT } from "@/lib/site-data";

const steps = [
  "We review your details and confirm your level.",
  "You get a WhatsApp message with your start date.",
  "Pay your deposit to lock your spot.",
  "Your student portal login is sent to you.",
];

export function EnrolmentForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="enrol" className="section-y bg-ink scroll-mt-[68px]">
      <div className="shell grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="display-lg !text-headline-dark">Start the conversation.</h2>
          <p className="lead mt-3 text-ash">
            A quick enquiry. Tell us your track and level and we'll come back to you on WhatsApp.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <Field label="Full Name">
              <input required name="name" className="field-dark" />
            </Field>
            <Field label="WhatsApp Number">
              <input required name="phone" inputMode="tel" className="field-dark" />
            </Field>
            <Field label="Email Address">
              <input required type="email" name="email" className="field-dark" />
            </Field>
            <Field label="Which Track?">
              <select name="track" className="field-dark">
                <option>Graphic Design</option>
                <option>Video Editing</option>
                <option>Both</option>
              </select>
            </Field>
            <Field label="Your Level">
              <select name="level" className="field-dark">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </Field>
            <Field label="Are you a continuing student?">
              <select name="continuing" className="field-dark">
                <option>No, I am starting fresh</option>
                <option>Yes, I want to upgrade</option>
              </select>
            </Field>
            <Field label="How did you hear about us?">
              <select name="source" className="field-dark">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>A friend</option>
                <option>WhatsApp</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Anything else?">
              <textarea name="notes" rows={4} className="field-dark" />
            </Field>

            <button type="submit" className="btn-lime">
              {sent ? "✓ Enrolment sent" : "Submit Enrolment →"}
            </button>
            {sent && (
              <p className="mono-label text-lime">
                Thanks: Emmanuel will reach out on WhatsApp shortly.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="font-display text-2xl font-bold text-headline-dark">What happens next</h3>
          <ol className="mt-7 space-y-6">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="mono-label grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
                  {i + 1}
                </span>
                <span className="text-[16px] text-ash">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-border-dark bg-ink-surface p-7">
            <p className="mono-label text-headline-dark">Direct contact</p>
            <ul className="mt-4 space-y-3 text-[16px]">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-ash hover:text-lime">
                  <Mail size={20} /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-ash hover:text-lime">
                  <Phone size={20} /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-ash hover:text-lime"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label text-headline-dark">{label}</span>
      {children}
    </label>
  );
}
