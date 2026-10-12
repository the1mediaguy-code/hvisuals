import { useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { subscribe, submitCreativeDump, requestSubmissionsLink } from "@/lib/community.functions";

type SignupSource = "focal_waitlist" | "creative_resources" | "creative_dump_updates" | "training_updates";
type SubmissionKind = "collective_brief" | "collective_creative" | "creative_dump";

const inputClass = "w-full min-w-0 border border-cream/30 bg-ink-surface px-4 py-3 text-cream outline-none placeholder:text-cream/45 focus:border-sunshine";

export function Field({ label, name, required = false, children }: { label: string; name: string; required?: boolean; children?: ReactNode }) {
  return <label className="block min-w-0 text-sm text-cream/85"><span className="mb-2 block font-mono text-xs uppercase text-sunshine">{label}</span>{children ?? <input className={inputClass} name={name} required={required} maxLength={200} />}</label>;
}

export function TextArea({ name, required = false, placeholder }: { name: string; required?: boolean; placeholder?: string }) {
  return <textarea className={`${inputClass} min-h-32 resize-y`} name={name} required={required} placeholder={placeholder} maxLength={12000} />;
}

export function SelectField({ name, options, required = false }: { name: string; options: string[]; required?: boolean }) {
  return <select className={inputClass} name={name} required={required}><option value="">Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select>;
}

export function SignupForm({ source, label, requireName = true }: { source: SignupSource; label: string; requireName?: boolean }) {
  const subscribeFn = useServerFn(subscribe);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const form = e.currentTarget;
    const values = new FormData(form);
    try { await subscribeFn({ data: { source, name: String(values.get("name") || ""), email: String(values.get("email") || "") } }); }
    catch { setState("error"); return; }
    form.reset(); setState("done");
  }
  return <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
    {requireName && <Field label="Name" name="name" required />}
    <Field label="Email" name="email" required><input type="email" name="email" required maxLength={254} className={inputClass} /></Field>
    <Button type="submit" disabled={state === "sending"} className="studio-button-sun h-[50px] rounded-none">{state === "sending" ? "Sending…" : label}</Button>
    <p aria-live="polite" className={`text-sm sm:col-span-3 ${state === "error" ? "text-destructive" : "text-sunshine"}`}>{state === "done" ? "You're on the list. Thank you." : state === "error" ? "We couldn't save your details. Please try again." : ""}</p>
  </form>;
}

export function SubmissionForm({ kind, children, label }: { kind: SubmissionKind; children: ReactNode; label: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const form = e.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    const { name, email, ...rawDetails } = entries;
    const details = Object.fromEntries(Object.entries(rawDetails).map(([key, value]) => [key, String(value)]));
    const { error } = await supabase.from("studio_submissions").insert({ kind, name: String(name || "").trim(), email: String(email || "").trim().toLowerCase(), details, status: "pending" });
    if (error) { setState("error"); return; }
    form.reset(); setState("done");
  }
  return <form onSubmit={submit} className="grid gap-5">{children}<Button type="submit" disabled={state === "sending"} className="studio-button-sun h-auto rounded-none justify-self-start">{state === "sending" ? "Sending…" : label}</Button><p aria-live="polite" className={`text-sm ${state === "error" ? "text-destructive" : "text-sunshine"}`}>{state === "done" ? "Received. We'll be in touch." : state === "error" ? "Your submission wasn't saved. Please try again." : ""}</p></form>;
}

export function EmailField() { return <Field label="Email" name="email" required><input className={inputClass} type="email" name="email" required maxLength={254} /></Field>; }
export function UrlField({ label, name, required = false }: { label: string; name: string; required?: boolean }) { return <Field label={label} name={name} required={required}><input className={inputClass} type="url" name={name} required={required} maxLength={1000} placeholder="https://" /></Field>; }
export function CreativeDumpForm() {
  const submitFn = useServerFn(submitCreativeDump);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [result, setResult] = useState<{ status: string; reason: string | null } | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending"); setResult(null);
    const form = e.currentTarget; const v = new FormData(form);
    try {
      const r = await submitFn({ data: { name: String(v.get("name") || ""), email: String(v.get("email") || ""), title: String(v.get("title") || ""), content: String(v.get("content") || ""), draft: String(v.get("draft") || "") } });
      setResult(r); setState("idle"); if (r.status !== "rejected") form.reset();
    } catch { setState("error"); }
  }
  return <form onSubmit={submit} className="grid gap-5">
    <Field label="Name" name="name" required /><EmailField /><Field label="Title of Piece" name="title" required />
    <Field label="Written Content (150+ words)" name="content"><TextArea name="content" /></Field>
    <UrlField label="Link to Draft (optional)" name="draft" />
    <Button type="submit" disabled={state === "sending"} className="studio-button-sun h-auto rounded-none justify-self-start">{state === "sending" ? "Reviewing your piece…" : "Submit Your Piece"}</Button>
    <div aria-live="polite" className="text-sm">
      {state === "error" && <p className="text-destructive">Your submission wasn't saved. Please try again.</p>}
      {result?.status === "approved" && <p className="text-sunshine">Approved — your piece is now live. Refresh to see it.</p>}
      {result?.status === "pending_review" && <p className="text-sunshine">Received. Our team will review it shortly.</p>}
      {result?.status === "rejected" && <div className="border-l-2 border-destructive pl-4 text-cream/85"><p className="font-semibold">Not published this time.</p><p className="mt-1">{result.reason}</p><p className="mt-1 text-cream/60">Your text is still in the form — revise and resubmit.</p></div>}
    </div>
  </form>;
}

export function MySubmissionsLookup() {
  const requestFn = useServerFn(requestSubmissionsLink);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    try { await requestFn({ data: { email: String(new FormData(e.currentTarget).get("email") || "") } }); setState("done"); } catch { setState("error"); }
  }
  return <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
    <EmailField />
    <Button type="submit" disabled={state === "sending"} className="studio-button-sun h-[50px] rounded-none">{state === "sending" ? "Sending…" : "Email My Link"}</Button>
    <p aria-live="polite" className={`text-sm sm:col-span-2 ${state === "error" ? "text-destructive" : "text-sunshine"}`}>{state === "done" ? "Check your inbox — we've sent a private link to your submissions." : state === "error" ? "Please enter a valid email and try again." : ""}</p>
  </form>;
}
