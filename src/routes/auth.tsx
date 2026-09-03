import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s['next'] === "string" ? s['next'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Student Login | H-Visuals Creative Training" },
      {
        name: "description",
        content:
          "Sign in or create your H-Visuals student account to reach your class materials, assignments and certificates.",
      },
      { property: "og:title", content: "Student Login | H-Visuals" },
      {
        property: "og:description",
        content: "Access your H-Visuals student portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

/** Only same-origin relative paths are accepted as a post-login destination. */
function safeNext(next: string | undefined): string | null {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

function AuthPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const goNext = () => {
    const target = safeNext(next);
    if (target) window.location.href = target;
    else navigate({ to: "/portal" });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) goNext();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, next]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${safeNext(next) ?? "/portal"}`,
          data: { full_name: String(form.get("full_name") ?? ""), phone: String(form.get("phone") ?? "") },
        },
      });
      setBusy(false);
      if (error) return setError(error.message);
      setInfo("Account created. Check your email to confirm, then sign in.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setError(error.message);
    goNext();
  };

  const google = async () => {
    setError(null);
    const target = safeNext(next);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: target ? `${window.location.origin}${target}` : window.location.origin,
    });
    if (result.error) return setError("Google sign-in failed. Try email instead.");
    if (result.redirected) return;
    goNext();
  };


  return (
    <main className="min-h-screen bg-ink pt-[68px]">
      <div className="shell section-y max-w-lg">
        <Reveal>
          <h1 className="display-lg !text-headline-dark">
            {mode === "signin" ? "Welcome back." : "Create your account."}
          </h1>
          <p className="mt-4 text-ash">
            Your portal holds class notes, assignments, progress and certificates.
          </p>

          <button type="button" onClick={google} className="btn-ghost-dark mt-8 w-full justify-center">
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border-dark" />
            <span className="mono-label text-ash">or</span>
            <span className="h-px flex-1 bg-border-dark" />
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {mode === "signup" && (
              <>
                <label className="block">
                  <span className="field-label text-headline-dark">Full Name</span>
                  <input required name="full_name" className="field-dark" />
                </label>
                <label className="block">
                  <span className="field-label text-headline-dark">WhatsApp Number</span>
                  <input name="phone" inputMode="tel" className="field-dark" />
                </label>
              </>
            )}
            <label className="block">
              <span className="field-label text-headline-dark">Email Address</span>
              <input required type="email" name="email" className="field-dark" />
            </label>
            <label className="block">
              <span className="field-label text-headline-dark">Password</span>
              <input required type="password" name="password" minLength={6} className="field-dark" />
            </label>

            {error && <p className="mono-label text-red-400">{error}</p>}
            {info && <p className="mono-label text-lime">{info}</p>}

            <button type="submit" disabled={busy} className="btn-lime w-full justify-center">
              {busy ? "Please wait…" : mode === "signin" ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          <button
            type="button"
            className="mono-label mt-6 text-lime underline"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setInfo(null);
            }}
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </Reveal>
      </div>
    </main>
  );
}
