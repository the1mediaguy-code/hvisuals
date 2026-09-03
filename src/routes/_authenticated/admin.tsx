import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Reveal } from "@/components/motion";
import {
  claimAdmin,
  deleteMaterial,
  getAdminData,
  reviewVerification,
  saveMaterial,
  updateStudent,
} from "@/lib/admin.functions";
import { NAIRA, levels } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | H-Visuals Creative Training" },
      { name: "description", content: "Manage students, payments, materials and verifications." },
      { property: "og:title", content: "Admin Dashboard | H-Visuals" },
      { property: "og:description", content: "Internal dashboard for H-Visuals training." },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const qc = useQueryClient();
  const fetchAdmin = useServerFn(getAdminData);
  const claim = useServerFn(claimAdmin);
  const patchStudent = useServerFn(updateStudent);
  const review = useServerFn(reviewVerification);
  const upsertMaterial = useServerFn(saveMaterial);
  const removeMaterial = useServerFn(deleteMaterial);
  const [tab, setTab] = useState<"students" | "payments" | "verifications" | "materials" | "list">("students");
  const [passError, setPassError] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin"],
    queryFn: () => fetchAdmin({ data: undefined as never }),
    retry: false,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin"] });
  const studentMut = useMutation({ mutationFn: (v: Parameters<typeof patchStudent>[0]["data"]) => patchStudent({ data: v }), onSuccess: invalidate });
  const reviewMut = useMutation({ mutationFn: (v: Parameters<typeof review>[0]["data"]) => review({ data: v }), onSuccess: invalidate });
  const materialMut = useMutation({ mutationFn: (v: Parameters<typeof upsertMaterial>[0]["data"]) => upsertMaterial({ data: v }), onSuccess: invalidate });
  const deleteMut = useMutation({ mutationFn: (id: string) => removeMaterial({ data: { id } }), onSuccess: invalidate });

  if (error) {
    return (
      <main className="min-h-screen bg-ink pt-[68px]">
        <div className="shell section-y max-w-md">
          <h1 className="display-lg !text-headline-dark">Enter admin setup key.</h1>
          <form
            className="mt-8 space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              try {
                await claim({ data: { passcode: String(f.get("passcode")) } });
                setPassError(null);
                refetch();
              } catch {
                setPassError("Not authorised.");
              }
            }}
          >
            <label className="block">
              <span className="field-label text-headline-dark">Setup key</span>
              <input required type="password" name="passcode" className="field-dark" />
            </label>
            {passError && <p className="mono-label text-red-400">{passError}</p>}
            <button type="submit" className="btn-lime w-full justify-center">
              Unlock Dashboard →
            </button>
          </form>
          <Link to="/portal" className="mono-label mt-6 inline-block text-ash underline">
            Back to portal
          </Link>
        </div>
      </main>
    );
  }

  const students = data?.students ?? [];
  const preorders = data?.preorders ?? [];
  const paid = preorders.filter((p) => p.payment_status === "paid");
  const revenue = paid.reduce((s, p) => s + (p.amount ?? 0), 0);

  return (
    <main className="min-h-screen bg-ink pt-[68px]">
      <div className="shell section-y">
        <Reveal>
          <h1 className="display-lg !text-headline-dark">H-Visuals control room.</h1>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {[
            ["Students", String(students.length)],
            ["Active", String(students.filter((s) => s.access_active).length)],
            ["Paid orders", String(paid.length)],
            ["Revenue", NAIRA(revenue)],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border-dark bg-ink-surface p-5">
              <p className="mono-label text-ash">{k}</p>
              <p className="mt-2 font-display text-2xl font-bold text-lime">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {(
            [
              ["students", "Students"],
              ["payments", "Payments"],
              ["verifications", "Verifications"],
              ["materials", "Add Material"],
              ["list", "Materials & Notify"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`mono-label rounded-full border px-5 py-2.5 ${
                tab === k ? "border-lime bg-lime text-lime-ink" : "border-border-dark text-ash"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border-dark bg-ink-surface p-6 md:p-8">
          {isLoading && <p className="text-ash">Loading…</p>}

          {tab === "students" && (
            <ul className="space-y-4">
              {students.map((s) => (
                <li key={s.id} className="rounded-xl border border-border-dark bg-ink p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-headline-dark">{s.full_name}</p>
                      <p className="mono-label text-ash">
                        {s.email} · {s.phone ?? "no phone"} · {NAIRA(s.amount_paid)} · {s.payment_status}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        className="field-dark !mt-0 !w-auto"
                        value={s.level ?? "Beginner"}
                        onChange={(e) =>
                          studentMut.mutate({ id: s.id, level: e.target.value as "Beginner" })
                        }
                      >
                        {levels.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                      <select
                        className="field-dark !mt-0 !w-auto"
                        value={s.track ?? ""}
                        onChange={(e) =>
                          studentMut.mutate({ id: s.id, track: e.target.value as "Graphic Design" })
                        }
                      >
                        <option value="">No track</option>
                        <option>Graphic Design</option>
                        <option>Video Editing</option>
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          studentMut.mutate({
                            id: s.id,
                            access_active: !s.access_active,
                            payment_status: !s.access_active ? "paid" : "pending",
                          })
                        }
                        className="mono-label rounded-full border border-lime px-4 py-2 text-lime"
                      >
                        {s.access_active ? "Revoke access" : "Grant access"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === "payments" && (
            <ul className="space-y-3">
              {preorders.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-dark bg-ink p-4"
                >
                  <span className="text-[16px] text-headline-dark">
                    {p.full_name} · {p.email} · {p.track ?? "-"} {p.level ?? ""} · {p.plan}
                  </span>
                  <span className="mono-label text-lime">
                    {NAIRA(p.amount)} · {p.payment_status} · {p.reference}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === "verifications" && (
            <ul className="space-y-3">
              {(data?.verifications ?? []).map((v) => (
                <li
                  key={v.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-dark bg-ink p-4"
                >
                  <span className="text-[16px] text-headline-dark">
                    {v.kind} · to {v.to_level ?? "-"} · ref {v.reference ?? "-"} · {v.status}
                  </span>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => reviewMut.mutate({ id: v.id, status: "approved" })}
                      className="mono-label rounded-full border border-lime px-4 py-2 text-lime"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => reviewMut.mutate({ id: v.id, status: "rejected" })}
                      className="mono-label rounded-full border border-border-dark px-4 py-2 text-ash"
                    >
                      Reject
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === "materials" && (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                materialMut.mutate({
                  title: String(f.get("title")),
                  description: String(f.get("description") ?? ""),
                  track: (String(f.get("track")) || null) as "Graphic Design" | null,
                  level: String(f.get("level")) as "Beginner",
                  week: Number(f.get("week")),
                  kind: String(f.get("kind")),
                  external_url: String(f.get("external_url") ?? "") || null,
                  published: true,
                });
                e.currentTarget.reset();
              }}
            >
              <label className="block">
                <span className="field-label text-headline-dark">Title</span>
                <input required name="title" className="field-dark" />
              </label>
              <label className="block">
                <span className="field-label text-headline-dark">Week</span>
                <input required name="week" type="number" min={1} defaultValue={1} className="field-dark" />
              </label>
              <label className="block">
                <span className="field-label text-headline-dark">Track</span>
                <select name="track" className="field-dark">
                  <option value="">All tracks</option>
                  <option>Graphic Design</option>
                  <option>Video Editing</option>
                </select>
              </label>
              <label className="block">
                <span className="field-label text-headline-dark">Level</span>
                <select name="level" className="field-dark">
                  {levels.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="field-label text-headline-dark">Type</span>
                <select name="kind" className="field-dark">
                  <option value="note">Class note</option>
                  <option value="assignment">Assignment</option>
                  <option value="certificate">Certificate</option>
                </select>
              </label>
              <label className="block">
                <span className="field-label text-headline-dark">Link (Drive, YouTube, etc.)</span>
                <input name="external_url" className="field-dark" />
              </label>
              <label className="block md:col-span-2">
                <span className="field-label text-headline-dark">Description</span>
                <textarea name="description" rows={3} className="field-dark" />
              </label>
              <button type="submit" className="btn-lime md:col-span-2">
                {materialMut.isPending ? "Saving…" : "Publish Material →"}
              </button>
            </form>
          )}

          {tab === "list" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-bold text-headline-dark">Materials</h3>
                <ul className="mt-4 space-y-3">
                  {(data?.materials ?? []).map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border-dark bg-ink p-4"
                    >
                      <span className="text-[15px] text-headline-dark">
                        W{m.week} · {m.title} · {m.level}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteMut.mutate(m.id)}
                        className="mono-label text-ash hover:text-lime"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-headline-dark">Notify list</h3>
                <ul className="mt-4 space-y-2">
                  {(data?.notify ?? []).map((n) => (
                    <li key={n.id} className="mono-label text-ash">
                      {n.email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
