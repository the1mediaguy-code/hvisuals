import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_PASSCODE = "HVAdmin2026";

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { passcode: string }) => input)
  .handler(async ({ data, context }) => {
    if (data.passcode !== ADMIN_PASSCODE) throw new Error("Incorrect admin passcode");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!data) throw new Error("Forbidden");
}

export const getAdminData = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabase } = context;
    const [students, preorders, verifications, materials, notify] = await Promise.all([
      supabase.from("students").select("*").order("created_at", { ascending: false }),
      supabase.from("preorders").select("*").order("created_at", { ascending: false }),
      supabase.from("student_verifications").select("*").order("created_at", { ascending: false }),
      supabase.from("materials").select("*").order("week", { ascending: true }),
      supabase.from("notify_signups").select("*").order("created_at", { ascending: false }),
    ]);
    return {
      students: students.data ?? [],
      preorders: preorders.data ?? [],
      verifications: verifications.data ?? [],
      materials: materials.data ?? [],
      notify: notify.data ?? [],
    };
  });

export const updateStudent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id: string;
      access_active?: boolean;
      payment_status?: string;
      level?: "Beginner" | "Intermediate" | "Advanced";
      track?: "Graphic Design" | "Video Editing";
    }) => input,
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("students").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reviewVerification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: "approved" | "rejected"; admin_note?: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("student_verifications")
      .update({ status: data.status, admin_note: data.admin_note ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    if (data.status === "approved") {
      const { data: row } = await context.supabase
        .from("student_verifications")
        .select("user_id, to_level")
        .eq("id", data.id)
        .maybeSingle();
      if (row?.to_level) {
        await context.supabase
          .from("students")
          .update({ level: row.to_level, access_active: true })
          .eq("user_id", row.user_id);
      }
    }
    return { ok: true };
  });

export const saveMaterial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id?: string;
      title: string;
      description?: string | null;
      track?: "Graphic Design" | "Video Editing" | null;
      level: "Beginner" | "Intermediate" | "Advanced";
      week: number;
      kind: string;
      external_url?: string | null;
      file_path?: string | null;
      published: boolean;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = data.id
      ? await context.supabase.from("materials").update(data).eq("id", data.id)
      : await context.supabase.from("materials").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMaterial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("materials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
