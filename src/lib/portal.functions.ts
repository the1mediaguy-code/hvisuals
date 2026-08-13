import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [{ data: student }, { data: roles }] = await Promise.all([
      supabase.from("students").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    const { data: materials } = await supabase
      .from("materials")
      .select("*")
      .eq("published", true)
      .order("week", { ascending: true });

    const { data: progress } = await supabase
      .from("student_progress")
      .select("*")
      .eq("user_id", userId);

    const { data: verifications } = await supabase
      .from("student_verifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    return {
      student: student ?? null,
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
      materials: materials ?? [],
      progress: progress ?? [],
      verifications: verifications ?? [],
    };
  });

export const toggleMaterialComplete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { materialId: string; completed: boolean }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("student_progress").upsert(
      {
        user_id: userId,
        material_id: data.materialId,
        completed: data.completed,
        submitted_at: data.completed ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,material_id" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitVerification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      kind: string;
      to_level?: "Beginner" | "Intermediate" | "Advanced" | null;
      amount?: number | null;
      reference?: string | null;
      proof_url?: string | null;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("student_verifications").insert({
      user_id: userId,
      kind: data.kind,
      to_level: data.to_level ?? null,
      amount: data.amount ?? null,
      reference: data.reference ?? null,
      proof_url: data.proof_url ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getMaterialUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { path: string }) => input)
  .handler(async ({ data, context }) => {
    const { data: signed, error } = await context.supabase.storage
      .from("materials")
      .createSignedUrl(data.path, 300);
    if (error) throw new Error(error.message);
    return { url: signed.signedUrl };
  });
