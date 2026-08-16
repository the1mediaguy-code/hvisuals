import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/motion";
import {
  getMaterialUrl,
  getMyPortal,
  submitVerification,
  toggleMaterialComplete,
} from "@/lib/portal.functions";
import { NAIRA, levels } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Student Portal | H-Visuals Creative Training" },
      {
        name: "description",
        content: "Class notes, assignments, progress tracking and certificates for enrolled students.",
      },
      { property: "og:title", content: "Student Portal | H-Visuals" },
      { property: "og:description", content: "Materials, assignments and certificates for students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PortalPage,
});

function PortalPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchPortal = useServerFn(getMyPortal);
  const toggle = useServerFn(toggleMaterialComplete);
  const signUrl = useServerFn(getMaterialUrl);
  const verify = useServerFn(submitVerification);
  const [tab, setTab] = useState<"materials" | "assignments" | "progress" | "upgrade">("materials");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["portal"],
    queryFn: () => fetchPortal({ data: undefined as never }),
  });

  const toggleMut = useMutation({
    mutationFn: (v: { materialId: string; completed: boolean }) => toggle({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portal"] }),
  });

  const verifyMut = useMutation({
    mutationFn: (v: { kind: string; to_level: "Beginner" | "Intermediate" | "Advanced"; reference: string }) =>
      verify({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portal"] }),
  });

  const student = data?.student;
  const materials = data?.materials ?? [];
  const progress = data?.progress ?? [];
  const done = new Set(progress.filter((p) => p.completed).map((p) => p.material_id));
  const visible = materials.filter(
    (m) => (!m.track || !student?.track || m.track === student.track) && (!student?.level || m.level === student.level),
  );
  const notes = visible.filter((m) => m.kind !== "assignment");
  const assignments = visible.filter((m) => m.kind === "assignment");
  const pct = visible.length ? Math.round((visible.filter((m) => done.has(m.id)).length / visible.length) * 100) : 0;

  const open = async (path: string | null, url: string | null) => {
    if (url) {
      window.open(url, "_blank", "noopener");
      return;
    }
    if (!path) return;
    const res = await signUrl({ data: { path } });
    window.open(res.url, "_blank", "noopener");
  };

  return (
    <main className="min-h-screen bg-ink pt-[68px]">
      <div className="shell section-y">
        <Reveal>
          <h1 className="display-lg !text-headline-dark">Your learning home.</h1>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[260px_1fr]">
          <Reveal>
            <aside className="rounded-2xl border border-border-dark bg-ink-surface p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lime font-display font-extrabold text-lime-ink">
                  {(student?.full_name ?? "HV").slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-headline-dark">{student?.full_name ?? email}</p>
                  <p className="mono-label text-lime">
                    {student?.track ?? "Track pending"} · {student?.level ?? "Beginner"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border-dark bg-ink p-4">
                <p className="mono-label text-ash">Access</p>
                <p className={`mt-1 font-semibold ${student?.access_active ? "text-lime" : "text-ash"}`}>
                  {student?.access_active ? "Active" : "Awaiting payment confirmation"}
                </p>
                <p className="mono-label mt-2 text-ash">
                  Paid: {NAIRA(student?.amount_paid ?? 0)} · {student?.payment_status ?? "pending"}
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {(
                  [
                    ["materials", "Class Materials"],
                    ["assignments", "Assignments"],
                    ["progress", "My Progress"],
                    ["upgrade", "Upgrade / Verify"],
                  ] as const
                ).map(([k, label]) => (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => setTab(k)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-[16px] ${
                        tab === k ? "bg-lime text-lime-ink" : "text-ash hover:text-lime"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>

              {data?.isAdmin && (
                <Link to="/admin" className="btn-ghost-dark mt-6 w-full justify-center">
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                className="mono-label mt-6 text-ash underline"
                onClick={async () => {
                  await supabase.auth.signOut();
                  qc.clear();
                  navigate({ to: "/auth" });
                }}
              >
                Sign out
              </button>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border-dark bg-ink-surface p-6 md:p-8">
              {isLoading && <p className="text-ash">Loading your portal…</p>}

              {!isLoading && !student?.access_active && (
                <div
                  className="mb-8 rounded-xl p-5"
                  style={{ background: "var(--lime-highlight)", border: "1px solid var(--lime)" }}
                >
                  <p className="text-[16px] text-headline-dark">
                    Your account is created. Materials unlock as soon as your payment is confirmed.
                  </p>
                  <Link to="/pricing" hash="enrol" className="btn-lime mt-4">
                    Complete Payment →
                  </Link>
                </div>
              )}

              {tab === "materials" && (
                <MaterialList
                  items={notes}
                  done={done}
                  locked={!student?.access_active}
                  onOpen={open}
                  onToggle={(id, c) => toggleMut.mutate({ materialId: id, completed: c })}
                />
              )}

              {tab === "assignments" && (
                <MaterialList
                  items={assignments}
                  done={done}
                  locked={!student?.access_active}
                  onOpen={open}
                  onToggle={(id, c) => toggleMut.mutate({ materialId: id, completed: c })}
                />
              )}

              {tab === "progress" && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-headline-dark">My Progress</h2>
                  <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-ink">
                    <div className="h-full bg-lime transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mono-label mt-3 text-lime">{pct}% complete</p>
                  <div className="mt-8 rounded-xl border border-border-dark bg-ink p-6">
                    <p className="mono-label text-ash">Certificate</p>
                    <p className="mt-2 text-[16px] text-headline-dark">
                      {pct === 100
                        ? `Congratulations. Your ${student?.level ?? "Beginner"} certificate is being issued by Emmanuel.`
                        : "Complete every item in your level to unlock your certificate."}
                    </p>
                  </div>
                </div>
              )}

              {tab === "upgrade" && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-headline-dark">
                    Upgrade or verify a payment
                  </h2>
                  <p className="mt-3 text-[16px] text-ash">
                    Paid by bank transfer or want to move up a level? Send it here and Emmanuel verifies it.
                  </p>
                  <form
                    className="mt-6 space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const f = new FormData(e.currentTarget);
                      verifyMut.mutate({
                        kind: String(f.get("kind")),
                        to_level: String(f.get("to_level")) as "Beginner",
                        reference: String(f.get("reference")),
                      });
                      e.currentTarget.reset();
                    }}
                  >
                    <label className="block">
                      <span className="field-label text-headline-dark">Request type</span>
                      <select name="kind" className="field-dark">
                        <option value="upgrade">Level upgrade</option>
                        <option value="payment">Payment verification</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="field-label text-headline-dark">Level requested</span>
                      <select name="to_level" className="field-dark">
                        {levels.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="field-label text-headline-dark">Transfer reference or note</span>
                      <input required name="reference" className="field-dark" />
                    </label>
                    <button type="submit" className="btn-lime">
                      {verifyMut.isPending ? "Sending…" : "Submit for verification →"}
                    </button>
                  </form>

                  <ul className="mt-8 space-y-3">
                    {(data?.verifications ?? []).map((v) => (
                      <li
                        key={v.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-dark bg-ink p-4"
                      >
                        <span className="text-[16px] text-headline-dark">
                          {v.kind} · {v.to_level ?? "-"} · {v.reference}
                        </span>
                        <span className="mono-label text-lime">{v.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

type Item = {
  id: string;
  title: string;
  description: string | null;
  week: number;
  kind: string;
  file_path: string | null;
  external_url: string | null;
};

function MaterialList({
  items,
  done,
  locked,
  onOpen,
  onToggle,
}: {
  items: Item[];
  done: Set<string>;
  locked: boolean;
  onOpen: (path: string | null, url: string | null) => void;
  onToggle: (id: string, completed: boolean) => void;
}) {
  if (!items.length)
    return <p className="text-ash">Nothing here yet. New material is added every week.</p>;

  return (
    <ul className="space-y-4">
      {items.map((m) => (
        <li
          key={m.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-dark bg-ink p-5"
        >
          <div>
            <p className="text-[16px] font-semibold text-headline-dark">
              Week {m.week}: {m.title}
            </p>
            {m.description && <p className="mt-1 text-[15px] text-ash">{m.description}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={locked}
              onClick={() => onOpen(m.file_path, m.external_url)}
              className="mono-label rounded-full border border-lime px-4 py-2 text-lime disabled:opacity-40"
            >
              {locked ? "Locked" : "Open"}
            </button>
            <button
              type="button"
              disabled={locked}
              onClick={() => onToggle(m.id, !done.has(m.id))}
              className="mono-label text-ash disabled:opacity-40"
            >
              {done.has(m.id) ? "✓ Done" : "Mark done"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
