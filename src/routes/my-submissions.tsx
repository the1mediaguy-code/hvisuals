import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getMySubmissions } from "@/lib/community.functions";
import { MySubmissionsLookup } from "@/components/CommunityForms";

type Sub = { id: string; title: string; status: string; reason: string | null; created_at: string };
type State = { kind: "loading" } | { kind: "invalid"; message: string } | { kind: "ok"; email: string; submissions: Sub[] };

export const Route = createFileRoute("/my-submissions")({
  validateSearch: (s: Record<string, unknown>) => ({ token: typeof s["token"] === "string" ? s["token"] : "" }),
  head: () => ({
    meta: [
      { title: "My Submissions | The Creative Dump | H-Visuals" },
      { name: "description", content: "See the status of every piece you've submitted to The Creative Dump." },
      { property: "og:title", content: "My Submissions | The Creative Dump" },
      { property: "og:description", content: "Check the review status of your Creative Dump submissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MySubmissionsPage,
});

const BADGE: Record<string, { label: string; cls: string }> = {
  approved: { label: "Approved", cls: "bg-sunshine text-ink" },
  rejected: { label: "Rejected", cls: "bg-destructive text-destructive-foreground" },
};

function MySubmissionsPage() {
  const { token } = Route.useSearch();
  const fetchFn = useServerFn(getMySubmissions);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) { setState({ kind: "invalid", message: "This link is invalid or has expired." }); return; }
    let live = true;
    fetchFn({ data: { token } })
      .then(r => live && setState({ kind: "ok", email: r.email, submissions: r.submissions as Sub[] }))
      .catch(() => live && setState({ kind: "invalid", message: "This link is invalid or has expired." }));
    return () => { live = false; };
  }, [token, fetchFn]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink pt-24 text-cream">
      <section className="studio-shell py-20">
        <p className="editorial-label text-sunshine cine-in">The Creative Dump</p>
        <h1 className="community-heading text-cream cine-in">My submissions.</h1>
        {state.kind === "loading" && <p className="mt-10 text-cream/70" aria-live="polite">Loading your submissions…</p>}
        {state.kind === "invalid" && (
          <div className="mt-10 max-w-2xl border-l-2 border-sunshine bg-ink-surface p-6 sm:p-8">
            <p className="font-display text-2xl text-cream">{state.message}</p>
            <p className="mb-6 mt-3 text-cream/70">Enter the email you submitted with and we'll send you a fresh private link.</p>
            <MySubmissionsLookup />
          </div>
        )}
        {state.kind === "ok" && (
          <>
            <p className="mt-6 break-all text-cream/70">Showing pieces submitted with <span className="text-cream">{state.email}</span></p>
            {state.submissions.length === 0 ? (
              <div className="mt-10 border-t border-cream/30 py-8">
                <p className="font-serif text-2xl italic text-cream/70">No submissions yet for this email.</p>
                <Link to="/infovibes" hash="submit-piece" className="studio-text-link mt-5 inline-block text-sunshine">Submit your first piece →</Link>
              </div>
            ) : (
              <ul className="mt-10 grid gap-5 md:grid-cols-2">
                {state.submissions.map(s => {
                  const b = BADGE[s.status] ?? { label: "Pending review", cls: "bg-muted text-muted-foreground" };
                  return (
                    <li key={s.id} className="cine-in border-t border-sunshine bg-ink-surface p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h2 className="min-w-0 break-words font-display text-2xl text-cream">{s.title}</h2>
                        <span className={`shrink-0 px-2 py-1 font-mono text-[11px] uppercase tracking-wider ${b.cls}`}>{b.label}</span>
                      </div>
                      <p className="mt-2 font-mono text-xs text-cream/60">Submitted {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                      {s.status === "rejected" && (
                        <div className="mt-5">
                          {s.reason && <p className="border-l-2 border-destructive pl-4 text-cream/85">{s.reason}</p>}
                          <Link to="/infovibes" hash="submit-piece" className="studio-button-sun mt-5 inline-flex px-5 py-3 text-sm">Revise and resubmit</Link>
                        </div>
                      )}
                      {s.status === "approved" && <Link to="/infovibes" hash={`piece-${s.id}`} className="studio-text-link mt-5 inline-block text-sunshine">View live →</Link>}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}
